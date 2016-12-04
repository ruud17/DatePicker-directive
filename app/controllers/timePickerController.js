angular.module('app')
    .controller('timePickerController', ['$scope', 'workingHoursService', function ($scope, workingHoursService) {
        'use strict';

        var weekendDays = [0, 6];
        var workingHours = workingHoursService.getWorkingHours();
        var lastSelectedDate = new Date($scope.selectedTime);

        init();

        angular.extend($scope, {
            hstep: 1,
            mstep: 15,
            ismeridian: true,
            indicator: true
        });

        function checkDateAndTime(dateTime) {
            if (typeof dateTime != 'undefined' && dateTime != null) {
                return true;
            } else {
                return false;
            }
        }

        function checkIfDateIsChanged(newDate, oldDate) {
            if (newDate != null && oldDate != null) {
                if (newDate.getFullYear() != oldDate.getFullYear() || newDate.getMonth() != oldDate.getMonth() || newDate.getDate() != oldDate.getDate()) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }

        function unsetTimePickerValue(date) {
            if (typeof date != 'undefined' && date != null) {
                var day = date.getDay();
                if (day == weekendDays[0] || day == weekendDays[1]) {
                    if (date.getHours() < workingHours.weekends.startHours || (date.getHours() >= workingHours.weekends.endHours && date.getMinutes() > workingHours.weekends.endMinutes)) {
                        return true;
                    }
                } else {
                    if (date.getHours() < workingHours.weekdays.startHours || (date.getHours() >= workingHours.weekdays.endHours && date.getMinutes() > workingHours.weekdays.endMinutes)) {
                        return true;
                    }
                }
            }
            return false;
        }

        function init(){
            $scope.selectedTime!=null ?   $scope.selectedTimeModel= new Date($scope.selectedTime) : $scope.selectedTimeModel= null;
        }

        $scope.$watch('selectedTimeModel', function (newVal) {
            if (newVal != null) {
                $scope.selectedTime = new Date(lastSelectedDate);
                $scope.selectedTime.setHours(newVal.getHours());
                $scope.selectedTime.setMinutes(newVal.getMinutes());
            } else {
                $scope.selectedTime = null;
                $scope.disableTimepicker = false;
                $scope.indicator = false;
            }
        }, true);

        $scope.$watch('selectedTime', function (newVal, oldVal) {
            if (checkDateAndTime(newVal)) {
                $scope.indicator = true;
                lastSelectedDate = new Date(newVal);
                var isDateChanged = checkIfDateIsChanged(newVal, oldVal);
                if (isDateChanged) {
                    if (unsetTimePickerValue(newVal)) {
                        $scope.selectedTimeModel = null;
                    }
                }
                $scope.disableTimepicker = false;
            } else {
                $scope.selectedTime = null;
                $scope.disableTimepicker = true;
            }
        }, true);

        $scope.$on('updateDirectiveStatus', function () {
            var outerFunctionValue = $scope.sbBeforeRenderItem();
            $scope.shouldDisableTimePicker = outerFunctionValue.disabled.timePicker;
        });
    }
    ]);


