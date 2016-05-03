/**
 * Created by tylercuddy on 4/18/16.
 */

$(document).ready(function () {


    $('img').fadeTo(0,'.4');
    $('.name').css('color','black');
    $('figure').mouseenter(function(){
        $(this).find('img').fadeTo('fast','1');
        $(this).find('.name').css('color','#f36100');
    });
    $('figure').mouseleave(function () {
        $(this).find('img').fadeTo('fast','.4') ;
        $(this).find('.name').css('color','#000000');
        
    });
});

// write information about the state of the app in the url as #hash.
// Hashes don’t cause the page to reload and are easily accessible and manipulated.
$(function () {


    // $('div').fadeIn('slow');
    render(decodeURI(window.location.hash));

    function renderHomePage(){
        // Shows the Single Product Page with appropriate data.
        console.log("renderHomePage");
        var page = $('#home');
        console.log("page:",page);
        page.removeClass('hidden');
    }

    function renderShopperPage(){
        // Crates an object with filtered products and passes it to renderProductsPage.
        var page = $('#shopper');
        $('.filters').addClass('hidden');
        $('.toggle').addClass('hidden');
        $('.info').removeClass('hidden');
        page.removeClass('hidden');
    }

    function renderDriverPage(){
        // Shows the error page.
        var page = $('#driver');
        $('.filters').removeClass('hidden');
        $('.toggle').removeClass('hidden');
        $('.info').addClass('hidden');
        page.removeClass('hidden');
    }

    function render(url) {

        console.log("render hash:",window.location.hash);
        // Get the keyword from the url. in this case the keyword whatever comes before the
        // the first slash so #one or #two
        var temp = url.split('/')[0];
        console.log("temp:",temp);

        // Hide whatever page is currently shown.
        $('.page').addClass('hidden');

        // this is and instance of an object
        var map = {

            // The "Homepage".
            '': function () {
                renderHomePage();
            },

            // Single Products page.
            '#home': function () {
                console.log("map says hello");
                renderHomePage();
            },

            // Page with filtered products
            '#shop': function () {
                renderShopperPage();
            },
            '#drive': function () {
                renderDriverPage();
            }

        };

        // Execute the needed function depending on the url keyword (stored in temp).
        if(map[temp]){
            console.log("map[temp]:" ,map[temp]);
            map[temp]();
        }
    };

    // An event handler with calls the render function on every hashchange.
    // The render function will show the appropriate content of out page.
    $(window).on('hashchange', function(){
        //decodeURI will just return the hash of the desired url ie #one
        console.log("window.location.hash:",window.location.hash);
        console.log("docdeURI:",decodeURI(window.location.hash));
        render(decodeURI(window.location.hash));
    });

    $('.home').on('click', function(){
        //console.log("window.location.hash:",window.location.hash);
        window.location.hash='#home';
    });

    $('.shop').on('click', function(){
        //console.log("window.location.hash:",window.location.hash);
        window.location.hash='#shop';
    });
    $('.drive').on('click', function(){
        //console.log("window.location.hash:",window.location.hash);
        window.location.hash='#drive';
    });
});


