'use strict';
var app = angular.module('openMarketTravelApp');

app.directive('matchpass', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        scope: {
            matchpass: '='
        },
        link: function(scope, elem, attrs, ctrl) {
            scope.$watch(function() {
                var modelValue = ctrl.$modelValue || ctrl.$$invalidModelValue;
                return (ctrl.$pristine && angular.isUndefined(modelValue)) || scope.matchpass === modelValue;
            }, function(currentValue) {
                ctrl.$setValidity('matchpass', currentValue);
            });
        }
    };
});