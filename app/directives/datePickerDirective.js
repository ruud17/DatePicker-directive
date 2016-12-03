(function (app) {
    'use strict';

    app.directive('datePicker', function () {
            return {
                restrict: 'E',
                scope: false,
                templateUrl: 'views/datePickerDirective.html',
                controller: 'datePickerController'
            };
        }
    );

})(angular.module('app'));
