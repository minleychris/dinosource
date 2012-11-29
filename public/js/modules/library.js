function Library(element, model) {
    
    this.init(element, model);
}

Library.prototype = {

    init: function(element, model){

        this.element = element;
        this.model = model;
        this.blocks = [];
    },

    load: function(data) {

        this.blocks = [];
        this.model = data;
        for(var i=0; i<this.model.length; i++) {

            var newBlock = new Block(this.model[i]);
            this.blocks.push(newBlock);
        }
        this.printBlocks();
    },

    printBlocks: function() {

        this.element.html("");
        for(var i=0; i<this.blocks.length; i++) {

            this.element.append(this.blocks[i].getElement());
        }
    }
};