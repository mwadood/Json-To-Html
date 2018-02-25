function radio() {
    var args = arguments[0][0];


    var data = false;
    var groupName = false;
    var value = false;
    var text = false;
    var direction = 'Horizontal';
    var appendTo = false;
    var error = '';


    if (args.Data !== undefined) {
        data = args.Data;
    }
    if (args.GroupName !== undefined) {
        groupName = args.GroupName;
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
    if (args.Direction !== undefined) {
        direction = args.Direction;
    }
    if (args.AppendTo !== undefined) {
        appendTo = args.AppendTo;
    }


    if (data === false) {
        error += 'Data is required \n';
    }
    if (appendTo === false) {
        error += 'Control ID is required to append radion button(AppendTo) \n';
    }
    var rdb = '';

    if (error === '') {
        //IF OBJECT
        if (data.length > 0) {

            $.each(data, function(i, v) {

                var count = 0;
                var rdbValue = '';
                var rdbText = '';
                $.each(data[i], function(ii, vv) {

                    if (value !== undefined && ii === value) {
                        rdbValue = vv;
                    }

                    if (ii === text) {
                        rdbText = vv;
                    }

                    count = count + 1;

                    if (Object.keys(data[0]).length == count) {

                        //VERTICAL WITH VALUE
                        if (value !== false && direction !== 'Horizontal') {

                            rdb += '<label style="display:block"><input type="radio" name="' + groupName + '" value="' + rdbValue + '">' + rdbText + '</label>';
                        }
                        //HORIZONTAL WITH VALUE
                        if (value !== false && direction === 'Horizontal') {
                            rdb += '<label style="margin-left:10px;"><input type="radio" name="' + groupName + '" value="' + rdbValue + '">' + rdbText + '</label>';
                        }
                        //VERTICAL WITH NO VALUE
                        if (value === false && direction !== 'Horizontal') {

                            rdb += '<label style="display:block"><input type="radio" name="' + groupName + '">' + rdbText + '</label>';
                        }
                        //HORIZONTAL WITH NO VALUE
                        if (value === false && direction === 'Horizontal') {
                            rdb += '<label style="margin-left:10px;"><input type="radio" name="' + groupName + '">' + rdbText + '</label>';
                        }



                    }
                });
            });

            $(appendTo).empty();
            $(appendTo).append(rdb);
        }
        // IF ARRAY
        else {
            var count = 0;
            var rdbValue = '';
            var rdbText = '';
            $.each(data, function(ii, vv) {

                if (value !== undefined && ii === value) {
                    rdbValue = vv;
                }

                if (ii === text) {
                    rdbText = vv;
                }

                count = count + 1;

                if (Object.keys(data).length == count) {

                    //VERTICAL WITH VALUE
                    if (value !== false && direction !== 'Horizontal') {

                        rdb += '<label style="display:block"><input type="radio" name="' + groupName + '" value="' + rdbValue + '">' + rdbText + '</label>';
                    }
                    //HORIZONTAL WITH VALUE
                    if (value !== false && direction === 'Horizontal') {
                        rdb += '<label style="margin-left:10px;"><input type="radio" name="' + groupName + '" value="' + rdbValue + '">' + rdbText + '</label>';
                    }
                    //VERTICAL WITH NO VALUE
                    if (value === false && direction !== 'Horizontal') {

                        rdb += '<label style="display:block"><input type="radio" name="' + groupName + '">' + rdbText + '</label>';
                    }
                    //HORIZONTAL WITH NO VALUE
                    if (value === false && direction === 'Horizontal') {
                        rdb += '<label style="margin-left:10px;"><input type="radio" name="' + groupName + '">' + rdbText + '</label>';
                    }
                }
            });

            $(appendTo).empty();
            $(appendTo).append(rdb);
        }

    } else {
        alert(error);
    }

}