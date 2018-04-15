//REQUIRED FILED VALIDATION
function required() {

    var elementID = false;
    var displayType = false; //TEXT, MODAL, TOOL-TIP
    var position = false; //TOP OR BOTTOM
    var errorMessage = false;

    var args = arguments[0][0];

    if (args.ElementID === undefined) {

        alert('Element ID is required');
    } else {

        elementID = args.ElementID;

        if (args.ErrorMessage === undefined) {
            errorMessage = elementID + ' is required';
        } else {
            errorMessage = args.ErrorMessage;
        }
        if (args.DisplayType === undefined) {
            displayType = "Text";
        } else {
            displayType = args.DisplayType;
        }

        if (args.Position === undefined) {
            position = 'Bottom'.toUpperCase();
        } else {
            position = args.Position.toUpperCase();
        }


        //TEXT ERROR MESSAGE
        if (displayType.toUpperCase() === 'TEXT') {

            $.each(elementID, function(key, value) {

                //var patren = /\S+/;
                var patren = requiredRegex();
                var elementValue = $(value).val();
                var result = patren.test(elementValue);

                if (result === false) {
                    textErrorMessage(value, position, errorMessage[key]);
                }
            });
        }
        //MODAL ERROR MESSAGE
        else if (displayType.toUpperCase() === 'MODAL') {

            var modalErrorMessages = '';

            $.each(elementID, function(key, value) {

                //var patren = /\S+/;
                var patren = requiredRegex();
                var elementVal = $(value).val();
                var result = patren.test(elementVal);
                if (result === false) {
                    modalErrorMessages += errorMessage[key] + '<br>';
                }
            });

            modalErrorMessage(modalErrorMessages);
        }

        //REMOVE ERROR MESSAGE
        $.each(elementID, function(key, value) {

            $(value).on('keyup', function() {

                $(value + 'TextErrorMessage').remove();

            });
        });

    }
}

//TEXT ERROR MESSAGE
function textErrorMessage(elementID, position, errorMessage) {

    $(elementID + 'TextErrorMessage').remove();
    if (position == 'TOP') {
        $(elementID).before('<span id="' + elementID.slice(1, elementID.length) + 'TextErrorMessage">' + errorMessage + '</span>');
    } else if (position == 'BOTTOM') {
        $(elementID).after('<span id="' + elementID.slice(1, elementID.length) + 'TextErrorMessage">' + errorMessage + '</span>');
    }

}

//MODAL ERROR MESSAGE
function modalErrorMessage(errorMessage) {

    var modalId = 'ValidationErrorMessageModal';

    var pnl = `<div id="${modalId}" class="modal fade" role="dialog">
                    <div class="modal-dialog">
                    
                        <!-- Modal content-->
                        <div class="modal-content">
                        <div class="modal-header" style="background-color: red; color:white">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">Error</h4>
                        </div>
                        <div class="modal-body">
                            ${errorMessage}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                        </div>
                    
                    </div>
                </div>`;

    $('body').append(pnl);

    $('#' + modalId).modal('show');


    $('#' + modalId).on('hidden.bs.modal', function() {
        $('#' + modalId).remove();
    });
}

/* ************* REGEX EXPRESSION ************* */

//REQUIRED REGEX
function requiredRegex() {
    return /\S+/;
}