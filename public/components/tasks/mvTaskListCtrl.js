angular.module('app').controller('mvTaskListCtrl', function($scope, mvAuth, mvIdentity, mvNotifier, $timeout){
    $scope.userTasks = mvIdentity.currentUser.tasks;
    $scope.hasTasks = ($scope.userTasks.length !== 0);

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
        $scope.userTasks.push({name: $scope.newTask, date: new Date(), done: false});
        $scope.newTask = '';
        updateData('Your new task is saved');
    //    $scope.hasTasks = ($scope.userTasks.length !== 0);
    };

    $scope.markDone = function(task){
        task.done = true;
        updateData($scope.randomizeMessage());
    };

    $scope.markUndone = function(task){
        task.done = false;
        updateData('You still can do it!');

    };

    $scope.deleteTask = function(index){
        $scope.userTasks.splice(index, 1);
        updateData('Deleted');
    };

    $scope.saveEditedTask = function(task){
        $scope.editing = false;
        updateData('Your task is updated!');
    };

    function updateData(message){
        mvAuth.updateCurrentUser({tasks: $scope.userTasks}).then(function(){
            mvNotifier.notify(message);
            $scope.hasTasks = ($scope.userTasks.length !== 0);
        }, function(reason){
            mvNotifier.error(reason)
        });
    }
});