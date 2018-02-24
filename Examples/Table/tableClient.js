function exampleOne() {

    //GET DATA FROM DATABASE
    GetCustomers(function(data) {

        var myObject = data;



        //CREATE CUSTOM HEADER
        var customHeader = [

            //{ 'customColumnName': ' ', 'customColumnValue': '<button class="btn btn-sm btn-primary" value="{{Country}}">{{CustomerID}}</button>' },
            //{ 'customColumnName': ' ', 'customColumnValue': '<button class="btn btn-sm btn-primary">Submit</button>' },
            { 'orginalColumnName': 'CustomerID', 'newColumnName': 'ID', 'Visible': false },
            { 'orginalColumnName': 'CompanyName', 'newColumnName': 'Company', 'Visible': true },
            //{ 'customColumnName': ' ', 'customColumnValue': '<button class="btn btn-sm btn-primary" value="{{Country}}">{{CustomerID}}</button>' },
            { 'customColumnName': ' ', 'customColumnValue': '<button class="btn btn-sm btn-primary">Submit</button>' },
            { 'orginalColumnName': 'City', 'newColumnName': 'City', 'Visible': true },
            { 'orginalColumnName': 'Country', 'newColumnName': 'Country', 'Visible': true },
            //{ 'customColumnName': ' ', 'customColumnValue': '<button class="btn btn-sm btn-primary" value="{{Country}}">{{CustomerID}}</button>' }
            //{ 'customColumnName': ' ', 'customColumnValue': '<button class="btn btn-sm btn-primary">Submit</button>' }

        ];

        //ADD COLUMN TO
        var addToColumn = [
            { 'ColumanName': 'Country', 'Value': 'Country: ', 'Type': 'prepend' },
            { 'ColumanName': 'City', 'Value': '(city name)', 'Type': 'append' }
        ];


        j2HTML.Table({
            Data: myObject,
            TableID: 'tbTest',
            AppendTo: '#divTable',
            //CustomHeader: customHeader,
            //DefaultHeader: false,
            UpdateFunction: testUpdate,
            CreateFunction: testInsert,
            DeleteFunction: testDelete,
            //CreateButtonAppendTo: '#btnCreate',
            //AddToColumn: addToColumn
        }).Paging({
            TableID: 'tbTest',
            RowsPerPage: 5,
            ShowPages: 8,
            PaginationAppendTo: 'divPagination',
            StartPage: 7

        });

    });

});




function testUpdate(data) {
    var test = data;
    j2HTML.HideModal();
}

function testInsert(data) {
    var test = data;
    j2HTML.HideModal();
}


function testDelete(data) {
    var test = data;
    //j2HTML.HideModal();
}





/* 
 ***************************************************************************** 
 ********************************** TABLE ************************************
 ***************************************************************************** 
 */

//**************************************************
//************ EXAMPLE-1 (BASIC) *******************
//**************************************************

// x.Table({

//     Data: myObject,
//     AppendTo: 'divTable'
// });


//**************************************************
//********** EXAMPLE-2 (CUSTOMHEADER) **************
//**************************************************
//Adding customer header to display or change single or multiple     
//column name 


/*
 1. WILL DISPLAY ONY ONE COLUMN ‘CustomerName’ with ‘Name’ header ---
    
 UN-Comment the following code to for to display one column with custom header name
   
*/


// var customHeader = [
//     { 'orginalColumnName': 'CustomerName', 'newColumnName': 'Name' }
// ];

/*
   2. FOLLOWING WILL SHOW ALL COLUMN
   UN-Comment the following code to display all column with custom header name
*/

// var customHeader = [
//     { 'orginalColumnName': 'CustomerName', 'newColumnName': 'Name' },
//     { 'orginalColumnName': 'City', 'newColumnName': 'Customer City Name' },
//     { 'orginalColumnName': 'Country', 'newColumnName': 'Country' }
// ];


//UN-Comment the following code to see the result

// x.Table({

//     Data: myObject,
//     AppendTo: 'divTable', //div created in step 2
//     DefaultHeader: false, //MUST BE FALSE
//     CustomHeader: customHeader
// });


