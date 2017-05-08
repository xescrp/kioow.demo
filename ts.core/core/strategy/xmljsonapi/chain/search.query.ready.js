module.exports = function (conf, callback) {
    var common = require('yourttoo.common');
    var _ = require('underscore');
    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());
    var coreobj = conf.core.corebase;
    var filter = null;
    var initflags = {
        city: false,
        country: false
    };

    cev.on('all.error', function (error) {
        callback({ error: error }, conf);
    });

    conf.filter == null ?
        callback('You must specify the filter (parameter) for the search of programs\r\n', conf) :
        setImmediate(function () {
            //allowed ?
            filter = conf.filter;

            cev.on('last.step', function () {
                var searchfilter = {
                    countries: filter.countries, //query criteria
                    cities: filter.cities,
                    categories: filter.categories,
                    mindays: filter.mindays,
                    maxdays: filter.maxdays,
                    departuredate: filter.departuredate,
                    b2bchannel: true,
                    b2cchannel: false,
                    pricemin: filter.pricemin,
                    pricemax: filter.pricemax,
                    providers: filter.providers,
                    group: filter.group,
                    private: filter.private,
                    currency: filter.currency || 'EUR', //pages criteria
                    maxresults: filter.maxresults,
                    sort: filter.sort,
                    orderby: filter.orderby,
                    page: filter.page || 0,
                    auth: conf.auth,
                    core: conf.core,
                    environment: conf.environment
                };

                conf.searchfilter = searchfilter;
                callback(null, conf);
            });

            cev.on('fetch.finished', function () {
                var ready = _.every(initflags);
                ready ? cev.emit('last.step') : null;
            });

            cev.on('fetch.country', function () {
                var cttofind = _.map(filter.countries, function (country) {
                    return country.toLowerCase();
                });
                coreobj.list('DestinationCountries').model.find({ slug: { $in: cttofind } })
                    .select('_id')
                    .exec(function (err, docs) {
                        err != null ? cev.emit('all.error', err) : setImmediate(function () {
                            docs != null && docs.length > 0 ? filter.countries = _.pluck(docs, '_id') : filter.countries = null;
                            initflags.country = true;
                            cev.emit('fetch.finished');
                        });
                    });
            });

            cev.on('fetch.city', function () {
                var cttofind = _.map(filter.cities, function (city) {
                    return city.toLowerCase();
                });
                coreobj.list('DestinationCities').model.find({ slug: { $in: cttofind } })
                    .select('_id')
                    .exec(function (err, docs) {
                        err != null ? cev.emit('all.error', err) : setImmediate(function () {
                            docs != null && docs.length > 0 ? filter.cities = _.pluck(docs, '_id') : filter.cities = null;
                            initflags.city = true;
                            cev.emit('fetch.finished');
                        });
                    });
            });


            cev.on('filter.byname', function () {
                filter.countries = conf.searchincountries != null && conf.searchincountries.length > 0 ? _.pluck(conf.searchincountries, '_id') : null;
                filter.cities = conf.searchincities != null && conf.searchincities.length > 0 ? _.pluck(conf.searchincities, '_id') : null;

                cev.emit('last.step');

            });

            cev.on('filter.bycodes', function () {
                cev.emit('fetch.country');
                cev.emit('fetch.city');
            });

            conf.gotresultsbyname ? cev.emit('filter.byname') : cev.emit('filter.bycodes');
        });
}


