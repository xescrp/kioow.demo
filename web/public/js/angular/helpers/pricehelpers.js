app.service('pricehelpers', function (yto_api) {

    var pricehelper = {
        exchanges: null,
        exchangeValue: _exchangeValue,
    };

    var _exchanges = null;

    function _exchangeValue(value, currencySource, currencyTarget) {
        var fin = false;
        var finded = null;
        var currencyOrig = currencySource || '';
        var currencyDest = currencyTarget || '';

        var orig_dest = _.find(_exchanges, function (change) {
            return change.origin.toLowerCase() == currencyOrig.toLowerCase() && change.destination.toLowerCase() == currencyDest.toLowerCase();
        });
        var dest_orig = _.find(_exchanges, function (change) {
            return change.origin.toLowerCase() == currencyDest.toLowerCase() && change.destination.toLowerCase() == currencyOrig.toLowerCase();
        });

        orig_dest != null ? finded = Math.ceil(value * orig_dest.change) : null;
        dest_orig != null ? finded = Math.ceil(value / dest_orig.change) : null;

        return finded;
    }

    function getExchanges(callback) {
        var rq = {
            command: 'find',
            service: 'api',
            request: {
                collectionname: 'Exchange'
            }
        };

        var rqCB = yto_api.send(rq);

        // response OK
        rqCB.on(rqCB.oncompleteeventkey, function (data) {
            console.log('Exchanges response api : ', data);
            if (data != null && data != '') {

                console.log('Exchanges response api lenght : ', data.length);
                pricehelper.exchanges = data;
                _exchanges = data;
                if (callback) {
                    callback(data);
                }
                
            } else {
                console.error('Exchanges error');
               
            }
        });

        // response KO
        rqCB.on(rqCB.onerroreventkey, function (err) {
            console.error('Error getting Exchanges: ', err);
        });
    }

    getExchanges(function () {
        console.log('Exchanges loaded..');
    });

    return pricehelper;
});