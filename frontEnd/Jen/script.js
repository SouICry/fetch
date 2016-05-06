// add item
$(document).ready(function () {
    //color varaible
    /*  var color_r = 255;
     var color_g = 100;
     var color_b = 0;
     */

    // item count
    var count = 0


    // click button
    $('#button').click(function () {
        if ($('input[name=checkListItem]').val() !== '') {
            toAdd = $('input[name=checkListItem]').val();
            var newItem = document.createElement('li');
            newItem.innerHTML = toAdd;
            newItem.className = 'item'
            /*  if (color_b < 100)
             color_b+=6;
             if (color_g < 180)
             color_g+=6;
             var newColor = "(255,"+color_g+","+color_b+")";
             newItem.style.backgroundColor= "rgb"+newColor; */
            $('#list').prepend(newItem);
            /*  $('#list').prepend('<li class="item">' + toAdd + '</li>'); */
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
            /*  if (color_b < 100)
             color_b+=6;
             if (color_g < 180)
             color_g+=6;
             var newColor = "(255,"+color_g+","+color_b+")"
             newItem.style.backgroundColor= "rgb"+newColor; */
            $('#list').append(newItem);
            count++;
            if (count == 1) {
                $("#item").text("1 item");
            }
            else {
                $("#item").text(count + " items");
            }
            /* $('#list').prepend('<li class="item">' + toAdd + '</li>') */
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
        else {
            $("#item").text(count + " items");
        }
    });

    // draggable item list
    /*  $(function() {
     $( "#list" ).sortable();
     $( "#list" ).disableSelection();
     });

     /*
     $("#slider-range").slider({
     range: true,
     min: 0,
     max: 1440,
     step: 15,
     values: [0, 1440],
     slide: function (e, ui) {
     var hours1 = Math.floor(ui.values[0] / 60);
     var minutes1 = ui.values[0] - (hours1 * 60);

     if (hours1.length == 1) hours1 = '0' + hours1;
     if (minutes1.length == 1) minutes1 = '0' + minutes1;
     if (minutes1 == 0) minutes1 = '00';
     if (hours1 >= 12) {
     if (hours1 == 12) {
     hours1 = hours1;
     minutes1 = minutes1 + " PM";
     } else {
     hours1 = hours1 - 12;
     minutes1 = minutes1 + " PM";
     }
     } else {
     hours1 = hours1;
     minutes1 = minutes1 + " AM";
     }
     if (hours1 == 0) {
     hours1 = 12;
     minutes1 = minutes1;
     }



     $('.slider-time').html(hours1 + ':' + minutes1);

     var hours2 = Math.floor(ui.values[1] / 60);
     var minutes2 = ui.values[1] - (hours2 * 60);

     if (hours2.length == 1) hours2 = '0' + hours2;
     if (minutes2.length == 1) minutes2 = '0' + minutes2;
     if (minutes2 == 0) minutes2 = '00';
     if (hours2 >= 12) {
     if (hours2 == 12) {
     hours2 = hours2;
     minutes2 = minutes2 + " PM";
     } else if (hours2 == 24) {
     hours2 = 11;
     minutes2 = "59 PM";
     } else {
     hours2 = hours2 - 12;
     minutes2 = minutes2 + " PM";
     }
     } else {
     hours2 = hours2;
     minutes2 = minutes2 + " AM";
     }

     $('.slider-time2').html(hours2 + ':' + minutes2);
     }
     }); */

    // submission button
    /*  $(function() {
     $( ".confirm" ).dialog({
     autoOpen: false,
     show: {
     effect: "blind",
     duration: 1000
     },
     hide: {
     effect: "explode",
     duration: 1000
     }
     });

     $( "#submit" ).click(function() {
     $( ".confirm" ).dialog( "open" );
     });
     });

     $('#close').click(function () {
     $('.confirm').dialog('close');
     return false;
     });
     */

});


