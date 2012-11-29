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
    },

    prepareLayout : function() {

        //If the first thing is not a slot container create it
        if ((this.element.children().length === 0) || !this.element.children().first().hasClass("js-source-slot")) {

            var slot = $("<div class='js-source-slot source-slot'>");
            slot.prependTo(this.element);
            slot.droppable({
                accept : ".js-block",
                hoverClass: "drop-hover",
                drop: $.proxy(this.droppedOnSlot, this)
            });
        }
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
        var slotPosition = this.getSlotPosition(slot);
        var codeBlock = new CodeBlock(this.autoIncrement++, block.model);
        var codeBlockElement = codeBlock.getElement();
        codeBlockElement.insertBefore(slot);
        $("<div class='js-source-slot source-slot'>").insertBefore(codeBlockElement);
    },

    getSlotPosition: function(slot) {

        var prev = slot.prev();
        if(prev.length === 0) {
            //Nothing before, first position
            return 0;
        }
        //TODO
        //prev.data("id");
    },

    load : function(data) {}
}; 