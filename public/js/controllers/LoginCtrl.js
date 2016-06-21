angular.module('LoginCtrl',['AccountService']).controller('LoginController', function($scope,Account){
	$scope.user = {email:"",password:""};

	

	$scope.submit = function () {
		Account.login($scope.user);
		$scope.user = {email:"",password:""};
	}

});
