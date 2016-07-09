angular.module('HomeCtrl', ['AccountService']).controller('HomeController', function($scope,Account) {
    $scope.Name = Account.getAccount().email;

    $scope.logout = Account.logout;

});
