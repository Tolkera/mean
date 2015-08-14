angular.module('app').factory('mvCategory', function($resource){
    return $resource('/api/categories/:id', {_id: '@id', userId: '@userId'},{
        update: {method: 'PUT', isArray: false}
    });
});