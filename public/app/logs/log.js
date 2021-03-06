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
        $scope.log.id = data._id;
        console.log(data);
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

  $scope.editThis = function(){
    console.log($scope.log);
    Log.edit($scope.log)
      .then(function(){
        $window.localStorage.setItem('logToPopulate', null);
        $location.path('/home');
      })
      .catch(function(error){
        console.error(error);
      });
  };

  $scope.deleteLog = function(log){
    console.log(log);
    Log.deleteLog(log)
      .then(function(){
        $window.localStorage.setItem('logToPopulate', null);
        $location.path('/home');
      })
      .catch(function(error){
        console.error(error);
      });
  }
})