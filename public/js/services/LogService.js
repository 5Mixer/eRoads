angular.module('LogService', []).factory('Log', ['$http', function($http) {
    return {
        // call to get all nerds
        getTrips : function() {
            return $http.get('/api/trips');
        },

        // call to POST and create a new log
        createTrip : function(trip) {
            return $http.post('/api/trips', trip);
        },

        // call to DELETE a log
        deleteTrip : function(id) {
            return $http.delete('/api/trips/' + id);
        }
    }

}]);
