angular.module('app',['ngResource', 'ngRoute', 'ngMessages'] );

angular.module('app').config(function($routeProvider, $locationProvider){

    var routeRoleChecker = {
        user: {
            auth: function(mvAuth){
                return mvAuth.authorizeLoggedInUserForRout()
            }
        }
    };

    $locationProvider.html5Mode(true);

    $routeProvider
        .when('/',{
            templateUrl: '/components/main/main',
        })
        .when('/about',{
            templateUrl: '/components/main/about',
        })
        .when('/register',{
            templateUrl: '/components/account/register',
            controller: 'mvRegisterCtrl'
        })
        .when('/profile',{
            templateUrl: '/components/account/profile',
            controller: 'mvProfileCtrl',
            resolve: routeRoleChecker.user
        })
        .when('/courses',{
            templateUrl: '/components/courses/course-list',
            controller: 'mvCourseListCtrl',
            resolve: routeRoleChecker.user
        })
        .when('/courses/:id',{
            templateUrl: '/components/courses/course-details',
            controller: 'mvCourseDetailsCtrl',
            resolve: routeRoleChecker.user
        })

        .when('/tasks',{
            templateUrl: '/components/tasks/task-list',
            controller: 'mvTaskListCtrl',
            resolve: routeRoleChecker.user
        })

});


angular.module('app').run(function($rootScope, $location){
    $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection){
            $location.path('/')
    })
});

