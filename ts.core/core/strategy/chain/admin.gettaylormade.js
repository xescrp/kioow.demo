module.exports = function (conf, callback) {

    console.log('getting queries');
    var common = require('yourttoo.common');
    var _ = require('underscore');

    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());

    var done = {
        count: false,
        last: false
    };

    function isdoneandexit() {
        var isdone = _.every(done);
        isdone ? callback(null, conf) : null;
    }

    cev.on('tm.count', function () {
        done.count = true;
        isdoneandexit();
    });

    cev.on('tm.last', function () {
        done.last = true;
        isdoneandexit();
    });

    var core = conf.core;

    core.list('UserQueries').model.find().count(function (err, count) {
        conf.results.taylormades.total = count;
        cev.emit('tm.count');
    })

    core.list('UserQueries').model.find()
        .populate('affiliate')
        .populate('dmcs')
        .populate('traveler')
        .populate('quotes')
        .limit(10)
        .sort({ createdOn: -1 })
        .exec(function (err, docs) {
            err != null ? console.error(err) : null;
            conf.results.taylormades.last = docs;
            cev.emit('tm.last');
        });
}