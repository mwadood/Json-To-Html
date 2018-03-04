var updateFun = false;
var createFun = false;
var modalID = '#j2HTMLModal';

//ONLY WHEN CREATING MODAL FROM TABLE
//INSERT ROW, UPDATE ROW AND DELETE ROW
var tableID = false;
var updateButton = false;
var deleteButton = false;
var rowId = false;

function modal() {

    var args = arguments[0][0];

    var modalData = false;
    var appendTo = false;
    var modalFooter = true;
    var modalHeader = true;
    var modalBody = "This is body";
    var headingText = '';
    var display = 'text';

    var customColumns = false;


    var tb = '<table>';


    var error = '';




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
    if (args.Header !== undefined) {
        modalHeader = args.Header;
    }
    if (args.Footer !== undefined) {
        modalFooter = args.Footer;
    }
    if (args.CustomColumns !== undefined) {
        customColumns = args.CustomColumns;
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

    if (args.RowID !== false) {
        rowId = args.RowID;
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

    //ERROR CHECKING
    if (error !== '') {
        alert('Data is required');
    } else {

        var ddlIDmodalBodyId = '';

        modalBodyId = modalID.replace('#', '');

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


        //IF RADIO BUTTON
        if (display.toLowerCase() === 'RadioButton'.toLowerCase() && updateFun === false && createFun === false) {

            modalBody = '<div id="rdb' + modalBodyId + '"class="modal-body"></div>';
        }

        //IF CHECKBOX
        if (display.toLowerCase() === 'Checkbox'.toLowerCase() && updateFun === false && createFun === false) {

            modalBody = '<div id="chk' + modalBodyId + '"class="modal-body"></div>';
        }

        //IF DROPDOWN
        if (display.toLowerCase() === 'Dropdown'.toLowerCase() && updateFun === false && createFun === false) {

            modalBody = '<div id="' + modalBodyId + 'ModalBody" class="modal-body"></div>';
        }


        var ntb = '';
        //*********************************************/
        // ************ TEXT ********************
        //*********************************************/
        if (display.toLowerCase() === 'text' && updateFun === false && createFun === false) {

            modalBody = '<div id="' + modalBodyId + 'ModalBody"class="modal-body">';

            //CUSTOM COLUMNS  
            if (customColumns !== false) {

                $.each(modalData, function(i, v) {

                    ntb += '<table style="width:95%">';

                    $.each(v, function(ii, vv) {


                        $.each(customColumns, function(colKey, cokValue) {

                            var orginalColumnName = customColumns[colKey].orginalColumnName;
                            var newColumnName = customColumns[colKey].newColumnName;
                            var isColumnVisible = customColumns[colKey].Visible;

                            if (orginalColumnName.toLowerCase() === ii.toLowerCase() && isColumnVisible === true) {

                                ntb += '<tr>';
                                ntb += '<td style="width:auto"><b>' + newColumnName + ': </b>' + '</td>';
                                ntb += '<td style="width:auto">' + vv + '</td>';
                                ntb += '</tr>';

                            }

                        });

                    });

                    ntb += '</table><hr>';
                });

                modalBody += ntb;

                //modalBody = modalBody.slice(0, -2);
                modalBody += '</div>';


            }
            //DEFAULT COLUMNS  
            else {

                $.each(modalData, function(i, v) {

                    ntb += '<table style="width:95%">';

                    $.each(v, function(ii, vv) {

                        if (v.hasOwnProperty('Visible') === true && v.Visible === true && ii.toLowerCase() !== 'visible') {

                            ntb += '<tr>';
                            ntb += '<td style="width:auto"><b>' + ii + ': </b>' + '</td>';
                            ntb += '<td style="width:auto">' + vv + '</td>';
                            ntb += '</tr>';
                        }
                        if (v.hasOwnProperty('Visible') === false) {

                            ntb += '<tr>';
                            ntb += '<td style="width:auto"><b>' + ii + ': </b>' + '</td>';
                            ntb += '<td style="width:auto">' + vv + '</td>';
                            ntb += '</tr>';
                        }


                    });

                    ntb += '</table><hr>';

                });



                modalBody += ntb;

                //modalBody = modalBody.slice(0, -2);
                modalBody += '</div>';
            }

        }

        //*********************************************/
        // ********** TEXTBOX ******************
        //*********************************************/

        //CUSTOM COLUMNS  
        if (customColumns !== false && display.toLowerCase() === 'textbox') {

            modalBody = '<div id="' + modalBodyId + 'ModalBody"class="modal-body">';

            $.each(modalData, function(i, v) {

                ntb += '<table style="width:95%">';

                $.each(v, function(ii, vv) {

                    $.each(customColumns, function(colKey, cokValue) {

                        var orginalColumnName = customColumns[colKey].orginalColumnName;
                        var newColumnName = customColumns[colKey].newColumnName;
                        var isColumnVisible = customColumns[colKey].Visible;

                        if (orginalColumnName.toLowerCase() === ii.toLowerCase() && isColumnVisible === true) {

                            var id = 'txt' + ii + '"';

                            if (v.hasOwnProperty('Visible') === true && v.Visible === true && ii.toLowerCase() !== 'visible') {

                                ntb += '<tr>';
                                ntb += '<td><b>' + ii + ': </b>' + '</td>';
                                ntb += '<td><input id="' + id + ' type="text" class="form-control ' + id + ' value="' + vv + '"></td>';
                                ntb += '</tr>';
                            }
                            if (v.hasOwnProperty('Visible') === false) {

                                ntb += '<tr>';
                                ntb += '<td><b>' + ii + ': </b>' + '</td>';
                                ntb += '<td><input id="' + id + ' type="text" class="form-control ' + id + ' value="' + vv + '"></td>';
                                ntb += '</tr>';
                            }

                        }

                    });

                });

                ntb += '</table><hr>';
            });

            modalBody += ntb;

            //modalBody = modalBody.slice(0, -2);
            modalBody += '</div>';
        }

        //DEFAULT COLUMNS  
        else {


            //NO UPDATE AND CREATE
            if (display.toLowerCase() === 'textbox' && updateFun === false && createFun === false) {

                modalBody = '<div id="' + modalBodyId + '"class="modal-body">';

                $.each(modalData, function(i, v) {

                    ntb = '<table>';

                    $.each(v, function(ii, vv) {

                        var id = 'txt' + ii + '"';

                        if (v.hasOwnProperty('Visible') === true && v.Visible === true && ii.toLowerCase() !== 'visible') {

                            ntb += '<tr>';
                            ntb += '<td><b>' + ii + ': </b>' + '</td>';
                            ntb += '<td><input id="' + id + ' type="text" class="form-control ' + id + ' value="' + vv + '"></td>';
                            ntb += '</tr>';
                        }
                        if (v.hasOwnProperty('Visible') === false) {

                            ntb += '<tr>';
                            ntb += '<td><b>' + ii + ': </b>' + '</td>';
                            ntb += '<td><input id="' + id + ' type="text" class="form-control ' + id + ' value="' + vv + '"></td>';
                            ntb += '</tr>';
                        }


                    });

                    ntb += '</table><hr>';
                    modalBody += ntb;
                });

                //modalBody = modalBody.slice(0, -2);
                modalBody += '</div>';
            }

            //UPDATE
            if (display.toLowerCase() === 'textbox' && updateFun !== false && createFun === false) {

                createFun = false;

                modalBody = '<div id="' + modalBodyId + '" class="modal-body">';

                $.each(modalData, function(i, v) {


                    $.each(v, function(ii, vv) {

                        var id = 'txt' + ii + '"';


                        if (v.hasOwnProperty('Visible') === true && v.Visible === true && ii.toLowerCase() !== 'visible') {

                            tb += '<tr>';
                            tb += '<td><b>' + ii + ': </b>' + '</td>';
                            tb += '<td><input id="' + id + ' type="text" class="form-control ' + id + ' value="' + vv + '"></td>';
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
                            tb += '<td><input id="' + id + ' type="text" class="form-control ' + id + ' value="' + vv + '"></td>';
                            tb += '</tr>';
                        }


                    });


                });

                tb += '</table>';
                modalBody += tb;
                modalBody += '</div>';
            }

            //CREATE
            if (display.toLowerCase() === 'textbox' && updateFun === false && createFun !== false) {

                updateFun = false;

                modalBody = '<div id="' + modalBodyId + '" class="modal-body">';

                $.each(modalData, function(i, v) {

                    var count = 0;
                    $.each(v, function(ii, vv) {

                        var id = 'txt' + ii + '"';

                        if (v.hasOwnProperty('Visible') === true && v.Visible === true && ii.toLowerCase() !== 'visible') {

                            tb += '<tr>';
                            tb += '<td><b>' + ii + ': </b>' + '</td>';
                            tb += '<td><input id="' + id + ' type="text" class="form-control ' + id + ' placeholder="' + ii + '"></td>';
                            tb += '</tr>';

                        }


                        if (v.hasOwnProperty('Visible') === true && v.Visible === false && ii.toLowerCase() !== 'visible') {

                            tb += '<tr>';
                            tb += '<td><b>' + ii + ': </b>' + '</td>';
                            tb += '<td><input id="' + id + ' type="text"  class="form-control ' + id + ' placeholder="' + ii + '"></td>';
                            tb += '</tr>';
                        }

                        if (v.hasOwnProperty('Visible') === false) {
                            tb += '<tr>';
                            tb += '<td><b>' + ii + ': </b>' + '</td>';
                            tb += '<td><input id="' + id + ' type="text" class="form-control ' + id + ' placeholder="' + ii + '"></td>';
                            tb += '</tr>';
                        }


                    });


                });

                tb += '</table>';
                modalBody += tb;
                modalBody += '</div>';
            }

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


            //*********************************************/
            // ************ IF DROPDOWN ********************
            //*********************************************/
            if (display.toLowerCase() === 'Dropdown'.toLowerCase() && updateFun === false && createFun === false) {

                var ddl = '<select id="ddl' + modalBodyId + '" class="form-control" ><option value="-1">Select...</option></select>';
                $('#' + modalBodyId + 'ModalBody').html(ddl);


            }

        } else {

            $(appendTo).append(strModal);
            //IF DROPDOWN
            if (display.toLowerCase() === 'Dropdown'.toLowerCase() && updateFun === false && createFun === false) {


                var ddl1 = '<select id="ddl' + modalBodyId + '" class="form-control" ><option value="-1">Select...</option></select>';
                $('#' + modalBodyId + 'ModalBody').html(ddl1);


            }

        }

    }


}




function showModal() {

    var args = arguments[0][0];

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




/**
 * Update modal for table
 * 
 * @param {any} modalData 
 */
function update(modalData) {

    var id = '';

    if (rowId !== false) {
        id = rowId.substring(2, rowId.length);
    }

    var objData = {};
    var isContentUpdated = false;

    $.each(modalData, function(i, v) {

        $.each(v, function(ii, vv) {

            if (v.hasOwnProperty('Visible') === true && v.Visible === true && ii.toLowerCase() !== 'visible') {

                if ($('#txt' + ii).val() !== vv) {

                    var colID = 'td' + id + ii;
                    $(tableID + ' tbody tr#tr' + id + ' td#' + colID).empty();
                    $(tableID + ' tbody tr#tr' + id + ' td#' + colID).append($('#txt' + ii).val());

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



/**
 * Insert modal for Table
 * 
 * @param {any} modalData 
 */
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

        var rowNumber = 'tr' + $(tableID + ' tbody tr').length;

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

            //tb += "<td><a href='#' onclick='j2HTMLUpdateTableRow(" + JSON.stringify(editableArray) + ");'>Edit</a> </td>";
            tr += "<td><button class='btn btn-default' onclick='j2HTMLUpdateTableRow(" + JSON.stringify(objData) + ");'><span class='glyphicon glyphicon-pencil'></span></button></td>";
            //tb += "<td><a href='#' onclick='deleteTableRow(" + JSON.stringify(editableArray) + ");'>Delete</a> </td>";
            tr += "<td><button class='btn btn-default' onclick='j2HTMLDeleteTableRow(" + JSON.stringify(objData) + ");'><span class='glyphicon glyphicon-trash'></span></button></td>";
        }
        if (updateButton === false && deleteButton !== false) {

            //tb += "<td><a href='#' onclick='deleteTableRow(" + JSON.stringify(editableArray) + ");'>Delete</a> </td>";
            tr += "<td><button class='btn btn-default' onclick='j2HTMLDeleteTableRow(" + JSON.stringify(objData) + ");'><span class='glyphicon glyphicon-trash'></span></button></td>";
        }

        if (updateButton !== false && deleteButton === false) {

            //tb += "<td><a href='#' onclick='updateTableRow(" + JSON.stringify(editableArray) + ");'>Edit</a> </td>";
            tr += "<td><button class='btn btn-default' onclick='j2HTMLUpdateTableRow(" + JSON.stringify(objData) + ");'><span class='glyphicon glyphicon-pencil'></span></button></td>";
        }



        tr += '</tr>';
        $(tableID + ' tbody').append(tr);


        createFun(objData);
    } else {
        createFun('There is no content');
    }
}