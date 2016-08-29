angular.module('app', [

])
.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/signup');



});