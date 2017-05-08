
var Translator = function () {
    this.serviceName = 'Bing|Google Translator Connector';
}

Translator.prototype.translate = function (options, callback) {
    if (options.service == 'bing') {
        this.bingtranslate(options.text, options.fromlanguage, options.tolanguage, function (translation) { 
            callback({
                ResultOK: true,
                Translation: translation,
                Message: 'Translation done'
            });
        });
    }
    //default case...
    if (options.service == null || options.service == 'google' || options.service == '') { 
        this.googletranslate(options.text, options.fromlanguage, options.tolanguage, function (translation) {
            callback({
                ResultOK: true,
                Translation: translation,
                Message: 'Translation done'
            });
        });
    }
}

Translator.prototype.bingtranslate = function (text, fromlanguage, tolanguage, callback) {
    var urltranslator = 'http://api.microsofttranslator.com/V2/Http.svc/Translate';
    
    var url = urltranslator;
    
    var data = {
        text: text,
        from: fromlanguage,
        to: tolanguage
    };
    
    _get_token(function (token) {
        console.log('Got the token to translate...' + token);
        var headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip,deflate',
            'Accept-Language': 'es-ES,es;q=0.8,en;q=0.6,fr;q=0.4',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
            'Authorization': 'bearer ' + token
        };
        
        var http = require('yourttoo.connector').http;
        
        http.get(url, data, headers, function (results) {
            if (results) {
                if (results.responseBody) {
                    
                    var xml = results.responseBody;
                    var parseString = require('xml2js').parseString;
                    
                    parseString(xml, function (err, result) {
                        if (err) {
                            throw err;
                        }
                        console.log(result);
                        if (result.string) {
                            callback([result.string._]);
                        }
                        else {
                            throw 'Ocurrio un error en el servicio de traduccion...' + result.html.body;
                        }
                        
                    });
                }
                else {
                    throw 'An unknown error has ocurred';
                }
            }
            else {
                throw 'An unknown error has ocurred';
            }
        });

    });
}

Translator.prototype.googletranslate = function (text, fromlanguage, tolanguage, callback) {
    var googlekey = 'AIzaSyDrMo8CvzQ3edI44sgDa7j53MxW1PP6zM8'; //omtcore.get('google.translatorServerKey');
    var urltranslator = 'https://www.googleapis.com/language/translate/v2';
    
    var data = {
        key: googlekey,
        q: text,
        source: fromlanguage,
        target: tolanguage
    };
    
    var http = require('yourttoo.connector').http;
    
    http.get(urltranslator, data, null, function (results) {
        if (results) {
            if (results.responseBody) {
                console.log(results.responseBody);
                var translationO = JSON.parse(results.responseBody);
                var translations = [];
                if (translationO.data.translations) {
                    for (var i = 0; i < translationO.data.translations.length; i++) {
                        translations.push(translationO.data.translations[i].translatedText);
                    }
                }
                else {
                    throw 'Cannot get any translation from the server...Try again';
                }
                callback(translations);
            }
            else {
                throw 'An unknown error has ocurred';
            }
        }
        else {
            throw 'An unknown error has ocurred';
        }
    });

}

function _get_token(callback) {
    
    var url = 'https://datamarket.accesscontrol.windows.net/v2/OAuth2-13';
    
    var _headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Accept, Accept-Language',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'Accept-Language': 'es-ES,es;q=0.8,en;q=0.6,fr;q=0.4'
    };
    var data = {
        grant_type: 'client_credentials',
        client_id: '0600dc54-2e06-4634-abff-a872b2e1820d',
        client_secret: '1WMJPfdXhfIwSHtLbdgDhWkLGDjGLkf0/wmugtWSC3Q',
        scope: 'http://api.microsofttranslator.com'
    };
    
    //data =
    //'grant_type=client_credentials&' +
    //'client_id=0600dc54-2e06-4634-abff-a872b2e1820d&' +
    //'client_secret=1WMJPfdXhfIwSHtLbdgDhWkLGDjGLkf0/wmugtWSC3Q&' +
    //'scope=http://api.microsofttranslator.com';
    
    var http = require('yourttoo.connector').http;
    
    http.postform(url, data, _headers, function (results) {
        
        if (results != null) {
            
            if (results.responseBody != null) {
                
                var rsp = JSON.parse(results.responseBody);
                
                callback(rsp.access_token);
            }
            else {
                throw 'An unknown error has ocurred';
            }
        }
        else {
            throw 'An unknown error has ocurred';
        }
    });
}
module.exports.Translator = Translator;