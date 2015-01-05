angular.module('app').factory('mvTaskOps', function($http, $q, mvIdentity, mvTask){
    return {

        createTask: function(taskData){
            var newTask = new mvTask(taskData);
            var dfd = $q.defer();
            newTask.$save().then(function(){
                dfd.resolve();
            }, function(response){
                dfd.reject(response.data.reason)
            });
            return dfd.promise;
        },

        deleteTask: function(taskData){
            var dfd = $q.defer();
            var deletedTask = new mvTask(taskData);
            deletedTask.$delete({_id: taskData._id}).then(function(){
                dfd.resolve();
            }, function(response){
                dfd.reject(response.data.reason)
            });
            return dfd.promise;
        },

        updateTask: function(task){
            var dfd = $q.defer();
            var clone = new mvTask();
            angular.extend(clone, task);

            clone.$update().then(function(){
                dfd.resolve()
            }, function(response){
                dfd.reject(response.data.reason)
            });
            return dfd.promise;
        }
    }
})