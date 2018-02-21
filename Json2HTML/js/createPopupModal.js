var confirmFun = false;

function popupMessage() {

    var args = arguments[0][0];

    var popupId = '#j2HTMLPopupMessage';
    var type = false;
    var heading = false;
    var message = false;
    var popupFooter = true;
    var popupHeader = true;


    var error = '';

    if (args.Message !== undefined) {
        message = args.Message;
    } else {
        error += 'Message required\n';
    }
    if (args.Heading !== undefined) {
        heading = args.Heading;
    } else {
        error += 'Heading required\n';
    }

    if (args.PopupID !== undefined) {
        popupId = args.PopupID;
    }

    if (args.Type !== undefined) {
        type = args.Type;
    }

    if (args.Header !== undefined) {
        popupHeader = args.Header;
    }
    if (args.Footer !== undefined) {
        popupFooter = args.Footer;
    }
    if (args.ConfirmFunction !== undefined) {
        confirmFun = args.ConfirmFunction;
    }

    if (type.toLowerCase() === 'confirm' && confirmFun === false) {
        error += 'Confirm funtion required';
    }


    if (error === '') {

        var header = '';
        if (popupHeader === true) {
            header = '<div class="modal-header">\
                            <button type="button" class="close" data-dismiss="modal">&times;</button>\
                            <h4 class="modal-title">' + heading + '</h4>\
                        </div>';
        }

        var footer = '';
        if (popupFooter === true && type.toLowerCase() === 'error') {
            footer = '<div class="modal-footer">\
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\
                      </div>';
        }
        if (popupFooter === true && type.toLowerCase() === 'confirm') {
            footer = '<div class="modal-footer">\
                        <button type="button" class="btn btn-default" onclick="callConfirmFunction();">Yes</button>\
                        <button type = "button" class="btn btn-default" data-dismiss="modal"> No</button >\
                      </div>';
        }

        var body = '';
        body = '<div id="' + popupId.replace('#', '') + 'ModalBody" class="modal-body"><p>' + message + '</p></div>';

        var strModal = '<div id="' + popupId.replace('#', '') + '" class="modal fade" role="dialog">\
        <div class="modal-dialog">\
        <!-- Modal content-->\
           <div class="modal-content">' +
            header +
            body +
            footer +
            '</div >\
        </div>\
        </div>';

        $('body').append(strModal);

    } else {
        alert(error);
    }

}

function showPopup() {

    var args = arguments[0][0];

    if (args !== undefined) {
        if (args.PopupID !== undefined) {
            popupID = args.ID;
        }
    } else {
        popupID = '#j2HTMLPopupMessage';
    }
    $(popupID).modal('show');
}

function hidePopup() {

    var args = arguments[0][0];

    if (args !== undefined) {
        if (args.PopupID !== undefined) {
            popupID = args.PopupID;
        }
    } else {
        popupID = '#j2HTMLModal';
    }

    $(popupID).modal('hide');
}

function callConfirmFunction() {

    if (confirmFun !== false) {
        confirmFun();
    }
}