var appendTo = false;
var createButtonAppendTo = false;
var data = false;
var tableID = '#tbJsonToHtml';
var hasDefaultHeader = true;
var customHeader = false;
var addToColumn = false;
var tableSort = true;

var funUpdate = false;
var funCreate = false;
var funDelete = false;

var tb = '';
var headerRow = [];

//var modalData = '';
var editable = {};
var editableArray = [];
var preStr = '';

//****************************************************************************
//********************* CREATE TABLE FROM JSON *******************************
//****************************************************************************
function table() {

    appendTo = false;
    createButtonAppendTo = false;
    data = false;
    tableID = '#tbJsonToHtml';
    hasDefaultHeader = true;
    customHeader = false;
    addToColumn = false;
    tableSort = true;

    funUpdate = false;
    funCreate = false;
    funDelete = false;

    tb = '';
    headerRow = [];

    //var modalData = '';
    editable = {};
    editableArray = [];
    preStr = '';

    var args = arguments[0][0];

    if (args.Data === undefined) {

        alert('Data is required in order to create table');
    } else {

        if (args.Data !== undefined) {
            data = args.Data;
        }
        if (args.AppendTo !== undefined) {
            appendTo = args.AppendTo;
        }

        if (args.CreateButtonAppendTo !== undefined) {
            createButtonAppendTo = args.CreateButtonAppendTo;
        }

        if (args.TableID !== undefined) {
            tableID = args.TableID;
        }

        if (args.DefaultHeader !== undefined) {
            hasDefaultHeader = args.DefaultHeader;
        }


        if (args.CustomHeader !== undefined) {
            customHeader = args.CustomHeader;
        }

        if (args.AddToColumn !== undefined) {
            addToColumn = args.AddToColumn;
        }

        if (args.Sort !== undefined) {
            tableSort = args.Sort;
        }

        if (args.UpdateFunction !== undefined) {
            funUpdate = args.UpdateFunction;
        } else {
            funUpdate = false;
        }

        if (args.CreateFunction !== undefined) {
            funCreate = args.CreateFunction;
        } else {
            funCreate = false;
        }

        if (args.DeleteFunction !== undefined) {
            funDelete = args.DeleteFunction;
        } else {
            funDelete = false;
        }

        //***************************************************
        //****************** CREATE TABLE  ******************
        //***************************************************
        tb = '<table id="' + tableID.slice(1, tableID.length) + '" class="table table-striped table-hover">';
        createTableHeader();

        if (hasDefaultHeader === true && customHeader !== false) {
            alert("hasDefaultHeader and custom header both cannot be present at same time");
        } else {

            createTableRow();

            if (appendTo !== false) {
                $(appendTo).html(tb);
            } else {
                $('body').html('<div id="divJson2HTMLTable" style="overflow-x:auto;"></div>');
                $('#divJson2HTMLTable').html(tb);
            }

        }
    }
}

