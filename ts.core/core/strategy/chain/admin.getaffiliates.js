module.exports = function (conf, callback) {

    console.log('getting affiliates');
    var common = require('yourttoo.common');
    var _ = require('underscore');

    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());

    var done = {
        count: false,
        last: true
    };

    function isdoneandexit() {
        var isdone = _.every(done);
        isdone ? callback(null, conf) : null;
    }

    cev.on('affi.count', function () {
        done.count = true;
        isdoneandexit();
    });

    cev.on('affi.last', function () {
        done.last = true;
        isdoneandexit();
    });

    var core = conf.core;

    core.list('Affiliate').model.find().count(function (err, count) {
        conf.results.affiliates.total = count;
        cev.emit('affi.count');
    })

}