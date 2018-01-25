function checkbox() {
    var args = arguments[0][0];


    var data = false;
    var groupName = 'chkGroupName';
    var value = false;
    var text = false;
    var direction = 'Horizontal';
    var appendTo = false;

    if (args.Data !== undefined) {
        data = args.Data;
    }
    if (args.GroupName !== undefined) {
        groupName = args.GroupName;
    }
    if (args.Value !== undefined) {
        value = args.Value;
    }
    if (args.Text !== undefined) {
        text = args.Text;
    }
    if (args.Direction !== undefined) {
        direction = args.Direction;
    }
    if (args.AppendTo !== undefined) {
        appendTo = args.AppendTo;
    }

    var error = '';
    if (data === false) {
        error += 'Data is required \n';
    }
    if (appendTo === false) {
        error += 'Control ID is required to append radion button(AppendTo) \n';
    }
    if (text === false) {
        error += 'Text for radio button is required';
    }


    var chk = '';

    if (error === '') {
        //IF OBJECT
        if (data.length > 0) {

            $.each(data, function(i, v) {

                var count = 0;
                var chkValue = '';
                var chkText = '';
                $.each(data[i], function(ii, vv) {

                    if (value !== undefined && ii === value) {
                        chkValue = vv;
                    }

                    if (ii === text) {
                        chkText = vv;
                    }

                    count = count + 1;

                    if (Object.keys(data[0]).length == count) {

                        //VERTICAL WITH VALUE
                        if (value !== false && direction !== 'Horizontal') {

                            chk += '<label style="display:block"><input type="checkbox" name="' + groupName + '" value="' + chkValue + '">' + chkText + '</label>';
                        }
                        //HORIZONTAL WITH VALUE
                        if (value !== false && direction === 'Horizontal') {
                            chk += '<label style="margin-left:10px;"><input type="checkbox" name="' + groupName + '" value="' + chkValue + '">' + chkText + '</label>';
                        }
                        //VERTICAL WITH NO VALUE
                        if (value === false && direction !== 'Horizontal') {

                            chk += '<label style="display:block"><input type="checkbox" name="' + groupName + '">' + chkText + '</label>';
                        }
                        //HORIZONTAL WITH NO VALUE
                        if (value === false && direction === 'Horizontal') {
                            chk += '<label style="margin-left:10px;"><input type="checkbox" name="' + groupName + '">' + chkText + '</label>';
                        }



                    }
                });
            });

            $('#' + appendTo).empty();
            $('#' + appendTo).append(chk);
        }
        // IF ARRAY
        else {
            var count = 0;
            var chkValue = '';
            var chkText = '';
            $.each(data, function(ii, vv) {

                if (value !== undefined && ii === value) {
                    chkValue = vv;
                }

                if (ii === text) {
                    chkText = vv;
                }

                count = count + 1;

                if (Object.keys(data).length == count) {

                    //VERTICAL WITH VALUE
                    if (value !== false && direction !== 'Horizontal') {

                        chk += '<label style="display:block"><input type="checkbox" name="' + groupName + '" value="' + chkValue + '">' + chkText + '</label>';
                    }
                    //HORIZONTAL WITH VALUE
                    if (value !== false && direction === 'Horizontal') {
                        chk += '<label style="margin-left:10px;"><input type="checkbox" name="' + groupName + '" value="' + chkValue + '">' + chkText + '</label>';
                    }
                    //VERTICAL WITH NO VALUE
                    if (value === false && direction !== 'Horizontal') {

                        chk += '<label style="display:block"><input type="checkbox" name="' + groupName + '">' + chkText + '</label>';
                    }
                    //HORIZONTAL WITH NO VALUE
                    if (value === false && direction === 'Horizontal') {
                        chk += '<label style="margin-left:10px;"><input type="checkbox" name="' + groupName + '">' + chkText + '</label>';
                    }
                }
            });

            $('#' + appendTo).empty();
            $('#' + appendTo).append(chk);
        }

    } else {
        alert(error);
    }

}