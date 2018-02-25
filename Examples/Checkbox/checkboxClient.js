/* 
 ***************************************************************************** 
 ************************************* CHECKBOX ******************************
 ***************************************************************************** 
 */

/*
                REQUIRED    
                    Data: JSON OBJECT
                    AppendTo: CONTROL NAME
                    Text: NAME OF THE COLUM
                OPTIONAL
                    Value: NAME OF THE COLUMN
                    GroupName: Name of the radio b utton list
                    Direction: 'Vertical'
                                By Default is horizontal   
    
               1. Create DIV TAG in HTML
               
                    <div id="divCheckbox"></div>
                    
                In the following Example Text:'CITY' will get all the Cities from the 
                JSON object and bind to Radio button    
*/



function verticalCheckbox() {

    GetCustomers(function(myObject) {

        j2HTML.Checkbox({

            Data: myObject,
            AppendTo: 'divCheckbox',
            Text: 'City',
            Direction: 'Vertical'

        });


    });
}





// $(function() {

//     GetCustomers(function(myObject) {

//         j2HTML.Checkbox({

//             Data: myObject,
//             AppendTo: 'divCheckbox',
//             Text: 'City',
//             Direction: 'Vertical'

//         });


//     });

// });


// x.Checkbox({

//     Data: myObject,
//     AppendTo: 'divCheckbox',
//     Text: 'City',
//     Direction: 'Vertical'

// });