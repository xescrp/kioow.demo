# Traveler Sense API

## Item of an search product response

```javascript
{
  "code": "ES112258", //{String} Product code (use to search full version)
  "dmccode": "ES11", //{String} DMC code
  "dmc": {
    "name": "Dmc Test Ltd" //{String} DMC name
  },
  "title_es": "Lorem ipsum dolor en Marruecos", //{String} Title in spanish for client
  "title": "Lorem ipsum dolor in Morocco", //{String} Title in english for client
  "description_en": "Lorem ipsum dolor sit amet, consectetur adipisicing elit", //{String} description in english
  "description_es": "Lorem ipsum dolor sit amet, consectetur adipisicing elit", //{String} description in spanish
  "buildeditinerary": { // {Object} Product resume
    "countries": [ // {Object} Array of countrycodes of destinations countries
      "MA"
    ],
    "cities": [ // {Object} Array of all destinations cities in spanish
      "Essaouira",
      "Fes",
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
    {
      "label": "Programa en Castellano",
      "label_en": "Spanish Speaking",
    },
    {
      "label": "Confort",
      "label_en": "Confort",
    },
    {
      "label": "Escapadas Short Breaks",
      "label_en": "Short city breaks",
    },
    {
      "label": "Viajeros en general",
      "label_en": "Travelers",
    },
    {
      "label": "Programa Regular",
      "label_en": "Regular Groupe Travel",
    }
  ],
  "prices": [ // {Object} Array of min prices
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
  "parent" :  "" // {String} product code category related if is a category product || {null} if is a unique one
  "categoryname" : { // {Object} if is a category || {null} if is a unique one
      "label_es" : "", // {String} category name in spanish
      "label_en" : "" // {String} category name in english
  }
}
```
