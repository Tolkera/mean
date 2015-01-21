angular.module('app').factory('mvTaskOps', function($http, $q, mvIdentity, mvTask){
    return {

        createTask: function(taskData){
            var newTask = new mvTask(taskData);
            var dfd = $q.defer();
            newTask.$save().then(function(data){
                dfd.resolve(data);
            }, function(response){
                dfd.reject(response.data.reason)
            });
            return dfd.promise;
        },

        deleteTask: function(task){
            var dfd = $q.defer();
            var deletedTask = new mvTask(task);
            deletedTask.$delete({id: task._id}).then(function(){
                dfd.resolve();
            }, function(response){
                dfd.reject(response.data.reason)
            });
            return dfd.promise;
        },

        updateTask: function(task){
            var dfd = $q.defer();
            var updatedTask = new mvTask(task);
            updatedTask.$update({id: task._id}).then(function(){
                dfd.resolve()
            }, function(response){
                dfd.reject(response.data.reason)
            });
            return dfd.promise;
        }
    }
})