function Library(element, model) {
    
    this.init(element, model);
}

Library.prototype = {

    init: function(element, model){

        this.element = element;
        this.model = model;
    },
    load: function(data) {

    }
};