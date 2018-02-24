// //****************************************************************************
// //**************************** TOGGLE SWITCH *********************************
// //****************************************************************************

function switchButton() {

    var args = arguments[0][0];

    var error = '';

    var Id = false;
    var texton = false;
    var textoff = false;

    var onColor = false;
    var onbgcolor = false;

    var offColor = false;
    var offbgcolor = false;

    var size = 'md';

    var checked = false;
    var direction = false;


    if (args.Texton !== undefined) {
        texton = args.Texton;
    }
    if (args.Textoff !== undefined) {
        textoff = args.Textoff;
    }

    if (args.Size !== undefined) {
        size = args.Size;
    }


    if (args.CheckedColor !== undefined) {
        checkedColor = args.CheckedColor;
    }
    if (args.UncheckedColor !== undefined) {
        uncheckedColor = args.UncheckedColor;
    }

    if (args.Checked !== undefined) {
        checked = args.Checked;
    }

    if (args.Direction !== undefined) {
        direction = args.Direction;
    }

    //FOR TOGGLE SWITCH FROM JASON
    var data = false;
    var appendTo = false;
    var text = false;


    if (args.ID !== undefined) {
        Id = args.ID;
    }

    if (args.Data !== undefined) {
        data = args.Data;
    }
    if (args.AppendTo !== undefined) {
        appendTo = args.AppendTo;
    }

    if (args.Text !== undefined) {
        text = args.Text;
    }

    //TOGGLE SWITCH FROM JSON
    var chk = '';

    if (data === undefined) {
        error += 'Data is required\n';
    }
    if (appendTo === false) {
        error += 'Append to is required\n';
    }
    if (text === false) {
        error += 'Text to is required\n';
    }
    if (error === '') {

        $.each(data, function(i, v) {

            $.each(data[i], function(ii, vv) {

                if (ii.toLowerCase() === args.Text.toLowerCase()) {

                    var chkId = 'chk' + vv;
                    chk += '<input type="checkbox" id="' + chkId + '" /><label for="' + chkId + '" class="switch switch-' + size + '"';

                    if (texton !== false) {
                        chk += ' texton="' + texton + '"';
                    }
                    if (textoff !== false) {
                        chk += ' textoff="' + textoff + '"';
                    }
                    if (onbgcolor !== false) {
                        chk += ' onbgcolor="' + onbgcolor + '"';
                    }
                    if (offbgcolor !== false) {
                        chk += ' offbgcolor="' + offbgcolor + '"';
                    }
                    if (onColor !== false) {
                        chk += ' oncolor="' + onColor + '"';
                    }
                    if (offColor !== false) {
                        chk += ' offcolor="' + offColor + '"';
                    }

                    if (direction !== false) {
                        chk += '></label><br/>';
                    } else {
                        chk += '></label>';
                    }
                }
            });

        });

        $('#' + args.AppendTo).html(chk);
        toggleSwitch();

    } else {
        alert(error);
    }

}

//ON DOCUMENTS READY
$(function() {

    toggleSwitch();
});


$(document).on('click', '.switch', function() {

    var chkId = $(this);

    if ($(this).prev().is(':Checked')) {

        switchOff(chkId);

    } else {

        switchOn(chkId);

    }

});

//TOGGLE SWITCH
function toggleSwitch(toggle) {

    $('.switch').each(function() {

        var chkId = $(this);
        var text = '';
        var width = '';

        $(this).prev().hide();

        if ($(this).prev().is(':Checked')) {

            switchOn(chkId);

        } else {

            switchOff(chkId);
        }
    });
}

//SET SWITCH ON
function switchOn(chkId) {


    var onBGColor = 'blue';
    var onColor = 'yellow';

    if ($(chkId).attr('onbgcolor') !== undefined) {
        onBGColor = $(chkId).attr('onbgcolor');
        $(chkId).css('background-color', onBGColor);
    } else {
        $(chkId).css('background-color', onBGColor);
    }

    if ($(chkId).attr('oncolor') !== undefined) {
        onColor = $(chkId).attr('oncolor');
        $(chkId).css('color', onColor);
    } else {
        $(chkId).css('color', onColor);
    }
    //ADJUST WIDTH ACCORDING TO THE TEXT
    if ($(chkId).attr('texton') !== undefined) {
        text = (($(chkId).attr('texton').length) / 16);
        width = text + 3.5 + 1.75 + 'em';
        $(chkId).css('width', width);
    }

    $(chkId).prev().attr('checked', true);



}

//SET SWITCH OFF
function switchOff(chkId) {


    var offBGColor = 'gray';
    var offColor = 'black';


    if ($(chkId).attr('offbgcolor') !== undefined) {
        offBGColor = $(chkId).attr('offbgcolor');
        $(chkId).css('background-color', offBGColor);
    } else {
        $(chkId).css('background-color', offBGColor);
    }

    if ($(chkId).attr('offcolor') !== undefined) {
        offColor = $(chkId).attr('offcolor');
        $(chkId).css('color', offColor);
    } else {
        $(chkId).css('color', offColor);
    }

    //ADJUST WIDTH ACCORDING TO THE TEXT
    if ($(chkId).attr('textoff') !== undefined) {
        text = (($(chkId).attr('textoff').length) / 16);
        width = text + 3.5 + 1.75 + 'em';
        $(chkId).css('width', width);
    }

    $(chkId).prev().attr('checked', false);

}