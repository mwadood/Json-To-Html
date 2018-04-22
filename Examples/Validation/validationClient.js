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
                            d)date
                            e)email
                            f)zip
                            g)url
                            h)maxLength
                            e)minLength
   OPTIONAL PARAMETERS:
        1. DisplayType: a)Text b)Modal c)popover
        2. Position: a)Top b)Bottom
        3. ErrorMessage: Message to show

*/
function requiredValidation() {

    j2HTML.Validate({

        // ElementID: ['#txtUserName', '#txtPassword', '#txtPassword'],
        // ValidationType: ['required', 'required', 'decimal'],
        // ErrorMessage: ['User name is required', 'zip code is required', 'Only decimal is allowed'],


        ElementID: ['#txtUserName', '#txtPassword'],
        ValidationType: ['required', 'decimal'],
        ErrorMessage: ['User name is required', 'Only decimal is allowed'],


        //Position: ['Top', 'Bottom', 'Bottom'],
        //DisplayType: 'Modal'
        DisplayType: 'Popover'

    });

    if ($('.validationErrorMessage').length === 0) {
        alert('No error');
    }

}