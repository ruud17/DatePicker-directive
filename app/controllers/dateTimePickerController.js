angular.module('app')
    .controller('dateTimePickerController', ['$scope', 'listenerService', function ($scope, listenerService) {
        'use strict';
        angular.extend($scope, {
            datetime: {
                lastDate: null,
                lastTime: null
            },
            listenerSer: {
                date: listenerService.getLastDate(),
                time: listenerService.getLastTime(),
                datetimeValue: listenerService.getDateTime()
            }
        });

        function validityDateTime(val) {
            if (typeof val.lastDate != 'undefined' && typeof val.lastTime != 'undefined' && val.lastDate != null && val.lastTime != null) {
                return true;
            } else {
                return false;
            }
        }

        $scope.$watch('ngModel', function (newVal) {
            if (newVal != null) {
                var lastDateTime = $scope.listenerSer.datetimeValue;
                var dateAndTimeAreSelected = validityDateTime(lastDateTime);

                if (!dateAndTimeAreSelected) {
                    $scope.ngModel = null;
                }
            } else {
                $scope.ngModel = null;
            }
        });
    }
    ]);
