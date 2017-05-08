module.exports = function (conf, callback) {
    var core = conf.core;
    var common = require('yourttoo.common');

    var mailtemplate = {
        whitelabel: {
            new: {
                affiliate: '',
                travelersense: '',
                dmc: '',
                traveler: ''
            },
            pay: {
                affiliate: '',
                travelersense: '',
                dmc: '',
                traveler: ''
            },
            update: {
                affiliate: '',
                travelersense: '',
                dmc: '',
                traveler: ''
            }
        },
        b2c: {
            affiliate: '',
            travelersense: '',
            dmc: '',
            traveler: ''
        },
        b2b: {
            affiliate: '',
            travelersense: '',
            dmc: '',
            traveler: ''
        }
    };

    conf.mailtemplate = mailtemplate;

    setImmediate(function () {
        callback(null, conf);
    });
}