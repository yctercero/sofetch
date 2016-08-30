angular.module('app.log', [])
.controller('LogController', function($scope, $location, Log, $window){
  angular.extend($scope, Log);

  $scope.logInfoToPop;

  $scope.log = {};

  if($window.localStorage.getItem('logToPopulate') !== null){
    var logToPopulate = $window.localStorage.getItem('logToPopulate');
    Log.getLog(logToPopulate)
      .then(function(data){
        $scope.logInfoToPop = data;
      })
      .catch(function(error){
        console.error(error);
      });
  };

  $scope.logThis = function(){
    Log.log($scope.log)
      .then(function(){
        $window.localStorage.setItem('logToPopulate', null);
        $location.path('/home');
      })
      .catch(function(error){
        console.error(error);
      });
  };
})