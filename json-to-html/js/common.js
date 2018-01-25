// //****************************************************************************
// //*********************************** SORT ***********************************
// //****************************************************************************
function sort(id, sel, sortvalue) {

    var a, b, i, ii, y, bytt, v1, v2, cc, j;

    if (typeof id == "object") {
        a = [id];
    } else {
        a = document.querySelectorAll(id);
    }
    for (i = 0; i < a.length; i++) {
        for (j = 0; j < 2; j++) {
            cc = 0;
            y = 1;
            while (y == 1) {
                y = 0;
                b = a[i].querySelectorAll(sel);
                for (ii = 0; ii < (b.length - 1); ii++) {
                    bytt = 0;
                    if (sortvalue) {
                        v1 = b[ii].querySelector(sortvalue).innerHTML.toLowerCase();
                        v2 = b[ii + 1].querySelector(sortvalue).innerHTML.toLowerCase();
                    } else {
                        v1 = b[ii].innerHTML.toLowerCase();
                        v2 = b[ii + 1].innerHTML.toLowerCase();
                    }
                    if ((j === 0 && (v1 > v2)) || (j == 1 && (v1 < v2))) {
                        bytt = 1;
                        break;
                    }
                }
                if (bytt == 1) {
                    b[ii].parentNode.insertBefore(b[ii + 1], b[ii]);
                    y = 1;
                    cc++;
                }
            }
            if (cc > 0) { break; }
        }
    }
}

// //****************************************************************************
// //********************* FILTER *******************************
// //****************************************************************************
function filter(id, sel, filter) {
    var a, b, c, i, ii, iii, hit;
    a = getElements(id);
    for (i = 0; i < a.length; i++) {
        b = getElements(sel);
        for (ii = 0; ii < b.length; ii++) {
            hit = 0;
            if (b[ii].innerHTML.toUpperCase().indexOf(filter.toUpperCase()) > -1) {
                hit = 1;
            }
            c = b[ii].getElementsByTagName("*");
            for (iii = 0; iii < c.length; iii++) {
                if (c[iii].innerHTML.toUpperCase().indexOf(filter.toUpperCase()) > -1) {
                    hit = 1;
                }
            }
            if (hit == 1) {
                b[ii].style.display = "";
            } else {
                b[ii].style.display = "none";
            }
        }
    }
}


//GET ELEMENT
function getElements(id) {
    if (typeof id == "object") {
        return [id];
    } else {
        return document.querySelectorAll(id);
    }
}

//CONVERT TO CAMEL CASE
function toTitleCase(str) {
    return str.replace(/(?:^|\s)\w/g, function(match) {
        return match.toUpperCase();
    });
}

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


function getSelected() {

    var args = arguments[0][0];

    var groupName = 'chkGroupName';
    var type = false;
    var get = false;
    var error = '';

    if (args.GroupName === undefined) {
        error += 'Group name is required\n';
    } else {
        groupName = args.GroupName;
    }
    if (args.Type === undefined) {
        error += 'Type is required\n';
    } else {
        elementType = args.Type;
    }
    if (args.Get === undefined) {
        error += 'Get is required';
    } else {
        get = args.Get;
    }

    if (error === '') {

        var selectedVal = '';


        //GET CHECKBOX VALUE OT TEXT
        if (type.toLowerCase() === 'checkbox') {

            var selected = [];
            //GET THE VALUE
            if (get.toLowerCase() === 'value') {


                $('input[name=' + groupName + ']').each(function() {
                    if ($(this).is(":checked")) {
                        selected.push($(this).val());
                    }
                });

            }
            //GET THE TEXT
            if (get.toLowerCase() === 'text') {

                $('input[name=' + groupName + ']').each(function() {
                    if ($(this).is(":checked")) {
                        selected.push($(this).parent().text());
                    }
                });
            }

            return selectedVal;
        }
    } else {
        alert(error);
    }


}