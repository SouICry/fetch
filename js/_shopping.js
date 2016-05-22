(function () {
    loader._shopping = {
        data: ["greenEggs", "ham"], //Optional
        version: 0, //Must be 0
        getData: function () { //must be null if not needed
            return list_shopping;
        },
        loadData: function (data) { // MUST RESET PAGE AS WELL    //must be null if not needed
            var arr = [];

            $("#list").html("");
            shopping_count = 0;
            list_shopping.splice(0,list_shopping.length)

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
                    $("#submit_list, #footerInfo, #footerBars").show();
                }
                else {
                    $("#submit_list, #footerInfo,#footerBars").hide();
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
                $("#submit_list, #footerInfo, #footerBars").show();
            }
            else {
                $("#submit_list, #footerInfo, #footerBars").hide();
            }

            loader.currentPageChanged();
        }
        $('#shoppingCheckListItem').val('');
        //$('#input').focus();

        list_shopping.push(shoppping_toAdd);

        return false;
    }



    // remove item
    $(document).on('click', '.item', function () {
        $(this).remove();

        shopping_count--;
        if (shopping_count == 1) {
            $("#numItems").text("1 item");
        }
        else if (shopping_count == 0) {
            $("#numItems").text("");
        }
        else {
            $("#numItems").text(shopping_count + " items");
        }

        if (count != 0) {
            $("#submit_list, #footerInfo, #footerBars").show();
        }
        else {
            $("#submit_list, #footerInfo, #footerBars").hide();
        }

        var index = list_shopping.indexOf($(this).text());

        if (index > -1) {
            list_shopping.splice(index, 1);
        }

        loader.currentPageChanged();
    });



})();


