var controlName = '';
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

            showTextValidation(elementID, position, errorMessage, validationType);
        }
        //MODAL ERROR MESSAGE
        else if (displayType.toUpperCase() === 'MODAL') {

            showModalValidation(elementID, errorMessage, validationType);
        }
        //POPOVER ERROR MESSAGE 
        else if (displayType.toUpperCase() === 'POPOVER') {

            if (args.position !== undefined) {
                position = args.Position;
            }

            showPopoverValidation(elementID, errorMessage, validationType, position, validationType);
        }
    } else {
        alert(error);
    }
}


//#region ****************** TEXT VALIDATION ****************

//TEXT ERROR MESSAGE
function showTextValidation(elementID, position, errorMessage, validationType) {

    $.each(elementID, function(key, value) {

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
        var requiredResult = '';
        //REQUIRED VALIDATION
        var type = validationType[key];
        if (type.toUpperCase() === "REQUIRED") {

            requiredResult = requiredRegex(value);
        }
        if (requiredResult === false) {

            textValidation(value, errorPosition, message);
        }
        //NON-REQUIRED VALIDATION
        else {

            if ($(value).val() !== '') {
                textValidationCommonFunction(type, value, errorPosition, message);
            } else if (elementID.length > 1 && key !== 0 && elementID[key - 1] !== elementID[key]) {
                textValidationCommonFunction(type, value, errorPosition, message);
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

//TEXT VALIDATION
function textValidation(value, errorPosition, message) {
    $(value + 'TextErrorMessage').remove();
    if (errorPosition == 'TOP') {
        $(value).before('<span id="' + value.slice(1, value.length) + 'TextErrorMessage" class="validationErrorMessage">' + message + '</span>');

    } else if (errorPosition == 'BOTTOM') {
        $(value).after('<span id="' + value.slice(1, value.length) + 'TextErrorMessage" class="validationErrorMessage">' + message + '</span>');
    }

    $(value).css({

        "border": "1px solid red",
        "background": "#FFCECE"
    });
}

function textValidationCommonFunction(type, value, errorPosition, message) {

    //CHECK FOR INTEGER
    if (type.toUpperCase() === 'INTEGER') {

        var integerResult = integerRegex(value);

        if (integerResult === false) {

            textValidation(value, errorPosition, message);
        }

    }
    //CHECK FOR DECIMAL
    if (type.toUpperCase() === 'DECIMAL') {

        var decimalResult = decimalRegex(value);

        if (decimalResult === false) {

            textValidation(value, errorPosition, message);
        }

    }

    //CHECK FOR DECIMAL
    if (type.toUpperCase() === 'PHONE') {

        var phoneResult = phoneRegex(value);

        if (phoneResult === false) {

            textValidation(value, errorPosition, message);
        }

    }









}

//#endregion


//#region ****************** MODAL VALIDATION ***************

//MODAL VALIDATION
function showModalValidation(elementID, errorMessage, validationType) {

    var modalId = 'ValidationErrorMessageModal';


    var message = '';

    $.each(elementID, function(key, value) {

        var requiredResult = '';
        var type = validationType[key];
        if (type.toUpperCase() === "REQUIRED") {

            requiredResult = requiredRegex(value);
        }
        if (requiredResult === false) {

            //DEFAULT MESSAGE 
            if (errorMessage === false) {
                message += $(value).attr('id') + ' is required <br>';
            } else {
                message += errorMessage[key] + '<br>';
            }

            $(value).css({

                "border": "1px solid red",
                "background": "#FFCECE"
            });
        } else {

            if ($(value).val() !== '') {

                message += modalValidationCommonFunctions(type, value, errorMessage[key]);

            } else if (elementID.length > 1 && key !== 0 && elementID[key - 1] !== elementID[key]) {
                message += modalValidationCommonFunctions(type, value, errorMessage[key]);
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


    if (message !== '') {
        modalValidation(modalId, message);
    }

}

//VALIDATE TYPE MODAL
function modalValidation(modalId, message) {

    var pnl = `<div id="${modalId}" class="modal fade validationErrorMessage" role="dialog">
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

function modalValidationCommonFunctions(type, value, error) {

    var message = '';
    //CHECK FOR INTEGER
    if (type.toUpperCase() === 'INTEGER') {

        var integerResult = integerRegex(value);

        if (integerResult === false) {

            $(value).css({

                "border": "1px solid red",
                "background": "#FFCECE"
            });


            message = error + '<br>';

        }


    }


    //CHECK FOR DECIMAL
    if (type.toUpperCase() === 'DECIMAL') {

        var decimalResult = decimalRegex(value);

        if (decimalResult === false) {

            $(value).css({

                "border": "1px solid red",
                "background": "#FFCECE"
            });


            message = error + '<br>';

        }

    }

    return message;

}

//#endregion


//#region  **************** POPOVER VALIDTION ***************

//POPOVER ERROR MESSAGE
function showPopoverValidation(elementID, errorMessage, type, position, validationType) {

    $.each(elementID, function(key, value) {

        //BY DEFAULT PLACEMENT IS RIGHT
        var placement = '';
        if (position === false) {
            placement = 'right';
        } else {
            placement = position[key].toLowerCase();
        }

        //DEFAULT MESSAGE
        var message = '';
        if (errorMessage === false) {
            message = $(value).attr('id') + ' is required';
        } else {
            message = errorMessage[key];
        }

        var requiredResult = '';
        var type = validationType[key];

        if (type.toUpperCase() === "REQUIRED") {

            requiredResult = requiredRegex(value);
        }
        if (requiredResult === false) {

            validationTypePopover(value, message, placement);

        } else {

            if ($(value).val() !== '') {
                popoverValidationCommonFunction(type, value, message, placement);
            } else if (elementID.length > 1 && key !== 0 && elementID[key - 1] !== elementID[key]) {
                popoverValidationCommonFunction(type, value, message, placement);
            }
        }
        //REMOVE ERROR MESSAGE
        $(value).on('keyup', function() {

            if ($(this).val() !== '') {
                $(value).popover('hide');

                $(value).removeAttr('data-content');
                $(value).removeAttr('data-placement');
                $(value).removeClass('validationErrorMessage');

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
    $(value).addClass('validationErrorMessage');

    $(value).popover('show');

    $(value).css({

        "border": "1px solid red",
        "background": "#FFCECE"
    });
}


function popoverValidationCommonFunction(type, value, message, placement) {

    //CHECK FOR INTEGER
    if (type.toUpperCase() === 'INTEGER') {

        var integerResult = integerRegex(value);

        if (integerResult === false) {
            //message = ' Only integer allowed.';
            validationTypePopover(value, message, placement);
        }

    }
    //CHECK FOR DECIMAL
    if (type.toUpperCase() === 'DECIMAL') {

        var decimalResult = decimalRegex(value);

        if (decimalResult === false) {
            //message = ' Only decimal allowed.';
            validationTypePopover(value, message, placement);
        }

    }
}


//#endregion



/* ************* REGULAR EXPRESSION (REGEX) ************* */

//REQUIRED REGEX
function requiredRegex(value) {

    var patren = /\S+/;
    var patrenValue = $(value).val();
    var patrenResult = patren.test(patrenValue);
    return patrenResult;

}

//NUMBER REGEX
function integerRegex(value) {

    var patren = /^[0-9]+$/;
    var patrenValue = $(value).val();
    var patrenResult = patren.test(patrenValue);
    return patrenResult;


}

function decimalRegex(value) {

    var patren = /^\d+\.\d+$/;
    var patrenValue = $(value).val();
    var patrenResult = patren.test(patrenValue);
    return patrenResult;

}


function phoneRegex(value) {
    patren = /^(?:\([2-9]\d{2}\)\ ?|[2-9]\d{2}(?:\-?|\ ?))[2-9]\d{2}[- ]?\d{4}$/;
    var patrenValue = $(value).val();
    var patrenResult = patren.test(patrenValue);
    return patrenResult;
}