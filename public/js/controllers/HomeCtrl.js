angular.module('HomeCtrl', ['AccountService']).controller('HomeController', function($scope,Account) {
    $scope.Name = Account.getAccount().email;
    $scope.$watch('Account.getAccount()',function(account){
        $scope.Name = account.email;
    });
    $scope.logout = Account.logout;

});
