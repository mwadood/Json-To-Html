//REQUIRED FILED VALIDATION
function validate() {

    var elementID = false;
    var displayType = false; //TEXT, MODAL, POPOVER
    var position = false; //TOP OR BOTTOM
    var errorMessage = false;
    var validationType = false;
    var error = '';

    var args = arguments[0][0];

    if (args.ElementID === undefined) {
        error += 'Element ID is required.\n';
    } else if (args.ValidationType === undefined) {
        error += 'Validation type is required.\n';
    } else if (args.ElementID.length != args.ValidationType.length) {
        error += 'Number of validation type and Element IDs must be equal.\n';
    }

    if (error === '') {

        elementID = args.ElementID;
        validationType = args.ValidationType;

        if (args.ErrorMessage !== undefined) {
            errorMessage = args.ErrorMessage;
        }
        if (args.DisplayType === undefined) {
            displayType = "Text";
        } else {
            displayType = args.DisplayType;
        }

        if (args.Position === undefined) {
            position = false;
        } else {
            position = args.Position;
        }



        //TEXT ERROR MESSAGE
        if (displayType.toUpperCase() === 'TEXT') {

            textErrorMessage(elementID, position, errorMessage, validationType);
        }
        //MODAL ERROR MESSAGE
        else if (displayType.toUpperCase() === 'MODAL') {

            modalErrorMessage(elementID, errorMessage, validationType);
        }
        //POPOVER ERROR MESSAGE 
        else if (displayType.toUpperCase() === 'POPOVER') {

            if (args.position !== undefined) {
                position = args.Position;
            }

            popoverErrorMessage(elementID, errorMessage, validationType, position, validationType);
        }
    } else {
        alert(error);
    }
}

//TEXT ERROR MESSAGE
function textErrorMessage(elementID, position, errorMessage, validationType) {

    $.each(elementID, function(key, value) {

        var requiredPatren = '';
        requiredPatren = requiredRegex();
        var requiredValue = $(value).val();
        var requiredResult = requiredPatren.test(requiredValue);

        //DEFAULT MESSAGE 
        var message = '';
        if (errorMessage === false) {
            message = $(value).attr('id') + ' is required';
        } else {
            message = errorMessage[key];
        }

        //MESSAGE POSITION
        var errorPosition = '';
        if (position === false) {
            errorPosition = 'BOTTOM'.toUpperCase();
        } else {
            errorPosition = position[key].toUpperCase();

        }

        //CHECK REQUIRED FOR ALL ELELEMTS
        if (requiredResult === false) {

            validationTypeText(value, errorPosition, message);

            // $(value + 'TextErrorMessage').remove();
            // if (errorPosition == 'TOP') {
            //     $(value).before('<span id="' + value.slice(1, value.length) + 'TextErrorMessage">' + message + '</span>');

            // } else if (errorPosition == 'BOTTOM') {
            //     $(value).after('<span id="' + value.slice(1, value.length) + 'TextErrorMessage">' + message + '</span>');
            // }

            // $(value).css({

            //     "border": "1px solid red",
            //     "background": "#FFCECE"
            // });

        } else {

            var type = validationType[key];
            if (type.toUpperCase() === 'NUMBER') {

                var numberPatren = '';
                numberPatren = numberRegex();
                var numberValue = $(value).val();
                var numberResult = numberPatren.test(numberValue);

                if (numberResult === false) {
                    validationTypeText(value, errorPosition, message);
                }

            }

        }

        //REMOVE ERROR MESSAGE
        $(value).on('keyup', function() {

            if ($(this).val() !== '') {
                $(value + 'TextErrorMessage').remove();

                $(value).css({

                    "border": "",
                    "background": ""
                });
            }
        });



    });
}


