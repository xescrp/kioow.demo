module.exports = function (options, callback, errorcallback) {
    
    var _ = require('underscore');
    var common = require('yourttoo.common');
    
    var saibaimans = require('./saibaiman')(options);
    var async = require("async");
    
    console.log('A WHITE LABEL CUSTOMIZATION HAS BEEN UPDATED...');
    console.log('START SAIBAIMAN WATERFALL');
    
    async.waterfall(saibaimans.update, function (err, result) {
        err != null ? errorcallback(err) : callback(result);
    });

}