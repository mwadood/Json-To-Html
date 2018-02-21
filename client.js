var myObject = '';

GetCustomers(function(data) {

    myObject = data;
});


function GetSelectedVal() {


    //GET SELECTED DROPDOWN
    // var l = getSelected({
    //     ElementID: 'ddlTest',
    //     ElementType: 'Dropdown',
    //     GetSelected: 'Both'
    // });

    //GET RADIO BUTTON SELECTED VALUES AND TEXT
    // var l = getSelected({
    //     GroupName: 'rdbCategories',
    //     ElementType: 'RadioButton',
    //     GetSelected: 'Both'
    // });

    var text = [];
    var value = [];
    $.each(l, function(i, v) {

        if (v.Text !== undefined) {
            text.push(v.Text);
        }
        if (v.Value !== undefined) {
            value.push(v.Value);
        }
    });

    if (text.length !== 0 && value.length !== 0) {
        alert("Text: " + text + "\n" + "Value:" + value);
    }
    if (text.length === 0 && value.length !== 0) {
        alert("Value:" + value);
    }
    if (text.length !== 0 && value.length === 0) {
        alert("Text: " + text);
    }
    if (l.length === 0) {
        alert("No check found");
    }
}

//function openModal() {


// var modalData = [
//     { "Company": "Gourmet Lanchonetes", "City": "Campinas", "Country": "Brazil" },
//     { "Company": "Gourmet Lanchonetes11", "City": "Campinas11", "Country": "Brazil11" }
// ];

// //EXAMPLE (DEFAULT)
// j2HTML.Modal({

//     Data: modalData,
//     Heading: 'Company',
//     //Display: 'RadioButton',
//     //ModalID: '#testModal'

// }).ShowModal();



// //EXAMPLE WITH MODAL ID (RADIO BUTTON)
// j2HTML.Modal({

//     Data: modalData,
//     Heading: 'Company',
//     Display: 'RadioButton',
//     ModalID: '#testModal'

// }).Radio({

//     Data: modalData,
//     AppendTo: '#testModalBody',
//     Text: 'Country',
//     //Value: 'CategoryID',
//     Direction: 'Vertical',
//     GroupName: 'rdbCategories',

// }).ShowModal({
//     ModalID: '#testModal'
//     });

// //EXAMPLE WITHOUT MODAL ID (RADIO BUTTON)
// j2HTML.Modal({

//     Data: modalData,
//     Heading: 'Company',
//     Display: 'RadioButton',
//     //ModalID: '#testModal'

// }).Radio({

//     Data: modalData,
//     AppendTo: '#j2HTMLModalBody',
//     Text: 'Country',
//     //Value: 'CategoryID',
//     Direction: 'Vertical',
//     GroupName: 'rdbCategories',

// }).ShowModal();


// //EXAMPLE WITHOUT MODAL ID (CHECKBOX)
// j2HTML.Modal({

//     Data: modalData,
//     Heading: 'Company',
//     Display: 'Checkbox',
//     //ModalID: '#testModal'

// }).Checkbox({

//     Data: modalData,
//     AppendTo: '#j2HTMLModalBody',
//     Text: 'Country',
//     Value: 'City',
//     Direction: 'Vertical'

// }).ShowModal();



// var modalName = 'testModal';
// // //EXAMPLE WITHOUT MODAL ID (dropdown)
// j2HTML.Modal({

//     Data: modalData,
//     Heading: 'Company',
//     Display: 'Dropdown',
//     ModalID: '#' + modalName

// }).Dropdown({

//     Data: modalData,
//     //AppendTo: '#ddlj2HTMLModal',
//     AppendTo: '#ddl' + modalName,
//     Text: 'City'

// }).ShowModal({
//     ModalID: '#' + modalName
// });


// j2HTML.Modal({

//     Data: modalData,
//     Heading: 'Company',
//     Display: 'Dropdown',
//     //ModalID: '#testModal'

// }).ShowModal();


//}

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


