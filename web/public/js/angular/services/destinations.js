/**
 * @ngdoc service
 * @name service.destinations_service
 * @requires $rootScope
 * @requires http_service
 * @description
 * 
 * Load destinations/triptags json files
 */

app.service('destinations_service', function ($rootScope, http_service) {
    'use strict';
    var load = {
        citiesfile: false,
        countriesfile: false,
        zonesfile: false,
        continentcountriesfile: false,
        productcountries: false,
        productcountriesnorm_es: false,
        productcountriesnorm_en: false,
        triptags: false
    };
    var version = '';
    if (typeof appversion !== 'undefined') {
        version = appversion;
    }
    var hour = Math.floor(new Date().getTime()/3600000);
    var dnow = new Date();
    var citiesfile = '/data/cities.json?v='+version,
        countriesfile = '/data/countries.json?v='+version,
        zonesfile = '/data/zones.json?v='+version,
        continentcountriesfile = '/data/continentcountries.json?v='+version,
        productcountries = '/data/productcountries.json?v='+version,
        productcountriesnorm_es = '/data/productcountrieslatnorm_es.json?v=' + hour,
        tailorcountriesnorm_es = '/data/allproductcountrieslatnorm_es.json?v='+hour,
        productcountriesnorm_en = '/data/allproductcountrieslatnorm_en.json?v='+hour,
        triptags = '/data/triptagsfilter.json?v='+version;
        

    var destinationsSingleton = {
        zones: [],
        countries: [],
        cities: [],
        productcountries: [],
        productcountriesnorm_es: [],
        tailorcountriesnorm_es: [],
        productcountriesnorm_en: [],
        continentcountries: [],
        triptags: [],
        reload : function () { 
            loadfiles();
        },
        reloadfile: function (url, target, callback, errorcallback) { 
            loadfile(url, target, callback, errorcallback);
        },
        findcities : function (options) { 
            var results = _.filter(this.cities, function (city) { return (options.search.indexOf(city[options.fieldname]) >= 0) });
            return results;
        },
        findcountries : function (options) {
            var results = _.filter(this.countries, function (country) { return (options.search.indexOf(country[options.fieldname]) >= 0) });
            return results;
        },
        findtag : function (options) {
            var results = _.filter(this.triptags, function (tag) { return (options.search.indexOf(tag[options.fieldname]) >= 0) });
            return results;
        },
        find: function (options) {
            //ex: { search: 'es', fieldname: 'slug', collection: destinationsSingleton.countries }
            //ex: { search: '56791a1049b551f01ba3b63b', fieldname: '_id', collection: destinationsSingleton.countries }
            var findtext = options.search || null; 
            var findfield = options.fieldname || null;
            var collection = options.collection || null;
            var results =
                ((collection != null) &&
                (findtext != null && findtext != '') && 
                (findfield != null && findfield != '')) ? 
                    _.filter(collection, function (item) { return item[findfield] == findtext; }) : null;

            return results;
        }
    };
    //single facility for get a file
    function loadfile(url, target, callback, errorcallback) { 
        http_service.http_request(url, 'GET', null, null).then(
        function (data) {
            target != null ? target = data : null;
            callback != null ? callback(data) : null;
        },
        function (err) {
            //handling this error....
            console.log(err);
            errorcallback != null ? errorcallback(err) : null;
        });
    }
    
    function _loademit(filename) { 

        load[filename] = true;
        $rootScope.$broadcast('destinations.fileloaded', filename);
        var done = true;
        for (var prop in load) {
            done = done && load[prop];
            if (!done) { break; }
        }

        done ? $rootScope.$broadcast('destinations.loaded', destinationsSingleton) : null; 
    }
    //massive facility for get files
    function loadfiles() { 
        loadfile(citiesfile, null, function (data) { destinationsSingleton.cities = data; _loademit('citiesfile'); });
        loadfile(countriesfile, null, function (data) { destinationsSingleton.countries = data; _loademit('countriesfile');});
        loadfile(zonesfile, null, function (data) { destinationsSingleton.zones = data; _loademit('zonesfile');});
        loadfile(continentcountriesfile, null, function (data) { destinationsSingleton.continentcountries = data; _loademit('continentcountriesfile');});
        loadfile(productcountries, null, function (data) { destinationsSingleton.productcountries = data; $rootScope.$broadcast('productcountries_loaded', data); _loademit('productcountries');});
        loadfile(productcountriesnorm_es, null, function (data) { destinationsSingleton.productcountriesnorm_es = data; $rootScope.$broadcast('productcountriesnorm_es_loaded', null); _loademit('productcountriesnorm_es');});
        loadfile(tailorcountriesnorm_es, null, function (data) { destinationsSingleton.tailorcountriesnorm_es = data; _loademit('tailorcountriesnorm_es');});
        loadfile(productcountriesnorm_en, null, function (data) { destinationsSingleton.productcountriesnorm_en = data; _loademit('productcountriesnorm_en'); });
        loadfile(triptags, null, function (data) { destinationsSingleton.triptags = data; _loademit('triptags'); });
    }
    
    loadfiles();

    return destinationsSingleton;
});