angular.module('app.auth', [])
.controller('AuthController', function($scope, $location, Auth){
  angular.extend($scope, Auth);


});