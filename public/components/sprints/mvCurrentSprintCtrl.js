angular.module('app').controller('mvCurrentSprintCtrl', function($scope, mvNotifier, mvCategory, mvUser, mvSprintOps, mvIdentity, mvSprintTask, sprint){
    $scope.sprint = sprint;
    if(sprint){
        $scope.sprint.tasks.forEach(function(task){
            task.plan = [];
            for (var i = 0; i<task.sprint.planned; i++){
                var hour = {};
                if(i<task.sprint.spent){
                    hour.added = true;
                }
                task.plan.push(hour)
            }
        });

        $scope.currentDate = new Date();
        $scope.finish = new Date($scope.sprint.finish);

        $scope.deadlineMessage = {
            deadline: "Your deadline is " + moment($scope.finish).format('MMM Do dddd'),
            fromNow:   moment($scope.finish).fromNow()
        };

        if ($scope.currentDate > $scope.finish){
            $scope.deadlineMessage = 'You missed your deadline, bastard!'
        } else if ($scope.currentDate > $scope.finish) {
            $scope.deadlineMessage = 'Today is your deadline!'
        }

        $scope.finishSprint = function(){
            var deleteConfirmed = confirm('Sure?');
            if(deleteConfirmed) {
                mvSprintOps.finishSprint().then(function(){
                    mvNotifier.notify('Your sprint is finished! Congrats!');
                    $scope.sprint = false;
                }, function(){
                    mvNotifier.notify('Sorry, there is some error');
                })
            }
        };

        $scope.addHour = function(hour, task) {
            hour.added = !hour.added;
            if (hour.added) {
                ++task.sprint.spent;
            } else {
                --task.sprint.spent;
            }
            var taskId = task._id;
            mvSprintOps.updateTaskHours(task, taskId).then(function () {
                mvNotifier.notify('Saved!');
            }, function () {
                mvNotifier.notify('Sorry, there is some error');
            });
        }
    }

});