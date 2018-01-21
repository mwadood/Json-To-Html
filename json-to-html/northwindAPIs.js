var domain = '';
if (window.location.hostname == 'localhost') {
    domain = 'http://localhost:25580/api/Northwind';
} else {
    domain = 'http://api-wahidtechnology-tst.azurewebsites.net/api/Northwind';
}

//GET CUSTOMERS 
function GetCustomers(callback) {

    var URL = domain + '/Product/GetProductQuantity';
    httpGet(URL, null, function(data) {

        callback(data);

    });
}





// ******** jQuery CRUDF FUNCTIONS *************
//GET DATA (HTTP GET Verb)
function httpGet(url, params, callback) {

    $.ajax({
        type: "GET",
        url: url,
        headers: params,
        xhrFields: {
            withCredentials: false
        }
    }).done(function(data) {

        callback(null, data);

    }).fail(function(xhr, textStatus, errorThrown) {
        callback('error', xhr.responseText);
    });

}

//POST DATA (HTTP POST Verb)
function httpPost(url, params, data, callback) {

    $.ajax({
        type: 'POST',
        url: url,
        data: data,
        headers: params,
        data: data,
        processData: false,
        contentType: false,
        xhrFields: {
            withCredentials: false
        }
    }).done(function(result) {

        callback(null, result);

    }).fail(function(xhr, textStatus, errorThrown) {
        callback('error', xhr.responseText);
    });
}