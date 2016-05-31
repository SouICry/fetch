var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var session = require('express-session');
var bodyParser = require('body-parser');
var fs = require('fs');
var mongodb_url = 'mongodb://test_user:test@ds013221.mlab.com:13221/insanely_creatives_db';

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(__dirname));
/*
req.session.pages.data //array of data of each page, key is page name
           .pages.version //array of version number, key is page name     
           .passport.user   //unique userId
           .list            //list of item in shopping

 */

app.post('',function(req,res){
    fs.writeFile("images/profile/" + req.session.userId + ".png", req.body.data, function (err) {
        if (err) return console.log(err)}
        ,function(){})
});

app.post('/loadPage', function (req, res) {
    try {
        fs.readFile(__dirname + "/" + req.body.name +
            ".html", 'utf8', function (err, data) {
            if (err) {
                console.log(err);
            }
            res.send(data);
        });
    }
    catch (e) {
        res.send("");
    }
});
var masters = {};
var pages = {};
app.post();
app.post('/sendData', function(req, res, next) {
    var pageName = req.body.name;
    var userId = req.session.userId;
    if (req.body.version >= masters[userId][pageName].version) {
        masters[userId][pageName].data = req.body.data;
        masters[userId][pageName].version = req.body.version + 1;
    }
    res.send(req.body.version + 1);
    // if (req.sessions.pages == null){
    //     var pageData = [];
    //     var versions = Array.apply(null, Array(20)).map(Number.prototype.valueOf,0);;
    // }
    // else {
    //     var oldObject = req.sessions.pages;
    //     var pageName = req.body.page;
    //
    //     var pageData = oldObject.data;
    //     var versions = oldObject.version;
    // }
    // pageData[pageName] = req.body.data;
    // versions[pageName] += 1;
    //
    // req.sessions.pages.data = pageData;
    // req.sessions.pages.version = versions;
    //
    //  if(req.session.passport){
    //     if(req.session.passport.user){
    //         var userId = req.session.passport.user;
    //         masters[userId] = req.session.pages;
    //
    //     }
    // }
//    res.send(versions[pageName]);
});
app.post('/init', function(req, res){
    var userId = req.body.userId;
    var driverFlag = req.body.isDriver;
    //TODO: Query Database for user's existence here
    var userOnDB = false;

    //If user is on DB...
    if(userOnDB && userId != ""){
        //TODO: Retrieve from DB
        res.send(userOnDB);
    }
    else{
        var d = new Date();
        var tempuserId = d.getMilliseconds();
        var object = {};
        object.isDriver = driverFlag;
        object.userId = tempuserId;
        //object.pageCount = ;
        //masters[tempuserId]. = object;
        res.send(object);
    }
});

app.post('/loadData', function(req, res, next){
    var version = req.body.version;
    var userId = req.session.userId;
    var pageName = req.body.name;
    var object = {};
    object.data = masters[userId][pageName].data;
    object.version = masters[userId][pageName].version;
    if(version <= masters[userId][pageName].version){
        res.send(object);
    }

    res.send(null);

    // if (req.sessions.pages == null){
    //     res.send(null);
    // }
    // else {
    //     var oldObject = req.sessions.pages;
    //     var pageName = req.body.page;
    //
    //     var pageData = oldObject.data;
    //     var versions = oldObject.version;
    // }
    // if (versions[pageData] >= req.body.data){
    //     var nObject = {};
    //     nObject.data = pageData;
    //     nObject.version = versions;
    //     res.send(nObject);
    // }
    // res.send(null);


});


app.post('/changePage', function(req,res){
    var pageCount = req.body.pageCount;
    var newPage   = req.body.newPage;
    var userId = req.session.userId;
    var data = req.body.oldData;
    if(pageCount > masters[userId].pageCount){
        masters[userId].pageCount = pageCount;
        masters[userId].previousPage = masters[userId].currentPage;
        masters[userId].currentPage = newPage;
        masters[userId].currentPageObject.data = data;
        res.send(masters[userId][newPage].data);
    }
    else
        res.send(null);

});


app.post('/getTicket', function(req,res){


});

//run every second
setInterval(function() {
    app.post('/getUpdates', function (req, res, next) {
        var object = {};
        var userId = req.session.userId;
        if (userId) {
            object.isDriver = masters[userId].isDriver;
            object.pageCount = masters[userId].pageCount;
            object.previousPage = masters[userId].previousPage;
            object.currentPage = masters[userId].currentPage;
            //object.currentPageObject = masters[userId].currentPageObject;
            object.version = masters[userId].version;
            object.data = masters[userId].currentPageObject.data;
            res.send(object);
        }
        res.send(null);
    });
}, 1000);


var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)

});
