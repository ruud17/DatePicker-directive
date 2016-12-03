(function (app) {
    'use strict';

    app.directive('timePicker',function () {
            return {
                restrict: 'E',
                scope: {
                    timeValue:"=timePicker"
                },
                templateUrl: 'views/timePickerDirective.html',
                controller:'timePickerController'
           /*     link: function(scope, element, attrs, dateTimePickerController) {
                    dateTimePickerController.test();
                }*/
            };
        }
    );

})(angular.module('app'));