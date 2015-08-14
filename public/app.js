angular.module('app',['ngResource', 'ngRoute', 'ngMessages', 'ui.bootstrap'] );

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
            templateUrl: '/components/main/about'
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

        .when('/tasks',{
            templateUrl: '/components/tasks/task-list',
            controller: 'mvTaskListCtrl',
            resolve: {
                auth: routeRoleChecker.user.auth,
                tasks: function(mvCategory, mvIdentity){
                    return mvCategory.query({userId: mvIdentity.currentUser._id});
                }
            }
        })
        .when('/current-sprint',{
            templateUrl: '/components/sprints/current-sprint',
            controller: 'mvCurrentSprintCtrl',
            resolve: {
                auth: routeRoleChecker.user.auth,
                sprint: function(mvSprintOps, mvIdentity){
                    if (mvIdentity.currentUser.currentSprint) {
                        return mvSprintOps.getCurrentSprint();
                    }
                    return false;
                }
            }
        })
        .when('/add-sprint',{
            templateUrl: '/components/sprints/add-sprint',
            controller: 'mvNewSprintCtrl',
            resolve: {
                auth: routeRoleChecker.user.auth,
                tasks: function(mvCategory){
                    return mvCategory.query();
                }
            }
        })
        .when('/edit-sprint',{
            templateUrl: '/components/sprints/edit-sprint',
            controller: 'mvEditSprintCtrl',
            resolve: {
                auth: routeRoleChecker.user.auth,
                sprint: function(mvSprintOps){
                    return mvSprintOps.getCurrentSprint();
                },
                tasks: function(mvCategory){
                    return mvCategory.query();
                }
            }
        })

});


angular.module('app').run(function($rootScope, $location){
    $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection){
            $location.path('/')
    })
});

