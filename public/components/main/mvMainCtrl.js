angular.module('app').controller('mvMainCtrl', function($scope, mvCachedCourse, mvCourse){
    $scope.courses = mvCachedCourse.query();
});