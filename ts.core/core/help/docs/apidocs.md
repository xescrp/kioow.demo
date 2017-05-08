## Traveler Sense API
#### 1. Overview
This tutorial shows you how to:
Authenticate/login into YTO system
Setting authentication into your requests
Search products and manage results
Find products and your bookings
Book a product
#### 2. Types
###### 2.1 input types
searchRequest :
return products from a searchRequest:
{
    countries: [],
    cities: [],
    tags: [],
    date: 'dd-MM-yyyy' //string format dd: day, MM: month, yyyy: year,
    ...
}
findRequest
{
    datatype: '', //'product', 'booking'
    code: '', //if find a product
    idBooking : '' // if find booking
    ...
}
bookRequest
{
    date: '', //'product', 'booking', ... more??
    productCode: '', //??
    paxList: [], //??
    ...
}
###### 2.2 return types
sessionObject :
{
    userid: '', //your user id in yourttoo system
    accesstoken: '' //the access token generated in the last login session
}
searchResult :
{
    code: '',
    name: '',
    title: '',
    availability: [],
    itinerary: [],
    minprice: { value: ... }
    ...
}
product :
{
    code: '',
    name: '',
    title: '',
    availability: [],
    itinerary: [],
   minprice: { value: ... }
    ...
}
#### 3. methods
##### 3.1 (auth service)
login
check your credentials and returns a sessionObject
_url: http://tsapiserver/auth/login_
##### 3.2 (api service)
search
return products from a searchRequest:
find
return products from a findRequest:
book
request a booking for specified product:
