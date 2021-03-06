﻿module.exports = function (options, callback, errorcallback) {
    var common = require('yourttoo.common');
    var _ = require('underscore');
    var core = options.core;

    var mongo = core.mongo;
    var coreobj = core.corebase;
    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());

    var rq = {
        pricingrequest: options.bookpricing
    };

    rq.core = coreobj;
    rq.auth = options.auth;
    rq.mongo = mongo;

    var _ = require('underscore');
    var common = require('yourttoo.common');

    var saibaimans = require('../chain')(rq);
    var async = require("async");

    console.log('BOOK PRICING - CHANGING PRICES ON BOOKING ....');
    console.log('START CHAIN WATERFALL');

    cev.on('all.done', function (result) {
        callback(result);
    });
    cev.on('all.error', function (err) {
        errorcallback(err);
    });

    async.waterfall(saibaimans.pricing, function (err, result) {
        err != null ? cev.emit('all.error', err) : cev.emit('all.done', result);
    });

}