module.exports = function (conf, callback) {
    var core = conf.core;
    var common = require('yourttoo.common');
    var _ = require('underscore');

    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());
    var query = { $and: [{ code: { $ne: null } }] }; //{ code: 'OMT120' }, 

    cev.on('dmcfetch.error', function (err) {
        console.error(err);
        conf.errors.push({
            code: 'DMC FETCH SAIBAIMAN FAILED',
            error: err,
            date: new Date()
        });

        callback(err, conf);
    });

    cev.on('dmcfetch.done', function (ids) {
        console.log('Fetched ' + ids.length.toString() + ' dmc ids');
        conf.dmcids = _.map(ids, function (dmc) { return dmc._id; });
        conf.dmccodes = _.map(ids, function (dmc) { return dmc.code; });
        callback(null, conf);
    });

    core.list('DMCs').model.find(query)
        .select('_id code')
        .exec(function (err, docs) {
            err != null ? cev.emit('dmcfetch.error', err) : cev.emit('dmcfetch.done', docs);
        });
}