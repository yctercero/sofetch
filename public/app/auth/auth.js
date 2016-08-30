angular.module('app.auth', [])
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
}]);