module.exports = function (conf, callback) {
    var core = conf.core;
    var common = require('yourttoo.common');
    var _ = require('underscore');
    console.log('get quotes ids... ');
    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());
    var query = { $and: [{ code: { $ne: null } }] }; //{ code: 'OMT120' }, 

    cev.on('quotefetch.error', function (err) {
        console.error(err);
        conf.errors.push({
            code: 'QUOTES FETCH SAIBAIMAN FAILED',
            error: err,
            date: new Date()
        });

        callback(err, conf);
    });

    cev.on('quotefetch.done', function (ids) {
        console.log('Fetched ' + ids.length.toString() + ' quote ids');
        conf.quotesids = _.map(ids, function (quote) { return quote._id; });
        conf.quotescodes = _.map(ids, function (quote) { return quote.code; });
        callback(null, conf);
    });

    core.list('Quotes').model.find(query)
        .select('_id code')
        .exec(function (err, docs) {
            err != null ? cev.emit('quotefetch.error', err) : cev.emit('quotefetch.done', docs);
        });
}