angular.module('app',['ngResource', 'ngRoute'] );

angular.module('app').config(function($routeProvider, $locationProvider){

    var routeRoleChecker = {
        user: {
            auth: function(mvAuth){
                return mvAuth.authorizeLoggedInUserForRout()
            }
        }
    }

    $locationProvider.html5Mode(true);

    $routeProvider
        .when('/',{
            templateUrl: '/components/main/main',
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
});


angular.module('app').run(function($rootScope, $location){
    $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection){
            $location.path('/')
    })
})

