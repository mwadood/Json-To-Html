function loadTabsContent(id, instrution, js, css, html) {

    $('#' + id).load('/Examples/codeTemplateTabs.html', function() {

        $('#divInstructions').empty();
        $('#divInstructions').html(instrution);

        $('#codeJavascript').empty();
        $('#codeJavascript').html(js);

    });
}