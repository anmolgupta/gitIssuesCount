var app = angular.module('myApp',['ngRoute']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: '../partials/gitURL.html',
        controller: 'gitUrlController'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
