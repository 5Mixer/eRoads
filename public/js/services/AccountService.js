angular.module('AccountService', ['ngCookies']).factory('Account', ['$state','$http','$rootScope','$cookies', function($state,$http, $rootScope, $cookies) {

    currentUser = $cookies.getObject('user') || { username: '', secure: false };

    var cookieExpireDate = new Date();
    cookieExpireDate.setDate(cookieExpireDate.getDate() + 1);

    return {
        user: currentUser,

        isLoggedIn : function (){
            return $cookies.getObject('user').secure || false;
        },
        logout: function(success, error) {
            this.user = {
                email: '',
                secure:false
            };
            $cookies.putObject('user',this.user);
            $state.go('anon.home');
        },


        login : function(user) {
            return $http.post('/login', user).success(function(_user){
                console.log("Login post returned "+JSON.stringify(user))
                this.user = _user;
                $cookies.putObject('user',this.user,{'expires':cookieExpireDate});
                console.log("Login Worked "+$cookies.get('user'));
                $state.go('user.home');
            }).error(function(e){
                console.log("Login failed "+e);
            });
        },

        signup : function(user) {
            return $http.post('/signup', user).success(function(user){
                this.user = user;
                $cookies.putObject('user',this.user);
                console.log("Signup Worked "+JSON.stringify(this.user));
                $state.go('user.home');
            }).error(function(e){
                console.log("Signup failed "+e);
            });
        }
    }

}]).run(['$state','$rootScope', '$location', 'Account', function ($state,$rootScope, $location, Account) {


    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {

        if (toState.data == undefined){
            console.log("Initial page load/No Secuirity specification.");
            return;
        }
        console.log(toState);
        console.log("Changing page. Next page is secure: "+toState.data.secure);

        if (toState.data.secure == true && Account.isLoggedIn() == false) {
            console.log("Redirecting to /login because account secure: "+Account.isLoggedIn()+" and next page secure:"+toState.data.secure);
            event.preventDefault();
            $location.path('/');
            $state.go('anon.login');
        }
        if (toState.data.secure == false && Account.isLoggedIn() == true) {
            console.log("Redirecting to / because account secure: "+Account.isLoggedIn()+" and next page secure:"+toState.data.secure);
            event.preventDefault();
            $state.go('user.home');
            $location.path('/');
        }
    });

}]);
