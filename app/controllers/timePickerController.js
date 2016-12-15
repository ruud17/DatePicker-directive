angular.module('app')
    .controller('timePickerController', ['$scope', 'workingHoursService', '$rootScope', 'listenerService', 'timePickerService', function ($scope, workingHoursService, $rootScope, listenerService, timePickerService) {
        'use strict';

        var weekendDays = [0, 6];
        var workingHours = workingHoursService.getWorkingHours();
        var lastSelectedDate = new Date($scope.selectedTime);

        angular.extend($scope, {
            hstep: 1,
            mstep: 15,
            ismeridian: true,
            timePeriods: timePickerService.getTimePeriods(),
            timeValues: timePickerService.getTimeValues(),
            selectedPeriod: {},
            datePickerValue: null,
            shouldOpenTimePickerDropdown:false
        });

        init();

        function checkDateAndTime(dateTime) {
            if (typeof dateTime != 'undefined' && dateTime != null) {
                return true;
            } else {
                return false;
            }
        }

        function checkIfDateIsChanged(newDate, oldDate) {
            if (newDate != null && oldDate != null) {
                if (newDate.getFullYear() !== oldDate.getFullYear() || newDate.getMonth() !== oldDate.getMonth() || newDate.getDate() !== oldDate.getDate()) {
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
                if (day === weekendDays[0] || day === weekendDays[1]) {
                    if (date.getHours() < workingHours.weekends.startHours || date.getHours() > workingHours.weekends.endHours || (date.getHours() >= workingHours.weekends.endHours && date.getMinutes() > workingHours.weekends.endMinutes)) {
                        return true;
                    }
                } else {
                    if (date.getHours() < workingHours.weekdays.startHours || date.getHours() > workingHours.weekdays.endHours || (date.getHours() >= workingHours.weekdays.endHours && date.getMinutes() > workingHours.weekdays.endMinutes)) {
                        return true;
                    }
                }
            }
            return false;
        }

        function init() {
            if ($scope.selectedTime != null) {
                $scope.selectedTimeModel = getTime($scope.selectedTime, $scope.timePeriods);
                $scope.selectedTime.getHours() >= 12 ? $scope.selectedPeriod = $scope.timePeriods[1] : $scope.selectedPeriod = $scope.timePeriods[0];
                $scope.dateSelected = true;
                $scope.datePickerValue = $scope.selectedTime;
            } else {
                $scope.selectedPeriod = $scope.timePeriods[0];
                $scope.selectedTimeModel = null;
                $scope.dateSelected = false;
                $scope.datePickerValue = null;
            }
        }

        function getTime(time, period) {
            var currentTime = time.getHours();
            var result, hours, minutes;

            switch (true) {
                case (currentTime == 0):
                    result = 12 + ":" + time.getMinutes() + " " + period[0].value;
                    break;
                case (currentTime == 12):
                    result = 12 + ":" + time.getMinutes() + " " + period[1].value;
                    break;
                case (currentTime > 12):
                    result = "0" + (time.getHours() - 12) + ":" + time.getMinutes() + " " + period[1].value;
                    break;
                case (currentTime == 10 || currentTime == 11):
                    result = time.getHours() + ":" + time.getMinutes() + " " + period[0].value;
                    break;
                default:
                    result = "0" + time.getHours() + ":" + time.getMinutes() + " " + period[0].value;
                    break;
            }

            if (parseInt(result.split(":")[1]) < 10) {
                result = result.substr(0, 3) + "0" + result.substr(3);
            }
            return result;
        }

        function checkPeriodStatus(period, val) {
            var time = {
                hours: parseInt(val.split(":")[0]),
                minutes: parseInt(val.split(":")[1])
            };

            if (time.hours == 12) {
                period.value == "PM" ? time.hours = 12 : time.hours = 0;
            } else {
                if (period.value == "PM") {
                    time.hours = parseInt(val.split(":")[0]) + 12;
                }
            }
            return time;
        }

        $scope.createTime = function (time, period) {
            return time + " " + period.value;
        }

        $scope.disableTime = function (date, time, period) {
            if (typeof date != 'undefined' && date != null) {
                var day = date.getDay();
                var hours = parseInt(time.split(":")[0]);
                var minutes = parseInt(time.split(":")[1]);

                if (period.value == "PM" && hours != 12) {
                    hours += 12;
                }

                if (period.value == "AM" && hours == 12) {
                    hours = 0;
                }
                var timeValue = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes)

                if (day === weekendDays[0] || day === weekendDays[1]) {

                    if (timeValue.getHours() < workingHours.weekends.startHours || timeValue.getHours() > workingHours.weekends.endHours || (timeValue.getHours() >= workingHours.weekends.endHours && timeValue.getMinutes() > workingHours.weekends.endMinutes)) {
                        return true;
                    }
                } else {

                    if (timeValue.getHours() < workingHours.weekdays.startHours || timeValue.getHours() > workingHours.weekdays.endHours || (timeValue.getHours() >= workingHours.weekdays.endHours && timeValue.getMinutes() > workingHours.weekdays.endMinutes)) {
                        return true;
                    }
                }
                return false;
            }
        }

        $scope.$watch('selectedTimeModel', function (newVal) {
            listenerService.setLastTime(newVal);
            if (newVal != null) {
                $scope.selectedTime = new Date(lastSelectedDate);
                var getHoursAndMinutes = checkPeriodStatus($scope.selectedPeriod, newVal);
                $scope.selectedTime.setHours(getHoursAndMinutes.hours);
                $scope.selectedTime.setMinutes(getHoursAndMinutes.minutes);
            } else {
                $scope.selectedTime = null;
                $scope.disableTimepicker = false;
            }
        }, true);

        $scope.$watch('selectedTime', function (newVal, oldVal) {
            if (checkDateAndTime(newVal)) {
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

        $scope.$on('dateChanged', function (e, arrgs) {
            if (typeof arrgs != 'undefined' && arrgs != null) {
                $scope.dateSelected = true;
                $scope.datePickerValue = arrgs;
            } else {
                $scope.dateSelected = false;
                $scope.datePickerValue = null;
            }
        });
    }
    ]);


