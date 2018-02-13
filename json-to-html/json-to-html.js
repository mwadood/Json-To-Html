var j2HTML;
var scripts = [
    '/JsonToHtml/json-to-html/js/common.js',
    '/JsonToHtml/json-to-html/js/createCheckbox.js',
    '/JsonToHtml/json-to-html/js/createDropdown.js',
    '/JsonToHtml/json-to-html/js/createList.js',
    '/JsonToHtml/json-to-html/js/createRadioButton.js',
    // '/JsonToHtml/json-to-html/js/createTable.js',
    '/JsonToHtml/json-to-html/js/createPagination.js',
    // '/JsonToHtml/json-to-html/js/createModal.js'
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
    var Modal = function() {
        args = arguments;
        modal(args);
        return this;
    };

    var ShowModal = function() {
        args = arguments;
        showModal(args);
        return this;
    };

    var HideModal = function() {
        args = arguments;
        hideModal(args);
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
        Switch: Switch,
        Modal: Modal,
        ShowModal: ShowModal,
        HideModal: HideModal
    };
};