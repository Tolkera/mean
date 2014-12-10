angular.module('app').controller('mvProfileCtrl', function($scope, mvNotifier, mvIdentity, mvAuth){
    $scope.username = mvIdentity.currentUser.username;
    $scope.firstName = mvIdentity.currentUser.firstName;

    $scope.update = function(){
        var newUserData = {
            username: $scope.username,
            firstName: $scope.firstName
        };

        if ($scope.password && $scope.password.length > 0){
            newUserData.password = $scope.password;
        }

        mvAuth.updateCurrentUser(newUserData).then(function(){
            mvNotifier.notify('The information is saved')
        }, function(reason){
            mvNotifier.error(reason)
        });
    }
})