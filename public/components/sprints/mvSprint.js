angular.module('app').factory('mvSprint', function($resource){
    return $resource('/api/sprints/:id', {id: '@id'},{
        update: {method: 'PUT', isArray: false}
    });
});

angular.module('app').factory('mvSprintTask', function($resource){
    return $resource('/api/sprints/:id/tasks/:taskId', {id: '@id', taskId: '@taskId'},{
        update: {method: 'PUT', isArray: false}
    });
});