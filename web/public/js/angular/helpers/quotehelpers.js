/**
 * @ngdoc service
 * @name service.quotehelpers
 * @requires $log
 * @description
 * 
 * Auxiliars functions to load products/tailormades requests
 */
app.service('quotehelpers', function (
    $log) {
    'use strict';
    return {
        convertValueToCurrency : _convertValueToCurrency
    };

    /**
     * @ngdoc method
     * @name convertValueToCurrency
     * @methodOf service.quotehelpers
     * @description
     * 
     * Public: return a new empty product
     * @param {Number} value, importe original en la divisa original 
     * @param {Object} currencyOrig, divisa original del importe
     * @param {Object} currencyDest, divisa a la que se quiere convertir
     * @param {Object} exchanges, tasas de cambio recuperadas de keystone
     * 
     * @return {Number}       el importe convertido a la divisa deseada
     */

    function _convertValueToCurrency(value, currencyOrig, currencyDest, exchanges) {

        var fin = false;
        for(var itExc =0; itExc < exchanges.length; itExc++){
            
            // 1) si encuentro la tasa de cambio
            if(exchanges[itExc].origin==currencyOrig && exchanges[itExc].destination==currencyDest){
                //console.log("cambio encontrado: "+exchanges[itExc].change);
                return  Math.round(value*exchanges[itExc].change);                
            }
            
            // 2) si encuentro la tasa de cambio inversa
            else if(exchanges[itExc].destination==currencyOrig && exchanges[itExc].origin==currencyDest){
                //console.log("cambio INVERSO encontrado: "+exchanges[itExc].change);
                return Math.round(value/exchanges[itExc].change);
            }
        }
        return null;
    }

});


