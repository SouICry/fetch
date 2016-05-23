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



function createTicket(userId) {
    var user = loadUser(userId);

    if (!user) {
        console.log("User does not exist");
        return;
    }
    
    var ticket = {
        id: userId + 'ticket' + (user.grocery_list.length + 1).toString(),
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
            store_name: masters[userId]["_shopping"].data.store_name,
            shopping_list: masters[userId]["_shopping"].data.list,
            timestamp: masters[userId]["_shopping"].data.timestamp
        },
        special_options: {
            special_instruction: masters[userId]["_checkout"].data.special_options,
            available_time_start: masters[userId]["_checkout"].data.available_time_start,
            available_time_end: masters[userId]["_checkout"].data.available_time_end
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





function loadTickets(userId, callback, req, res) {
    var arr = loadUser(userId).tickets;
    callback(req, res, arr);

    // TODO: update masters session
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
            user = db.collection('users').update({_id: master.userId}, {$push: {tickets: ticket}},
                function(err) {
                    if (err) return null;
            });
            return user;
        }
    });
    return null;
}




// Loads a user from the database and stores to master session
function loadUser(userId, callback, req, res) {
    var user = null;

    // Null check userId
    if (!userId) {
        console.log('null userId passed into loadUser');
        return null;
    }

    // Connect to database and find user with ID passed in
    MongoClient.connect(mongodb_url, function(err, db) {
        if (err) {
            console.log('Error: loadUser. ' + err);
        }
        else {
            user = db.collection('users').findOne({_id: userId}, function(err) {
                if (err) console.log('err');
            });

            // No user with id = userId in database
            if (!user) {
                console.log('Error: loadUser. ' + 'No user with id: ' + userId);

                // error
                callback(req, res, null);
                return;
            }

            // Updates master session userId and the user's data in accSetting
            masters[userId].userId = user._id;
            masters[userId]["_accSetting"].data = {
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
                // TODO: update masters session

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
        console.log('null ticketId passed into removeFromQueue');
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

// Used to initialize master session for userId to null
function initMasteruserId() {
    MongoClient.connect(mongodb_url, function(err, db) {
        if (err) {
            console.log('Error: ' + err);
            return false;
        }
        else {
            users = db.collection('users').find().toArray(function(err, docs) {
                if (err) {
                    console.log('error in initMasteruserId');
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