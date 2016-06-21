angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

   $routeProvider

	   // home page
	   .when('/', {
		   templateUrl: '/landing.html',
		   controller: 'MainController'
	   })

	   // nerds page that will use the NerdController
	   .when('/log', {
		   templateUrl: '/log.html',
		   controller: 'LogController'
	   })

       .when('/signup', {
           templateUrl: '/signup.html',
           controller: 'SignUpController'
       })

       .when('/login', {
           templateUrl: '/login.html',
           controller: 'LoginController'
       })
       ;

   //$locationProvider.html5Mode(true);

}]);
