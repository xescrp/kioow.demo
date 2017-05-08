module.exports = function (options, callback, errorcallback) {
    var membership = options.membership;
    var common = require('yourttoo.common');
    var query = options.query;
    var core = membership.mongo.core;
    var crx = common.eventtrigger.eventcarrier(common.utils.getToken());
    
    crx.on('all.done', function (session) { 
        callback(session);
    });
    crx.on('all.error', function (err) { 
        errorcallback(err);
    });
    
    crx.on('check.user', function (findedusers) {
        findedusers != null && findedusers.length > 0 ? 
        setImmediate(function () { 
            var userid = findedusers[0].user;
            var annex = require('./helpers');
            //build the session
            annex.recoverCredentials({ membership: membership, userid: userid }, 
                function (rs) {
                    rs != null ? 
                    setImmediate(function () {
                        var session = annex.buildSession(rs.user, rs);
                        console.log(session);
                        crx.emit('all.done', session);
                    }) : crx.emit('all.error', 'Something went wrong...user or member not found');
                }, 
                function (err) {
                    crx.emit('all.error', err);
                });
        }) : 
        crx.emit('all.error', 'no users found for your query');
    });

    query != null ? setImmediate(function () {
        core.list('Affiliate').model.find(query)
        .select('_id code user wlcustom')
        .populate('wlcustom')
        .exec(function (err, users) { 
            err != null ? crx.emit('all.error', err) : crx.emit('check.user', users);
        });
    }) : 
    setImmediate(function () { 
        crx.emit('all.error', 'Bad request. Are you forgetting pass parameters for build session command?');
    });
    
}