//VALIDATE TYPE TEXT
function validationTypeText(value, errorPosition, message) {
    $(value + 'TextErrorMessage').remove();
    if (errorPosition == 'TOP') {
        $(value).before('<span id="' + value.slice(1, value.length) + 'TextErrorMessage">' + message + '</span>');

    } else if (errorPosition == 'BOTTOM') {
        $(value).after('<span id="' + value.slice(1, value.length) + 'TextErrorMessage">' + message + '</span>');
    }

    $(value).css({

        "border": "1px solid red",
        "background": "#FFCECE"
    });

    $(value).css({

        "border": "1px solid red",
        "background": "#FFCECE"
    });
}


//MODAL ERROR MESSAGE
function modalErrorMessage(elementID, errorMessage, validationType) {

    var modalId = 'ValidationErrorMessageModal';


    var message = '';

    $.each(elementID, function(key, value) {

        var requiredPatren = '';
        requiredPatren = requiredRegex();
        var requiredValue = $(value).val();
        var requiredResult = requiredPatren.test(requiredValue);

        //CHECK REQUIRED FOR ALL ELELEMTS
        if (requiredResult === false) {

            //DEFAULT MESSAGE 
            if (errorMessage === false) {
                message += $(value).attr('id') + ' is required <br>';
            } else {
                message += errorMessage[key] + '<br>';
            }

            //validateTypeModal(modalId, message);

        } else {

            var type = validationType[key];

            //CHECK FOR NUMBER
            if (type.toUpperCase() === 'NUMBER') {

                var numberPatren = '';
                numberPatren = numberRegex();
                var numberValue = $(value).val();
                var numberResult = numberPatren.test(numberValue);

                if (numberResult === false) {

                    if (errorMessage === false) {
                        message += $(value).attr('id') + ' is required <br>';
                    } else {
                        message += errorMessage[key] + '<br>';
                    }


                }

            }

        }


    });


    if (message !== '') {
        validateTypeModal(modalId, message);
    }

}

//VALIDATE TYPE MODAL
function validateTypeModal(modalId, message) {

    var pnl = `<div id="${modalId}" class="modal fade" role="dialog">
    <div class="modal-dialog">
    
        <!-- Modal content-->
        <div class="modal-content">
        <div class="modal-header" style="background-color: red; color:white">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Error</h4>
        </div>
        <div class="modal-body">
            ${message}
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




//POPOVER ERROR MESSAGE
function popoverErrorMessage(elementID, errorMessage, type, position, validationType) {

    $.each(elementID, function(key, value) {

        var requiredPatren = '';
        requiredPatren = requiredRegex();
        var requiredValue = $(value).val();
        var requiredResult = requiredPatren.test(requiredValue);


        //BY DEFAULT PLACEMENT IS RIGHT
        var placement = '';
        if (position === false) {
            placement = 'right';
        } else {
            placement = position[key].toLowerCase();
        }

        //DEFAULT MESSAGE ('REQUIRED')
        var message = '';
        if (errorMessage === false) {
            message = $(value).attr('id') + ' is required';
        } else {
            message = errorMessage[key];
        }

        if (requiredResult === false) {

            validationTypePopover(value, message, placement);

        } else {

            var type = validationType[key];
            if (type.toUpperCase() === 'NUMBER') {


                var numberPatren = '';
                numberPatren = numberRegex();
                var numberValue = $(value).val();
                var numberResult = numberPatren.test(numberValue);

                if (numberResult === false) {

                    validationTypePopover(value, message, placement);
                }

            }
        }


        //REMOVE ERROR MESSAGE
        $(value).on('keyup', function() {

            if ($(this).val() !== '') {
                $(value).popover('hide');

                $(value).removeAttr('data-content');
                $(value).removeAttr('data-placement');

                $(value).css({

                    "border": "",
                    "background": ""
                });
            }
        });
    });
}

function validationTypePopover(value, message, placement) {
    $(value).attr('data-content', message);
    $(value).attr('data-placement', placement);

    $(value).popover('show');

    $(value).css({

        "border": "1px solid red",
        "background": "#FFCECE"
    });
}





/* ************* REGULAR EXPRESSION (REGEX) ************* */

//REQUIRED REGEX
function requiredRegex() {
    return /\S+/;
}

//NUMBER REGEX
function numberRegex() {
    return /[^0-9]/g;
}