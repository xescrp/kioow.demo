var async = require('async');
module.exports = function (conf) {
    return {
        "new" : [
            async.apply(require('./new.readymailbooking'), conf),
            require('./new.adminemail'),
            require('./new.affiliateemail'),
            //require('./new.dmcemail'),
            require('./new.travelermail'),
            require('./commit')
        ],
        "pay" : [
            async.apply(require('./pay.readymailbooking'), conf),
            require('./pay.adminemail'),
            require('./pay.affiliateemail'),
            //require('./pay.dmcemail'),
            require('./pay.travelermail')
        ],
        update: [
            async.apply(require('./update.notifycancellationowner'), conf),
            require('./update.notifycancellationdmc'),
            require('./update.notifycancellationadmin'),
            require('./update.notifytransferchangeadmin'),
            //require('./update.notifytransferchangedmc'),
            require('./update.notifytravelerschangeadmin'),
            //require('./update.notifytravelerschangedmc'),
            require('./update.notifytravelerschangeowner')
        ]
    }
}