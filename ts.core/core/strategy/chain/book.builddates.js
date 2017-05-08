module.exports = function (conf, callback) {
    console.log('booking - building dates...');
    var common = require('yourttoo.common');
    var paycondition = conf.product.dmc.membership.paymentoption != null ? conf.product.dmc.membership.paymentoption.slug || 'default' : 'default';
    console.log(conf.date);
    var dateToStart = conf.date;

    var justnow = new Date();
    var justnowadd72hours = new Date();
    justnowadd72hours.setDate(justnow.getDate() + 3);

    var start = new Date(dateToStart.year, dateToStart.month, dateToStart.day, 0, 0, 0);
    var end = new Date(start.getFullYear(), start.getMonth(), start.getDate(), 23, 59, 59);
    var finalcharge = new Date(dateToStart.year, dateToStart.month, dateToStart.day);
    var finalpaymen = new Date(dateToStart.year, dateToStart.month, dateToStart.day);
    finalcharge.setDate(start.getDate() - conf.paymentoption[paycondition]);
    finalpaymen.setDate(start.getDate() - conf.paymentoptionprovider[paycondition]);

    conf.paymentmodel == 'transfer-100' && !conf.signuponbudget ? finalcharge = new Date(justnowadd72hours) : null;

    end.setDate(end.getDate() + conf.product.itinerary.length);
    conf.datesPool.paymentoption = paycondition;

    conf.datesPool.start = {
        year: start.getFullYear(),
        month: start.getMonth(),
        day: start.getDate(),
        monthname_en: common.utils.getMonthNameEnglish(start.getMonth()),
        monthname_es: common.utils.getMonthNameSpanish(start.getMonth()),
        date: start
    };
    conf.datesPool.end = {
        year: end.getFullYear(),
        month: end.getMonth(),
        day: end.getDate(),
        monthname_en: common.utils.getMonthNameEnglish(end.getMonth()),
        monthname_es: common.utils.getMonthNameSpanish(end.getMonth()),
        date: end
    };
    conf.datesPool.finalpayment = {
        year: finalpaymen.getFullYear(),
        month: finalpaymen.getMonth(),
        day: finalpaymen.getDate(),
        monthname_en: common.utils.getMonthNameEnglish(finalpaymen.getMonth()),
        monthname_es: common.utils.getMonthNameSpanish(finalpaymen.getMonth()),
        date: finalpaymen
    };
    conf.datesPool.firstcharge = {
        year: justnowadd72hours.getFullYear(),
        month: justnowadd72hours.getMonth(),
        day: justnowadd72hours.getDate(),
        monthname_en: common.utils.getMonthNameEnglish(justnowadd72hours.getMonth()),
        monthname_es: common.utils.getMonthNameSpanish(justnowadd72hours.getMonth()),
        date: justnowadd72hours
    };
    conf.datesPool.finalcharge = {
        year: finalcharge.getFullYear(),
        month: finalcharge.getMonth(),
        day: finalcharge.getDate(),
        monthname_en: common.utils.getMonthNameEnglish(finalcharge.getMonth()),
        monthname_es: common.utils.getMonthNameSpanish(finalcharge.getMonth()),
        date: finalcharge
    };

    var release = conf.product.release || 7;
    var today = new Date();
    today.setDate((today.getDate() + release));
    var releasedate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);

    console.log('booking dates...');
    console.log('start..');
    console.log(conf.datesPool.start);
    console.log('end...');
    console.log(conf.datesPool.end);
    console.log('final payment (if splited)...');
    console.log(conf.datesPool.finalpayment);
    //check release and continue...or not
    releasedate <= start ? 
    setImmediate(function () { //release ok
        callback(null, conf);
    }) : 
    setImmediate(function () { //release overlap
        console.error('release overlap: ' + conf.product.release);
        callback('There are not enough previous days to book this trip', conf);
    });
}