angular.module('app').controller('mvEditSprintCtrl', function($scope, mvNotifier, mvSprintOps, $location, tasks, sprint){
    $scope.sprint = sprint;
    $scope.categories = tasks;

    $scope.dates = {
        minDate: new Date(),
        finish: moment($scope.minDate).add(2, 'weeks').format()
    };

    calculateHours();

    $scope.addHours = function(task){
        if(task.sprint.planned > 0) {
            task.selecting = false;
            calculateHours();
            task.sprint.current = true;
        }
    };

    $scope.deleteTask = function(task){
        task.sprint.planned = "";
        task.selecting = false;
        task.sprint.current = false;
        calculateHours();
    };

    function calculateHours(){
        $scope.hours = 0;
        $scope.categories.forEach(function(element){
            element.tasks.forEach(function(task){
                if(task.sprint.planned){
                    $scope.hours += +task.sprint.planned;
                }
            })
        });
    }

    $scope.saveSprint = function(){

        var updatedTasks = [];
        _.each($scope.categories, function(category){
           updatedTasks.push(_.filter(category.tasks, function(task){
                return task.sprint.current;
            }))
        });

        updatedTasks = _.flatten(updatedTasks);

        var oldTasks = _.pluck($scope.sprint.tasks, '_id');
        var newTasks = _.pluck(updatedTasks, '_id');

        $scope.sprint.tasks = updatedTasks;
        $scope.sprint.removedTasks = [];
        $scope.sprint.finish = $scope.dates.finish;

        _.each(oldTasks, function(task){
            if (!_.contains(newTasks, task)){
                $scope.sprint.removedTasks.push(task);
            }
        });

        mvSprintOps.editSprint($scope.sprint).then(function(){
            mvNotifier.notify('Your new sprint is created');
            $location.path('/current-sprint');
        }, function(){
            mvNotifier.notify('Sorry, there is some error');
        })
    };
})