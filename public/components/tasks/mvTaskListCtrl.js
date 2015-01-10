angular.module('app').controller('mvTaskListCtrl', function($scope, mvAuth, mvIdentity, mvNotifier, mvTaskOps, mvTask){
    var userId = mvIdentity.currentUser._id;

    $scope.userTasks = mvTask.query({userId: userId});

    var successMessages = [
        'Good job!',
        'Carry on!',
        'Wow, you\'ve nailed it!',
        'Keep it up!',
        'Kudos to you, sir!',
        'Nice one!',
        'High five!',
        'Congrats!'
    ];

    $scope.randomizeMessage = function(){
        return successMessages[Math.floor(Math.random()*successMessages.length)]
    };

    $scope.addTask = function(){
        var taskData = {name: $scope.newTask, date: new Date(), done: false, userId: userId};
        $scope.userTasks.push({name: $scope.newTask, date: new Date(), done: false});
        $scope.newTask = '';
        mvTaskOps.createTask(taskData).then(function(){
            mvNotifier.notify('Your new task is saved');
        }, function(reason){
            mvNotifier.error(reason)
        });
    };

    $scope.markDone = function(task){
        task.done = true;
        mvTaskOps.updateTask(task).then(function(){
            mvNotifier.notify($scope.randomizeMessage());
        }, function(reason){
            mvNotifier.error(reason)
        });
    };

    $scope.markUndone = function(task){
        task.done = false;
        mvTaskOps.updateTask(task).then(function(){
            mvNotifier.notify('You still can do it!!');
        }, function(reason){
            mvNotifier.error(reason)
        });
    };

    $scope.deleteTask = function(index){
        mvTaskOps.deleteTask($scope.userTasks[index]).then(function(){
            mvNotifier.notify('Deleted');
            $scope.userTasks.splice(index, 1);
        }, function(reason){
            mvNotifier.error(reason)
        });
    };

    $scope.saveEditedTask = function(task){
        $scope.editing = false;
        mvTaskOps.updateTask(task).then(function(){
            mvNotifier.notify('Your task is updated!');
        }, function(reason){
            mvNotifier.error(reason)
        });
    };
});