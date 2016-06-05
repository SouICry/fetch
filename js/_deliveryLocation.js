(function () {
    var map;

    loader._deliveryLocation = {
        version: 0,
        initMap: function () {
            function mapChanged(){
                loader._deliveryLocation.version++;
                loader.shoppingChanged = true;
            }

            // Try HTML5 geolocation.
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    map = new google.maps.Map(document.getElementById('map-select-loc'), {
                        center: pos,
                        zoom: 16
                    });


                    map.addListener('dragend', mapChanged);
                    map.addListener('zoom_changed', mapChanged);

                }, function () {
                    handleLocationError(true, infoWindow, map.getCenter());
                });
            }
            else {
                map = new google.maps.Map(document.getElementById('map-select-loc'), {
                    center: {lat: 32.87998053492496, lng: -117.2360865181381},
                    zoom: 16
                });

                map.addListener('dragend', mapChanged);
                map.addListener('zoom_changed', mapChanged);
            }
        },
        loadData: function(data){
            console.log("load loc");
            map.setCenter(data);
            map.setZoom(data.zoom);
        },
        getData: function () {
            var center = map.getCenter();
            return {
                lat: center.lat(),
                lng: center.lng(),
                zoom: map.getZoom()
            };
        }
    };

    $('#delivery-location-back').click(function() {
        goToPage('_deliveryTime');
    });

    $('#delivery-location-submit').click(function() {
        var checkout_isChecked = $('input[name="special_notes"]:checked', '#checkout_notes').val()?true:false;
        if (checkout_isChecked == false){
            $("#checkout_warning").show();
        }
        else {
            //Actual
            $.ajax({
                type: "POST",
                url: "/_checkout",
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify({
                    list: loader._shopping.getData(),
                    store_name: loader.store,
                    options: loader._checkout.getData(),
                    available_time: loader._deliveryTime.getData(),
                    geo_location: loader._deliveryLocation.getData()
                }),
                success: function (data) {
                    //data is the object sent back on success (could also just be string)
                },
                error: function (data) {
                    //data is the object send back on fail (could also just be string)
                }
            });

            goToPage("_pendingPayment");
            //loader.payment.simulateCompletePayment();
            loader.payment.triggerPayment();

            // go to paypal to set up payment
            // on successful payment, goes to _submitted
            // unsuccessful goes to _cancelled
            //loader.payment.triggerPayment();
        }
    });


    function sendGeolocation() {

        if (!map) {
            return;
        }
        var center = map.getCenter();
        var geo = {
            lat: center.lat(),
            lng: center.lng()
        };

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