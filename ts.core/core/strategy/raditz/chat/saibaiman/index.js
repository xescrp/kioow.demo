var async = require('async');
module.exports = function (conf) {
    return {
        "new" : [
            async.apply(require('./new.readymail'), conf),
            require('./new.notifyadmin'),
            require('./new.notifydmc'),
        ],
        update: [
            async.apply(require('./update.readymail'), conf),
            require('./update.notifydmc'),
            require('./update.notifyadmin')
        ]
    }
}