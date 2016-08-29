angular.module('app', [
  'ui.router',
  'app.auth',
  'app.services',
  'app.timeline'
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
  });

});