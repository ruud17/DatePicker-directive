angular.module('app')
    .controller('timePickerController', ['$scope', 'workingHoursService', '$rootScope', 'listenerService','timePickerService', function ($scope, workingHoursService, $rootScope, listenerService,timePickerService) {
        'use strict';

        var weekendDays = [0, 6];
        var workingHours = workingHoursService.getWorkingHours();
        var lastSelectedDate = new Date($scope.selectedTime);

        angular.extend($scope, {
            hstep: 1,
            mstep: 15,
            ismeridian: true,
            timePeriods: timePickerService.getTimePeriods(),
            timeValues:timePickerService.getTimeValues(),
            selectedPeriod:{}
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

        function init() {
            $scope.selectedPeriod=$scope.timePeriods[0];
            var hours,minutes;

            if ($scope.selectedTime != null) {
                if($scope.selectedTime.getHours()==0){
                   $scope.selectedTimeModel = 12 +":"+$scope.selectedTime.getMinutes()+ " " + $scope.timePeriods[0].value;
                }
                else if($scope.selectedTime.getHours()==12){
                    $scope.selectedTimeModel = 12 +":"+$scope.selectedTime.getMinutes()+ " " +$scope.timePeriods[1].value;
                }
                else if($scope.selectedTime.getHours()>12){
                    $scope.selectedTimeModel = $scope.selectedTime.getHours()-12 +":"+$scope.selectedTime.getMinutes()+ " " + $scope.timePeriods[1].value;
                }else{
                    $scope.selectedTimeModel = $scope.selectedTime.getHours() +":"+$scope.selectedTime.getMinutes()+ " " +$scope.timePeriods[0].value;
                }

                if(parseInt($scope.selectedTimeModel.split(":")[0])<10){
                    hours="0"+$scope.selectedTime.getHours();
                }

                if(parseInt($scope.selectedTimeModel.split(":")[1])<10){
                    minutes=":0"+$scope.selectedTime.getMinutes();
                }

                $scope.dateSelected = true;
            } else {
                $scope.selectedTimeModel = null;
                $scope.dateSelected = false;
            }
        }

        function checkPeriodStatus(period,val){
            var time={
                hours:parseInt(val.split(":")[0]),
                minutes:parseInt(val.split(":")[1])
            };

            if(time.hours==12) {
                period.value=="PM"  ? time.hours=12 : time.hours=0;
            }else {
                if(period.value=="PM") {
                    time.hours = parseInt(val.split(":")[0]) + 12;
                }
            }
            return time;
        }

        $scope.$watch('selectedTimeModel', function (newVal) {
console.log('new val',newVal);
            listenerService.setLastTime(newVal);
            if (newVal != null) {
                $scope.selectedTime = new Date(lastSelectedDate);
                var getHoursAndMinutes=checkPeriodStatus($scope.selectedPeriod,newVal)
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
            } else {
                $scope.dateSelected = false;
            }
        });
    }
    ]);


