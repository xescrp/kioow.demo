var _ = require('underscore');
module.exports = function (conf, callback) {
    conf.gotresultsbyname == false ? setImmediate(function () {
        conf.type == null || conf.type == '' ?
            callback('You must specify the type (parameter) of data you want to recover\r\nData names: cities, countries, tags', conf) :
            setImmediate(function () {
                //allowed ?
                conf.constants.find.allowedcollections[conf.type] == null ? callback('the type of data you want to recover is unknown or not allowed.\r\nData names: cities, countries, tags', conf) :
                    setImmediate(function () {
                        //query only in cities: 
                        var rqquery = conf.type == 'cities' && (conf.countrycode != null && conf.countrycode != '') ?
                            { countrycode: { $in: _.map(conf.countrycode, function (code) { return code.toUpperCase() }) } } : conf.constants.find.queries[conf.type];

                        var fnQ = {
                            core: conf.core,
                            query: rqquery,
                            sortcondition: conf.constants.find.sort,
                            fields: conf.constants.find.fields[conf.type],
                            maxresults: conf.constants.find.max,
                            collectionname: conf.constants.find.allowedcollections[conf.type],
                            auth: conf.auth,
                            environment: conf.environment || 'xmljsonapi',
                        };

                        conf.findquery = fnQ;
                        callback(null, conf);
                    });

            });
    }) : setImmediate(function () { callback(null, conf); });
}