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
        this.source = new Source($("#source"), {});
        this.grid = new Grid($("#grid"), {});
        this.assignEvents();
        var self = this;
        clippy.load('Clippy', function(agent) {
            // Do anything with the loaded agent
            debugger;
            self.agent = agent;
            agent.show();
            agent.play('Searching');
        });
    },

    assignEvents: function() {
        
        $(".action-play").on("click", $.proxy(this.playClicked, this));
    },

    playClicked: function() {

        this.agent.speak('La cucaracha ya no puede caminar');
    },

    getExercises: function() {
        $.ajax({
            type: "GET",
            url: "/exercises"
        }).done(this.populateExercises);
    },

    populateExercises: function(result) {

        this.exercises = new Exercises($("#exercises"), result)
    },

    showExercise: function(data) {

        if($.isArray(data)) {
            data = data[0];
        }
        this.library.load(data.library);
        this.source.load(data.script);
        this.setTitle(data.title);
        this.setDescription(data.title);
    },

    setTitle: function(title){

        this.element.find(".exercise-title").html(title);
    },

    setDescription: function(description){

        this.element.find(".exercise-description").html(description);
    }
};