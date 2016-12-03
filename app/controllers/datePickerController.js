angular.module('app')
    .controller('datePickerController', ['$scope', function ($scope) {
        'use strict';

        $scope.openDatepicker = function () {
            $scope.datepicker.opened = true;
        };

        $scope.datepicker = {
            opened: false
        };
    }
    ]);

