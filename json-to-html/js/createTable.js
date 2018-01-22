//****************************************************************************
//********************* CREATE TABLE FROM JSON *******************************
//****************************************************************************
function table() {

    var args = arguments[0][0];

    var appendTo = false;
    var data = false;
    var tableID = 'tbJsonToHtml';
    var hasDefaultHeader = true;
    var customHeader = false;
    var addToColumn = false;
    var sort = true;

    if (args.Data === undefined) {

        alert('Data is required in order to create table');
    } else {

        if (args.Data !== undefined) {
            data = args.Data;
        }
        if (args.AppendTo !== undefined) {
            appendTo = args.AppendTo;
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
            sort = args.Sort;
        }


        //}

        //***************************************************
        //****************** CREATE TABLE  ******************
        //***************************************************
        var tb = '';
        tb = '<table id="' + tableID + '" class="table table-striped table-hover">';

        var headerRow = [];
        //***************************************************
        //************** CREATE TABLE HEADER ****************
        //***************************************************
        //CREATE TABLE HEADER DEFAULT HEADER
        if (hasDefaultHeader === true && customHeader === false) {

            var count = 1;
            tb += '<thead><tr>';

            //IF IT IS OBJECT
            if (data.length > 0) {
                //tb += '<thead><tr>';

                $.each(data[0], function(key, value) {

                    if (sort === true) {

                        var parm = "sort('#" + tableID + "','.item'," + "'td:nth-child(" + count + ")')";
                        tb += '<th onclick="' + parm + '" style="cursor:pointer">' + toTitleCase(key) + '</th>';


                    } else {
                        tb += '<th>' + toTitleCase(key) + '</th>';
                    }

                    headerRow.push(toTitleCase(key));

                    count = count + 1;
                });
                tb += '</tr></thead>';
            }
            //IF IT IS ARRAY
            else {

                $.each(data, function(key, value) {

                    if (sort === true) {
                        var parm = "sort('#" + tableID + "','.item'," + "'td:nth-child(" + count + ")')";
                        tb += '<th onclick="' + parm + '" style="cursor:pointer">' + toTitleCase(key) + '</th>';
                    } else {
                        tb += '<th>' + toTitleCase(key) + '</th>';
                    }
                    //tb += '<th>' + toTitleCase(key) + '</th>';
                    headerRow.push(toTitleCase(key));
                    count = count + 1;
                });
                tb += '</tr></thead>';
            }
        }

        //CREATE TABLE HEADER FROM CUSTOMER HEADER
        if (hasDefaultHeader === false && customHeader !== false) {

            var count1 = 1;
            tb += '<thead><tr>';

            //IF IT IS OBJECT
            if (data.length > 0) {
                $.each(data[0], function(key, value) {

                    $.each(customHeader, function(colKey, colValue) {

                        var orginalColumnName = colValue.orginalColumnName;
                        var newColumnName = colValue.newColumnName;

                        if (orginalColumnName.toLowerCase() === key.toLowerCase()) {

                            if (sort === true) {

                                var parm = "sort('#" + tableID + "','.item'," + "'td:nth-child(" + count1 + ")')";
                                tb += '<th onclick="' + parm + '" style="cursor:pointer">' + toTitleCase(newColumnName) + '</th>';
                            } else {
                                tb += '<th>' + toTitleCase(newColumnName) + '</th>';
                            }
                            //tb += '<th>' + toTitleCase(newColumnName) + '</th>';
                            headerRow.push(toTitleCase(newColumnName));

                            count1 = count1 + 1;
                        }
                    });

                });
            }
            //IF IT IS ARRAY
            else {
                $.each(data, function(key, value) {
                    $.each(customHeader, function(colKey, colValue) {

                        var orginalColumnName = colValue.orginalColumnName;
                        var newColumnName = colValue.newColumnName;

                        if (orginalColumnName.toLowerCase() === key.toLowerCase()) {

                            if (sort === true) {
                                var parm = "sort('#" + tableID + "','.item'," + "'td:nth-child(" + count1 + ")')";
                                tb += '<th onclick="' + parm + '" style="cursor:pointer">' + toTitleCase(newColumnName) + '</th>';
                            } else {
                                tb += '<th>' + toTitleCase(newColumnName) + '</th>';
                            }
                            //tb += '<th>' + toTitleCase(newColumnName) + '</th>';
                            headerRow.push(toTitleCase(newColumnName));

                            count1 = count1 + 1;
                        }
                    });
                });
            }
            tb += '</tr></thead>';
        }
        if (hasDefaultHeader === true && customHeader !== false) {
            alert("hasDefaultHeader and custom header both cannot be present at same time");
        } else {

            //***************************************************
            //************** CREATE TABLE ROW *******************
            //***************************************************
            tb += '<tbody>';
            //IF IT IS JSON OBJECT
            if (data.length > 0) {

                for (var j = 0; j < data.length; j++) {

                    var rowData = data[j];

                    tb += '<tr class="item" align="left">';
                    $.each(rowData, function(key, value) {

                        var currentValue = value;

                        // IF CUSTOMER HEADER
                        if (customHeader !== false && hasDefaultHeader === false) {

                            $.each(customHeader, function(colKey, colValue) {

                                var orginalColumnName = colValue.orginalColumnName;
                                var newColumnName = colValue.newColumnName;

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

                                        //var headerColumnName = headerRow[colKey];
                                        if (colValuePrependValue !== '' && colValueApendValue === '') {
                                            tb += '<td data-label="' + headerRow[colKey] + '">' + colValuePrependValue + currentValue + '</td>';
                                        }
                                        if (colValueApendValue !== '' && colValuePrependValue === '') {
                                            tb += '<td data-label="' + headerRow[colKey] + '">' + currentValue + colValueApendValue + '</td>';
                                        }
                                        if (colValuePrependValue === '' && colValueApendValue === '') {
                                            tb += '<td data-label="' + headerRow[colKey] + '">' + currentValue + '</td>';
                                        }

                                    } else {
                                        tb += '<td data-label="' + headerRow[colKey] + '">' + currentValue + '</td>';
                                    }
                                }
                            });

                        }

                        var colValuePrependValue = '';
                        var colValueApendValue = '';
                        var colValueList;

                        // IF DEFAULT HEADER 
                        if (customHeader === false && hasDefaultHeader !== false) {

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

                                //var headerColumnName = toTitleCase(key);

                                if (colValuePrependValue !== '' && colValueApendValue === '') {
                                    tb += '<td data-label="' + toTitleCase(key) + '">' + colValuePrependValue + currentValue + '</td>';

                                }
                                if (colValueApendValue !== '' && colValuePrependValue === '') {
                                    tb += '<td data-label="' + toTitleCase(key) + '">' + currentValue + colValueApendValue + '</td>';

                                }
                                if (colValuePrependValue === '' && colValueApendValue === '') {
                                    tb += '<td data-label="' + toTitleCase(key) + '">' + currentValue + '</td>';

                                }

                            } else {
                                tb += '<td data-label="' + toTitleCase(key) + '">' + currentValue + '</td>';

                            }
                        }



                        // IF NO HEADER 
                        if (customHeader === false && hasDefaultHeader === false) {

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

                                //var headerColumnName = toTitleCase(key);
                                if (colValuePrependValue !== '' && colValueApendValue === '') {
                                    tb += '<td>' + colValuePrependValue + currentValue + '</td>';
                                }
                                if (colValueApendValue !== '' && colValuePrependValue === '') {
                                    tb += '<td >' + currentValue + colValueApendValue + '</td>';
                                }
                                if (colValuePrependValue === '' && colValueApendValue === '') {
                                    tb += '<td>' + currentValue + '</td>';
                                }

                            } else {
                                tb += '<td>' + currentValue + '</td>';
                            }
                        }



                    });
                    tb += '</tr>';
                }
                tb += '</tbody></table>';
                // **************** IF THIS IS ARRAY ********************    
            } else {

                tb += '<tr>';

                //IF CUSTOMER HEADER
                if (customHeader !== false && hasDefaultHeader === false) {

                    $.each(data, function(key, value) {

                        var currentValue = value;

                        $.each(customHeader, function(colKey, colValue) {

                            var orginalColumnName = colValue.orginalColumnName;
                            var newColumnName = colValue.newColumnName;

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

                                    //var headerColumnName = headerRow[colKey];

                                    if (colValuePrependValue !== '' && colValueApendValue === '') {
                                        tb += '<td data-label="' + headerRow[colKey] + '">' + colValuePrependValue + currentValue + '</td>';
                                    }
                                    if (colValueApendValue !== '' && colValuePrependValue === '') {
                                        tb += '<td data-label="' + headerRow[colKey] + '">' + currentValue + colValueApendValue + '</td>';
                                    }
                                    if (colValuePrependValue === '' && colValueApendValue === '') {
                                        tb += '<td data-label="' + headerRow[colKey] + '">' + currentValue + '</td>';
                                    }

                                } else {
                                    tb += '<td data-label="' + headerRow[colKey] + '">' + currentValue + '</td>';
                                }
                            }

                        });
                    });
                }
                //IF DEFAULT HEADER
                if (customHeader === false && hasDefaultHeader !== false) {
                    $.each(data, function(key, value) {

                        var currentValue = value;

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
                                tb += '<td data-label="' + toTitleCase(key) + '">' + colValuePrependValue + currentValue + '</td>';

                            }
                            if (colValueApendValue !== '' && colValuePrependValue === '') {
                                tb += '<td data-label="' + toTitleCase(key) + '">' + currentValue + colValueApendValue + '</td>';

                            }
                            if (colValuePrependValue === '' && colValueApendValue === '') {
                                tb += '<td data-label="' + toTitleCase(key) + '">' + currentValue + '</td>';

                            }

                        } else {

                            tb += '<td data-label="' + toTitleCase(key) + '">' + currentValue + '</td>';

                        }
                    });
                }
                //IF NO HEADER
                if (customHeader === false && hasDefaultHeader === false) {
                    $.each(data, function(key, value) {

                        var currentValue = value;

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
                                // tb += '<td data-label="' + toTitleCase(key) + '">' + colValuePrependValue + currentValue + '</td>';
                                tb += '<td>' + colValuePrependValue + currentValue + '</td>';
                            }
                            if (colValueApendValue !== '' && colValuePrependValue === '') {
                                // tb += '<td data-label="' + toTitleCase(key) + '">' + currentValue + colValueApendValue + '</td>';
                                tb += '<td>' + currentValue + colValueApendValue + '</td>';
                            }
                            if (colValuePrependValue === '' && colValueApendValue === '') {
                                // tb += '<td data-label="' + toTitleCase(key) + '">' + currentValue + '</td>';
                                tb += '<td>' + currentValue + '</td>';
                            }

                        } else {

                            // tb += '<td data-label="' + toTitleCase(key) + '">' + currentValue + '</td>';
                            tb += '<td>' + currentValue + '</td>';
                        }


                        //tb += '<td>' + value + '</td>';

                    });
                }

                tb += '</tr>';
                tb += '</tbody></table>';
            }

            if (appendTo !== false) {
                $('#' + appendTo).html(tb);
            } else {
                $('body').html('<div id="divJsonToHtml"></div>');
                $('#divJsonToHtml').html(tb);
            }

        }
    }
}
//*************************** END CREATE TABLE  *****************************

