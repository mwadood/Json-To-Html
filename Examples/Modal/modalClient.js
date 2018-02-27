function setTableMenu(id) {

    $('.j2HTMLListMenu').removeClass('active');
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

////1. EXAMPLE (DEFAULT)
function J2HTMLBasicModal() {

    $('#loadingModal').modal('show');

    GetEmployees(function(modalData) {

        j2HTML.Modal({

            Data: modalData,
            Heading: 'Employee Information',
            //Display: 'RadioButton',
            //ModalID: '#testModal'

        }).ShowModal();

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