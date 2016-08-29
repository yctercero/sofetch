angular.module('app.log', [])
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
})