module.exports = function (conf, callback) {
    var core = conf.core;
    var common = require('yourttoo.common');
    var _ = require('underscore');

    var dmcids = conf.dmcids;

    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());

    cev.on('process.done', function () {
        console.log('finished getting product codes for dmcs');
        callback(null, conf);
    });

    cev.on('report.error', function (error) {
        conf.errors.push({ code: 'PRODUCT CODES FETCH FAILED FOR ' + error.id, error: error.error });
        cev.emit('next.dmc');
    });

    cev.on('add.product', function (dmcproducts) {
        var dmc_prd = {
            dmc: dmcproducts.id,
            products: []
        };
        if (dmcproducts.products != null && dmcproducts.products.length > 0) {
            dmc_prd.products = _.map(dmcproducts.products, function (prd) { return prd.code; });
            conf.productcodesbydmc.push(dmc_prd);
            console.log('dmc to process ' + dmc_prd.dmc +
                ' with ' + dmc_prd.products.length.toString() + ' products');
        } else { console.log('dmc ' + dmc_prd.dmc + ' has no products...'); }

        console.log('processed dmc ' + dmc_prd.dmc);
        cev.emit('next.dmc');
    });

    cev.on('dmc.products', function (dmcid) {
        console.log('getting product codes from dmc ' + dmcid);
        var query = {
            dmc: dmcid,
            //publishState: 'published.noavail',
            //pvp: null
        };
        core.list('DMCProducts').model.find(query)
            .select('code')
            .exec(function (err, docs) {
                err != null ?
                    cev.emit('report.error', { id: dmcid, error: err })
                    :
                    cev.emit('add.product', { id: dmcid, products: docs });
            });
    });

    cev.on('next.dmc', function () {
        var dmcid = dmcids.length > 0 ? dmcids.shift() : null;
        !common.utils.stringIsNullOrEmpty(dmcid) ?
            cev.emit('dmc.products', dmcid) : cev.emit('process.done');
    });



    dmcids != null && dmcids.length > 0 ?
        setImmediate(function () {
            conf.productcodesbydmc = [];
            cev.emit('next.dmc');
        })
        :
        setImmediate(function () {
            console.log('nothing to do...');
            conf.productcodesbydmc = null;
            callback(null, conf);
        });
}