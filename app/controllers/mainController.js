angular.module('app')
    .controller('mainController', ['$scope','$rootScope', function ($scope,$rootScope) {
        'use strict';

        angular.extend($scope, {
            shouldDisableDatepicker:false,
            shouldDisableTimepicker:false,
            order: {
                requestedDatetime: new Date(),
                timeZone: 'America/Los_Angeles'
            },
            config: {
                dateValue: new Date(),
                disabled: {
                    datePicker: false,
                    timePicker: false
                }

            }
        });

        $scope.beforeRenderDateItem = function (data) {
            data = {
                dateValue: new Date(),
                disabled: {
                    datePicker: $scope.shouldDisableDatepicker,
                    timePicker: $scope.shouldDisableTimepicker
                }
            }
            return data;
        }

        $scope.$watch('[shouldDisableDatepicker,shouldDisableTimepicker]',function (newVal) {
            $rootScope.$broadcast('updateDirectiveStatus');
        })
    }
    ]);