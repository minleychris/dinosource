function Block(element, model) {

    this.init(element, model);
}

Block.prototype = {

    init : function(model) {

        this.model = model;
        this.createElement();

    },

    createElement : function() {

        var jsClass = "js-block";
        var jsType = "library-block";

        if(this.model.name =="block") {
            jsClass = "js-container-block-lib";
            jsType = "library-block-container";
        }
        this.element = $("<div data-type='" + jsType + "' data-id='" + this.model.id + "'class='block-common " + jsClass + " block'><span class='js-block-name block-name'>" + this.model.name + "</span></div>");
        if (this.model.params) {
            for (var i = 0; i < this.model.params.length; i++) {

                var param = this.model.params[i];
                this.element.append("<div class='js-block-param block-param'>" + param.name + "</div>");
            }
        }
        this.element.draggable({
            revert : true 
        });
    },

    getElement : function() {

        return this.element;
    }
}; 