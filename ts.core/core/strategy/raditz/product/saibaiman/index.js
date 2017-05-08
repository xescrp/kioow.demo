var async = require('async');
module.exports = function (conf) {
    return {
        product : [
            async.apply(require('./getproduct'), conf),
            require('./builddestinationhashes'),
            require('./cityupdate')
        ],
        booking: [
            async.apply(require('./getproduct'), conf),
            require('./builddestinationhashes'),
            require('./cityupdate')
        ],
        tailormade: [
            async.apply(require('./getproduct'), conf),
            require('./builddestinationhashes'),
            require('./cityupdate')
        ]
    }
}