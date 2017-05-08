var updateproducts = require('./prdupdateCR.json');
module.exports = function (options, callback, errorcallback) {
    var core = options.core;
    var started = new Date();
    console.log('Scheduled task started at ' + started);
    var common = require('yourttoo.common');
    var _ = require('underscore');
    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());
    var totals = {
        activations: activation.length,
        activated: 0
    };

    var codes = _.pluck(updateproducts, 'code');
    
    _.each(codes, function (code) {
        core.list('dmcproducts'), model.find({ code: code })
        .exec(function (err, docs) {
            err != null ? console.log(err): null;
            docs != null && docs.length > 0 ? console.log('product ' + code + ' found!') : console.log('product ' + code + ' NOT FOUND!');
        });
    });
    
}