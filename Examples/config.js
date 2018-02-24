$(document).ready(function() {

    //----------- ******* BIND EVENTS ***** --------------------
    $('header').empty();
    $('header').load('/Examples/header.html');

    $('footer').empty();
    $('footer').load('/Examples/footer.html', function() {

        $('#txtFooter').html('&copy; ' + new Date().getFullYear() + ' - NRJ Boutique');

    });
    //loadPage('index.html');

    //$('#divModals').empty();
    //$('#divModals').load('/html/modals.html');

});

function addHistory(path) {
    history.pushState(path, null, null);
}

window.addEventListener('popstate', function(e) {

    var location = e.state;

    if (location !== null) {

        $('main').empty();
        $('main').load(location, function() {});

    } else {

        window.history.back();
    }
});

function loadPage(pageName, callback) {

    $('main').empty();

    addHistory(pageName);

    $('main').load(pageName, function() {

        if (callback !== undefined) {
            callback();
        }

    });
}