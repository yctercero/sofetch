angular.module('app.timeline', [])
.controller('TimelineController', ['$scope', 'Log', '$window', function($scope, Log, $window){
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
    $window.localStorage.setItem('logToPopulate', index);
  };

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