//***************************************************************
//***************    CREATE TABLE HEADER    *********************
//***************************************************************
function createTableHeader() {

    //***************** CREATE DEFAULT HEADER ***************
    if (hasDefaultHeader === true && customHeader === false) {

        var count = 1;
        tb += '<thead><tr>';

        if (data.length > 0) {

            $.each(data[0], function(key, value) {

                if (tableSort === true) {

                    var parm = "j2HTMLSort('" + tableID + "','.item'," + "'td:nth-child(" + count + ")')";
                    tb += '<th onclick="' + parm + '" style="cursor:pointer">' + toTitleCase(key) + '</th>';


                } else {
                    tb += '<th>' + toTitleCase(key) + '</th>';
                }

                headerRow.push(toTitleCase(key));
                count = count + 1;

            });


            //UPDATE AND DELETE
            if (funUpdate !== false && funDelete !== false) {
                tb += "<th></th>";
                tb += "<th></th>";
            }

            // DELETE ONLY
            if (funUpdate === false && funDelete !== false) {
                tb += "<th></th>";
            }

            //UPDATE ONLY
            if (funUpdate !== false && funDelete === false) {
                tb += "<th></th>";
            }

            tb += '</tr></thead>';
        }
    }
    //****************** CREATE CUSTOMER HEADER *****************
    if (hasDefaultHeader === false && customHeader !== false) {

        var count1 = 1;
        tb += '<thead><tr>';

        if (data.length > 0) {

            $.each(customHeader, function(colKey, colValue) {

                var orginalColumnName = colValue.orginalColumnName;
                var newColumnName = colValue.newColumnName;
                var customColumnName = colValue.customColumnName;
                var customColumnValue = colValue.customColumnValue;
                var isColumnVisible = colValue.Visible;

                $.each(data[0], function(key, value) {

                    if (orginalColumnName !== undefined && newColumnName !== undefined) {

                        if (orginalColumnName.toLowerCase() === key.toLowerCase() && isColumnVisible === true) {

                            if (tableSort === true) {
                                var parm = "j2HTMLSort('" + tableID + "','.item'," + "'td:nth-child(" + count1 + ")')";
                                tb += '<th onclick="' + parm + '" style="cursor:pointer">' + toTitleCase(newColumnName) + '</th>';
                            } else {
                                tb += '<th>' + toTitleCase(newColumnName) + '</th>';
                            }
                            headerRow.push(toTitleCase(newColumnName));
                            count1 = count1 + 1;
                        }
                        if (orginalColumnName.toLowerCase() === key.toLowerCase() && isColumnVisible === false) {

                            headerRow.push(toTitleCase(newColumnName));
                            count1 = count1 + 1;
                        }

                    }
                });
                if (customColumnValue !== undefined) {
                    tb += '<th>' + toTitleCase(customColumnName) + '</th>';
                    headerRow.splice(colKey, 0, customColumnName);
                    count1 = count1 + 1;
                }
            });

        }
        tb += '</tr></thead>';
    }

    //********************* CREATE NO HEADER ********************
    if (hasDefaultHeader === false && customHeader === false) {

        var count2 = 1;
        tb += '<thead><tr>';

        if (data.length > 0) {

            $.each(data[0], function(key, value) {

                headerRow.push(toTitleCase(key));
                count2 = count2 + 1;

            });
            tb += '</tr></thead>';
        }
    }
}


//***************************************************
//************** CREATE TABLE ROW *******************
//***************************************************
function createTableRow() {

    tb += '<tbody>';

    if (data.length > 0) {

        for (var j = 0; j < data.length; j++) {

            var rowData = data[j];

            var rowId = 'tr' + j;

            preStr = '';
            tb += '<tr id="' + rowId + '" class="item" align="left">';

            // IF CUSTOMER HEADER
            if (customHeader !== false && hasDefaultHeader === false) {
                createRowCustomHeader(rowData, j);
            }

            // IF DEFAULT HEADER
            if (customHeader === false && hasDefaultHeader !== false) {
                createRowDefaultHeader(rowData, j);
            }


            // IF NO HEADER 
            if (customHeader === false && hasDefaultHeader === false) {

                createRowNoHeader(rowData, j);
            }

            var parmFun = JSON.stringify(editableArray) + ',"' + rowId + '"';
            //UPDATE AND DELETE
            if (funUpdate !== false && funDelete !== false) {

                //tb += "<td><a href='#' onclick='updateTableRow(" + JSON.stringify(editableArray) + ");'>Edit</a> </td>";
                tb += "<td><button class='btn btn-default' onclick='updateTableRow(" + parmFun + ");'><span class='glyphicon glyphicon-pencil'></span></button></td>";
                //tb += "<td><a href='#' onclick='deleteTableRow(" + JSON.stringify(editableArray) + ");'>Delete</a> </td>";
                tb += "<td><button class='btn btn-default' onclick='deleteTableRow(" + parmFun + ");'><span class='glyphicon glyphicon-trash'></span></button></td>";
            }

            // DELETE ONLY
            if (funUpdate === false && funDelete !== false) {

                //tb += "<td><a href='#' onclick='deleteTableRow(" + JSON.stringify(editableArray) + ");'>Delete</a> </td>";
                tb += "<td><button class='btn btn-default' onclick='deleteTableRow(" + parmFun + ");'><span class='glyphicon glyphicon-trash'></span></button></td>";
            }

            //UPDATE ONLY
            if (funUpdate !== false && funDelete === false) {
                // tb += "<td><a href='#' onclick='updateTableRow(" + JSON.stringify(editableArray) + ");'>Edit</a> </td>";
                tb += "<td><button class='btn btn-default' onclick='updateTableRow(" + parmFun + ");'><span class='glyphicon glyphicon-pencil'></span></button></td>";
            }


            tb += '</tr>';
        }
        tb += '</tbody></table>';

        //CREATE BUTTON
        if (funCreate !== false) {

            var btnCreate = "<button id='j2HTMLBtnInsertNewRow' class='btn btn-sm btn-primary pull-right' style='margin-bottom:5px;' onclick='createNewTableRow(" + JSON.stringify(editableArray) + ");'>Create</button></br>";

            if (createButtonAppendTo === false) {
                tb = btnCreate.concat(tb);
            } else {
                $(createButtonAppendTo).append(btnCreate);
            }


        }
    }
}

