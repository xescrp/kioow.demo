module.exports = function (conf, callback) {
    conf.gotresultsbyname = false;
    conf.gotresultsbyname = (conf.destinationcountries != null && conf.destinationcountries.length > 0) || (conf.destinationcities != null && conf.destinationcities.length > 0);

    conf.results = conf.type == 'countries' ? conf.destinationcountries : null;
    conf.results = conf.type == 'cities' ? conf.destinationcities : null;

    setImmediate(function () {
        callback(null, conf);
    });
}