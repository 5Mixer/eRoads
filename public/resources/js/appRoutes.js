angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

   $routeProvider

	   // home page
	   .when('/', {
		   templateUrl: '/',
		   controller: 'MainController'
	   })

	   // nerds page that will use the NerdController
	   .when('/log', {
		   templateUrl: '/log',
		   controller: 'LogController'
	   });

   $locationProvider.html5Mode(true);

}]);
