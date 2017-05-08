# Traveler Sense API

## Full Product Description


```javascript

{
  "code": "ES112258", //{String} Product code (use to search full version)
  "languages": {
    "english": false, // {Boolean} true if the product is available in english
    "spanish": true // {Boolean} true if the product is available in spanish
  },
  "title_es": "Lorem ipsum dolor en Marruecos", //{String} Title in spanish for client
  "title": "Lorem ipsum dolor in Morocco", //{String} Title in english for client
  "description_en": "Lorem ipsum dolor sit amet, consectetur adipisicing elit", //{String} main description in english
  "description_es": "Lorem ipsum dolor sit amet, consectetur adipisicing elit", //{String} main description in spanish
  "release": 7, // {Number} Release days see readme.md#product-release
  "name": "Magical Morocco 4*", // {String} Name of product for yourttoo
  "important_txt_es": "Esto es una nota importante", // {String} important information to show to the client before booking in spanish
  "important_txt_en": "This is an important note for travelers",  // {String} important information to show to the client before booking in english
  "dmccode": "ES11", //{String} DMC code
  "dmc": {
    "name": "Dmc Test Ltd" //{String} DMC name
    "membership": {
      "cancelpolicy": {
        "_es": "10 días antes de la llegada 50% ..." //{String} cancel policy in spanish
        "_en": "10 days before ..." //{String} cancel policy in english
      },
      "paymentoption" :{
        "_en": "7 days before the trip", //payment condition english
        "_es": "7 dias antes del viaje", //payment condition spanish
        "slug": "7before" // paymentoption slug [see paymentoptions availables](readme.md#paymentoptions)
      }
    }
  },
  "buildeditinerary": { // {Object} Product resume
    "countries": [ // {Object} Array of countrycodes of destinations countries
      "MA"
    ],
    "cities": [ // {Object} Array of all destinations cities in spanish
      "Essaouira",
      "Fes",

      ...

      "Marrakesh"
    ],
    "hotelcategories": [ // {Object} Array of all hotels categories
      "4*"
    ],
    "sleepcities": [ // {Object} Array of sleep cities
      {
        "slug": "fes-ma",// {String} slug city: englishname-countrycode
        "city_es": "Fez", // {String} Spanish Name
        "city": "Fes" // {String} English name
      },

      ...

      {
        "slug": "marrakesh-ma",
        "city_es": "Marrakesh",
        "city": "Marrakesh"
      }
    ],
    "departurecities": [ // {Object} Array of departures cities
      {
        "slug": "fes-ma",
        "city_es": "Fez",
        "city": "Fes"
      },

      ...

      {
        "slug": "marrakesh-ma",
        "city_es": "Marrakesh",
        "city": "Marrakesh"
      }
    ],
    "stopcities": [// {Object} Array of stops cities
      {
        "slug": "essaouira-ma",
        "city_es": "Essaouira",
        "city": "Essaouira"
      },

      ...

      {
        "slug": "marrakesh-ma",
        "city_es": "Marrakesh",
        "city": "Marrakesh"
      }
    ],
    "meals": { // {Object} Array of included meals
      "breakfast": 4,
      "dinner": 2
      "lunch": 2
    },
    "days": 5 // Product number of days
  },
  "tags": [ // Product category tags
    {
      "label": "Cultura e Historia",
      "label_en": "Culture and History",
    },

    ...

    {
      "label": "Programa Regular",
      "label_en": "Regular Groupe Travel",
    }
  ],
  "availability": [ // booking availability calendar
    {
      "name": "2016", // {String} year
      "year": 2016, // {Number} year
      "January": { // Month
        "availability": [ // {Object} Array of days
          {
            "day": 1, // {Number} day of the month
            "available": true, // {Boolean} true : is an available date | false : not available
            "rooms": { // {Object} price per person by room type
              "currency": { // {Object} currency
                "label": "Euro", // {String} Label
                "symbol": "€",  // {String} Symbol
                "value": "EUR" // {String} Code ISO 4217 https://es.wikipedia.org/wiki/ISO_4217
              },
              "triple": {
                "price": 230 //{Number} price per pax in a triple room
              },
              "double": {
                "price": 265 //{Number} price per pax in a double room
              },
              "single": {
                "price": 311 //{Number} price per pax in a single room
              }
            }
          },

          ...

          {
            "day": 31,
            "available": true,
            "rooms": {
              "currency": {
                "label": "Euro",
                "symbol": "€",
                "value": "EUR"
              },
              "triple": {
                "price": 265
              },
              "double": {
                "price": 265
              },
              "single": {
                "price": 311
              }
            }
          }
        ]
      },

      ...

      "December": { // Month
        "availability": [ // {Object} Array of days

          ...

        ]
      }
    },
    {
      "name": "2017", // {String} year
      "year": 2017, // {Number} year
      "January": { // Month
        "availability": [

          ...

        ]
      },
      ...
      "December": { // Month
        "availability": [ // {Object} Array of days

          ...

        ]
      }
    }
  ],
  "itinerary": [ // {Object} Array of days of itinerary
    {
      "daynumber": 1, //{Number} position day of itinerary
      "needflights": true, //{Boolean} true if this need domestic flights
      "description_en": "Pick up at Marrakech Menara airport and transfer to hotel...",//{String} description of the day in english
      "description_es": "Recogida en el aeropuerto Marrakech Menara y traslado al hotel...",//{String} description of the day in english
      "activities": [ //{Object} Array of activities in actual day
        {
          "daynumber": 1,//{Number} day number related activity
          "title": "City tour", //{String} activity title in english
          "title_es": "Visita de la ciudad", //{String} activity title in spanish
          "group": true, //{Boolean} true if group activity
          "individual": false, //{Boolean} true if private activity
          "ticketsincluded": true, //{Boolean} true if activity tickets are included
          "localguide": true, //{Boolean} true if local guide are included
          "language": {//{Object} only if localguide is true
            "spanish": true, // {Boolean} true: if have localguide in spanish
            "english": false, // {Boolean} true: if have localguide in english
            "french": false, // {Boolean} true: if have localguide in french
            "german": false, // {Boolean} true: if have localguide in german
            "italian": false, // {Boolean} true: if have localguide in italian
            "portuguese": false // {Boolean} true: if have localguide in portuguese
          }
        }
      ],
      "hotel": { // {Object} hotel of day itinerary
        "name": "Hamdulila (o similar)", //{String} Hotel's name
        "category": "4*", // {String} Hotel category
        "incity": true, // {Boolean} true: if the hotel is in the city
        "insurroundings": false,// {Boolean} true: if the hotel is in surroundings
        "meals": false,// {Boolean} true: include any type of meals
        "breakfast": false,// {Boolean} true: include breakfast (only if meals is true)
        "lunch": false,// {Boolean} true: include breakfast (only if meals is true)
        "lunchdrinks": false,// {Boolean} true: include breakfast (only if meals is true)
        "dinner": true,// {Boolean} true: include breakfast (only if meals is true)
        "dinnerdrinks": false// {Boolean} true: include drinks in dinner (only if meals is true and dinner is true)
      },
      "sleepcity": { // {Object} Sleep City
        "city_es": "Marrakesh", //{String} name of the city in Spanish
        "city": "Marrakesh", //{String} name of the city in english
        "country": "Morocco",//{String} country name in english
        "location": {
          "fulladdress": "Marrakesh 40000, Morocco",
          "cp": "40000",
          "city": "Marrakesh",
          "country": "Morocco",
          "countrycode": "MA",
          "stateorprovince": "Marrakesh-Tensift-El Haouz",
          "latitude": 31.6294723,//{Number} latitude of the city
          "longitude": -7.981084499999952//{Number} longitude of the city
        }
      },
      "stopcities": [ // {Object} Array of stopcities

        ...

      ],
      "departurecity": {
        "city": "",
        "country": "",
        "location": {
          "fulladdress": "",
          "city": "",
          "stateorprovince": "",
          "cp": "",
          "country": "",
          "countrycode": "",
          "continent": "",
          "latitude": 0,
          "longitude": 0
        }
      },
      "flights": [// {Object} Array : flights not included for this day
        {
          "recommendedflight": "AS30093", //{String}
          "departure": {//{Object} departure airport
            "name": "Menara",//{String} name of departure airport  
            "city": "Marrakech", //{String} city of departure airport
            "country": "Morocco", //{String} country of departure airport
            "iata": "RAK",//{String} IATA code of the departure airport
            "icao": "GMMX",//{String} ICAO code of the departure airport
            "latitude": 31.606886,//{Number} latitude of the departure airport
            "longitude": -8.0363,//{Number} longitude of the departure airport
            "label": "(RAK) Marrakech - Menara"
          },
          "arrival": {//{Object} arrival airport
            "name": "Cairo Intl",//{String} name of arrival airport  
            "city": "Cairo", //{String} city of arrival airport  
            "country": "Egypt", //{String} country of arrival airport
            "iata": "CAI",//{String} IATA code of the arrival airport
            "icao": "HECA",//{String} ICAO code of the arrival airport
            "latitude": 30.121944,//{Number} latitude of the arrival airport
            "longitude": 31.405556,//{Number} longitude of the arrival airport
            "label": "(CAI) Cairo - Cairo Intl"
          }
        }
      ]
    },

    ...

    { // {Object} last day
      "daynumber": 5,
      "needflights": false,
      "description_en": "We turn to the red bead. Once there you have time until the time of transfer to the airport.",
      "description_es": "Volvemos hacia la perla roja. Una vez alli tienes tiempo hasta la hora del traslado al aeropuerto.",
      "activities": [],
      "hotel": { //
        "name": "",
        "category": "",
        "incity": false,
        "insurroundings": false,
        "meals": false,
        "breakfast": true,
        "lunch": false,
        "lunchdrinks": false,
        "dinner": false,
        "dinnerdrinks": false
      },
      "sleepcity": {
        "city": "",
        "country": "",
        "location": {
          "fulladdress": "",
          "city": "",
          "stateorprovince": "",
          "cp": "",
          "country": "",
          "countrycode": "",
          "continent": "",
          "latitude": 0,
          "longitude": 0
        }
      },
      "stopcities": [
        {
          "city": "Marrakesh",
          "country": "Morocco",
          "city_es": "Marrakesh",
          "slug": "marrakesh-ma",
          "location": {
            "fulladdress": "Marrakesh 40000, Morocco",
            "cp": "40000",
            "city": "Marrakesh",
            "country": "Morocco",
            "countrycode": "MA",
            "stateorprovince": "Marrakesh-Tensift-El Haouz",
            "latitude": 31.6294723,
            "longitude": -7.981084499999952
          }
        }
      ],
      "departurecity": {
        "city": "Fes",
        "country": "Morocco",
        "city_es": "Fez",
        "slug": "fes-ma",
        "location": {
          "fulladdress": "Fes, Morocco",
          "cp": "",
          "city": "Fes",
          "country": "Morocco",
          "countrycode": "MA",
          "stateorprovince": "Fes-Boulemane",
          "latitude": 34.0181246,
          "longitude": -5.00784509999994
        }
      },
      "flights": []
    }
  ],
  "prices": [ // {Object} Array of min prices month by month
    {
      "year": 2016, // {Number} Year of min price
      "month": "March", // {String} Month of min price
      "day": 21, // {Number}  Day of the month of min price
      "minprice": 265, // {Number}  Price Value
      "currency": { // {Object} currency
        "label": "Euro", // {String} Label
        "symbol": "€",  // {String} symbol
        "value": "EUR" // {String} Code ISO 4217 https://es.wikipedia.org/wiki/ISO_4217
      }
    },
    ...
    {
      "year": 2016, // {Number} Year of price
      "month": "December", // {String} Month of price
      "day": 15, // {Number}  Month of price
      "minprice": 265, // {Number}  Price Value
      "currency": { // {Object} currency
        "label": "Euro", // {String} Label
        "symbol": "€", // {String} symbol
        "value": "EUR" // {String} Code ISO 4217 https://es.wikipedia.org/wiki/ISO_4217
      }
    }
  ],
  "minprice": { // {Object} Min Price for all year
    "month": "March", // {String} Month of price
    "value": 265, // {Number}  Price Value
    "year": 2016, // {Number} Year of price
    "currency": { // {Object} currency
      "label": "Euro", // {String} Label
      "symbol": "€",  // {String} symbol
      "value": "EUR" // {String} Code ISO 4217 https://es.wikipedia.org/wiki/ISO_4217
    }
  },
  "parent" : "ES112259" // {String} product code category related if is a category product || {null} if is a unique one
  "categoryname" : { // {Object} if is a category || {null} if is a unique one
      "label_es" : "Básico", // {String} category name in spanish
      "label_en" : "Basic" // {String} category name in english
  },
  "included": { // {Object} included // not-included
    "arrivaltransfer": true, // {Boolean} true: include Arrival transfer service
    "arrivalassistance": true, // {Boolean} true: include Arrival transfer Assistance (only if arrivaltransfer is true)
    "departuretransfer": true, // {Boolean} true: include  Departure transfer service
    "departureassistance": true, // {Boolean} true: include Departure transfer Assistance (only if departuretransfer is true)
    "taxesinthecountry": false,// {Boolean} true: include taxes in the country
    "airporttaxes": false,// {Boolean} true: include airport taxes
    "tips": false,// {Boolean} true: include tips
    "baggagehandlingfees": false,// {Boolean} true: include baggage handling fees
    "transportbetweencities": {
      "bus": true,// {Boolean} true: include bus transportation (only transportbetweencities.included is true)
      "domesticflight": false, // {Boolean} true: include domestic flights (only transportbetweencities.included is true)
      "train": true,// {Boolean} true: include train transportation (only transportbetweencities.included is true)
      "boat": false,// {Boolean} true: include train transportation (only transportbetweencities.included is true)
      "van": false,// {Boolean} true: include Van/Minivan transportation (only transportbetweencities.included is true)
      "truck": false,// {Boolean} true: include Truck transportation (only transportbetweencities.included is true)
      "privatecarwithdriver": false,// {Boolean} true: include Private Car with Driver transportation (only transportbetweencities.included is true)
      "privatecarwithdriverandguide": false,// {Boolean} true: include Private Car with Driver and guide transportation (only transportbetweencities.included is true)
      "fourxfour": false,// {Boolean} true: include 4x4 transportation (only transportbetweencities.included is true)
      "other": false,// {Boolean} true: include other transportation (only transportbetweencities.included is true)
      "otherdescription": "motorcicles",// {String} true: include description of other transportation (only transportbetweencities.included is true)
      "included": true // {Boolean} true: include transportation between cities
    },
    "driveguide": { // {Object} Driver Guide
      "included": false, // {Boolean} true : driver guide is included
      "language": { // {Object} available languages
        "spanish": true, // {Boolean} true: if have driver guide in spanish (only driveguide.included is true)
        "english": false, // {Boolean} true: if have driver guide in english (only driveguide.included is true)
        "french": false, // {Boolean} true: if have driver guide in french (only driveguide.included is true)
        "german": false, // {Boolean} true: if have driver guide in german (only driveguide.included is true)
        "italian": false, // {Boolean} true: if have driver guide in italian (only driveguide.included is true)
        "portuguese": false // {Boolean} true: if have driver guide in portuguese (only driveguide.included is true)
      }
    },
    "tourescort": { // {Object} Tour Escort
      "included": true, // {Boolean} true : driver guide is included
      "language": { // {Object} available languages
        "spanish": true, // {Boolean} true: if have tour escort in spanish
        "english": false, // {Boolean} true: if have tour escort in english
        "french": false, // {Boolean} true: if have tour escort in french
        "german": false, // {Boolean} true: if have tour escort in german
        "italian": false, // {Boolean} true: if have tour escort in italian
        "portuguese": false // {Boolean} true: if have tour escort in portuguese
      }
    },
    "departurelanguage": { //{Object} Departure transfer Assistance languages (only if departuretransfer is true and departureassistance is true)
      "spanish": true, // {Boolean} true: if have Departure transfer Assistance in spanish
      "english": false, // {Boolean} true: if have Departure transfer Assistance in english
      "french": false, // {Boolean} true: if have Departure transfer Assistance in french
      "german": false, // {Boolean} true: if have Departure transfer Assistance in german
      "italian": false, // {Boolean} true: if have Departure transfer Assistance in italian
      "portuguese": false // {Boolean} true: if have Departure transfer Assistance in portuguese
    },
    "arrivallanguage": { //{Object} Arrival transfer Assistance languages (only if arrivaltransfer is true and arrivalassistance is true)
      "spanish": true, // {Boolean} true: if have Arrival transfer Assistance in spanish
      "english": false, // {Boolean} true: if have Arrival transfer Assistance in english
      "french": false, // {Boolean} true: if have Arrival transfer Assistance in french
      "german": false, // {Boolean} true: if have Arrival transfer Assistance in german
      "italian": false, // {Boolean} true: if have Arrival transfer Assistance in italian
      "portuguese": false // {Boolean} true: if have Arrival transfer Assistance in portuguese
    },
    "trip": {
      "grouptrip": false, // {Boolean} true: is a group trip
      "privatetrip": false, // {Boolean} true: is a private trip
      "minpaxoperate": 2 // {Number} Min paxs to operate per booking see readme.md#min-pax-to-operate
    }
  }
}
```
