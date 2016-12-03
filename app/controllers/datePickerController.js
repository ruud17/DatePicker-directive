angular.module('app')
    .controller('datePickerController', ['$scope', function ($scope) {
        'use strict';

        $scope.openDatepicker = function () {
            $scope.datepicker.opened = true;
        };

        $scope.datepicker = {
            opened: false
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.altInputFormats = ['M!/d!/yyyy'];
    }
    ]);

