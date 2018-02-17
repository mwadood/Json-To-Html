var appendTo = false;
var createButtonAppendTo = false;
var data = false;
var tableID = 'tbJsonToHtml';
var hasDefaultHeader = true;
var customHeader = false;
var addToColumn = false;
var tableSort = true;

var funUpdate = false;
var funInsert = false;
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

        if (args.InsertFunction !== undefined) {
            funInsert = args.InsertFunction;
        } else {
            funInsert = false;
        }

        if (args.DeleteFunction !== undefined) {
            funDelete = args.DeleteFunction;
        } else {
            funDelete = false;
        }

        //***************************************************
        //****************** CREATE TABLE  ******************
        //***************************************************
        tb = '<table id="' + tableID + '" class="table table-striped table-hover">';
        createTableHeader();

        if (hasDefaultHeader === true && customHeader !== false) {
            alert("hasDefaultHeader and custom header both cannot be present at same time");
        } else {

            createTableRow();

            if (appendTo !== false) {
                $(appendTo).html(tb);
            } else {
                $('body').html('<div id="divJson2HTMLTable"></div>');
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

                    var parm = "sort('#" + tableID + "','.item'," + "'td:nth-child(" + count + ")')";
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
                                var parm = "sort('#" + tableID + "','.item'," + "'td:nth-child(" + count1 + ")')";
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

            preStr = '';
            tb += '<tr class="item" align="left">';

            // IF CUSTOMER HEADER
            if (customHeader !== false && hasDefaultHeader === false) {
                createRowCustomHeader(rowData);
            }

            // IF DEFAULT HEADER
            if (customHeader === false && hasDefaultHeader !== false) {
                createRowDefaultHeader(rowData);
            }


            // IF NO HEADER 
            if (customHeader === false && hasDefaultHeader === false) {

                createRowNoHeader(rowData);
            }


            //UPDATE AND DELETE
            if (funUpdate !== false && funDelete !== false) {
                //tb += "<td><a href='#' onclick='updateTableRow(" + JSON.stringify(editableArray) + ");'>Edit</a> </td>";
                tb += "<td><button class='btn btn-default' onclick='updateTableRow(" + JSON.stringify(editableArray) + ");'><span class='glyphicon glyphicon-pencil'></span></button></td>";
                //tb += "<td><a href='#' onclick='deleteTableRow(" + JSON.stringify(editableArray) + ");'>Delete</a> </td>";
                tb += "<td><button class='btn btn-default' onclick='deleteTableRow(" + JSON.stringify(editableArray) + ");'><span class='glyphicon glyphicon-trash'></span></button></td>";



            }

            // DELETE ONLY
            if (funUpdate === false && funDelete !== false) {
                //tb += "<td><a href='#' onclick='deleteTableRow(" + JSON.stringify(editableArray) + ");'>Delete</a> </td>";
                tb += "<td><button class='btn btn-default' onclick='deleteTableRow(" + JSON.stringify(editableArray) + ");'><span class='glyphicon glyphicon-trash'></span></button></td>";
            }

            //UPDATE ONLY
            if (funUpdate !== false && funDelete === false) {
                // tb += "<td><a href='#' onclick='updateTableRow(" + JSON.stringify(editableArray) + ");'>Edit</a> </td>";
                tb += "<td><button class='btn btn-default' onclick='updateTableRow(" + JSON.stringify(editableArray) + ");'><span class='glyphicon glyphicon-pencil'></span></button></td>";
            }


            tb += '</tr>';
        }
        tb += '</tbody></table>';

        //CREATE BUTTON
        if (funInsert !== false) {
            var btnCreate = "<button id='j2HTMLBtnInsertNewRow' class='btn btn-sm btn-primary pull-right' style='margin-bottom:5px;' onclick='insertTableRow(" + JSON.stringify(editableArray) + ");'>Insert</button></br>";

            if (createButtonAppendTo === false) {
                tb = btnCreate.concat(tb);
            } else {
                $(createButtonAppendTo).append(btnCreate);
            }


        }
    }
}

// IF CUSTOMER HEADER
function createRowCustomHeader(rowData) {


    editableArray = [];

    $.each(headerRow, function(colKey, colValue) {

        $.each(rowData, function(key, value) {

            currentValue = value;

            var orginalColumnName = customHeader[colKey].orginalColumnName;
            var newColumnName = customHeader[colKey].newColumnName;
            var customColumnName = customHeader[colKey].customColumnName;
            var customColumnValue = customHeader[colKey].customColumnValue;
            var isColumnVisible = customHeader[colKey].Visible;

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
                                tb += '<td data-label="' + headerRow[colKey] + '">' + colValuePrependValue + currentValue + '</td>';
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
                                tb += '<td data-label="' + headerRow[colKey] + '">' + currentValue + colValueApendValue + '</td>';
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
                                tb += '<td data-label="' + headerRow[colKey] + '">' + currentValue + '</td>';
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

                            tb += '<td data-label="' + headerRow[colKey] + '">' + currentValue + '</td>';

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


            if (orginalColumnName.toLowerCase() === key.toLowerCase()) {
                editableArray.push(editable);
            }



        });

    });



}

