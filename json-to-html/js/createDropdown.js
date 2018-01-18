function dropdown() {
    var args = arguments[0][0];


    var data = false;
    var appendTo = false;
    var value = false;
    var text = false;

    if (args.Data !== undefined) {
        data = args.Data;
    }
    if (args.AppendTo !== undefined) {
        appendTo = args.AppendTo;
    }
    if (args.Value !== undefined) {
        value = args.Value;
    }
    if (args.Text !== undefined) {
        text = args.Text;
    }

    var ddl = '';

    if (data !== undefined || data.length !== 0) {
        //IF OBJECT
        if (data.length > 0) {

            $.each(data, function(i, v) {

                var count = 0;
                var ddlID = '';
                var ddlValue = '';
                $.each(data[i], function(ii, vv) {

                    if (value !== undefined && ii === value) {
                        ddlValue = vv;
                    }

                    if (ii === text) {
                        ddlText = vv;
                    }

                    count = count + 1;

                    if (Object.keys(data[0]).length == count) {

                        if (value !== false) {
                            ddl += '<option value="' + ddlValue + '">' + ddlText + '</option>';
                        } else {
                            ddl += '<option>' + ddlText + '</option>';
                        }



                    }
                });
            });

            $('#' + appendTo).append(ddl);
        }
        // IF ARRAY
        else {
            var count = 0;
            var ddlID = '';
            var ddlValue = '';
            $.each(data, function(ii, vv) {

                if (value !== undefined && ii === value) {
                    ddlValue = vv;
                }

                if (ii === text) {
                    ddlText = vv;
                }

                count = count + 1;

                if (Object.keys(data).length == count) {

                    if (value !== false) {
                        ddl += '<option value="' + ddlValue + '">' + ddlText + '</option>';
                    } else {
                        ddl += '<option>' + ddlText + '</option>';
                    }
                }
            });

            $('#' + appendTo).append(ddl);
        }

    } else {
        alert('data is reqiured');
    }

}