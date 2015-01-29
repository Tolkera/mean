angular.module('app').controller('mvCurrentSprintCtrl', function($scope, mvNotifier, mvCategory, mvUser, mvSprintOps, mvIdentity, $location){
    $scope.currentSprint = mvIdentity.currentUser.currentSprint;
    if($scope.currentSprint){
        mvSprintOps.getCurrentSprint().then(function(data){
            $scope.sprint = data;
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

            $scope.currentDate = new Date();
            $scope.finish = new Date($scope.sprint.finish);

            $scope.deadlineMessage = 'Your deadline is ' + moment($scope.finish).format("MMM Do dddd") + ', ' + moment($scope.finish).fromNow();

            if ($scope.currentDate > $scope.finish){
                $scope.deadlineMessage = 'You missed your deadline, bastard!'
            } else if ($scope.currentDate > $scope.finish) {
                $scope.deadlineMessage = 'Today is your deadline!'
            }
        });
    }


    $scope.finishSprint = function(){
        var deleteConfirmed = confirm('Sure?');
        if(deleteConfirmed) {
            mvSprintOps.finishSprint().then(function(){
                mvNotifier.notify('Your sprint is finished! Congrats!');
                $scope.currentSprint = false;
            }, function(){
                mvNotifier.notify('Sorry, there is some error');
            })
        }
    };

    $scope.addHour = function(hour, task){
        hour.added = !hour.added;
        if (hour.added) {
            ++task.spent;
        } else {
            --task.spent;
        }
        mvSprintOps.updateSprint(task).then(function(){
            mvNotifier.notify('Saved!');
        }, function(){
            mvNotifier.notify('Sorry, there is some error');
        })
    }
});