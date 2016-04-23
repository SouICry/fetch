/**
 * Created by tylercuddy on 4/18/16.
 */

$(document).ready(function () {
   //$('img').css('opacity','.5') ;
   $('img').fadeTo(0,'.5');
   $('figure').mouseenter(function(){
       $(this).find('img').fadeTo('fast','1');
   });
    $('figure').mouseleave(function () {
       $(this).find('img').fadeTo('fast','.5') ;
    });
});

