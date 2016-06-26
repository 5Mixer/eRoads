angular.module('LoginCtrl',['AccountService']).controller('LoginController', function($scope, $rootScope,Account){
	$scope.user = {email:"",password:""};

	$rootScope.bodyClass="autumn";

	$scope.submit = function () {
		Account.login($scope.user);
		$scope.user = {email:"",password:""};
	}

});
