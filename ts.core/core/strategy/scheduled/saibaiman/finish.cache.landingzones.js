module.exports = function (conf, callback) {
    setImmediate(function () { 
        callback(null, { ResultOK: true, result : conf.pushmementoconfig.item });
    });
}