module.exports = function (conf, callback) {
    var core = conf.core;
    var common = require('yourttoo.common');
    var _ = require('underscore');
    console.log('get chats ids... ');
    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());
    var query = { $and: [{ code: { $ne: null } }] }; //{ code: 'OMT120' }, 

    cev.on('chatsfetch.error', function (err) {
        console.error(err);
        conf.errors.push({
            code: 'USERQUERIES FETCH SAIBAIMAN FAILED',
            error: err,
            date: new Date()
        });

        callback(err, conf);
    });

    cev.on('chatsfetch.done', function (ids) {
        console.log('Fetched ' + ids.length.toString() + ' chats ids');
        conf.chatssids = _.map(ids, function (chat) { return chat._id; });
        conf.chatscodes = _.map(ids, function (chat) { return chat.code; });
        callback(null, conf);
    });

    core.list('Chats').model.find(query)
        .select('_id code')
        .exec(function (err, docs) {
            err != null ? cev.emit('chatsfetch.error', err) : cev.emit('chatsfetch.done', docs);
        });
}