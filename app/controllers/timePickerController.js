angular.module('app')
    .controller('timePickerController', ['$scope', function ($scope) {
        'use strict';

        var outerFunctionValue = $scope.sbBeforeRenderItem();
console.log('mems,',outerFunctionValue);
        angular.extend($scope, {
            hstep :1,
            mstep : 15,
            ismeridian:true,
            shouldDisableTimePicker:outerFunctionValue.disabled.timePicker
        })

        $scope.changed = function () {
           // console.log('Time changed to: ' + $scope.mytime);
        };

/*        $scope.max=new Date();
        $scope.max.setHours(11);

        $scope.min=new Date();
        $scope.min.setHours(3);*/



    $scope.timePickerStatus=function () {
        return ($scope.selectedTime==null || typeof $scope.selectedTime =='undefined') ? true : false
    }

    }
    ]);


