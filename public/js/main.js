$(function() {
    window.app = new App($("body"), {});
});



function App(element, model) {

    this.init(element, model);
}

App.prototype = {

    init: function(element, model){

        this.model = model;
        this.element = element;

        this.getExercises();
        this.library = new Library($("#library"), {});
        this.script = new Script($("#script"), {});
        this.source = new Source($("#source"), {});
        this.grid = new Grid($("#grid"), {});
        this.assignEvents();
        var self = this;
        clippy.load('Clippy', function(agent) {
            // Do anything with the loaded agent
            self.agent = agent;
            agent.show();
            var clippyPlace = $(".js-clippy-place").offset();
            agent.moveTo(clippyPlace.left, clippyPlace.top);
            setTimeout(function() {
                self.script.speakStep(0);
            }, 3000);

        });
    },

    assignEvents: function() {

        $(".action-play").on("click", $.proxy(this.playClicked, this));
        $(".action-add-container").on("click", $.proxy(this.addContainerClicked, this));
    },

    addContainerClicked: function() {
        this.source.addEmptyContainer();
    },

    playClicked: function() {
        var self = this;
$("body").addClass("playing");
        window.app.agent.closeBalloon();
        window.app.agent.play("Thinking");

        var code = this.source.getModel();

        $.ajax({
            type: "POST",
            url: "/solutions/" + this.exercises.activeExercise,
            contentType : 'application/json',
            processData: false,
            data: JSON.stringify(code)
        }).done(function (data) {
            window.app.agent.stopCurrent();

            if (data.steps) {
                var steps = data.steps;

                self.grid.clear();

                function step (i) {
                    return function() {
                        console.log("step: " + i);
                        var step = steps[i];

                        for (var j in step.highlight) {
                            self.source.highlight(step.highlight[j]);
                        }

                        for (var j in step.errors) {
                            var offset = $(".highlight").offset();
                            window.app.agent.gestureAt(offset.left, offset.top)
                            window.app.agent.speak(step.errors[j], true);
                        }

                        for (var j in step.changes) {
                            var change = step.changes[j];
                            if (change.state === "on") {
                                self.grid.on(change.x, change.y);
                            } else if (change.state === "off") {
                                self.grid.off(change.x, change.y);
                            }
                        }
                        console.log("done step: " + i);
                    }
                }

                for (var x in steps) {
                    setTimeout(step(x), 2000*(x+1));
                }

                setTimeout(self.source.clearHighlights, 2000*(x+2));

                if (data.success) {
                    setTimeout(function () {
                        $("body").removeClass("playing");
                        window.app.agent.play("Congratulate");
//                        window.app.agent.speak("Well done.  Lets start the next exercise.", true);
                    }, 2000*(x+2));
                    setTimeout(function () {
                        $.ajax({
                            type: "GET",
                            url: "/exercises/" + parseInt(self.exercises.activeExercise) + 1
                        }).done(function(result) {

                            window.app.showExercise(result);
                        });
                    }, 2000*(x+3));
                } else {
                    setTimeout(function () {
                        $("body").removeClass("playing");
                        window.app.agent.play("GetAttention");
                        window.app.agent.speak("Nearly right, try again!", true);
                    }, 2000*(x+2));
                }
            }
        });
    },

    getExercises: function() {
        $.ajax({
            type: "GET",
            url: "/exercises"
        }).done($.proxy(this.populateExercises, this));
    },

    populateExercises: function(result) {

        this.exercises = new Exercises($("#exercises"), result);
    },

    showExercise: function(data) {

        if($.isArray(data)) {
            data = data[0];
        }

        this.exercises.activeExercise = data.id;
        this.library.load(data.library);
        this.script.load(data.script);
        this.source.load({});
        this.setTitle(data.title);
        this.setDescription(data.title);

        this.source.clear();
        this.grid.clear();

        if (this.agent) {
            this.script.speakStep(0);
        }
    },

    setTitle: function(title){

        this.element.find(".exercise-title").html(title);
    },

    setDescription: function(description){

        this.element.find(".exercise-description").html(description);
    }
};