function createTableForInsert() {

    var args = arguments[0][0];

    var modalData = false;
    var appendTo = false;

    var error = '';

    if (args.Data !== undefined) {
        modalData = args.Data;
    } else {
        error += 'Data is required.';
    }
    if (args.AppendTo !== undefined) {
        appendTo = args.AppendTo;
    } else {
        error += 'Append to is required.';
    }


    if (error !== '') {
        alert(error);
    } else {

        $.each(modalData, function(i, v) {

            ntb = '<table>';

            $.each(v, function(ii, vv) {

                var id = 'txt' + ii + '"';

                if (v.hasOwnProperty('Visible') === true && v.Visible === true && ii.toLowerCase() !== 'visible') {

                    ntb += '<tr>';
                    ntb += '<td><b>' + ii + ': </b>' + '</td>';
                    ntb += '<td><input id="' + id + ' type="text" class="form-control ' + id + '" value="' + vv + '"></td>';
                    ntb += '</tr>';
                }
                if (v.hasOwnProperty('Visible') === false) {

                    ntb += '<tr>';
                    ntb += '<td><b>' + ii + ': </b>' + '</td>';
                    ntb += '<td><input class="' + id + ' type="text" class="form-control ' + id + '" value="' + vv + '"></td>';
                    ntb += '</tr>';
                }


            });

            ntb += '</table><hr>';


        });
    }

    return ntb;
}