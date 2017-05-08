module.exports = function (conf, callback) {
    console.log('booking - adding payments...');
	var core = conf.core;
	var booking = conf.booking;
	var method = booking.paymentmodel;
    var common = require('yourttoo.common');
    var _ = require('underscore');
    var paymentdata = conf.paymentdata;
    var currentstatus = booking.status;
    console.log(booking.breakdown);
    var actionpercent = {
        charge: function () { return Math.round(paymentdata.amount * 100 / booking.breakdown.charges.total); },
        pay: function () { return Math.round(paymentdata.amount * 100 / booking.breakdown.payments.total); }
    };
    var paymentindex = booking.payments.length;
    
    var action_en = paymentdata.target == 'travelersense' ? 'charge' : 'pay';
    var action_es = paymentdata.target == 'travelersense' ? 'cobro' : 'pago';
    var paymentPercent = actionpercent[action_en] != null && typeof(actionpercent[action_en]) === 'function' ? actionpercent[action_en]() : 0;

    var pay = core.list('Payments').model({
        code: [booking.idBooking, paymentindex].join('-'),
        action: action_en,
        payment: paymentPercent,     //25-75-100 
        paymentmethod: paymentdata.paymentmethod, // tpv-100, tpv-split, transfer-100, transfer-split
        paymenttarget: paymentdata.target, //travelersense: payment from client; provider: payment for provider; agency: payment for agency
        receiptnumber: paymentdata.receiptnumber,//numero de recibo si se ha emitodo un recibo,          
        transferid: paymentdata.transferid, //numero de transferencia o ducmento  
        date: new Date(),   //fecha en la que se hizo el pago por parte del cliente
        validatedate: paymentdata.validatedate || booking.paymentmodel.indexOf('transfer') >= 0 ? new Date() : null, //(solo para transferencias) fecha de validacion por parte de omt . Si esta vacio, el cobro no esta validado
        nextpaymentdate: new Date(
            action_en == 'charge' ? booking.dates.finalcharge.year : booking.dates.finalpayment.year,
            action_en == 'charge' ? booking.dates.finalcharge.month : booking.dates.finalpayment.month,
            action_en == 'charge' ? booking.dates.finalcharge.day : booking.dates.finalpayment.day, 0, 0, 0),
        payabledate: new Date(
            action_en == 'charge' ? booking.dates.finalcharge.year : booking.dates.finalpayment.year,
            action_en == 'charge' ? booking.dates.finalcharge.month : booking.dates.finalpayment.month,
            action_en == 'charge' ? booking.dates.finalcharge.day : booking.dates.finalpayment.day, 0, 0, 0), //fecha programada para efectuar el pago al proveedor
        amount: paymentdata.amount,
        currency: {
            label: booking.paymentmodel.indexOf('tpv') >= 0 ? 'Euro' : booking.pricing.currency.label,
            symbol: booking.paymentmodel.indexOf('tpv') >= 0 ? '€' : booking.pricing.currency.symbol,
            value: booking.paymentmodel.indexOf('tpv') >= 0 ? 'EUR' : booking.pricing.currency.value
        },
        booking: booking._id,
    });

    pay.save(function (err, doc) {
        err != null ?
            setImmediate(function () {
                console.error(err);
                callback(err, conf);
            }) :
            setImmediate(function () {
                pay = doc;
                conf.payment = pay;
                delete doc['booking'];
                console.log(doc);
                //add pay to the booking
                
                booking.payments.push(doc);
                
            conf.story = {
                code: [action_en, paymentindex, booking.idBooking].join('-'),
                description: 'Validado ' + pay.payment + '% de la reserva.',
                previousstate: booking.status,
                currentstate: booking.status
                };
            //get all payments and filter...
            var charges = _.filter(booking.payments, function (rpay) {
                return rpay.action == 'charge';
            });
            var paymentsprovider = _.filter(booking.payments, function (rpay) {
                return rpay.action == 'pay' && rpay.target == 'provider';
            });
            var paymentsagency = _.filter(booking.payments, function (rpay) {
                return rpay.action == 'pay' && rpay.target == 'agency';
            });
            //get amounts...
            var totalcharged = charges != null && charges.length > 0 ? _.reduce(charges, function (memo, current) {
                return memo + current.amount;
            }, 0) : 0;
            var totalprovider = paymentsprovider != null && paymentsprovider.length > 0 ? _.reduce(paymentsprovider, function (memo, current) {
                return memo + current.amount;
            }, 0) : 0;
            var totalagency = paymentsagency != null && paymentsagency.length > 0 ? _.reduce(paymentsagency, function (memo, current) {
                return memo + current.amount;
            }, 0) : 0;
            console.log('after changing states...');
            booking.breakdown = booking.getbreakdown();

            var prc = Math.round((totalcharged * 100) / booking.pricing.amount);
            var prp = Math.round((totalprovider * 100) / booking.breakdown.provider.net);
            var pra = Math.round((totalagency * 100) / booking.breakdown.agency.payment);

            booking.chargestatus = prc >= 100 ? 'ok.charges' : 'pending.charges';
            booking.paystatusprovider = prp >= 100 ? 'ok.payment' : 'pending.payment';
            booking.paystatusagency = pra >= 100 ? 'ok.payment' : 'pending.payment';
            booking.status = booking.status != 'cancelled' ? 'commited' : booking.stats;

            conf.hermestriggers = [
                { collectionname: 'Payments', action: 'new', data: pay },
                { collectionname: 'Bookings2', action: action_en, data: booking }];

            pay.paymentmethod.indexOf('tpv') >= 0 && booking.payments.length == 1 ? conf.hermestriggers.push({ collectionname: 'Bookings2', action: 'new', data: booking }) : null;

            conf.story.currentstate = booking.status;
            conf.booking = booking;
            //console.log(conf.booking.payments);
            callback(null, conf);
        });
    });
}