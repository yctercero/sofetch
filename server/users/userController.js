var User = require('./userModel.js');
var bluebird = require('bluebird');

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

    User.findOne({username: username, password: password}).exec(function(err, user){
      if(!user){
        res.send(500, err);
      }else{
        res.send(200, user);
      }
    })
  }
}