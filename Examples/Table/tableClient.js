/* 
 ***************************************************************************** 
 ********************************** TABLE ************************************
 ***************************************************************************** 
       
             REQUIRED PARAMETER(s)
             1. Data: Jason data	required
                BY DEFAULT ATABLE APPEND TO BODY TAG

             OPTIONAL PARAMETER(s)
             1. TableID: Table  id  if you want to assign specific id to table	optional
             2. AppendTo:	HTML Element ID to append table to, by default table will be append to <body>	optional
             3. DefaultHeader:	By default show the default header 	
             4. CustomerHeader:	Set column(s) to display and custom header 	optional
             5. AddToColumn:	Append or Prepend value to column	optional
             6. Sort: 	By default it is On	(True or False)
             7. UpdateFunction: To update the table row
             8. CreateFunction: To insert row to table
             9. DeleteFunction: To Delete table row


//**************************************************
//************ EXAMPLE-1 (BASIC) *******************
//**************************************************
function basic() {

    //GET DATA FROM DATABASE
    GetCustomers(function(myObject) {

        //BIND TABLE
        j2HTML.Table({
            Data: myObject,
            AppendTo: '#divTable'
        });

    });

}

//**************************************************
//********** EXAMPLE-2 (CUSTOMHEADER) **************
//**************************************************
//Adding customer header to display or change single or multiple     
//column name 
function addCustomHeader() {


    GetCustomers(function(myObject) {

        ////CREATE CUSTOM HEADER
        var customHeader = [


            { 'orginalColumnName': 'CustomerID', 'newColumnName': 'ID', 'Visible': false },
            { 'orginalColumnName': 'CompanyName', 'newColumnName': 'Company', 'Visible': true },
            { 'orginalColumnName': 'City', 'newColumnName': 'City', 'Visible': true },
            { 'orginalColumnName': 'Country', 'newColumnName': 'Country', 'Visible': true },


        ];

        j2HTML.Table({

            Data: myObject,
            AppendTo: '#divTable',
            DefaultHeader: false, //MUST BE FALSE
            CustomHeader: customHeader
        });

    });
}

//***************************************************************
//**** EXAMPLE-3.1 (APPEND OR PREPAND -- VALUE DEFAULT COLUMN) **
//***************************************************************
/*
    Append or Prepend value to Column(s)
    UN-Comment the following code to see the result
*/
function appendAndPrepandWithDefaultColumns() {

    GetCustomers(function(myObject) {


        var addToColumn = [
            { 'ColumanName': 'CustomerID', 'Value': 'ID: ', 'Type': 'prepend' },
            { 'ColumanName': 'City', 'Value': '(city name)', 'Type': 'append' }
        ];

        //BIND TABLE
        j2HTML.Table({
            Data: myObject,
            AppendTo: '#divTable',
            AddToColumn: addToColumn
        });

    });
}



//***************************************************************
//*** EXAMPLE-3.2 (APPEND OR PREPAND VALUE -- CUSTOM COLUMN) ****
//***************************************************************
/*
    Append or Prepend value to Column(s)
    UN-Comment the following code to see the result
*/
function appendAndPrepandWithCustomColumns() {

    GetCustomers(function(myObject) {


        ////CREATE CUSTOM HEADER
        var customHeader = [


            { 'orginalColumnName': 'CustomerID', 'newColumnName': 'ID', 'Visible': false },
            { 'orginalColumnName': 'CompanyName', 'newColumnName': 'Company', 'Visible': true },
            { 'orginalColumnName': 'City', 'newColumnName': 'City', 'Visible': true },
            { 'orginalColumnName': 'Country', 'newColumnName': 'Country', 'Visible': true },


        ];

        var addToColumn = [
            { 'ColumanName': 'CompanyName', 'Value': 'Company: ', 'Type': 'prepend' },
            { 'ColumanName': 'City', 'Value': '(city name)', 'Type': 'append' }
        ];

        //BIND TABLE
        j2HTML.Table({
            Data: myObject,
            AppendTo: '#divTable',
            AddToColumn: addToColumn,
            DefaultHeader: false, //MUST BE FALSE
            CustomHeader: customHeader
        });

    });
}


//**************************************************
//********* EXAMPLE-4.1 (HEADING STYLE)***************
//**************************************************
/*
     BY USING HEADINGSTYLE FUNCTION WILL CHANGE THE TABLE HEADER FORECOLOR AND BACKGROUND COLOR
     REQUIRED PARAMETER(s)
             1. TableID: Specific ID of table
             2. BackgroundColor: Background color of table's heading
             3. ForeColor: ForeColor of table of table's heading

*/
function tableHeadingStyle() {
    GetEmployees(function(myObject) {

        //BIND TABLE
        j2HTML.Table({
            Data: myObject,
            TableID: '#tbTest',
            AppendTo: '#divTable',
        }).HeadingStyle({

            TableID: '#tbTest',
            BackgroundColor: 'black',
            ForeColor: 'white'

        });


    });
}

