angular.module('AccountService', []).factory('Account', ['$http', function($http) {



    return {
        // call to get all nerds
        login : function(user) {
            return $http.post('/login', user);
        },

        signup : function(user) {
            // return $http.post({
            //     method: 'POST',
            //     url:'/signup',
            //     data:{email:user.email, password:user.password, name:user.name, license:user.license}
            // });
            return $http.post('/signup', user);
        }
    }

}]);
