// For user signup
app.post('signup',function(req, res) {

    var email_regex = /gi.*@ucsd.edu/;
    var phone_number_regex = /d{3}-d{3}-d{4}/;

    req.body = {
        first_name: "firstname",
        last_name: "lastname",
        email: "someemail@ucsd.edu",
        password: "somepassword",
        phone_number: "911-9111-911"
    };

    var first_name=req.body.first_name;
    var last_name=req.body.last_name;
    var email=req.body.email;
    var password=req.body.password;
    var phone_number=req.body.phone_number;

    // Need to check if user_name already exists
    db.collection('users').count({email: email}, function(err, count) {
        assert.equal(null, err);

        console.log("num of users with same email = ", count);
        if (count != 0) {
            //res.send();
            res.status(500).send("user with email already exists!");
        }
        else {
            var salt = bcrypt.genSaltSync(saltRounds);
            var hash = bcrypt.hashSync(password.toString(), salt);

            // To confirm sign in success
            console.log("User name = " + user_name + ", password is " + password);ex

            // Insert the user into the collection
            var insertDocument = function (db, callback) {
                var date = new Date();
                var newUser = {
                    "first_name": first_name,
                    "last_name": last_name,
                    "email": email,
                    "phone_number": phone_number,
                    "password_hash": hash,
                    "total_rating": 0,
                    "num_times_rated": 0,
                    "time_user_created": ""+(date.getMonth()+1)+"/"+date.getDay()+"/"+date.getYear(),
                    "grocerylist": []
                };

                db.collection('users').insertOne(newUser);
            };

            MongoClient.connect(mongodb_url, function (err, db) {
                assert.equal(null, err);
                insertDocument(db, function () {
                    db.close();
                });
            });
        }
    });
});