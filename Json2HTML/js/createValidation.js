//REQUIRED FILED VALIDATION
var length = false;
var validateOn = false;

function validate() {

    var elementID = false;
    var displayType = false; //TEXT, MODAL, POPOVER
    var position = false; //TOP OR BOTTOM
    var errorMessage = false;
    var validationType = false;
    var regex = false;
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

        if (args.Regex === undefined) {
            regex = false;
        } else {
            regex = args.Regex;
        }

        if (args.Length === undefined) {
            length = false;
        } else {
            length = args.Length;
        }

        if (args.ValidateOn === undefined) {
            validateOn = false;
        } else {
            validateOn = args.validateOn;
        }

        //TEXT ERROR MESSAGE
        if (displayType.toUpperCase() === 'TEXT') {

            showTextValidation(elementID, position, errorMessage, validationType, regex);
        }
        //MODAL ERROR MESSAGE
        else if (displayType.toUpperCase() === 'MODAL') {

            showModalValidation(elementID, errorMessage, validationType, regex);
        }
        //POPOVER ERROR MESSAGE 
        else if (displayType.toUpperCase() === 'POPOVER') {

            if (args.position !== undefined) {
                position = args.Position;
            }

            showPopoverValidation(elementID, errorMessage, validationType, position, validationType, regex);
        }
    } else {
        alert(error);
    }
}


//#region ****************** TEXT VALIDATION ****************

