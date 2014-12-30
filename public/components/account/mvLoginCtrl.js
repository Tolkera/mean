angular.module('app').controller('mvLoginCtrl', function($scope, mvAuth, $http, $location, mvNotifier, mvIdentity){
    $scope.identity = mvIdentity;

    $scope.login = function(username, password){
        mvAuth.authenticateUser(username, password).then(function(success){
            if (success) {
               mvNotifier.notify('You logged in!');
                $location.path('/');
            } else {
                mvNotifier.error('Incorrect!');
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
    };

    $scope.isNavActive = function(data){
        return $location.path() == data
    }
});