var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

var mongodb_url = 'mongodb://test_user:test@ds013221.mlab.com:13221/insanely_creatives_db';


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));



// This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
    res.send("test response");
    
});



var response = {
    "name" : "Shopping",
    "list" : ['ham', 'eggs', 'green']
};

app.post('/login', function(req, res){
    response.receivedContent = req.body;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(response));
});



// This responds a POST request for the homepage
app.post('/', function (req, res) {

    var insertDocument = function(db, callback) {
        db.collection('restaurants').insertOne( {
            "address" : {
                "street" : "2 Avenue",
                "zipcode" : "10075",
                "building" : "1480",
                "coord" : [ -73.9557413, 40.7720266 ]
            },
            "borough" : "Manhattan",
            "cuisine" : "Italian",
            "grades" : [
                {
                    "date" : new Date("2014-10-01T00:00:00Z"),
                    "grade" : "A",
                    "score" : 11
                },
                {
                    "date" : new Date("2014-01-16T00:00:00Z"),
                    "grade" : "B",
                    "score" : 17
                }
            ],
            "name" : "Vella",
            "restaurant_id" : "41704620"
        }, function(err, result) {
            assert.equal(err, null);
            console.log("Inserted a document into the restaurants collection.");

            res.send("success!");
        });
    };

    MongoClient.connect(mongodb_url, function(err, db) {
        assert.equal(null, err);
        insertDocument(db, function() {
            db.close();
        });
    });


});

var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)

});