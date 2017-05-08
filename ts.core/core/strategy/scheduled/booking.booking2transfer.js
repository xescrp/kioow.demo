module.exports = function (options, callback, errorcallback) {
    var handlers = require('./saibaiman')(options);
    var async = require('async');

    async.waterfall(handlers.bookingtransfer, function (err, result) {
        err != null ? setImmediate(function () {
            console.error('BATCH PROCESS FINISHED WITH ERROR!!');
            console.error(err);
            errorcallback(err);
        }) : setImmediate(function () {
            console.log('BATCH PROCESS FINISHED OK!!');
            console.log(result);
            callback(result);
        });
    });
}