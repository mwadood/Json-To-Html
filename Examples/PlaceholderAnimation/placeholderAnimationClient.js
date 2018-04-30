function PlaceholderAnimationHome() {

    $('#divJ2HTMLPlaceholderAnimationExamples').hide();
    $('#divJ2HTMLPlaceholderAnimation').show();
}


function setPlaceholderAnimationMenu(id) {

    if ($('#divJ2HTMLPlaceholderAnimationExamples').is(':visible') === false) {
        $('#divJ2HTMLPlaceholderAnimation').hide();
        $('#divJ2HTMLPlaceholderAnimationExamples').show();
        $('.j2HTMLPlaceholderAnimationMenu').removeClass('active');
        $('#' + id).addClass('active');

        // //HIDE ALL SUBMIT BUTTONS
        // $('.btnValidation').hide();

        // //SHOW REQUIRED SUBMIT BUTTON
        // if (id === "validatRequired") {
        //     $('#btnValidateRequired').show();
        // }



    } else {
        $('.j2HTMLPlaceholderAnimationMenu').removeClass('active');
        $('#' + id).addClass('active');
    }
}


function showPlaceholderAnimation() {
    setPlaceholderAnimationMenu('placeholderAnimation');
}

//ON PAGE LOAD
$(() => {

    j2HTML.PlaceholderAnimation({
        ElementID: '.placeholderanimation'

    });

});