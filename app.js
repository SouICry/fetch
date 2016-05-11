var express = require('express');
var cookieParser = require('cookie-parser');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var bcrypt = require('bcrypt');
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var bodyParser = require('body-parser');
var fs = require('fs');

var mongodb_url = 'mongodb://test_user:test@ds013221.mlab.com:13221/insanely_creatives_db';

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({ resave: true, saveUninitialized: true, secret: 'williamiscool' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));

//This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
    res.send("<script>window.location.href = 'template.html' </script>");
});

app.post('/', function (req, res) {
    fs.readFile(req.body.name, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        res.send(data.substring(data.indexOf("<body>") + 6, data.indexOf("</body>")));
    });
});

app.get('/*', function (req, res) {
    if ((req.originalUrl).indexOf(".htm") > 0 && (req.originalUrl).indexOf("login") < 0) {
        fs.readFile(__dirname + "/template.html", 'utf8', function (err, data) {
            if (err) {
                console.log(err);
            }
            fs.readFile(__dirname + req.originalUrl, 'utf8', function (err, odata) {
                if (err) {
                    console.log(err);
                }
                var pos = data.indexOf('<!--DO NOT CHANGE THIS COMMENT-->');
                res.send(data.substring(0, pos) + odata.substring(odata.indexOf("<body>") + 6, odata.indexOf("</body>")) + data.substring(pos));
            });
        });
    }
    else {
        res.sendFile(__dirname + req.url);
    }
});

app.get('/', function(req, res) {
    console.log("hello");
});

app.get('signup', function(req,res){
   res.send("hi");
});

// For user signup
app.post('signup',function(req, res) {
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

// For user login
app.post('login',function(req, res) {
    req.body = {
        email: "someemail@ucsd.edu",
        password: "somepassword"
    };

    var email=req.body.email;
    var password=req.body.password;

    var findDoc = function(db, callback) {
        var x = db.collection('users').findOne({email: email}, function(err, item) {
            assert.equal(null, err);
            if (item !== null) {
                bcrypt.compare(password, item.password_hash, function(err, result) {
                    assert(null, err);

                    // TODO
                    if (result) {
                        // successful login
                        console.log("success!");
                    }
                    else {
                        res.status(500).send("incorrect password");
                    }
                });
            }
            // Check returning error
            else {
                res.status(500).send("email does not exist.");
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
