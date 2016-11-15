angular.module('KelseyNichols', ['ngRoute', 'ngResource', 'KelseyNichols.controllers'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider
  .when('/', {
    templateUrl: 'views/home.html',
    controller: 'HomeController'
  })
  .otherwise({
    redirectTo: '/'
  })
}]);
