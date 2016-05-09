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
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
//app.use(express.static(__dirname));


// This responds with "Hello World" on the homepage
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
    if ((req.originalUrl).indexOf(".htm") > 0) {
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

var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)

});