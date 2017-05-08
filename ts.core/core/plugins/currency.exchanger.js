module.exports = function (options) {
    var currencybase = 'EUR';
    var fx = require('./currency.exchanger.core');
    
    var plugin = {
        name: 'Currency Exchanger',
        id: 'cux',
        fx: fx,
        base: currencybase || 'EUR',
        currentexchanges: null,
        loaded: false,
        initialize: function (callback) {
            //initialize exchange plugin... load the current currencies...
            var self = this;
            var exload = require('../factory/exchanger');
            //the loader...
            exload.recovercurrentexchanges('./factory/' + self.base + '.exchange.json', function (exchanges) {
                //settings...
                self.currentexchanges = exchanges;
                self.base = exchanges.base;
                self.fx.base = self.base;
                self.fx.rates = self.currentexchanges.rates;
                self.loaded = true;
                callback != null ? callback() : null;
            });
        },
        convert: function (value, from, to) {
            var self = this;
            return Math.round(self.fx.convert(value, { from: from, to: to }));
        },
        reload: function (callback) {
            var self = this;
            var exload = require('../factory/exchanger');
            exload.recovercurrentexchanges('./factory/' + self.base + '.exchange.json', function (exchanges) {
                //settings...
                self.currentexchanges = exchanges;
                self.base = exchanges.base;
                self.fx.base = self.base;
                self.fx.rates = self.currentexchanges.rates;
                self.loaded = true;
                callback != null ? callback() : null;
            });
        },
        savenewexchange: function (exc, callback) {
            var exch = require('../factory/exchanger');
            var self = this;
            exch.savecurrentexchanges('./factory/' + self.base + '.exchange.json', exc, function (rs) {
                exch.recovercurrentexchanges('./factory/' + self.base + '.exchange.json', function (exchanges) {
                    //settings...
                    self.currentexchanges = exchanges;
                    self.base = exchanges.base;
                    self.fx.base = self.base;
                    self.fx.rates = self.currentexchanges.rates;
                    self.loaded = true;
                    callback != null ? callback() : null;
                });
            });
        }
    };

    return plugin;

}