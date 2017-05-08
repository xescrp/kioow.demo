var async = require('async');
module.exports = function (conf) {
    return {
        'new' : [
            async.apply(require('./new.readyprocess'), conf),
            require('./checkwldirectory'),
            require('./buildsass'),
            require('./buildheader'),
            require('./buildfooter'),
            require('./generategruntconfig'),
            require('./gruntrunner')
        ],
        update: [
            async.apply(require('./update.readyprocess'), conf),
            require('./checkwldirectory'),
            require('./buildsass'),
            require('./buildheader'),
            require('./buildfooter'),
            require('./generategruntconfig'),
            require('./gruntrunner')
        ]
    }
}