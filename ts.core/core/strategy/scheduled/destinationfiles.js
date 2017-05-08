module.exports = function (options, callback, errorcallback) {
    var core = options.core;
    var started = new Date();
    console.log('Scheduled task started at ' + started);
    var common = require('yourttoo.common');
    var _ = require('underscore');
    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());
    
    var allresults = {
        zonesfile : false,
        countriesfile: false,
        citiesfile: false,
        citiesloadfile: false,
        continentcountries: false,
        productcountries: false,
        productcountriesnormalized: false
    };
    
    var checkflags = {
        cache: false,
        all: false
    };

    var complete = {
        messages: [],
        errors: []
    };
    var productCountriesCACHE = {
        cities: [],
        countries: []
    };
    var productCountriesALL = {
        cities: [],
        countries: []
    };
    var productCountriesALLNORM_EN = [];
    var productCountriesALLNORM_ES = [];
    var productCountriesCACHENORM_EN = [];
    var productCountriesCACHENORM_ES = [];
    
    var productCountriesALLREADYNORM = {
        en: false,
        es: false
    };
    var productCountriesCACHEREADYNORM = {
        en: false,
        es: false
    };

    var productCountriesCACHEREADY = {
        cities: false,
        countries: false
    };
    
    var productCountriesALLREADY = {
        cities: false,
        countries: false
    };

    //disk files
    var basepath = 'C:/development/node/yourttoo/resources/public/data/';
    var copypath = 'C:/development/node/yourttoo/resources/public/data.deploy/';
    var zonesfile = 'zones.json';
    var countriesfile = 'countries.json';
    var countriesallfile = 'allcountries.json';
    var citiesfile = 'cities.json';
    var citiesallfile = 'allcities.json';
    var citiesloadfile = 'citiesproductload.json';
    var countryzonesPopUp = 'continentcountries.json';
    var productcountries = 'productcountries.json';
    var productcountriesall = 'allproductcountries.json';
    var productcountriesnorm_en = 'productcountrieslatnorm_en.json';
    var productcountriesnorm_es = 'productcountrieslatnorm_es.json';
    
    var allproductcountriesnorm_en = 'allproductcountrieslatnorm_en.json';
    var allproductcountriesnorm_es = 'allproductcountrieslatnorm_es.json';
    
    var zonesCollection = 'DestinationCountriesZones';
    var countriesCollection = 'DestinationCountries';
    var citiesCollection = 'DestinationCities';
    var productCollection = 'DMCProducts';
    
    fs = require('fs');
    
    cev.on('check.point', function (complete) { 
        (checkflags.all && checkflags.cache) ? cev.emit('all.done', complete) : null;
    });

    cev.on('last.file.norm', function (lang) {
        (lang != null && lang != '') ? productCountriesCACHEREADYNORM[lang] = true : null;
        (productCountriesCACHEREADYNORM.es && productCountriesCACHEREADYNORM.en) ? 
            process.nextTick(function (){
                checkflags.cache = true;
                cev.emit('check.point', complete);
        }): null;
    });
    
    cev.on('last.all.file.norm', function (lang) {
        (lang != null && lang != '') ? productCountriesALLREADYNORM[lang] = true : null;
        (productCountriesALLREADYNORM.es && productCountriesALLREADYNORM.en) ? 
            process.nextTick(function (){
                checkflags.all = true;
                cev.emit('check.point', complete)
        }) : null;
    });

    cev.on('last.file', function(cache) {
        _.each(cache.countries, function (country) {
            console.log('processing ' + country.name);
            var crnorm_es = {
                name : country.name_es, 
                latinized : common.utils.accentsTidy(country.name_es), 
                query : '&country=' + country.countrycode.toLowerCase(),
                location: {
                    fulladdress: country.name_es,
                    city: '',
                    country: country.name_es,
                    countrycode: country.countrycode,
                    countryid: country.id,
                    longitude: country.location.longitude,
                    latitude: country.location.latitude
                }
            };
            var crnorm_en = {
                name : country.name, 
                latinized : common.utils.accentsTidy(country.name), 
                query : '&country=' + country.countrycode.toLowerCase(),
                location: {
                    fulladdress: country.name,
                    city: '',
                    country: country.name,
                    countrycode: country.countrycode,
                    countryid: country.id,
                    longitude: country.location.longitude,
                    latitude: country.location.latitude
                }
            };
            productCountriesCACHENORM_EN.push(crnorm_en);
            productCountriesCACHENORM_ES.push(crnorm_es);
            
            _.each(country.cities, function (city) {
                var name_es = city.city_es || city.city_en;
                var name_en = city.city_en;
                var ctnorm_es = {
                    name : name_es + ", " + country.name_es, 
                    latinized : common.utils.accentsTidy(name_es + ", " + country.name_es), 
                    query : '&country=' + country.countrycode.toLowerCase() + '&cities=' + city.slug,
                    location: {
                        fulladdress: common.utils.accentsTidy(name_es + ", " + country.name_es),
                        city: name_es,
                        country: country.name_es,
                        countrycode: country.countrycode,
                        countryid: country.id,
                        cityid: city.id,
                        longitude: city.location.longitude,
                        latitude: city.location.latitude
                    }
                };
                var ctnorm_en = {
                    name : name_en + ", " + country.name, 
                    latinized : common.utils.accentsTidy(name_en + ", " + country.name), 
                    query : '&country=' + country.countrycode.toLowerCase() + '&cities=' + city.slug,
                    location: {
                        fulladdress: common.utils.accentsTidy(name_en + ", " + country.name),
                        city: name_en,
                        country: country.name,
                        countrycode: country.countrycode,
                        countryid: country.id,
                        cityid: city.id,
                        longitude: city.location.longitude,
                        latitude: city.location.latitude
                    }
                };
                productCountriesCACHENORM_EN.push(ctnorm_en);
                productCountriesCACHENORM_ES.push(ctnorm_es);
            });
        });
        //save both files...
        fs.writeFile([basepath, productcountriesnorm_en].join(''), JSON.stringify(productCountriesCACHENORM_EN), function (err) {
            err != null ? complete.errors.push(err) : complete.messages.push('ProductCountriesCACHE EN Normalized file generated');
            cev.emit('last.file.norm', 'en');
        });
        fs.writeFile([basepath, productcountriesnorm_es].join(''), JSON.stringify(productCountriesCACHENORM_ES), function (err) {
            err != null ? complete.errors.push(err) : complete.messages.push('ProductCountriesCACHE ES Normalized file generated');
            cev.emit('last.file.norm', 'es');
        });

        //save deploy copy
        fs.writeFile([copypath, productcountriesnorm_en].join(''), JSON.stringify(productCountriesCACHENORM_EN), function (err) {
            err != null ? complete.errors.push(err) : complete.messages.push('ProductCountriesCACHE EN Normalized [COPY] file generated');
            //cev.emit('last.file.norm', 'en');
        });
        fs.writeFile([copypath, productcountriesnorm_es].join(''), JSON.stringify(productCountriesCACHENORM_ES), function (err) {
            err != null ? complete.errors.push(err) : complete.messages.push('ProductCountriesCACHE ES Normalized [COPY] file generated');
            //cev.emit('last.file.norm', 'es');
        });
    });
    
    cev.on('last.all.file', function (allcache) {
        _.each(allcache.countries, function (country) {
            console.log('processing (all/product load) ' + country.name);
            var crnorm_es = {
                name : country.name_es, 
                latinized : common.utils.accentsTidy(country.name_es), 
                query : '&country=' + country.countrycode.toLowerCase(),
                location: {
                    fulladdress: country.name_es,
                    city: '',
                    country: country.name_es,
                    countrycode: country.countrycode,
                    countryid: country.id,
                    longitude: country.location.longitude,
                    latitude: country.location.latitude
                }
            };
            var crnorm_en = {
                name : country.name, 
                latinized : common.utils.accentsTidy(country.name), 
                query : '&country=' + country.countrycode.toLowerCase(),
                location: {
                    fulladdress: country.name,
                    city: '',
                    country: country.name,
                    countrycode: country.countrycode,
                    countryid: country.id,
                    longitude: country.location.longitude,
                    latitude: country.location.latitude
                }
            };

            productCountriesALLNORM_EN.push(crnorm_en);
            productCountriesALLNORM_ES.push(crnorm_es);
            
            _.each(country.cities, function (city) {
                var name_es = city.city_es || city.city_en;
                var name_en = city.city_en;
                var ctnorm_es = {
                    name : name_es + ", " + country.name_es, 
                    latinized : common.utils.accentsTidy(name_es + ", " + country.name_es), 
                    query : '&country=' + country.countrycode.toLowerCase() + '&cities=' + city.slug,
                    location: {
                        fulladdress: common.utils.accentsTidy(name_es + ", " + country.name_es),
                        city: name_es,
                        country: country.name_es,
                        countrycode: country.countrycode,
                        countryid: country.id,
                        cityid: city.id,
                        longitude: city.location.longitude,
                        latitude: city.location.latitude
                    }
                };
                var ctnorm_en = {
                    name : name_en + ", " + country.name, 
                    latinized : common.utils.accentsTidy(name_en + ", " + country.name), 
                    query : '&country=' + country.countrycode.toLowerCase() + '&cities=' + city.slug,
                    location: {
                        fulladdress: common.utils.accentsTidy(name_en + ", " + country.name),
                        city: name_en,
                        country: country.name,
                        countrycode: country.countrycode,
                        countryid: country.id,
                        cityid: city.id,
                        longitude: city.location.longitude,
                        latitude: city.location.latitude
                    }
                };
                productCountriesALLNORM_EN.push(ctnorm_en);
                productCountriesALLNORM_ES.push(ctnorm_es);
            });
        });
        //save both files...
        fs.writeFile([basepath, allproductcountriesnorm_en].join(''), JSON.stringify(productCountriesALLNORM_EN), function (err) {
            err != null ? complete.errors.push(err) : complete.messages.push('ProductCountriesALL (all/product load) EN Normalized file generated');
            cev.emit('last.all.file.norm', 'en');
        });
        fs.writeFile([basepath, allproductcountriesnorm_es].join(''), JSON.stringify(productCountriesALLNORM_ES), function (err) {
            err != null ? complete.errors.push(err) : complete.messages.push('ProductCountriesALL (all/product load) ES Normalized file generated');
            cev.emit('last.all.file.norm', 'es');
        });
        
        //save deploy copy
        fs.writeFile([copypath, allproductcountriesnorm_en].join(''), JSON.stringify(productCountriesALLNORM_EN), function (err) {
            err != null ? complete.errors.push(err) : complete.messages.push('ProductCountriesALL (all/product load) EN Normalized [COPY] file generated');
            //cev.emit('last.file.norm', 'en');
        });
        fs.writeFile([copypath, allproductcountriesnorm_es].join(''), JSON.stringify(productCountriesALLNORM_ES), function (err) {
            err != null ? complete.errors.push(err) : complete.messages.push('ProductCountriesALL (all/product load) ES Normalized [COPY] file generated');
            //cev.emit('last.file.norm', 'es');
        });
    });

    cev.on('countriescache.file', function (cache) {
        _.each(cache.countries, function (country) {
            var CC = country.countrycode.toUpperCase();
            var findedcities = _.filter(cache.cities, function (city) {
                return city.countrycode.toUpperCase() == CC;
            });
            country.cities = findedcities;
        });
        fs.writeFile([basepath, productcountries].join(''), JSON.stringify(cache.countries), function (err) {
            err != null ? complete.errors.push(err) : complete.messages.push('ProductCountriesCACHE file generated');
            cev.emit('last.file', cache);
        });
        fs.writeFile([copypath, productcountries].join(''), JSON.stringify(cache.countries), function (err) {
            err != null ? complete.errors.push(err) : complete.messages.push('ProductCountriesCACHE [COPY] file generated');
            //cev.emit('last.file', cache);
        });
    });
    
    cev.on('countriescache.all.file', function (allcache) {
        _.each(allcache.countries, function (country) {
            var CC = country.countrycode.toUpperCase();
            var findedcities = _.filter(allcache.cities, function (city) {
                var ok = city != null && city.countrycode != null ? city.countrycode.toUpperCase() == CC : false;
                return ok;
            });
            country.cities = findedcities;
        });
        fs.writeFile([basepath, productcountriesall].join(''), JSON.stringify(allcache.countries), function (err) {
            err != null ? complete.errors.push(err) : complete.messages.push('ProductCountriesALL file generated');
            cev.emit('last.all.file', allcache);
        });
        fs.writeFile([copypath, productcountriesall].join(''), JSON.stringify(allcache.countries), function (err) {
            err != null ? complete.errors.push(err) : complete.messages.push('ProductCountriesALL [COPY] file generated');
            //cev.emit('last.all.file', allcache);
        });
    });

    cev.on('last.step', function (propertyname, destinations) {
        console.log(propertyname + ' finished. Ready for last step');
        productCountriesCACHE[propertyname] = destinations;
        productCountriesCACHEREADY[propertyname] = true;
        (productCountriesCACHEREADY.cities && productCountriesCACHEREADY.countries) ? 
            cev.emit('countriescache.file', productCountriesCACHE) : null;
    });
    
    cev.on('last.all.step', function (propertyname, alldestinations) {
        console.log(propertyname + ' finished. Ready for last step (all/product load)');
        productCountriesALL[propertyname] = alldestinations;
        productCountriesALLREADY[propertyname] = true;
        (productCountriesALLREADY.cities && productCountriesALLREADY.countries) ? 
            cev.emit('countriescache.all.file', productCountriesALL) : null;
    });
    
    cev.on('cities.get', function (cities) { 
        cities != null && cities.length > 0 ? process.nextTick(function () {
            fs.writeFile([basepath, citiesfile].join(''), JSON.stringify(cities), function (err) {
                err != null ? complete.errors.push(err) : complete.messages.push('Cities file generated');
                var lscities = [];
                _.each(cities, function (city) {
                    var c = {
                        id: city._id.toString(),
                        city_en: city.label_en,
                        city_es: city.label_es,
                        slug: city.slug,
                        countrycode: city.countrycode,
                        location: city.location
                    };
                    lscities.push(c);
                });
                cev.emit('last.step', 'cities', lscities);
            });

        }) : cev.emit('all.error', 'No cities found. operation cancelled.');

        fs.writeFile([copypath, citiesfile].join(''), JSON.stringify(cities), function (err) {
            err != null ? complete.errors.push(err) : complete.messages.push('Cities [COPY] file generated');
        });
    });
    
    cev.on('cities.all.get', function (allcities) {
        allcities != null && allcities.length > 0 ? process.nextTick(function () {
            fs.writeFile([basepath, citiesallfile].join(''), JSON.stringify(allcities), function (err) {
                err != null ? complete.errors.push(err) : complete.messages.push('Cities (all/product load) file generated');
                var allscities = [];
                _.each(allcities, function (city) {
                    var c = {
                        id: city._id.toString(),
                        city_en: city.label_en,
                        city_es: city.label_es,
                        slug: city.slug,
                        countrycode: city.countrycode,
                        location: city.location
                    };
                    allscities.push(c);
                });
                cev.emit('last.all.step', 'cities', allscities);
            });

        }) : cev.emit('all.error', 'No cities (all/product load) found. operation cancelled.');
        
        fs.writeFile([copypath, citiesallfile].join(''), JSON.stringify(allcities), function (err) {
            err != null ? complete.errors.push(err) : complete.messages.push('Cities (all/product load) [COPY] file generated');
        });
    });
    
    cev.on('countries.all.get', function (allcountries) {
        allcountries != null && allcountries.length > 0 ? process.nextTick(function () {
            fs.writeFile([basepath, countriesallfile].join(''), JSON.stringify(allcountries), function (err) {
                err != null ? complete.errors.push(err) : complete.messages.push('Countries (all/product load) file generated');
                var allscountries = [];
                _.each(allcountries, function (country) {
                    var c = {
                        id: country._id.toString(),
                        name: country.label_en,
                        name_es: country.label_es,
                        countrycode: country.slug.toUpperCase(),
                        cities: [],
                        location: country.location
                    };
                    allscountries.push(c);
                });
                cev.emit('last.all.step', 'countries', allscountries);
            });

        }) : cev.emit('all.error', 'No countries found. operation cancelled.');
        
        fs.writeFile([copypath, countriesallfile].join(''), JSON.stringify(allcountries), function (err) {
            err != null ? complete.errors.push(err) : complete.messages.push('Countries (all/product load) [COPY] file generated');
        });
    });

    cev.on('countries.get', function (countries) {
        countries != null && countries.length > 0 ? process.nextTick(function () {
            fs.writeFile([basepath, countriesfile].join(''), JSON.stringify(countries), function (err) {
                err != null ? complete.errors.push(err) : complete.messages.push('Countries file generated');
                var lscountries = [];
                _.each(countries, function (country) {
                    var c = {
                        id: country._id.toString(),
                        name: country.label_en,
                        name_es: country.label_es,
                        countrycode: country.slug.toUpperCase(),
                        cities: [],
                        location: country.location
                    };
                    lscountries.push(c);
                });
                cev.emit('last.step', 'countries', lscountries);
            });

        }) : cev.emit('all.error', 'No countries found. operation cancelled.');

        fs.writeFile([copypath, countriesfile].join(''), JSON.stringify(countries), function (err) {
            err != null ? complete.errors.push(err) : complete.messages.push('Countries [COPY] file generated');
        });
    });

    cev.on('cities.prev', function (citiesIds) {
        console.log(citiesIds);
        (citiesIds != null && citiesIds.length > 0) ? process.nextTick(function () {
            core.list(citiesCollection).model.find({ _id: { $in: citiesIds } })
            .sort({ label_es: 1 })
            .exec(function (err, cities) {
                err != null ? cev.emit('all.error', 'No cities found. operation cancelled.') : cev.emit('cities.get', cities);
            })
        }) : cev.emit('all.error', 'No cities found. operation cancelled.');
    });
    
    cev.on('cities.all.prev', function () {
        core.list(citiesCollection).model.find({ label_en : { $ne: null } })
            .sort({ label_es: 1 })
            .exec(function (err, allcities) {
            err != null ? 
            cev.emit('all.error', 'No cities (all/product load) found. operation cancelled.') : 
            cev.emit('cities.all.get', allcities);
        });
    });
    
    cev.on('countries.all.prev', function () {
        core.list(countriesCollection).model.find({ slug : { $ne: null } })
            .select('_id title_en title_es slug key_es key_en label_en label_es state captionImage description_en description_es zone mainImage location titleSEO_es metaDescription_es descriptionGooglePlus_es descriptionFacebook_es imageFacebook')
            .sort({ label_es: 1 })
            .exec(function (err, allcountries) {
            err != null ? 
            cev.emit('all.error', 'No countries found. operation cancelled.') : 
            cev.emit('countries.all.get', allcountries);
        });
    });

    cev.on('countries.prev', function (countriesIds) {
        console.log(countriesIds);
        (countriesIds != null && countriesIds.length > 0) ? process.nextTick(function () {
            core.list(countriesCollection).model.find({ _id: { $in: countriesIds } })
            .select('_id title_en title_es slug label_en label_es state captionImage description_en description_es zone mainImage location')
            .sort({ label_es: 1 })
            .exec(function (err, countries) { 
                err != null ? cev.emit('all.error', 'No countries found. operation cancelled.') : cev.emit('countries.get', countries);
            })
        }) : cev.emit('all.error', 'No countries found. operation cancelled.');
    });
    
    cev.on('zones.done', function () {
        complete.messages.push('Work with zones done');
        var productCountries = [];
        var productCities = [];
        var ctr = 3;
        var cty = 3;
        core.list(productCollection).model.find({ publishState: { $in: ['published', 'published.noavail'] } })
            .distinct('departurecountry', function (err, depcountries) {
                err != null ? complete.errors.push(err) : complete.messages.push('departure countries ids got');
                _.each(depcountries, function (depcountryid) {
                    productCountries.indexOf(depcountryid.toString()) < 0 ?
                        productCountries.push(depcountryid.toString()) : null;
                });
                ctr--;
                ctr == 0 ? cev.emit('countries.prev', productCountries) : null;
            })
            .distinct('stopcountry', function (err, stopcountries) {
                err != null ? complete.errors.push(err) : complete.messages.push('stop countries ids got');
                _.each(stopcountries, function (stopcountryid) {
                    productCountries.indexOf(stopcountryid.toString()) < 0 ?
                        productCountries.push(stopcountryid.toString()) : null;
                });
                ctr--;
                ctr == 0 ? cev.emit('countries.prev', productCountries) : null;
            })
            .distinct('sleepcountry', function (err, sleepcountries) {
                err != null ? complete.errors.push(err) : complete.messages.push('sleep countries ids got');
                _.each(sleepcountries, function (sleepcountryid) {
                    productCountries.indexOf(sleepcountryid.toString()) < 0 ?
                        productCountries.push(sleepcountryid.toString()) : null;
                });
                ctr--;
                ctr == 0 ? cev.emit('countries.prev', productCountries) : null;
            })
            .distinct('departurecity', function (err, depcities) {
                err != null ? complete.errors.push(err) : complete.messages.push('departure cities ids got');
                _.each(depcities, function (dpcityid) {
                    productCities.indexOf(dpcityid.toString()) < 0 ?
                        productCities.push(dpcityid.toString()) : null;
                });
                cty--;
                cty == 0 ? cev.emit('cities.prev', productCities) : null;
            })
            .distinct('stopcities', function (err, stopcities) {
                err != null ? complete.errors.push(err) : complete.messages.push('stop cities ids got');
                _.each(stopcities, function (stcityid) {
                    productCities.indexOf(stcityid.toString()) < 0 ?
                        productCities.push(stcityid.toString()) : null;
                });
                cty--;
                cty == 0 ? cev.emit('cities.prev', productCities) : null;
            })
            .distinct('sleepcity', function (err, sleepcities) {
                err != null ? complete.errors.push(err) : complete.messages.push('sleep cities ids got');
                _.each(sleepcities, function (slcityid) {
                    productCities.indexOf(slcityid.toString()) < 0 ?
                        productCities.push(slcityid.toString()) : null;
                });
                cty--;
                cty == 0 ? cev.emit('cities.prev', productCities) : null;
            })
            .count(function (err, count) { console.log('finded products: ' + count); });

        cev.emit('cities.all.prev');
        cev.emit('countries.all.prev');
    });

    cev.on('zones.fileready', function (allzones, continents) {
        var files = 2;
        fs.writeFile([basepath, zonesfile].join(''), JSON.stringify(allzones), function (err) {
            err != null ? complete.errors.push(err) : complete.messages.push('Zones file generated');
            files--;
            files == 0 ? cev.emit('zones.done') : null;
        });
        fs.writeFile([basepath, countryzonesPopUp].join(''), JSON.stringify(continents), function (err) {
            err != null ? complete.errors.push(err) : complete.messages.push('Continent ZonesCountries file generated');
            files--;
            files == 0 ? cev.emit('zones.done') : null;
        });

        fs.writeFile([copypath, zonesfile].join(''), JSON.stringify(allzones), function (err) {
            err != null ? complete.errors.push(err) : complete.messages.push('Zones [COPY] file generated');
            files--;
            files == 0 ? cev.emit('zones.done') : null;
        });
        fs.writeFile([copypath, countryzonesPopUp].join(''), JSON.stringify(continents), function (err) {
            err != null ? complete.errors.push(err) : complete.messages.push('Continent [COPY] ZonesCountries file generated');
            files--;
            files == 0 ? cev.emit('zones.done') : null;
        });
    });
    
    cev.on('zones.ready', function (zones) {
        var allzones = [];
        var continents = [];
        var pending = zones.length || 0;
        _.each(zones, function (zone) {
            allzones.push(zone.toObject());
            var pZone = {
                zone: zone.toObject(),
                countries: []
            };
            core.list(countriesCollection).model.find({ zone: zone._id, state: 'published' })
            .select('_id slug label_es label_en title_es title_en zone')
            .sort({ label_es: 1 })
            .exec(function (err, countries) {
                err != null ? console.log(err) : pZone.countries = countries;
                continents.push(pZone);
                pending--;
                pending == 0 ? cev.emit('zones.fileready', allzones, continents) : null;
            });
        });
    });

    cev.on('zones.get', function (zones) { 
        (zones == null && zones.length > 0) ? cev.emit('all.error', 'No zones found. operation cancelled.') : cev.emit('zones.ready', zones);
    });
    cev.on('all.error', function (err) { 
        errorcallback(err);
    });
    cev.on('all.done', function (results) {
        callback(results);
    });
    //zones
    core.list(zonesCollection).model.find()
    .sort({ sortOrder: 1 })
    .exec(function (err, zones) {
        err != null ? cev.emit('all.error', err) : cev.emit('zones.get', zones);
    })
}