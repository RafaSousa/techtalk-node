angular.module('Techtalk', ['ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/app/views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/login', {
        templateUrl: '/app/views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/chat', {
        templateUrl: '/app/views/chat.html',
        controller: 'ChatCtrl'
      })
      .otherwise('/');
  })
  .factory('config', function ($rootScope) {
    return {
      Urls: {
        URLService: "//localhost:8080"
      }
    };
  });