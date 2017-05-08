module.exports = function (conf, callback) {
    
    conf.currentcurrency = 'EUR';
    conf.errors = [];
    conf.reports = [];
    conf.messages = [];
    setImmediate(function () { 
        callback(null, conf);
    });
}