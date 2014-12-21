angular.module('app').controller('mvCourseDetailsCtrl', function($scope, mvCourse, mvCachedCourse, $routeParams){
  //  $scope.course = mvCourse.get({id: $routeParams.id});

    mvCachedCourse.query().$promise.then(function(collection){
        collection.forEach(function(course){
            if(course._id === $routeParams.id){
                $scope.course = course;
            }
        })
    })
});