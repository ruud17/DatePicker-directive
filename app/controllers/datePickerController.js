angular.module('app')
    .controller('datePickerController', ['$scope', '$rootScope', 'listenerService', function ($scope, $rootScope, listenerService) {
        'use strict';

        var lastSelectedDate = new Date($scope.selectedDate);

        init();

        angular.extend($scope, {
            formats: ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'],
            altInputFormats: ['M!/d!/yyyy'],
            datepicker: {
                opened: false
            }
        });

        $scope.format = $scope.formats[0];

        $scope.openDatepicker = function () {
            $scope.datepicker.opened = true;
        };

        function init() {
            $scope.selectedDate != null ? $scope.selectedDateModel = new Date($scope.selectedDate) : $scope.selectedDateModel = null;
        }

        $scope.$watch('selectedDateModel', function (newVal) {
            if (newVal != null) {
                $scope.selectedDate = new Date(lastSelectedDate);
                $scope.selectedDate.setFullYear(newVal.getFullYear());
                $scope.selectedDate.setMonth(newVal.getMonth());
                $scope.selectedDate.setDate(newVal.getDate());
            } else {
                $scope.selectedDate = null;
            }

            listenerService.setLastDate(newVal);
            $rootScope.$broadcast('dateChanged', $scope.selectedDateModel);
        });

        $scope.$watch('selectedDate', function (newVal) {
            if (newVal != null) {
                lastSelectedDate = new Date(newVal);
            }
        }, true);

        $scope.$on('updateDirectiveStatus', function () {
            var outerFunctionValue = $scope.sbBeforeRenderItem();
            $scope.shouldDisableDatePicker = outerFunctionValue.disabled.datePicker;
        });
    }
    ]);

