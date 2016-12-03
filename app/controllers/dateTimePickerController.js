angular.module('app')
    .controller('dateTimePickerController', ['$scope', 'workingHoursService', function ($scope, workingHoursService) {
        'use strict';
        angular.extend($scope, {

            selected: {
                date: new Date(2001, 9, 15),
                time: new Date(1994, 6, 24, 7, 19, 26)
            },
        });

        $scope.$watch('selected', function (newVal, oldVal) {
console.log('new',newVal.date);
            var day;

            if (checkDateAndTime(newVal)) {
                var day = newVal.date.getDay();
                $scope.ngModel = new Date(newVal.date.getFullYear(), newVal.date.getMonth(), newVal.date.getDate(), newVal.time.getHours(), newVal.time.getMinutes())
            } else {
                $scope.ngModel = null;
            }
            console.log('day', day);
            //if(newVal.date.getDay())
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
    }
    ]);