// IF CUSTOMER HEADER
function createRowCustomHeader(rowData, id) {

    editableArray = [];

    $.each(headerRow, function(colKey, colValue) {

        $.each(rowData, function(key, value) {


            currentValue = value;

            if (customHeader[colKey] !== undefined) {

                var orginalColumnName = customHeader[colKey].orginalColumnName;
                var newColumnName = customHeader[colKey].newColumnName;
                var customColumnName = customHeader[colKey].customColumnName;
                var customColumnValue = customHeader[colKey].customColumnValue;
                var isColumnVisible = customHeader[colKey].Visible;

                var colId = 'td' + id + newColumnName;


                if (orginalColumnName !== undefined) {

                    if (orginalColumnName.toLowerCase() === key.toLowerCase()) {

                        if (addToColumn !== false) {



                            var colValuePrependValue = '';
                            var colValueApendValue = '';

                            for (var ii = 0; ii < addToColumn.length; ii++) {

                                var colValueList = addToColumn[ii];

                                if (colValueList.ColumanName.toLowerCase() === key.toLowerCase()) {

                                    if (colValueList.Type.toLowerCase() === 'prepend') {
                                        colValuePrependValue = colValueList.Value;
                                    }
                                    if (colValueList.Type.toLowerCase() === 'append') {
                                        colValueApendValue = colValueList.Value;
                                    }
                                }
                            }

                            if (colValuePrependValue !== '' && colValueApendValue === '') {

                                if (isColumnVisible === true) {
                                    tb += '<td data-label="' + headerRow[colKey] + '" id="' + colId + '">' + colValuePrependValue + currentValue + '</td>';
                                    editable = {};
                                    editable[headerRow[colKey]] = currentValue;
                                    editable.Visible = true;
                                } else {
                                    editable = {};
                                    editable[headerRow[colKey]] = currentValue;
                                    editable.Visible = false;
                                }

                            }
                            if (colValueApendValue !== '' && colValuePrependValue === '') {

                                if (isColumnVisible === true) {
                                    tb += '<td data-label="' + headerRow[colKey] + '" id="' + colId + '">' + currentValue + colValueApendValue + '</td>';
                                    editable = {};
                                    editable[headerRow[colKey]] = currentValue;
                                    editable.Visible = true;
                                } else {
                                    editable = {};
                                    editable[headerRow[colKey]] = currentValue;
                                    editable.Visible = false;
                                }
                            }
                            if (colValuePrependValue === '' && colValueApendValue === '') {

                                if (isColumnVisible === true) {
                                    tb += '<td data-label="' + headerRow[colKey] + '" id="' + colId + '">' + currentValue + '</td>';
                                    editable = {};
                                    editable[headerRow[colKey]] = currentValue;
                                    editable.Visible = true;
                                } else {
                                    editable = {};
                                    editable[headerRow[colKey]] = currentValue;
                                    editable.Visible = false;
                                }
                            }



                        } else {

                            if (isColumnVisible === true) {

                                tb += '<td data-label="' + headerRow[colKey] + '" id="' + colId + '">' + currentValue + '</td>';

                                editable = {};
                                editable[headerRow[colKey]] = currentValue;
                                editable.Visible = true;

                            } else {
                                editable = {};
                                editable[headerRow[colKey]] = currentValue;
                                editable.Visible = false;

                            }
                        }


                    }

                    if (orginalColumnName.toLowerCase() === key.toLowerCase()) {
                        editableArray.push(editable);
                    }


                } else {
                    //CREATE CUSTOM COULMN
                    if (customColumnName !== undefined && customColumnValue !== undefined) {

                        var strVal = findReplaceCurlyBraces(rowData, customColumnValue);
                        if (preStr != strVal) {
                            tb += '<td data-label="' + headerRow[colKey] + '">' + strVal + '</td>';
                            preStr = strVal;
                        }


                    }
                }



            }


        });

    });



}

