//**************** OPEN MARKET TRAVEL MEMENTO WORKER SERVER STARTER ******************//
console.log('MEMENTO SERVER Starting...');
var utils = require('../tools/index');

var memento = require('../interface/memento');

memento.config = {
    workers: 1,
    name: 'MEMENTO SERVER'
};
var w3wp = require('yourttoo.common').workerprocess();
var wp = w3wp(memento);
