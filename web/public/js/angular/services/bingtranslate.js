var app = angular.module("openMarketTravelApp");


app.service('bingtranslate', function (http_service) {
    var urltranslator = 'http://api.microsofttranslator.com/V2/Http.svc/Translate';

    return {
        translate: _translate
    }

    function _translate(text, fromlanguage, tolanguage, callback) {

        var url = urltranslator;

        var data = {
            text: text,
            from: fromlanguage,
            to: tolanguage
        };

        _get_token(function (token) {

            var headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': '*/*',
                'Accept-Encoding': 'gzip,deflate',
                'Accept-Language': 'es-ES,es;q=0.8,en;q=0.6,fr;q=0.4',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
                'Authorization': 'bearer ' + token  
            };

            http_service.http_request_with_headers(url, headers, 'GET', data, null).then(
            function (translation) {
                if (translation) callback(translation);
                else throw 'An unknown error has ocurred!';
            },
            function (err) {
                throw 'An unknown error has ocurred!';
            });


        });

    }

    function _get_token(callback) {
        var url = 'https://datamarket.accesscontrol.windows.net/v2/OAuth2-13';

        var data = {
            grant_type: 'client_credentials',
            client_id: '0600dc54-2e06-4634-abff-a872b2e1820d',
            client_secret: '1WMJPfdXhfIwSHtLbdgDhWkLGDjGLkf0/wmugtWSC3Q',
            scope: 'http://api.microsofttranslator.com'
        };

        var headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type, Accept, Accept-Language',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
            'Accept-Language': 'es-ES,es;q=0.8,en;q=0.6,fr;q=0.4'
        };
        http_service.http_request_with_headers(url, headers, 'POST', null, data).then(
                function (access) {
                    if (access.access_token) callback(access.access_token);
                    else throw 'An unknown error has ocurred!';
                },
                function (err) {
                    throw 'An unknown error has ocurred!';
                });


    }
    

});

