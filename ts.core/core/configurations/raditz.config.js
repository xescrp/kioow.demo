var common = require('yourttoo.common');
var _ = require('underscore');
var configuration = {
    subjects: _.pluck(common.staticdata.hermessuscriptions, 'subject'),
    urlhermes: 'http://localhost:7000',
    filter: ['whitelabel', 'bookings2', 'payments'],
    port: 11000
};

module.exports.configuration = configuration;