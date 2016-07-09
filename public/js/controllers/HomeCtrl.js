angular.module('HomeCtrl', ['AccountService']).controller('HomeController', function($scope,Account) {
    $scope.Name = Account.user.email;
    $scope.logout = Account.logout;

});
