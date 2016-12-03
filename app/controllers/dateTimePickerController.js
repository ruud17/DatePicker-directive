angular.module('app')
    .controller('dateTimePickerController', ['$scope', function ($scope) {
        'use strict';
        angular.extend($scope, {

            selected: {
                date: new Date(2001, 9, 15),
                time: new Date(1994, 6, 24, 7, 19, 26)
            },
        });

        $scope.$watch('selected', function (newVal, oldVal) {
            console.log('new',newVal.time);
            if (typeof newVal.date != 'undefined' && newVal.date !=null && typeof newVal.time != 'undefined' && newVal.time!=null) {
                $scope.ngModel = new Date(newVal.date.getFullYear(), newVal.date.getMonth(), newVal.date.getDate(), newVal.time.getHours(), newVal.time.getMinutes())
            }else{
                $scope.ngModel=null;
            }
        }, true)
    }
    ]);
