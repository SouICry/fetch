
/** Created by tyler cuddy on 5/28/16. */


(function () {
    var images = [], x = 0;
    $('body').css('background', 'url('+ images[5] + ') no-repeat center');
    images[0] = "/resources/images/lemons.jpg";
    images[1] = "/resources/images/carrot-on-pink.jpg";
    images[2] = "/resources/images/cabbage-on-yellow.jpg";
    images[3] = "/resources/images/peppers.jpg";
    images[4] = "/resources/images/cucumber-on-green.jpg";
    images[5] = "/resources/images/beet-on-pink.jpg";

    function run(interval) {

        function func() {
            $('body').css('background', 'url('+ images[x] + ') no-repeat center');
            $('body').css('background-size', 'cover');
            x++;
            if(x == images.length) { x = 0; }
        }

        window.setInterval(func, interval);
    }

    run(30000); //milliseconds, frames
})();
