angular.module('HomeCtrl', ['AccountService']).controller('HomeController', function($scope,Account,$state) {
    $scope.Name = Account.getAccount().email;
    $scope.email = Account.getAccount().email;

    $scope.logout = Account.logout;

    if (Account.isLoggedIn() == false){
        $state.go('anon.login');
    }
});
