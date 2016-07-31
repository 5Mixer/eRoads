// Controller for creating trips.

angular.module('TripCtrl',['AccountService','TripService']).controller('TripController', function($scope, $rootScope,Account,Trip){

	$rootScope.bodyClass="autumn";

	var trip = {}; //'trip' is different to scope.trip as it doesn't have any pretty formatting, etc.
	$scope.trip = {
		odometer:undefined,
		traffic:undefined,
		light:undefined,
		parking: false,
		wet: false,
		localStreets: false,
		mainRoads: false,
		innerCity: false,
		freeway: false,
		ruralHighway: false,
		ruralStreets: false,
		gravel:false,
		registration: "",
		supervisor:"",
		startTime:undefined,
		endTime:undefined
	}

	function getTrip (){
		trip = angular.copy($scope.trip);
		trip.startTime = stringToDate(trip.startTime);
		trip.endTime = stringToDate(trip.endTime);
		return trip;
	}

	function stringToDate (time){
		var time = moment(time,'HH:mm')
		var date = moment().minute(time.minute()).hour(time.hour());
		// scope.end = date.toString();

		if (time.isValid() == false){
			return undefined;
		}else{
			return date.toDate();
		}
	}

	var time = moment($scope.trip.startTime,'HH:mm')
	var date = moment().minute(time.minute()).hour(time.hour());
	console.log(time.toString());
	$scope.end = "";

	$scope.start = function () {
		console.log(getTrip());
		Trip.createTrip(getTrip());
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
