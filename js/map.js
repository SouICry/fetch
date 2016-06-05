var map;
function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 32.88, lng: -117.233},
        zoom: 18
    });


    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}

function sendGeolocation() {

    if (!map) {
        return;
    }
    var center = map.getCenter();
    var geo = {
        lat: center.lat(),
        lng: center.lng()
    }

    $.ajax({
        type: "POST",
        url: "/_map",
        data: geo,
        success: function (data) {
            //data is the object sent back on success (could also just be string);
        },
        error: function (data) {
            //data is the object send back on fail (could also just be string)
        }
    });
}


