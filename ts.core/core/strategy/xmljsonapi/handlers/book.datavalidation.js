module.exports = function (conf, callback) { 

    function canBookfractionatedPayment(dateSelected, paymentoptionslug) {
        var dateSelected = dateSelected; // date selected to book
        var dateNow = new Date(); // actual date
        var restDays = conf.paymentoption[paymentoptionslug] || conf.paymentoption.default; // by default 30 days is the min margin
        dateNow.setDate(dateNow.getDate() + restDays);
        
        return dateSelected > dateNow;
    }
    var assert = {
        ok: true,
        messages: []
    };

    datavalidations = [
        function () {
            var ok = options.fractionated ? canBookfractionatedPayment(
                conf.datesPool.start, conf.product.dmc.membership.paymentoption.slug) 
            : true;
            (!ok) ? valid.messages.push('The option of fractionated payment is not available for this booking.') : null;
            return ok;
        }
    ];

    assert.ok ? setImmediate(function () {
        callback(null, conf);
    }) : setImmediate(function () {
        callback({ message: 'Request data no valid', stack: assert.messages.join('\n') }, conf);
    });
}