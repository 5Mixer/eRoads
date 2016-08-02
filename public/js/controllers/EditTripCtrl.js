// Controller for creating trips.

angular.module('EditTripCtrl',['AccountService','TripService']).controller('EditTripController', function($scope, $rootScope,Account,Trip){

	$rootScope.bodyClass="autumn";


	var trip = Trip.expandedTrip; //'trip' is different to scope.trip as it doesn't have any pretty formatting, etc.

	console.log(Trip.expandedTrip)
	$scope.expandedTrip = angular.copy(Trip.expandedTrip);
	console.log( moment(trip.startTime).format('D/M/YYYY'));

	$scope.date = moment(trip.startTime).format('D/M/YYYY');

	$scope.expandedTrip.startTime = dateToTime($scope.expandedTrip.startTime);
	$scope.expandedTrip.endTime = dateToTime($scope.expandedTrip.endTime);

	$scope.startMeridian = (moment(Trip.expandedTrip.startTime).format('A') == "AM"); //true == am
	$scope.endMeridian = (moment(Trip.expandedTrip.endTime).format('A') == "AM"); //true == am

	$scope.toggleStartMeridian = function (){
		$scope.startMeridian = !$scope.startMeridian;
	}
	$scope.toggleEndMeridian = function (){
		$scope.endMeridian = !$scope.endMeridian;
	}


	function getTrip (){
		var t = angular.copy($scope.expandedTrip);

		t.startTime = stringToDate($scope.expandedTrip.startTime,$scope.startMeridian);
		t.endTime = stringToDate($scope.expandedTrip.endTime,$scope.endMeridian);
		t.odometerStart = parseInt($scope.expandedTrip.odometerStart);
		t.odometerEnd = parseInt($scope.expandedTrip.odometerEnd);
		return t;
	}

	function stringToDate (time,am){
		var time = moment(time,'HH:mm') //Get hour and minute in date form
		var date = moment($scope.date,'D/M/YYYY').minute(time.minute()).hour(time.hour()).second(0); //Get date and mutate time

		if (time.hour() < 12 && !am){
			date.add(12,'h');
		}
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
	var date = moment($scope.date,'D/M/YYYY').minute(time.minute()).hour(time.hour());

	console.log( moment(trip.startTime).format('D/M/YYYY'));

	$scope.end = "";

	$scope.delete = function (){
		console.log("Deleting trip.");
		Trip.deleteTrip(Trip.expandedTrip._id).then(function(){

			Trip.needsRefreshing = true;
		});

		$scope.closeThisDialog();
	}

	$scope.update = function () {
		console.log(getTrip());
		Trip.updateTrip(Trip.expandedTrip._id,getTrip()).then(function(){

			Trip.needsRefreshing = true;
		});
		$scope.closeThisDialog();
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
