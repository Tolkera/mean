angular.module('app').factory('mvTask', function($resource, mvIdentity){
    return $resource('/api/tasks/:id', {_id: '@id'},{
        update: {method: 'PUT', isArray: false}
    });
});