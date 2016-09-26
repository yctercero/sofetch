
//============ set up ================
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');

const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const multer = require('multer');

//========== config ==================
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



//=========== passport ================
require('./server/passport/passport')(passport); // pass passport for configuration

// app.use(session({ secret: 'dogpawpuppytreatsfluffandtuff' }));
app.use(passport.initialize());
// // persistent login sessions
// app.use(passport.session());
// // use flash messages
app.use(flash());

//========== routes ==================
require('./server/routes/routes.js')(app, passport); // load routes 
// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

//=========== launch ===============
app.listen(port);
console.log('SoFetch listening on port ' + port);

module.exports = app;