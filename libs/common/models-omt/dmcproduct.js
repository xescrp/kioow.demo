module.exports = function (yourttoocore, dbname) {
    var Types = yourttoocore.Field.Types;
    
    var DMCProduct = new yourttoocore.List('DMCProducts', {
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
        updatedOnUser: { type: String },
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
            arrivalhoteltransfer: { type: Types.Boolean },
            arrivalhotelassistance: { type: Types.Boolean },
            arrivalhotellanguage: {
                spanish: { type: Types.Boolean },
                english: { type: Types.Boolean },
                french: { type: Types.Boolean },
                german: { type: Types.Boolean },
                italian: { type: Types.Boolean },
                portuguese: { type: Types.Boolean }
            },
            departurehoteltransfer: { type: Types.Boolean },
            departurehotelassistance: { type: Types.Boolean },
            departurehotellanguage: {
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
            localguidesincluded: { type: Types.Boolean },
            localguides: { type: String }
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
            day: { type: Types.Number, index: true },
            fee: { type: Types.Number }
        },
        channels: { type: Types.Arraystring, index: true },
        operationdays: { type: Types.Arraystring, index: true },
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
        savetriggers: { presave: { type: String } },
        vouchernotes: { type:String }
    });
    
    // nombre de categoria
    DMCProduct.schema.add({
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
    DMCProduct.schema.add({
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
    DMCProduct.schema.add({
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
                                        quad: {
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
                                        quad: {
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
                                        quad: {
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
                                        quad: {
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
                                        quad: {
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
                                        quad: {
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
                                        quad: {
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
                                        quad: {
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
                                        quad: {
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
                                        quad: {
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
                                        quad: {
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
                                        quad: {
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
        includedtags: {
            type: [{
                value: { type: String },
                label: { type: String },
                label_en: { type: String },
                state: { type: String, index: true },
                slug: { type: String, index: true }
            }]
        }
    });

    DMCProduct.schema.add({
        notincludedtags: {
            type: [{
                value: { type: String },
                label: { type: String },
                label_en: { type: String },
                state: { type: String, index: true },
                slug: { type: String, index: true }
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

    DMCProduct.schema.add({
        buildeditinerary: {

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
        
        
        yourttoocore.list('DMCProducts').model.find({ code: code })
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
                            var ct = docs[i].location.countrycode || docs[i].countrycode;
                            var sl = docs[i].city + ' ' + ct;
                            sl = yourttoocore.slug(sl);
                            if (deps.indexOf(sl) < 0) {
                                colls.departurecities.push({ city: docs[i].city, city_es: docs[i].city_es, slug: sl, cityid: docs[i].cityid });
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
                            var ct = docs[i].location.countrycode || docs[i].countrycode;
                            var sl = docs[i].city + ' ' + ct;
                            sl = yourttoocore.slug(sl);
                            if (sleps.indexOf(sl) < 0) {
                                colls.sleepcities.push({ city: docs[i].city, city_es: docs[i].city_es, slug: sl, cityid: docs[i].cityid });
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
                            var ct = docs[i].location.countrycode || docs[i].countrycode;
                            var sl = docs[i].city + ' ' + ct;
                            sl = yourttoocore.slug(sl);
                            if (stops.indexOf(sl) < 0) {
                                colls.stopcities.push({ city: docs[i].city, city_es: docs[i].city_es, slug: sl, cityid: docs[i].cityid });
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
        
        var query = this.model('DMCProducts').find({ code: code });
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
    
    DMCProduct.schema.pre('save', function (next) {
        console.log(this.savetriggers);
        
        if (this.savetriggers == null || this.savetriggers.presave == null || this.savetriggers.presave == '') {
            var _ = require('underscore');
            var dstindex = [];
            var self = this;
            function pad(str, max) {
                str = str.toString();
                return str.length < max ? pad("0" + str, max) : str;
            }
            if (this.sleepcountry != null && this.sleepcountry.length > 0) {
                _.each(this.sleepcountry, function (sleepcountry) {
                    if (sleepcountry != null && sleepcountry.label_en != null && sleepcountry.label_en != '') {
                        dstindex.push([sleepcountry.label_en.toLowerCase(), pad(self.code, 10)].join('.'));
                    }
                    if (sleepcountry != null && sleepcountry.label_es != null && sleepcountry.label_es != '') {
                        dstindex.push([sleepcountry.label_es.toLowerCase(), pad(self.code, 10)].join('.'));
                    }
                });
            }
            if (this.sleepcity != null && this.sleepcity.length > 0) {
                _.each(this.sleepcity, function (sleepcity) {
                    if (sleepcity != null && sleepcity.label_en != null && sleepcity.label_en != '') {
                        dstindex.push([sleepcity.label_en.toLowerCase(), pad(self.code, 10)].join('.'));
                    }
                    if (sleepcity != null && sleepcity.label_es != null && sleepcity.label_es != '') {
                        dstindex.push([sleepcity.label_es.toLowerCase(), pad(self.code, 10)].join('.'));
                    }
                });
            }
            dstindex = dstindex == null ? [['ZZZZZZZZZZ', pad(this.code, 10)].join('.')] : dstindex;
            this.destinationindexing = this.destinationindexing != null && this.destinationindexing.length > 0 ?
                this.destinationindexing.slice(0, this.destinationindexing.length) : null;
            this.destinationindexing = dstindex;

            var channels = [];

            if (this.dmc != null && this.dmc.membership != null) {
                this.dmc.membership.b2cchannel ? channels.push('b2c') : null;
                this.dmc.membership.b2bchannel ? channels.push('b2b') : null;
            }
            channels = channels.length == 0 ? [['ZZZZZZZZZZ', pad(this.code, 10)].join('.')] : channels;
            this.channels.slice(0, this.channels.length);
            this.channels = channels;

            if (this.dmc != null && this.dmc.name != null) {
                var cname = this.dmc.name || 'ZZZZZZZZZZ';
                this.dmcindexing = [cname.toLowerCase(), pad(this.code, 10)].join('.');
            }
            else {
                this.dmcindexing = this.dmcindexing == null ?
                    ['ZZZZZZZZZZ', pad(this.code, 10)].join('.') : this.dmcindexing;
            }
            console.log('check category...');
            var utils = require('../lib/utils');
            this.operationdays = utils.getOperationDays(this);
            var self = this;
            _setcategorybehaviour(this, function () {
                console.log('build min price...');
                _loaddmc(self, function (dmc) { 
                    channels = [];
                    self.dmc.membership.b2cchannel ? channels.push('b2c') : null;
                    self.dmc.membership.b2bchannel ? channels.push('b2b') : null;

                    channels = channels.length == 0 ? [['ZZZZZZZZZZ', pad(self.code, 10)].join('.')] : channels;
                    self.channels.slice(0, self.channels.length);
                    self.channels = channels;

                    if (self.dmc != null && self.dmc.name != null) {
                        var cname = self.dmc.name || 'ZZZZZZZZZZ';
                        self.dmcindexing = [cname.toLowerCase(), pad(self.code, 10)].join('.');
                    }
                    else {
                        self.dmcindexing = self.dmcindexing == null ?
                            ['ZZZZZZZZZZ', pad(self.code, 10)].join('.') : self.dmcindexing;
                    }

                    _minprice(self);
                    console.log('build itinerary shortcuts...');
                    self.buildeditinerary = _builditinerary(self, next);
                    self.savetriggers.presave = '';
                });
            });
        }
        else {
            this.savetriggers.presave = '';
            next();
        }
        //next();
    });


    DMCProduct.schema.virtual('content.display').get(function () {
        return this.name + ' - ' + this.iata || '';
    });
    
    function _loaddmc(product, callback) {
        yourttoocore.list('DMCProducts').model.populate(product, [{ path: 'dmc' }], function (err, poped) {
            product.dmc = poped.dmc;
            callback(poped.dmc);    
        });
    }

    function _setcategorybehaviour(product, ecallback) {
        var _ = require('underscore');
        var async = require('async');
        var code = product.parent || product.code;
        var comparedelegate = function (a, b) {
            var ct = 0;
            if (a.pvp != null && b.pvp != null) {
                var c = a.pvp.b2b || a.pvp.b2c;
                var d = b.pvp.b2b || b.pvp.b2c;
                ct = c < d ? -1 : ct;
                ct = c > d ? 1 : ct;
            }
            return ct;
        };
        console.log('find parents or related with.. code: ' + product.code + ' _id: ' + product.id);

        yourttoocore.list('DMCProducts').model.find({ $or: [{ 'parent': code }, { 'code': code }] })
            .select('_id code parent pvp minprice categoryname savetriggers')
            .exec(function (err, docs) {

                console.log('finished search related.. check it out..');
                err != null ? (console.error(err), ecallback()) : setImmediate(function () {
                    console.log('Related products... ');
                    docs != null && docs.length > 0 ? setImmediate(function () {
                        console.log('finded : ' + docs.length);
                        docs.sort(comparedelegate);
                        //set relationships
                        var codes = _.map(docs, function (doc) { return doc.code; });
                        _.each(docs, function (doc) { doc.categoryname != null ? (doc.categoryname.categorybehaviour = 'child', doc.categoryname.related = codes) : null; });
                        //first one is main: 
                        docs[0].categoryname != null ? docs[0].categoryname.categorybehaviour = 'parent' : null;
                        //filter this 
                        docs = _.filter(docs, function (doc) {
                            (doc._id.toString() == product._id.toString()) ?
                                (
                                    product.categoryname != null ? (product.categoryname.categorybehaviour = doc.categoryname.categorybehaviour,
                                    product.categoryname.related = doc.categoryname.related) : null
                                ) : null;
                            console.log('its another product...: ' + (doc._id.toString() != product._id.toString()));
                            return doc._id.toString() != product._id.toString();
                        });
                        var parallelsaves = [];

                        docs != null && docs.length > 0 ? setImmediate(function () {
                            //categories
                            _.each(docs, function (doc) {
                                parallelsaves.push(function (callback) {
                                    doc.savetriggers != null ? doc.savetriggers.presave = 'notrigger' : doc.savetriggers = { presave: 'notrigger' };
                                    console.log('about to save a related doc category...' + doc._id);
                                    console.log('trigger activated: ');
                                    console.log(doc.categoryname);
                                    console.log(doc.savetriggers);

                                    doc.save(function (err, doc) {
                                        err != null ? console.error(err) : null;
                                        callback(null, doc);
                                    });
                                });
                            });

                            async.parallel(parallelsaves, function (err, results) {
                                err != null ? console.error(err) : null;
                                console.log('finished saving categories behaviour');
                                ecallback(results);
                            });

                        }) : (console.log('finished saving categories behaviour'), ecallback());
                        
                    }) : ecallback();
                });
            });
    }
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
            
            yourttoocore.list('DMCProducts').model.populate(product,
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
    function _minprice(product) {
        var _ = require('underscore');
        var async = require('async');

        var staticdata = require('../lib/staticdata');
        var utils = require('../lib/utils');
        var months = staticdata.months_en;
        var currencys = staticdata.currencys;

        var priceindexprefix = 'zzzz';
        var priceb2bindexprefix = 'zzzz';
        var priceindexsufix = product.code;
        var priceb2bindexsufix = product.code;

        var prices = utils.getMinimumPrices(product);
        var lastday = utils.getlastavailabilityday(product);
        var currency = product.dmc.currency;
        var currencycode = product.dmc.currency.value;

        if (prices != null && prices.length > 0) {
            

            var validprices = _.map(prices, function (price) {
                var today = new Date();
                datetoday = (product.release != null && product.release > 0) ?
                    today.getDate() + product.release : today.getDate();
                today.setDate(datetoday);
                var year = today.getFullYear();
                if (price.year > year) {
                    return price
                }
                else {
                    if (months.indexOf(price.month) >= today.getMonth()) {
                        return price;
                    } else {
                        return null;
                    }
                }
            });

            prices.sort(function (a, b) { return a.minprice - b.minprice; });
            prices = _.filter(prices, function (v) { return (v != null && v.minprice > 0); });
            product.prices = prices;

            validprices = _.filter(validprices, function (v) { return (v != null && v.minprice > 0); });
            if (validprices != null && validprices.length > 0) {
                validprices.sort(function (a, b) { return a.minprice - b.minprice; });

                //b2c
                product.minprice.value = validprices[0].minprice
                product.minprice.currency.label = currency.label;
                product.minprice.currency.symbol = currency.symbol;
                product.minprice.currency.value = currency.value;
                product.minprice.currencycode = currency.value;
                product.minprice.month = validprices[0].month;
                product.minprice.year = validprices[0].year;
                product.minprice.day = validprices[0].day;

                priceindexprefix = utils.pad(product.minprice.value, 10);
                //b2b
                var b2bcomission = (product.dmc != null && product.dmc.membership != null) ?
                    (product.dmc.membership.b2bcommission != null) ? product.dmc.membership.b2bcommission : 0 : 0;

                var minpriceb2b = product.minprice.value - Math.round(product.minprice.value * b2bcomission / 100);
                product.minprice.b2b = minpriceb2b;
                priceb2bindexprefix = utils.pad(minpriceb2b, 10);
                //PVP - mins
                product.pvp.b2c = product.minprice.value;
                product.pvp.b2b = product.minprice.b2b;
                product.pvp.currency.label = currency.label;
                product.pvp.currency.symbol = currency.symbol;
                product.pvp.currency.value = currency.value;
                product.pvp.currencycode = currency.value;
                product.pvp.month = product.minprice.month;
                product.pvp.year = product.minprice.year;
                product.pvp.day = product.minprice.day;

                product.pvp.b2cperday = Math.round(product.pvp.b2c / product.itinerary.length);
                product.pvp.b2bperday = Math.round(product.pvp.b2b / product.itinerary.length);

            } else {
                var today = new Date();
                var b2bcomission = (product.dmc != null && product.dmc.membership != null) ?
                    (product.dmc.membership.b2bcommission != null) ? product.dmc.membership.b2bcommission : 0 : 0;

                if (lastday != null) {
                    //min price
                    product.minprice.value = lastday.rooms.double.price;
                    product.minprice.b2b = lastday.rooms.double.price - Math.round(lastday.rooms.double.price * b2bcomission / 100);
                    product.minprice.currency.label = currency.label;
                    product.minprice.currency.symbol = currency.symbol;
                    product.minprice.currency.value = currency.value;
                    product.minprice.currencycode = currency.value;
                    
                    product.minprice.day = lastday.cdate.getDate();
                    product.minprice.month = months[lastday.cdate.getMonth()];
                    product.minprice.year = lastday.cdate.getFullYear();

                    //pvp min price
                    product.pvp.b2c = product.minprice.value || 0;
                    product.pvp.b2b = product.minprice.b2b || 0;
                    product.pvp.currency.label = currency.label;
                    product.pvp.currency.symbol = currency.symbol;
                    product.pvp.currency.value = currency.value;
                    product.pvp.currencycode = currency.value;
                    product.pvp.month = product.minprice.month;
                    product.pvp.year = product.minprice.year;
                    product.pvp.day = product.minprice.day || 1;

                    product.pvp.b2cperday = Math.round(product.pvp.b2c / product.itinerary.length);
                    product.pvp.b2bperday = Math.round(product.pvp.b2b / product.itinerary.length);

                }
                //check minprice
                if (product.minprice == null) {
                    //set 0
                    console.log('minprice unreachable!!');
                    console.log('set null minprice!!');
                    
                    product.minprice.value = 0;
                    product.minprice.b2b = 0;
                    product.pvp.b2c = product.minprice.value || 0;
                    product.pvp.b2b = product.minprice.b2b || 0;
                    product.pvp.currency.label = currency.label;
                    product.pvp.currency.symbol = currency.symbol;
                    product.pvp.currency.value = currency.value;
                    product.pvp.currencycode = currency.value;
                    product.pvp.month = product.minprice.month || 'January';
                    product.pvp.year = product.minprice.year || 2016;
                    product.pvp.day = product.minprice.day || 1;


                    product.pvp.b2cperday = Math.round(product.pvp.b2c / product.itinerary.length);
                    product.pvp.b2bperday = Math.round(product.pvp.b2b / product.itinerary.length);
                }
            }
        }

        if (product.pvp == null || product.pvp.b2b == null || product.pvp.b2b == 0) {
            console.log('PVP is null...');
            var b2bcomission = (product.dmc != null && product.dmc.membership != null) ?
                (product.dmc.membership.b2bcommission != null) ? product.dmc.membership.b2bcommission : 0 : 0;
            var minpriceb2b = product.minprice.value - Math.round(product.minprice.value * b2bcomission / 100);

            product.pvp = { b2c: 0, b2b: 0, currency: { label: currency.label, symbol: currency.symbol, value: currency.value }, currencycode: currency.value, month: 0, year: 2017, day: 1 }
            product.pvp.b2c = product.minprice.value || 0;
            product.pvp.b2b = minpriceb2b || 0;
           
            product.pvp.month = product.minprice.month || 'January';
            product.pvp.year = product.minprice.year || 2016;
            product.pvp.day = product.minprice.day || 1;
        }

        product.priceindexing = [priceindexprefix, priceindexsufix].join('.'); //#### price indexing b2c
        product.priceb2bindexing = [priceb2bindexprefix, priceb2bindexsufix].join('.');

        lastday != null && lastday.cdate != null ?
            product.availabilitytill = new Date(lastday.cdate.getFullYear(),
                lastday.cdate.getMonth(), lastday.cdate.getDate(), 0, 0, 0) : product.availabilitytill = new Date(2015, 0, 1);
        console.log('last availability day : ' + product.availabilitytill);
        var laststate = product.publishState;
        var noallowed = ['published', 'published.noavail'];
        product.publishState = (priceindexprefix == 'zzzz' && product.publishState == 'published') ?
            'published.noavail' : product.publishState;

        laststate != product.publishState ? console.log('Product ' + product.code + ' changed state : ' +
            laststate + ' -> ' + product.publishState) : null;

        if (product.itinerary != null) {
            product.itinerarylength = product.itinerary.length;
            product.itinerarylengthindexing = utils.pad(product.itinerary.length, 5) + '.' + product.code;
        } else {
            product.itinerarylength = 0;
            product.itinerarylengthindexing = utils.pad(0, 5) + '.' + product.code;
        }

        console.log(
            'Product updated! : ' + product.code + ' minprice: ' +
            product.minprice.value + ' ' + product.minprice.currency.label + ' day: ' + product.minprice.day +
            ' month: ' + product.minprice.month + ' year: ' + +product.minprice.year);

        return product;

    }
    
    DMCProduct.addPattern('standard meta');
    DMCProduct.defaultColumns = 'name, slug|20%, publishedDate|20%, code|20%';
    DMCProduct.register(dbname);
}

