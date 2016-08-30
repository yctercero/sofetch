angular.module('app', [
  'ui.router',
  'app.auth',
  'app.services',
  'app.timeline',
  'app.log'
])
.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/signup');

  $stateProvider
  .state('home', {
    url: '/home',
    templateUrl: 'app/timeline/timeline.html',
    controller: 'TimelineController'
  })
  .state('signup', {
    url: '/signup',
    templateUrl: 'app/auth/signup.html',
    controller: 'AuthController'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'app/auth/login.html',
    controller: 'AuthController'
  })
  .state('logWalk', {
    url: '/logWalk',
    templateUrl: 'app/logs/logWalk.html',
    controller: 'LogController'
  })
  .state('logMeal', {
    url: '/logMeal',
    templateUrl: 'app/logs/logMeal.html',
    controller: 'LogController'
  })
  .state('logMeds', {
    url: '/logMeds',
    templateUrl: 'app/logs/logMeds.html',
    controller: 'LogController'
  })
  .state('editLogMeds', {
    url: '/editLogMeds',
    templateUrl: 'app/logs/editLogMeds.html',
    controller: 'LogController'
  })
  .state('editLogWalk', {
    url: '/editLogWalk',
    templateUrl: 'app/logs/editLogWalk.html',
    controller: 'LogController'
  })
  .state('editLogMeal', {
    url: '/editLogMeal',
    templateUrl: 'app/logs/editLogMeal.html',
    controller: 'LogController'
  });

});