const session = require('../config.js');
const passwordHash = require('../helpers/auth-helpers.js').generateHash;
const checkPassword = require('../helpers/auth-helpers.js').validPassword;
const serialize = require('../helpers/auth-helpers.js').serializeUser;
const generateToken = require('../helpers/auth-helpers.js').generateToken;
const respond = require('../helpers/auth-helpers.js').respond;
const path = require('path');


module.exports = function(app, passport){
    app.post('/users/signup', passport.initialize(), passport.authenticate('local-signup', {
        //token based auth doesn't need session
        session: false
    }), serialize, generateToken, respond);

    app.get('*', function(req, res) {
        res.sendFile(path.resolve(__dirname + '/../../public/index.html'));
    });

}


// app.post('/users/signup', passport.authenticate('local-signup'));
// app.get('/home', logController.getLogs);


// app.put('/log', logController.updateLog);

// app.delete('/log/:log_id', logController.deleteLog);

// app.post('/log', logController.editLog);
// // app.post('/users/signup', userController.signup);
// app.post('/users/login', userController.login);
// app.post('/logWalk', logController.log);