//**************************************************
//********** EXAMPLE-4.2 (TABLE STYLE)****************
//**************************************************
/*
    BY USING TABLESTYLE FUNCTION WILL CHANGE THE TABLE FORECOLOR AND BACKGROUND COLOR 
*/

function tableBodyStyle() {

    GetCategories(function(myObject) {


        j2HTML.Table({
            Data: myObject,
            TableID: '#tbTest',
            AppendTo: '#divTable',
        }).TableStyle({

            TableID: '#tbTest',
            BackgroundColor: 'black',
            ForeColor: 'lightblue'

        });

    });
}

//**************************************************
//********** EXAMPLE-4.3 (TABLE STYLE)****************
//**************************************************
/*
    1. BY USING HEADINGSTYLE FUNCTION WILL CHANGE THE TABLE HEADER FORECOLOR AND BACKGROUND COLOR
    2. BY USING TABLESTYLE FUNCTION WILL CHANGE THE TABLE FORECOLOR AND BACKGROUND COLOR 
*/

function headerAndTableStyle() {

    GetCategories(function(myObject) {


        j2HTML.Table({
            Data: myObject,
            TableID: '#tbTest',
            AppendTo: '#divTable',

        }).HeadingStyle({

            TableID: '#tbTest',
            BackgroundColor: 'lightyellow',
            ForeColor: 'black'

        }).TableStyle({

            TableID: '#tbTest',
            BackgroundColor: 'black',
            ForeColor: 'lightblue'

        });

    });


}


//**************************************************
//*********** EXAMPLE-6 (SEARCH) *******************
//**************************************************

/*
   BY USING SEARCH FUNCTION SEARCH WITH IN TABLE OR WITHIN SPECIFIC COLUMN(s)
   ADD  <input id="txtSearch" type="text" class="form-control" placeholder="search..."> to your page 
   
   1. SEARCH WITH IN WHOLE TABLE 
      
*/
function searchWholeTable() {

    GetProducts(function(myObject) {

        $('#txtSearch').show();

        j2HTML.Table({

            Data: myObject,
            TableID: '#tbTest',
            AppendTo: '#divTable', //div created in step 1

        }).Search({

            TableID: '#tbTest',
            SearchTextBoxID: '#txtSearch'


        });

    });
}


function searchWithInSpecificColumn() {

    GetProducts(function(myObject) {

        $('#txtSearch').show();

        j2HTML.Table({

            Data: myObject,
            TableID: '#tbTest',
            AppendTo: '#divTable', //div created in step 1

        }).Search({

            TableID: '#tbTest',
            SearchTextBoxID: '#txtSearch',
            SearchInColumns: ['ProductID', 'ProductName']

        });

    });
}




//**************************************************
//********** EXAMPLE-7 (PAGING)*********************
//**************************************************

/*
    BY USING PAGING FUNCTION ADD PAGE TO TABLE
    
*/

function tablePaging() {
    GetCustomers(function(myObject) {

        j2HTML.Table({
            Data: myObject,
            TableID: '#tbTest',
            AppendTo: '#divTable',
        }).Paging({

            TableID: '#tbTest',
            PaginationAppendTo: '#divPagination',
            RowsPerPage: 5,
            ShowPages: 8,
            StartPage: 7

        });

    });
}


//**************************************************
//*************** EXAMPLE-8 ************************
//**************************************************

/*
     BY USING PRINT FUNCTION YOU CAN EXPORT HTML TABLE TO CSV OR PDF
    
     1. ADD button to HTML 
            <button class="btn btn-sm btn-primary" onclick="printCSV();">CSV</button>
            
    CREATE function printCSV ASSUMPTION: table is avaiable in HTML
     
*/
function exportTable() {

    //FIRST CREATE TABLE
    GetCustomers(function(myObject) {

        $('#btnExportToCVS').show();

        j2HTML.Table({
            Data: myObject,
            TableID: '#tbTest',
            AppendTo: '#divTable',
        }).Paging({

            TableID: '#tbTest',
            PaginationAppendTo: '#divPagination',
            RowsPerPage: 5,
            ShowPages: 8,
            StartPage: 7

        });

    });

}


//EXPORT TABLE
function printCSV() {

    j2HTML.Print({

        TableID: '#tbTest',
        Print: 'CSV'
    });
}


//**************************************************
//*************** EXAMPLE-9 ************************
//**************************************************

/*
     ADD COLUMN TO TABLE
     
*/
function AddColumnToTable() {

    GetCustomers(function(myObject) {

        var customHeader = [

            { 'customColumnName': ' ', 'customColumnValue': '<button class="btn btn-sm btn-primary" value="{{Country}}">{{CustomerID}}</button>' },
            { 'orginalColumnName': 'CustomerID', 'newColumnName': 'ID', 'Visible': false },
            { 'orginalColumnName': 'CompanyName', 'newColumnName': 'Company', 'Visible': true },
            //{ 'customColumnName': ' ', 'customColumnValue': '<button class="btn btn-sm btn-primary">Submit</button>' },
            { 'orginalColumnName': 'City', 'newColumnName': 'City', 'Visible': true },
            { 'orginalColumnName': 'Country', 'newColumnName': 'Country', 'Visible': true },

        ];

        j2HTML.Table({
            Data: myObject,
            TableID: '#tbTest',
            AppendTo: '#divTable',
            CustomHeader: customHeader,
            DefaultHeader: false,
        }).Paging({
            TableID: '#tbTest',
            RowsPerPage: 5,
            ShowPages: 8,
            PaginationAppendTo: '#divPagination',
            StartPage: 7

        });

    });
}