$(function() {



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

    var addToColumn = [
        { 'ColumanName': 'Country', 'Value': 'Country: ', 'Type': 'prepend' },
        { 'ColumanName': 'City', 'Value': '(city name)', 'Type': 'append' }
    ];


    //UN-Comment the following code to see the result

    // x.Table({

    //     Data: myObject,
    //     AppendTo: 'divTable', //div created in step 2
    //     DefaultHeader: false, //MUST BE FALSE
    //     CustomHeader: customHeader
    // });


    j2HTML.Table({
        Data: myObject,
        TableID: 'tbTest',
        AppendTo: '#divTable',
        //CustomHeader: customHeader,
        //DefaultHeader: false,
        UpdateFunction: testUpdate,
        CreateFunction: testInsert,
        DeleteFunction: testDelete,
        CreateButtonAppendTo: '#btnCreate',
        //AddToColumn: addToColumn
    }).Paging({
        TableID: 'tbTest',
        RowsPerPage: 5,
        ShowPages: 8,
        PaginationAppendTo: 'divPagination',
        StartPage: 7

    });








    // j2HTML.Checkbox({

    //     Data: myObject,
    //     AppendTo: '#divCheckbox',
    //     Text: 'City',
    //     //Value: 'CategoryID',
    //     GroupName: 'chkCategories',
    //     Direction: 'Vertical'

    // });


    // j2HTML.Radio({

    //     Data: myObject,
    //     AppendTo: '#divRadioButton',
    //     Text: 'Country',
    //     //Value: 'CategoryID',
    //     GroupName: 'rdbCategories',

    // });


    // j2HTML.Dropdown({

    //     Data: myObject,
    //     AppendTo: 'ddlTest',
    //     Text: 'CategoryName',
    //     Value: 'CategoryID',

    // });

    //GET SELECTED DROPDOWN
    // var l = getSelected({
    //     ElementID: 'ddlTest',
    //     ElementType: 'Dropdown',
    //     GetSelected: 'Both'
    // });


    // var text = [];
    // var value = [];
    // $.each(l, function(i, v) {

    //     if (v.Text !== undefined) {
    //         text.push(v.Text);
    //     }
    //     if (v.Value !== undefined) {
    //         value.push(v.Value);
    //     }
    // });

    // if (text.length !== 0 && value.length !== 0) {
    //     alert("Text: " + text + "\n" + "Value:" + value);
    // }
    // if (text.length === 0 && value.length !== 0) {
    //     alert("Value:" + value);
    // }
    // if (text.length !== 0 && value.length === 0) {
    //     alert("Text: " + text);
    // }
    // if (l !== undefined) {
    //     if (l.length === 0) {
    //         alert("No check found");
    //     }
    // }



    // x.Switch({
    //     Data: myObject,
    //     AppendTo: 'divChkList',
    //     Text: 'City',
    //     Texton: 'OK',

    //     Textoff: 'No',

    //     Size: 'md',
    //     Direction: 'Vertical'

    // });

    //toggleSwitch();


    /* 
     ***************************************************************************** 
     ********************************** DROPDOWN *********************************
     ***************************************************************************** 
     */

    /*
                    REQUIRED    
                        Data: JSON OBJECT
                        AppendTo: CONTROL NAME
                        Text: NAME OF THE COLUM
                    OPTIONAL
                        Value: NAME OF THE COLUMN   
    
                   1. Create SELECT TAG in HTML
                   
                        <select id="ddlTest" class="form-control">
                            <option value="-1">Select...</option>
                        </select>
                    In the following Example Text:'CITY' will get all the Cities from the 
                    JSON object and bind to dropdown    
                */

    // x.Dropdown({

    //     Data: myObject,
    //     AppendTo: 'ddlTest',
    //     Text: 'City'

    // });


    // var data = false;
    // var groupName = false;
    // var value = false;
    // var text = false;
    // var direction = 'Horizontal';
    // var appendTo = false;

    /* 
     ***************************************************************************** 
     ********************************** RADIO BUTTON *****************************
     ***************************************************************************** 
     */

    /*
                    REQUIRED    
                        Data: JSON OBJECT
                        AppendTo: CONTROL NAME
                        Text: NAME OF THE COLUM
                    OPTIONAL
                        Value: NAME OF THE COLUMN
                        GroupName: Name of the radio b utton list
                        Direction: 'Vertical'
                                    By Default is horizontal   
    
                   1. Create DIV TAG in HTML
                   
                        <div id="divRadioButton"></div>
                        
                    In the following Example Text:'CITY' will get all the Cities from the 
                    JSON object and bind to Radio button    
                */

    // x.Radio({

    //     Data: myObject,
    //     AppendTo: 'divRadioButton',
    //     Text: 'City'

    // });



    /* 
     ***************************************************************************** 
     ************************************* CHECKBOX ******************************
     ***************************************************************************** 
     */

    /*
                    REQUIRED    
                        Data: JSON OBJECT
                        AppendTo: CONTROL NAME
                        Text: NAME OF THE COLUM
                    OPTIONAL
                        Value: NAME OF THE COLUMN
                        GroupName: Name of the radio b utton list
                        Direction: 'Vertical'
                                    By Default is horizontal   
    
                   1. Create DIV TAG in HTML
                   
                        <div id="divCheckbox"></div>
                        
                    In the following Example Text:'CITY' will get all the Cities from the 
                    JSON object and bind to Radio button    
    */

    // x.Checkbox({

    //     Data: myObject,
    //     AppendTo: 'divCheckbox',
    //     Text: 'City',
    //     Direction: 'Vertical'

    // });


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
    // x.List({

    //     Data: myObject,
    //     AppendTo: 'unorderList',
    //     Text: 'City'

    // });

});



