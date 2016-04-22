/**
 * Created by tylercuddy on 4/18/16.
 */

$(document).ready(function () {
   //$('img').css('opacity','.5') ;
   $('figure').fadeTo(0,'.5');
   $('figure').mouseenter(function(){
       $(this).fadeTo('fast','1');
   });
    $('figure').mouseleave(function () {
       $(this).fadeTo('fast','.5') ;
    });
});

