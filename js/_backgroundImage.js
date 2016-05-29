
/** Created by tyler cuddy on 5/28/16. */


(function () {
    var images = [], x = 0;
    images[0] = "/resources/images/beet-on-pink.jpg";
    images[1] = "/resources/images/lemon-on-blue.jpg";
    images[2] = "/resources/images/carrot-on-pink.jpg";
    images[3] = "/resources/images/peppers.jpg";
    images[4] = "/resources/images/cucumber-on-green.jpg";

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
