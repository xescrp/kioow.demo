
var generateLandingContent = function (callback) {
    var utils = require('../../tools');
    var _ = require('underscore');
    var start = new Date();

    console.log('Landing contents scheduled task at ... ' + start);

    var _mongodb = require('../../core/dbfetch');
    var dbfetch = new _mongodb.MongoFetch();
    var pending = 2;
    //Landing content for zones...
    dbfetch.getLandingZones(function (resultzones) {
        var cCache = require('../../omtcache/cachelocalaccess');
        var rqzones = {
            Key: 'LandingZonesCACHE',
            Item: resultzones
        };
        cCache.pushStore(rqzones, function (rs) {
            pending--;
            if (pending == 0) { 
                callback({
                    ResultOK: true,
                    Message: 'Landing zones and Landing tags content Cache loaded and finished',
                });
            }
            
        });
    });
    //Landing content for tags
    dbfetch.getLandingTags(function (resulttags) {
        var cCache = require('../../omtcache/cachelocalaccess');
        var rqztags = {
            Key: 'LandingTagsCACHE',
            Item: resulttags
        };
        cCache.pushStore(rqztags, function (rs) {
            pending--;
            if (pending == 0) {
                callback({
                    ResultOK: true,
                    Message: 'Landing zones and Landing tags content Cache loaded and finished',
                });
            }
        });

    });
}
var start = exports.start = generateLandingContent;