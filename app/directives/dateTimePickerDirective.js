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
                templateUrl: 'views/dateTimePickerDirective.html'
               /* link:function (scope,attrs,el) {
                    scope.ngModel=moment.tz(scope.ngModel, scope.sbTimeZone);
                }*/
            };
        }
    );

})(angular.module('app'));

