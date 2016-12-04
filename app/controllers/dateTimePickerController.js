angular.module('app')
    .controller('dateTimePickerController', ['$scope', 'workingHoursService', function ($scope, workingHoursService) {
        'use strict';
    angular.extend($scope, {
/*            selected: {
                date: new Date(2001, 9, 15),
                time: new Date(1994, 6, 24, 7, 19, 26)
            },*/
        });

/*        var weekendDays = [0, 6];
        var workingHours = workingHoursService.getWorkingHours();

        $scope.$watch('selected', function (newVal, oldVal) {
            console.log('changed');
            if (checkDateAndTime(newVal)) {
                var day = newVal.date.getDay();
                $scope.ngModel = new Date(newVal.date.getFullYear(), newVal.date.getMonth(), newVal.date.getDate(), newVal.time.getHours(), newVal.time.getMinutes())
            } else {
                $scope.ngModel = null;
            }
           /!* if(unsetTimePickerValue(newVal.date, newVal.time)){
                $scope.ngModel = null;
                $scope.selected.time=null;
            }*!/
        }, true);

        function checkDateAndTime(dateTime) {
            if (typeof dateTime.date != 'undefined' && dateTime.date != null && typeof dateTime.time != 'undefined' && dateTime.time != null) {
                return true;
            } else {
                return false;
            }
        }

        $scope.setTimepickerStatus = function () {
            return (typeof $scope.selected.date == 'undefined' || $scope.selected.date == null) ? true : false;
        }

        function unsetTimePickerValue(date, time) {
            if (typeof date != 'undefined' && date != null && time!=null) {
                var day = date.getDay();
                if (day == weekendDays[0] || day == weekendDays[1]) {
                    if (time.getHours() < workingHours.weekends.startHours || (time.getHours() >= workingHours.weekends.endHours && time.getMinutes() > workingHours.weekends.endMinutes)){
                        return true;
                    }
                } else {
                    if (time.getHours() < workingHours.weekdays.startHours || (time.getHours() >= workingHours.weekdays.endHours && time.getMinutes() > workingHours.weekdays.endMinutes)){
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
