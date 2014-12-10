angular.module('app').controller('mvLoginCtrl', function($scope, $http, $location, mvNotifier, mvIdentity, mvAuth){
    $scope.identity = mvIdentity;
    $scope.login = function(username, password){
        mvAuth.authenticateUser(username, password).then(function(success){
            if (success) {
                mvNotifier.notify('you logged in');
            } else {
                mvNotifier.error('incorrect!');
            }
        });
    };

    $scope.logout = function(){
        mvAuth.logoutUser().then(function(){
            $scope.username = "";
            $scope.password = "";
            mvNotifier.notify('You signed out');
            $location.path('/');
        })
    }
});