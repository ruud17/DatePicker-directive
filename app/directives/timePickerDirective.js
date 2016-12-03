(function (app) {
    'use strict';

    app.directive('timePicker',function () {
            return {
                restrict: 'AE',
                scope: {
                    selectedTime:'=timePicker',
                    sbBeforeRenderItem:'&'
                },
                templateUrl: 'views/timePickerDirective.html',
                controller:'timePickerController'
            };
        }
    );

})(angular.module('app'));