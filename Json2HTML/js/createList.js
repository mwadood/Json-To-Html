function list() {
    var args = arguments[0][0];


    var data = false;
    var appendTo = false;
    var text = false;

    if (args.Data !== undefined) {
        data = args.Data;
    }
    if (args.AppendTo !== undefined) {
        appendTo = args.AppendTo;
    }
    if (args.Text !== undefined) {
        text = args.Text;
    }

    var li = '';

    if (data !== undefined || data.length !== 0) {
        //IF OBJECT
        if (data.length > 0) {

            $.each(data, function(i, v) {

                var count = 0;
                var liText = '';
                $.each(data[i], function(ii, vv) {

                    if (ii === text) {
                        liText = vv;
                    }

                    count = count + 1;

                    if (Object.keys(data[0]).length == count) {

                        li += '<li>' + liText + '</li>';

                    }
                });
            });
            $(appendTo).empty();
            $(appendTo).append(li);
        }
        // IF ARRAY
        else {
            var count = 0;
            var liText = '';
            $.each(data, function(ii, vv) {

                if (ii === text) {
                    liText = vv;
                }

                count = count + 1;

                if (Object.keys(data).length == count) {

                    li += '<option>' + liText + '</option>';
                }
            });
            $(appendTo).empty();
            $(appendTo).append(li);
        }

    } else {
        alert('data is reqiured');
    }

}