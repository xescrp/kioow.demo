module.exports = function (options, callback) {
    
    var backbone = options.backbone;
    var services = options.services || null;
    var common = require('yourttoo.common');
    var _ = require('underscore');
    var ct = services != null ? services.length : 0;
    var results = { rebootdate: new Date };

    function _addresult(key, rebootresults) {
        results[key] = rebootresults;
        ct--;
        ct == 0 ? callback(results) : null;
    }

    (services != null) ? setTimeout(function () {
        _.each(services, function (service) {
            var cluster = backbone.clusters.get(service);
            if (cluster != null) { 
                cluster.reboot(function (clrRb) { _addresult(service, clrRb) });
            }
        });
    }, 2000) 
    : 
    callback('No services to reboot on your request');
}