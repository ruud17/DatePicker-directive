angular.module('app')
    .controller('mainController', ['$scope', '$rootScope', function ($scope, $rootScope) {

        angular.extend($scope, {
            shouldDisableDatepicker: false,
            shouldDisableTimepicker: false,
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
            timeZones: ['America/Los_Angeles', 'Africa/Bamako', 'America/Chicago', 'America/New_York']
        });
        $scope.datetime=new Date($scope.order.requestedDatetime);

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

        function setDateTimeAndZone(date, zone) {
            var now = moment(date);
            var zonedNow = now.clone().tz(zone);
            var newDate = zonedNow.clone()
                .year(date.getFullYear())
                .month(date.getMonth())
                .date(date.getDate())
                .hour(date.getHours())
                .minute(date.getMinutes()).seconds(0).milliseconds(0);
            return newDate.format('DD/MM/YYYY hh:mm A z');
        }

        $scope.$watch('[shouldDisableDatepicker,shouldDisableTimepicker]', function () {
            $rootScope.$broadcast('updateDirectiveStatus');
        });

        $scope.$watch('order.timeZone', function (newVal) {
            if ($scope.order.requestedDatetime != null) {
                $scope.datetime = setDateTimeAndZone($scope.order.requestedDatetime, newVal);
            }
        });

        $scope.$watch('order.requestedDatetime', function (newVal) {
            if (newVal != null) {
                $scope.datetime = setDateTimeAndZone(newVal, $scope.order.timeZone);
            } else {
                $scope.datetime = null;
            }
        }, true);
    }
    ]);