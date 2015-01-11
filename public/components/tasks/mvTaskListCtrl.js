angular.module('app').controller('mvTaskListCtrl', function($scope, mvAuth, mvIdentity, mvNotifier, mvTaskOps, mvTask, mvCategory, mvCategoryOps){
    var userId = mvIdentity.currentUser._id;

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

   $scope.categories = mvCategory.query();

   $scope.addTask = function(category, newTask){
       var taskData = {name: newTask, date: new Date(), done: false, userId: userId, category: category._id};
       mvTaskOps.createTask(taskData).then(function(data){
           category.tasks.push(data);
           category.newTask = "";
           mvNotifier.notify('Your new task is saved');
       }, function(reason){
           mvNotifier.error(reason)
       });
    };

    $scope.deleteTask = function(category, task, index){
        mvTaskOps.deleteTask(task).then(function(){
            mvNotifier.notify('Deleted');
            category.tasks.splice(index, 1);
        }, function(reason){
            mvNotifier.error(reason)
        });
    };

    $scope.saveEditedTask = function(task){
        mvTaskOps.updateTask(task).then(function(){
            mvNotifier.notify('Your task is updated!');
        }, function(reason){
            mvNotifier.error(reason)
        });
    };

    $scope.addCategory = function(){
        var categoryData = {name: $scope.newCategory, userId: userId, date: new Date()};
        $scope.newCategory = "";
        mvCategoryOps.createCategory(categoryData).then(function(data){
            $scope.categories.push(data);
            mvNotifier.notify('Your new category is saved');
        }, function(reason){
            mvNotifier.error(reason)
        });
    };

    $scope.saveEditedCategory = function(category){
        mvCategoryOps.updateCategory(category).then(function(){
            mvNotifier.notify('Your category is updated!');
        }, function(reason){
            mvNotifier.error(reason)
        });
    };

    $scope.deleteCategory = function(category, index){
        mvCategoryOps.deleteCategory(category).then(function(){
            $scope.categories.splice(index, 1);
            mvNotifier.notify('Your category is deleted!');
        }, function(reason){
            mvNotifier.error(reason)
        });
    }
});