// IF DEFAULT HEADER
function createRowDefaultHeader(rowData, id) {

    var colValuePrependValue = '';
    var colValueApendValue = '';
    var colValueList;

    editableArray = [];

    $.each(headerRow, function(colKey, colValue) {

        $.each(rowData, function(key, value) {

            var colId = 'td' + id + key;

            currentValue = value;

            if (headerRow[colKey].toLowerCase() === key.toLowerCase()) {

                if (addToColumn !== false) {

                    for (var ii = 0; ii < addToColumn.length; ii++) {

                        colValueList = addToColumn[ii];

                        if (colValueList.ColumanName.toLowerCase() === key.toLowerCase()) {

                            if (colValueList.Type.toLowerCase() === 'prepend') {
                                colValuePrependValue = colValueList.Value;

                            }
                            if (colValueList.Type.toLowerCase() === 'append') {
                                colValueApendValue = colValueList.Value;
                            }
                        }
                    }

                    if (colValuePrependValue === '' && colValueApendValue === '') {
                        tb += '<td data-label="' + toTitleCase(key) + '" id="' + colId + '">' + currentValue + '</td>';

                        editable = {};
                        editable[headerRow[colKey]] = currentValue;
                        editable.Visible = true;

                    }

                    if (colValuePrependValue !== '' && colValueApendValue === '') {

                        tb += '<td data-label="' + toTitleCase(key) + '" id="' + colId + '">' + colValuePrependValue + currentValue + '</td>';

                        editable = {};
                        editable[headerRow[colKey]] = currentValue;
                        editable.Visible = true;
                        colValuePrependValue = '';

                    }
                    if (colValuePrependValue === '' && colValueApendValue !== '') {
                        tb += '<td data-label="' + toTitleCase(key) + '" id="' + colId + '">' + currentValue + colValueApendValue + '</td>';

                        editable = {};
                        editable[headerRow[colKey]] = currentValue;
                        editable.Visible = true;
                        colValueApendValue = '';

                    }


                } else {

                    tb += '<td data-label="' + toTitleCase(key) + '" id="' + colId + '">' + currentValue + '</td>';

                    editable = {};
                    editable[headerRow[colKey]] = currentValue;
                    editable.Visible = true;

                }
            }

            if (headerRow[colKey].toLowerCase() === key.toLowerCase()) {

                editableArray.push(editable);
            }

        });



    });



}

// IF NO HEADER
function createRowNoHeader(rowData, id) {

    var colValuePrependValue = '';
    var colValueApendValue = '';
    //var colValueList;

    editableArray = [];

    $.each(headerRow, function(colKey, colValue) {


        $.each(rowData, function(key, value) {

            var colId = 'td' + id + key;

            currentValue = value;

            if (headerRow[colKey].toLowerCase() === key.toLowerCase()) {

                if (addToColumn !== false) {

                    for (var iii = 0; iii < addToColumn.length; iii++) {

                        colValueList = addToColumn[iii];

                        if (colValueList.ColumanName.toLowerCase() === key.toLowerCase()) {

                            if (colValueList.Type.toLowerCase() === 'prepend') {
                                colValuePrependValue = colValueList.Value;
                            }
                            if (colValueList.Type.toLowerCase() === 'append') {
                                colValueApendValue = colValueList.Value;
                            }
                        }
                    }

                    if (colValuePrependValue === '' && colValueApendValue === '') {
                        tb += '<td id="' + colId + '">' + currentValue + '</td>';

                        editable = {};
                        editable[headerRow[colKey]] = currentValue;
                        editable.Visible = true;
                    }
                    if (colValuePrependValue === '' && colValueApendValue !== '') {
                        tb += '<td id="' + colId + '">' + currentValue + colValueApendValue + '</td>';

                        editable = {};
                        editable[headerRow[colKey]] = currentValue;
                        editable.Visible = true;
                        colValueApendValue = '';

                    }
                    if (colValuePrependValue !== '' && colValueApendValue === '') {
                        tb += '<td id="' + colId + '">' + colValuePrependValue + currentValue + '</td>';

                        editable = {};
                        editable[headerRow[colKey]] = currentValue;
                        editable.Visible = true;
                        colValuePrependValue = '';

                    }

                } else {
                    tb += '<td id="' + colId + '">' + currentValue + '</td>';

                    editable = {};
                    editable[headerRow[colKey]] = currentValue;
                    editable.Visible = true;
                }

            }

            if (headerRow[colKey].toLowerCase() === key.toLowerCase()) {

                editableArray.push(editable);
            }

        });

    });


}





