function CodeBlock(element, model) {
    
    this.init(element, model);
}

CodeBlock.prototype = {

    init: function(id, block){

        this.model = {
            name: block.name
        };
        this.createElement();
    },

    createElement: function() {

        this.element = $("<div data-type='code-block' data-id='" + this.model.id + "'class='js-code-block code-block'><span class='js-code-block-name code-block-name'>" + this.model.name + "</span></div>");
        if(this.model.params) {
            for(var i=0; i<this.model.params.length; i++) {

                var param = this.model.params[i];
                this.element.append("<div class='js-code-block-param block-param'>" + param.name + "</div>");
            }
        }
        this.element.draggable({ revert: true });
    },

    getElement: function() {

        return this.element;
    }
};