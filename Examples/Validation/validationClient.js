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

            var test = '';
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
   OPTIONAL PARAMETERS:
        1. DisplayType: a)Text b)Modal c)
        2. Position: a)Top b)Bottom
        3. ErrorMessage: Message to show

*/
function requiredValidation() {
    j2HTML.Required({

        ElementID: ['#txtUserName', '#txtPassword'],
        ErrorMessage: ['User name is required', 'Password is required'],
        Position: 'Top',
        //DisplayType: 'Modal'

    });
}