var async = require('async');
module.exports = function (conf) {
    return {
        updatebatch : [
            async.apply(require('./batchstarttimer'), conf),
            require('./batchcollectionroller'),
            require('./batchendtimer')
        ]
    }
}