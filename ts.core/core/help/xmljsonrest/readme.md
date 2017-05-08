# Traveler Sense API

## Overview
This document explain you how to:
- [Authenticate into yourttoo system](#authenticate-into-yourttoo-system)
- [Setting authentication into your requests](#setting-authentication-into-your-requests)
- [Search products and manage results](#search-products-and-manage-results)
- [Find products and your bookings](#find-products-and-your-bookings)
- [Book a product](#book-a-product)

And describe implementation cases
- [Product Release](#product-release)
- [Payment Options](#payment-options)
- [Pax to Operate](#pax-to-operate)

#### Obs:
We use utf-8 encoding  
DMC: is an accronim of Destination Managment Company our provideers



---
## Authenticate into yourttoo system

### Auth service

login: check your credentials and returns a [Session Object](#session-object)

service url: https://tsapiserver/auth/login

`(*) required fields`
```javascript
{
	email: '', // (*) {String} your user email in yourttoo system
	password: '' // (*) {String} the password
}
```

### Session Object

```javascript
{
	userid: '', //{String} your user id in yourttoo system
	accesstoken: '' //{String} the access token generated in the last login session
}
```

---

## Setting authentication into your requests

// TODO

---

## Search products and manage results

The search product can be requested only by country and optionaly by date

### Get availables countries
service url: https://tsapiserver/auth/find

#### Countries Search Request Example:

```javascript
{
    datatype: 'countries' // (*) datatype to get
}
```

#### Countries Search Response:

You will receive an array with a list of available countries:

```javascript
[
  {
	slug: '', // {String} code for Search Products
	label_es: '', // {String} Country name in spanish
	label_en: '' //{String} Country name in english
  }
...
  { // ej:
    slug: 'es',
    label_es: 'España',
    label_en: 'Spain'
  },
  { // ej:
    slug: 'it',
    label_es: 'Italia',
    label_en: 'Italy'
  },
...
]
```

### Get available products

#### Request **search**

service url: https://tsapiserver/auth/search

Returned products in an array paginated **50 results** sorted by **price**

### Search Products Request Fields

`(*) required fields`
```javascript
{
    "country": "", // (*) {String} country.slug
    "date": "MM-yyyy", // {String} format MM: month, yyyy: year
    "lastcode" : "", // {String} params to get next page
    "prevcode" : "" // {String} params to get previous page
}
```
Example to get fist page for spain products:
```javascript
{
    "country": "es", // only products availables in spain
    "date": "05-2017" // only products availables in may 2017
}
```
Example to get second page for spain products:
```javascript
{
    "country": "es", // only products availables in spain
    "date": "05-2017" // only products availables in may 2017
    "lastcode" : "0000000145.OMT16112352" // param from first response
}
```


### Return Search Request Products
The Response is an array of a short version of products (50 results max)
```javascript
{
	totalItems: 150, // {Number} Total items in request search
	pages: 3, // {Number} Page quantity availables
	currentpage: 2, // {Number} Current Page in response
	items: [ // {Object} Array of short version of products
    {[see itemsearchType](itemsearchType.md)},
	   ... // see itemsearchType.md
    {}
	],
	lastcode: "0000001345.AR4222273", // {String} params to get next page
	prevcode: "0000000774.OMT17784681" // {String} param to get previous page
}
```
For more information [see itemsearchType](itemsearchType.md)

---

## Find products and your bookings

service url: https://tsapiserver/auth/find

### Find Product/s:

#### Products Request:
Example to get products

`(*) required fields`
```javascript
{
    datatype: 'product',// (*) {String} datatype to search
    codes: [  // (*) {Object} Array of products codes  (Max 50 codes)
      'OMT000001', // {String}
      ...,
      'OMT000050'
    ]
}
```
#### Products Response:
The Response is an array of a full version of products
```javascript
	[ // {Object} Array of full version of products
    {[see productType](productType.md)},
	   ... // see itemsearchType.md
    {}
	]
```
For more information see productType.md

### Find Bookings

#### Bookings Request:
Example to get bookings by idbooking (yourttoo booking code)

`(*) required fields`
```javascript
{
    datatype: 'booking',// (*) {String} datatype to search
    idbooking: [  // (*) {Object} Array of bookings codes
      '000399RY', // {String}
      ...,
      '000448RY' // (Max 50 codes)
    ]
}
```

Example to get bookings by idBookingExt (your booking code)

`(*) required fields`
```javascript
{
    datatype: 'booking',// (*) {String} datatype to search
    idBookingExt: [ // (*) {Object} Array of your ID more info in bookRequest(#bookRequest)
      'RJ41A00', // {String}
      ...
      'RJ41A50' //(Max 50 codes)
    ]
}
```

#### Bookings Find Response:
The Response is an array of bookings
```javascript
	[ // {Object} Array of full version of products
    {//see bookingType.md},
	   ...
    {}
	]
```
For more information see [bookingType.md](bookingType.md)


---

## Book a product

### Booking request

`(*) required fields`
```javascript
{
    date: {
        "day": 31, // (*) {Number} day [1-31] values
        "month": 4, // (*) {Number} month  [0-11] values
        "year": 2016 // (*) {Number} year [yyyy]
      },
    productCode: 'ES112258', // (*) {String} product code to book
    product: {...}, // (*) {Object} full product Object
    roomDistribution : [ // (*) {Object} Array of Rooms
      {
          roomCode : "triple", // (*) {String} 3 posibilities: ['single', 'double', 'triple']
          paxList : [
              { //Pax 1 in a single, double and triple room
                  name : "", // (*) {String} First Name Pax
                  lastName : "", // (*) {String} Last Name Pax
                  birdthDate : "" // (*) {String} format dd: day, MM: month, yyyy: year
                  documentType : "", // (*) {String} 3 posibilities: ['dni/nif', 'nie', 'passport']
                  documentNumber : "", // (*) {String} Document Number
                  holder : true, // (*) {Boolean} Holder of the booking only one in a booking
                  country : { // (*) nationality of passanger can get full list from  http://www.yourttoo.com/data/nationalities.json
                    countrycode: ""// (*) {String} two leters country code
                  }
              },
              { // Pax 2 in a double and triple room. Example:
                  name : "Juan",
                  lastName : "Gomez",
                  birdthDate : "21-05-1985",
                  documentType : "dni/nif",
                  documentNumber : "3333333L",
                  holder : false,
                  country : {
                      countrycode : "ES"
                  }
              },
              { // Pax 3 in a triple room. Example:
                  name : "Isabella",
                  lastName : "Conti",
                  birdthDate : "18-03-1985",
                  documentType : "passport",
                  documentNumber : "A4993939",
                  holder : false,
                  country : {
                      countrycode : "IT"
                  }
              }
          ]
      }
    ],
    meetingdata: '', // {String} if you need to add information about meting with DMC
    affiliateobservations : '', // {String} Info or comments to yourttoo.com admin
    affiliateuser: '', // {String} free use, (usually for agent name)
    idBookingExt : '', // {String} your booking code
    fractionated : false // {Boolean} if you want fractionated payment See [Payment Options](#payment)
}
```


### Booking response

#### **Booking OK**: http response 200

```javascript
  {see bookingType.md}
```


#### **Booking Error**: http response 500

Description comes http headers

Examples:
- "Booking out of release margin"
: you must to book in a valid availability date, starting adding release days to actual date.
: See [Product Release](#product-release)
- "Booking whit fractionated payment it is not possible"
: you are trying to book with fractionated payment when not are available
: See [Payment Options](#payment-options)

---

## Product Release

The products have a margin to close sales called "Release". If you want to book a product you must to consider this parameter to show availables dates.

### How to calculate min available date to book

The release is a direct sum to actual date plus release days in availability calendar of the product.

#### Example:
If today is 21 may 2017 and de product have release of 7 days:
```javascript
// Full Product object
{
	"code": "ES112258",
	"title": "Magic Morocco",
	 "title_es": "Mágico Marruecos",
	 ...
	 "release": 7, // release in days
	 ...
}
```

**You first available date will be 28 may 2017**

---

## Payment Options

### Fractionated Payment

If you want book a product with fractionated payment, you must to make a book in available dates.

We are transparent in the payments policies. In products you can see the DMC payments options:

```javascript
// Full Product object
{
  "code": "ES112258",
	"title": "Magic Morocco",
	"title_es": "Mágico Marruecos",
  "dmccode": "ES11",
  "dmc": {
	    "name": "Dmc Test Ltd",
			...
	    "paymentoption": { // payment options
	      "_en": "28 days before the trip",
	      "_es": "28 días antes del viaje",
	      "slug": "28before"
	    }
  },
	...
}
```

#### Example:

To know if the date selected in the product is available to a "Fractionated Payment" you can use this function in javascript:

```javascript
	// @param  dateSelected {Date} the date to want to book
	// @param product {Object} full product object
	function canBookfractionatedPayment(dateSelected, product){
		var dateSelected = dateSelected; // date selected to book
		dateSelected.setHours(0,0,0,0);
		var dateActual = new Date(); // actual date
		dateActual.setHours(0,0,0,0);
		var restDays = 30; // by default 30 days is the min margin
		switch(product.dmc.membership.paymentoption.slug) { // please check [DMC payment options](#dmcpaymentoptions)
				case '28before':
						restDays: 28+7;
				case '21before':
						restDays: 21+7;
				case '14before':
						restDays: 14+7;
				case '7before':
						restDays: 7+7;
				case 'arrival':
						restDays: 7;
				case 'departure':
						restDays: 7;
						default:
						restDays: 30;
		}
		// we need 7 days to complete payments to DMCs
		var datePayEnd = new Date(dateSelected);
		datePayEnd.getDate() - restDays;

		if (datePayEnd > dateActual){
			return true; // you can send bookRequest whit param fractionated : true
		} else {
			return false; // you must send bookRequest whit param fractionated : false
		}
	}

```

### DMC payment options

You can find full list available payment option for DMCs in
http://yourttoo.com/statics/getstaticcontent?contentkey=paymentoptions

```javascript
[
  {
    "slug": "28before",
    "_en": "28 days before the trip",
    "_es": "28 días antes del viaje"
  },
  {
    "slug": "21before",
    "_en": "21 days before the trip",
    "_es": "21 días antes del viaje"
  },
  {
    "slug": "14before",
    "_en": "14 days before the trip",
    "_es": "14 días antes del viaje"
  },
  {
    "slug": "7before",
    "_en": "7 days before the trip",
    "_es": "7 días antes del viaje"
  },
  {
    "slug": "arrival",
    "_en": "Arrival date",
    "_es": "Día de llegada del cliente a destino"
  },
  {
    "slug": "departure",
    "_en": "Last day of the trip",
    "_es": "Día de vuelta del cliente del destino"
  }
]
```

---

## Min pax to operate

//TODO


---

## Final considerations

We are in constantly update of this API if you want to know the new releases and updates please subscribe to our mailing list.
Please send your feedback to develop@yourttoo.com

Thanks,
