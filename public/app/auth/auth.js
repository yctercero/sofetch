angular.module('app.auth', [])
.controller('AuthController', function($scope, $location, Auth){
  angular.extend($scope, Auth);

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

});