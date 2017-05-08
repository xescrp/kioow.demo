module.exports = function (options, callback, errorcallback) {
    var core = options.core;
    var started = new Date();
    console.log('Scheduled task started at ' + started);
    var common = require('yourttoo.common');
    var _ = require('underscore');
    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());


    var users = core.list('Users');
    console.log(users);
    var keysfactory = require('../../factory/apikeys');

    users.model.find({ $or: [{ apikey: null }, { apikey: '' }] }, function (err, docs) {
        console.log('finded: ' + docs.length);
        var count = docs.length;
        var total = docs.length;
        _.each(docs, function (user) {
            user.apikey = keysfactory.getAPIkey(user.email, user.password);
            user.save(function (err, doc) { 
                count--;
                console.log('Updated ' + count + '/' + total + ' :: ' + user.email + ' -> ' + user.apikey);
            });
        });
    });
}