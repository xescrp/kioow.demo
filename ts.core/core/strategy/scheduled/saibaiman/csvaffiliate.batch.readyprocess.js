module.exports = function (conf, callback) {

    conf.csvfilepath = 'c:/yourttoo.work/imports/affiliates.js';

    setImmediate(function () { 
        callback(null, conf);
    });
}