//**************************************************
//**************** CREATE LIST *********************
//**************************************************

/*
               BY USING LIST FUNCTION CREATE THE LIST
               Where TEXT is the column name in the JSON object
               in the following example: list of 'CITY' form the 
               JSON object 
               
               Add the unorder list to HTML
                    <ul id="unorderList"></ul>
    
            */
x.List({

    Data: myObject,
    AppendTo: 'unorderList',
    Text: 'City'

});