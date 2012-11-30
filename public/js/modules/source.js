function Source(element, model) {

    this.init(element, model);
}

Source.prototype = {

    autoIncrement: 100,

    init : function(element, model) {

        this.element = element;
        this.model = model || {};
        this.model.code = this.model.code || [];
        this.prepareLayout();
        this.blocks = {};
    },

    prepareLayout : function() {

        //If the first thing is not a slot container create it
        if ((this.element.children().length === 0) || !this.element.children().first().hasClass("js-source-slot")) {

            var slot = this.createSlot();
            slot.prependTo(this.element);
        }
    },

    createSlot: function() {

        var slot = $("<div class='js-source-slot source-slot'>");
        var self = this;
        slot.droppable({
            accept : ".js-block",
            hoverClass: "drop-hover",
            drop: function(event, ui) {
                self.droppedOnSlot(event, ui, slot);
            },
            tolerance: "pointer"
        });
        return slot;
    },

    droppedOnSlot: function( event, ui, slot) {

        var received = ui.draggable;
        var blockId = received.data("id");
        var blockType = received.data("type");

        if(blockType === "library-block") {
            this.addBlock(blockId, slot);
        }
    },

    droppedOnParam: function( event, ui, param ) {

        var received = ui.draggable;
        var blockId = received.data("id");
        var blockType = received.data("type");

        if(blockType === "library-block") {
            this.addLibraryBlockParam(blockId, param);
        } else if(blockType === "code-block") {
            this.addCodeBlockParam(blockId, param);
        }
    },

    addBlock: function(blockId, slot) {

        var block = window.app.library.getBlock(blockId);
        var codeBlock = new CodeBlock(this.autoIncrement++, block.model);
        this.blocks[codeBlock.model.id] = codeBlock;
        var codeBlockElement = codeBlock.getElement();
        codeBlockElement.insertBefore(slot);
        var newSlot = this.createSlot();
        newSlot.insertBefore(codeBlockElement);

        var self = this;
        codeBlockElement.find(".js-code-block-param").each(function(index, element) {
            var receiver = $(element);
            receiver.droppable({
                accept : ".js-block, .js-code-block",
                hoverClass: "drop-hover",
                drop: function(event, ui) {
                    self.droppedOnParam(event, ui, receiver);
                },
                tolerance: "pointer"
            });
        });

    },

    addLibraryBlockParam: function(blockId, param) {

        var block = window.app.library.getBlock(blockId);
        var codeBlock = new CodeBlock(this.autoIncrement++, block.model);
        this.blocks[codeBlock.model.id] = codeBlock;

        var parentBlock = this.getParentBlock(param);
        var paramName = param.data("param-name");

        parentBlock.addBlockAsParam(codeBlock, paramName);
    },

    getParentBlock: function(param) {

        var parentBlockId = param.closest(".js-code-block").data("id");
        return this.blocks[parentBlockId];
    },

    addCodeBlockParam: function(blockId, param) {

        var codeBlock = this.blocks[blockId];
        var parentBlock = this.getParentBlock(param);
        this.removeCodeBlock(codeBlock);

        var parentBlock = this.getParentBlock(param);
        var paramName = param.data("param-name");

        parentBlock.addBlockAsParam(codeBlock, paramName);
    },

    removeCodeBlock: function(block) {

        var prev = block.element.prev();
        if(prev.hasClass("js-source-slot")) {
            prev.remove();
        }
        block.element.remove();
    },

    getModel: function() {

        var children = this.element.children();
        var model = {
            code: []
        };

        for(var i=0; i<children.length; i++) {

            var element = $(children[i]);
            if(element.data("type")=="code-block") {
                var codeBlock = this.getCodeBlock(element.data("id"));
                model.code.push(codeBlock.getModel());
            }
        }
        return model;
    },

    getCodeBlock: function(blockId) {

        return this.blocks[blockId];
    },

    load : function(data) {},

    highlight: function(id) {

        this.element.find(".js-code-block").removeClass("highlight");
        this.element.find(".js-code-block[data-id=" + id + "]").addClass("highlight");
    }
};
