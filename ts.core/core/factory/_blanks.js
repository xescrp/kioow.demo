module.exports.blankquoteprogram = {
        name: 'New Program' + new Date().toJSON(),
        title: 'Tailor made program - ',
        title_es: 'Tailor made program - ',
        languages: {
            english: true,
            spanish: true
        },
        productvalid: false,
        description: '',
        origin: 'tailormade',
        productimage: { url: 'http://res.cloudinary.com/open-market-travel/image/upload/v1426854292/assets/omtempty.png' },
        code: '',
        dmc: null,
        dmccode: '',
        publishState: 'draft',
        adminsave: false,
        important_txt_en: '',
        important_txt_es: '',
        location: {
            fulladdress: '',
            city: '',
            stateorprovince: '',
            cp: '',
            country: '',
            countrycode: '',
            continent: '',
            latitude: 0.0,
            longitude: 0.0,
        },
        availability: [],
        price: 0,
        included: {
            trip: {
                grouptrip: false,
                privatetrip: false
            },
            arrivaltransfer: false,
            arrivalassistance: false,
            arrivallanguage: {
                spanish: false,
                english: false,
                french: false,
                german: false,
                italian: false,
                portuguese: false
            },
            arrivalselectedlanguage: { language: { spanish: false } },
            departuretransfer: false,
            departureassistance: false,
            departurelanguage: {
                spanish: false,
                english: false,
                french: false,
                german: false,
                italian: false,
                portuguese: false
            },
            departureselectedlanguage: { language: { spanish: false } },
            tourescort: {
                included: false,
                language: {
                    spanish: false,
                    english: false,
                    french: false,
                    german: false,
                    italian: false,
                    portuguese: false
                },
                tourescortselectedlanguage: { language: { spanish: false } },
            },
            driveguide: {
                included: false,
                language: {
                    spanish: false,
                    english: false,
                    french: false,
                    german: false,
                    italian: false,
                    portuguese: false
                }
            },
            transportbetweencities: {
                bus: false,
                domesticflight: false,
                train: false,
                boat: false,
                van: false,
                truck: false,
                privatecarwithdriver: false,
                privatecarwithdriverandguide: false,
                fourxfour: false,
                other: false,
                otherdescription: ''
            },
            taxesinthecountry: false,
            airporttaxes: false,
            tips: false,
            baggagehandlingfees: false
        },

        //itinerario
        itinerary: [
            {
                isnotlastday: true,
                lastday: false,
                name: new Date().getDay() + new Date().getMonth(),
                daynumber: 1,
                date: new Date(),
                image: { url: 'http://res.cloudinary.com/open-market-travel/image/upload/v1426854292/assets/omtempty.png' },
                imageprogress: false,
                showimage: false,
                departurecity: {
                    city: '',
                    citybehaviour: '',
                    order: 1,
                    country: '',
                    location: {
                        fulladdress: '',
                        city: '',
                        stateorprovince: '',
                        cp: '',
                        country: '',
                        countrycode: '',
                        continent: '',
                        latitude: 0,
                        longitude: 0,
                    },
                },
                sleepcity: {
                    city: '',
                    citybehaviour: '',
                    order: 2,
                    country: '',
                    location: {
                        fulladdress: '',
                        city: '',
                        stateorprovince: '',
                        cp: '',
                        country: '',
                        countrycode: '',
                        continent: '',
                        latitude: 0,
                        longitude: 0,
                    },
                },
                stopcities: [],
                hotel: {
                    name: '',
                    category: '',
                    locationkind: '',
                    incity: false,
                    insurroundings: false,
                    meals: false,
                    breakfast: false,
                    lunch: false,
                    lunchdrinks: false,
                    dinner: false,
                    dinnerdrinks: false,
                    selectedcategory: { text: '5*', category: '5*' }
                },
                description_en: '',
                description_es: '',
                activities: [],
                citytoadd: {
                    city: '',
                    citybehaviour: 'departure',
                    order: '',
                    country: '',
                    location: {
                        fulladdress: '',
                        city: '',
                        stateorprovince: '',
                        cp: '',
                        country: '',
                        countrycode: '',
                        continent: '',
                        latitude: 0,
                        longitude: 0,
                    }
                }
            }
        ],
        keys: [],
        //keys : $scope.query.whattodo,
        tags: [],
        //tags : $scope.query.whattodo, 
}

module.exports.blankquoterooms = function(currency) {
    var dummyRooms = {
        single: {
            quantity: 0,
            pricePerPax: {
                value: 0,
                currency: currency,
                exchange: {
                    value: 0,
                    currency: {
                        label: '',
                        symbol: '',
                        value: ''
                    }
                }
            },
            amountPricePerPax: {
                value: 0,
                currency: currency,
                exchange: {
                    value: 0,
                    currency: {
                        label: '',
                        symbol: '',
                        value: ''
                    }
                }
            }
        },
        double: {
            quantity: 0,
            pricePerPax: {
                value: 0,
                currency: currency,
                exchange: {
                    value: 0,
                    currency: {
                        label: '',
                        symbol: '',
                        value: ''
                    }
                }
            },
            amountPricePerPax: {
                value: 0,
                currency: currency,
                exchange: {
                    value: 0,
                    currency: {
                        label: '',
                        symbol: '',
                        value: ''
                    }
                }
            }
        },
        triple: {
            quantity: 0,
            pricePerPax: {
                value: 0,
                currency: currency,
                exchange: {
                    value: 0,
                    currency: {
                        label: '',
                        symbol: '',
                        value: ''
                    }
                }
            },
            amountPricePerPax: {
                value: 0,
                currency: currency,
                exchange: {
                    value: 0,
                    currency: {
                        label: '',
                        symbol: '',
                        value: ''
                    }
                }
            }
        },
        quad: {
            quantity: 0,
            pricePerPax: {
                value: 0,
                currency: currency,
                exchange: {
                    value: 0,
                    currency: {
                        label: '',
                        symbol: '',
                        value: ''
                    }
                }
            },
            amountPricePerPax: {
                value: 0,
                currency: currency,
                exchange: {
                    value: 0,
                    currency: {
                        label: '',
                        symbol: '',
                        value: ''
                    }
                }
            }
        }
    };
    return dummyRooms;
}