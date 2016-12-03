angular.module('app')
    .controller('mainController', ['$scope', function ($scope) {
        'use strict';

        angular.extend($scope, {
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

        $scope.beforeRenderDateItem=function (data) {
            return data;
        }

    }
    ]);