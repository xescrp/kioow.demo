

var populateNested = exports.populateNested = function (docs, population, callback) {
    var core = require('../core');
    core.list(population.model).model
                        .populate(docs, { path: population.path }, function (err, docs2) {
                            callback(docs);
                        });
}


var generateRegCode = exports.generateRegCode = function (callback) {
    var omtcore = require('../core');
    omtcore.list('Sequences').model.find().exec(function (err, docs) {
        if (err) { throw err; }
        if (docs != null && docs.length > 0) {
            var sq = docs[0];

            sq.mainindex++;
            sq.save(function (err, doc) {
                if (err) { throw err; }
                if (doc) {
                    var code = getCode(sq.mainindex, 2);
                    callback(code);
                }
            });


        }
        else {
            var sq = omtcore.list('Sequences').model({
                name: 'Main DB Sequences',
                mainindex: 1,
                productindex: 1
            });

            sq.save(function (err, doc) {
                if (err) { throw err; }
                if (doc) {
                    var code = getCode(sq.mainindex, 2);
                    callback(code);
                }
            });
        }
    });


}


var generateProductCode = exports.generateProductCode = function (callback) {
    var omtcore = require('../core');
    omtcore.list('Sequences').model.find().exec(function (err, docs) {
        if (err) { throw err; }
        if (docs != null && docs.length > 0) {
            var sq = docs[0];

            sq.productindex++;
            var i = sq.productindex;
            sq.save(function (err, doc) {
                if (err) { throw err; }
                if (doc) {
                    var code = getCode(i, 3);
                    console.log(code);
                    callback(code);
                }
            });


        }
        else {
            var sq = omtcore.list('Sequences').model({
                name: 'Main DB Sequences',
                mainindex: 1,
                productindex: 1
            });

            var i = sq.productindex;

            sq.save(function (err, doc) {
                if (err) { throw err; }
                if (doc) {
                    var code = getCode(i, 3);
                    console.log(code);
                    callback(code);
                }
            });
        }
    });


}


var getCode = exports.getCode = function (index, length) {

    var formatNumber = exports.formatNumber = function (num, length) {
        var r = "" + num;
        while (r.length < length) {
            r = "0" + r;
        }
        return r;
    }

    return formatNumber(index, length);
}