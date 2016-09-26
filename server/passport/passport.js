const LocalStrategy   = require('passport-local').Strategy;
const session = require('../config.js');
const passwordHash = require('../helpers/auth-helpers.js').generateHash;
const checkPassword = require('../helpers/auth-helpers.js').validPassword;
const helpers = require('../helpers/users-helpers.js');
const flash = require('connect-flash');


module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        console.log("USER", user);
        done(null, user.records[0]._fields[0].identity.low);
    });

    passport.deserializeUser(function(id, done) {
        helpers.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // LOCAL SIGNUP ============================================================
    passport.use('local-signup', new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true 
        },
        function(req, username, password, done) {

            process.nextTick(function() {

                helpers.findByUsername(username, function(err, user){
                    if (err) { return done(err) };
                    if (user) { return done(null, false, { message: 'That email is already taken.' })};
                    if (!user) { 
                        const password = passwordHash(req.body.password);
                        session
                            .run(`CREATE (n:User {username: "${req.body.username}", password: "${password}"}) RETURN n`)
                            .then(function(result){
                                return done(null, result);
                            })
                            .catch(function(err){
                                console.log("Error", err);
                            });
                    }
                })
            });

        }));

};