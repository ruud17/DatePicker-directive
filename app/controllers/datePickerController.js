angular.module('app')
    .controller('datePickerController', ['$scope', function ($scope) {
        'use strict';

        var outerFunctionValue = $scope.sbBeforeRenderItem();
console.log('iff',outerFunctionValue);
        angular.extend($scope, {
            shouldDisableDatePicker:outerFunctionValue.disabled.datePicker
        })

        $scope.openDatepicker = function () {
            $scope.sbBeforeRenderItem();
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

