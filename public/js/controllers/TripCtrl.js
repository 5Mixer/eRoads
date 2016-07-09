angular.module('TripCtrl',['AccountService','LogService']).controller('TripController', function($scope, $rootScope,Account){

	$rootScope.bodyClass="autumn";


})

.directive('numberonly', function(){
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, modelCtrl) {

       modelCtrl.$parsers.push(function (inputValue) {
		   console.log("smelly fart" + inputValue)

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
