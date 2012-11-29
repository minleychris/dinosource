var init = function() {
    //Get exercises
    getExercises();
};

var getExercises = function() {
    $.ajax({
        type: "GET",
        url: "/exercises"
    }).done(populateExercises);
};

var populateExercises = function(result) {

    window.exercises = new Exercises($("#exercises"), result)
};

$(function() {
    init();
});

