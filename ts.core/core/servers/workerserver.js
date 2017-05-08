//**************** OPEN MARKET TRAVEL CORE WORKER SERVER STARTER ******************//
console.log('WORKER SERVER Starting...');
var utils = require('../tools/index');

var scheduler = require('../interface/scheduler');

scheduler.config = {
    workers: 1,
    name: 'WORKER SCHEDULER SERVER'
};
var w3wp = require('yourttoo.common').workerprocess;
var wp = require(w3wp)(scheduler);
