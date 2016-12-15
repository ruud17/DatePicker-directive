(function (app) {
    'use strict';

    app.directive('datePicker', function () {
            return {
                restrict: 'AE',
                scope: {
                    selectedDate:"=datePicker",
                    sbBeforeRenderItem:'&?'
                },
                templateUrl: 'views/datePickerDirective.html',
                controller: 'datePickerController'
            };
        }
    );

})(angular.module('app'));
