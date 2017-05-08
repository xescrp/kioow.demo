module.exports = function (options, callback, errorcallback) {
    var _ = require('underscore');
    var common = require('yourttoo.common');
    var async = require('async');

    var core = options.core.corebase;
    var mongo = options.core.mongo;
    var quote = options.document;
    var member = options.member;
    var querymodels = ['Quotes'];
    var modelname = (quote != null && quote.list != null && quote.list.model != null) ? quote.list.model.modelName : options.modelname;

    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());

    cev.on('all.done', function () {
        callback(quote);
    });

    cev.on('update.query', function () {
        var updates = [];
        core.list('UserQueries').model.find({ code: quote.userqueryCode })
            .exec(function (err, docs) {
                _.each(docs, function (item) {
                    updates.push(function (callback) {
                        if (item.quotesstates != null && item.quotesstates.length > 0) {
                            var activestatus = _.find(item.quotesstates, function (dmcstate) {
                                return dmcstate.dmccode == quote.dmccode;
                            });
                            if (activestatus != null) {
                                activestatus.status = quote.status;
                                item.save(function (err, doc) {
                                    callback(err, doc);
                                });
                            }
                            else { callback(null, item); }
                        }
                        else { callback(null, item); }
                    })
                    
                });

                async.parallel(updates, function (err, results) {
                    err != null ? errorcallback(err) : cev.emit('all.done');
                });
            }); 
    });

   
    querymodels.indexOf(modelname) >= 0 ? cev.emit('update.query') : cev.emit('all.done');
}