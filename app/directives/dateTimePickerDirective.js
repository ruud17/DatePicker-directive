(function (app) {
    'use strict';

    app.directive('dateTimePicker',function () {
            return {
                restrict: 'E',
                transclude : true,
                controller:'dateTimePickerController',
                scope: {
                    ngModel:"=",
                    sbTimeZone:'@'
                },
                templateUrl: 'views/dateTimePickerDirective.html',
            };
        }
    );

})(angular.module('app'));

