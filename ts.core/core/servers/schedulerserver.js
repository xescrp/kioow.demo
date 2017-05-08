//**************** TRAVELER SENSE SCHEDULER SERVER STARTER ******************//
console.log('SCHEDULER SERVER Starting...');
var schedulerserver = require('../interface/scheduler');

schedulerserver.config = {
    workers: 1,
    name: 'WORKER SCHEDULER SERVER'
};
var w3wp = require('yourttoo.common').workerprocess();
w3wp(schedulerserver);
