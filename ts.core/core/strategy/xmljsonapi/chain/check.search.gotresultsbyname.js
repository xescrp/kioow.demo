module.exports = function (conf, callback) {
    conf.gotresultsbyname = false;
    conf.gotresultsbyname = (conf.destinationcountries != null && conf.destinationcountries.length > 0) || (conf.destinationcities != null && conf.destinationcities.length > 0);

    conf.searchincountries = conf.destinationcountries;
    conf.searchincities = conf.destinationcities;

    setImmediate(function () {
        callback(null, conf);
    });
}