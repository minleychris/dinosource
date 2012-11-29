function Exercise(element, model) {
    
    this.init(element, model);
}

Exercise.prototype = {

    init: function(parentElement, model){

        this.model = model;
        this.element = $("<a class='exercise-link'></a>");
        parentElement.append(this.element);

        this.element.attr("id", this.model.id);
        this.element.append(this.model.title);
        var self = this;
        this.element.on("click", function() {
            self.loadExercise();
        });
    },

    loadExercise: function() {

        $.ajax({
            type: "GET",
            url: "/exercises/" + this.model.id
        }).done(function(result) {

            window.app.showExercise(result);
        });
    }
};