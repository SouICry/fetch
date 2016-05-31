var directionsDisplay;
var directionsService;
var map;
var destGeo;

(function () {
    loader._accSetting = {
        data: {
            full_name: "Jeanette Phung", email: "jeanettephung@hotmail.com", phone: "(626)443-5688",
            street: "Gage Ave.", state: "CA", city: "El Monte", zip: 91731
        },
        version: 0, //Must be 0 
        getData: null,
        loadData: null,
        onPageLoad: getGeolocation
    }
})();

function initialize() {
    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var mapOptions = {
                zoom: 16,
                center: {lat: pos.lat, lng: pos.lng}
            };
            map = new google.maps.Map(document.getElementById("driverMap"), mapOptions);
            directionsDisplay.setMap(map);
            
            setTimeout(calcRoute, 500);
        });
    }
}

function calcRoute() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var start = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            //var end = new google.maps.LatLng(data.lat, data.lng);
            var end = new google.maps.LatLng(destGeo.lat,destGeo.lng);
            var request = {
                origin: start,
                destination: end,
                travelMode: google.maps.TravelMode.DRIVING
            };
            directionsService.route(request, function (result, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(result);
                }
            });
        });
    }
}

function getGeolocation() {
    $.ajax({
        type: "POST",
        url: "/_driverMap",
        data: null,
        success: function (data) {
            destGeo = data;
        },
        error: function (data) {
            //data is the object send back on fail (could also just be string)
        }
    });
}

