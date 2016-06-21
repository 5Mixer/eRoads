angular.module('SignUpCtrl',['AccountService']).controller('SignUpController', function($scope,Account){
	$scope.user = {name:"",email:"",password:"",license:""};

	$scope.submit = function () {
		Account.signup($scope.user);
		$scope.user = {name:"",email:"",password:"",license:""};
	}

});
