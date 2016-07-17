angular.module('appRoutes', ['AccountService']).config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {

    $stateProvider.state('home',{
        url:'/',
        controller: function($scope,$state,Account) {
            if (Account.isLoggedIn()){
                $state.go('user.home');
            }else{
                $state.go('anon.home');
            }
        }
    })

   $stateProvider
        .state('anon',{
            abstract:true,
            template:"<ui-view/>",
            data: {
                secure: false
            }
        })
        .state('anon.home', {
            templateUrl: '/landing.html'
        })
        .state('anon.login', {
            url: '/login/',
            templateUrl: '/login.html',
            controller: 'LoginController'
        })
        .state('anon.signup', {
            url: '/signup/',
            templateUrl: 'signup.html',
            controller: 'SignUpController'
        });

    $stateProvider
        .state('user', {
            abstract: true,
            template: "<ui-view/>",
            data: {
                secure: true
            }
        })
        .state('user.home', {
            templateUrl: '/loggedIn.html'
        })
        .state('user.trip', {
            url: '/trip',
            templateUrl: '/trip.html'
        })
        .state('user.overview',{
            url:'/overview',
            templateUrl: '/overview.html'
        })
        .state('user.log', {
            url:'/log',
            templateUrl:"/log.html"
        });

	   // home page
	//    .when('/', {
	// 	   templateUrl: '/landing.html',
	// 	   controller: 'MainController',
    //        secure:false
	//    })
       //
       //
	//    .when('/log', {
	// 	   templateUrl: '/log.html',
	// 	   controller: 'LogController',
    //        secure:true
	//    })
       //
    //    .when('/signup', {
    //        templateUrl: '/signup.html',
    //        controller: 'SignUpController',
    //        secure:false
    //    })
       //
    //    .when('/login', {
    //        templateUrl: '/login.html',
    //        controller: 'LoginController',
    //        secure:false
    //    });

   $locationProvider.html5Mode(true);

}])
