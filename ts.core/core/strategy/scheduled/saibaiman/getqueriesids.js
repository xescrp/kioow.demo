module.exports = function (conf, callback) {
    var core = conf.core;
    var common = require('yourttoo.common');
    var _ = require('underscore');
    console.log('get queries ids... ');
    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());
    var query = { $and: [{ code: { $ne: null } }] }; //{ code: 'OMT120' }, 

    cev.on('queriesfetch.error', function (err) {
        console.error(err);
        conf.errors.push({
            code: 'USERQUERIES FETCH SAIBAIMAN FAILED',
            error: err,
            date: new Date()
        });

        callback(err, conf);
    });

    cev.on('queriesfetch.done', function (ids) {
        console.log('Fetched ' + ids.length.toString() + ' queries ids');
        conf.queriessids = _.map(ids, function (query) { return query._id; });
        conf.queriescodes = _.map(ids, function (query) { return query.code; });
        callback(null, conf);
    });

    core.list('UserQueries').model.find(query)
        .select('_id code')
        .exec(function (err, docs) {
            err != null ? cev.emit('queriesfetch.error', err) : cev.emit('queriesfetch.done', docs);
        });
}