function Exercises(element, model) {
    
    this.init(element, model);
}

Exercises.prototype = {

    init: function(element, model){

        this.element = element;
        this.model = model;

        this.exercises = [];

        for(var i=0; i<model.exercises.length; i++) {

            var exercise = new Exercise(this.element, model.exercises[i]);
        }
    }
};

