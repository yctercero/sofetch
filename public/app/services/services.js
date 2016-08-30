angular.module('app.services', [])
.factory('Auth', ['$http', '$location', function($http, $location){
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
}])
.factory('Log', ['$http', '$location', function($http, $location){
  var log = function(log){
    return $http({
      method: 'POST',
      url: '/logWalk',
      data: log
    })
  };

  var edit = function(log){
    return $http({
      method: 'PUT',
      url: '/log',
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

  var getLog = function(data){
    console.log(data);
    return $http({
      method: 'POST',
      url: '/log',
      data: {id: data}
    })
    .then(function(response){
      return response.data;
    })
  };

  var deleteLog = function(log){
    console.log(log);
    return $http({
      method: 'DELETE',
      url: '/log/' + log,
    })
  };

  return {
    log: log,
    edit: edit,
    getLogs: getLogs,
    getLog: getLog,
    deleteLog: deleteLog
  }
}])