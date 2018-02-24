var domain = '';
if (window.location.hostname == 'localhost' && window.location.port !== '5500') {
    domain = 'http://localhost:25580/api/Northwind';
} else {
    domain = 'http://api-wahidtechnology-tst.azurewebsites.net/api/Northwind';
}

//GET CUSTOMERS 
function GetCustomers(callback) {

    var URL = domain + '/Data/GetCustomers';
    httpGet(URL, null, function(data) {

        callback(data);

    });
}


//GET CATEGORTIES 
function GetCategories(callback) {

    var URL = domain + '/Data/GetCategories';
    httpGet(URL, null, function(data) {

        callback(data);

    });
}

//GET EMPLOYESS 
function GetEmployees(callback) {

    var URL = domain + '/Data/GetEmployees';
    httpGet(URL, null, function(data) {

        callback(data);

    });
}


//GET EMPLOYESS's TERRITORIES 
function GetEmployeesTerritories(callback) {

    var URL = domain + '/Data/GetEmployeesTerritories';
    httpGet(URL, null, function(data) {

        callback(data);

    });
}

//GET PRODUCTS 
function GetProducts(callback) {

    var URL = domain + '/Data/GetProducts';
    httpGet(URL, null, function(data) {

        callback(data);

    });
}


//GET ORDER DETAILS
function GetOrderDetail(callback) {

    var URL = domain + '/Data/GetOrderDetail';
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
        //async: false,
        withCredentials: false
    }).done(function(data) {

        callback(data);

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