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


app.post('/loadPage', function (req, res) {
    try {
        fs.readFile(__dirname + "/" + req.body.name + ".html", 'utf8', function (err, data) {
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

// Set up schema for users
var userSchema = new mongoose.Schema(
    {
        full_name: {type: String, required: true, unique: false},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        phone_number: {type: String, required: true},
        address: {
            street: '',
            city: '',
            state: '',
            zip: ''
        },
        payment_info: {
            card_holder_name: '',
            card_number: '',
            exp_month: '',
            exp_year: '',
            cvv: ''
        },
        total_rating: {type: Number, required: false, unique: false},
        num_times_rated: {type: Number, required: false, unique: false},
        time_created: {type: String, required: false, unique: false},
        grocery_list: {type: [], required: false, unique: false},
        delivery_list: {type: [], required: false, unique: false},
        user_history: {type: [], required: false, unique: false},
        delivery_history: {type: [], required: false, unique: false},
        is_driver: {type: Boolean, required: false, unique: false},
        resetPasswordToken: String,
        resetPasswordExpires: Date
    }
);


// Hash password prior to saving user to db
userSchema.pre('save', function (next) {
    var user = this;
    var SALT_FACTOR = 15;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

// Compare input password to hashed password
userSchema.methods.comparePassword = function (password) {
    console.log('comparing: ' + password + ' and ' + this.password);

    return bcrypt.compareSync(password, this.password);
};

// Used to check if valid email format (@ucsd.edu)
var validEmail = function(email) {
    var email_regex = /.*@ucsd.edu/;

    if (!email_regex.test(email)) {
        console.log('invalid email format');
        return false;
    }
    return true;
};

// Used to check if valid phone number format
var validPhoneNumber = function(phone_number) {
    // Strip non-digit chars from phone #
    phone_number = phone_number.replace(/\D/g,'');
    console.log('stripped phone#: ' + phone_number);

    if (phone_number.length != 10) {
        console.log('invalid phone format');
        return null;
    }
    return phone_number;
};


// User model
var User = mongoose.model('User', userSchema, 'users');

// Connect to db
mongoose.connect(mongodb_url);


// To check for login
passport.use('login', new LocalStrategy(
    {
        usernameField: 'email', // Change username field to email
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function (req, email, password, done) {
        process.nextTick( function() {
            User.findOne({email: email.toLowerCase()}, function (err, user) {
                if (err)
                    return done(err);

                // User with email passed in not found
                if (!user)
                    return done(null, false, {message: 'User with email \'' + email + '\' not found.'});

                // Passwords do not match
                if (!user.comparePassword(password))
                    return done(null, false, {message: 'Incorrect password.'});

                // Successful login
                return done(null, user, {message: 'successful login'});
            });
        });
    }
));

// Strategy for signup
passport.use('signup', new LocalStrategy(
    {
        usernameField: 'email', // Change username field to email
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function (req, email, password, done) { // all other input fields are in req.body
        if (password.length === 0) {
            console.log('Password has length 0');
            return done(null, false);
        }

        if (!validEmail(email))
            return done(null, false, {message: 'invalid email format'});

        if (!validPhoneNumber(req.body.phone_number))
            return done(null, false, {message: 'invalid phone number format'});

        console.log('signup email: ' + email);

        process.nextTick(function() {
            User.findOne({'email': email}, function(err, user) {

                if (err) {
                    console.log('Error: ', err);
                    return done(err);
                }
                // If user exists, dont make new user
                if (user) {
                    return done(null, false, {message: 'user already exists'});
                }
                else {
                    var date = new Date();

                    var newUser = new User({
                        full_name: req.body.full_name,
                        email: email,
                        password: password,
                        phone_number: req.body.phone_number,
                        total_rating: 0.0,
                        num_times_rated: 0,
                        time_created: date.toLocaleDateString() + ' ' + date.toLocaleTimeString(),
                        grocery_list: [],
                        delivery_list: [],
                        user_history: [],
                        delivery_history: [],
                        is_driver: false
                    });

                    // Adding new user to database
                    newUser.save(function(err) {
                        if (err) {
                            console.log('could not save user err: ' + err);
                            return done(null, false);
                        }
                    });
                    console.log('success');
                    return done(null, newUser, {message: 'successful signup'});
                }
            });
        });
    }
));

// Serialize user for storing to session
// Saved to req.session.passport.user
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// Deserialize user for storing to session
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

// Routes

// app.get('/forgot', function (req, res) {
//     res.render('forgot', {
//         user: req.user
//     });
// });
//
// app.get('/reset/:token', function (req, res) {
//     User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now()}}, function (err, user) {
//         if (!user) {
//             req.flash('error', 'Password reset token is invalid or has expired.');
//             return res.redirect('/forgot');
//         }
//         res.render('reset', {
//             user: req.user
//         });
//     });
// });

app.post('/_logout', function(req, res, next) {
    // If 'logout' button pressed, log user out. Passportjs will
    // call deserialize to remove user from session.
    req.logout();
    req.session.destroy();
    console.log('logged out');
    console.log(req.session);
    res.send(req.session);
});

app.post('/_signUp', function(req, res, next) {
    passport.authenticate('signup', function(err, user, info) {
        console.log(info.message);

        if (!user) {
            res.status(500);
            res.send(info.message);
        }
        else {
            user.save(function(err) {
                req.login(user, function(err){
                    if (err) {
                        //return next(err);
                        console.log('login failed: ', err)
                        res.status(500);
                    }
                    else {
                        console.log('login success!');
                    }
                });
            });
            res.send(user);
        }
    })(req, res, next);
});

// For user login. Authenticates user and serializes user to session
// if successful login
app.post('/_login', function(req, res, next) {
    passport.authenticate('login', function(err, user, info) {
        // Check if user was successfully authenticated, send error otherwise
        if (!user) {
            res.status(500);
            res.send(info.message);
        }
        else {
            req.login(user, function(err) {
                if (err) {
                    console.log('failed login: ', err);
                    res.status(500);
                    res.send(err);
                }
            });

            // If everything was successful, send user back to frontend
            res.send(user);
        }
    })(req, res, next);
});

// TODO: need to fix pwrecovery. does not work atm
app.post('/_passwordRecovery', function (req, res, next) {
    var email = req.body.email;

    if (!validEmail(email)) {
        console.log("invalid email format");
        req.flash('error', 'Invalid email format your_ucsd_email@ucsd.edu');
        res.status(500);
        return;
        //return res.redirect('/forgot');
    }

    async.waterfall([
        function (done) {
            crypto.randomBytes(20, function (err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function (token, done) {
            User.findOne({email: req.body.email}, function (err, user) {
                if (!user) {
                    req.flash('error', 'No account with that email address exists.');
                    res.status(500);
                    return;
                    //return res.redirect('/forgot');
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                user.save(function (err) {
                    done(err, token, user);
                });
            });
        },
        function (token, user, done) {
            var Transport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'fetchtestuser',
                    pass: 'insanelycreatives'
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'fetchtestuser@gmail.com',
                subject: 'Node.js Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            console.log('Sending Mail');
            Transport.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log('Error occurred');
                    console.log(err.message);
                    res.status(500);
                    return;
                }
                req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                done(err, 'done');
            });
        }
    ], function (err) {
        if (err) return next(err);
        //res.redirect('/forgot');
    });
});

app.post('/reset/:token', function (req, res) {
    async.waterfall([
        function (done) {
            User.findOne({
                resetPasswordToken: req.params.token,
                resetPasswordExpires: {$gt: Date.now()}
            }, function (err, user) {
                if (!user) {
                    req.flash('error', 'Password reset token is invalid or has expired.');
                    res.status(500);
                    return;
                    //return res.redirect('back');
                }

                user.password = req.body.password;
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;

                user.save(function (err) {
                    req.login(user, function (err) {
                        done(err, user);
                    });
                });
            });
        },
        function (user, done) {
            var Transport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'fetchtestuser',
                    pass: 'insanelycreatives'
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'passwordreset@demo.com',
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' +
                'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
            };
            Transport.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log('Error occurred');
                    console.log(err.message);
                    res.status(500);
                    return;
                }
                req.flash('success', 'Success! Your password has been changed.');
                done(err);
            });
        }
    ], function (err) {
        res.status(500);
        return;
        //res.redirect('/');
    });
});


var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)

});
