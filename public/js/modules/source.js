function Source(element, model) {
    
    this.init(element, model);
}

Source.prototype = {

    init: function(element, model){

        this.element = element;
        this.model = model;
        this.prepareLayout();
    },

    prepareLayout: function() {

        //If the first thing is not a slot container create it
        if((this.element.children().length === 0) || !this.element.children().first().hasClass("js-source-slot") ) {

            $("<div class='js-source-slot source-slot'>").prependTo(this.element);
        }
    },

    load: function(data) {

    }
};