var submitFun = false;
var modalID = 'j2HTMLModal';

function modal() {

    var modalData = false;
    var appendTo = false;
    var submitButton = false;
    var modalFooter = true;
    var modalHeader = true;
    var modalBody = "This is body";
    var headingText = '';
    var bodyType = 'text';


    var error = '';

    var args = arguments[0][0];

    if (args.Data !== undefined) {
        modalData = args.Data;
    } else {
        error += 'Data is required.';
    }
    if (args.ModalID !== undefined) {
        modalID = args.ModalID;
    }
    if (args.AppendTo !== undefined) {
        appendTo = args.AppendTo;
    }
    if (args.Heading !== undefined) {
        headingText = args.Heading;
    }
    if (args.SubmitButton !== undefined) {
        submitButton = true;
    }
    if (args.BodyType !== undefined) {
        bodyType = args.BodyType;
    }

    if (args.SubmitFunction !== undefined) {
        submitFun = args.SubmitFunction;
    }


    if (error !== '') {
        alert('Data is required');
    } else {


        if ($(modalID).length !== 0) {
            $(modalID).remove();
        }

        var heading = '';

        if (modalHeader === true) {
            heading = '<div class="modal-header">\
                            <button type="button" class="close" data-dismiss="modal">&times;</button>\
                            <h4 class="modal-title">' + headingText + '</h4>\
                        </div>';
        }

        var footer = '';
        if (modalFooter === true && submitButton === false) {
            footer = '<div class="modal-footer">\
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\
                      </div>';
        }
        if (modalFooter === true && submitButton === true) {
            footer = "<div class='modal-footer'>\
                        <button type='button' class='btn btn-default' onclick='update(" + JSON.stringify(modalData) + ");'>Submit</button>\
                        <button type ='button' class='btn btn-default' data-dismiss='modal'> Close</button>\
                      </div>";
        }

        var tb = '<table>';
        if (bodyType.toLowerCase() === 'text') {
            modalBody = '<div class="modal-body">';



            $.each(modalData, function(i, v) {


                $.each(v, function(ii, vv) {
                    tb += '<tr>';
                    tb += '<td><b>' + ii + ': </b>' + '</td>';
                    tb += '<td>' + vv + '</td>';
                    tb += '</tr>';
                });


            });

            tb += '</table>';
            modalBody += tb;
            modalBody += '</div>';
        }

        if (bodyType.toLowerCase() === 'textbox') {
            modalBody = '<div class="modal-body">';

            $.each(modalData, function(i, v) {


                $.each(v, function(ii, vv) {

                    var id = 'txt' + ii + '"';

                    tb += '<tr>';
                    tb += '<td><b>' + ii + ': </b>' + '</td>';
                    tb += '<td><input id="' + id + ' type="text" class="form-control" value="' + vv + '"></td>';
                    tb += '</tr>';
                });


            });

            tb += '</table>';
            modalBody += tb;
            modalBody += '</div>';
        }

        var strModal = '<div id="' + modalID.replace('#', '') + '" class="modal fade" role="dialog">\
                        <div class="modal-dialog">\
                        <!-- Modal content-->\
                           <div class="modal-content">' +
            heading +
            modalBody +
            footer +
            '</div >\
                        </div>\
                        </div>';
        if (appendTo === false) {

            $('body').append(strModal);

            // if ($(modalID).length === 0) {
            //     $('body').append(strModal);
            // } else {
            //     $(modalID).remove();
            //     $('body').append(strModal);
            // }



        } else {

            $(appendTo).append(strModal);

            // if ($(modalID).length === 0) {
            //     $(appendTo).append(strModal);
            // } else {
            //     $(modalID).remove();
            //     $(appendTo).append(strModal);
            // }

        }

    }


}

function showModal() {

    var args = arguments[0][0];

    //var modalID = false;
    if (args !== undefined) {
        if (args.ModalID !== undefined) {
            modalID = args.ModalID;
        }
    } else {
        modalID = '#j2HTMLModal';
    }
    $(modalID).modal('show');
}

function hideModal() {

    var args = arguments[0][0];

    if (args !== undefined) {
        if (args.ModalID !== undefined) {
            modalID = args.ModalID;
        }
    } else {
        modalID = '#j2HTMLModal';
    }

    $(modalID).modal('hide');
}


function update(modalData) {

    var objData = {};

    $.each(modalData, function(i, v) {

        $.each(v, function(ii, vv) {

            if ($('#txt' + ii).val() !== vv) {

                objData[ii] = $('#txt' + ii).val();

            }

        });

    });

    if ($.isEmptyObject(objData) === false) {

        submitFun(objData);

    } else {

        submitFun('There is no change in the content');

    }


}