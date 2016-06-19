angular.module('LogService', []).factory('Log', ['$http', function($http) {

    return {
        // call to get all nerds
        get : function() {
            return $http.get('/api/logs');
        },

        // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new log
        create : function(nerdData) {
            return $http.post('/api/logs', nerdData);
        },

        // call to DELETE a log
        delete : function(id) {
            return $http.delete('/api/logs/' + id);
        }
    }

}]);
