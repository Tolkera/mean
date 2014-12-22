angular.module('app').controller('mvCourseListCtrl', function($scope, mvCachedCourse, mvCourse, mvAuth, mvNotifier, mvUser, mvIdentity){
    $scope.courses = mvCachedCourse.query();
    $scope.userCourses = mvIdentity.currentUser.courses;

    $scope.sortOptions = [
        {value: 'title', text: 'Sort by Title'},
        {value: 'published', text: 'Sort by Published date'}
    ];

    $scope.sortOrder = $scope.sortOptions[0].value;
    $scope.addCourse = function(){
        $scope.userCourses.push($scope.courseInput);
        $scope.courseInput = '';

        var coursesAdded = {
            courses: $scope.userCourses
        };

        mvAuth.updateCurrentUser(coursesAdded).then(function(){
            mvNotifier.notify('Your new course is saved')
        }, function(reason){
            mvNotifier.error(reason)
        });
    }
});