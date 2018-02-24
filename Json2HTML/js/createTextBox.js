function textBox() {
    var args = arguments[0][0];


    var data = false;
    var appendTo = false;
    var propertyName = false;
    var direction = 'vertical';

    var error = '';

    if (args.Data !== undefined) {
        data = args.Data;
    } else {
        error += 'Data requred\n';
    }
    if (args.PropertyName) {
        propertyName = args.PropertyName;
    } else {
        error += 'Property name required\n';
    }


    if (error === '') {
        var txt = '';
        $.each(data, function(i, v) {

            $.each(v, function(ii, vv) {

                if (ii === propertyName) {

                    var id = 'txt' + ii;
                    var val = vv;

                    if (direction.toLowerCase() === 'horizontal') {
                        //txt += '<in';
                    } else {
                        txt += '<div class="row">' +
                            '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
                            '<input class="form-control" id="' + id + '" value="' + val + '"/>' +
                            '</div' > +
                            '</div>';
                    }
                }
            });

        });

        if (appendTo !== false) {
            $(appendTo).empty();
            $(appendTo).appendTo(txt);
        } else {
            $('#j2HTMLTextBox').remove();
            var div = '<div id="j2HTMLTextBox">' + txt + '</div>';
            $('body').append(div);
        }


    } else {
        alert(error);
    }

}