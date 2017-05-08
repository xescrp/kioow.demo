module.exports = {
    program: {
        name: 'New Program' + new Date().toJSON(),
        title: '',
        title_es: '',
        languages: {
            english: true,
            spanish: false
        },
        productvalid: false,
        description: '',
        productimage: { url: 'http://res.cloudinary.com/open-market-travel/image/upload/v1426854292/assets/omtempty.png' },
        code: '',
        dmccode: '',
        publishState: 'draft',
        adminsave: false,
        important_txt_en: '',
        important_txt_es: '',
        categoryname: {
            label_en: 'Main Category',
            label_es: 'Categoria Principal',
            categorybehaviour: 'parent'
        },
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
                privatetrip: false,
                minpaxoperate: 2
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
        itinerary: [

        ],
        keys: [],
        tags: [],
        dmc: {},
        flightsdmc: false,
        flights: false
    },
    booking: {

    }
}
