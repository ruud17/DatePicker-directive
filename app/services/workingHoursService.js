angular.module('app')
    .factory('workingHoursService', function () {
            'use strict';
            var date = new Date();

            function getWorkingHours() {
                var workingTime = {
                    weekdays: {
                        startHours: 7,
                        startMinutes:0,
                        endHours: 20,
                        endMinutes:0

                    },
                    weekends: {
                        startHours: 10,
                        startMinutes:0,
                        endHours: 16,
                        endMinutes:0

                    }
                }
                return workingTime;
            }

            return{
                getWorkingHours:getWorkingHours
            }
        }
    );
