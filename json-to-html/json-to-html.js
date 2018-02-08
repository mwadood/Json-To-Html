var j2HTML;
var scripts = [
    '/json-to-html/js/common.js',
    '/json-to-html/js/createCheckbox.js',
    '/json-to-html/js/createDropdown.js',
    '/json-to-html/js/createList.js',
    '/json-to-html/js/createRadioButton.js',
    '/json-to-html/js/createTable.js',
    '/json-to-html/js/createPagination.js'
];

var queue = scripts.map(function(script) {
    return $.getScript(script);
});

$.when.apply(null, queue).done(function() {

    j2HTML = new jsonToHtml();
});

var jsonToHtml = function() {

    var args = null;

    var Table = function() {

        args = arguments;
        table(args);
        return this;
    };
    var HeadingStyle = function() {
        args = arguments;
        headingStyle(args);
        return this;
    };

    var TableStyle = function() {
        args = arguments;
        tableStyle(args);
        return this;
    };
    var Paging = function() {

        args = arguments;
        paging(args);
        return this;
    };

    var Search = function() {

        args = arguments;
        search(args);
        return this;

    };

    var Print = function() {
        args = arguments;
        print(args);
        return this;
    };

    var Dropdown = function() {

        args = arguments;
        dropdown(args);
        return this;

    };
    var Radio = function() {
        args = arguments;
        radio(args);
        return this;
    };

    var Checkbox = function() {
        args = arguments;
        checkbox(args);
        return this;
    };

    var List = function() {
        args = arguments;
        list(args);
        return this;
    };

    var Filter = function() {

        args = arguments;
        var controlName = args[0];
        var liName = args[1];
        var Val = args[2];

        filter(controlName, liName, Val);
        return this;
    };

    var Switch = function() {

        args = arguments;
        switchButton(args);
        return this;
    };

    return {
        Table: Table,
        HeadingStyle: HeadingStyle,
        TableStyle: TableStyle,
        Paging: Paging,
        Search: Search,
        Print: Print,
        Dropdown: Dropdown,
        Radio: Radio,
        Checkbox: Checkbox,
        List: List,
        Filter: Filter,
        Switch: Switch
    };
};


// include('/json-to-html/js/common.js');
// include('/json-to-html/js/table.js');
// include('/json-to-html/js/dropdown.js');
// include('/json-to-html/js/radioButton.js');
// include('/json-to-html/js/checkbox.js');
// include('/json-to-html/js/unorderlist.js');


// function include(file) {

//     var script = document.createElement('script');
//     script.src = file;
//     script.type = 'text/javascript';
//     script.defer = true;
//     script.async = true;

//     //document.getElementsByTagName('head').item(0).appendChild(script);
//     var newChild = script;
//     var referenceChild = $("script[src='/json-to-html/json-to-html.js']")[0];
//     document.getElementsByTagName('head').item(0).insertBefore(newChild, referenceChild);
// }