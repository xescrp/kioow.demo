module.exports = function (conf, callback) {
    var dmcsandproducts = conf.productcodesbydmc;
    var core = conf.core;
    var common = require('yourttoo.common');
    var _ = require('underscore');

    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());

    cev.on('process.done', function () {
        conf.results = {
            code: 'Products Updated by DMC',
            messages: conf.messages
        };
        callback(null, conf);
    });

    cev.on('process.product', function (product, products) {
        console.log('Let update program: ' + product.code);
        product.save(function (err, doc) {
            if (err) {
                console.log('Error updating: ' + product.code);
                console.error('Error updating: ' + product.code);
                console.error(err);
                conf.errors.push({
                    code: product.code,
                    error: err
                });
                cev.emit('process.dmcproducts', products);
            }

            if (doc) {
                console.log('Product updated! : ' + product.code);
                conf.messages.push('Product updated! : ' +
                    '<a href=\"http://openmarket.travel/viaje/' + product.slug_es + '\">' +
                    product.code + '</a>');
                cev.emit('process.dmcproducts', products);
            }
        });
    });

    cev.on('OLD_process.product', function (product, products) {
        var iterator = require('../iterators/product.updateminprices');
        var checker = iterator({
            product: product,
            exchanges: conf.exchanges },
            function (product) {
                product.save(function (err, doc) {
                    if (err) {
                        console.log('Error updating: ' + product.code);
                        console.error('Error updating: ' + product.code);
                        console.error(err);
                        conf.errors.push({
                            code: product.code,
                            error: err
                        });
                        cev.emit('process.dmcproducts', products);
                    }

                    if (doc) {
                        console.log('Product updated! : ' + product.code);
                        conf.messages.push('Product updated! : ' +
                            '<a href=\"http://openmarket.travel/viaje/' + product.slug_es + '\">' +
                            product.code + '</a>');
                        cev.emit('process.dmcproducts', products);
                    }
                });
            });
        checker.on('product.state.changed', function (prdupdate) {
            var item = {
                code: prdupdate.product.code,
                lastavailabilityday: common.utils.getlastavailabilityday(prdupdate.product),
                dmc: {
                    code: prdupdate.product.dmc.code,
                    name: prdupdate.product.dmc.name || prdupdate.product.dmc.company.name
                },
                title: prdupdate.product.title,
                previous: prdupdate.previous,
                current: prdupdate.current
            };
            conf.reports.push(item);
            var msg = 'Product < a href=\"http://openmarket.travel/viaje/' + product.slug_es + '\">' +
                item.title + '</a> for dmc ' + item.dmc.name + ' reported a state change';
            console.log(msg);
            conf.messages.push(msg);
        });
        checker.on('product.minprice.changed', function (prd) {
            conf.messages.push('Product updated! : ' +
                '<a href=\"http://openmarket.travel/viaje/' +
                prd.slug_es + '\">' + prd.code + ' </a> minprice: ' +
                prd.minprice.value + ' ' + prd.minprice.currency.label + ' day: ' + prd.minprice.day +
                ' month: ' + prd.minprice.month + ' year: ' + + prd.minprice.year);
        });
    });

    cev.on('process.dmcproducts', function (products) {
        var product = products != null && products.length > 0 ? products.shift() : null;
        product != null ? cev.emit('process.product', product, products) : cev.emit('next.dmc');
    });

    cev.on('report.dmcerror', function (dmc_prd) {
        conf.errors.push({ code: 'PRODUCTS FETCH FAILED FOR ' + dmc_prd.dmc_prd.dmc, error: dmc_prd.error });
        cev.emit('next.dmc');
    });

    cev.on('dmc.products', function (dmc_prd) {
        var yesterday = new Date(2017, 0, 17, 0, 0, 0);
        var query = {
            $and: [{ code: { $in: dmc_prd.products } }]
        };
        core.list('DMCProducts').model.find(query)
            .select('_id code name slug title minprice pvp release prices channels categoryname parent ' +
            'itinerarylength itinerarylengthindexing priceindexing priceb2bindexing dmcindexing destinationindexing ' +
            'publishState availabilitytill title_es availability itinerary dmc departurecountry sleepcountry stopcountry departurecity sleepcity stopcities')
            .populate('dmc', '_id code name company.name company.legalname membership currency')
            .populate('departurecountry', 'label_en label_es _id slug')
            .populate('sleepcountry', 'label_en label_es _id slug')
            .populate('stopcountry', 'label_en label_es _id slug')
            .populate('departurecity', 'label_en label_es _id slug countrycode')
            .populate('sleepcity', 'label_en label_es _id slug countrycode')
            .populate('stopcities', 'label_en label_es _id slug countrycode')
            .exec(function (err, docs) {
                err != null ?
                    cev.emit('report.dmcerror', { dmc_prd: dmc_prd, error: err }) :
                    cev.emit('process.dmcproducts', docs);
            });
    });

    cev.on('next.dmc', function () {
        var dmc_prd = dmcsandproducts != null && dmcsandproducts.length > 0 ? dmcsandproducts.shift() : null;
        dmc_prd != null ? cev.emit('dmc.products', dmc_prd) : cev.emit('process.done');
    });

    dmcsandproducts != null && dmcsandproducts.length > 0 ?
        setImmediate(function () {
            cev.emit('next.dmc');
        })
        :
        setImmediate(function () {
            console.log('nothing to do');
            conf.results = {
                code: 'Product Update by DMC',
                messages: ['Process finished without any dmc processed']
            };
            cev.emit('process.done');
        });
}