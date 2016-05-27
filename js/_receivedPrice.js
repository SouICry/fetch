(function () {
    loader._receivedPrice = {
        data: {
            full_name: "Jeanette Phung", email: "jeanettephung@hotmail.com", phone: "(626)443-5688",
            street: "Gage Ave.", state: "CA", city: "El Monte", zip: 91731
        },
        version: 0, //Must be 0 
        getData: function() {
            return { price: $("#recievedPrice_price").val() };
        }
    }
}