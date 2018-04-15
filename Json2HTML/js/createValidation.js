var elementID = false;
var displayType = false; //TEXT, MODAL, 
var position = false; //TOP OR BOTTOM
var errorMessage = false;

function required() {

    var args = arguments[0][0];

    if (args.ElementID === undefined) {

        alert('Element ID is required');
    } else if (args.DisplayType === undefined) {
        alert('Display type is required');
    } else if (args.ErrorMessage === undefined) {
        alert('Error message is required');
    } else {

        errorMessage = args.ErrorMessage;

        // TEXT ERROR MESSAGE;
        textErrorMessage();

        $('#' + elementID).on('keyup', function() {

            $('#' + elementID + 'ErrorMEssage').empty();

        });

    }
}

//TEXT ERROR MESSAGE
function textErrorMessage() {

    var patren = /\S+/;
    var value = $('#' + elementID).val();
    var result = patren.test(value);

    if (result === false) {
        if (displayType == 'Text' && position == 'TOP') {
            $('#' + elementID).prepend('<span id="' + elementID + 'ErrorMessage">' + errorMessage + '</span>');
        } else if (args.displayType == 'Text' && args.Position == 'Bottom') {
            $('#' + elementID).append('<span id="' + elementID + 'ErrorMessage">' + errorMessage + '</span>');
        } else if (args.displayType == 'Text' && args.Position === undefined) {
            $('#' + elementID).append('<span id="' + elementID + 'ErrorMessage">' + errorMessage + '</span>');
        }
    }
}