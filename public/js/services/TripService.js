angular.module('TripService', []).factory('Trip', ['$http', function($http) {
    var expandedTrip = {};
    var needsRefreshing = false;
    return {
        expandedTrip: expandedTrip,
        needsRefreshing: needsRefreshing,

        getTrips : function() {
            return $http.get('/api/trips'); //Return promise.
        },
        getTrip : function (id) {
            return $http.get('/api/trips/'+id); //Return promise.
        },

        createTrip : function(trip) {
            this.needsRefreshing = true;
            return $http.post('/api/trips', trip);
        },
        updateTrip : function(id,trip) {
            this.needsRefreshing = true;
            return $http.post('/api/trips/' + id, trip);
        },

        deleteTrip : function(id) {
            this.needsRefreshing = true;
            return $http.delete('/api/trips/' + id);
        }
    }

}]);