//***************************************************************
//*************** EXAMPLE-3 (APPEND OR PREPAND VALYE) ***********
//***************************************************************
/*
    Append or Prepend value to Column(s)
    UN-Comment the following code to see the result
*/

// var addToColumn = [
//     { 'ColumanName': 'CustomerName', 'Value': 'Name: ', 'Type': 'prepend' },
//     { 'ColumanName': 'City', 'Value': '(city name)', 'Type': 'append' }
// ];

// x.Table({

//     Data: myObject,
//     AppendTo: 'divTable', //div created in step 2
//     AddToColumn: addToColumn
// });

//**************************************************
//********* EXAMPLE-4 (HEADING STYLE)***************
//**************************************************

/*
     BY USING HEADINGSTYLE FUNCTION WILL CHANGE THE TABLE HEADER FORECOLOR AND BACKGROUND COLOR
     UN-Comment the following code to see the result
*/

// x.Table({
//     Data: myObject,
//     TableID: 'tbTest',
//     AppendTo: 'divTable', //div created in step 2
// }).HeadingStyle({

//     TableID: 'tbTest',
//     BackgroundColor: 'black',
//     Forecolor: 'white'

// });



//**************************************************
//********** EXAMPLE-5 (TABLE STYLE)****************
//**************************************************

/*
    BY USING TABLESTYLE FUNCTION WILL CHANGE THE TABLE FORECOLOR AND BACKGROUND COLOR 
    UN-Comment the following code to see the result
*/

// x.Table({
//     Data: myObject,
//     TableID: 'tbTest',
//     AppendTo: 'divTable', //div created in step 2

// }).HeadingStyle({

//     TableID: 'tbTest',
//     BackgroundColor: 'lightyellow',
//     Forecolor: 'black'

// }).TableStyle({

//     TableID: 'tbTest',
//     BackgroundColor: 'black',
//     Forecolor: 'lightblue'

// });


//**************************************************
//*********** EXAMPLE-6 (SEARCH) *******************
//**************************************************

/*
   BY USING SEARCH FUNCTION SEARCH WITH IN TABLE OR WITHIN SPECIFIC COLUMN(s)
   ADD  <input id="txtSearch" type="text" class="form-control" placeholder="search..."> to your page 
   
   1. SEARCH WITH IN WHOLE TABLE 
   
   UN-Comment the following code to see the result
   
*/

// x.Table({

//     Data: myObject,
//     TableID: 'tbTest',
//     AppendTo: 'divTable', //div created in step 1

// }).Search({

//     TableID: 'tbTest',
//     SearchTextBoxID: 'txtSearch'

// });


/*
  
   1. SEARCH WITH IN SPECIFIC COLUMN(s) 
   IN THIS EXAMPLE WE ARE SEARECH WITH city and Country column
   
   UN-Comment the following code to see the result
   
*/

// x.Table({

//     Data: myObject,
//     TableID: 'tbTest',
//     AppendTo: 'divTable', //div created in step 1

// }).Search({

//     TableID: 'tbTest',
//     SearchTextBoxID: 'txtSearch',
//     SearchInColumns: ['City', 'Country']

// });


//**************************************************
//********** EXAMPLE-7 (PAGING)*********************
//**************************************************

/*
                       BY USING PAGING FUNCTION ADD PAGE TO TABLE
                       UN-Comment the following code to see the result
    
                    */

// x.Table({
//     Data: myObject,
//     TableID: 'tbTest',
//     AppendTo: 'divTable', //div created in step 2
// }).Paging({

//     TableID: 'tbTest',
//     RowsPerPage: 5
// });

//**************************************************
//*************** EXAMPLE-8 ************************
//**************************************************

/*
     BY USING PRINT FUNCTION YOU CAn EXPORT HTML TABLE TO CSV OR PDF
    
     1. ADD button to HTML 
            <button class="btn btn-sm btn-primary" onclick="printCSV();">CSV</button>
            
    CREATE function printCSV ASSUMPTION: table is avaiable in HTML
    
    UN-Comment the following code to see the result
    
*/
// function printCSV() {

//     var p = new jsonToHtml();
//     p.Print({

//         //TableID: 'tbTest',
//         Print: 'CSV'
//     });
// }