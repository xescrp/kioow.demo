//**************** OPEN MARKET TRAVEL SOCKET HUB WORKER SERVER STARTER ******************//
console.log('BACKBONE HUB SERVER Starting...');
var utils = require('../tools/index');

var backboneserver = require('../interface/backbone');
backboneserver.config = {
    workers: 1,
    name: 'WORKER SOCKET HUB SERVER'
};
var w3wp = require('yourttoo.common').workerprocess();
w3wp(backboneserver);
