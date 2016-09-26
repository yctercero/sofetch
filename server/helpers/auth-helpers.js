const bcrypt = require('bcrypt-nodejs');
const session = require('../config.js');
const jwt = require('jsonwebtoken');
const SECRET = 'keep this server secret secret please and thank you';
const TOKENTIME = 120 * 60;
const usersHelpers = require('../helpers/users-helpers.js');
const hashHelpers = require('../helpers/hash-helpers.js');

module.exports = {
    generateHash: function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    },

    validPassword: function(password, hash) {
        return bcrypt.compareSync(password, hash);
    },

    authenticate: function(username, password, done){
        usersHelpers.findByUsernamePassword(username, password, function(err, user){
            if (err) { return done(err) };
            if (user) { return console.error('That email is already taken.' )};
            if (!user) { 
                console.log("IM HERE");
                const hash = hashHelpers.generateHash(password);
                console.log("HASH", hash)
                session
                    .run(`CREATE (n:User {username: "${username}", password: "${hash}"}) RETURN n`)
                    .then(function(result){
                        done(null, result);
                    })
                    .catch(function(err){
                        console.log("Error", err);
                        return done(err);
                    });
            }
        })
    },

    serializeUser: function(req, res, next){
        console.log("CHECK CHECK")
        usersHelpers.findByUsernamePassword(req.body.username, req.body.password, function(err, user){
            if (err) { return next(err) };
           
            req.user = {
                id: user.records[0]._fields[0].identity.low
            };
            next();
        })
    },

    generateToken: function(req, res, next) {
        req.token = jwt.sign({
            id: req.user.id
        }, SECRET, {
            expiresIn: TOKENTIME
        });
        next();
    },

    respond: function(req, res){
        console.log("TOKEN", req.token)
        res.status(200).json({
            user: req.user,
            token: req.token
        });
    }
};