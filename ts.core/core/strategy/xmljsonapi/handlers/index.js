var async = require('async');
module.exports = function (conf) {
    return {
        book : [
            async.apply(require('./book.readyprocess'), conf),
            require('./book.inputvalidation'),
            require('./getcurrencyexchanges'),
            require('./getproduct'),
            require('./book.datavalidation'),
            require('./book.builddates'),
        ],
        find: [
            async.apply(require('./update.readymail'), conf),
            require('./update.notifydmc'),
            require('./update.notifyadmin')
        ],
        getdata: [
            async.apply(require('./new.readymail'), conf),
        ],
        search: [
            async.apply(require('./new.readymail'), conf),
        ]
    }
}