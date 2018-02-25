function ListHome() {

    $('#divJ2HTMLListExamples').hide();
    $('#divJ2HTMLList').show();
}


function setTableMenu(id) {
    if ($('#divJ2HTMLListExamples').is(':visible') === false) {
        $('#divJ2HTMLList').hide();
        $('#divJ2HTMLListExamples').show();
        $('.j2HTMLListMenu').removeClass('active');
        $('#' + id).addClass('active');
    } else {
        $('.j2HTMLListMenu').removeClass('active');
        $('#' + id).addClass('active');
    }
}



//**************************************************
//**************** CREATE LIST *********************
//**************************************************

/*
               BY USING LIST FUNCTION CREATE THE LIST
               Where TEXT is the column name in the JSON object
               in the following example: list of 'CITY' form the 
               JSON object 
               
               Add the unorder list to HTML
                    <ul id="unorderList"></ul>
    
*/

function J2HTMLList() {

    GetProducts(function(myObject) {

        j2HTML.List({

            Data: myObject,
            AppendTo: '#unorderList',
            Text: 'ProductName'

        });

        $('#txtFilterList').hide();
        setTableMenu('list');

    });
}



//**************************************************
//*************** FILTER LIST **********************
//**************************************************
/*
     BY USING FILTER FUNCTION, FILTER THE LIST
    
     1. input to HTML 
            <input type="text" class="form-control" oninput="filterResult('#unorderList', 'li', this.value)" placeholder="filter list ...">
          
    CREATE function filterResult ASSUMPTION: list is avaiable in HTML
            <ul id="unorderList"></ul>
    
*/

function J2HTMLListFilter() {

    GetProducts(function(myObject) {

        j2HTML.List({

            Data: myObject,
            AppendTo: '#unorderList',
            Text: 'ProductName'

        });

        $('#txtFilterList').show();
        setTableMenu('filterList');

    });
}

function filterResult(controlName, li, value) {

    j2HTML.Filter(controlName, li, value);
}