module.exports = function (conf, callback) {
    var common = require('yourttoo.common');
    conf.waterfalltaskid = common.utils.getToken();
    console.time(conf.waterfalltaskid);
    return callback(null, conf);
}