//****************************************************************************
//*************************** HEADING STYLE **********************************
//****************************************************************************
function j2HTMLHeadingStyle() {

    var args = arguments[0][0];
    var tableName = args.TableID;
    var backgroundColor = args.BackgroundColor;
    var forecolor = args.Forecolor;

    if (tableName !== undefined) {
        $(tableName + ' thead tr').css({ 'background-color': backgroundColor, 'color': forecolor });
    } else {
        $('#tbJsonToHtml thead tr').css({ 'background-color': backgroundColor, 'color': forecolor });
    }
}


//****************************************************************************
//*************************** TABLE STYLE **********************************
//****************************************************************************
function j2HTMLTableStyle() {

    var args = arguments[0][0];
    var tableName = args.TableID;
    var backgroundColor = args.BackgroundColor;
    var forecolor = args.Forecolor;

    if (tableName !== undefined) {
        $(tableName + ' tbody tr').css({ 'background-color': backgroundColor, 'color': forecolor });
        $(tableName).removeClass('table-striped');
    } else {
        $('#tbJsonToHtml tbody tr').css({ 'background-color': backgroundColor, 'color': forecolor });
        $('#tbJsonToHtml').removeClass('table-striped');
    }
}



//****************************************************************************
//******************************** SEARCH ************************************
//****************************************************************************
function j2HTMLSearch() {

    var args = arguments[0][0];

    if (args.SearchTextBoxID !== undefined) {

        $('#' + args.SearchTextBoxID).on('keyup', function() {

            var searchText = $(this).val().toLowerCase();
            var tableName = 'tbJsonToHtml';

            if (args.TableID !== undefined) {
                tableName = args.TableID;
            }

            if (args.SearchInColumns === undefined) {
                $.each($('#' + tableName + ' tbody tr'), function(i, v) {

                    if ($(this).text().toLowerCase().indexOf(searchText) === -1) {
                        $(this).hide();
                    } else {
                        $(this).show();
                    }

                });
            } else {
                $.each($('#' + tableName + ' tbody tr'), function(i, v) {

                    $row = $(this);

                    //var $tds = $(this).find('td');
                    $.each($('#' + tableName + ' thead tr th'), function(colIndex, ColValue) {

                        if ($.inArray($(ColValue).text(), args.SearchInColumns) != -1) {

                            $col = $row.find('td')[colIndex];

                            if ($($col).text().toLowerCase().indexOf(searchText) === -1) {

                                $($row).hide();

                            } else {
                                $($row).show();
                            }
                        }

                    });
                });

            }
        });
    } else {
        alert('Search textbox ID is required');
    }



}



//****************************************************************************
//******************************** PRINT ************************************
//****************************************************************************
function j2HTMLPrint() {

    var args = arguments[0][0];

    //var csv = false;
    var fileName = false;
    var tableID = 'tbJsonToHtml';

    if (args.TableID !== undefined) {

        tableID = args.TableID;
    }


    // PRINT CSV
    if (args.Print === 'CSV' || args.Print === 'CSV') {
        if (args.FileName !== undefined) {
            toCSV(tableID, args.FileName);
        } else {
            toCSV(tableID);
        }
    }

    // PRINT PDF
    if (args.Print === 'PDF' || args.Print === 'pdf') {
        if (args.FileName !== undefined) {
            toPDF(tableID, args.FileName);
        } else {
            toPDF(tableID);
        }
    }


    // } else {
    //     alert('Table ID is reqiured');
    // }

}

//**************************** END PRINT ************************************

