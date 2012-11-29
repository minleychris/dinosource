function Step(element, model) {
    
    this.init(element, model);
}

Step.prototype = {

    init: function(model){

        this.model = model;
        this.createElement();
        
    },

    createElement: function() {

        this.element = $("<li class='step'></li>").append(this.model);
    },

    getElement: function() {

        return this.element;
    }
};