var express = require('express');
var cookieParser = require('cookie-parser');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var bodyParser = require('body-parser');
var fs = require('fs');

var mongodb_url = 'mongodb://test_user:test@ds013221.mlab.com:13221/insanely_creatives_db';


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname));



// This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
    res.send("<script>window.location.href = 'template.html' </script>");
});


app.post('/', function (req, res){
    fs.readFile(req.body.name, 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        res.send(data.substring(data.indexOf("<body>") + 6, data.indexOf("</body>")));
    });
});


var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)

});