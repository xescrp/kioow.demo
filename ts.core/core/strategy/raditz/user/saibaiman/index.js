var async = require('async');
module.exports = function (conf) {
    return {
        changeemail : [
            async.apply(require('./changeemail'), conf)
        ],
        changepassword: [
            async.apply(require('./changepassword'), conf),
        ], 
        "delete": [
            async.apply(require('./delete'), conf),
        ],
        forgotpassword: [
            async.apply(require('./forgotpassword'), conf),
        ],
        login: [
            async.apply(require('./login'), conf),
        ]
    }
}