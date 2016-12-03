angular.module('app')
    .controller('dateTimePickerController', ['$scope', function ($scope) {
        'use strict';

        angular.extend($scope, {
            order : {
                requestedDatetime: null,
                timeZone: 'America/Los_Angeles'
            },
            ngModel:new Date()
        });
    }
    ]);
