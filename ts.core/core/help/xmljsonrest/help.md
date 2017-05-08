
# Traveler Sense API

## 1. Overview
This tutorial shows you how to:
- Authenticate/login into YTO system
- Setting authentication into your requests
- Search products and manage results
- Find products and your bookings
- Book a product

## 2. Types

### 2.1 input types
#### **searchRequest** :
return products from a searchRequest:
```javascript
{
    "countries": '', // {String} countrycode
    "date": "dd-MM-yyyy" // {String} format dd: day, MM: month, yyyy: year,
}
```
#### **findRequest**
```javascript
{
    datatype: '', //'product', 'booking', 'countries'
    code: '', // product or country code
    idbooking: '', // booking code
    idBookingExt: '' // your ID more info in bookRequest(#bookRequest)
}
```
#### <a name="bookRequest"> **bookRequest**
```javascript
{
    date: {
        "day": 31, // {Number} day [1-31] values
        "month": 4, // {Number} month  [0-11] values
        "year": 2016 // {Number} year
      },
    productCode: '', // {String}
    paxList: [],
    meetingdata: '', // {String} if you need to add information about meting with DMC
    affiliateobservations : '', // {String} Info to yourttoo admin
    affiliateuser: '', // {String} free use, (usually for agent name)
    idBookingExt : '' // {String} your booking code
}
```
###### 2.2 return types
**sessionObject** :
```javascript
{
	userid: '', //your user id in yourttoo system
	accesstoken: '' //the access token generated in the last login session
}
```
**searchResult** :
```javascript
{
	code: '',
	name: '',
	title: '',
	availability: [],
	itinerary: [],
    minprice: { value: ... }
	...
}
```
**product** :
```javascript
{
	code: '',
	name: '',
	title: '',
	availability: [],
	itinerary: [],
   minprice: { value: ... }
	...
}
```
#### 3. methods

##### 3.1 (auth service)

* **login**
check your credentials and returns a sessionObject
_url: http://tsapiserver/auth/login_

##### 3.2 (api service)

* **search**
return products from a searchRequest:
* **find**
return products from a findRequest:
* **book**
request a booking for specified product:

