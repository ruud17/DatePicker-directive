angular.module('app')
    .controller('datePickerController', ['$scope', function ($scope) {
        'use strict';

      $scope.$on('updateDirectiveStatus',function () {
          var outerFunctionValue = $scope.sbBeforeRenderItem();
          $scope.shouldDisableDatePicker=outerFunctionValue.disabled.datePicker;
      })

        angular.extend($scope, {
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

