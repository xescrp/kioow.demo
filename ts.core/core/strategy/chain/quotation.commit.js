module.exports = function (conf, callback) {
    setImmediate(function () {
        callback(null, conf.results);
    });
}