var async = require('async');
module.exports = function (conf) {
    return {
        book: [
            async.apply(require('./xmljsonprocess.common.ready'), conf),
        ],
        budget: [
            async.apply(require('./xmljsonprocess.common.ready'), conf),
        ],
        find: [
            async.apply(require('./xmljsonprocess.common.ready'), conf),
            require('../../chain/getcountriesbyname'),
            require('../../chain/getcitiesbyname'),
            require('./check.find.gotresultsbyname'),
            require('./find.query.ready'),
            require('./find.caller')
        ],
        search: [
            async.apply(require('./xmljsonprocess.common.ready'), conf),
            require('../../chain/getcountriesbyname'),
            require('../../chain/getcitiesbyname'),
            require('./check.search.gotresultsbyname'),
            require('./search.query.ready'),
            require('./search.caller')
        ],
        fetch: [
            async.apply(require('./xmljsonprocess.common.ready'), conf),
            require('./fetch.query.ready'),
            require('./fetch.caller')
        ]
    };
}