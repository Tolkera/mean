angular.module('app').controller('mvEditSprintCtrl', function($scope, mvNotifier, mvSprintOps, $location, tasks, sprint){

    $scope.selectTask = function(task){
        task.selectingTask = ! task.selectingTask;
    };

    var categories = tasks;
    $scope.sprint = sprint;

    $scope.sprint.contents.forEach(function(category){
        category.tasks.forEach(function(task){
            task.plan = [];
            for (var i = 0; i<task.planned; i++){
                var hour = {};
                if(i<task.spent){
                    hour.added = true;
                }
                task.plan.push(hour)
            }
        })
    });

    $scope.sprint.contents.forEach(function(sprintCategory){
        sprintCategory.tasks.forEach(function(sprintTask){
            categories.forEach(function(category, categoryIndex){
                category.tasks.forEach(function(task, taskIndex){
                    if (task._id == sprintTask.taskInfo._id){
                        categories[categoryIndex].tasks[taskIndex].planned = sprintTask.planned;
                        categories[categoryIndex].tasks[taskIndex].spent = sprintTask.spent;
                        categories[categoryIndex].tasks[taskIndex].selected = true;
                    }
                })
            })
        })

        $scope.categories = categories;
        calculateHours();
    })

    function calculateHours(){
        $scope.hours = 0;
        $scope.categories.forEach(function(element){
            element.tasks.forEach(function(element){
                if(element.planned){
                    $scope.hours += +element.planned;
                }
            })
        });
    };

    $scope.addHours = function(task, category){
        task.selectingTask = false;
        calculateHours();
        task.selected = true;
    };

    $scope.deleteTask = function(task){
        task.planned = "";
        $scope.addHours(task);
        task.selected = false;
    };

    $scope.calculate = function(){
        var sprintData = {
            created: $scope.sprint.created,
            current: true,
            contents: [],
            finish: $scope.sprint.finish
        };
        $scope.categories.forEach(function(category){
            if(category.tasks.some(checkAdded)){
                var categoryItem = {
                    categoryInfo: category._id,
                    tasks: []
                };
                category.tasks.forEach(function(task){
                    if(task.planned){
                        var taskItem = {
                            taskInfo: task._id,
                            planned: task.planned,
                            spent: task.spent || 0
                        };
                        categoryItem.tasks.push(taskItem)
                    }
                });
                sprintData.contents.push(categoryItem);
            }
        });
        function checkAdded(element){
            return element.planned;
        }

        mvSprintOps.editSprint(sprintData).then(function(){
            mvNotifier.notify('Your new sprint is created');
            $location.path('/current-sprint');
        }, function(){
            mvNotifier.notify('Sorry, there is some error');
        })
    };
})