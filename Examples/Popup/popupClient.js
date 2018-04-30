function popupHome() {

    $('#divJ2HTMLPopupExamples').hide();
    $('#divJ2HTMLPopup').show();
}


function setPopupMenu(id) {

    if ($('#divJ2HTMLPopupExamples').is(':visible') === false) {
        $('#divJ2HTMLPopup').hide();
        $('#divJ2HTMLPopupExamples').show();
        $('.j2HTMLPopupMenu').removeClass('active');
        $('#' + id).addClass('active');

        // //HIDE ALL SUBMIT BUTTONS
        // $('.btnValidation').hide();

        // //SHOW REQUIRED SUBMIT BUTTON
        // if (id === "validatRequired") {
        //     $('#btnValidateRequired').show();
        // }



    } else {
        $('.j2HTMLPopupMenu').removeClass('active');
        $('#' + id).addClass('active');
    }
}


function showConfirmPopup() {

    $('.btnPopup').hide();
    $('#btnConfirmMessage').show();
    setPopupMenu('confirmPopup');
}

function showErrorPopup() {

    $('.btnPopup').hide();
    $('#btnErrorMessage').show();
    setPopupMenu('errorPopup');
}

function showInformationPopup() {

    $('.btnPopup').hide();
    $('#btnInformationMessage').show();
    setPopupMenu('InformationPopup');
}











function showConfirmationPopupMessage() {

    j2HTML.PopupMessage({

        Type: 'Confirmation',
        Heading: 'Confirmation',
        Message: 'Would you like to close the application',
        ConfirmFunction: confirmationTest

    }).ShowPopup();
}


function showErrorPopupMessage() {
    j2HTML.PopupMessage({

        Type: 'Error',
        Heading: 'Error',
        Message: 'There is an error to close the application',

    }).ShowPopup();
}

function showInformationPopupMessage() {
    j2HTML.PopupMessage({

        Type: 'Information',
        Heading: 'Information',
        Message: 'Information to close the application',

    }).ShowPopup();
}





function confirmationTest() {

    var test = 'hello';

}