var express = require('express');
var cookieParser = require('cookie-parser');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var bcrypt = require('bcrypt');
var session = require('express-session');
var bodyParser = require('body-parser');
var fs = require('fs');
var mongodb_url = 'mongodb://test_user:test@ds013221.mlab.com:13221/insanely_creatives_db';


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

var saltRounds = 15;

var email_regex = /.*@ucsd.edu/;
var phone_number_regex = /\d{3}-\d{3}-\d{4}/;

// This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
    res.send("test response");
});

app.get('/success', function(req, res) {
    res.send("success!");
});

// For user signup
app.post('/signup', function(req, res) {
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;
    var password = req.body.password;
    var phone_number = req.body.phone_number;

    /*req.body = {
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
     var phone_number=req.body.phone_number;*/

    if (email_regex.test(email) === false) {
        console.log("invalid email format");
        res.status(500);
        return;
        //res.redirect('/');
    }

    if (phone_number_regex.test(phone_number) === false) {
        console.log("invalid phone number format");
        res.status(500);
        return;
        //res.redirect('/');
    }

    MongoClient.connect(mongodb_url, function(err, db){
        assert.equal(null, err);
        db.collection('users').count({email: email}, function(err, count) {
            assert.equal(null, err);

            console.log("num of users with same email = ", count);
            if (count != 0) {
                res.status(500).send("user with email already exists!");
            }
            else {
                var salt = bcrypt.genSaltSync(saltRounds);
                var hash = bcrypt.hashSync(password.toString(), salt);

                // To confirm sign in success
                console.log("Full name = " + first_name + " " + last_name + ", password is " + password);

                // Insert the user into the collection
                var insertDocument = function (db, callback) {
                    var date = new Date();
                    var dd = date.getDate();
                    var mm = date.getMonth() + 1;
                    var yyyy = date.getFullYear();
                    if (dd < 10)
                        dd = '0' + dd;
                    if (mm < 10)
                        mm = '0' + mm;
                    date = mm + '/' + dd + '/' + yyyy;
                    var newUser = {
                        "first_name": first_name,
                        "last_name": last_name,
                        "email": email,
                        "phone_number": phone_number,
                        "password_hash": hash,
                        "total_rating": 0,
                        "num_times_rated": 0,
                        "time_user_created": date,
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
});

// For user login
app.post('/login',function(req, res) {
    /*req.body = {
     email: "someemail@ucsd.edu",
     password: "somepassword"
     };*/

    var email = req.body.email;
    var password = req.body.password;

    console.log("email is " + email);

    var findDoc = function(db, callback) {
        var x = db.collection('users').findOne({email: email}, function(err, item) {
            assert.equal(null, err);
            console.log(item);

            if (item) {
                bcrypt.compare(password, item.password_hash, function(err, result) {
                    console.log("password entered: " + password);
                    //assert.equal(null, err);

                    // TODO: what to do after successful/bad login
                    if (result) {
                        res.redirect('success');
                    }
                    else {
                        res.status(500).send("incorrect password");
                    }
                });
            }
            // Check returning error
            else {
                res.status(500).send("invalid email");
            }
        });
    };

    MongoClient.connect(mongodb_url, function (err, db) {
        assert.equal(null, err);
        findDoc(db, function() {
            db.close();
        });
    });
});

var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)

});