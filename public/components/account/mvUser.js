angular.module('app').factory('mvUser', function($resource){
    return $resource('/api/users/:id', {_id: '@id'},{
        update: {method: 'PUT', isArray: false}
    });
});