function placeholderAnimation() {

    var elementID = false;
    var error = '';
    var args = arguments[0][0];

    if (args.ElementID === undefined) {
        error += 'Element Id is required';
    } else {

        elementID = args.ElementID;

    }
    if (error === '') {
        animation(elementID);
    }
}

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}


function animation(elementID) {

    var placeholder = '';
    var label = '';

    $(elementID).each((i, v) => {

        label = $('label[for="' + $(v).attr('id') + '"]');

        if ($(v).attr('id') === undefined) {
            $(v).attr('id', makeid());
        }
        if ($(v).attr('placeholder') !== undefined) {
            placeholder = $(v).attr('placeholder');
            $(v).attr('placeholder', '');
            $(v).parent().prepend('<label for=' + $(v).attr('id') + '>' + placeholder + '</label>');
        } else {

            if ($(v).attr('for') === undefined) {
                $(v).attr('for', $(v).attr('id'));
            }
        }

        if ($(v).val() === '') {
            label.removeClass('active');
        }
        label.removeClass('focusIn');


        $(document).on('focusin', v, function() {
            label.addClass('active focusIn');
        });

        $(document).on('focusout', v, function() {

            if ($(v).val() === '') {
                label.removeClass('active');
            }
            label.removeClass('focusIn');
        });
    });
}