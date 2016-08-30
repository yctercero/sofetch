var User = require('./userModel.js');
var Q = require('q');

var findUser = Q.nbind(User.findOne, User);

module.exports = {
  signup: function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    console.log(username);
    console.log(password);
    User.findOne({ username: username }).exec(function(err, found){
      if(found){
        res.send(200, found);
      }else{
        var newUser = new User({
          username: username,
          password: password
        });
        newUser.save(function(err, newUser){
          if(err){
            res.send(500, err);
          }
        });
      }
    })
  },

  login: function(req, res){
    var username = req.body.username;
    var password = req.body.password;

    findUser({username: username})
      .then(function (user) {
        if (!user) {
          next(new Error('User does not exist'));
        } else {
          return user.checkPasswords(password)
            .then(function (foundUser) {
              if (foundUser) {
                res.json(200, foundUser);
              } else {
                return next(new Error('No user'));
              }
            });
        }
      })
  }
};