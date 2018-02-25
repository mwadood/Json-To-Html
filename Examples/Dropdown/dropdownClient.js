function ddlHome() {

    $('#divJ2HTMLCheckboxExamples').hide();
    $('#divJ2HTMLDropdown').show();
}


function setTableMenu(id) {
    if ($('#divJ2HTMLDropdownExamples').is(':visible') === false) {
        $('#divJ2HTMLDropdown').hide();
        $('#divJ2HTMLDropdownExamples').show();
        $('.j2HTMLDropdownMenu').removeClass('active');
        $('#' + id).addClass('active');
    } else {
        $('.j2HTMLDropdownMenu').removeClass('active');
        $('#' + id).addClass('active');
    }
}

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
function j2HTMLDDL() {

    GetProducts(function(myObject) {

        j2HTML.Dropdown({

            Data: myObject,
            AppendTo: '#ddlTest',
            Text: 'ProductName',
            Value: 'ProductID'

        });
        setTableMenu('DDL');

    });
}


// $(function() {
//     GetProducts(function(myObject) {

//         j2HTML.Dropdown({

//             Data: myObject,
//             AppendTo: '#ddlTest',
//             Text: 'ProductName',
//             Value: 'ProductID'

//         });
//         setTableMenu('DDL');

//     });
// });