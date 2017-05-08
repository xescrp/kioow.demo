var async = require('async');
module.exports = function (conf) {
    return {
        updatecity : [
            async.apply(require('./update.city'), conf),
            require('./triggerscheduled')
        ],
        updatecountry: [
            async.apply(require('./update.country'), conf),
            require('./triggerscheduled')
        ],
        updatezone: [
            async.apply(require('./update.zone'), conf),
            require('./triggerscheduled')
        ]
    }
}