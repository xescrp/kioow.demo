module.exports = function (conf, callback) {
    var common = require('yourttoo.common');
    var paycondition = conf.product.dmc.membership.paymentoption.slug || 'default';
    var dateToStart = options.date;

    var start = new Date(dateToStart.year, dateToStart.month, dateToStart.day);
    var end = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    var final = new Date(dateToStart.year, dateToStart.month, dateToStart.day - paymentoption[paycondition]);
    end.setDate(end.getDate() + conf.product.itinerary.length);
    
    conf.datesPool.start = {
        year: start.getFullYear(),
        month: start.getMonth(),
        day: start.getDate(),
        monthname_en: common.utils.getMonthNameEnglish(start.getMonth()),
        monthname_es: common.utils.getMonthNameSpanish(start.getMonth())
    };
    conf.datesPool.end = {
        year: end.getFullYear(),
        month: end.getMonth(),
        day: end.getDate(),
        monthname_en: common.utils.getMonthNameEnglish(end.getMonth()),
        monthname_es: common.utils.getMonthNameSpanish(end.getMonth())
    };
    conf.datesPool.finalpayment = final;

    setImmediate(function () { callback(null, conf) });
}