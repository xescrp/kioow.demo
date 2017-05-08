//**************** OPEN MARKET TRAVEL CORE RESTFUL SERVER STARTER ******************//
console.log('CORE RESTFUL SERVER Starting...');
var utils = require('../tools/index');

var corerestfulserver = require('../interface/restprocess');
corerestfulserver.setconfiguration(require('../configurations/core.restful.config').configuration);

console.log(corerestfulserver);
corerestfulserver.config = {
    workers: 4,
    name: 'WORKER CORE RESTFUL SERVER'
};
var w3wp = require('yourttoo.common').workerprocess();
w3wp(corerestfulserver);
