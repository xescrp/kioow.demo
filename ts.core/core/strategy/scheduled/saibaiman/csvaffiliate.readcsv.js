module.exports = function (conf, callback) { 

    setImmediate(function () {
        var affitoimport = require(conf.csvfilepath);
        conf.affiliatescsv = affitoimport;
        callback(null, conf);
    });
}