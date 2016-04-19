/**
 * Created by tylercuddy on 4/18/16.
 */

$(document).ready(function () {
   //$('img').css('opacity','.5') ;
    $('img').fadeTo('0','.5')
   $('img').mouseenter(function(){
       $(this).fadeTo('fast','1');
   });
    $('img').mouseleave(function () {
       $(this).fadeTo('fast','.5') ;
    });
});

