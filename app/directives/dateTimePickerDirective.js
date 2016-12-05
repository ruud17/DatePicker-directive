(function (app) {
    'use strict';

    app.directive('dateTimePicker',function (listenerService) {
            return {
                restrict: 'E',
                transclude : true,
                controller:'dateTimePickerController',
                scope: {
                    ngModel:"=",
                    sbTimeZone:'@'
                },
                templateUrl: 'views/dateTimePickerDirective.html',
                link:function (scope,attrs,el) {
                    if(scope.ngModel!=null){
                        listenerService.setLastDate(scope.ngModel);
                        listenerService.setLastTime(scope.ngModel);
                    }else{
                        listenerService.setLastDate(null);
                        listenerService.setLastTime(null);
                    }
                }
            };
        }
    );

})(angular.module('app'));

