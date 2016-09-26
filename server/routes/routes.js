const session = require('../config.js');
const passwordHash = require('../helpers/auth-helpers.js').generateHash;
const checkPassword = require('../helpers/auth-helpers.js').validPassword;
const path = require('path');


module.exports = function(app, passport){
    app.post('/users/signup', passport.authenticate('local-signup'));

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