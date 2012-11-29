function Grid(element, model) {
    
    this.init(element, model);
}

Grid.prototype = {

    ROWS: 10,
    COLUMNS: 10,

    init: function(element, model){

        this.element = element;
        this.model = model;
        this.createGrid();
    },
    
    createGrid: function() {

        for(var i=0; i<this.ROWS; i++) {
            var newRow = $("<ul id='grid-row-'" + i + " class='grid-row'></ul>")
            for(var j=0; j<this.COLUMNS; j++) {
                var newCell = $("<li id='grid-cell-" + i + "-" + j + "' class='grid-cell'></li>")
                newRow.append(newCell);
            }
            this.element.append(newRow);
        }
    },
    
    on: function(x,y) {

        $("#grid-cell-" + x + "-" + y).addClass("on");
    },

    off: function(x,y) {

        $("#grid-cell-" + x + "-" + y).removeClass("on");
    }
};