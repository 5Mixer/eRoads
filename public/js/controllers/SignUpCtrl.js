angular.module('SignUpCtrl',['AccountService']).controller('SignUpController', function($scope,$rootScope,Account){
	$scope.user = {name:"",email:"",password:"",license:""};

	$rootScope.bodyClass = "pure";

	$scope.submit = function () {
		Account.signup($scope.user);
		$scope.user = {name:"",email:"",password:"",license:""};
	}

});
