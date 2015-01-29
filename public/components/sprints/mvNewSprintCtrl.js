angular.module('app').controller('mvNewSprintCtrl', function($scope, mvNotifier, mvCategory, mvSprintOps, $location){

    $scope.categories = mvCategory.query();
    $scope.newSprintData = {};
    $scope.selectTask = function(task){
        task.selectingTask = ! task.selectingTask;
    };
    $scope.hours = 0;
    $scope.submitDisabled = function(){
        return $scope.hours == 0;
    };
    $scope.addHours = function(task, category){
        task.selectingTask = false;
        $scope.hours = 0;
        $scope.categories.forEach(function(element){
            element.tasks.forEach(function(element){
                if(element.taskHours){
                    $scope.hours += +element.taskHours;
                }
            })
        });
        task.added = true;
        $scope.submitDisabled();
    };

    $scope.deleteTask = function(task){
        task.taskHours = "";
        $scope.addHours(task);
        $scope.submitDisabled();
        task.added = false;
    };

    $scope.calculate = function(){

        var sprintData = {
            created: new Date(),
            current: true,
            contents: [],
            finish: $scope.date
        };

        $scope.categories.forEach(function(category){
           if(category.tasks.some(checkAdded)){

               var categoryItem = {
                   categoryInfo: category._id,
                   tasks: []
               };

               category.tasks.forEach(function(task){
                   if(task.added){
                       var taskItem = {
                           taskInfo: task._id,
                           planned: task.taskHours,
                           spent: 0
                       };
                       categoryItem.tasks.push(taskItem)
                   }
               });
               sprintData.contents.push(categoryItem);
           }
        });

        function checkAdded(element){
            return element.added;
        }

        mvSprintOps.addSprint(sprintData).then(function(){
            mvNotifier.notify('Your new sprint is created');
            $location.path('/current-sprint');
        }, function(){
            mvNotifier.notify('Sorry, there is some error');
        })
    }
});
