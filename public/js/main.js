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
        });
    },

    assignEvents: function() {

        $(".action-play").on("click", $.proxy(this.playClicked, this));
    },

    playClicked: function() {

        var code = this.source.getModel();

        $.ajax({
            type: "POST",
            url: "/solutions/" + this.exercises.activeExercise,
            data: code
        }).done($.proxy(this.correctionReceived, this));
    },

    correctionReceived: function(data) {
        //TODO
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
    },

    setTitle: function(title){

        this.element.find(".exercise-title").html(title);
    },

    setDescription: function(description){

        this.element.find(".exercise-description").html(description);
    }
};