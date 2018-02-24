// //****************************************************************************
// //*********************************** SORT ***********************************
// //****************************************************************************
function j2HTMLSort(id, sel, sortvalue) {

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
function j2HTMLFilter(id, sel, filter) {
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



function getSelected() {

    var args = arguments[0];

    var groupName = 'chkGroupName';
    var elementType = false;
    var getSelected = false;
    var error = '';

    if (args.GroupName === undefined && (args.ElementType.toLowerCase() === "checkbox" || args.ElementType.toLowerCase() === "radiobutton")) {
        error += 'Group name is required\n';
    } else {

        if (args.GroupName !== undefined) {
            if ($('input[name=' + args.GroupName + ']').length === 0) {
                error += 'GroupName not found\n';
            } else {
                groupName = args.GroupName;
            }
        }
    }

    if (args.ElementType === undefined) {
        error += 'Type is required\n';
    } else {


        if (args.ElementType.toLowerCase() != "checkbox" && args.ElementType.toLowerCase() != "radiobutton" && args.ElementType.toLowerCase() != "dropdown") {
            error += "ElementType must be Checkbox or Radiobutoon or Dropdown\n";
        } else {
            elementType = args.ElementType;
        }


    }
    if (args.GetSelected === undefined) {
        error += 'Get is required';
    } else {

        if (args.GetSelected.toLowerCase() != "text" && args.GetSelected.toLowerCase() != "value" && args.GetSelected.toLowerCase() != "both") {
            error += "GetSelected must be Text or Value or Both\n";
        } else {
            getSelected = args.GetSelected;
        }


    }

    if (error === '') {

        var selectedVal;
        if (elementType.toLowerCase() === 'checkbox' || elementType.toLowerCase() === 'radiobutton') {

            selectedVal = GetSelectedCheckBoxOrRadioButton(groupName, elementType, getSelected);
        }

        return selectedVal;

    } else {
        alert(error);
    }


}


//GET CHECKBOX VAULE and/or TEXT
function GetSelectedCheckBoxOrRadioButton(groupName, elementType, get) {

    var selectedResult = [];
    //GET THE VALUE
    if (get.toLowerCase() === 'value') {


        $('input[name=' + groupName + ']').each(function() {
            if ($(this).is(":checked")) {

                var objSelectedValue = {};
                objSelectedValue.Value = $(this).val();
                //objSelectedResult.Value = $(this).val();
                selectedResult.push(objSelectedValue);
            }
        });



    }
    //GET THE TEXT
    if (get.toLowerCase() === 'text') {

        $('input[name=' + groupName + ']').each(function() {
            if ($(this).is(":checked")) {

                //objSelectedResult.Text = $(this).parent().text();
                var objSelectedText = {};
                objSelectedText.Text = $(this).parent().text();
                selectedResult.push(objSelectedText);

            }
        });


    }
    //GET BOTH VALUE AND TEXT
    if (get.toLowerCase() === 'both') {

        $('input[name=' + groupName + ']').each(function() {
            if ($(this).is(":checked")) {

                var objSelectedBoth = {};
                objSelectedBoth.Value = $(this).val();
                objSelectedBoth.Text = $(this).parent().text();
                selectedResult.push(objSelectedBoth);
            }
        });


    }



    return selectedResult;

}