function showTextValidation(elementID, position, errorMessage, validationType, regex) {

    //VALUE == ELEMENT ID


    $.each(elementID, (key, value) => {

        var type = validationType[key];

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

        //***********  VALIDATE ON FOCUS OUT **************
        if (validateOn === false) {

            $(document).on('focusout', value, () => {

                //REQUIRED VALIDATION
                if ($(value).val() === '' && type.toUpperCase() === "REQUIRED") {
                    textValidationCommonFunction(type, value, errorPosition, message, regex);
                }
                //NON-REQUIRED VALIDATION
                else {

                    if ($(value).val() !== '') {
                        textValidationCommonFunction(type, value, errorPosition, message, regex);
                    } else if (elementID.length > 1 && key !== 0 && elementID[key - 1] !== elementID[key]) {
                        textValidationCommonFunction(type, value, errorPosition, message, regex);
                    }
                }

            });

        }
        //********  VALIDATE ON CLICK **************
        else {

            //REQUIRED VALIDATION
            if ($(value).val() === '' && type.toUpperCase() === "REQUIRED") {
                textValidationCommonFunction(type, value, errorPosition, message, regex);
            }
            //NON-REQUIRED VALIDATION
            else {

                if ($(value).val() !== '') {
                    textValidationCommonFunction(type, value, errorPosition, message, regex);
                } else if (elementID.length > 1 && key !== 0 && elementID[key - 1] !== elementID[key]) {
                    textValidationCommonFunction(type, value, errorPosition, message, regex);
                }

                $(elementID[0]).focus();
            }


        }


        //REMOVE ERROR MESSAGE
        $(document).on('keyup', value, () => {

            if ($(value).val() !== '') {

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

function textValidationCommonFunction(type, value, errorPosition, message, regex) {

    //REQUIRED REGEX
    if (type.toUpperCase() === "REQUIRED") {

        requiredResult = requiredRegex(value);

        if (requiredResult === false) {

            $(value).focus();
            textValidation(value, errorPosition, message);
        }
    }


    //CUSTOM REGEX
    if (type.toUpperCase() === 'CUSTOM' && regex !== false) {
        var customResult = customRegex(value, regex);

        if (customResult === false) {

            $(value).focus();
            textValidation(value, errorPosition, message);
        }
    }

    //CHECK FOR INTEGER
    if (type.toUpperCase() === 'INTEGER') {

        var integerResult = integerRegex(value);

        if (integerResult === false) {

            $(value).focus();
            textValidation(value, errorPosition, message);
        }

    }
    //CHECK FOR DECIMAL
    if (type.toUpperCase() === 'DECIMAL') {

        var decimalResult = decimalRegex(value);

        if (decimalResult === false) {

            $(value).focus();
            textValidation(value, errorPosition, message);
        }

    }

    //CHECK FOR PHONE
    if (type.toUpperCase() === 'PHONE') {

        var phoneResult = phoneRegex(value);

        if (phoneResult === false) {

            $(value).focus();
            textValidation(value, errorPosition, message);
        }

    }

    //CHECK FOR DATE
    if (type.toUpperCase() === 'DATE') {

        var dateResult = dateRegex(value);

        if (dateResult === false) {

            $(value).focus();
            textValidation(value, errorPosition, message);
        }

    }

    //CHECK FOR EMAIL
    if (type.toUpperCase() === 'EMAIL') {

        var emailResult = emailRegex(value);

        if (emailResult === false) {

            $(value).focus();
            textValidation(value, errorPosition, message);
        }

    }


    //CHECK FOR ZIP CODE
    if (type.toUpperCase() === 'ZIP') {

        var zipResult = zipcodeRegex(value);

        if (zipResult === false) {

            $(value).focus();
            textValidation(value, errorPosition, message);
        }

    }

    //CHECK FOR URL
    if (type.toUpperCase() === 'URL') {

        var urlResult = urlRegex(value);

        if (urlResult === false) {

            $(value).focus();
            textValidation(value, errorPosition, message);
        }

    }

    //CHECK FOR MAX LENGTH
    if (type.toUpperCase() === 'MAXLENGTH') {

        var maxLengthResult = maxLengthRegex(value);

        if (maxLengthResult === false) {

            $(value).focus();
            textValidation(value, errorPosition, message);
        }

    }




}

//#endregion


//#region ****************** MODAL VALIDATION ***************

//SHOW MODAL VALIDATION
function showModalValidation(elementID, errorMessage, validationType, regex) {

    var modalId = 'ValidationErrorMessageModal';


    var message = '';

    $.each(elementID, (key, value) => {

        var requiredResult = '';
        var type = validationType[key];

        $(document).on('focusout', value, () => {

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

                    message += modalValidationCommonFunctions(type, value, errorMessage[key], regex);

                } else if (elementID.length > 1 && key !== 0 && elementID[key - 1] !== elementID[key]) {
                    message += modalValidationCommonFunctions(type, value, errorMessage[key], regex);
                }

            }

            if (message !== '') {
                modalValidation(modalId, message);
            }

        });

        // if (type.toUpperCase() === "REQUIRED") {

        //     requiredResult = requiredRegex(value);
        // }
        // if (requiredResult === false) {

        //     //DEFAULT MESSAGE 
        //     if (errorMessage === false) {
        //         message += $(value).attr('id') + ' is required <br>';
        //     } else {
        //         message += errorMessage[key] + '<br>';
        //     }

        //     $(value).css({

        //         "border": "1px solid red",
        //         "background": "#FFCECE"
        //     });
        // } else {

        //     if ($(value).val() !== '') {

        //         message += modalValidationCommonFunctions(type, value, errorMessage[key], regex);

        //     } else if (elementID.length > 1 && key !== 0 && elementID[key - 1] !== elementID[key]) {
        //         message += modalValidationCommonFunctions(type, value, errorMessage[key], regex);
        //     }

        // }

        //REMOVE ERROR MESSAGE
        $(document).on('keyup', value, () => {

            if ($(value).val() !== '') {
                $(value + 'TextErrorMessage').remove();

                $(value).css({

                    "border": "",
                    "background": ""
                });
            }
        });

    });


    // if (message !== '') {
    //     modalValidation(modalId, message);
    // }

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

function modalValidationCommonFunctions(type, value, error, regex) {

    var message = '';






    //CHECK FOR CUSTOM
    if (type.toUpperCase() === 'CUSTOM') {

        var customResult = customRegex(value, regex);

        if (customResult === false) {

            $(value).css({

                "border": "1px solid red",
                "background": "#FFCECE"
            });

            message = error + '<br>';
        }
    }


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


    //CHECK FOR PHONE
    if (type.toUpperCase() === 'PHONE') {

        var phoneResult = phoneRegex(value);

        if (phoneResult === false) {

            $(value).css({

                "border": "1px solid red",
                "background": "#FFCECE"
            });


            message = error + '<br>';

        }

    }

    //CHECK FOR DATE
    if (type.toUpperCase() === 'DATE') {

        var dateResult = dateRegex(value);

        if (dateResult === false) {

            $(value).css({

                "border": "1px solid red",
                "background": "#FFCECE"
            });


            message = error + '<br>';

        }

    }

    //CHECK FOR EMAIL
    if (type.toUpperCase() === 'EMAIL') {

        var emailResult = emailRegex(value);

        if (emailResult === false) {

            $(value).css({

                "border": "1px solid red",
                "background": "#FFCECE"
            });


            message = error + '<br>';

        }

    }


    //CHECK FOR ZIP
    if (type.toUpperCase() === 'ZIP') {

        var zipResult = zipcodeRegex(value);

        if (zipResult === false) {

            $(value).css({

                "border": "1px solid red",
                "background": "#FFCECE"
            });


            message = error + '<br>';

        }

    }

    //CHECK FOR URL
    if (type.toUpperCase() === 'URL') {

        var urlResult = urlRegex(value);

        if (urlResult === false) {

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
function showPopoverValidation(elementID, errorMessage, type, position, validationType, regex) {

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

        //VALIDATE FOCUS OUT
        if (validateOn === false) {

            $(document).on('focusout', value, () => {

                //REQUIRED VALIDATION
                if ($(value).val() === '' && type.toUpperCase() === "REQUIRED") {
                    //validationTypePopover(value, message, placement);
                    popoverValidationCommonFunction(type, value, message, placement, regex);
                }
                //NON-REQUIRED VALIDATION
                else {

                    if ($(value).val() !== '') {
                        popoverValidationCommonFunction(type, value, message, placement, regex);
                    } else if (elementID.length > 1 && key !== 0 && elementID[key - 1] !== elementID[key]) {
                        popoverValidationCommonFunction(type, value, message, placement, regex);
                    }
                }

            });

        }
        //********  VALIDATE ON CLICK **************
        else {

            if ($(value).val() === '' && type.toUpperCase() === "REQUIRED") {
                validationTypePopover(value, message, placement);
            }
            //NON-REQUIRED VALIDATION
            else {

                if ($(value).val() !== '') {
                    popoverValidationCommonFunction(type, value, message, placement, regex);
                } else if (elementID.length > 1 && key !== 0 && elementID[key - 1] !== elementID[key]) {
                    popoverValidationCommonFunction(type, value, message, placement, regex);
                }
            }

            $(elementID[0]).focus();
        }












        // $(document).on('focusout', value, () => {

        //     if (type.toUpperCase() === "REQUIRED") {

        //         requiredResult = requiredRegex(value);
        //     }
        //     if (requiredResult === false) {

        //         validationTypePopover(value, message, placement);

        //     } else {

        //         if ($(value).val() !== '') {
        //             popoverValidationCommonFunction(type, value, message, placement, regex);
        //         } else if (elementID.length > 1 && key !== 0 && elementID[key - 1] !== elementID[key]) {
        //             popoverValidationCommonFunction(type, value, message, placement, regex);
        //         }
        //     }

        // });





        // if (type.toUpperCase() === "REQUIRED") {

        //     requiredResult = requiredRegex(value);
        // }
        // if (requiredResult === false) {

        //     validationTypePopover(value, message, placement);

        // } else {

        //     if ($(value).val() !== '') {
        //         popoverValidationCommonFunction(type, value, message, placement, regex);
        //     } else if (elementID.length > 1 && key !== 0 && elementID[key - 1] !== elementID[key]) {
        //         popoverValidationCommonFunction(type, value, message, placement, regex);
        //     }
        // }



        //REMOVE ERROR MESSAGE
        $(document).on('keyup', value, () => {

            if ($(value).val() !== '') {
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


function popoverValidationCommonFunction(type, value, message, placement, regex) {

    //REQUIRED REGEX
    if (type.toUpperCase() === "REQUIRED") {

        requiredResult = requiredRegex(value);

        if (requiredResult === false) {

            $(value).focus();
            validationTypePopover(value, message, placement);
        }
    }



    //CHECK FOR CUSTOM
    if (type.toUpperCase() === 'CUSTOM') {

        var customResult = customRegex(value, regex);

        if (customResult === false) {

            $(value).focus();
            validationTypePopover(value, message, placement);
        }

    }



    //CHECK FOR INTEGER
    if (type.toUpperCase() === 'INTEGER') {

        var integerResult = integerRegex(value);

        if (integerResult === false) {

            $(value).focus();
            validationTypePopover(value, message, placement);
        }

    }
    //CHECK FOR DECIMAL
    if (type.toUpperCase() === 'DECIMAL') {

        var decimalResult = decimalRegex(value);

        if (decimalResult === false) {

            $(value).focus();
            validationTypePopover(value, message, placement);
        }

    }

    //CHECK FOR PHONE
    if (type.toUpperCase() === 'PHONE') {

        var phoneResult = phoneRegex(value);

        if (phoneResult === false) {

            $(value).focus();
            validationTypePopover(value, message, placement);
        }

    }

    //CHECK FOR DATE
    if (type.toUpperCase() === 'DATE') {

        var dateResult = dateRegex(value);

        if (dateResult === false) {

            $(value).focus();
            validationTypePopover(value, message, placement);
        }

    }


    //CHECK FOR EMAIL
    if (type.toUpperCase() === 'EMAIL') {

        var emailResult = emailRegex(value);

        if (emailResult === false) {

            $(value).focus();
            validationTypePopover(value, message, placement);
        }

    }


    //CHECK FOR ZIP CODE
    if (type.toUpperCase() === 'ZIP') {

        var zipResult = zipcodeRegex(value);

        if (zipResult === false) {

            $(value).focus();
            validationTypePopover(value, message, placement);
        }

    }

    //CHECK FOR URL
    if (type.toUpperCase() === 'URL') {

        var urlResult = urlRegex(value);

        if (urlResult === false) {

            $(value).focus();
            validationTypePopover(value, message, placement);
        }

    }
}


//#endregion



/* ************* REGULAR EXPRESSION (REGEX) ************* */

//CUSTOM REGEX
function customRegex(value, strRegex) {
    var patren = new RegExp(strRegex);
    var patrenValue = $(value).val();
    var patrenResult = patren.test(patrenValue);
    return patrenResult;
}

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

// DECIMAL REGEX
function decimalRegex(value) {

    var patren = /^\d+\.\d+$/;
    var patrenValue = $(value).val();
    var patrenResult = patren.test(patrenValue);
    return patrenResult;

}

//PHONE REGEX
function phoneRegex(value) {
    var patren = /^(?:\([2-9]\d{2}\)\ ?|[2-9]\d{2}(?:\-?|\ ?))[2-9]\d{2}[- ]?\d{4}$/;
    var patrenValue = $(value).val();
    var patrenResult = patren.test(patrenValue);
    return patrenResult;
}

//DATE REGEX
function dateRegex(value) {
    var patren = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    var patrenValue = $(value).val();
    var patrenResult = patren.test(patrenValue);
    return patrenResult;
}

//EMAIL REGEX
function emailRegex(value) {
    var patren = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var patrenValue = $(value).val();
    var patrenResult = patren.test(patrenValue);
    return patrenResult;
}

//ZIP CODE REGEX
function zipcodeRegex(value) {

    var patren = /^\d{5}(?:[-\s]\d{4})?$/;
    var patrenValue = $(value).val();
    var patrenResult = patren.test(patrenValue);
    return patrenResult;
}

//URL ADDRESS REGEX
function urlRegex(value) {
    var patren = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var patrenValue = $(value).val();
    var patrenResult = patren.test(patrenValue);
    return patrenResult;
}

//MAX LENGTH REGEX
function maxLengthRegex(value) {

    if (length !== false) {


        //^.{6,7}$
        var patren = new RegExp('/^.{' + length + '}$/');
        var patrenValue = $(value).val();
        var patrenResult = patren.test(patrenValue);
        return patrenResult;
    } else {
        alert('length is required');
    }


}