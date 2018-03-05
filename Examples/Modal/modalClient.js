function setModalMenu(id) {

    $('.j2HTMLModalMenu').removeClass('active');
    $('#' + id).addClass('active');

}


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
                    Header: Default is 'True'
                    Footer: Default is 'True'
*/

////EXAMPLE 1.1  TEXT (DEFAULT COLUMN)
function J2HTMLBasicDefaultColumnModal() {

    $('#loadingModal').modal('show');

    GetEmployees(function(modalData) {

        j2HTML.Modal({

            Data: modalData,
            Heading: 'Employee Information',

        }).ShowModal();

        $('#loadingModal').modal('hide');

    });
}


////EXAMPLE 1.2  (CUSTOM COLUMN)
function J2HTMLBasicCustomColumnModal() {

    $('#loadingModal').modal('show');

    GetEmployees(function(modalData) {

        var customColumns = [


            { 'orginalColumnName': 'EmployeeID', 'newColumnName': 'ID', 'Visible': false },
            { 'orginalColumnName': 'FirstName', 'newColumnName': 'First Name', 'Visible': true },
            { 'orginalColumnName': 'LastName', 'newColumnName': 'Last Name', 'Visible': true },
            { 'orginalColumnName': 'Title', 'newColumnName': 'Title', 'Visible': true },


        ];

        j2HTML.Modal({

            Data: modalData,
            Heading: 'Employee Information',
            CustomColumns: customColumns


        }).ShowModal();

        $('#loadingModal').modal('hide');

    });
}


///EXAMPLE 2.1  TEXT BOX (DEFAULT COLUMN)
function J2HTMLTextboxDefaultColumnModal() {

    $('#loadingModal').modal('show');

    GetEmployees(function(modalData) {

        j2HTML.Modal({

            Data: modalData,
            Heading: 'Employee Information',
            Display: 'TextBox',

        }).ShowModal();

        $('#loadingModal').modal('hide');

    });
}

///EXAMPLE 2.2  (CUSTOM COLUMN)
function J2HTMLTextboxCustomColumnModal() {

    $('#loadingModal').modal('show');

    GetEmployees(function(modalData) {



        var customColumns = [


            { 'orginalColumnName': 'EmployeeID', 'newColumnName': 'ID', 'Visible': false },
            { 'orginalColumnName': 'FirstName', 'newColumnName': 'First Name', 'Visible': true },
            { 'orginalColumnName': 'LastName', 'newColumnName': 'Last Name', 'Visible': true },
            { 'orginalColumnName': 'Title', 'newColumnName': 'Title', 'Visible': true },


        ];

        j2HTML.Modal({

            Data: modalData,
            Heading: 'Employee Information',
            Display: 'TextBox',
            CustomColumns: customColumns


        }).ShowModal();

        $('#loadingModal').modal('hide');

    });
}

/// EXAMPLE 3 (RADIO BUTTON)
/* 
    CREATE HTML ELEMENT
    MUST USE isModal: true

*/

function J2HTMLDefaultRadioButtonModal() {


    $('#loadingModal').modal('show');

    GetEmployees(function(modalData) {

        j2HTML.Modal({

            Data: modalData,
            Heading: 'Company',
            Display: 'RadioButton',

        }).Radio({

            Data: modalData,
            Text: 'Title',
            Value: 'EmployeeID',
            Direction: 'Vertical',
            GroupName: 'rdbCategories',
            isModal: true

        }).ShowModal();

        $('#loadingModal').modal('hide');

    });
}



function J2HTMLSpecificModalIDRadioButtonModal() {


    $('#loadingModal').modal('show');

    GetEmployees(function(modalData) {


        j2HTML.Modal({

            Data: modalData,
            Heading: 'Company',
            Display: 'RadioButton',
            ModalID: '#testModal'

        }).Radio({

            Data: modalData,
            AppendTo: '#testModal',
            Text: 'Title',
            Value: 'EmployeeID',
            Direction: 'Vertical',
            GroupName: 'rdbCategories',
            isModal: true

        }).ShowModal({
            ModalID: '#testModal'
        });

        $('#loadingModal').modal('hide');

    });
}


/// EXAMPLE 4 (CHECK BOX)
/* 
    MUST USE isModal: true
*/

function J2HTMLDefaultCheckBoxModal() {


    $('#loadingModal').modal('show');

    GetEmployees(function(modalData) {

        j2HTML.Modal({

            Data: modalData,
            Heading: 'Company',
            Display: 'Checkbox',

        }).Checkbox({

            Data: modalData,
            Text: 'Title',
            Value: 'EmployeeID',
            Direction: 'Vertical',
            GroupName: 'chkCategories',
            isModal: true

        }).ShowModal();

        $('#loadingModal').modal('hide');

    });
}



