
//initialization...
var io = require('socket.io-client');
var events = require('events');
var _ = require('underscore');
var lzw = require('./lib/lzw');
var _api = require('./lib/api');
var _http = require('./lib/httpclient');
//exports for public access

exports.createAPIConnector = function (options) {
    var _create = (function (options) {
        return function (options) {
            var apicnx = new _api.API(options);
            return apicnx;
        }
    })(options);

    return _create(options);
};

exports.generateRequestID = function () {
    return _api.buildTOKEN();
}

exports.http = new _http.HTTPClient();

exports.connector = require('./lib/connector');
exports.httpconnector = require('./lib/httpconnector');
exports.lzip = lzw;

exports.expressconnector = require('./lib/middleware').expressconnector;
exports.BackboneCommander = require('./lib/backbonecommander');


