(function () {
    loader._shopping = {
        data: ["greenEggs", "ham"],
        getData: function () {
            return list_shopping;
        },
        loadData: function (data) { // MUST RESET PAGE AS WELL
            var arr = [];
            for (var i = 0; i < data.length; i++) {
                shoppping_toAdd = data[i];
                var newItem = document.createElement('li');
                newItem.innerHTML = shoppping_toAdd;
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

    var shopping_count = 0;
    var shoppping_toAdd;
    var list_shopping = [];


    $('#submit_list').click(function () {
        if (list_shopping.length > 0) {
            goToPage("_checkout");
        }
    });


    $('#shoppping_list_form').submit(addItem);
    $('#add-shopping-item').click(addItem);
    function addItem() {
        if ($('#shoppingCheckListItem').val() !== '') {
            shoppping_toAdd = $('#shoppingCheckListItem').val();
            var newItem = document.createElement('li');
            newItem.innerHTML = shoppping_toAdd;
            newItem.className = 'item';

            $('#list').prepend(newItem);
            shopping_count++;
            if (shopping_count == 1) {
                $("#numItems").text("1 item");
            }
            else {
                $("#numItems").text(shopping_count + " items");
            }

            if (shopping_count != 0) {
                $("#footerInfo, #footerBars").show();
            }
            else {
                $("#footerInfo,#footerBars").hide();
            }

            loader.currentPageChanged();
        }
        $('#shoppingCheckListItem').val('');
        // $('#input').focus();

        list_shopping.push(shoppping_toAdd);

        return false;
    }



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

        var index = list_shopping.indexOf($(this).text());

        if (index > -1) {
            list_shopping.splice(index, 1);
        }

        loader.currentPageChanged();
    });



})();


