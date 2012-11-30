function Library(element, model) {
    
    this.init(element, model);
}

Library.prototype = {

    autoIncrement: 1,

    init: function(element, model){

        this.element = element;
        this.model = model;
        this.blocks = [];
    },

    load: function(data) {

        this.blocks = [];
        this.model = data;
        for(var i=0; i<this.model.length; i++) {

            if(!this.model[i].id) {
                this.model[i].id = this.autoIncrement++;
            }
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
    },

    getBlock: function(blockId) {

        for(var i=0; i<this.blocks.length; i++) {
            if(this.blocks[i].model.id == blockId) {
                return this.blocks[i];
            }
        }
        return false;
    },

    createUserBlock: function() {

        var newBlock = new Block({
            id: this.autoIncrement++,
            name: "Unknown",
            params: []
        });
        this.blocks.push(newBlock);
        this.element.append(newBlock.getElement());

        return newBlock;
    }
};