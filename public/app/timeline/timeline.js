angular.module('app.timeline', [])
.controller('TimelineController', function($scope, Log){
  angular.extend($scope, Log);

  $scope.data = {
    logs: []
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
})