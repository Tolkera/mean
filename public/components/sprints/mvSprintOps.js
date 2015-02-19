angular.module('app').factory('mvSprintOps', function($http, $q, mvSprint, mvIdentity, mvUser, mvSprintTask){
    return {
        addSprint: function(sprintData){
            var dfd = $q.defer();
            var sprint = new mvSprint(sprintData);
            sprint.$save().then(function(data){
                mvIdentity.currentUser.currentSprint = data._id;
                dfd.resolve();
            }, function(){
                dfd.reject();
            });
            return dfd.promise;
        },

        getCurrentSprint: function(data){
            var dfd = $q.defer();
            var sprint = new mvSprint({id: mvIdentity.currentUser.currentSprint});
            sprint.$get().then(function(data){
                mvIdentity.currentUser.currentSprint = data._id;
                dfd.resolve(data);
            }, function(){
                dfd.reject();
            });
            return dfd.promise;
        },

        finishSprint: function(){
            var dfd = $q.defer();
            var sprint = new mvSprint({id: mvIdentity.currentUser.currentSprint});
            sprint.$delete({finished: false}).then(function(res){
                mvIdentity.currentUser = new mvUser(res);
                dfd.resolve();
            }, function(){
                dfd.reject();
            });
            return dfd.promise;
        },

        updateSprint: function(data){
            var dfd = $q.defer();
            var sprint = new mvSprint(data);
            sprint.$update({id: mvIdentity.currentUser.currentSprint}).then(function(res){
                dfd.resolve();
            }, function(){
                dfd.reject();
            });
            return dfd.promise;
        },

        updateTaskHours: function(data, id){
            var dfd = $q.defer();
            var sprint = new mvSprintTask(data);
            sprint.$update({id: mvIdentity.currentUser.currentSprint, taskId: id}).then(function(){
                dfd.resolve();
            }, function(){
                dfd.reject();
            });
            return dfd.promise;
        },

        editSprint: function(data){
            var dfd = $q.defer();
            var sprint = new mvSprint(data);
            sprint.$update({id: mvIdentity.currentUser.currentSprint}).then(function(){
                dfd.resolve();
            }, function(){
                dfd.reject();
            });
            return dfd.promise;
        }
    }
});