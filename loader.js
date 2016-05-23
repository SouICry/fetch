var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var nodemailer = require('nodemailer');
var async = require('async');
var crypto = require('crypto');
var flash = require('express-flash');
var fs = require('fs');
var mongodb_url = 'mongodb://test_user:test@ds013221.mlab.com:13221/insanely_creatives_db';

var app = express();
app.use(favicon());
app.use(logger('dev'));
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({ resave: true, saveUninitialized: true, secret: 'williamiscool' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname));



function createTicket(userID) {
    var user = loadUser(userID);

    if (!user) {
        console.log("User does not exist");
        return;
    }
    
    var ticket = {
        id: userID + 'ticket' + (user.grocery_list.length + 1).toString(),
        state:'pending',

        // For the driver to know the shopper's info
        shopper: {
            id: user._id,
            phone_number: user.phone_number,
            address: {
                street: user.address.street,
                city: user.address.city,
                state: user.address.state,
                zip: user.address.zip
            },
            rating: user.avg_rating
        },
        driver: {
            id: '',
            phone_number: ''
        },
        grocery_list: {
            store_name: master.shopping_list.store_name,
            shopping_list: master.shopping_list.list,
            timestamp: master.shopping_list.timestamp
        },
        special_options: {
            special_instruction: master.checkout.special_instruction,
            available_time_start: master.checkout.time1,
            available_time_end: master.checkout.time2
        },
        driver_list: {
            checkoff_list: [],
            time_accepted: ''
        }
    };

    addToQueue(ticket);
    saveTicket(ticket);
    return ticket;
}





function loadTickets(userID, callback, req, res) {
    var arr = loadUser(userID).tickets;
    callback(req, res, arr);
}



function saveTicket(ticket) {
    if (!ticket) {
        console.log('null ticket passed into saveTicket');
        return null;
    }

    MongoClient.connect(mongodb_url, function(err, db) {
        if (err) {
            console.log('Error: ' + err + '\nCould not save ticket');
            res.send(err);
            return null;
        }
        else {
            user = db.collection('users').update({_id: master.userID}, {$push: {tickets: ticket}},
                function(err) {
                    if (err) return null;
            });
            return user;
        }
    });
    return null;
}




// Loads a user from the database and stores to master session
function loadUser(userID, callback, req, res) {
    var user = null;

    // Null check userID
    if (!userID) {
        console.log('null userID passed into loadUser');
        return null;
    }

    // Connect to database and find user with ID passed in
    MongoClient.connect(mongodb_url, function(err, db) {
        if (err) {
            console.log('Error: loadUser. ' + err);
        }
        else {
            user = db.collection('users').findOne({_id: userID}, function(err) {
                if (err) console.log('err');
            });

            // No user with id = userID in database
            if (!user) {
                console.log('Error: loadUser. ' + 'No user with id: ' + userID);

                // error
                callback(req, res, null);
                return;
            }

            // Updates master session userID and the user's data in accSetting
            masters[userID].userID = user._id;
            masters[userID]["_accSetting"].data = {
                full_name: user.full_name,
                email: user.email,
                phone: user.phone_number,
                address: {
                    street: user.address.street,
                    city: user.address.city,
                    state: user.address.state,
                    zip: user.address.zip
                }
            };

            // successful
            callback(req, res, user);
            console.log('Successfully loaded user to master session!');
        }
    });
}

// Returns an array of all tickets in the grocery_queue collection
function loadQueue(callback, req, res) {
    MongoClient.connect(mongodb_url, function(err, db) {
        if (err) {
            console.log('Error: ' + err);
            return err;
        }
        else {
            db.collection('grocery_queue').find().toArray(function(err, docs) {
                if (err) {
                    console.log('error getQueueFromDB could not find grocery lists');
                }
                callback(req, res, docs);
            });
        }
    });
}

// Adds a ticket to the grocery_queue collection
function addToQueue(ticket) {
    MongoClient.connect(mongodb_url, function(err, db) {
        if (err) {
            console.log('Error: ' + err);
        }
        else {
            db.collection('grocery_queue').insert(ticket, function(err, doc) {
                if (err) {
                    console.log('Error inserting to db');
                }
                console.log('Inserted: ' + doc + ' to queue');
            });
        }
    });
}


// Removes a ticket from the grocery_queue collection
function removeFromQueue(ticketId) {
    if (!ticketId) {
        console.log('null ticketID passed into removeFromQueue');
        return false;
    }

    MongoClient.connect(mongodb_url, function(err, db) {
        if (err) {
            console.log('Error: ' + err);
            return false;
        }
        else {
            db.collection('grocery_queue').findAndRemove(ticket, function(err, doc) {
                if (err) {
                    console.log('Error removing ticket from queue');
                    return false;
                }
                console.log('Successfully removed ticket from queue!');
                return true;
            });
        }
    });
    return false;
}

// Returns array of all users in the users collection/database
function getAllUsers(callback, req, res) {
    MongoClient.connect(mongodb_url, function(err, db) {
        if (err) {
            console.log('Error: ' + err);
            callback(req, res, null);
        }
        else {
            users = db.collection('users').find().toArray(function(err, docs) {
                if (err){
                    callback(req, res, null);
                }
                else
                    callback(req, res, docs);
            });
        }
    });
}

// Used to initialize master session for userID to null
function initMasteruserID() {
    MongoClient.connect(mongodb_url, function(err, db) {
        if (err) {
            console.log('Error: ' + err);
            return false;
        }
        else {
            users = db.collection('users').find().toArray(function(err, docs) {
                if (err) {
                    console.log('error in initMasteruserID');
                    return false;
                }
            });

            for (var i = 0; i < docs.length; i++)
                masters[docs[i]._id] = null;

            return true
        }
    });

    return false;
}