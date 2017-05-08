/**
 * https://github.com/toddmotto/angular-styleguide
 */

'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('openMarketTravelApp',
    [
        //'ngRaven',
        'ngRoute',
        'ui.bootstrap',
        'toaster',
        'ngCookies',
        'checklist-model',
        'autocompleteGmaps',
        'ngSanitize',
        'bootstrapLightbox',
        // 'teamRockMotion.servivuelo',
        'color.picker'
    ]);

app.config(function ($httpProvider, tsImhotepProvider) {
    //Enable cross domain calls
    console.log(tsImhotep);

    console.log(tsImhotep.getCollectionConfig('DMCProducts'));
    $httpProvider.defaults.useXDomain = true;
    //Remove the header used to identify ajax call  that would prevent CORS from working
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

});

app.config(function ($locationProvider) {

    var suphtml5 = supports_history_api();
    //console.log(suphtml5);

    $locationProvider.html5Mode({
        enabled: suphtml5,
        requireBase: false
    }).hashPrefix('!');

    function supports_history_api() {
        return !!(window.history && history.pushState);
    }
});


app.filter('iif', function () {
    return function (input, trueValue, falseValue) {
        return input ? trueValue : falseValue;
    };
});

