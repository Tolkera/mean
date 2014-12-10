angular.module('app').controller('mvRegisterCtrl', function($scope, mvAuth, mvNotifier, $location){

    $scope.register = function(){
        var newUser = {
            username: $scope.username,
            firstName: $scope.firstName,
            password: $scope.password
        };

        mvAuth.createUser(newUser).then(function(){
            mvNotifier.notify('you have just registered');
            $location.path('/')
        }, function(err){
            mvNotifier.error(err)
        });
    }
})