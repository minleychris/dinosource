function Script(element, model) {

    this.init(element, model);
}

Script.prototype = {

    init: function(element, model){

        this.element = element;
        this.model = model;
        this.steps = [];
    },

    load: function(data) {

        this.steps = [];
        this.model = data;
        for(var i=0; i<this.model.length; i++) {

            var newStep = new Step(this.model[i]);
            this.steps.push(newStep);
        }
        this.printSteps();
    },

    printSteps: function() {

        this.element.html("");
        for(var i=0; i<this.steps.length; i++) {

            this.element.append(this.steps[i].getElement());
        }
    },

    speakStep: function(step) {
        prev = false;
        next = false;

        if (this.model.length > step+1) {
            next = step + 1;
        }
        if (step > 0) {
            prev = step - 1;
        }

        this.steps[step].speak(this, prev, next);
    }
};