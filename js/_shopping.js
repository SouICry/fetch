(function () {
    loader._shopping = {
        data: ["greenEggs", "ham"], //Optional
        version: 0, //Must be 0
        getData: function () { //must be null if not needed
            return list_shopping;
        },
        loadData: function (data) { // MUST RESET PAGE AS WELL    //must be null if not needed
            var arr = [];

            $("#shopping_list").html("");
            shopping_count = 0;
            list_shopping.splice(0,list_shopping.length)

            for (var i = 0; i < data.length; i++) {
                shoppping_toAdd = data[i];
                var newItem = document.createElement('li');
                newItem.innerHTML = shoppping_toAdd;
                newItem.className = 'item';
                $("#shopping_list").append(newItem);

                shopping_count++;
                if (shopping_count == 1) {
                    $("#shopping_numItems").text("1 item");
                }
                else {
                    $("#shopping_numItems").text(shopping_count + " data");
                }
                if (shopping_count != 0) {
                    $("#shopping_footerInfo, #shopping_footerBars").show();
                }
                else {
                    $("#shopping_footerInfo,#shopping_footerBars").hide();
                }
            }
        }

    };

    var shopping_count = 0;
    var shoppping_toAdd;
    var list_shopping = [];

    $("#shopping_submit_list").hide();

    $('#shopping_submit_list').click(function () {
        if (list_shopping.length > 0) {
            goToPage("_checkout");
        }
    });


    $('#shopping_shoppping_list_form').submit(addItem);
    function addItem() {
        if ($('#shopping_shoppingCheckListItem').val() !== '') {
            shoppping_toAdd = $('#shopping_shoppingCheckListItem').val();
            var newItem = document.createElement('li');
            newItem.innerHTML = shoppping_toAdd;
            newItem.className = 'item';

            $('#shopping_list').prepend(newItem);
            shopping_count++;
            if (shopping_count == 1) {
                $("#shopping_numItems").text("1 item");
            }
            else {
                $("#shopping_numItems").text(shopping_count + " items");
            }

            if (shopping_count != 0) {
                $("#shopping_footerInfo, #shopping_footerBars, #shopping_submit_list").show();
            }
            else {
                $("#shopping_footerInfo, #shopping_footerBars").hide();
            }

            loader.currentPageChanged();
        }
        $('#shopping_shoppingCheckListItem').val('');
        //$('#shopping_input').focus();

        list_shopping.push(shoppping_toAdd);

        return false;
    }



    // remove item
    $(document).on('click', '.item', function () {
        $(this).remove();
        $('#shopping_submit_list').hide();

        shopping_count--;
        if (shopping_count == 1) {
            $("#shopping_numItems").text("1 item");
        }
        else if (shopping_count == 0) {
            $("#shopping_numItems").text("");
        }
        else {
            $("#shopping_numItems").text(shopping_count + " items");
        }

        if (shopping_count != 0) {
            $("#shopping_submit_list, #shopping_footerInfo, #shopping_footerBars").show();
        }


        var index = list_shopping.indexOf($(this).text());

        if (index > -1) {
            list_shopping.splice(index, 1);
        }

        loader.currentPageChanged();
    });



})();


