module.exports = function (yourttoocore, dbname) {
    var Types = yourttoocore.Field.Types;

    var BookedProduct = new yourttoocore.List('BookedProducts', {
        map: { name: 'name' },
        autokey: { path: 'slug', from: 'name', unique: true },
        autokey: { path: 'slug_en', from: 'title', unique: true },
        autokey: { path: 'slug_es', from: 'title_es', unique: true }
    });

    BookedProduct.add({
        name: { type: String },
        title: { type: String },
        title_es: { type: String },
        languages: {
            english: { type: Types.Boolean },
            spanish: { type: Types.Boolean }
        },
        slug: { type: String, index: true },
        slug_en: { type: String, index: true },
        slug_es: { type: String, index: true },
        publishedDate: { type: Types.Date },
        publishState: {
            type: String,
            index: true
        },
        code: { type: String, index: true },
        dmccode: { type: String, index: true },
        description_en: { type: String },
        description_es: { type: String },
        important_txt_en: { type: String },
        important_txt_es: { type: String },
        parent: { type: String, index: true }, //indicara si es un programa generado a partir de otro (categoria de hotel diferente)
        release: { type: Types.Number },
        availabilitytill: { type: Types.Date },
        productimage: { type: Types.CloudinaryImage },
        location: {
            fulladdress: { type: String },
            city: { type: String, index: true },
            city_es: { type: String, index: true },
            citybehaviour: { type: String },
            stateorprovince: { type: String, index: true },
            cp: { type: String },
            country: { type: String, index: true },
            countrycode: { type: String },
            continent: { type: String },
            latitude: { type: Types.Number },
            longitude: { type: Types.Number },
        },
        included: {
            trip: {
                grouptrip: { type: Types.Boolean },
                privatetrip: { type: Types.Boolean },
                minpaxoperate: { type: Types.Number }
            },
            arrivaltransfer: { type: Types.Boolean },
            arrivalassistance: { type: Types.Boolean },
            arrivallanguage: {
                spanish: { type: Types.Boolean },
                english: { type: Types.Boolean },
                french: { type: Types.Boolean },
                german: { type: Types.Boolean },
                italian: { type: Types.Boolean },
                portuguese: { type: Types.Boolean }
            },
            departuretransfer: { type: Types.Boolean },
            departureassistance: { type: Types.Boolean },
            departurelanguage: {
                spanish: { type: Types.Boolean },
                english: { type: Types.Boolean },
                french: { type: Types.Boolean },
                german: { type: Types.Boolean },
                italian: { type: Types.Boolean },
                portuguese: { type: Types.Boolean }
            },
            tourescort: {
                included: { type: Types.Boolean },
                language: {
                    spanish: { type: Types.Boolean },
                    english: { type: Types.Boolean },
                    french: { type: Types.Boolean },
                    german: { type: Types.Boolean },
                    italian: { type: Types.Boolean },
                    portuguese: { type: Types.Boolean }
                }
            },
            driveguide: {
                included: { type: Types.Boolean },
                language: {
                    spanish: { type: Types.Boolean },
                    english: { type: Types.Boolean },
                    french: { type: Types.Boolean },
                    german: { type: Types.Boolean },
                    italian: { type: Types.Boolean },
                    portuguese: { type: Types.Boolean }
                }
            },
            transportbetweencities: {
                included: { type: Types.Boolean },
                bus: { type: Types.Boolean },
                domesticflight: { type: Types.Boolean },
                train: { type: Types.Boolean },
                boat: { type: Types.Boolean },
                privatecarwithdriver: { type: Types.Boolean },
                privatecarwithdriverandguide: { type: Types.Boolean },
                fourxfour: { type: Types.Boolean },
                van: { type: Types.Boolean },
                truck: { type: Types.Boolean },
                other: { type: Types.Boolean },
                otherdescription: { type: String }
            },
            taxesinthecountry: { type: Types.Boolean },
            airporttaxes: { type: Types.Boolean },
            tips: { type: Types.Boolean },
            baggagehandlingfees: { type: Types.Boolean },
        },
        pvp: {
            keep: { type: Types.Boolean }, //parity price
            b2c: { type: Types.Number }, //the original price
            b2b: { type: Types.Number }, //the builded price
            b2cperday: { type: Types.Number }, //per day
            b2bperday: { type: Types.Number }, //per day
            net: { type: Types.Number }, //the net for Agency
            currencycode: { type: String }, //currency code
            currency: {
                label: { type: String },
                symbol: { type: String },
                value: { type: String }
            },
            year: { type: Types.Number, index: true },
            month: { type: String, index: true },
            day: { type: Types.Number, index: true }
        },
        channels: { type: Types.Arraystring, index: true },
        priceindexing: { type: String, index: true },
        priceb2bindexing: { type: String, index: true },
        itinerarylength: { type: Types.Number },
        itinerarylengthindexing: { type: String, index: true },
        dmcindexing: { type: String, index: true },
        destinationindexing: { type: Types.Arraystring, index: true },
        productvalid: { type: Types.Boolean },
        dmc: { type: Types.Relationship, ref: 'DMCs', initial: true, index: true },
        origin: { type: String, index: true }, // el origen del producto, si se creo para un tailor made, aqui aparecera tailormade
        departurecity: { type: Types.Relationship, ref: 'DestinationCities', initial: true, index: true, many: true },
        stopcities: { type: Types.Relationship, ref: 'DestinationCities', initial: true, index: true, many: true },
        sleepcity: { type: Types.Relationship, ref: 'DestinationCities', initial: true, index: true, many: true },
        departurecountry: { type: Types.Relationship, ref: 'DestinationCountries', initial: true, index: true, many: true },
        stopcountry: { type: Types.Relationship, ref: 'DestinationCountries', initial: true, index: true, many: true },
        sleepcountry: { type: Types.Relationship, ref: 'DestinationCountries', initial: true, index: true, many: true },
        flightsdmc: { type: Types.Boolean },
        flights: { type: Types.Boolean },
        savetriggers: { presave: { type: String } }
    });
    
    // nombre de categoria
    BookedProduct.schema.add({
        categoryname: {
            label_es: { type: String },
            label_en: { type: String },
            categorybehaviour: { type: String },
            related: { type: [{ }] }
        }
    });
    //deleted...
    //availability: {
    //    type: Types.Relationship, ref: 'AvailabilityRange', many: true
    //},
    BookedProduct.schema.add({
        minprice: {
            value: { type: Types.Number, index: true }, 
            b2b: { type: Types.Number, index: true }, 
            net: { type: Types.Number, index: true }, 
            currencycode: { type: String },
            currency: {
                label: { type: String },
                symbol: { type: String },
                value: { type: String }
            }, 
            year: { type: Types.Number, index: true },
            month: { type: String, index: true },
            day: { type: Types.Number, index: true },
            exchange: {
                value: { type: Types.Number, index: true }, 
                b2b: { type: Types.Number, index: true }, 
                currency: {
                    label: { type: String },
                    symbol: { type: String },
                    value: { type: String }
                }, 
            }
        }
    });
    BookedProduct.schema.add({
        prices: {
            type: [
                {
                    year: { type: Types.Number, index: true },
                    month: { type: String, index: true },
                    day: { type: Types.Number, index: true },
                    minprice: { type: Types.Number, index: true },
                    currency: {
                        label: { type: String },
                        symbol: { type: String },
                        value: { type: String }
                    },
                    currencycode: { type: String }
                }
            ]
        }
    });
    BookedProduct.schema.add({
        itinerary: {
            type: [
                {
                    name: { type: String },
                    isnotlastday: { type: Types.Boolean },
                    lastday: { type: Types.Boolean },
                    slug: { type: String },
                    daynumber: { type: Types.Number },
                    date: { type: Types.Date },
                    publishedDate: { type: Types.Date },
                    code: { type: String },
                    needflights: { type: Types.Boolean },
                    flights: {
                        type: [{
                                departure: {
                                    name: { type: String },
                                    city: { type: String },
                                    country: { type: String },
                                    iata: { type: String },
                                    icao: { type: String },
                                    latitude: { type: Types.Number },
                                    longitude: { type: Types.Number },
                                    label: { type: String }
                                },
                                arrival: {
                                    name: { type: String },
                                    city: { type: String },
                                    country: { type: String },
                                    iata: { type: String },
                                    icao: { type: String },
                                    latitude: { type: Types.Number },
                                    longitude: { type: Types.Number },
                                    label: { type: String }
                                },
                                recommendedflight: { type: String }
                            }]
                    },
                    departurecity: {
                        city: { type: String, index: true },
                        city_es: { type: String, index: true },
                        citybehaviour: { type: String },
                        order: { type: Types.Number },
                        slug: { type: String, index: true },
                        cityid: { type: String, index: true },
                        countryid: { type: String, index: true },
                        country: { type: String },
                        location: {
                            fulladdress: { type: String },
                            city: { type: String, index: true },
                            stateorprovince: { type: String },
                            cp: { type: String },
                            country: { type: String, index: true },
                            countrycode: { type: String, index: true },
                            continent: { type: String },
                            latitude: { type: Types.Number },
                            longitude: { type: Types.Number },
                        }
                    },
                    stopcities: {
                        type: [
                            {
                                city: { type: String, index: true },
                                city_es: { type: String, index: true },
                                citybehaviour: { type: String },
                                order: { type: Types.Number },
                                country: { type: String },
                                slug: { type: String, index: true },
                                cityid: { type: String, index: true },
                                countryid: { type: String, index: true },
                                location: {
                                    fulladdress: { type: String },
                                    city: { type: String, index: true },
                                    stateorprovince: { type: String },
                                    cp: { type: String },
                                    country: { type: String, index: true },
                                    countrycode: { type: String, index: true },
                                    continent: { type: String },
                                    latitude: { type: Types.Number },
                                    longitude: { type: Types.Number },
                                }
                            }
                        ]
                    },
                    sleepcity: {
                        city: { type: String, index: true },
                        city_es: { type: String, index: true },
                        citybehaviour: { type: String },
                        order: { type: Types.Number },
                        country: { type: String },
                        slug: { type: String, index: true },
                        cityid: { type: String, index: true },
                        countryid: { type: String, index: true },
                        location: {
                            fulladdress: { type: String },
                            city: { type: String, index: true },
                            stateorprovince: { type: String },
                            cp: { type: String },
                            country: { type: String, index: true },
                            countrycode: { type: String, index: true },
                            continent: { type: String },
                            latitude: { type: Types.Number },
                            longitude: { type: Types.Number },
                        }
                    },
                    hotel: {
                        name: { type: String },
                        category: { type: String, index: true },
                        incity: { type: Types.Boolean },
                        insurroundings: { type: Types.Boolean },
                        meals: { type: Types.Boolean },
                        breakfast: { type: Types.Boolean },
                        lunch: { type: Types.Boolean },
                        lunchdrinks: { type: Types.Boolean },
                        dinner: { type: Types.Boolean },
                        dinnerdrinks: { type: Types.Boolean }
                    },
                    description_en: { type: String },
                    description_es: { type: String },
                    image: {
                        public_id: { type: String },
                        version: { type: Types.Number },
                        signature: { type: String },
                        format: { type: String },
                        resource_type: { type: String },
                        url: { type: String },
                        width: { type: Types.Number },
                        height: { type: Types.Number },
                        secure_url: { type: String }
                    },
                    activities: {
                        type: [
                            {
                                daynumber: { type: Types.Number },
                                title: { type: String },
                                title_es: { type: String }, 
                                group: { type: Types.Boolean },
                                individual: { type: Types.Boolean },
                                ticketsincluded: { type: Types.Boolean },
                                localguide: { type: Types.Boolean },
                                language: {
                                    spanish: { type: Types.Boolean },
                                    english: { type: Types.Boolean },
                                    french: { type: Types.Boolean },
                                    german: { type: Types.Boolean },
                                    italian: { type: Types.Boolean },
                                    portuguese: { type: Types.Boolean }
                                }
                            }
                        ]
                    }
                }
            ]
        }
    });


    BookedProduct.schema.add({
        availability: {
            type: [{
                    name: { type: String },
                    publishedDate: { type: Types.Date },
                    year: { type: Types.Number },
                    January: {
                        availability: {
                            type: [{
                                    date: { type: String },
                                    day: { type: Types.Number },
                                    available: { type: Types.Boolean },
                                    rooms: {
                                        single: {
                                            price: { type: Types.Number }
                                        },
                                        double: {
                                            price: { type: Types.Number }
                                        },
                                        triple: {
                                            price: { type: Types.Number }
                                        },
                                        other: {
                                            price: { type: Types.Number }
                                        },
                                        currency: {
                                            label: { type: String },
                                            symbol: { type: String },
                                            value: { type: String }
                                        }
                                    }
                                }]
                        }
                    },
                    February: {
                        availability: {
                            type: [{
                                    date: { type: String },
                                    day: { type: Types.Number },
                                    available: { type: Types.Boolean },
                                    rooms: {
                                        single: {
                                            price: { type: Types.Number }
                                        },
                                        double: {
                                            price: { type: Types.Number }
                                        },
                                        triple: {
                                            price: { type: Types.Number }
                                        },
                                        other: {
                                            price: { type: Types.Number }
                                        },
                                        currency: {
                                            label: { type: String },
                                            symbol: { type: String },
                                            value: { type: String }
                                        }
                                    }
                                }]
                        }
                    },
                    March: {
                        availability: {
                            type: [{
                                    date: { type: String },
                                    day: { type: Types.Number },
                                    available: { type: Types.Boolean },
                                    rooms: {
                                        single: {
                                            price: { type: Types.Number }
                                        },
                                        double: {
                                            price: { type: Types.Number }
                                        },
                                        triple: {
                                            price: { type: Types.Number }
                                        },
                                        other: {
                                            price: { type: Types.Number }
                                        },
                                        currency: {
                                            label: { type: String },
                                            symbol: { type: String },
                                            value: { type: String }
                                        }
                                    }
                                }]
                        }
                    },
                    April: {
                        availability: {
                            type: [{
                                    date: { type: String },
                                    day: { type: Types.Number },
                                    available: { type: Types.Boolean },
                                    rooms: {
                                        single: {
                                            price: { type: Types.Number }
                                        },
                                        double: {
                                            price: { type: Types.Number }
                                        },
                                        triple: {
                                            price: { type: Types.Number }
                                        },
                                        other: {
                                            price: { type: Types.Number }
                                        },
                                        currency: {
                                            label: { type: String },
                                            symbol: { type: String },
                                            value: { type: String }
                                        }
                                    }
                                }]
                        }
                    },
                    May: {
                        availability: {
                            type: [{
                                    date: { type: String },
                                    day: { type: Types.Number },
                                    available: { type: Types.Boolean },
                                    rooms: {
                                        single: {
                                            price: { type: Types.Number }
                                        },
                                        double: {
                                            price: { type: Types.Number }
                                        },
                                        triple: {
                                            price: { type: Types.Number }
                                        },
                                        other: {
                                            price: { type: Types.Number }
                                        },
                                        currency: {
                                            label: { type: String },
                                            symbol: { type: String },
                                            value: { type: String }
                                        }
                                    }
                                }]
                        }
                    },
                    June: {
                        availability: {
                            type: [{
                                    date: { type: String },
                                    day: { type: Types.Number },
                                    available: { type: Types.Boolean },
                                    rooms: {
                                        single: {
                                            price: { type: Types.Number }
                                        },
                                        double: {
                                            price: { type: Types.Number }
                                        },
                                        triple: {
                                            price: { type: Types.Number }
                                        },
                                        other: {
                                            price: { type: Types.Number }
                                        },
                                        currency: {
                                            label: { type: String },
                                            symbol: { type: String },
                                            value: { type: String }
                                        }
                                    }
                                }]
                        }
                    },
                    July: {
                        availability: {
                            type: [{
                                    date: { type: String },
                                    day: { type: Types.Number },
                                    available: { type: Types.Boolean },
                                    rooms: {
                                        single: {
                                            price: { type: Types.Number }
                                        },
                                        double: {
                                            price: { type: Types.Number }
                                        },
                                        triple: {
                                            price: { type: Types.Number }
                                        },
                                        other: {
                                            price: { type: Types.Number }
                                        },
                                        currency: {
                                            label: { type: String },
                                            symbol: { type: String },
                                            value: { type: String }
                                        }
                                    }
                                }]
                        }
                    },
                    August: {
                        availability: {
                            type: [{
                                    date: { type: String },
                                    day: { type: Types.Number },
                                    available: { type: Types.Boolean },
                                    rooms: {
                                        single: {
                                            price: { type: Types.Number }
                                        },
                                        double: {
                                            price: { type: Types.Number }
                                        },
                                        triple: {
                                            price: { type: Types.Number }
                                        },
                                        other: {
                                            price: { type: Types.Number }
                                        },
                                        currency: {
                                            label: { type: String },
                                            symbol: { type: String },
                                            value: { type: String }
                                        }
                                    }
                                }]
                        }
                    },
                    September: {
                        availability: {
                            type: [{
                                    date: { type: String },
                                    day: { type: Types.Number },
                                    available: { type: Types.Boolean },
                                    rooms: {
                                        single: {
                                            price: { type: Types.Number }
                                        },
                                        double: {
                                            price: { type: Types.Number }
                                        },
                                        triple: {
                                            price: { type: Types.Number }
                                        },
                                        other: {
                                            price: { type: Types.Number }
                                        },
                                        currency: {
                                            label: { type: String },
                                            symbol: { type: String },
                                            value: { type: String }
                                        }
                                    }
                                }]
                        }
                    },
                    October: {
                        availability: {
                            type: [{
                                    date: { type: String },
                                    day: { type: Types.Number },
                                    available: { type: Types.Boolean },
                                    rooms: {
                                        single: {
                                            price: { type: Types.Number }
                                        },
                                        double: {
                                            price: { type: Types.Number }
                                        },
                                        triple: {
                                            price: { type: Types.Number }
                                        },
                                        other: {
                                            price: { type: Types.Number }
                                        },
                                        currency: {
                                            label: { type: String },
                                            symbol: { type: String },
                                            value: { type: String }
                                        }
                                    }
                                }]
                        }
                    },
                    November: {
                        availability: {
                            type: [{
                                    date: { type: String },
                                    day: { type: Types.Number },
                                    available: { type: Types.Boolean },
                                    rooms: {
                                        single: {
                                            price: { type: Types.Number }
                                        },
                                        double: {
                                            price: { type: Types.Number }
                                        },
                                        triple: {
                                            price: { type: Types.Number }
                                        },
                                        other: {
                                            price: { type: Types.Number }
                                        },
                                        currency: {
                                            label: { type: String },
                                            symbol: { type: String },
                                            value: { type: String }
                                        }
                                    }
                                }]
                        }
                    },
                    December: {
                        availability: {
                            type: [{
                                    date: { type: String },
                                    day: { type: Types.Number },
                                    available: { type: Types.Boolean },
                                    rooms: {
                                        single: {
                                            price: { type: Types.Number }
                                        },
                                        double: {
                                            price: { type: Types.Number }
                                        },
                                        triple: {
                                            price: { type: Types.Number }
                                        },
                                        other: {
                                            price: { type: Types.Number }
                                        },
                                        currency: {
                                            label: { type: String },
                                            symbol: { type: String },
                                            value: { type: String }
                                        }
                                    }
                                }]
                        }
                    }
                }]
        }
    });

    BookedProduct.schema.add({
        tags: {
            type: [{
                    value: { type: String },
                    label: { type: String },
                    label_en: { type: String },
                    state: { type: String, index: true },
                    slug: { type: String, index: true }
                }]
        }
    });

    BookedProduct.schema.add({
        buildeditinerary: {

        }
    });
    
   
    BookedProduct.schema.pre('init', function (next, product, query) {
        _builditinerary(product, next);
    });
    
    BookedProduct.schema.virtual('content.display').get(function () {
        return this.name + ' - ' + this.iata || '';
    });

    
    
    BookedProduct.addPattern('standard meta');
    BookedProduct.defaultColumns = 'name, slug|20%, publishedDate|20%, code|20%';
    BookedProduct.register(dbname);

    function _builditinerary(product, next) {
        function _mealsIncluded(itinerary) {
            var breakfastcount = 0;
            var lunchcount = 0;
            var dinnercount = 0;
            var html = '';
            if (itinerary && itinerary.length > 0) {
                for (var i = 0, len = itinerary.length; i < len; i++) {
                    var it = itinerary[i];

                    if (it != null && it.hotel != null && it.hotel.breakfast) {
                        breakfastcount++;
                    }
                    if (it != null && it.hotel != null && it.hotel.lunch) {
                        lunchcount++;
                    }
                    if (it != null && it.hotel != null && it.hotel.dinner) {
                        dinnercount++;
                    }
                }
            }
            var items = {};
            if (breakfastcount > 0) {
                items.breakfast = breakfastcount;
            }
            if (lunchcount > 0) {
                items.lunch = lunchcount;
            }
            if (dinnercount > 0) {
                items.dinner = dinnercount;
            }
            return items;
        }

        var complete = {
            country: {
                departure: false,
                sleep: false,
                stop: false
            },
            city: {
                departure: false,
                sleep: false,
                stop: false
            },
            hotel: false,
            donecountry: function () {
                return (this.country.departure && this.country.sleep && this.country.stop)
            },
            donecity: function () {
                return (this.city.departure && this.city.sleep && this.city.stop)
            },
            done: function () {
                return (this.donecity() && this.donecountry()) && this.hotel;
            }
        };

        var finded = {
            depcountries: [],
            sleepcountries: [],
            stopcountries: [],
            depcities: [],
            sleepcities: [],
            stopcities: []
        };

        var colls = {
            countries: [],
            countriesfull_en: [],
            countriesfull_es: [],
            cities: [],
            hotelcategories: [],
            sleepcities: [],
            departurecities: [],
            stopcities: []
        };
        var _ = require('underscore');
        var utils = require('../lib/utils');
        var evs = require('../lib/eventtrigger');
        var cev = evs.eventcarrier(utils.getToken());
        //country handling...
        cev.on('all.ready', function () {
            product.buildeditinerary = {
                countriesfull_en: [],
                countriesfull_es: [],
                countries: [],
                cities: [],
                hotelcategories: [],
                sleepcities: [],
                departurecities: [],
                stopcities: []
            };

            function itinerarydays(itinerary, cities) {
                var days = [];
                if (itinerary != null && itinerary.length > 0) {
                    _.each(itinerary, function (day) {
                        var cday = {
                            departure: [],
                            sleep: [],
                            stop: []
                        };

                        var dep = day.departurecity != null && day.departurecity != '' ? _.find(cities.departurecities, function (city) { return city._id == day.departurecity.cityid; }) : null;
                        dep != null ? cday.departure.push(dep) : null;
                        var slp = day.sleepcity != null && day.sleepcity != '' ? _.find(cities.sleepcities, function (city) { return city._id == day.sleepcity.cityid; }) : null;
                        slp != null ? cday.sleep.push(slp) : null;
                        if (day.stopcities != null && day.stopcities.length > 0) {
                            _.each(day.stopcities, function (stop) {
                                var stp = stop != null && stop.cityid != '' ? _.find(cities.stopcities, function (city) { return city._id == stop.cityid; }) : null;
                                stp != null ? cday.stop.push(stp) : null;
                            });
                        }
                        days.push(cday);
                    });
                }
                return days;
            }
            function orderItinerary(itinerary, field) {
                var citiesordered = [];

                _.each(itinerary, function (day) {
                    if (day[field].length > 0) {
                        citiesordered = _.union(citiesordered, day[field]);
                    }
                });

                citiesordered = _.uniq(citiesordered, function (item, key, a) {
                    return item._id;
                });
                return citiesordered;
            }

            function orderItineraryFromItinerary(itinerary, cities, field) {
                var citiesordered = [];
                var idorder = [];
                if (field != 'stopcities') {
                    idorder = _.map(itinerary, function (day) {
                        return day[field].cityid;
                    });
                } else {
                    _.each(itinerary, function (day) {
                        var stday = _.map(day.stopcities, function (city) {
                            return city.cityid;
                        });
                        _.union(idorder, stday);
                    });
                }

                citiesordered = _.map(idorder, function (id) {
                    return _.find(cities, function (city) { return city._id == id; });
                });

                citiesordered = _.uniq(citiesordered, function (item, key, a) {
                    return item._id;
                });

                citiesordered = citiesordered != null && citiesordered.length > 0 ? citiesordered : cities;
                return citiesordered;
            }

            var orderedcities = itinerarydays(product.itinerary, colls);

            product.buildeditinerary.countries = colls.countries;
            product.buildeditinerary.cities = colls.cities;
            product.buildeditinerary.hotelcategories = colls.hotelcategories;
            product.buildeditinerary.sleepcities = orderItinerary(orderedcities, 'sleep');
            product.buildeditinerary.departurecities = orderItinerary(orderedcities, 'departure');
            product.buildeditinerary.stopcities = orderItinerary(orderedcities, 'stop');
            product.buildeditinerary.countriesfull_en = colls.countriesfull_en;
            product.buildeditinerary.countriesfull_es = colls.countriesfull_es;
            product.buildeditinerary.countries.sort();
            product.buildeditinerary.cities.sort();
            product.buildeditinerary.hotelcategories.sort();
            product.buildeditinerary.countriesfull_es.sort();
            product.buildeditinerary.countriesfull_en.sort();
            product.buildeditinerary.itinerary = orderedcities;

            if (product.buildeditinerary != null) {
                product.buildeditinerary.meals = _mealsIncluded(product.itinerary);
                product.buildeditinerary.days = (product != null && product.itinerary != null) ? product.itinerary.length : 0;
            }
            next();
        });

        cev.on('departurecountry.ready', function (countries) {
            if (countries != null && countries.length > 0) {
                finded.depcountries = countries;
                var slugs = _.pluck(countries, 'slug');
                var labels_en = _.pluck(countries, 'label_en');
                var labels_es = _.pluck(countries, 'label_es');
                var countrycodes = _.map(slugs, function (countrycode) { return countrycode.toUpperCase(); });
                colls.countries = _.union(colls.countries, countrycodes);
                colls.countriesfull_en = _.union(colls.countriesfull_en, labels_en);
                colls.countriesfull_es = _.union(colls.countriesfull_es, labels_es);
            }
            complete.country.departure = true;
            complete.done() ? cev.emit('all.ready') : null;
        });
        cev.on('sleepcountry.ready', function (countries) {
            if (countries != null && countries.length > 0) {
                finded.sleepcountries = countries;
                var slugs = _.pluck(countries, 'slug');
                var labels_en = _.pluck(countries, 'label_en');
                var labels_es = _.pluck(countries, 'label_es');
                var countrycodes = _.map(slugs, function (countrycode) { return countrycode.toUpperCase(); });
                colls.countries = _.union(colls.countries, countrycodes);
                colls.countriesfull_en = _.union(colls.countriesfull_en, labels_en);
                colls.countriesfull_es = _.union(colls.countriesfull_es, labels_es);
            }
            complete.country.sleep = true;
            complete.done() ? cev.emit('all.ready') : null;
        });
        cev.on('stopcountry.ready', function (countries) {
            if (countries != null && countries.length > 0) {
                finded.stopcountries = countries;
                var slugs = _.pluck(countries, 'slug');
                var labels_en = _.pluck(countries, 'label_en');
                var labels_es = _.pluck(countries, 'label_es');
                var countrycodes = _.map(slugs, function (countrycode) { return countrycode.toUpperCase(); });
                colls.countries = _.union(colls.countries, countrycodes);
                colls.countriesfull_en = _.union(colls.countriesfull_en, labels_en);
                colls.countriesfull_es = _.union(colls.countriesfull_es, labels_es);
            }
            complete.country.stop = true;
            complete.done() ? cev.emit('all.ready') : null;
        });
        //city handling...
        cev.on('departurecity.ready', function (cities) {
            if (cities != null && cities.length > 0) {
                finded.depcities = cities;
                var citiesf = _.map(cities, function (city) { return { _id: city._id, city: city.label_en, city_es: city.label_es, slug: city.slug }; });
                var citinames = _.pluck(cities, 'label_en');
                colls.cities = _.union(colls.cities, citinames);
                colls.cities = _.uniq(colls.cities);
                colls.departurecities = citiesf;
            }
            complete.city.departure = true;
            complete.done() ? cev.emit('all.ready') : null;
        });
        cev.on('sleepcity.ready', function (cities) {
            if (cities != null && cities.length > 0) {
                finded.depcities = cities;
                var citiesf = _.map(cities, function (city) { return { _id: city._id, city: city.label_en, city_es: city.label_es, slug: city.slug }; });
                var citinames = _.pluck(cities, 'label_en');
                colls.cities = _.union(colls.cities, citinames);
                colls.cities = _.uniq(colls.cities);
                colls.sleepcities = citiesf;
            }
            complete.city.sleep = true;
            complete.done() ? cev.emit('all.ready') : null;
        });
        cev.on('stopcity.ready', function (cities) {
            if (cities != null && cities.length > 0) {
                finded.depcities = cities;
                var citiesf = _.map(cities, function (city) { return { _id: city._id, city: city.label_en, city_es: city.label_es, slug: city.slug }; });
                var citinames = _.pluck(cities, 'label_en');
                colls.cities = _.union(colls.cities, citinames);
                colls.cities = _.uniq(colls.cities);
                colls.stopcities = citiesf;
            }
            complete.city.stop = true;
            complete.done() ? cev.emit('all.ready') : null;
        });
        cev.on('hotel.ready', function () {
            complete.hotel = true;
            complete.done() ? cev.emit('all.ready') : null;
        });

        if (product != null) {

            yourttoocore.list('BookedProducts').model.populate(product,
                [
                    { path: 'departurecity', select: '_id countrycode country slug label_en label_es location.latitude location.longitude', populate: 'country' },
                    { path: 'sleepcity', select: '_id countrycode country slug label_en label_es location.latitude location.longitude', populate: 'country' },
                    { path: 'stopcities', select: '_id countrycode country slug label_en label_es location.latitude location.longitude', populate: 'country' },
                    { path: 'departurecountry', select: '_id title_en title_es slug label_en label_es location.latitude location.longitude mainImage.public_id mainImage.url mainImage.secure_url', populate: 'country' },
                    { path: 'sleepcountry', select: '_id title_en title_es slug label_en label_es location.latitude location.longitude mainImage.public_id mainImage.url mainImage.secure_url', populate: 'country' },
                    { path: 'stopcountry', select: '_id title_en title_es slug label_en label_es location.latitude location.longitude mainImage.public_id mainImage.url mainImage.secure_url', populate: 'country' }
                ], function (err, populateprd) {
                    product = populateprd;
                    cev.emit('stopcity.ready', product.stopcities);
                    cev.emit('sleepcity.ready', product.sleepcity);
                    cev.emit('departurecity.ready', product.departurecity);
                    cev.emit('stopcountry.ready', product.sleepcountry);
                    cev.emit('sleepcountry.ready', product.stopcountry);
                    cev.emit('departurecountry.ready', product.departurecountry);
                });

            _.each(product.itinerary, function (day) {
                if (day != null && day.hotel != null && day.hotel.category != '') {
                    colls.hotelcategories.push(day.hotel.category);
                    colls.hotelcategories = _.uniq(colls.hotelcategories);
                }
            });
            cev.emit('hotel.ready', null);
        }
    }

}