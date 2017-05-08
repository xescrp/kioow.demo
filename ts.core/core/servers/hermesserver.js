//**************** OPEN MARKET HERMES SERVER STARTER ******************//
console.log('HERMES SERVER Starting...');
var utils = require('../tools/index');

var hermesserver = require('../interface/hermes');

hermesserver.config = {
    workers: 1,
    name: 'HERMES SERVER'
};
var w3wp = require('yourttoo.common').workerprocess();
w3wp(hermesserver);
