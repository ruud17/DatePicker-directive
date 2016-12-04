angular.module('app')
    .controller('datePickerController', ['$scope', function ($scope) {
        'use strict';

      $scope.$on('updateDirectiveStatus',function () {
          var outerFunctionValue = $scope.sbBeforeRenderItem();
          $scope.shouldDisableDatePicker=outerFunctionValue.disabled.datePicker;
      })

        var lastSelectedDate=new Date($scope.selectedDate);

        angular.extend($scope, {
            selectedDateX:new Date($scope.selectedDate)
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

        $scope.$watch('selectedDateX',function (newVal) {
            if(newVal!=null && typeof newVal !='undefined'){
                $scope.selectedDate=new Date(lastSelectedDate);
            $scope.selectedDate.setFullYear(newVal.getFullYear());
            $scope.selectedDate.setMonth(newVal.getMonth())
            $scope.selectedDate.setDate(newVal.getDate())
            }else{
                $scope.selectedDate=null;
            }
        })

        $scope.$watch('selectedDate', function (newVal, oldVal) {
            if(newVal!=null && typeof newVal !='undefined'){
                lastSelectedDate = new Date(newVal);
            }
        },true);
    }
    ]);

