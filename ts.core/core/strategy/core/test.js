module.exports = function (options, callback, errorcallback) {
    url = 'http://watchout4snakes.com/wo4snakes/Random/NewRandomSentence';
    var http = require('yourttoo.connector').http;
    var _headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Accept, Accept-Language',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'Accept-Language': 'es-ES,es;q=0.8,en;q=0.6,fr;q=0.4'
    };
    http.post(url, null, _headers, function (results) {
        if (results != null) {
            
            if (results.responseBody != null) {
                var rsp = results.responseBody;
                callback(rsp);
            }
            else {
                callback('nothing to say, but all ok...');
            }
        }
        else {
            callback('nothing to say, but all ok...');
        }
    });

}