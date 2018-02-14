//****************************************************************************
//************************ ADD PAGING TO TABLE *******************************
//****************************************************************************
var paginationAppendTo = false;
var rowsPerPage = 10;
var tableName = 'tbJsonToHtml';
var startPage = 1;

var showPages = false;
var startPageNumber = false;
var endPageNumber = false;


var totalRows;
//var selectedPageNumber;
var totalPages;


function paging() {

    var error = '';

    if (arguments.length !== 0) {

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

        if (args.ShowPages !== undefined) {
            showPages = args.ShowPages;
        }
    }


    totalRows = $('#' + tableName).find('tbody tr:has(td)').length;
    totalPages = Math.ceil(totalRows / rowsPerPage);

    if (totalPages < parseInt(startPage)) {
        alert('There are total ' + totalPages + ' pages, therefore start page cannot be ' + startPage);
    } else {

        if (showPages === false && startPage === 1) {
            startPageNumber = 0;
            endPageNumber = totalPages;
        }

        if (showPages !== false && startPage === 1) {
            startPageNumber = 0;
            endPageNumber = showPages;
        }

        if (showPages === false && startPage !== 1) {

            startPageNumber = 0;
            endPageNumber = totalPages;
        }

        if (showPages !== false && startPage !== 1) {

            if (startPageNumber === false && endPageNumber === false) {
                if (startPage > showPages) {

                    startPageNumber = (Math.floor(parseInt(startPage) / parseInt(showPages))) * (parseInt(showPages));
                    endPageNumber = parseInt(startPageNumber) + parseInt(showPages);
                } else if (startPage <= showPages) {

                    startPageNumber = 0;
                    endPageNumber = showPages;
                }
            }

        }

        //CREATE PAGINATION
        pagination = createPagination(totalPages, showPages, startPageNumber, endPageNumber);

        if (paginationAppendTo !== false) {
            $('#' + paginationAppendTo).empty();
            $('#' + paginationAppendTo).append(pagination);
        } else {
            var div = '<div id="pages">' + pagination + '</div>';
            $('#' + tableName).after(div);

        }

        //SHOW DATA
        if (startPage !== undefined) {

            if (endPageNumber > parseInt(startPage)) {
                showPaginationData(startPage, rowsPerPage);
            } else {
                showPaginationData(startPageNumber + 1, endPageNumber);
            }
        } else {
            showPaginationData(startPageNumber + 1, endPageNumber);
        }
    }

    showSelectedPage();
    showPreviousPages();
    showNextPages();
}


//SHOW PAGINATION DATA
function showPaginationData(startPageNumber, rowsPerPage) {

    $('#' + tableName).find('tbody tr:has(td)').hide();
    var tr = $('#' + tableName + ' tbody tr:has(td)');

    var nBegin = (startPageNumber - 1) * rowsPerPage;
    var nEnd = startPageNumber * rowsPerPage;

    for (var i = nBegin; i < nEnd; i++) {
        $(tr[i]).show();
    }

    return false;
}

//CREATE PAGINATION
function createPagination(totalPages, showPages, startPageNumber, endPageNumber) {

    if (startPageNumber === false && endPageNumber === false) {
        startPageNumber = 0;
        endPageNumber = totalPages;
    } else {
        if (endPageNumber > totalPages) {
            endPageNumber = totalPages;
        }
    }
    var pagination = '';
    if (showPages === false && startPage === 1) {
        pagination += '<ul class="pagination pagination-sm">';
    }
    if (showPages !== false && startPage === 1) {
        pagination += '<ul class="pagination pagination-sm"><li id="liPreviousPages" class="disabled"><a href="#"><<</a></li>';
    }
    if (showPages !== false && startPage !== 1) {
        pagination += '<ul class="pagination pagination-sm"><li id="liPreviousPages"><a href="#"><<</a></li>';
    }

    if (totalPages > 1 && showPages === false) {

        for (i = startPageNumber; i < endPageNumber; i++) {

            if ((i + 1) === parseInt(startPage)) {
                pagination += '<li class="active"><a href="#" class="pageNumber">' + (i + 1) + '</a></li>';
            } else {
                pagination += '<li><a href="#" class="pageNumber">' + (i + 1) + '</a></li>';
            }

        }

    }
    if (totalPages > 1 && showPages !== false) {

        for (i = startPageNumber; i < endPageNumber; i++) {

            if ((i + 1) === parseInt(startPage)) {
                pagination += '<li class="active"><a href="#" class="pageNumber">' + (i + 1) + '</a></li>';
            } else {
                pagination += '<li><a href="#" class="pageNumber">' + (i + 1) + '</a></li>';
            }

        }

    }

    if (showPages === false) {
        pagination += '</ul>';
    } else {
        pagination += '<li id="liNextPages"><a href="#">>></a></li></ul>';
    }

    return pagination;
}

//PAGINATION
function showSelectedPage() {

    $('.pageNumber').click(function() {

        $('.pageNumber').parent().removeClass('active');
        $(this).parent().addClass('active');

        startPageNumber = $(this).text();
        showPaginationData(startPageNumber, rowsPerPage);
        return false;
    });
}

//PREVIOUS PAGES
function showPreviousPages() {

    $('#liPreviousPages').click(function() {

        var setStartPage = 1;
        var setEndPage;
        var Id;

        var pStart;
        var pEnd;

        if ($($('#divPagination ul li')).length - 2 === showPages) {
            setEndPage = parseInt(showPages);
        } else {

            setEndPage = $($('#divPagination ul li')).length - 2;
        }

        if (paginationAppendTo === false) {
            Id = 'pages';
        } else {
            Id = paginationAppendTo;
        }

        pStart = parseInt($($('#' + Id + ' ul li')[setStartPage]).text());
        pEnd = parseInt($($('#' + Id + ' ul li')[setEndPage]).text());

        if (pEnd == totalPages) {
            pEnd = pEnd + (showPages - (pEnd % showPages));
        }


        startPageNumber = pStart - parseInt(showPages) - 1;
        endPageNumber = pEnd - parseInt(showPages);

        if (startPageNumber < 0) {
            startPageNumber = 0;
        }


        startPage = startPageNumber + 1;
        paging();
        //SHOW DATA
        if (startPageNumber === 0) {
            $(this).addClass('disabled');
        }
        $($('.pageNumber')).parent().removeClass('active');
        $($('.pageNumber')[0]).parent().addClass('active');
    });

    return false;
}

//NEXT SET OF PAGES
function showNextPages() {

    $('#liNextPages').click(function() {

        var setStartPage = 1;
        var setEndPage = parseInt(showPages);


        var Id;

        if (paginationAppendTo === false) {
            Id = 'pages';
        } else {
            Id = paginationAppendTo;
        }

        var pStart = parseInt($($('#' + Id + ' ul li')[setStartPage]).text());
        var pEnd = parseInt($($('#' + Id + ' ul li')[setEndPage]).text());

        startPageNumber = pStart + parseInt(showPages) - 1;
        endPageNumber = pEnd + parseInt(showPages);

        if (endPageNumber > totalPages) {
            endPageNumber = totalPages;
        }

        startPage = startPageNumber + 1;
        paging();

        if (endPageNumber === totalPages) {
            $(this).addClass('disabled');
        }

        $($('.pageNumber')).parent().removeClass('active');
        $($('.pageNumber')[0]).parent().addClass('active');

    });

    return false;
}
//**************************** END PAGING ************************************