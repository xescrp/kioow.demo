//**************** TRAVELER SENSE MAIL STACK SERVER STARTER ******************//
console.log('MAIL STACK SERVER Starting...');
var utils = require('../tools/index');

var mailstackserver = require('../interface/mailstack');

mailstackserver.config = {
    workers: 1,
    name: 'WORKER MAIL STACK SERVER'
};
var w3wp = require('yourttoo.common').workerprocess();
w3wp(mailstackserver);