/* 
 ***************************************************************************** 
 ************************************* MODAL ******************************
 ***************************************************************************** 
 */

/*
                REQUIRED    
                    Data: JSON OBJECT
                    Heading: MODAL HEADING
                OPTIONAL
                    Display: Default TEXT other options CHECKBOX, RADIONBUTTON, TEXTBOX, DROPDOWN
                    ModalID: Default 'j2HTMLModal'
*/

function openModal() {

    var modalData = '';
    GetEmployees(function(data) {

        modalData = data;

        ////1. EXAMPLE (DEFAULT)
        // j2HTML.Modal({

        //     Data: modalData,
        //     Heading: 'Employee Information',
        //     //Display: 'RadioButton',
        //     //ModalID: '#testModal'

        // }).ShowModal();


        ////2. EXAMPLE WITH MODAL NAME
        // j2HTML.Modal({

        //     Data: modalData,
        //     Heading: 'Employee Information',
        //     //Display: 'RadioButton',
        //     ModalID: '#testModal'

        // }).ShowModal({
        //     ModalID: '#testModal'
        //});


        ////3. EXAMPLE DISPLAY TYPE TEXTBOX
        j2HTML.Modal({

            Data: modalData,
            Heading: 'Employee Information',
            Display: 'TextBox',
            //ModalID: '#testModal'

        }).ShowModal();



    });

    // var modalData = [
    //     { "Company": "Gourmet Lanchonetes", "City": "Campinas", "Country": "Brazil" },
    //     { "Company": "Gourmet Lanchonetes11", "City": "Campinas11", "Country": "Brazil11" }
    // ];

    // //EXAMPLE (DEFAULT)
    // j2HTML.Modal({

    //     Data: modalData,
    //     Heading: 'Company',
    //     //Display: 'RadioButton',
    //     //ModalID: '#testModal'

    // }).ShowModal();



    // //EXAMPLE WITH MODAL ID (RADIO BUTTON)
    // j2HTML.Modal({

    //     Data: modalData,
    //     Heading: 'Company',
    //     Display: 'RadioButton',
    //     ModalID: '#testModal'

    // }).Radio({

    //     Data: modalData,
    //     AppendTo: '#testModalBody',
    //     Text: 'Country',
    //     //Value: 'CategoryID',
    //     Direction: 'Vertical',
    //     GroupName: 'rdbCategories',

    // }).ShowModal({
    //     ModalID: '#testModal'
    //     });

    // //EXAMPLE WITHOUT MODAL ID (RADIO BUTTON)
    // j2HTML.Modal({

    //     Data: modalData,
    //     Heading: 'Company',
    //     Display: 'RadioButton',
    //     //ModalID: '#testModal'

    // }).Radio({

    //     Data: modalData,
    //     AppendTo: '#j2HTMLModalBody',
    //     Text: 'Country',
    //     //Value: 'CategoryID',
    //     Direction: 'Vertical',
    //     GroupName: 'rdbCategories',

    // }).ShowModal();


    // //EXAMPLE WITHOUT MODAL ID (CHECKBOX)
    // j2HTML.Modal({

    //     Data: modalData,
    //     Heading: 'Company',
    //     Display: 'Checkbox',
    //     //ModalID: '#testModal'

    // }).Checkbox({

    //     Data: modalData,
    //     AppendTo: '#j2HTMLModalBody',
    //     Text: 'Country',
    //     Value: 'City',
    //     Direction: 'Vertical'

    // }).ShowModal();



    // var modalName = 'testModal';
    // // //EXAMPLE WITHOUT MODAL ID (dropdown)
    // j2HTML.Modal({

    //     Data: modalData,
    //     Heading: 'Company',
    //     Display: 'Dropdown',
    //     ModalID: '#' + modalName

    // }).Dropdown({

    //     Data: modalData,
    //     //AppendTo: '#ddlj2HTMLModal',
    //     AppendTo: '#ddl' + modalName,
    //     Text: 'City'

    // }).ShowModal({
    //     ModalID: '#' + modalName
    // });


    // j2HTML.Modal({

    //     Data: modalData,
    //     Heading: 'Company',
    //     Display: 'Dropdown',
    //     //ModalID: '#testModal'

    // }).ShowModal();


}


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

// function filterResult(controlName, li, value) {
//     var x = new jsonToHtml();
//     x.Filter(controlName, li, value);
// }





function printPDF() {

    var p = new jsonToHtml();
    p.Print({

        TableID: 'tbTest',
        Print: 'PDF'
    });
}