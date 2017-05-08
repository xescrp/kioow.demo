var _ = require('underscore');
var common = require('yourttoo.common');

module.exports = function (options, callback, errorcallback) { 

    var core = options.core;
    var coreobj = core.corebase;


    var listname = conf.listname; //names: dmcproducts, bookings, userqueries, dmcqueries
    
    var query = require('../factory/querybuilder').querylistbuilding(listname, conf);

    var querystream = coreobj.list('Quotes').model.find(query).stream();
    querystream.on('data', function (doc) {
        options.quoteids.push(doc.id);
    });
    querystream.on('error', function (err) {
        console.log(err);
        errorcallback(err);
    });

    querystream.on('close', function () {
        options.listname = 'userqueries'; //cambiamos el tipo de lista para ejecutar la query de users..
        require('./userqueries')(options, callback, errorcallback);
    });

}