# JsonToHtml
Create HTML using json object
# Getting Started 
1. download https://github.com/mwadood/JsonToHtml/tree/master
2. SEE THE DETAIL DOCUMENTS IN DOCUMENT FOLDER
2. Add the following into HTML head tag
    
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" href="/json-to-html/css/json-to-html.css">
    
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <script src="/json-to-html/json-to-html.js"></script>
## Creating Table
#### Parameters

* Data:	         Jason data (required)

* TableID:	       Table  id  if you want to assign specific id  to table	(optional)               
                              
           
* AppendTo:	      HTML Element ID to append table to,           
                by default table will be append to <body>	(optional)
  
* DefaultHeader:	  By default show the default header (optional)

* CustomerHeader:	Set column(s) to display and custom header (optional)

* AddToColumn:	    Append or Prepend value to column	(optional)
* Sort: 	By default it is On(true)	

1. Create div in body `<div id="divTable"></div>`
2. Create JavaScript file myJS.js 
3. For this example will user the following JSON object. Add the following json object to myJS.js created in step 2
* var myObject = [{
        "CustomerName": "Alfreds Futterkiste",
        "City": "Berlin",
        "Country": "Germany"
    },
    {
        "CustomerName": "Ana Trujillo Emparedados y helados",
        "City": "México D.F.",
        "Country": "Mexico"
    },
    {
        "CustomerName": "Antonio Moreno Taquería",
        "City": "México D.F.",
        "Country": "Mexico"
    },
    {
        "CustomerName": "Around the Horn",
        "City": "London",
        "Country": "UK"
    },
    {
        "CustomerName": "B's Beverages",
        "City": "London",
        "Country": "UK"
    },
    {
        "CustomerName": "Berglunds snabbköp",
        "City": "Luleå",
        "Country": "Sweden"
    },
    {
        "CustomerName": "Blauer See Delikatessen",
        "City": "Mannheim",
        "Country": "Germany"
    },
    {
        "CustomerName": "Blondel père et fils",
        "City": "Strasbourg",
        "Country": "France"
    },
    {
        "CustomerName": "Bólido Comidas preparadas",
        "City": "Madrid",
        "Country": "Spain"
    },
    {
        "CustomerName": "Bon app'",
        "City": "Marseille",
        "Country": "France"
    },
    {
        "CustomerName": "Bottom-Dollar Marketse",
        "City": "Tsawassen",
        "Country": "Canada"
    },
    {
        "CustomerName": "Cactus Comidas para llevar",
        "City": "Buenos Aires",
        "Country": "Argentina"
    },
    {
        "CustomerName": "Centro comercial Moctezuma",
        "City": "México D.F.",
        "Country": "Mexico"
    },
    {
        "CustomerName": "Chop-suey Chinese",
        "City": "Bern",
        "Country": "Switzerland"
    },
    {
        "CustomerName": "Comércio Mineiro",
        "City": "São Paulo",
        "Country": "Brazil"
    }
];

    //Create instance of JSON To Html 
      var x = new jsonToHtml();

#### EXAMPLE-1 (BASIC)    
    	x.Table({

    		Data: myObject,
    		AppendTo: 'divTable' //div created in step 1

    	});

#### EXAMPLE-2 (CUSTOMHEADER) 
/*
     1. WILL DISPLAY ONY ONE COLUMN ‘CustomerName’ with ‘Name’ header ---
        
     UN-Comment the following code to for to display one column with custom header name
       
    */

    var customHeader = [
        { 'orginalColumnName': 'CustomerName', 'newColumnName': 'Name' }
    ];
   
    /*
       2. FOLLOWING WILL SHOW ALL COLUMN
       UN-Comment the following code to display all column with custom header name
    */

    var customHeader = [
       { 'orginalColumnName': 'CustomerName', 'newColumnName': 'Name' },
       { 'orginalColumnName': 'City', 'newColumnName': 'Customer City Name' },
       { 'orginalColumnName': 'Country', 'newColumnName': 'Country' }
    ];



