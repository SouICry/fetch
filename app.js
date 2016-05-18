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
app.use(express.static('public'));



//This responds with "Hello World" on the homepage
// app.get('/', function (req, res) {
//     res.send("<script>window.location.href = 'template.html' </script>");
// });

// app.post('/', function (req, res) {
//     fs.readFile(req.body.name, 'utf8', function (err, data) {
//         if (err) {
//             return console.log(err);
//         }
//         res.send(data.substring(data.indexOf("<body>") + 6, data.indexOf("</body>")));
//     });
// });

app.get('/*', function (req, res) {
    if ((req.originalUrl).indexOf(".html") > 0 && (req.originalUrl).indexOf("login") < 0) {
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



var email_regex = /.*@ucsd.edu/;
var phone_number_regex = /\d{3}-\d{3}-\d{4}/;

// Set up schema
var userSchema = new mongoose.Schema(
    {
        full_name: {type: String, required: true, unique: false},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        phone_number: {type: String, required: true},
        total_rating: {type: Number, required: false, unique: false},
        num_times_rated: {type: Number, required: false, unique: false},
        time_created: {type: String, required: false, unique: false},
        grocery_list: {type: [], required: false, unique: false},
        delivery_list: {type: [], required: false, unique: false},
        history: {type: [], required: false, unique: false},
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

var validEmail = function(email) {
    if (!email_regex.test(email)) {
        console.log('invalid email format');
        return false;
    }
    return true;
};

var validPhoneNumber = function(phone_number) {
    if (!phone_number_regex.test(phone_number)) {
        console.log('invalid phone format');
        return false;
    }
    return true;
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
            User.findOne({email: email}, function (err, user) {
                if (err)
                    return done(err);

                // User with email passed in not found
                if (!user)
                    return done(null, false, {'message': 'User with email \'' + email + '\' not found.'});

                // Passwords do not match
                if (!user.comparePassword(password))
                    return done(null, false, {'message': 'Incorrect password.'});

                // Successful login
                return done(null, user);
            });
        });
    }
));

passport.use('signup', new LocalStrategy(
    {
        usernameField: 'email', // Change username field to email
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function (req, email, password, done) { // all other input fields are in req.body
        var date = new Date();
        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        var yyyy = date.getFullYear();

        if (dd < 10)
            dd = '0' + dd;
        if (mm < 10)
            mm = '0' + mm;
        date = mm + '/' + dd + '/' + yyyy;

        if (!validEmail(email))
            return done(null, false, {'message': 'Invalid email format your_ucsd_email@ucsd.edu'});

        if (!validPhoneNumber(req.body.phone_number))
            return done(null, false, {'message': 'Invalid phone format ###-###-####'});

        console.log(email);

        process.nextTick(function() {
            User.findOne({'email': email}, function(err, user) {
                assert.equal(err, null);

                // If user exists, dont make new user
                if (user) {
                    console.log('user already exists');
                    return done(null, false, {'message': 'User with email \'' + email + '\' already exists!'});
                }
                else {
                    var newUser = new User({
                        full_name: req.body.full_name,
                        email: email,
                        password: password,
                        phone_number: req.body.phone_number,
                        total_rating: 0.0,
                        num_times_rated: 0,
                        time_created: date,
                        grocery_list: [],
                        delivery_list: [],
                        history: []
                    });
                    console.log(JSON.stringify(newUser));


                    newUser.save(function(err) {
                        assert.equal(null, err);
                        return done(null, newUser);
                    });
                }
            });
        });
    }
));



passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

// Routes

// app.get('/_login', function (req, res) {
//     res.render('_login', {
//         user: req.user
//     });
// });

// app.get('/_signUp', function (req, res) {
//     res.render('/_signUp', {
//         user: req.user
//     });
// });

// app.get('/logout', function (req, res) {
//     req.logout();
//     res.redirect('/');
// });


// app.get('/forgot', function (req, res) {
//     res.render('forgot', {
//         user: req.user
//     });
// });

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


app.post('/_signUp', passport.authenticate('signup',
    {
        successRedirect: '/_homePage.html',
        failureRedirect: '/_signUp.html',
        failureFlash: true
    }
));


app.post('/_login', passport.authenticate('login',
    {
        successRedirect: '/_homePage.html',
        failureRedirect: '/_login.html',
        failureFlash: true
    }
));

app.post('/forgot', function (req, res, next) {
    var email = req.body.email;

    if (email_regex.test(email) === false) {
        console.log("invalid email format");
        req.flash('error', 'Invalid email format your_ucsd_email@ucsd.edu');
        return res.redirect('/forgot');
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
                    return res.redirect('/forgot');
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
                    return;
                }
                req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                done(err, 'done');
            });
        }
    ], function (err) {
        if (err) return next(err);
        res.redirect('/forgot');
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
                    return res.redirect('back');
                }

                user.password = req.body.password;
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;

                user.save(function (err) {
                    req.logIn(user, function (err) {
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
                    return;
                }
                req.flash('success', 'Success! Your password has been changed.');
                done(err);
            });
        }
    ], function (err) {
        res.redirect('/');
    });
});

var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)

});
