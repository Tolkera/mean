angular.module('app').factory('mvCategoryOps', function($http, $q, mvIdentity, mvCategory){
    return {
        createCategory: function(category){
            var newTask = new mvCategory(category);
            var dfd = $q.defer();
            newTask.$save().then(function(data){
                dfd.resolve(data);
            }, function(response){
                dfd.reject(response.data.reason)
            });
            return dfd.promise;
        },

        updateCategory: function(category){
            var dfd = $q.defer();
            var updatedTask = new mvCategory(category);

            updatedTask.$update().then(function(){
                dfd.resolve()
            }, function(response){
                dfd.reject(response.data.reason)
            });
            return dfd.promise;
        },

        deleteCategory: function(category){
            var dfd = $q.defer();
            category.$delete({_id: category._id}).then(function(){
                dfd.resolve();
            }, function(response){
                dfd.reject(response.data.reason)
            });
            return dfd.promise;
        }
    }
});