var updateFun = false;
var insertFun = false;
var modalID = 'j2HTMLModal';

function modal() {

    var modalData = false;
    var appendTo = false;
    //var submitButton = false;
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
    // if (args.SubmitButton !== undefined) {
    //     submitButton = true;
    // }
    if (args.BodyType !== undefined) {
        bodyType = args.BodyType;
    }

    if (args.UpdateFunction !== undefined) {
        updateFun = args.UpdateFunction;
    } else {
        updateFun = false;
    }

    if (args.InsertFunction !== undefined) {
        insertFun = args.InsertFunction;
    } else {
        insertFun = false;
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
        if (modalFooter === true && updateFun === false && insertFun === false) {
            footer = '<div class="modal-footer">\
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\
                      </div>';
        }
        if (modalFooter === true && updateFun !== false && insertFun === false) {
            footer = "<div class='modal-footer'>\
                        <button type='button' class='btn btn-default' onclick='update(" + JSON.stringify(modalData) + ");'>Update</button>\
                        <button type ='button' class='btn btn-default' data-dismiss='modal'> Close</button>\
                      </div>";
        }

        if (modalFooter === true && updateFun === false && insertFun !== false) {
            footer = "<div class='modal-footer'>\
                        <button type='button' class='btn btn-default' onclick='insert(" + JSON.stringify(modalData) + ");'>Create</button>\
                        <button type ='button' class='btn btn-default' data-dismiss='modal'> Close</button>\
                      </div>";
        }

        var tb = '<table>';
        if (bodyType.toLowerCase() === 'text' && updateFun === false && insertFun === false) {
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

        if (bodyType.toLowerCase() === 'textbox' && updateFun !== false && insertFun === false) {

            insertFun = false;

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



        if (bodyType.toLowerCase() === 'textbox' && updateFun === false && insertFun !== false) {

            updateFun = false;

            modalBody = '<div class="modal-body">';

            $.each(modalData, function(i, v) {


                $.each(v, function(ii, vv) {

                    var id = 'txt' + ii + '"';

                    tb += '<tr>';
                    tb += '<td><input id="' + id + ' type="text" class="form-control" placeholder="' + ii + '"></td>';
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

        } else {

            $(appendTo).append(strModal);

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

        updateFun(objData);

    } else {

        updateFun('There is no change in the content');

    }


}


function insert(modalData) {
    var objData = {};

    $.each(modalData, function(i, v) {

        $.each(v, function(ii, vv) {

            if ($('#txt' + ii).val() !== vv) {

                objData[ii] = $('#txt' + ii).val();
            }

        });

    });

    if ($.isEmptyObject(objData) === false) {

        insertFun(objData);

    } else {

        insertFun('There is no change in the content');

    }

}