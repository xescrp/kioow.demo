﻿module.exports = function (options, callback, errorcallback) { 

    var _ = require('underscore');
    var common = require('yourttoo.common');

    var saibaimans = require('./saibaiman')(options);
    var async = require("async");

    console.log('NEW BOOKING SUBSCRIBER ACTIONS STUFF [RADITZ SEED]....');
    console.log('START SAIBAIMAN WATERFALL');

    async.waterfall(saibaimans.new, function (err, result) {
        err != null ? errorcallback(err) : callback(result);
    });

}