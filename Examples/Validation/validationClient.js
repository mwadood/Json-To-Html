function validationHome() {

    $('#divJ2HTMLValidationExamples').hide();
    $('#divJ2HTMLValidation').show();
}


function setValidationMenu(id) {

    if ($('#divJ2HTMLValidationExamples').is(':visible') === false) {
        $('#divJ2HTMLValidation').hide();
        $('#divJ2HTMLValidationExamples').show();
        $('.j2HTMLValidationMenu').removeClass('active');
        $('#' + id).addClass('active');

        //HIDE ALL SUBMIT BUTTONS
        $('.btnValidation').hide();

        //SHOW REQUIRED SUBMIT BUTTON
        if (id === "validatRequired") {
            $('#btnValidateRequired').show();
        }



    } else {
        $('.j2HTMLValidationMenu').removeClass('active');
        $('#' + id).addClass('active');
    }
}

function showValidation() {

    setValidationMenu('validatRequired');
}

/* ************ REQUIRED VALIDATION ****************
   REQUIRED PARAMETERS:
        1. ElementID: ID of element need to validate
        2. ValidationType: validation type 
                            a)required 
                            b)integer
                            c)decimal
                            d)phone
                            e)date
                            f)email
                            g)zip
                            h)url
                            i)maxLength
                            j)minLength
                            k)range
                            l)charater
   OPTIONAL PARAMETERS:
        1. DisplayType: a)Text b)Modal c)popover
        2. Position: a)Top b)Bottom
        3. ErrorMessage: Message to show

*/

$(function() {

    j2HTML.Validate({

        ElementID: ['#txtUserName', '#txtPassword', '#txtPassword'],
        ValidationType: ['required', 'required', 'integer'],
        ErrorMessage: ['User name is required', 'number is required', 'only interger allowed'],
        //Length: '7',


        // ElementID: ['#txtUserName', '#txtPassword'],
        // ValidationType: ['required', 'custom'],
        // ErrorMessage: ['User name is required', 'Date is not valid'],
        // Regex: '\d{1,2}\/\d{1,2}\/\d{4}',
        //Position: ['Top', 'Bottom', 'Bottom'],


        DisplayType: 'Modal'
            //DisplayType: 'Popover'

    });



});




function requiredValidation() {

    if ($('.validationErrorMessage').length === 0) {
        alert('No error');
    }


    //VALIDATE ON CLICK

    // j2HTML.Validate({

    //     ElementID: ['#txtUserName', '#txtPassword', '#txtPassword'],
    //     ValidationType: ['required', 'required', 'integer'],
    //     ErrorMessage: ['User name is required', 'number is required', 'only integer allowed'],
    //     ValidateOn: 'Click',


    //     // ElementID: ['#txtUserName', '#txtPassword'],
    //     // ValidationType: ['required', 'custom'],
    //     // ErrorMessage: ['User name is required', 'Date is not valid'],
    //     // Regex: '\d{1,2}\/\d{1,2}\/\d{4}',
    //     //Position: ['Top', 'Bottom', 'Bottom'],
    //     //Length: '7',

    //     //DisplayType: 'Modal'
    //     //DisplayType: 'Popover'

    // });

    // if ($('.validationErrorMessage').length === 0) {
    //     alert('No error');
    // }

}