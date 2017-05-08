module.exports = function (conf, callback) {
    conf.landingtagsb2c = null;
    conf.landingtagsb2c = null;
    conf.landingzonesb2b = null;
    conf.landingzonesb2b = null;
    conf.currentcurrency = 'EUR';
    conf.dmcsquery = { 'membership.b2cchannel': true };
    conf.countryfieldkey = '_id';
    conf.selectedcomission = 'b2c';
    
    conf.pushmementoconfig = {
        key: 'LandingZonesCACHE',
        item: null
    };
    setImmediate(function () { 
        callback(null, conf);
    });
}