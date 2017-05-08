module.exports = function (yourttoocore, dbname) {
    var Types = yourttoocore.Field.Types;
    
    var DMCProduct = new yourttoocore.List('RemovedDMCProducts', {
        map: { name: 'name' },
        autokey: { path: 'slug', from: 'name', unique: true },
        autokey: { path: 'slug_en', from: 'title', unique: true },
        autokey: { path: 'slug_es', from: 'title_es', unique: true }
    });
    
    DMCProduct.add({
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
        release : { type: Types.Number },
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
        priceindexing: { type: String, index: true },
        itinerarylength: { type: Types.Number },
        itinerarylengthindexing: { type: String, index: true },
        productvalid: { type: Types.Boolean },
        dmc: { type: Types.Relationship, ref: 'DMCs', initial: true, index: true },
        origin: { type: String, index: true } // el origen del producto, si se creo para un tailor made, aqui aparecera tailormade
    });
    
    // nombre de categoria
    DMCProduct.schema.add({
        categoryname: {
            label_es: { type: String },
            label_en: { type: String }
        }
    });
    //deleted...
    //availability: {
    //    type: Types.Relationship, ref: 'AvailabilityRange', many: true
    //},
    DMCProduct.schema.add({
        minprice: {
            value : { type: Types.Number, index: true }, 
            currency: {
                label: { type: String },
                symbol: { type: String },
                value: { type: String }
            }, 
            year: { type: Types.Number, index: true },
            month: { type: String, index: true },
            exchange: {
                value : { type: Types.Number, index: true }, 
                currency: {
                    label: { type: String },
                    symbol: { type: String },
                    value: { type: String }
                }, 
            }
        }
    });
    DMCProduct.schema.add({
        prices: {
            type: [
                {
                    year: { type: Types.Number, index: true },
                    month: { type: String, index: true },
                    minprice: { type: Types.Number, index: true },
                    currency: {
                        label: { type: String },
                        symbol: { type: String },
                        value: { type: String }
                    }
                }
            ]
        }
    });
    DMCProduct.schema.add({
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
    
    
    DMCProduct.schema.add({
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
    
    DMCProduct.schema.add({
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
    
    
    DMCProduct.schema.methods.getItineraryCollections = function (code, callback) {
        
        var colls = {
            countries: [],
            cities: [],
            hotelcategories: [],
            sleepcities: [],
            departurecities: [],
            stopcities: []
        };
        var searching = 7;
        function _isFinished() {
            if (searching == 0) {
                callback(colls);
            }
        }
        
        
        yourttoocore.list('RemovedDMCProducts').model.find({ code: code })
    .distinct('itinerary.departurecity.location.countrycode', 
        function (err, docs) {
            if (docs != null && docs.length > 0) {
                for (var i = 0, len = docs.length; i < len; i++) {
                    if (docs[i] != '' && colls.countries.indexOf(docs[i]) < 0) {
                        colls.countries.push(docs[i]);
                    }
                }
            }
            searching--;
            _isFinished();
        })
    .distinct('itinerary.sleepcity.location.countrycode', 
        function (err, docs) {
            if (docs != null && docs.length > 0) {
                for (var i = 0, len = docs.length; i < len; i++) {
                    if (docs[i] != '' && colls.countries.indexOf(docs[i]) < 0) {
                        colls.countries.push(docs[i]);
                    }
                }
            }
            searching--;
            _isFinished();
        })
    .distinct('itinerary.stopcities.location.countrycode', 
        function (err, docs) {
            if (docs != null && docs.length > 0) {
                for (var i = 0, len = docs.length; i < len; i++) {
                    if (docs[i] != '' && colls.countries.indexOf(docs[i]) < 0) {
                        colls.countries.push(docs[i]);
                    }
                }
            }
            searching--;
            _isFinished();
        })
    .distinct('itinerary.departurecity', 
        function (err, docs) {
            if (docs != null && docs.length > 0) {
                var deps = [];
                for (var i = 0, len = docs.length; i < len; i++) {
                    if (docs[i] != null && docs[i].location != null) {
                        if (docs[i].city != null && docs[i].city != '') {
                            //slug...
                            var sl = docs[i].city + ' ' + docs[i].location.countrycode;
                            sl = yourttoocore.slug(sl);
                            if (deps.indexOf(sl) < 0) {
                                colls.departurecities.push({ city: docs[i].city, city_es: docs[i].city_es, slug: docs[i].slug });
                                deps.push(sl);
                            }
                            //generic...
                            if (colls.cities.indexOf(docs[i].city) < 0) {
                                colls.cities.push(docs[i].city);
                            }
                        }
                    }
                }
            }
            searching--;
            _isFinished();
        })
    .distinct('itinerary.sleepcity', 
        function (err, docs) {
            if (docs != null && docs.length > 0) {
                var sleps = [];
                for (var i = 0, len = docs.length; i < len; i++) {
                    if (docs[i] != null && docs[i].location != null) {
                        if (docs[i].city != null && docs[i].city != '') {
                            //slug...
                            var sl = docs[i].city + ' ' + docs[i].location.countrycode;
                            sl = yourttoocore.slug(sl);
                            if (sleps.indexOf(sl) < 0) {
                                colls.sleepcities.push({ city: docs[i].city, city_es: docs[i].city_es, slug: docs[i].slug });
                                sleps.push(sl);
                            }
                            //generic...
                            if (colls.cities.indexOf(docs[i].city) < 0) {
                                colls.cities.push(docs[i].city);
                            }
                        }
                    }
                }
            }
            searching--;
            _isFinished();
        })
    .distinct('itinerary.stopcities', 
        function (err, docs) {
            if (docs != null && docs.length > 0) {
                var stops = [];
                for (var i = 0, len = docs.length; i < len; i++) {
                    if (docs[i] != null && docs[i].location != null) {
                        if (docs[i].city != null && docs[i].city != '') {
                            //slug...
                            var sl = docs[i].city + ' ' + docs[i].location.countrycode;
                            sl = yourttoocore.slug(sl);
                            if (stops.indexOf(sl) < 0) {
                                colls.stopcities.push({ city: docs[i].city, city_es: docs[i].city_es, slug: docs[i].slug });
                                stops.push(sl);
                            }
                            //generic...
                            if (colls.cities.indexOf(docs[i].city) < 0) {
                                colls.cities.push(docs[i].city);
                            }
                        }
                    }
                }
            }
            searching--;
            _isFinished();
        })
    .distinct('itinerary.hotel.category', 
        function (err, docs) {
            if (docs != null && docs.length > 0) {
                for (var i = 0, len = docs.length; i < len; i++) {
                    if (docs[i] != null && docs[i] != '') {
                        colls.hotelcategories.push(docs[i]);
                    }
                }
            
            }
            searching--;
            _isFinished();
        });
   
    }
    
    DMCProduct.schema.methods.getMinumumprices = function (code, from, to, callback) {
        
        function getMonthname(monthindex) {
            if (monthindex == 0) { return 'January'; }
            if (monthindex == 1) { return 'February'; }
            if (monthindex == 2) { return 'March'; }
            if (monthindex == 3) { return 'April'; }
            if (monthindex == 4) { return 'May'; }
            if (monthindex == 5) { return 'June'; }
            if (monthindex == 6) { return 'July'; }
            if (monthindex == 7) { return 'August'; }
            if (monthindex == 8) { return 'September'; }
            if (monthindex == 9) { return 'October'; }
            if (monthindex == 10) { return 'November'; }
            if (monthindex == 11) { return 'December'; }
        }
        
        var dateroute = [];
        var years = [];
        var iterate = new Date(from.getFullYear(), from.getMonth(), from.getDate());
        var prices = [];
        var curr = [];
        while (iterate < to) {
            var dt = {
                year: iterate.getFullYear(),
                month: getMonthname(iterate.getMonth())
            };
            if (years.indexOf(iterate.getFullYear()) < 0) {
                years.push(iterate.getFullYear());
            }
            dateroute.push(dt);
            iterate.setMonth(iterate.getMonth() + 1);
        }
        
        var query = this.model('RemovedDMCProducts').find({ code: code });
        var ct, cc = dateroute.length;
        //checker...
        function _finished() {
            if (ct == 0 && cc == 0) {
                
                var pricemin = {
                    value: 0,
                    currency : null
                }
                if (prices != null && prices.length > 0) {
                    prices.sort(function (a, b) { return a - b });
                    pricemin = {
                        value: prices[0],
                        currency : curr[0]
                    }
                }
                
                callback(pricemin);
            }
        }
        //all the distincts
        
        for (var i = 0, len = dateroute.length; i < len; i++) {
            var fieldp = 'availability.' + dateroute[i].month + '.availability.rooms.double.price';
            var fieldc = 'availability.' + dateroute[i].month + '.availability.rooms.double.price';
            
            query.distinct(fieldp, function (err, docs) {
                if (err) { console.log(err); }
                if (docs != null && docs.length > 0) {
                    
                    for (var t = 0, len = docs.length; t < len; t++) {
                        if (docs[t] > 0) {
                            prices.push(docs[t]);
                        }
                    }
                }
                ct--;
                _finished();
            
            });
            query.distinct(fieldc, function (err, docs) {
                if (err) { console.log(err); }
                if (docs != null && docs.length > 0) {
                    
                    for (var t = 0, len = docs.length; t < len; t++) {
                        if (docs[t] > 0) {
                            curr.push(docs[t]);
                        }
                    }
                
                }
                cc--;
                _finished();
            });
        }


    };
    
    
    
    DMCProduct.schema.virtual('content.display').get(function () {
        return this.name + ' - ' + this.iata || '';
    });
    
    
    
    DMCProduct.addPattern('standard meta');
    DMCProduct.defaultColumns = 'name, slug|20%, publishedDate|20%, code|20%';
    DMCProduct.register(dbname);
}

