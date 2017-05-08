var async = require('async');
module.exports = function (conf) {
    return {
        "new" : [
            async.apply(require('./new.readymail'), conf),
            require('./new.adminemail'),
            require('./new.affiliateemail'),
            require('./new.updatehistoric')
        ],
        update: [
            async.apply(require('./update.canceladminemail'), conf),
            require('./update.updatehistoric'),
        ]
    }
}