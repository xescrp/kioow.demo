
//Cache KEYS
//var dmcLocationsKEY = 'DMCLocationsCACHE';
//var productLocationsKEY = 'ProductLocationsCACHE';
//var productCountriesKEY = 'ProductCountriesCACHE';
//var productsKey = 'ProductsCACHE';
//var clientLocationsKEY = 'ClientLocationsCACHE';
//var dmcsKEY = 'DMCsCACHE';

var cacheEngine = function (req, res, next) {

    var session = null;
    var utils = require('../utils');
    var filepaths = require('../routes/diskfilepaths').filepaths;

    var getSettings = require('nconf');
    getSettings.env().file({ file: filepaths.configurationfile });
    var cacheurl = getSettings.get('cacheurl');


    if ((req.path.indexOf('/img/') > -1) || 
        (req.path.indexOf('/css/') > -1) ||
        (req.path.indexOf('/fonts/') > -1) || 
        (req.path.indexOf('/partials/') > -1) ||
        (req.path.indexOf('/sass/') > -1) ||
        (req.path.indexOf('/datadummy/') > -1) ||
        (req.path.indexOf('/js/') > -1)) {
        
        next();
    }
    else {
        var cacheMgr = {
            fixedKeys : {
                //Cache KEYS
                dmcLocationsKEY : 'DMCLocationsCACHE',
                productLocationsKEY : 'ProductLocationsCACHE',
                clientLocationsKEY : 'ClientLocationsCACHE',
                productCountriesKEY: 'ProductCountriesCACHE',
                productsKEY: 'ProductsCACHE',
                dmcsKEY : 'DMCsCACHE'
            },
            methods: {
                recover: _recover,
                store: _store,
                recoverM: _recover
            }
        }
        req.omtcache = cacheMgr;
        next();
    }
    
    function _recover(key, callback) {
        //dependencies
        try {
            //recover token from request
            //console.log(request.cookies);
            var token = key;
            
            var nosession = {
                ResultOK: false,
                Message: 'No cache found.'
            };
            var StorageRequest = {
                key : key,
                Item : null
            };
            if (token != null && token != '') {
                var url = cacheurl + '/api/recoverstore';
                if (key.indexOf(',') > -1) { 
                    url = cacheurl + '/api/recoverstores';
                }
                
                utils.http.Get(url, StorageRequest, utils.headers, function (results) {
                    
                    if (results) {
                        var item = results.responseBody;
                        //console.log(item);
                        if (item != null && item != '') {
                            callback(JSON.parse(item));
                        }
                        else {
                            callback(null);
                        }
                    //callback(JSON.parse(item));
                    }
                    else {
                        callback(nosession);
                    }
                });
            } else {
                callback(null);
            }
        }
        catch (err) {
            console.log('Error recovering cache... ');
            console.log(err);
            callback(null);
        }
    }

    function _store(key, item, callback) {
        //dependencies
        try {
            //recover token from request
            //console.log(request.cookies);
            var token = key;
            
            StorageRequest = {
                Key : key,
                Item : item
            };
            
            
            if (token != null && token != '') {
                var url = cacheurl + '/api/store';
                
                utils.http.Post(url, StorageRequest, utils.headers, function (results) {
                    if (results) {
                        callback(results.responseBody);
                    }
                    else {
                        callback(nosession);
                    }
                });
            }
            else {
                callback(null);
            }
        }
        catch (err) { 
            console.log('Error recovering cache... ');
            console.log(err);
            callback(null);
        }
    }

}

module.exports.cacheEngine = cacheEngine;