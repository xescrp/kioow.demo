module.exports = function (conf, callback) {
    console.log('booking - setting up booking stuff...');
    var common = require('yourttoo.common');

    conf.results = {
        bookings: { total: 0, last: [] },
        programs: { total: 0, published: 0, publishednoavail: 0 },
        taylormades: { total: 0, last: [] },
        dmcs: { total: 0 },
        affiliates: { total: 0 }
    }

    setImmediate(function () {
        callback(null, conf);
    });

}