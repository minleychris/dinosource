function CodeBlock(element, model) {
    
    this.init(element, model);
}

CodeBlock.prototype = {

    init: function(id, block){

        this.model = {
            id: id,
            name: block.name,
            params: []
        };
        if(block.params) {
            for(var i=0; i<block.params.length; i++) {
                this.model.params.push(block.params[i]);
            }
        }
        this.createElement();
    },

    createElement: function() {

        this.element = $("<div data-type='code-block' data-id='" + this.model.id + "'class='block-common js-code-block code-block'><span class='js-code-block-name code-block-name'>" + this.model.name + "</span></div>");
        if(this.model.params) {
            for(var i=0; i<this.model.params.length; i++) {

                var param = this.model.params[i];
                this.element.append("<div class='js-code-block-param code-block-param' data-param-name='" + param.name + "'><input type='text' placeholder='" + param.name + "'></div>");
            }
        }
        this.element.draggable({ revert: true });
    },

    getElement: function() {

        return this.element;
    },

    afterInserting: function() {

        this.element.find("input").autoGrowInput({
            comfortZone: 10,
            minWidth: 20,
            maxWidth: 100
        });
    },

    getModel: function() {

        var model = {
            id: this.model.id,
            name: this.model.name,
            params: []
        };

        if(this.model.params) {

            for(var i=0; i<this.model.params.length; i++) {

                var paramContainer = this.element.find("[data-param-name=" + this.model.params[i].name +"]");
                var input = paramContainer.find("input");
                model.params.push(input.val());
            }
        }
        return model;
    },

    addBlockAsParam: function(block, paramName) {
        
        var paramContainer = this.element.find("[data-param-name=" + paramName +"]");
        paramContainer.html(block.getElement());
        block.afterInserting();

        for(var i=0; i<this.model.params.length; i++) {

            if(this.model.params[i].name == paramName) {

                this.model.params[i].value = block.model;
                break;
            }
        }
    }
};