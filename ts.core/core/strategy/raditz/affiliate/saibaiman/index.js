var async = require('async');
module.exports = function (conf) {
    return {
        "new" : [
            async.apply(require('./new.affiliateemail'), conf),
            require('./new.adminemail')
        ],
        update: [
            async.apply(require('./update.registervalid'), conf),
            require('./update.emailchanged')
        ]
    }
}