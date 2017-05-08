module.exports = function (conf, callback) {
    console.log('booking - validate input data...');
    var common = require('yourttoo.common');
    var _ = require('underscore');

    function canBookfractionatedPayment(dateSelected, paymentoptionslug) {
        var start = new Date(dateSelected.year, dateSelected.month, dateSelected.day, 0, 0, 0);
        var dateSelected = start; // date selected to book
        var dateNow = new Date(); // actual date
        var restDays = conf.paymentoption[paymentoptionslug] || conf.paymentoption.default; // by default 30 days is the min margin
        dateNow.setDate(dateNow.getDate() + restDays);
        console.log('date max: ' + dateNow);
        console.log('trip date: ' + dateSelected);
        return dateSelected > dateNow;
    }
    var assert = {
        ok: true,
        messages: []
    };

    datavalidations = [
        function () {
            var ok = (conf.paymentmodel == 'tpv-split' || conf.paymentmodel == 'transfer-split') ?
                canBookfractionatedPayment(
                conf.date, conf.product.dmc.membership.paymentoption.slug) 
            : true;
            (!ok) ? assert.messages.push(
                'The option of fractionated payment is not available for this booking for this dates. Please select another date.') : null;
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