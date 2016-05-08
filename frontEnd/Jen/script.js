// add item
$(document).ready(function () {
    // item count
    var count = 0;
    $("#container").hide();


    // click button
    $('#button').click(function () {
        if ($('input[name=checkListItem]').val() !== '') {
            toAdd = $('input[name=checkListItem]').val();
            var newItem = document.createElement('li');
            newItem.innerHTML = toAdd;
            newItem.className = 'item'

            $('#list').prepend(newItem);
        }
        ;
        $('input[name=checkListItem]').val('');
        $('#input').focus();
        return false;
    });

    //press enter
    $('form').submit(function () {
        if ($('input[name=checkListItem]').val() !== '') {
            toAdd = $('input[name=checkListItem]').val();
            var newItem = document.createElement('li');
            newItem.innerHTML = toAdd;
            newItem.className = 'item'

            $('#list').append(newItem);
            count++;
            if (count == 1) {
                $("#item").text("1 item");
            }
            else {
                $("#item").text(count + " items");
            }

            if (count != 0) {
                $("#sub").text("Submit");
            }
            if (count != 0) {
                $("#container").show();
            }
            else {
                $("#container").hide();
            }
        }
        ;
        $('input[name=checkListItem]').val('');
        $('#input').focus();
        return false;
    });

    // remove item
    $(document).on('click', '.item', function () {
        $(this).remove();

        count--;
        if (count == 1) {
            $("#item").text("1 item");
        }
        else if (count == 0) {
            $("#item").text("");
        }
        else {
            $("#item").text(count + " items");
        }

        if (count != 0) {
            $("#container").show();
        }
        else {
            $("#container").hide();
        }
    });



});