function J2HTMLSpecificModalIDCheckBoxModal() {


    $('#loadingModal').modal('show');

    GetEmployees(function(modalData) {


        j2HTML.Modal({

            Data: modalData,
            Heading: 'Company',
            Display: 'Checkbox',
            ModalID: '#testModal'

        }).Checkbox({

            Data: modalData,
            AppendTo: '#testModal',
            Text: 'Title',
            Value: 'EmployeeID',
            Direction: 'Vertical',
            GroupName: 'rdbCategories',
            isModal: true

        }).ShowModal({
            ModalID: '#testModal'
        });

        $('#loadingModal').modal('hide');

    });
}




/// EXAMPLE 5 (DROPDOWN)
/* 
    MUST USE isModal: true
*/

function J2HTMLDefaultDropdownModal() {


    $('#loadingModal').modal('show');

    GetEmployees(function(modalData) {

        j2HTML.Modal({

            Data: modalData,
            Heading: 'Company',
            Display: 'Dropdown',

        }).Dropdown({

            Data: modalData,
            Text: 'Title',
            Value: 'EmployeeID',
            isModal: true

        }).ShowModal();

        $('#loadingModal').modal('hide');

    });
}



function J2HTMLSpecificModalIDDropdownModal() {


    $('#loadingModal').modal('show');

    GetEmployees(function(modalData) {


        j2HTML.Modal({

            Data: modalData,
            Heading: 'Company',
            Display: 'Dropdown',
            ModalID: '#testModal'

        }).Dropdown({

            Data: modalData,
            AppendTo: '#testModal',
            Text: 'Title',
            Value: 'EmployeeID',
            isModal: true

        }).ShowModal({
            ModalID: '#testModal'
        });

        $('#loadingModal').modal('hide');

    });
}






function openModal() {

    //     var modalData = '';
    //     GetEmployees(function(data) {

    //         modalData = data;

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
    // j2HTML.Modal({

    //     Data: modalData,
    //     Heading: 'Employee Information',
    //     Display: 'TextBox',
    //     //ModalID: '#testModal'

    // }).ShowModal();


    //// 4. EXAMPLE WITHOUT MODAL ID (RADIO BUTTON)
    // j2HTML.Modal({

    //     Data: modalData,
    //     Heading: 'Company',
    //     Display: 'RadioButton',
    //     //ModalID: '#' + modalID

    // }).Radio({

    //     Data: modalData,
    //     AppendTo: '#rdbj2HTMLModal',
    //     Text: 'Title',
    //     Value: 'EmployeeID',
    //     Direction: 'Vertical',
    //     GroupName: 'rdbCategories',

    //}).ShowModal();



    //// 5. EXAMPLE WITH MODAL ID (RADIO BUTTON)
    // var modalID = 'testModal';
    // j2HTML.Modal({

    //     Data: modalData,
    //     Heading: 'Company',
    //     Display: 'RadioButton',
    //     ModalID: '#' + modalID

    // }).Radio({

    //     Data: modalData,
    //     AppendTo: '#rdb' + modalID,
    //     Text: 'Title',
    //     Value: 'EmployeeID',
    //     Direction: 'Vertical',
    //     GroupName: 'rdbCategories',

    // }).ShowModal({
    //     ModalID: '#' + modalID
    // });


    ////6. EXAMPLE WITHOUT MODAL ID (CHECKBOX)
    // j2HTML.Modal({

    //     Data: modalData,
    //     Heading: 'Employee Information',
    //     Display: 'Checkbox',

    // }).Checkbox({

    //     Data: modalData,
    //     AppendTo: '#chkj2HTMLModal',
    //     Text: 'LastName',
    //     Value: 'EmployeeID',
    //     Direction: 'Vertical'

    //     }).ShowModal();


    ////7. EXAMPLE WITH MODAL ID (CHECKBOX)
    // var modalID = 'testModal';
    // j2HTML.Modal({

    //     Data: modalData,
    //     Heading: 'Employee Information',
    //     Display: 'Checkbox',
    //     ModalID: '#' + modalID

    // }).Checkbox({

    //     Data: modalData,
    //     AppendTo: '#chk' + modalID,
    //     Text: 'LastName',
    //     Value: 'EmployeeID',
    //     Direction: 'Vertical'

    // }).ShowModal({
    //     ModalID: '#' + modalID
    // });



    ////8. EXAMPLE WITHOUT MODAL ID (dropdown)
    // j2HTML.Modal({

    //     Data: modalData,
    //     Heading: 'Company',
    //     Display: 'Dropdown',

    // }).Dropdown({

    //     Data: modalData,
    //     AppendTo: '#ddlj2HTMLModal',
    //     Text: 'Title'

    // }).ShowModal();



    ////9. EXAMPLE WITHOUT MODAL ID (dropdown)
    // var modalName = 'testModal';
    // j2HTML.Modal({

    //     Data: modalData,
    //     Heading: 'Company',
    //     Display: 'Dropdown',
    //     ModalID: '#' + modalName

    // }).Dropdown({

    //     Data: modalData,
    //     AppendTo: '#ddl' + modalName,
    //     Text: 'Title'

    // }).ShowModal({
    //     ModalID: '#' + modalName
    // });


    //});

}