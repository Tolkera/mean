angular.module('app').controller('mvTaskListCtrl', function($scope, mvNotifier, mvTaskOps, mvTask, mvCategory, mvCategoryOps, tasks){

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

   $scope.categories = tasks;

   $scope.addTask = function(category, newTask){
       var taskData = {name: newTask, created: new Date(), done: false, category: category._id};
       mvTaskOps.createTask(taskData).then(function(data){
           category.tasks.push(data);
           category.newTask = "";
           mvNotifier.notify('Your new task is saved');
       });
    };

    $scope.deleteTask = function(category, task, index){
        var deleteConfirmed = confirm('Sure?');
        if(deleteConfirmed) {
            mvTaskOps.deleteTask(task).then(function(){
                mvNotifier.notify('The task is deleted');
                category.tasks.splice(index, 1);
            });
        }
    };

    $scope.saveEditedTask = function(task){
        mvTaskOps.updateTask(task)
    };

    $scope.addCategory = function(){
        var categoryData = {name: $scope.newCategory, date: new Date()};
        $scope.newCategory = "";
        mvCategoryOps.createCategory(categoryData).then(function(data){
            $scope.categories.push(data);
            mvNotifier.notify('Your new category is saved');
        });
    };

    $scope.saveEditedCategory = function(category){
        mvCategoryOps.updateCategory(category);
    };

    $scope.deleteCategory = function(category, index){
        var deleteConfirmed = confirm('Sure?');
        if(deleteConfirmed) {
            mvCategoryOps.deleteCategory(category).then(function(){
                $scope.categories.splice(index, 1);
                mvNotifier.notify('Your category is deleted!');
            });
        }
    }
});
