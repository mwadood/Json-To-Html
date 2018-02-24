var j2HTML;
var scripts = [
    '/Json2HTML/js/common.js',
    '/Json2HTML/js/createCheckbox.js',
    '/Json2HTML/js/createDropdown.js',
    '/Json2HTML/js/createList.js',
    '/Json2HTML/js/createRadioButton.js',
    '/Json2HTML/js/createTable.js',
    '/Json2HTML/js/createPagination.js',
    '/Json2HTML/js/createModal.js',
    '/Json2HTML/js/createPopupModal.js',
    '/Json2HTML/js/createTextBox.js'
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

    var PopupMessage = function() {
        args = arguments;
        popupMessage(args);
        return this;
    };

    var ShowPopup = function() {
        args = arguments;
        showPopup(args);
        return this;
    };

    var HidePopup = function() {
        args = arguments;
        hidePopup(args);
        return this;
    };

    var TextBox = function() {
        args = arguments;
        textBox(args);
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
        HideModal: HideModal,
        PopupMessage: PopupMessage,
        ShowPopup: ShowPopup,
        HidePopup: HidePopup,
        TextBox: TextBox

    };
};