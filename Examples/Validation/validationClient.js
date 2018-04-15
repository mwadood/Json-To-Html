function validationHome() {

    $('#divJ2HTMLValidationExamples').hide();
    $('#divJ2HTMLValidation').show();
}


function setValidationMenu(id) {

    if ($('#divJ2HTMLValidationExamples').is(':visible') === false) {
        $('#divJ2HTMLValidation').hide();
        $('#divJ2HTMLValidationExamples').show();
        $('.j2HTMLValidationMenu').removeClass('active');
        $('#' + id).addClass('active');

        //HIDE ALL SUBMIT BUTTONS
        $('.btnValidation').hide();

        //SHOW REQUIRED SUBMIT BUTTON
        if (id === "validatRequired") {
            $('#btnValidateRequired').show();
        }



    } else {
        $('.j2HTMLValidationMenu').removeClass('active');
        $('#' + id).addClass('active');
    }
}



function showValidation() {

    //SHOW WAITING MODAL
    //$('#loadingModal').modal('show');

    setValidationMenu('validatRequired');


    //$('#loadingModal').modal('hide');

}