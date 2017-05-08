module.exports = function (conf, callback) {
    console.log('start process -> update booking elements process.. ');
    conf.currentcurrency = 'EUR';
    conf.errors = [];
    conf.reports = [];
    conf.messages = [];
    conf.results = {};
    setImmediate(function () {
        callback(null, conf);
    });
}