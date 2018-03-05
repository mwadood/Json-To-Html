function showPopupMessage() {

    j2HTML.PopupMessage({

        Type: 'Confirm',
        Heading: 'Confirmation',
        Message: 'Would you like to close the application',
        ConfirmFunction: confirmationTest

    }).ShowPopup();
}

function confirmationTest() {

    var test = 'hello';

}