﻿module.exports = function (options, callback, errorcallback) {

    var _ = require('underscore');
    var common = require('yourttoo.common');

    var saibaimans = require('./saibaiman')(options);
    var async = require("async");

    console.log('A NEW PAYMENT FOR BOOKING HAS BEEN DONE...');
    console.log('START SAIBAIMAN WATERFALL');

    async.waterfall(saibaimans.pay, function (err, result) {
        err != null ? errorcallback(err) : callback(result);
    });

}