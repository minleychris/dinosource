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
        slot.droppable({
            accept : ".js-block",
            hoverClass: "drop-hover",
            drop: $.proxy(this.droppedOnSlot, this)
        });
        return slot;
    },

    droppedOnSlot: function( event, ui ) {

        var slot = $(event.srcElement);
        var received = ui.draggable;
        var blockId = received.data("id");
        var blockType = received.data("type");

        if(blockType === "library-block") {
            this.addBlock(blockId, slot);
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
