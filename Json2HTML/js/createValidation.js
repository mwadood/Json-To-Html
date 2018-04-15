//REQUIRED FILED VALIDATION
function required() {

    var elementID = false;
    var displayType = false; //TEXT, MODAL, POPOVER
    var position = false; //TOP OR BOTTOM
    var errorMessage = false;
    //var popoverPosition = false; // BY DEFAULT RIGHT

    var args = arguments[0][0];

    if (args.ElementID === undefined) {

        alert('Element ID is required');
    } else {

        elementID = args.ElementID;

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

            textErrorMessage(elementID, position, errorMessage, 'required');
        }
        //MODAL ERROR MESSAGE
        else if (displayType.toUpperCase() === 'MODAL') {

            modalErrorMessage(elementID, errorMessage, 'required');
        }
        //POPOVER ERROR MESSAGE 
        else if (displayType.toUpperCase() === 'POPOVER') {

            if (args.position !== undefined) {
                position = args.Position;
            }

            popoverErrorMessage(elementID, errorMessage, 'required', position);
        }
    }
}

//TEXT ERROR MESSAGE
function textErrorMessage(elementID, position, errorMessage, type) {

    $.each(elementID, function(key, value) {

        var patren = '';
        if (type === 'required') {
            patren = requiredRegex();
        }

        var elementValue = $(value).val();
        var result = patren.test(elementValue);
        if (result === false) {

            //DEFAULT MESSAGE ('REQUIRED')
            var message = '';
            if (errorMessage === false) {
                message = $(value).attr('id') + ' is required';
            } else {
                message = errorMessage[key];
            }

            var errorPosition = '';
            if (position === false) {
                errorPosition = 'BOTTOM'.toUpperCase();
            } else {
                errorPosition = position[key].toUpperCase();

            }

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
        }
    });
}

//MODAL ERROR MESSAGE
function modalErrorMessage(elementID, errorMessage, type) {

    var modalId = 'ValidationErrorMessageModal';


    var message = '';

    $.each(elementID, function(key, value) {

        var patren = '';
        if (type === 'required') {
            patren = requiredRegex();
        }
        var elementVal = $(value).val();
        var result = patren.test(elementVal);
        if (result === false) {


            //DEFAULT MESSAGE ('REQUIRED')

            if (errorMessage === false) {
                message += $(value).attr('id') + ' is required <br>';
            } else {
                message += errorMessage[key] + '<br>';
            }



            //modalErrorMessages += errorMessage[key] + '<br>';
        }
    });

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
function popoverErrorMessage(elementID, errorMessage, type, position) {

    $.each(elementID, function(key, value) {

        var patren = '';
        if (type === 'required') {
            patren = requiredRegex();
        }

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

        var elementValue = $(value).val();
        var result = patren.test(elementValue);
        if (result === false) {

            $(value).attr('data-content', message);
            $(value).attr('data-placement', placement);

            $(value).popover('show');

            $(value).css({

                "border": "1px solid red",
                "background": "#FFCECE"
            });

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

        }







    });



}







/* ************* REGULAR EXPRESSION (REGEX) ************* */

//REQUIRED REGEX
function requiredRegex() {
    return /\S+/;
}