angular.module('app').factory('mvSprint', function($resource){
    return $resource('/api/sprints/:id', {id: '@id'},{
        update: {method: 'PUT', isArray: false}
    });
});