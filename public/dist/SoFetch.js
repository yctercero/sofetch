angular.module('app', [
  'ui.router',
  'app.auth',
  'app.services',
  'app.timeline',
  'app.log'
])
.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/signup');

  $stateProvider
  .state('home', {
    url: '/home',
    templateUrl: 'app/timeline/timeline.html',
    controller: 'TimelineController'
  })
  .state('signup', {
    url: '/signup',
    templateUrl: 'app/auth/signup.html',
    controller: 'AuthController'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'app/auth/login.html',
    controller: 'AuthController'
  })
  .state('logWalk', {
    url: '/logWalk',
    templateUrl: 'app/logs/logWalk.html',
    controller: 'LogController'
  });

});;angular.module('app.auth', [])
.controller('AuthController',['$scope', '$location', 'Auth', function($scope, $location, Auth){
  angular.extend($scope, Auth);

  //trying to figure way to store username to use throughout app for personalization
  $scope.username = "Hello";

  $scope.user = {};

  $scope.signup = function(){
    Auth.signup($scope.user)
      .then(function(){
        $location.path('/home');
      })
      .catch(function(error){
        console.error(error);
      })
  };

  $scope.login = function(){
    Auth.login($scope.user)
      .then(function(){
        $location.path('/home');
      })
      .catch(function(error){
        console.error(error);
      });
  };
}]);;angular.module('app.log', [])
.controller('LogController', function($scope, $location, Log){
  angular.extend($scope, Log);

  $scope.log = {};

  $scope.logThis = function(){
    Log.log($scope.log)
      .then(function(){
        $location.path('/home');
      })
      .catch(function(error){
        console.error(error);
      });
  };
});angular.module('app.services', [])
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
      method: 'GET',
      url: '/logWalk',
      data: data
    })
    .then(function(response){
      return response.data;
    })
  };

  return {
    log: log,
    getLogs: getLogs,
    getLog: getLog
  }
}]);angular.module('app.timeline', [])
.controller('TimelineController', ['$scope', 'Log', function($scope, Log){
  angular.extend($scope, Log);

  $scope.showDetails = false;



  $scope.data = {
    logs: []
  };

  $scope.logToFind = {
    id: null
  };

  // $scope.toggle = function(index){
  //   $scope.data.logs[index].showDetails = $scope.data.logs[index].showDetails ? false : true;
  // };

  $scope.toggle = function(){
    $scope.showDetails = $scope.showDetails ? false : true;
  };

  $scope.getLog = function(index){
    $scope.logToFind.id = $scope.data.logs[index]._id;
    Log.getLog($scope.logToFind);
  }

  $scope.getLogs = function(){
    Log.getLogs()
      .then(function(data){
        console.log(data);
        $scope.data.logs = data;
      })
      .catch(function(err){
        console.error(err);
      })
  };

  $scope.getLogs();
}]);