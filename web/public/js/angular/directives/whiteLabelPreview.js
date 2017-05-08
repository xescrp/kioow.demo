(function () {
    'use strict';

    var app = angular.module("openMarketTravelApp");
    app
    .directive('whiteLabelPreview', whiteLabelPreview);

    function whiteLabelPreview() {
        var directive = {
            restrict: 'E',
            templateUrl: '/js/angular/directives/views/white-label-preview.html',
            scope: {
                code: "@",
                colors: "="
            },
            controller: whiteLabelPreviewController,
            // note: This would be 'SingleSelectController' (the exported controller name, as string)
            // if referring to a defined controller in its separate file.
            controllerAs: 'vm',
            bindToController: true // because the scope is isolated
        };

        return directive;
    }

    whiteLabelPreviewController.$inject = ["$scope"];

    function whiteLabelPreviewController($scope) {

        var vm = this;
        vm.domain = ".travelersense.es";

        vm.getUrl = function() {
            return "http://" + vm.url;
        };

        $scope.$on('cssColorsChanged', function (event, colors) {
            console.log(event); console.log(colors);
            if (typeof colors === "undefined") {
                colors = angular.copy(vm.colors);
            }

            vm.getUrlWithColors(colors);
        });

        vm.serialize = function(obj) {
            if (typeof obj !== 'undefined') {
                return '?' + Object.keys(obj).reduce(function (a, k) {
                        a.push(k + '=' + encodeURIComponent(obj[k]));
                        return a
                    }, []).join('&')
            } else {
                return '';
            }
        };

        vm.getUrlWithColors = function(colors) {
            vm.url = vm.code + vm.domain + vm.serialize(colors);
            console.log(vm);
        };

        vm.getUrlWithColors(vm.colors);
    }

})();
