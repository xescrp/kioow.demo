module.exports = function (conf, callback) {
    console.log('we have finished...');
    console.log('...exiting');
    setImmediate(function () {
        var rtbook = conf.booking.toObject();
        rtbook.breakdown = conf.booking.getbreakdown();
        console.log(rtbook.breakdown);
        callback(null, rtbook);
    });
}