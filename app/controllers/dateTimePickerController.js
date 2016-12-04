angular.module('app')
    .controller('dateTimePickerController', ['$scope', 'workingHoursService', function ($scope, workingHoursService) {
        'use strict';
    angular.extend($scope, {
/*            selected: {
                date: new Date(2001, 9, 15),
                time: new Date(1994, 6, 24, 7, 19, 26)
            },*/
        });

        var weekendDays = [0, 6];
        var workingHours = workingHoursService.getWorkingHours();

      $scope.$watch('ngModel', function (newVal, oldVal) {
          console.info('XXXXXX',newVal,oldVal);
            if (checkDateAndTime(newVal)) {
                /*var isDateChanged = checkIfDateIsChanged(newVal, oldVal);
                console.info('changed', isDateChanged);
                if (isDateChanged) {
                    if (unsetTimePickerValue(newVal)) {
                        console.log('usaoaaoXX');
                        $scope.ngModel.setHours(0);
                        $scope.ngModel.setMinutes(20);
                        //$scope.selected.time = null;
                    }
                }*/
            } else {
              //  $scope.ngModel = null;
            }
        }, true);

        function checkDateAndTime(dateTime) {
            if (typeof dateTime != 'undefined' && dateTime != null) {
                return true;
            } else {
                return false;
            }
        }
        /*
/!*
        $scope.setTimepickerStatus = function () {
            return (typeof $scope.selected.date == 'undefined' || $scope.selected.date == null) ? true : false;
        }
*!/
        function checkIfDateIsChanged(newDate,oldDate) {
            console.log('diff:',newDate.getFullYear(),oldDate.getFullYear());
            if(newDate.getFullYear()!=oldDate.getFullYear() || newDate.getMonth()!=oldDate.getMonth() || newDate.getDate()!=oldDate.getDate()){
                return true;
            }else {
                return false;
            }
        }

        function unsetTimePickerValue(date) {
            if (typeof date != 'undefined' && date != null) {
                var day = date.getDay();
                if (day == weekendDays[0] || day == weekendDays[1]) {
                    if (date.getHours() < workingHours.weekends.startHours || (date.getHours() >= workingHours.weekends.endHours && date.getMinutes() > workingHours.weekends.endMinutes)){
                        return true;
                    }
                } else {
                    if (date.getHours() < workingHours.weekdays.startHours || (date.getHours() >= workingHours.weekdays.endHours && date.getMinutes() > workingHours.weekdays.endMinutes)){
                        return true;
                    }
                }
            }
            return false;
        }*/

       /* function toTimeZone(time, zone) {
           var formatValue = 'DD/MM/YYYY HH:mm z';
            return moment(time,formatValue).tz(zone).format(formatValue);
        }
        $scope.$watch('sbTimeZone', function (newVal) {
            if($scope.ngModel!=null && typeof $scope.ngModel !='undefined'){
               // var currentTime=toTimeZone(new Date,newVal);
               //console.info('update',)
          /!*     var dt = moment().tz(newVal).format();
                 var toDate=moment(dt).toDate();
                 console.log('tozone:',dt);
                 console.log('todate:',moment($scope.ngModel).zone(-120).format());*!/
                //var dt = moment($scope.ngModel).tz(newVal).format();
                //$scope.ngModel=moment(currentTime).format('DD/MM/YYYY HH:mm z');
                var day = new Date();
                var dayWrapper = moment(day);
                console.log('wrapper',moment.parseZone(newVal).local().format());
            }

        })*/
    }
    ]);
