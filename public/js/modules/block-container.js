function BlockContainer(element, model) {

    this.init(element, model);
}

BlockContainer.prototype = {

    autoIncrement: 1000,
    libraryBlock: false,

    init : function(model) {

        this.bodyContainer = false;
        this.model = {
            id: this.autoIncrement++,
            name: "default",
            params: ["param1"],
            body: []
        };
        this.createElement();

    },

    createElement : function() {

        this.element = $("<div data-type='block-container' data-id='" + this.model.id + "'class='block-common js-block-container block-container'>")
                            .append("<div class='block-param'><input class='js-block-container-name block-container-name long-field' type='text' value='' placeholder='" + this.model.name + "'></div>")
                            .append("<div class='block-container-params block-param'><input class='js-block-container-params block-container-params long-field' type='text' value='' placeholder='params'></div>")
                            .append("<div class='block-container-body js-block-container-body'></div>");

    },

    prepareLayout : function() {

        this.bodyContainer = this.bodyContainer || this.element.find(".js-block-container-body");
        //If the first thing is not a slot container create it
        if ((this.bodyContainer.children().length === 0) || !this.bodyContainer.children().first().hasClass("js-source-slot")) {

            var slot = this.createSlot();
            slot.prependTo(this.bodyContainer);
        }

        var self = this;
        this.element.find(".js-block-container-name").on("keyup", function() {

            var newName = self.element.find(".js-block-container-name").val();
            if(self.libraryBlock) {
                self.libraryBlock.updateName(newName);
            }
        });
        this.element.find(".js-block-container-params").on("keyup", function() {

            var newParams = self.element.find(".js-block-container-params").val().split(" ");
            if(self.libraryBlock) {
                self.libraryBlock.updateParams(newParams);
            }
        });
    },

    createSlot: function() {

        var slot = $("<div class='js-source-slot source-slot'>");
        var self = this;
        slot.droppable({
            accept : ".js-block, .js-code-block",
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
        if(blockType === "code-block") {
            this.addCodeBlock(blockId, slot);
        }
    },

    addBlock: function(blockId, slot) {

        var block = window.app.library.getBlock(blockId);
        var codeBlock = new CodeBlock(this.autoIncrement++, block.model);
        window.app.source.blocks[codeBlock.model.id] = codeBlock;

        var codeBlockElement = codeBlock.getElement();
        codeBlockElement.insertBefore(slot);
        codeBlock.afterInserting();
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

        this.updateModel();
    },

    updateModel: function() {

        var children = this.element.find(".js-block-container-body").children();
        this.model.body = [];

        for(var i=0; i<children.length; i++) {

            var element = $(children[i]);
            if(element.data("type")=="code-block") {
                var codeBlock = window.app.source.getCodeBlock(element.data("id"));
                this.model.body.push(codeBlock.getModel());
            }
        }
    },

    getModel: function() {

        var model = {
            id: this.model.id,
            name: "block",
            params: [
                this.element.find(".js-block-container-name").val(), //name
                this.element.find(".js-block-container-params").val().split(" "), //paramNames
                this.model.body //Body
            ]
        };
        return model;
    },

    addCodeBlock: function(blockId, slot) {

        var codeBlock = window.app.source.blocks[blockId];
        window.app.source.removeCodeBlock(codeBlock);
        
        //TODO: all this is repeated
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

        this.updateModel();
    },

    getElement : function() {

        return this.element;
    },

    setLibraryBlock: function(block) {

        this.libraryBlock = block;
    }
}; 