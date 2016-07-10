angular.module('TripCtrl',['AccountService','LogService']).controller('TripController', function($scope, $rootScope,Account,Log){

	$rootScope.bodyClass="autumn";

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
		supervisor:""
	}

	$scope.start = function () {
		console.log($scope.trip);
		Log.createTrip($scope.trip);
	}

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