//****************************************************************************
//************************ ADD PAGING TO TABLE *******************************
//****************************************************************************
function paging() {

    var paginationAppendTo = false;
    var rowsPerPage = 10;
    var tableName = 'tbJsonToHtml';
    var startPage = '1';

    args = arguments[0][0];

    if (args.TableID !== undefined) {
        tableName = args.TableID;
    }
    if (args.RowsPerPage !== undefined) {
        rowsPerPage = args.RowsPerPage;
    }

    if (args.PaginationAppendTo !== undefined) {
        paginationAppendTo = args.PaginationAppendTo;
    }

    if (args.StartPage !== undefined) {
        startPage = args.StartPage;
    }


    var totalRows = $('#' + tableName).find('tbody tr:has(td)').length;
    var recordPerPage = rowsPerPage;
    var totalPages = Math.ceil(totalRows / recordPerPage);
    var pagenation = '<ul class="pagination pagination-sm">';


    if (totalPages < parseInt(startPage)) {
        alert('There are total ' + totalPages + ' pages, therefore start page cannot be ' + startPage);
    } else {

        for (i = 0; i < totalPages; i++) {


            if ((i + 1) === parseInt(startPage)) {
                pagenation += '<li class="active"><a href="#" class="pageNumber">' + (i + 1) + '</a></li>';
            } else {
                pagenation += '<li><a href="#" class="pageNumber">' + (i + 1) + '</a></li>';
            }

            //pagenation += '<li><a href="#" class="pageNumber">' + (i + 1) + '</a></li>';
        }
        pagenation += '</ul>';

        if (paginationAppendTo !== false) {
            $('#' + paginationAppendTo).append(pagenation);
        } else {
            var div = '<div id="pages">' + pagenation + '</div>';
            $('#' + tableName).after(div);

        }
        $('.pageNumber').hover(

            function() {

                $(this).addClass('active');
            },
            function() {

                $(this).removeClass('active');
            }
        );

        $('table').find('tbody tr:has(td)').hide();
        var tr = $('table tbody tr:has(td)');
        for (var i = 0; i <= recordPerPage - 1; i++) {
            $(tr[i]).show();
        }
        $('.pageNumber').click(function(event) {

            $('.pageNumber').parent().removeClass('active');
            $(this).parent().addClass('active');

            var selectedPageNumber = $(this).text();
            showPaginationData(selectedPageNumber, recordPerPage);
            return false;
        });

        if (args.StartPage !== undefined) {
            showPaginationData(args.StartPage, recordPerPage)
        }
    }

    function showPaginationData(selectedPageNumber, recordPerPage) {

        $('#' + tableName).find('tbody tr:has(td)').hide();

        var nBegin = (selectedPageNumber - 1) * recordPerPage;
        var nEnd = selectedPageNumber * recordPerPage - 1;

        for (var i = nBegin; i <= nEnd; i++) {
            $(tr[i]).show();
        }
    }



}
//**************************** END PAGING ************************************


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
//**************************** END HEADING STYLE*****************************


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
//**************************** END TABLE STYLE*****************************


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
//**************************** END SEARCH ************************************



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