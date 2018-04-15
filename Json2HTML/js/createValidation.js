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
            textErrorMessage(elementID, position, errorMessage);
        }
        //MODAL ERROR MESSAGE
        else if (displayType.toUpperCase() === 'MODAL') {
            modalErrorMessage(elementID, errorMessage);
        }

        $(elementID).on('keyup', function() {

            $(elementID + 'ErrorMessage').remove();

        });

    }
}

//TEXT ERROR MESSAGE
function textErrorMessage(elementID, position, errorMessage) {

    var patren = /\S+/;
    var value = $(elementID).val();
    var result = patren.test(value);

    if (result === false) {
        if (position == 'TOP') {
            $(elementID).before('<span id="' + elementID.slice(1, elementID.length) + 'TextErrorMessage">' + errorMessage + '</span>');
        } else if (position == 'BOTTOM') {
            $(elementID).after('<span id="' + elementID.slice(1, elementID.length) + 'TextErrorMessage">' + errorMessage + '</span>');
        }
    }
}

function modalErrorMessage(elementID, errorMessage) {
    var patren = /\S+/;
    var value = $(elementID).val();
    var result = patren.test(value);

    var modalId = elementID.slice(1, elementID.length) + 'ModalErrorMessage';

    if (result === false) {

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

    }
}