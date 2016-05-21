_shopping();

// item count
var shopping_count = 0;

loader._shopping = {
    data: ["greenEggs", "ham"],
    getData: function () {
        return _shopping;
    },
    loadData: function (data) {
        var arr = [];
        for (var i = 0; i < data.length; i++) {
            toAdd = data[i];
            var newItem = document.createElement('li');
            newItem.innerHTML = toAdd;
            newItem.className = 'item';
            $("#list").append(newItem);

            shopping_count++;
            if (shopping_count == 1) {
                $("#numItems").text("1 item");
            }
            else {
                $("#numItems").text(shopping_count + " data");
            }
            if (shopping_count != 0) {
                $("#footerInfo, #footerBars").show();
            }
            else {
                $("#footerInfo,#footerBars").hide();
            }
        }
    }

};


function _shopping() {

    var _shopping = [];

    $("#footerInfo, #footerBars").hide();

    //press enter
    $('#add-shopping-item').submit(function () {
        if ($('input[name=checkListItem]').val() !== '') {
            toAdd = $('input[name=checkListItem]').val();
            var newItem = document.createElement('li');
            newItem.innerHTML = toAdd;
            newItem.className = 'item';

            $('#list').prepend(newItem);
            count++;
            if (count == 1) {
                $("#numItems").text("1 item");
            }
            else {
                $("#numItems").text(count + " items");
            }

            if (count != 0) {
                $("#footerInfo, #footerBars").show();
            }
            else {
                $("#footerInfo,#footerBars").hide();
            }

            //loader.currentPageChanged();
        }
        $('input[name=checkListItem]').val('');
        $('#input').focus();

        _shopping.push(toAdd);

        return false;
    });

    // remove item
    $(document).on('click', '.item', function () {
        $(this).remove();

        count--;
        if (count == 1) {
            $("#numItems").text("1 item");
        }
        else if (count == 0) {
            $("#numItems").text("");
        }
        else {
            $("#numItems").text(count + " items");
        }

        if (count != 0) {
            $("#footerInfo, #footerBars").show();
        }
        else {
            $("#footerInfo, #footerBars").hide();
        }

        var index = _shopping.indexOf($(this).text());

        if (index > -1) {
            _shopping.splice(index, 1);
        }

        loader.currentPageChanged();
    });


    $('#submit_list').click(function () {
        if (_shopping != []) {
            sendToServer();
        }
        loader.next();
    });
}


