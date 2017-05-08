module.exports = function (conf, callback) {

    var dateToStart = options.date;
    var roomDistribution = options.roomDistribution;

    var assert = {
        ok: true,
        messages: []
    };

    var validations = [
        function () { //date input is ok
            var ok = (dateToStart != null && dateToStart.day != null && dateToStart.month != null && dateToStart.year != null);
            (!ok) ? valid.messages.push('the date input field is not valid. the correct form of this field is { day: , month: , year: }') 
            : null;
            return ok;
        },
        function () { //roomDistribution is not empty
            var ok = roomDistribution != null && roomDistribution.length > 0;
            (!ok) ? 
            valid.messages.push('no room distribution detected. please check the value for roomDistribution parameter on your request.') 
            : null;
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