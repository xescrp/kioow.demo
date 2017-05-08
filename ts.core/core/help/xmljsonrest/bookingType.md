# Traveler Sense API

## Full booking Description

```javascript
{
  "status": "transfer1-2", -> tenemos que cambiarlos ["transfer1-2", "transferok2-2", "regular1-2", "regularend"] son ok ['cancelled', 'invalid' y ''] -> cancelled
  "dmc": {//{Object} DMC information for
    "company": {
      "name": "Inbound destinations Test",//{String} DMC company name
      "legalname": "legal name",
      "emergencyphone": "4556464",
      "location": {
        "fulladdress": "Gral. Mosconi, Río Gallegos, Santa Cruz, Argentina",
        "city": "Río Gallegos",
        "stateorprovince": "Santa Cruz",
        "cp": "09400",
        "country": "Argentina",
        "countrycode": "AR",
        "latitude": -51.63575039999999,
        "longitude": -69.22401460000003
      },
    }
  },
  "start": { // {Object} booking date start of the trip
    "day": 31, // {Number} day of the month
    "month": 4,// {Number} month [0-11] values
    "monthname_en": "May", //{String} name of the month in english
    "monthname_es": "Mayo", //{String} name of the month in spanish
    "year": 2016// {Number} year
  },
  "end": { // {Object} booking date end of the trip
    "day": 3,// {Number} day of the month
    "month": 5,// {Number} month [0-11] values
    "monthname_en": "June", //{String} name of the month in english
    "monthname_es": "Junio", //{String} name of the month in spanish
    "year": 2016// {Number} year
  },
  "product": { // {Object} full product booked see productType.md

    ...

  }
  "meetingdata": "(RAK) Marrakech - Menara airport 23/05/2017 20:00 flight 3455SR",
  "affiliateobservations": "Es una luna de miel",// {String} comments to yourttoo.com
  "affiliateuser": "[Tavel agent Name]",// {String} free use, (usually for agent name)
  "idBookingExt": "RJ41A50",//{String} your Booking ID code
  "idBooking": "001341RY",//{String} Booking ID of yourttoo.com code
  "createdOn": "2016-03-31T13:14:41.060Z",//{Date} booking creation date
  "payStatus": [//{Object} payment status
    {
      "payment": 15,
      "nextPaymentDate": "2016-05-17T10:00:00.000Z",
      "paymentMethod": "transfer",
      "date": "2016-03-31T13:15:12.342Z", //{Date} date of the payment
      "amount": {
        "exchange": {
          "value": 732.15,
          "currency": {
            "label": "Euro",
            "symbol": "€",
            "value": "EUR"
          }
        },
      }
    },
    {
      "paymentMethod": "transfer",
      "payment": 85,
      "amount": {
        "exchange": {
          "value": 4148.85,
          "currency": {
            "label": "Euro",
            "symbol": "€",
            "value": "EUR"
          }
        }
      }
    }
  ],
  "roomDistribution": [
    {
      "roomCode": "double",
      "paxList": [
        {// Pax 1
          "name": "Pedro",
          "lastName": "Gomez",
          "typePax": "adult",
          "birdthDate": "1955-01-01T00:00:00.000Z",
          "documentType": "dni/nif",
          "documentNumber": "1111111C",
          "holder": true,
          "country": {
            "name_es": "España",
            "countrycode": "ES"
          }
        },
        {// Pax 2
          "name": "María",
          "lastName": "Vidal Planas",
          "typePax": "adult",
          "birdthDate": "1958-01-01T00:00:00.000Z",
          "documentType": "dni/nif",
          "documentNumber": "2222222B",
          "holder": false,
          "country": {
            "name_es": "España",
            "countrycode": "ES"
          }
        }
      ],
      "pricePerPax": {
        "exchange": {
          "value": 749,
          "currency": {
            "label": "Euro",
            "symbol": "€",
            "value": "EUR"
          }
        }
      }
    },
    {
      "roomCode": "triple",
      "paxList": [
        { // Pax 1
            "name" : "Juan",
            "lastName" : "Gomez",
            "birdthDate" : "1985-01-01T00:00:00.000Z",
            "typePax": "adult",
            "documentType" : "dni/nif",
            "documentNumber" : "3333333L",
            "holder" : false,
            "country" : {
                "name_es": "España",
                "countrycode" : "ES"
            }
        },
        { // Pax 2
            "name" : "Isabella",
            "lastName" : "Conti",
            "typePax": "adult",
            "birdthDate" : "1985-01-01T00:00:00.000Z",
            "documentType" : "passport",
            "documentNumber" : "A4993939",
            "holder" : false,
            "country" : {
                "name_es": "Italia",
                "countrycode" : "IT"
            }
        }
        { // Pax 3
          "name": "Damian",
          "lastName": "Gomez",
          "typePax": "child",
          "birdthDate": "2010-01-01T00:00:00.000Z",
          "documentType": "dni/nif",
          "documentNumber": "999999J",
          "holder": false,
          "country": {
            "name_es": "España",
            "countrycode": "ES"
          }
        }
      ],
      "pricePerPax": {
        "exchange": {
          "value": 557,
          "currency": {
            "label": "Euro",
            "symbol": "€",
            "value": "EUR"
          }
        }
      }
    }
  ],
  "amount": {
    "exchange": {
      "value": 4881,
      "currency": {
        "label": "Euro",
        "symbol": "€",
        "value": "EUR"
      }
    }
  },
  "comments": [],
  "cancelpolicy": {
    "_es": "10 días antes de la llegada 50% ..." //{String} cancel policy in spanish
    "_en": "10 days before ..." //{String} cancel policy in english
  }
}
```
## Pay status cases

