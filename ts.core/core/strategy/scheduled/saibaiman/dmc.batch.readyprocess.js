module.exports = function (conf, callback) {

    conf.currentcurrency = 'EUR';
    conf.dmcsquery = { 'code': { $ne: null }};

    setImmediate(function () { 
        callback(null, conf);
    });
}