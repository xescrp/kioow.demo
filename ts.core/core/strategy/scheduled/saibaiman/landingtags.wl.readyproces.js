module.exports = function (conf, callback) {
    conf.landingtagsb2c = null;
    conf.landingtagsb2c = null;
    conf.landingzonesb2b = null;
    conf.landingzonesb2b = null;
    conf.currentcurrency = 'EUR';
    conf.dmcsquery = { 'membership.b2bchannel': true };
    conf.countryfieldkey = '_id';
    
    conf.selectedcomission = 'b2b';
    conf.decorators = ['product.netpricesync'];

    conf.pushmementoconfig = {
        key: 'LandingTagsWLCACHE',
        item: null
    };
    setImmediate(function () { 
        callback(null, conf);
    });
}