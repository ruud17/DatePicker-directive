(function (app) {
    'use strict';

    app.directive('timePicker',function () {
            return {
                restrict: 'E',
                scope: false,
                templateUrl: 'views/timePickerDirective.html',
                controller:'timePickerController'
            };
        }
    );

})(angular.module('app'));