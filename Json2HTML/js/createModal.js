var updateFun = false;
var createFun = false;
var modalID = 'j2HTMLModal';

//ONLY WHEN CREATING MODAL FROM TABLE
//INSERT ROW, UPDATE ROW AND DELETE ROW
var tableID = false;
var updateButton = false;
var deleteButton = false;

function modal() {

    var modalData = false;
    var appendTo = false;
    var modalFooter = true;
    var modalHeader = true;
    var modalBody = "This is body";
    var headingText = '';
    var display = 'text';

    var tb = '<table>';


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
    if (args.Display !== undefined) {
        display = args.Display;
    }

    if (args.UpdateFunction !== undefined) {
        updateFun = args.UpdateFunction;
    } else {
        updateFun = false;
    }

    if (args.CreateFunction !== undefined) {
        createFun = args.CreateFunction;
    } else {
        createFun = false;
    }

    //ONLY WHEN CREATING MODAL FROM TABLE
    //INSERT ROW, UPDATE ROW AND DELETE ROW
    if (args.TableID !== undefined) {
        tableID = args.TableID;
    }
    if (args.UpdateButton !== false) {
        updateButton = true;
    }
    if (args.DeleteButton !== false) {
        deleteButton = true;
    }

    //ERROR CHECKING
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
        if (modalFooter === true && updateFun === false && createFun === false) {
            footer = '<div class="modal-footer">\
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\
                      </div>';
        }
        if (modalFooter === true && updateFun !== false && createFun === false) {
            footer = "<div class='modal-footer'>\
                        <button type='button' class='btn btn-default' onclick='update(" + JSON.stringify(modalData) + ");'>Update</button>\
                        <button type ='button' class='btn btn-default' data-dismiss='modal'> Close</button>\
                      </div>";
        }

        if (modalFooter === true && updateFun === false && createFun !== false) {
            footer = "<div class='modal-footer'>\
                        <button type='button' class='btn btn-default' onclick='insert(" + JSON.stringify(modalData) + ");'>Create</button>\
                        <button type ='button' class='btn btn-default' data-dismiss='modal'> Close</button>\
                      </div>";
        }

        //IF TEXT ONLY
        if (display.toLowerCase() === 'text' && updateFun === false && createFun === false) {
            modalBody = '<div class="modal-body">';

            $.each(modalData, function(i, v) {

                $.each(v, function(ii, vv) {

                    if (v.hasOwnProperty('Visible') === true && v.Visible === true && ii.toLowerCase() !== 'visible') {

                        tb += '<tr>';
                        tb += '<td><b>' + ii + ': </b>' + '</td>';
                        tb += '<td>' + vv + '</td>';
                        tb += '</tr>';
                    }
                    if (v.hasOwnProperty('Visible') === false) {
                        tb += '<tr>';
                        tb += '<td><b>' + ii + ': </b>' + '</td>';
                        tb += '<td>' + vv + '</td>';
                        tb += '</tr>';
                    }


                });


            });

            tb += '</table>';
            modalBody += tb;
            modalBody += '</div>';
        }

        if (display.toLowerCase() === 'textbox' && updateFun !== false && createFun === false) {

            createFun = false;

            modalBody = '<div class="modal-body">';

            $.each(modalData, function(i, v) {


                $.each(v, function(ii, vv) {

                    var id = 'txt' + ii + '"';


                    if (v.hasOwnProperty('Visible') === true && v.Visible === true && ii.toLowerCase() !== 'visible') {

                        tb += '<tr>';
                        tb += '<td><b>' + ii + ': </b>' + '</td>';
                        tb += '<td><input id="' + id + ' type="text" class="form-control" value="' + vv + '"></td>';
                        tb += '</tr>';

                    }


                    if (v.hasOwnProperty('Visible') === true && v.Visible === false && ii.toLowerCase() !== 'visible') {

                        tb += '<tr>';
                        tb += '<td><b>' + ii + ': </b>' + '</td>';
                        tb += '<td><input id="' + id + ' type="text" style="border:0;" value="' + vv + '" readonly></td>';
                        tb += '</tr>';
                    }

                    if (v.hasOwnProperty('Visible') === false) {
                        tb += '<tr>';
                        tb += '<td><b>' + ii + ': </b>' + '</td>';
                        tb += '<td><input id="' + id + ' type="text" class="form-control" value="' + vv + '"></td>';
                        tb += '</tr>';
                    }


                });


            });

            tb += '</table>';
            modalBody += tb;
            modalBody += '</div>';
        }



        if (display.toLowerCase() === 'textbox' && updateFun === false && createFun !== false) {

            updateFun = false;

            modalBody = '<div class="modal-body">';

            $.each(modalData, function(i, v) {

                var count = 0;
                $.each(v, function(ii, vv) {

                    var id = 'txt' + ii + '"';

                    if (v.hasOwnProperty('Visible') === true && v.Visible === true && ii.toLowerCase() !== 'visible') {

                        tb += '<tr>';
                        tb += '<td><b>' + ii + ': </b>' + '</td>';
                        tb += '<td><input id="' + id + ' type="text" class="form-control" placeholder="' + ii + '"></td>';
                        tb += '</tr>';

                    }


                    if (v.hasOwnProperty('Visible') === true && v.Visible === false && ii.toLowerCase() !== 'visible') {

                        tb += '<tr>';
                        tb += '<td><b>' + ii + ': </b>' + '</td>';
                        tb += '<td><input id="' + id + ' type="text"  class="form-control" placeholder="' + ii + '"></td>';
                        tb += '</tr>';
                    }

                    if (v.hasOwnProperty('Visible') === false) {
                        tb += '<tr>';
                        tb += '<td><b>' + ii + ': </b>' + '</td>';
                        tb += '<td><input id="' + id + ' type="text" class="form-control" placeholder="' + ii + '"></td>';
                        tb += '</tr>';
                    }


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

//UPDATE ROW DATA
function update(modalData) {

    var objData = {};
    var isContentUpdated = false;

    $.each(modalData, function(i, v) {

        $.each(v, function(ii, vv) {

            if (v.hasOwnProperty('Visible') === true && v.Visible === true && ii.toLowerCase() !== 'visible') {

                if ($('#txt' + ii).val() !== vv) {

                    isContentUpdated = true;
                }
            }
            if (v.hasOwnProperty('Visible') === true && ii.toLowerCase() !== 'visible') {
                objData[ii] = $('#txt' + ii).val();
            }

        });
    });

    if (isContentUpdated === true) {
        updateFun(objData);
    } else {
        updateFun('There is no change in the content');
    }


}

//INSERT NEW ROW DATA
function insert(modalData) {

    var objData = {};
    var isThereContent = false;

    $.each(modalData, function(i, v) {

        $.each(v, function(ii, vv) {

            if (v.hasOwnProperty('Visible') === true && v.Visible === true && ii.toLowerCase() !== 'visible') {

                if ($('#txt' + ii).val() !== '') {

                    isThereContent = true;
                }
            }
            if (v.hasOwnProperty('Visible') === true && ii.toLowerCase() !== 'visible') {
                objData[ii] = $('#txt' + ii).val();
            }

        });
    });

    if (isThereContent === true) {


        var rowNumber = 'tr' + $('#' + tableID + ' tbody tr').length;

        //INSERT ROW TO TABLE
        var tr = '<tr id="' + rowNumber + '">';
        $.each(modalData, function(i, v) {

            $.each(v, function(ii, vv) {

                if (v.hasOwnProperty('Visible') === true && v.Visible === true && ii.toLowerCase() !== 'visible') {
                    var newValue = $('#txt' + ii).val();
                    tr += '<td>' + newValue + '</td>';
                }
            });
        });



        if (updateButton !== false && deleteButton !== false) {

            //tb += "<td><a href='#' onclick='updateTableRow(" + JSON.stringify(editableArray) + ");'>Edit</a> </td>";
            tr += "<td><button class='btn btn-default' onclick='updateTableRow(" + JSON.stringify(objData) + ");'><span class='glyphicon glyphicon-pencil'></span></button></td>";
            //tb += "<td><a href='#' onclick='deleteTableRow(" + JSON.stringify(editableArray) + ");'>Delete</a> </td>";
            tr += "<td><button class='btn btn-default' onclick='deleteTableRow(" + JSON.stringify(objData) + ");'><span class='glyphicon glyphicon-trash'></span></button></td>";
        }
        if (updateButton === false && deleteButton !== false) {

            //tb += "<td><a href='#' onclick='deleteTableRow(" + JSON.stringify(editableArray) + ");'>Delete</a> </td>";
            tr += "<td><button class='btn btn-default' onclick='deleteTableRow(" + JSON.stringify(objData) + ");'><span class='glyphicon glyphicon-trash'></span></button></td>";
        }

        if (updateButton !== false && deleteButton === false) {

            //tb += "<td><a href='#' onclick='updateTableRow(" + JSON.stringify(editableArray) + ");'>Edit</a> </td>";
            tr += "<td><button class='btn btn-default' onclick='updateTableRow(" + JSON.stringify(objData) + ");'><span class='glyphicon glyphicon-pencil'></span></button></td>";
        }



        tr += '</tr>';
        $('#' + tableID + ' tbody').append(tr);


        createFun(objData);
    } else {
        createFun('There is no content');
    }





}