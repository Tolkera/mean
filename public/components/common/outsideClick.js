angular.module('app').directive('outsideClick', function($document){
    return {
        restrict: 'A',
        link: function(scope, elem) {
            scope.elemShown = false;
            elem.bind('click', function(e) {
                e.stopPropagation();
                scope.elemShown = !(scope.elemShown);
                scope.$apply();
            });
            $document.bind('click', function() {
                scope.elemShown = false;
                scope.$apply();
            })
        }
    }
});

angular.module('app').directive('hours', function($document){
    return {
        restrict: 'A',
        scope: {
            hoursPlanned: '=',
            hoursSpent: '='
        },
        link: function(scope, elem) {
            for (var i = 0; i < scope.hoursPlanned.length; i++){

            }
        }
    }
});
