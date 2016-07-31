angular.module('TripService', []).factory('Trip', ['$http', function($http) {
    var expandedTrip = {};
    return {
        expandedTrip: expandedTrip,

        getTrips : function() {
            return $http.get('/api/trips'); //Return promise.
        },
        getTrip : function (id) {
            return $http.get('/api/trips/'+id); //Return promise.
        },

        createTrip : function(trip) {
            return $http.post('/api/trips', trip);
        },
        updateTrip : function(id,trip) {
            return $http.post('/api/trips/' + id, trip);
        },

        deleteTrip : function(id) {
            return $http.delete('/api/trips/' + id);
        }
    }

}]);
