function dropdown() {
    var args = arguments[0][0];


    var data = false;
    var appendTo = false;
    var value = false;
    var text = false;

    var error = '';

    if (args.Data !== undefined) {
        data = args.Data;
    } else {
        error += 'Data is required';
    }
    if (args.AppendTo !== undefined) {
        appendTo = args.AppendTo;
    }
    if (args.Value !== undefined) {
        value = args.Value;

        if (data !== false) {
            if (data[0].hasOwnProperty(value) === false) {
                error += 'Value "' + value + '" not found\n';
            }
        }
    }
    if (args.Text !== undefined) {

        text = args.Text;

        if (data !== false) {
            if (data[0].hasOwnProperty(text) === false) {
                error += 'Text "' + text + '" not found\n';
            }
        }
    } else {
        error += 'Text is required';
    }

    var ddl = '';

    if (error === '') {

        //IF OBJECT
        //if (data.length > 0) {

        $.each(data, function(i, v) {

            var count = 0;
            var ddlID = '';
            var ddlValue = '';
            $.each(data[i], function(ii, vv) {

                if (value !== undefined && ii === value) {
                    ddlValue = vv;
                }
                // else {
                //     error += value + 'not found';
                // }

                if (ii === text) {
                    ddlText = vv;
                }
                // else {
                //     error += text + 'not found';
                // }

                //if (error === '') {

                count = count + 1;

                if (Object.keys(data[0]).length == count) {

                    if (value !== false) {
                        ddl += '<option value="' + ddlValue + '">' + ddlText + '</option>';
                    } else {
                        ddl += '<option>' + ddlText + '</option>';
                    }
                }
                // } else {
                //     alert(error);
                //     return false;
                // }
            });
        });

        $(appendTo).append(ddl);

        // if (error === '') {
        //     $(appendTo).append(ddl);
        // } else {
        //     return false;
        // }

        //}
        // IF ARRAY
        // else {
        //     var count = 0;
        //     var ddlID = '';
        //     var ddlValue = '';
        //     $.each(data, function(ii, vv) {

        //         if (value !== undefined && ii === value) {
        //             ddlValue = vv;
        //         }

        //         if (ii === text) {
        //             ddlText = vv;
        //         }

        //         count = count + 1;

        //         if (Object.keys(data).length == count) {

        //             if (value !== false) {
        //                 ddl += '<option value="' + ddlValue + '">' + ddlText + '</option>';
        //             } else {
        //                 ddl += '<option>' + ddlText + '</option>';
        //             }
        //         }
        //     });

        //     $(appendTo).append(ddl);
        // }

    } else {
        alert(error);
    }

}