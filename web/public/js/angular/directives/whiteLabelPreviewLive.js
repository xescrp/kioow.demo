(function () {
    'use strict';

    angular
        .module('openMarketTravelApp')
        .directive('whiteLabelPreviewLive', whiteLabelPreviewLive);

    function whiteLabelPreviewLive() {
        var directive = {
            bindToController: true,
            controller: whiteLabelPreviewLiveCtrl,
            controllerAs: 'vm',
            link: link,
            restrict: 'A',
            scope: {}
        };
        return directive;

        function link(scope, element, attrs) {

            function parseParams(str) {
                return str.split('&').reduce(function (params, param) {
                    var paramSplit = param.split('=').map(function (value) {
                        return decodeURIComponent(value.replace('+', ' '));
                    });
                    params[paramSplit[0]] = paramSplit[1];
                    return params;
                }, {});
            }

            var params = window.location.href.split("?")[1];

            if(params != undefined) {
                var colors = parseParams(params);
                element.append("<style>" +
                    "body { background-color: " + colors.brand_background + " !important;}" +
                    ".buscador-destino-wrap { background-color: " + colors.brand_alternate + " !important;}" +
                    ".inspiration-wrap .inspiration-summary:after { border-color: " + colors.brand_alternate + " !important;}" +
                    ".inspiration-wrap .inspiration-summary-box { background-color: " + colors.brand_alternate + " !important;}" +
                    ".btn-danger { background-color: " + colors.brand_danger + " !important;}" +
                    ".text-red { color: " + colors.brand_danger + " !important;}" +
                    ".landing-tags .tagblock .tb-icon { background-color: " + colors.brand_danger + " !important;}" +
                    ".text-red, .landing-tags .tagblock .tag-offers .tag-offer .tag-offer-price { color: " + colors.brand_danger + " !important;}" +
                    ".label-danger { background-color: " + colors.brand_danger + " !important;}" +
                    ".btn-primary { background-color: " + colors.brand_primary + " !important;}" +
                    ".inspiration-wrap .inspiration-results .blue-shade { background-color: " + colors.brand_primary + " !important;}" +
                    "</style>");

            }
        }
    }

    function whiteLabelPreviewLiveCtrl() {

    }

})();