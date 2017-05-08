module.exports = function (conf, callback) {

    console.log('getting dmcs');
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

    cev.on('dmc.count', function () {
        done.count = true;
        isdoneandexit();
    });

    cev.on('dmc.last', function () {
        done.last = true;
        isdoneandexit();
    });

    var core = conf.core;

    core.list('DMCs').model.find().count(function (err, count) {
        conf.results.dmcs.total = count;
        cev.emit('dmc.count');
    })
    
}