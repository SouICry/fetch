(function () {
    var map;

    loader._deliveryLocation = {
        loadData: function () {
            map = new google.maps.Map(document.getElementById('map-select-loc'), {
                center: {lat: 32.87998053492496, lng: -117.2360865181381},
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
            } 
        },
        getData: function () {
            var center = map.getCenter();
            return {
                lat: center.lat(),
                lng: center.lng()
            };
        }
    };


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
})
();