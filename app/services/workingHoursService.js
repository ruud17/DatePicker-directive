angular.module('app')
    .factory('workingHoursService', function () {
            'use strict';
            var date = new Date();

            function getWorkingHours() {
                var workingTime = {
                    weekdays: {
                        start: date.setHours(7, 0, 0, 0),
                        end: date.setHours(20, 0, 0, 0)

                    },
                    weekends: {
                        start: date.setHours(10, 0, 0, 0),
                        end: date.setHours(16, 0, 0, 0)

                    }
                }
                return workingTime;
            }

            return{
                getWorkingHours:getWorkingHours
            }
        }
    );
