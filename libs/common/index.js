

module.exports.eventtrigger = require('./lib/eventtrigger');
module.exports.remoteendpoint = require('./lib/remoteendpoint');

module.exports.hashtable = require('./lib/hashtable');
module.exports.queue = require('./lib/queue');
module.exports.threading = require('./lib/threading');
module.exports.icpworker = require('./lib/icpworker');
module.exports.utils = require('./lib/utils');
module.exports.icp = require('./lib/ICP');
module.exports.staticdata = require('./lib/staticdata');
module.exports.mailtemplates = require('./lib/mailtemplates');
module.exports.swigtools = require('./lib/swigtools');
module.exports.pricemachine = require('./lib/pricemachine');
module.exports.bookpricemachine = require('./lib/book.pricemachine');
module.exports.schemadefinitions = require('./lib/schema.rel');
module.exports.models = {
    omt: require('./models-omt'),
    cms: require('./models-cms'),
    help: require('./models-help')
}

var workerspath = require('path').dirname(module.filename);

workerspath = this.utils.replaceAll(workerspath, '\\', '/') + '/';

module.exports.workerspath = workerspath;
module.exports.worker = function (){
    return require(workerspath + 'lib/worker');
};
module.exports.workerprocess = function () {
    return require(workerspath + 'lib/workerprocess');
};
module.exports.workerdaemon = function () {
    return require(workerspath + 'lib/workerdaemon')
};