//**************************************************
//*************** EXAMPLE-9 ************************
//**************************************************

/*
     CREATE ROW IN TABLE

     CREATE A FUNCTION (testInsert)
     EXAMPLE: 
     function testInsert(data) {
        var test = data;
        j2HTML.HideModal();
    }
     
*/

function insertNewRow() {


    GetCustomers(function(myObject) {

        j2HTML.Table({

            Data: myObject,
            TableID: '#tbTest',
            AppendTo: '#divTable',
            CreateFunction: testInsert,
        }).Paging({
            TableID: '#tbTest',
            RowsPerPage: 5,
            ShowPages: 8,
            PaginationAppendTo: '#divPagination',
            StartPage: 7

        });

    });
}

function testInsert(data) {
    var test = data;
    j2HTML.HideModal();
}


//**************************************************
//*************** EXAMPLE-10 ************************
//**************************************************

/*
     UPDATE TABLE ROW

     CREATE A FUNCTION (testUpdate)
     EXAMPLE: 
     function testUpdate(data) {
        var test = data;
        j2HTML.HideModal();
    }
     
*/

function updateTableRow() {

    GetCustomers(function(myObject) {

        j2HTML.Table({

            Data: myObject,
            TableID: '#tbTest',
            AppendTo: '#divTable',
            UpdateFunction: testUpdate,
        }).Paging({
            TableID: '#tbTest',
            RowsPerPage: 5,
            ShowPages: 8,
            PaginationAppendTo: '#divPagination',
            StartPage: 7

        });

    });
}

function testUpdate(data) {
    var test = data;
    j2HTML.HideModal();
}



//**************************************************
//*************** EXAMPLE-11 ************************
//**************************************************

/*
     UPDATE TABLE ROW

     CREATE A FUNCTION (testDelete)
     EXAMPLE: 
     function testDelete(data) {
        var test = data;
    }
     
*/

function deleteTableRow() {

    GetCustomers(function(myObject) {

        j2HTML.Table({

            Data: myObject,
            TableID: '#tbTest',
            AppendTo: '#divTable',
            DeleteFunction: testDelete,
        }).Paging({
            TableID: '#tbTest',
            RowsPerPage: 5,
            ShowPages: 8,
            PaginationAppendTo: '#divPagination',
            StartPage: 7

        });

    });
}

function testDelete(data) {
    var test = data;
}


// //CREATE CUSTOM HEADER
// var customHeader = [

//     //{ 'customColumnName': ' ', 'customColumnValue': '<button class="btn btn-sm btn-primary" value="{{Country}}">{{CustomerID}}</button>' },
//     //{ 'customColumnName': ' ', 'customColumnValue': '<button class="btn btn-sm btn-primary">Submit</button>' },
//     { 'orginalColumnName': 'CustomerID', 'newColumnName': 'ID', 'Visible': false },
//     { 'orginalColumnName': 'CompanyName', 'newColumnName': 'Company', 'Visible': true },
//     //{ 'customColumnName': ' ', 'customColumnValue': '<button class="btn btn-sm btn-primary" value="{{Country}}">{{CustomerID}}</button>' },
//     { 'customColumnName': ' ', 'customColumnValue': '<button class="btn btn-sm btn-primary">Submit</button>' },
//     { 'orginalColumnName': 'City', 'newColumnName': 'City', 'Visible': true },
//     { 'orginalColumnName': 'Country', 'newColumnName': 'Country', 'Visible': true },
//     //{ 'customColumnName': ' ', 'customColumnValue': '<button class="btn btn-sm btn-primary" value="{{Country}}">{{CustomerID}}</button>' }
//     //{ 'customColumnName': ' ', 'customColumnValue': '<button class="btn btn-sm btn-primary">Submit</button>' }

// ];

// //ADD COLUMN TO
// var addToColumn = [
//     { 'ColumanName': 'Country', 'Value': 'Country: ', 'Type': 'prepend' },
//     { 'ColumanName': 'City', 'Value': '(city name)', 'Type': 'append' }
// ];


// j2HTML.Table({
//     Data: myObject,
//     TableID: 'tbTest',
//     AppendTo: '#divTable',
//     //CustomHeader: customHeader,
//     //DefaultHeader: false,
//     UpdateFunction: testUpdate,
//     CreateFunction: testInsert,
//     DeleteFunction: testDelete,
//     //CreateButtonAppendTo: '#btnCreate',
//     //AddToColumn: addToColumn
// }).Paging({
//     TableID: 'tbTest',
//     RowsPerPage: 5,
//     ShowPages: 8,
//     PaginationAppendTo: 'divPagination',
//     StartPage: 7

// });