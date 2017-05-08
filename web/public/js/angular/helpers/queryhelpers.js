/**
 * @ngdoc service
 * @name service.queryhelpers
 * @requires $log
 * @description
 * 
 * Auxiliars functions to build or show userquerys/tailormade requests
 */

app.service('queryhelpers', function ($log) {
    'use strict';
    return {
        getQueryCities :        _getQueryCities,
        getUniqueCountries :    _getUniqueCountries,
        getUniqueCountriesCodes : _getUniqueCountriesCodes,
        getHotelCategories :    _getHotelCategories,
        getTags :               _getTags,
        getQueryDestination :   _getQueryDestination,
        getTotalPaxQuery :     _getTotalPaxQuery
    };

    /**
     * @ngdoc method
     * @name getQueryCities
     * @methodOf service.queryhelpers
     * @description
     * 
     * Public: Shows all the destination cities in a string
     * @param  {object} query userquery
     * @return {string}       the cities comma separated
     */
    function _getQueryCities(query) {
        var html = '';           
        if (query != null && query.destinations != null && query.destinations.length > 0) {             
            var cities = _.map(query.destinations, function (dest) {                
                return dest.city;
            });                
            cities = _.uniq(cities);
            html = cities.join(', ');
        }
        return html;
    }

    /**
     * @ngdoc method
     * @name getUniqueCountries
     * @methodOf service.queryhelpers
     * @description
     * 
     * Shows all destinations countries and returns unique countries
     * @param  {object} query userquery
     * @return {string}       countries comma separated
     */
    function _getUniqueCountries(query) {
        var html = '';           
        if (query != null && query.destinations != null && query.destinations.length > 0) {             
            var countries = _.map(query.destinations, function (dest) {                
                return dest.country;
            });                
            countries = _.uniq(countries);
            html = countries.join(', ');
        }
        return html;
    }

    /**
     * @ngdoc method
     * @name getUniqueCountriesCodes
     * @methodOf service.queryhelpers
     * @description
     * 
     * Shows all destinations countries and returns unique countries
     * @param  {object} query userquery
     * @return {string}       countries comma separated
     */
    function _getUniqueCountriesCodes(query) {
        var ccs = '';           
        if (query != null && query.destinations != null && query.destinations.length > 0) {             
            var countries = _.map(query.destinations, function (dest) {                
                return dest.countrycode;
            });                
            ccs = _.uniq(countries);
        }
        return ccs;
    }

    /**
     * @ngdoc method
     * @name getHotelCategories
     * @methodOf service.queryhelpers
     * @description
     * 
     * Shows the hotels categories in spanish or english
     * @param  {object} query userquery
     * @param  {string} lang  languaje code ej: 'es' or 'en' by default 'es'
     * @return {string}       string 
     */
    function _getHotelCategories(query, lang) {
        var html = '';
        var text = {
            charmhotels_es : 'Con encanto',
            charmhotels_en : 'with charm',
            lowcosthotels_es : 'Low cost',
            lowcosthotels_en : 'Low cost',
            standarhotels_es : 'Turista',
            standarhotels_en : 'Turist',
            superiorhotels_es : 'Turista sup',
            superiorhotels_en : 'Turist sup',
            luxuryhotels_es : 'Lujo',
            luxuryhotels_en : 'Luxury'
        };
        var lang = angular.lowercase(lang);
        if (lang === undefined){
            lang = 'es';
        }
        if (query !== null && query.hosting !== null) {
            var cats = [];
            if (query.hosting.charmhotels === true) {
                cats.push(text['charmhotels_'+lang]);
            }
            if (query.hosting.hostingKind === true) {
                cats.push(query.hosting.hostingKind);
                console.log ('query.hosting.hostingKind ',query.hosting.hostingKind);
            }
            if (query.hosting.lowcosthotels === true) {
                cats.push(text['lowcosthotels_'+lang]);
            }
            if (query.hosting.standarhotels === true) {
                cats.push(text['standarhotels_'+lang]);
            }
            if (query.hosting.superiorhotels === true) {
                cats.push(text['superiorhotels_'+lang]);
            }
            if (query.hosting.luxuryhotels === true) {
                cats.push(text['luxuryhotels_'+lang]);
            }
            html = cats.join(', ');
        }
        return html;
    }

    /**
     * @ngdoc method
     * @name getTags
     * @methodOf service.queryhelpers
     * @description
     * 
     * Shows the tags in the query
     * @param  {object} query userquery
     * @return {string}       the tags comma separated
     */
    function _getTags(query) {
        var html = '';
        if (query != null && query.whattodo != null && query.whattodo.length > 0) {
            var tags = _.map(query.whattodo, function (tag) {
                return tag.label;
            });
            tags = _.uniq(tags);
            html = tags.join(', ');

        }
        return html;
    };

    /**
     * @ngdoc method
     * @name getQueryDestination
     * @methodOf service.queryhelpers
     * @description
     * 
     * Shows the destinations like [ city, country ] 
     * @param  {object} query userquery
     * @return {string}       city, country '|' separated
     */
    function _getQueryDestination(query) {
        var html = '';
        if (query !== null && query.destinations !== null && query.destinations.length > 0) {
            var destination = _.map(query.destinations, function (dest) {
                var ret = "";
                if(dest.city !== ''){
                    ret = dest.city+", "+dest.country;
                } else {
                    ret = dest.fulladdress;
                }
                return ret;
            });
            destination = _.uniq(destination);
            html = destination.join(' | ');
        }
        return html;
    };
    /**
     * @ngdoc method
     * @name _getTotalPaxQuery
     * @methodOf service.queryhelpers
     * @description
     * 
     * Return the room distribution to show in quote 
     * ATENTION childs < 12
     * @param  {Object} roomDistribution from userquery
     * @return {String}       a string like 'they are 6 pax: 4 adults - 4 children'
     */
   function _getTotalPaxQuery(roomDistribution){
       
       var totalAdult = 0;
       var totalChild = 0;
       var text = '';
                   
       if(roomDistribution && roomDistribution.length >0){
           for(var it = 0; it < roomDistribution.length; it++){
               
               //recorro la lista de pasajeros
               if(roomDistribution[it].paxList && roomDistribution[it].paxList.length >0 ){
                   for(var itPax = 0; itPax < roomDistribution[it].paxList.length; itPax++){
                    
                       // comprobar si es ninio
                       if(roomDistribution[it].paxList[itPax].age < 12){
                           totalChild ++;                                                  
                       }
                       else{
                           totalAdult++;
                       }
                   }                                                   
               }
           }
       }
       text += 'They are '+(totalAdult+totalChild)+' pax: '+totalAdult+' adults';
       if(totalChild>0){
           if(totalChild > 1){
               text+=' - '+totalChild+' children';
           }
           else{
               text+=' - '+totalChild+' child';
           }
       }
       return text;            
   }
});


