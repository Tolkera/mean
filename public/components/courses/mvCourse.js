angular.module('app').factory('mvCourse', function($resource){
   return $resource('/api/courses/:id', {id:'@id'},{
       update: {method: 'PUT', isArray: false}
   })
});