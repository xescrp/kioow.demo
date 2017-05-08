module.exports = function (conf, callback) {
    conf.landingtagsb2c = null;
    conf.landingtagsb2c = null;
    conf.landingzonesb2b = null;
    conf.landingzonesb2b = null;
    conf.currentcurrency = 'EUR';
    conf.dmcsquery = { 'membership.b2bchannel': true };
    conf.countryfieldkey = '_id';
    conf.decorators = ['product.netpricesync'];
    conf.selectedcomission = 'b2b';

    conf.pushmementoconfig = {
        key: 'LandingZonesWLCACHE',
        item: null
    };
    setImmediate(function () { 
        callback(null, conf);
    });
}