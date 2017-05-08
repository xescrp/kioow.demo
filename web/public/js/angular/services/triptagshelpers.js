/**
 * @ngdoc service
 * @name service.triptagshelpers
 * @requires $log
 * @description
 * 
 * Auxiliars functions to load products/tailormades requests
 */
app.service('triptagshelpers', function (
    $log,
    yto_api) {
    'use strict';
    return {
        getTripTags : _getTripTags
    };

    /**
     * @ngdoc method
     * @name _getTripTags
     * @methodOf service.triptagshelpers
     * @description
     * 
     * Public: get triptags by query
     * @param {Object} options, settings para la query de triptags
     * @param {Object} callback, funcion que retorna
     * 
     */
     
    function _getTripTags(options, callback){ 
        console.log ('options ',options);
        var settings = {};
        settings.query = (options != null && options.query != null)? options.query : {state: 'published'};
        settings.sortcondition = (options != null && options.sortcondition != null)? options.sortcondition : {sortOrder: 1};
        settings.fields = (options != null && options.fields != null)? options.fields : '_id slug categories description label label_en mainImage';
        
        var rq = {
            command: 'find',
            service: 'api',
            request: {
                query: settings.query,
                sortcondition: settings.sortcondition,
                collectionname: 'TripTags',
                populate : {path: 'categories'},
                fields : settings.fields
            }
        };

        var rqCB = yto_api.send(rq);

        // response OK
        rqCB.on(rqCB.oncompleteeventkey, function (rsp) {               
             if(callback != null){
                 callback(rsp);
             }                
        });
        // response KO
        rqCB.on(rqCB.onerroreventkey, function (err) {                
            console.log('ERROR _getTripTags. Details: ',err);
            if (callback) {
                callback(null);
            }
        });       
    }

});


