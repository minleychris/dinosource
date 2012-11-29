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
    },

    speak: function(script, prevId, nextId) {
        agent = window.app.agent;

        prev = false;
        next = false;

        if (typeof prevId === "number") {
            prev = function(){script.speakStep(prevId)};
        }
        if (nextId) {
            next = function(){script.speakStep(nextId)};
        }

        agent.stop();
        agent.speak(this.model, true, prev, next);
    }
};