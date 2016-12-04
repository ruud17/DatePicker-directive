angular.module('app')
    .controller('mainController', ['$scope','$rootScope', function ($scope,$rootScope) {
        'use strict';

        angular.extend($scope, {
            shouldDisableDatepicker:false,
            shouldDisableTimepicker:false,
            order: {
                requestedDatetime: new Date(),
                timeZone: 'America/New_York'
            },
            config: {
                dateValue: new Date(),
                disabled: {
                    datePicker: false,
                    timePicker: false
                }
            },
            datetime:null,
            timeZones:['America/Los_Angeles','Africa/Bamako','America/Chicago','America/New_York']
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

        $scope.$watch('order.timeZone',function(newVal){

           var now = moment($scope.order.requestedDatetime);
           var zonedNow = now.clone().tz(newVal);
            var atEight = zonedNow.clone()
                .year($scope.order.requestedDatetime.getFullYear())
                .month($scope.order.requestedDatetime.getMonth())
                .date($scope.order.requestedDatetime.getDate())
                .hour($scope.order.requestedDatetime.getHours()).
                minute($scope.order.requestedDatetime.getMinutes()).
                seconds(0).
                milliseconds(0);

             $scope.datetime=atEight.format('DD/MM/YYYY hh:mm a z')
        })

        $scope.$watch('order.requestedDatetime',function (newVal) {
            if(newVal!=null && typeof newVal !='undefined'){
            var now = moment(newVal);
            var zonedNow = now.clone().tz($scope.order.timeZone);
            var atEight = zonedNow.clone()
                .year(newVal.getFullYear())
                .month(newVal.getMonth())
                .date(newVal.getDate())
                .hour(newVal.getHours())
                .minute(newVal.getMinutes()).
                seconds(0).
                milliseconds(0);

            $scope.datetime=atEight.format('DD/MM/YYYY hh:mm a z')
            }else{
                $scope.datetime=null;
            }
        })


    }
    ]);