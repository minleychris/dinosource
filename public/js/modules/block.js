function Block(element, model) {
    
    this.init(element, model);
}

Block.prototype = {

    init: function(model){

        this.model = model;
        this.createElement();
        
    },

    createElement: function() {

        this.element = $("<div class='block'><span class='js-block-name block-name'>" + this.model.name + "</span></div>");
        if(this.model.params) {
            for(var i=0; i<this.model.params.length; i++) {

                var param = this.model.params[i];
                this.element.append("<div class='js-block-param block-param'>" + param.name + "</div>");
            }
        }
    },

    getElement: function() {

        return this.element;
    }
};