You have four possibles status for your payments in a booking
//TODO

#### 1. Recent booking
```javascript
  "payStatus": [//{Object} payment status
    {
      "payment": 15,
      "nextPaymentDate": "2016-05-17T10:00:00.000Z",
      "paymentMethod": "transfer",
      "date": "2016-03-31T13:15:12.342Z", //{Date} date of the payment
      "amount": {
        "exchange": {
          "value": 732.15,
          "currency": {
            "label": "Euro",
            "symbol": "€",
            "value": "EUR"
          }
        },
      }
    },
    {
      "paymentMethod": "transfer",
      "payment": 85,
      "amount": {
        "exchange": {
          "value": 4148.85,
          "currency": {
            "label": "Euro",
            "symbol": "€",
            "value": "EUR"
          }
        }
      }
    }
  ]

```

#### 2. First payment received

```javascript
  "payStatus": [//{Object} payment status
    {
      "payment": 15,
      "nextPaymentDate": "2016-05-17T10:00:00.000Z",
      "paymentMethod": "transfer",
      "date": "2016-03-31T13:15:12.342Z", //{Date} date of the payment
      "amount": {
        "exchange": {
          "value": 732.15,
          "currency": {
            "label": "Euro",
            "symbol": "€",
            "value": "EUR"
          }
        },
      }
    },
    {
      "paymentMethod": "transfer",
      "payment": 85,
      "amount": {
        "exchange": {
          "value": 4148.85,
          "currency": {
            "label": "Euro",
            "symbol": "€",
            "value": "EUR"
          }
        }
      }
    }
  ]

```

#### 3. Second payment received

```javascript
  "payStatus": [//{Object} payment status
    {
      "payment": 15,
      "nextPaymentDate": "2016-05-17T10:00:00.000Z",
      "paymentMethod": "transfer",
      "date": "2016-03-31T13:15:12.342Z", //{Date} date of the payment
      "amount": {
        "exchange": {
          "value": 732.15,
          "currency": {
            "label": "Euro",
            "symbol": "€",
            "value": "EUR"
          }
        },
      }
    },
    {
      "paymentMethod": "transfer",
      "payment": 85,
      "amount": {
        "exchange": {
          "value": 4148.85,
          "currency": {
            "label": "Euro",
            "symbol": "€",
            "value": "EUR"
          }
        }
      }
    }
  ]

```

----
## consideraciones

//TODO

# Seguro
//TODO
Al reservar se esta aceptando la política de cancelación
Al reservar se esta aceptando el rechazo al seguro
