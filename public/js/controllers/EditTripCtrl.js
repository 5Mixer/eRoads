// Controller for creating trips.

angular.module('EditTripCtrl',['AccountService','TripService']).controller('EditTripController', function($scope, $rootScope,Account,Trip){

	$rootScope.bodyClass="autumn";

	var trip = Trip.expandedTrip; //'trip' is different to scope.trip as it doesn't have any pretty formatting, etc.

	console.log(Trip.expandedTrip)
	$scope.expandedTrip = angular.copy(Trip.expandedTrip);

	$scope.expandedTrip.startTime = dateToTime($scope.expandedTrip.startTime);
	$scope.expandedTrip.endTime = dateToTime($scope.expandedTrip.endTime);


	function getTrip (){
		var t = angular.copy($scope.expandedTrip);

		t.startTime = stringToDate($scope.expandedTrip.startTime);
		t.endTime = stringToDate($scope.expandedTrip.endTime);
		t.odometerStart = parseInt($scope.expandedTrip.odometerStart);
		t.odometerEnd = parseInt($scope.expandedTrip.odometerEnd);
		return t;
	}

	function stringToDate (time){
		var time = moment(time,'HH:mm')
		var date = moment(trip.startTime).minute(time.minute()).hour(time.hour()).second(0);
		// scope.end = date.toString();

		if (time.isValid() == false){
			return undefined;
		}else{
			return date.toDate();
		}
	}
	function dateToTime (date){
		return moment(date).format('h:mm');
	}
	function dateToCal (date){
		return moment(date).format('D/M/YYYY');
	}

	var time = moment($scope.expandedTrip.startTime,'HH:mm')
	var date = moment().minute(time.minute()).hour(time.hour());
	console.log(time.toString());
	$scope.end = "";

	$scope.update = function () {
		console.log(getTrip());
		Trip.updateTrip(Trip.expandedTrip._id,getTrip());
	}

})

.directive('time', function(){
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, modelCtrl) {

       modelCtrl.$parsers.push(function (inputValue) {

			var time = moment(inputValue,'HH:mm')
			var date = moment().minute(time.minute()).hour(time.hour());
			// scope.end = date.toString();

			if (time.isValid() == false && inputValue != ""){
				scope.end = "Invalid time";
			}else{
				scope.end = "";
			}

			return inputValue;
    	});

    	}
	};
})


.directive('numberonly', function(){
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, modelCtrl) {

       modelCtrl.$parsers.push(function (inputValue) {

			var transformedInput = myString = inputValue.replace(/\D/g,'');

			if (transformedInput!=inputValue) {
				modelCtrl.$setViewValue(transformedInput);
				modelCtrl.$render();
			}

         return transformedInput;
       });
     }
   };
});
