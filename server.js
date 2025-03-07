var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('express-flash');
var session = require('express-session');
var cookieParser = require('cookie-parser');

// config files
var db = require('./config/db');

// set our port
var port = process.env.PORT || 80;

mongoose.connect(db.url);

require('./config/passport')(passport); // pass passport for configuration

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

app.use(cookieParser() );

// set the static files location to only release resources.
// HTML should only be viewed through other routes.
app.use(express.static(__dirname + '/public/'));

app.use(session({ secret: 'supersecretsaucemakescryptostronger' })); // session secret
app.use(passport.initialize());
app.use(passport.session({
                    cookie: { maxAge: 60000 },
                    rolling: true,
                    resave: true,
                    saveUninitialized: false})); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ==================================================
require('./app/routes')(app, passport); // configure our routes

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);

// shoutout to the user
console.log('Magic happens on port ' + port);

// expose app
exports = module.exports = app;
