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

function getJ2HTMLList() {

    GetProducts(function(myObject) {

        j2HTML.List({

            Data: myObject,
            AppendTo: '#unorderList',
            Text: 'ProductName'

        });


        setTableMenu('list');

    });
}