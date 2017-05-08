module.exports = function (conf, callback) {
    console.timeEnd(conf.waterfalltaskid);
    return callback(null, conf.results);
}