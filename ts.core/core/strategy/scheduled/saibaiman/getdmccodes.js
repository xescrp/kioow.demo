module.exports = function (conf, callback) {
    var core = conf.core;
    
    var _ = require('underscore');
    var common = require('yourttoo.common');
    var dmcquery = conf.dmcsquery;
    console.log('fetch selected dmcs. Query: ');
    console.log(dmcquery);
    core.list('DMCs').model.find(dmcquery)
    .select('_id code')
    .exec(function (err, docs) {
        err != null ? process.nextTick(function () {
            callback(err, null);
        }) : process.nextTick(function () {
            conf.dmccodes = null; 
            conf.dmccodes = _.map(docs, function (dmc) { return dmc.code; });
            callback(null, conf);
        });
    });
}
