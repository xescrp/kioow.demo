//**************** TRAVELER SENSE RADITZ SERVER STARTER ******************//
console.log('RADITZ SERVER Starting...');
var utils = require('../tools/index');

var raditzserver = require('../interface/raditz');

raditzserver.config = {
    workers: 1,
    name: 'RADITZ SERVER'
};
var w3wp = require('yourttoo.common').workerprocess();
w3wp(raditzserver);
