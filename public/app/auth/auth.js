angular.module('app.auth', [])
.controller('AuthController',['$scope', '$location', 'Auth', '$window', function($scope, $location, Auth, $window, $watch){
  angular.extend($scope, Auth);

  //trying to figure way to store username to use throughout app for personalization
  $scope.username = "Hello";

  $scope.hgt = { 'min-height': ($window.innerHeight) + 'px' };

  $scope.currentPath = $location.path();

  $scope.user = {};

  $scope.$watch('username', function(){
    $scope.username = $window.localStorage.getItem('currentUser');
  });

  $scope.clear = function(){
    $window.localStorage.setItem('logToPopulate', null);
  };

  $scope.signup = function(){
    Auth.signup($scope.user)
      .then(function(){
        $window.localStorage.setItem('currentUser', $scope.user.username);
        $scope.username = $window.localStorage.getItem('currentUser');
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
}]);