// IF DEFAULT HEADER
function createRowDefaultHeader(rowData) {

    var colValuePrependValue = '';
    var colValueApendValue = '';
    var colValueList;

    editableArray = [];

    $.each(headerRow, function(colKey, colValue) {

        $.each(rowData, function(key, value) {

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
                        tb += '<td data-label="' + toTitleCase(key) + '">' + currentValue + '</td>';

                        editable = {};
                        editable[headerRow[colKey]] = currentValue;
                        editable.Visible = true;

                    }

                    if (colValuePrependValue !== '' && colValueApendValue === '') {

                        tb += '<td data-label="' + toTitleCase(key) + '">' + colValuePrependValue + currentValue + '</td>';

                        editable = {};
                        editable[headerRow[colKey]] = currentValue;
                        editable.Visible = true;
                        colValuePrependValue = '';

                    }
                    if (colValuePrependValue === '' && colValueApendValue !== '') {
                        tb += '<td data-label="' + toTitleCase(key) + '">' + currentValue + colValueApendValue + '</td>';

                        editable = {};
                        editable[headerRow[colKey]] = currentValue;
                        editable.Visible = true;
                        colValueApendValue = '';

                    }


                } else {

                    tb += '<td data-label="' + toTitleCase(key) + '">' + currentValue + '</td>';

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
function createRowNoHeader(rowData) {

    var colValuePrependValue = '';
    var colValueApendValue = '';
    //var colValueList;

    editableArray = [];

    $.each(headerRow, function(colKey, colValue) {


        $.each(rowData, function(key, value) {

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
                        tb += '<td>' + currentValue + '</td>';

                        editable = {};
                        editable[headerRow[colKey]] = currentValue;
                        editable.Visible = true;
                    }
                    if (colValuePrependValue === '' && colValueApendValue !== '') {
                        tb += '<td >' + currentValue + colValueApendValue + '</td>';

                        editable = {};
                        editable[headerRow[colKey]] = currentValue;
                        editable.Visible = true;
                        colValueApendValue = '';

                    }
                    if (colValuePrependValue !== '' && colValueApendValue === '') {
                        tb += '<td>' + colValuePrependValue + currentValue + '</td>';

                        editable = {};
                        editable[headerRow[colKey]] = currentValue;
                        editable.Visible = true;
                        colValuePrependValue = '';

                    }

                } else {
                    tb += '<td>' + currentValue + '</td>';

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
function headingStyle() {

    var args = arguments[0][0];
    var tableName = args.TableID;
    var backgroundColor = args.BackgroundColor;
    var forecolor = args.Forecolor;

    if (tableName !== undefined) {
        $('#' + tableName + ' thead tr').css({ 'background-color': backgroundColor, 'color': forecolor });
    } else {
        $('#tbJsonToHtml thead tr').css({ 'background-color': backgroundColor, 'color': forecolor });
    }
}



//****************************************************************************
//*************************** TABLE STYLE **********************************
//****************************************************************************
function tableStyle() {

    var args = arguments[0][0];
    var tableName = args.TableID;
    var backgroundColor = args.BackgroundColor;
    var forecolor = args.Forecolor;

    if (tableName !== undefined) {
        $('#' + tableName).css({ 'background-color': backgroundColor, 'color': forecolor });
        $('#' + tableName).removeClass('table-striped');
    } else {
        $('#tbJsonToHtml').css({ 'background-color': backgroundColor, 'color': forecolor });
        $('#tbJsonToHtml').removeClass('table-striped');
    }
}



//****************************************************************************
//******************************** SEARCH ************************************
//****************************************************************************
function search() {

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
function print() {

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

function updateTableRow(data) {

    j2HTML.Modal({

        Data: data,
        Heading: 'Edit',
        Display: 'TextBox',
        UpdateFunction: funUpdate

    }).ShowModal();

}

function insertTableRow(data) {


    var insertButton = false;
    var deleteButton = false;

    if (funInsert !== false) {
        insertButton = true;
    }
    if (funDelete !== false) {
        deleteButton = true;
    }



    j2HTML.Modal({

        Data: data,
        Heading: 'Insert',
        Display: 'TextBox',
        TableID: tableID,
        InsertFunction: funInsert,
        InsertButton: insertButton,
        DeleteButton: deleteButton

    }).ShowModal();
}

function deleteTableRow(data) {
    funDelete(data);
}