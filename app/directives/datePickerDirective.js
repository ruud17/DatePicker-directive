(function (app) {
    'use strict';

    app.directive('datePicker', function () {
            return {
                restrict: 'E',
                scope: {
                    selectedDate: "=datePicker"
                },
                templateUrl: 'views/datePickerDirective.html',
                controller: 'datePickerController'
                /*                link: function(scope, element, attrs, dateTimePickerController) {
                 console.log('rez',dateTimePickerController);
                 // dateTimePickerController.test();
                 }*/
            };
        }
    );

})(angular.module('app'));
