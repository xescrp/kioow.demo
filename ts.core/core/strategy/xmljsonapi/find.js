module.exports = function (options, callback, errorcallback) {
    var common = require('yourttoo.common');
    var _ = require('underscore');
    var core = options.core;

    //var mongo = core.mongo;
    //var coreobj = core.corebase;
    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());
    console.log(options);
    var rq = {
        core: core,
        type: options.type,
        countrycode: options.countrycode,
        countrynames: options.countrynames,
        citynames: options.citynames,
        auth: options.auth
    };
    
    var _ = require('underscore');
    var common = require('yourttoo.common');

    var saibaimans = require('./chain')(rq);
    var async = require("async");

    console.log('FIND ITEM TYPES FOR XMLJSON API....');
    console.log('START CHAIN WATERFALL');

    cev.on('all.done', function (result) {
        callback(result);
    });
    cev.on('all.error', function (err) {
        errorcallback(err);
    });

    async.waterfall(saibaimans.find, function (err, result) {
        err != null ? cev.emit('all.error', err) : cev.emit('all.done', result);
    });

}