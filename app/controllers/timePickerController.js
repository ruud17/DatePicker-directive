angular.module('app')
    .controller('timePickerController', ['$scope', 'workingHoursService', function ($scope, workingHoursService) {
        'use strict';

        $scope.$on('updateDirectiveStatus', function () {
            var outerFunctionValue = $scope.sbBeforeRenderItem();
            $scope.shouldDisableTimePicker = outerFunctionValue.disabled.timePicker;
        })

        var weekendDays = [0, 6];
        var workingHours = workingHoursService.getWorkingHours();
        var lastSelectedDate = new Date($scope.selectedTime);

        angular.extend($scope, {
            hstep: 1,
            mstep: 15,
            ismeridian: true,
            selectedTimeX: new Date($scope.selectedTime),
            indicator:true
        })
        
        $scope.$watch('selectedTimeX', function (newVal, oldVal) {
            console.log('new,old',newVal,oldVal);
            if (newVal != null && typeof newVal != 'undefined') {
                $scope.selectedTime = new Date(lastSelectedDate);
                $scope.selectedTime.setHours(newVal.getHours());
                $scope.selectedTime.setMinutes(newVal.getMinutes())
            } else {
                $scope.selectedTime = null;
                $scope.disableTimepicker=false;
                $scope.indicator=false;
            }
        }, true)

        $scope.$watch('selectedTime', function (newVal, oldVal) {
            if (checkDateAndTime(newVal)) {
                $scope.indicator=true;
                lastSelectedDate = new Date(newVal);
                var isDateChanged = checkIfDateIsChanged(newVal, oldVal);
                if (isDateChanged) {
                    if (unsetTimePickerValue(newVal)) {
                        $scope.selectedTimeX = null;
                    }
                }
                $scope.disableTimepicker=false;
            } else {
                $scope.selectedTime = null;
                $scope.disableTimepicker=true;
            }
        }, true);

        function checkDateAndTime(dateTime) {
            if (typeof dateTime != 'undefined' && dateTime != null) {
                return true;
            } else {
                return false;
            }
        }


        function checkIfDateIsChanged(newDate, oldDate) {
            if (newDate != null && typeof newDate != 'undefined' && oldDate != null && typeof oldDate != 'undefined') {
                if (newDate.getFullYear() != oldDate.getFullYear() || newDate.getMonth() != oldDate.getMonth() || newDate.getDate() != oldDate.getDate()) {
                    return true;
                } else {
                    return false;
                }
            }else {
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

    }
    ]);


