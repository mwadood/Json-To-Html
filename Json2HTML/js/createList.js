function list() {
    var args = arguments[0][0];


    var data = false;
    var appendTo = false;
    var text = false;
    var error = '';

    if (args.Data !== undefined) {
        data = args.Data;
    } else {
        error += 'Data requires\n';
    }
    if (args.AppendTo !== undefined) {
        appendTo = args.AppendTo;
    }
    if (args.Text !== undefined) {
        text = args.Text;
        text = args.Text;

        if (data !== false) {
            if (data[0].hasOwnProperty(text) === false) {
                error += 'Text "' + text + '" not found\n';
            }
        }
    } else {
        error += 'Text is required';
    }

    var li = '';

    if (error === '') {
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

    } else {
        alert(error);
    }

}