angular.module('app').controller('mvNewSprintCtrl', function($scope, mvNotifier, mvCategory, mvSprintOps, $location, tasks) {

    $scope.categories = tasks;

    $scope.hours = 0;

    $scope.dates = {
        minDate: new Date(),
        finish: moment($scope.minDate).add(2, 'weeks').format(),
    };

    var sprintData = {
        tasks: [],
        created: new Date()
    };

    function updateHours(){
        $scope.hours = 0;
        _.each(sprintData.tasks, function(item){
            $scope.hours += item.planned;
        })
    }

    $scope.addTask = function(task){
        if ( task.planned && !isNaN(task.planned)) {
            sprintData.tasks.push({_id:  task._id, planned: task.planned});
            task.selecting = false;
            task.added = true;
            updateHours();
        }
    };

    $scope.deleteTask = function(task, index){
        sprintData.tasks.splice(index, 1);
        task.added = false;
        task.planned = "";
        updateHours();
    };

    $scope.createSprint = function(){
        sprintData.finish = $scope.dates.finish;
        mvSprintOps.addSprint(sprintData).then(function () {
            mvNotifier.notify('Your new sprint is created');
            $location.path('/current-sprint');
        }, function () {
            mvNotifier.notify('Sorry, there is some error');
        })
    };
});