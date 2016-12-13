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
                controller:'timePickerController',
                link:function (scope,attrs,el) {
                    scope.changePeriod=function (ev,selectedPeriod) {
                        ev.stopPropagation();
                        scope.selectedPeriod=selectedPeriod;
                    }

                    scope.selectTime=function (lastSelectedTime) {
                        scope.selectedTimeModel=lastSelectedTime + " " + scope.selectedPeriod.value;
                    }
                }
            };
        }
    );

})(angular.module('app'));