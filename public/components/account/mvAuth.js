angular.module('app').factory('mvAuth', function($http, $q, mvIdentity, mvUser){
    return {
        authenticateUser: function(username, password){
            var dfd = $q.defer();
            $http.post('/login', {username: username, password: password}).then(function(res){
                if (res.data.success){
                    mvIdentity.currentUser = new mvUser(res.data.user);
                    dfd.resolve(true);
                } else {
                    dfd.resolve(false);
                }
            });
            return dfd.promise;
        },

        logoutUser: function(){
            var dfd = $q.defer();
            $http.post('/logout', {logout: true}).then(function(){
                mvIdentity.currentUser = undefined;
                dfd.resolve();
            });
            return dfd.promise;
        },

        createUser: function(userData){
            var newUser = new mvUser(userData);
            var dfd = $q.defer();
            newUser.$save().then(function(){
                mvIdentity.currentUser = newUser;
                dfd.resolve();
            }, function(response){
                dfd.reject(response.data.reason)
            });

            return dfd.promise;
        },

        updateCurrentUser: function(userData){
            var dfd = $q.defer();
            var clone = angular.copy(mvIdentity.currentUser);
            angular.extend(clone, userData);

            clone.$update().then(function(){
                    mvIdentity.currentUser = clone;
                    dfd.resolve()
                }, function(response){
                    dfd.reject(response.data.reason)
                });

            return dfd.promise;
        },

        authorizeLoggedInUserForRout: function(){
            if(mvIdentity.isAuthenticated()){
                return true;
            } else {
                return $q.reject('not authorized')
            }
        }
    }
})