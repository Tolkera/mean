/*
angular.module('app').directive('datepicker', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element) {
            element.datepicker({
                dateFormat: 'dd/mm/yy',
                onSelect: function (date) {
                    scope.date = $.datepicker.parseDate('dd/mm/yy', date);
                    scope.$apply();
                }
            });
        }
    };
});*/
