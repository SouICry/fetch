/** Created by tylercuddy on 5/4/16. */

$(document).ready(function () {


    $('#homePage img').fadeTo(0,'.4');
    $('.name').css('color','black');
    $('figure').mouseenter(function(){
        $(this).find('img').fadeTo('fast','1');
        $(this).find('.name').css('color','#f36100');
    });
    $('#homePage figure').mouseleave(function () {
        $(this).find('img').fadeTo('fast','.4') ;
        $(this).find('.name').css('color','#000000');

    });
});
