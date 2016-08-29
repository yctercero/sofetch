angular.module('app.services', [])
.factory('Auth', function($http, $location){
  var signup = function(user){
    return $http({
      method: 'POST',
      url: '/users/signup',
      data: user
    });
  };

  var login = function(user){
    return $http({
      method: 'POST',
      url: '/users/login',
      data: user
    });
  };

  var userData = function(user){
    var user = {
      username: user.username
    }
    return user;
  }

  return {
    signup: signup,
    login: login,
    user: userData
  };
})
.factory('Log', function($http, $location){
  var log = function(log){
    return $http({
      method: 'POST',
      url: '/logWalk',
      data: log
    })
  };

  var getLogs = function(){
    return $http({
      method: 'GET',
      url: '/home'
    })
    .then(function (response) {
      return response.data;
    });
  };

  return {
    log: log,
    getLogs: getLogs
  }
})