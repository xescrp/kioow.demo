//**************** OPEN MARKET TRAVEL CORE RESTFUL SERVER STARTER ******************//
console.log('MEMBERSHIP RESTFUL SERVER Starting...');
var utils = require('../tools/index');

var membershipserver = require('../interface/membership');

console.log(membershipserver);
membershipserver.config = {
    workers: 1,
    name: 'WORKER MEMBERSHIP SERVER'
};
var w3wp = require('yourttoo.common').workerprocess();
w3wp(membershipserver);
