module.exports = function (options, callback, errorcallback) { 
    
    var _ = require('underscore');
    var common = require('yourttoo.common');
    
    var saibaimans = require('../../chain')(options);
    var async = require("async");
    
    console.log('XML/JSON API REST COMMAND [BOOK]...');
    console.log('START HANDLER WATERFALL');
    
    async.waterfall(saibaimans.book, function (err, result) {
        err != null ? errorcallback(err) : callback(result);
    });

}