module.exports = function (conf, callback) {
    console.log('booking - validate first input');
    var _ = require('underscore');
    var common = require('yourttoo.common');
    var dateToStart = conf.date;
    var roomdistribution = conf.roomdistribution;
    var productcode = conf.productcode;
    var signup = conf.signup;
    var assert = {
        ok: true,
        messages: []
    };
    console.log(conf);
    var validations = [
        function () { //date input is ok
            var ok = (dateToStart != null && dateToStart.day != null && dateToStart.month != null && dateToStart.year != null);
            (!ok) ? assert.messages.push('the date input field is not valid. the correct form of this field is { day: , month: , year: }') 
            : null;
            return ok;
        },
        function () { //roomDistribution is not empty
            var ok = roomdistribution != null && roomdistribution.length > 0;
            (!ok) ? 
            assert.messages.push('no room distribution detected. please check the value for roomDistribution parameter on your request.') 
            : null;
            return ok;
        },
        function () { //productCode is not empty
            var ok = productcode != null && productcode != '';
            (!ok) ? assert.messages.push('no product code detected. please review your request and add the code of the product') 
            : null;
            return ok;
        }
    ];

    assert.ok = _.every(validations, function (validate) { return validate(); });

    assert.ok ? setImmediate(function () { 
        callback(null, conf);
    }) : setImmediate(function () { 
        callback({ message: 'Request data no valid', stack: assert.messages.join('\n') }, conf);
    });
}

