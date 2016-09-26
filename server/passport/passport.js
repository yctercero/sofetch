const LocalStrategy   = require('passport-local').Strategy;
const session = require('../config.js');
const passwordHash = require('../helpers/auth-helpers.js').generateHash;
const checkPassword = require('../helpers/auth-helpers.js').validPassword;
const helpers = require('../helpers/auth-helpers.js');
const flash = require('connect-flash');


module.exports = function(passport) {

    // LOCAL SIGNUP ============================================================
    passport.use('local-signup', new LocalStrategy(
        function(username, password, done) {
            helpers.authenticate(username, password, done);
        }
    ));

};