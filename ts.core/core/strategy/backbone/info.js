module.exports = function (options, callback, errorcallback) {
    var backbone = options.backbone;
    var properties = options.keys || ['clusters'];
    var common = require('yourttoo.common');
    var _ = require('underscore');
    var rs = {};
    var ct = properties.length;
    _.each(properties, function (prop) {
        rs[prop] = (prop == 'clusters') ? JSON.stringify(backbone[prop]) : backbone[prop];
        ct--;
        ct == 0 ? callback(rs) : null;
    });
}