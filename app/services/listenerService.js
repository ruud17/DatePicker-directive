angular.module('app')
    .factory('listenerService', function () {
            'use strict';

            var datetime={
                lastDate:null,
                lastTime:null
            }

            function setLastDate(val) {
                datetime.lastDate=val;
                return datetime.lastDate;
            }

            function getLastDate(lastDate) {
                return datetime.lastDate;
            }

            function setLastTime(val) {
                datetime.lastTime=val;
            }

            function getLastTime(lastDate) {
                return datetime.lastTime;
            }

            function getDateTime() {
                return datetime;
            }

            return {
                setLastDate: setLastDate,
                getLastDate:getLastDate,
                setLastTime:setLastTime,
                getLastTime:getLastTime,
                getDateTime:getDateTime
            }
        }
    );
