module.exports = function (conf, callback) {
    console.log('payment - validate input data...');
    var common = require('yourttoo.common');
    var _ = require('underscore');
    function inputdatavalidate() {
        return conf.idbooking != null && conf.paymentdata != null;
    }
    var assert = {
        ok: true,
        messages: []
    };

    datavalidations = [
        function () {
            var ok = inputdatavalidate();
            (!ok) ? assert.messages.push(
                'The data submited for this command is incorrect. please review your request') : null;
            return ok;
        }
    ];
    assert.ok = _.every(datavalidations, function (validate) { return validate(); });
    assert.ok ? setImmediate(function () {
        callback(null, conf);
    }) : setImmediate(function () {
        callback({ message: 'Request data no valid', stack: assert.messages.join('\n') }, conf);
    });
}