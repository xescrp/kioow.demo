
module.exports = function (mongo, codekind, callback) {
    var common = require('yourttoo.common');
    var formatNumber = function (num, length) {
        var r = "" + num;
        while (r.length < length) {
            r = "0" + r;
        }
        return r;
    }
    var setCode = function (sequence, kind) {
        var code = common.utils.getToken();
        if (kind == 'signup') {
            sequence.mainindex++;
            code = formatNumber(sequence.mainindex, 6);
        }
        if (kind == 'UserQueries') {
            sequence.queryindex++;
            code = formatNumber(sequence.queryindex, 6);
        }
        if (kind == 'Quotes') {
            sequence.queryindex++;
            code = formatNumber(sequence.queryindex, 6);
        }
        if (kind == 'DMCProducts') {
            sequence.productindex++;
            code = formatNumber(sequence.productindex, 3);
        }
        if (kind == 'Bookings') {
            sequence.bookingindex++;
            code = formatNumber(sequence.bookingindex, 6);
        }
        if (kind == 'Bookings2') {
            sequence.bookingindex++;
            code = formatNumber(sequence.bookingindex, 6);
        }
        if (kind == 'Chats') {
            code = common.utils.getToken();
        }
        if (kind == 'WLCustomizations') {
            sequence.mainindex++;
            code = formatNumber(sequence.mainindex, 6);
        }
        return code;
    }
    typeof (mongo.find) === 'function' ?
        setImmediate(function () {
            mongo.find({ collectionname: 'Sequences' }, function (rs) {
                var code = null;
                var sq = null;
                //checking
                if (rs != null && rs.ResultOK == true) {
                    console.log('code sequences: ');
                    console.log(rs);
                    sq = rs.Data[0];
                    code = setCode(sq, codekind);
                }
                else {
                    sq = mongo.getmodel({
                        collectionname: 'Sequences',
                        modelobject: {
                            name: 'Main DB Sequences',
                            mainindex: 0,
                            productindex: 0,
                            bookingindex: 1000,
                            queryindex: 0
                        }
                    });
                    code = setCode(sq, codekind);
                }
                //saving...
                sq.save(function (err, docs) {
                    callback(code);
                });
                return code;

            });
        }) :
        setImmediate(function () {
            //core behaviour
            mongo.list('Sequences').model.find(function (err, docs) {
                var sq = docs[0];
                code = setCode(sq, codekind);
                sq.save(function (err, docs) {
                    callback(code);
                });
            });
        });
    
}