function toPDF(tableId, filename) {
    this._filename = (typeof filename === 'undefined') ? tableId : filename;
    // Generate our CSV string from out HTML Table
    var pdf = _tableToCSV(document.getElementById(tableId));
    // Create a CSV Blob
    var blob = new Blob([pdf], { type: "application/pdf" });

    // Determine which approach to take for the download
    if (navigator.msSaveOrOpenBlob) {
        // Works for Internet Explorer and Microsoft Edge
        navigator.msSaveOrOpenBlob(blob, this._filename + ".pdf");
    } else {
        _downloadAnchor(URL.createObjectURL(blob), 'pdf');
    }
}

//****************************************************************************
//******************************** To CSV ************************************
//****************************************************************************

function toCSV(tableId, filename) {
    this._filename = (typeof filename === 'undefined') ? tableId : filename;
    // Generate our CSV string from out HTML Table
    var csv = _tableToCSV(document.getElementById(tableId));
    // Create a CSV Blob
    var blob = new Blob([csv], { type: "text/csv" });

    // Determine which approach to take for the download
    if (navigator.msSaveOrOpenBlob) {
        // Works for Internet Explorer and Microsoft Edge
        navigator.msSaveOrOpenBlob(blob, this._filename + ".csv");
    } else {
        _downloadAnchor(URL.createObjectURL(blob), 'csv');
    }
}


function _downloadAnchor(content, ext) {
    var anchor = document.createElement("a");
    anchor.style = "display:none !important";
    anchor.id = "downloadanchor";
    document.body.appendChild(anchor);

    // If the [download] attribute is supported, try to use it
    if ("download" in anchor) {
        anchor.download = this._filename + "." + ext;
    }
    anchor.href = content;
    anchor.click();
    anchor.remove();
}

function _tableToCSV(table) {
    // We'll be co-opting `slice` to create arrays
    var slice = Array.prototype.slice;

    return slice
        .call(table.rows)
        .map(function(row) {
            return slice
                .call(row.cells)
                .map(function(cell) {
                    return '"t"'.replace("t", cell.textContent);
                })
                .join(",");
        })
        .join("\r\n");
}

//**************************** END CSV ************************************

function findReplaceString(string, find, replace) {
    if ((/[a-zA-Z\_]+/g).test(string)) {
        return string.replace(new RegExp('\{\{(?:\\s+)?(' + find + ')(?:\\s+)?\}\}'), replace);
    } else {
        throw new Error("Find statement does not match regular expression: /[a-zA-Z\_]+/");
    }
}

function findReplaceCurlyBraces(jsonObj, str) {

    var variables = str.match(/([^{{]*?)\w(?=\}})/gmi);
    var strVal = '';

    if (variables !== null) {
        for (var i = 0; i < variables.length; i++) {

            $.each(jsonObj, function(key, val) {

                if (variables[i].toLowerCase() === key.toLowerCase()) {

                    strVal = findReplaceString(str, variables[i], val);

                    str = strVal;
                }

            });
        }
    } else {
        strVal = str;
    }

    return strVal;


}

//UPDATE TABLE ROW
function updateTableRow(data, id) {

    j2HTML.Modal({

        Data: data,
        Heading: 'Edit',
        Display: 'TextBox',
        UpdateFunction: funUpdate,
        TableID: tableID,
        RowID: id

    }).ShowModal();

}

//CREATE NEW TABLE ROW
function createNewTableRow(data) {

    var updateButton = false;
    var deleteButton = false;

    if (funUpdate !== false) {
        updateButton = true;
    }
    if (funDelete !== false) {
        deleteButton = true;
    }

    j2HTML.Modal({

        Data: data,
        Heading: 'Insert',
        Display: 'TextBox',
        TableID: tableID,
        CreateFunction: funCreate,
        UpdateButton: updateButton,
        DeleteButton: deleteButton

    }).ShowModal();
}

//DELETE TABLE ROW
function deleteTableRow(modalData, id) {

    $(tableID + ' tbody tr#' + id).remove();

    var objData = {};
    $.each(modalData, function(i, v) {

        $.each(v, function(ii, vv) {

            if (v.hasOwnProperty('Visible') === true && ii.toLowerCase() !== 'visible') {
                objData[ii] = vv;
            }

        });
    });

    funDelete(objData);

}