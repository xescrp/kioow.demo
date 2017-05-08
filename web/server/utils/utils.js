
    // ========== INIT GENERAL USE ===========
    // Get Json File from Server
var fs = require("fs"),
    json;
var _ = require('underscore');
var nconf = require('nconf');
var filepaths = require('../routes/diskfilepaths').filepaths;

nconf.env().file({ file: filepaths.configurationfile });

var readJsonFileSync = exports.readJsonFileSync = function (filepath, encoding) {
    if (typeof (encoding) == 'undefined') {
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
};

var getJson = exports.getJson = function (file) {
    var filepath = file;
    return readJsonFileSync(filepath);
};

var writeJson = exports.writeJson = function (file, jsondata, callback) {
    callback != null ?
        fs.writeFile(file, JSON.stringify(jsondata, null, '\n'), function (err) {
            callback((err == null));
        }) :
        fs.writeFileSync(file, JSON.stringify(jsondata, null, '\n'));  
};

// Removes Duplicates
var _arrayUnique = exports._arrayUnique = function (a) {
    return a.reduce(function (p, c) {
        if (p.indexOf(c) < 0) p.push(c);
        return p;
    }, []);
};
// get elements of array count and remove duplicate
var _arrayUniqueQuant = exports._arrayUniqueQuant = function (arr) {
        var arrTemp = [];
        var arrCcode = [];
        var arrReturn = [];
        
        for (var i = arr.length - 1; i >= 0; i--) {
            arrCcode.push(arr[i].countrycode);
        }

        function getCountry(element){
            for (var i = arr.length - 1; i >= 0; i--) {
                if (element == arr[i].countrycode){
                    return arr[i].country
                }
            }
        }

        function getIndex(element){
            var indices = [];
            var array = arrCcode;
            var element = element;
            var idx = array.indexOf(element);
            while (idx != -1) {
              indices.push(idx);
              idx = array.indexOf(element, idx + 1);
            }
            var quantity = indices.length;
            return quantity
        }

        arrTemp = arrCcode.reduce(function (p, c) {
            if (p.indexOf(c) < 0) p.push(c);
            return p;
        }, []);

        for (var i = arrTemp.length - 1; i >= 0; i--) {
            var dummy = {
                country: getCountry(arrTemp[i]),
                countrycode: arrTemp[i],
                quantity : getIndex(arrTemp[i])
            }
            arrReturn.push(dummy);
        }

        function compare(a,b) {
          if (a.country < b.country)
             return -1;
          if (a.country > b.country)
            return 1;
          return 0;
        }

        arrReturn.sort(compare);

        return arrReturn
};

var getBytes = exports.getBytes = function (str) {
    var bytes = [];
    for (var i = 0; i < str.length; ++i) {
        charCode = str.charCodeAt(i);
        bytes.push(charCode);
    }
    return bytes;
};

var comparepriceproducts = exports.comparepriceproducts = function (a, b) {
    var ct = 0;
    if (a.pvp != null && b.pvp != null) {
        var c = a.pvp.b2b || a.pvp.b2c;
        var d = b.pvp.b2b || b.pvp.b2c;
        ct = c < d ? -1 : ct;
        ct = c > d ? 1 : ct;
    }
    return ct;
};

var apicall = exports.apicall = function (apicommand, apirequest, session, ytoconnector, req) {
    var request = apirequest;
    var command = apicommand;

    request.environment = 'yourttoo';
    request.oncompleteeventkey = command + '.done';
    request.onerroreventkey = command + '.error';

    var rqCMD = {
        command: command,
        request: request,
        service: 'core',
        currentcurrency: req.session.currentcurrency || 'EUR'
    };
    session == null ? session = req.omtsession : null;
    if (session != null && session.ytologin != null) {
        var auth = {
            userid: session.ytologin.user._id,
            accessToken: session.ytologin.accessToken
        };
        rqCMD.auth = auth;
    }

    var rq = ytoconnector.send(rqCMD);
    //trace...
    rq.on(request.oncompleteeventkey, function (result) {
        console.log('api rq -> done');
    });
    rq.on(request.onerroreventkey, function (err) {
        console.error('api rq -> error');
    });
    rq.on('api.error', function (err) {
        console.error(err);
    });
    rq.on('api.timeout', function (tout) {
        console.error(tout);
    });
    return rq;
}

var _getOperationCountries = exports._getOperationCountries = function (dmclist) {
    var opCountries = [];
        for (var j = 0; j < dmclist.length ; j++) {
            var tempArray = [];
            for (var k = 0, len = dmclist[j].company.operatein.length; k < len ; k++) {               
                var dummy = {};
                dummy.country = dmclist[j].company.operatein[k].operateLocation.country;
                dummy.countrycode = dmclist[j].company.operatein[k].operateLocation.countrycode;
                dummy.quantity = 1;
                if (tempArray.indexOf(dummy.countrycode) < 0){
                    tempArray.push(dummy.countrycode);
                    opCountries.push(dummy);
                }
            }
        }
    return _arrayUniqueQuant(opCountries);
};

/// get status from DMC list

var _getFiltersDMCs = exports._getFiltersDMCs = function (dmclist) {
    var filterStatus = {
        valid : 0,
        confirmed : 0,
        waiting : 0
    };
    var filterChannels = {
        b2cchannel : 0,
        b2bchannel : 0
    };
    var filterSegment = {
        toursmultidays : 0,
        groups : 0,
        tailormade : 0
    }

    for (var j = 0, len = dmclist.length; j < len; j++) {

        // status
        if (dmclist[j].membership.registervalid){
            if (dmclist[j].membership.publicprofilecomplete &&
                 dmclist[j].membership.companyimagescomplete &&
                 dmclist[j].membership.companycomplete && 
                 dmclist[j].membership.paymentcomplete && 
                 dmclist[j].membership.companytaxid && 
                 dmclist[j].membership.emergencycomplete){
                filterStatus.valid++
            } else {
                filterStatus.confirmed++
            }
        } else{
            filterStatus.waiting++
        }
        
        if (dmclist[j].membership.toursmultidays){
            filterSegment.toursmultidays++
        }
        if (dmclist[j].membership.tailormade){
            filterSegment.tailormade++
        }
        if (dmclist[j].membership.groups){
            filterSegment.groups++
        }

        if (dmclist[j].membership.b2bchannel){
            filterChannels.b2bchannel++
        }
        if (dmclist[j].membership.b2cchannel){
            filterChannels.b2cchannel++
        }
        
    }
    return {
        filterStatus : filterStatus,
        filterChannels : filterChannels,
        filterSegment : filterSegment
    }
};

var guidGenerate = exports.guidGenerate = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Get Content for Api
var _resthttp = require('./httpclient');

var headers = exports.headers = {
    'Accept': 'application/json',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'es-ES,es;q=0.8,en;q=0.6,fr;q=0.4',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
};

var http = new _resthttp.HTTPClient();

var api = nconf.get('apiurl');                          //"http://openmarketdev.cloudapp.net:3000";
var rooturl = nconf.get('rooturl');                     //"http://openmarket.travel";
var facebookAppId = nconf.get('facebookAppId');         //"665947060113825";
//Export vars...
module.exports.http = http;
module.exports.api = api;
module.exports.rooturl = rooturl;
module.exports.facebookAppId = facebookAppId;

    //HTTP GET
var APIGet = exports.APIGet = function (url, query, headers, callback) {
    var _http = new _resthttp.HTTPClient();

    console.log('requesting...' + url);
    console.log(query);

    _http.Get(url, query, headers, callback);

}

// Get Unique Cities from Itinerary
var _showCities = exports._showCities = function (itinerary) {
    var cities = [];
    var day = "";
    if (itinerary) {
        var lastsleep = null;
        for (day in itinerary) {
            itinerary[day].departurecity = lastsleep;
            if (itinerary[day].departurecity != null && itinerary[day].departurecity.city != '') {
                
                var c = '';
                if (itinerary[day].departurecity.city_es != null && itinerary[day].departurecity.city_es != ''){
                    c = itinerary[day].departurecity.city_es;
                } else {
                    c = itinerary[day].departurecity.city;
                }
                cities.push(c);
            }

            if (itinerary[day].sleepcity != null && itinerary[day].sleepcity.city != '') {
                var c = '';
                if (itinerary[day].sleepcity.city_es != null && itinerary[day].sleepcity.city_es != ''){
                    c = itinerary[day].sleepcity.city_es;
                 } else {
                    c = itinerary[day].sleepcity.city;
                }
                if (cities.indexOf(c) == -1) {
                    cities.push(c);
                }
                lastsleep = itinerary[day].sleepcity;
            }
        }
        for (day in itinerary) {
               if (itinerary[day].stopcities != null && itinerary[day].stopcities.length > 0) {
                    for (var j = 0, len = itinerary[day].stopcities.length; j < len; j++) {

                        var cit = itinerary[day].stopcities[j];
                        var c = '';

                        if  (cit.city_es != null && cit.city_es != ''){
                            c = cit.city_es;
                        } else {
                            c = cit.city
                        }

                        if (cities.indexOf(c) == -1) {
                            cities.push(c);
                        }
                    }
                }
        }
        return _arrayUnique(cities);
    }
};

var _CitiesandCountriesObj = exports._CitiesandCountriesObj = function (itinerary) {
    var cities = [];
    var day = "";
    if (itinerary) {

        for (day in itinerary) {

            if (itinerary[day].departurecity != null && itinerary[day].departurecity.city != '') {
                var c = itinerary[day].departurecity.city;
                
                if (c !=""){
                    // console.log("depart "+c+" "+itinerary[day].departurecity.location.countrycode)
                    var dummy = { city : c, countrycode : itinerary[day].departurecity.location.countrycode };
                    cities.push(dummy);
                }
            }

            if (itinerary[day].stopcities != null && itinerary[day].stopcities.length > 0) {
                for (var j = 0, len = itinerary[day].stopcities.length; j < len; j++) {
                    var cit = itinerary[day].stopcities[j];
                    var c = cit.city;   
                    
                    if (cities.indexOf(c) == -1) {
                        if (c !=""){
                            // console.log("stop "+c+" "+cit.location.countrycode)
                            var dummy = { city : c, countrycode : cit.location.countrycode };
                            cities.push(dummy);
                        }
                    }
                }
            }

            if (itinerary[day].sleepcity != null && itinerary[day].sleepcity.city != '') {
                var c = itinerary[day].sleepcity.city;

                if (cities.indexOf(c) == -1) {
                    // console.log("sleep "+c+" "+itinerary[day].sleepcity.location.countrycode)
                    if (c !=""){
                        var dummy = { city : c, countrycode : itinerary[day].sleepcity.location.countrycode };
                        cities.push(dummy);
                    }
                }
            }
        }
           
        var arr = {};

        for ( var i=0, len = cities.length; i < len; i++ )
            arr[cities[i]['city']] = cities[i];

        cities = new Array();
        for ( var key in arr )
            cities.push(arr[key]);

        //return _arrayUnique(cities);
        return cities;
    }
};

// Get Country codes from itinerary
var _getCountryCodes = exports._getCountryCodes = function (itinerary) {
    var countriesCodes = [];
    var day = "";
    if (itinerary) {

        for (day in itinerary) {

            if (itinerary[day].departurecity != null && itinerary[day].departurecity.country.length > 2) {
                var c = itinerary[day].departurecity.location.countrycode;
                countriesCodes.push(c);
            }

            if (itinerary[day].stopcities != null && itinerary[day].stopcities.length > 0) {
                for (var j = 0, len = itinerary[day].stopcities.length; j < len; j++) {
                    if (itinerary[day].stopcities[j].country.length > 2) {
                        var cou = itinerary[day].stopcities[j];
                        var c = cou.location.countrycode;

                        if (countriesCodes.indexOf(c) == -1) {
                            countriesCodes.push(c);
                        }
                    }
                }
            }

            if (itinerary[day].sleepcity != null && itinerary[day].sleepcity.country.length > 2) {
                var c = itinerary[day].sleepcity.location.countrycode;

                if (countriesCodes.indexOf(c) == -1) {
                    countriesCodes.push(c);
                }
            }
        }
        return _arrayUnique(countriesCodes);
    }
};
// Get Unique countries from itinerary
var _showCountries = exports._showCountries = function (itinerary) {
    var countries = [];
    var day = "";
    if (itinerary) {

        for (day in itinerary) {

            if (itinerary[day].departurecity != null && itinerary[day].departurecity.country.length > 2) {
                var c = itinerary[day].departurecity.country;
                countries.push(c);
            }

            if (itinerary[day].stopcities != null && itinerary[day].stopcities.length > 0) {
                for (var j = 0, len = itinerary[day].stopcities.length; j < len; j++) {
                    if (itinerary[day].stopcities[j].country.length > 2) {
                        var cou = itinerary[day].stopcities[j];
                        var c = cou.country;

                        if (countries.indexOf(c) == -1) {
                            countries.push(c);
                        }
                    }
                }
            }

            if (itinerary[day].sleepcity != null && itinerary[day].sleepcity.country.length > 2) {
                var c = itinerary[day].sleepcity.country;

                if (countries.indexOf(c) == -1) {
                    countries.push(c);
                }
            }
        }
        return _arrayUnique(countries);
    }
};

var _showCountriesEspanol = exports._showCountriesEspanol = function (req, product, callback) {

    var countrycodes = _getCountryCodes(product.itinerary);
    //.toLowerCase()
    console.log('countrycodes ', countrycodes);

    function toLower(element, index, array) {
        array[index] = array[index].toLowerCase();
    }
    countrycodes.forEach(toLower);

    console.log('countrycodes ', countrycodes);
    var auth = null;
    // if (req.session !== null && req.session.login !== null) {
    //     auth = {
    //         userid: req.session.login.user._id,
    //         accessToken: req.session.login.accessToken
    //     };
    // }
    var countryrequest = {
        command: 'find',
        service: 'core',
        request: {
            query: { slug: { $in: countrycodes } },
            fields: 'slug label_es label_en',
            collectionname: 'Countries',
            oncompleteeventkey: 'find.done',
            onerroreventkey: 'find.error'
        },
        auth: auth
    };

    var rqCountry = req.ytoconnector.send(countryrequest);

    rqCountry.on(countryrequest.request.oncompleteeventkey, function (countrys) {
        console.log(countrys);
        //emitter.emit('countrys.done', countrys);
        callback(countrys, null, product);
    });
    rqCountry.on(countryrequest.request.onerroreventkey, function (err) {
        //emitter.emit('country.error', err);
        console.log('err ', err);
        callback(null, err, product);
    });
    rqCountry.on('api.error', function (err) {
        //emitter.emit('country.error', err);
        console.log('err ', err);
        callback(null, err, product);

    });
    rqCountry.on('api.timeout', function (tout) {
        //emitter.emit('country.error', tout);
        console.log('err ', err);
        callback(null, err, product);
    });

    // return countries;
};
// get unique cities
var _cityReducer = exports._cityReducer = function(cities, number){
      reducedCities = {
        cities: [],
        numberRest: 0
      };
      if (cities != null && cities.length > number) {
        for (i = 0; i <= number; i++) {
          reducedCities.cities.push(cities[i]);
        };
        reducedCities.numberRest = cities.length - number;
        return reducedCities;
      }
      else {
        return cities;
      }
    }
    
var _cityReducerHome = exports._cityReducerHome = function(cities, number){
      reducedCities = {
        cities: [],
        numberRest: 0
      };
      if (cities != null && cities.length > number) {
        for (i = 0; i <= number; i++) {
          reducedCities.cities.push(cities[i]);
        };
        reducedCities.numberRest = cities.length - number;
        return reducedCities;
      }
      else {
        reducedCities = {
            cities: cities,
            numberRest: 0
        };
        return reducedCities;
      }
    }

// get markers for google maps
var _getMarkers = exports._getMarkers = function(itinerary) {
    var markers = [];
    var cities = [];
    if (itinerary) {
      for (day in itinerary) {
        // debo obtener la ciudad donde se duerme o en el ultimo dia la departure

          if (itinerary[day].sleepcity != null && itinerary[day].sleepcity.city != '') {
                 var c = '';
                 if (itinerary[day].sleepcity.city_es != '' && itinerary[day].sleepcity.city_es != null){
                    c = itinerary[day].sleepcity.city_es;
                 } else{
                    c = itinerary[day].sleepcity.city;
                 }
                 if (cities.indexOf(c) == -1) {
                    cities.push(c);
                    if (itinerary[day].sleepcity.location.latitude){
                        var markerdummy = {
                          city : c,
                          nights : 1,
                          country : itinerary[day].sleepcity.location.country,
                          position : {
                            lat: itinerary[day].sleepcity.location.latitude,
                            lng: itinerary[day].sleepcity.location.longitude
                            }
                        };
                        markers.push(markerdummy);
                    }
                 }else{
                    if (itinerary[day].sleepcity.location.latitude){
                        var position = cities.indexOf(c)
                        markers[position].nights = markers[position].nights+1;
                    }
                 }
             }
      }
    };
    return markers
}

    // Get unique hotel categories from itinerary
var _showHotelCats = exports._showHotelCats = function (itinerary, lang) {
    var cats = [];
    var day = "";
    if (itinerary) {
        for (day in itinerary) {
            if (itinerary[day].hotel != null && itinerary[day].hotel.category != '') {
                var c = itinerary[day].hotel.category;
                cats.push(c);
            }
        }
        cats =  _arrayUnique(cats);
    }
    if (lang == '_es'){

        for (var i = cats.length - 1; i >= 0; i--) {
            if (cats[i] == 'unclassified *'){
                cats[i] = 'sin categorizar';
                console.log("cats[i]", cats[i]);
            }
        };
    }
    return cats
};

    // Get array of tags's label
var _showTags = exports._showTags = function (tags) {
    var finaltags = [];

    for (tag in tags) {
        if (tag != null){
            var c = tag.label;
            finaltags.push(c);
        }
    }
    return finaltags;
};

//funcion que devuelve las tags partiendo de un array de tags
var _showTagsArrayPublished = exports._showTagsArrayPublished = function (tags) {
    var finaltags = [];
    console.log("\n\n triptags: ", tags);
    for (var i = 0, len = tags.length; i < len; i++) {
        if (tags[i] != null && tags[i].state == 'published') {
            finaltags.push(tags[i].label);
        }
    }
    return finaltags;
};


// funcion que devuelve las tags partiendo de un array de tags
var _showTagsArray = exports._showTagsArray = function (tags) {
    var finaltags = [];    
    
	for( var i=0, len = tags.length; i < len; i++){
		if(tags[i]!=null){
			finaltags.push(tags[i].label);
		}
	}	
	return finaltags;
}



/**
 * funcion que devuelve el total de pax de la reserva con el formato:
 * they are 2 pax: 2 adults
 */
var _showDistribution = exports._showDistribution = function (roomDistribution) {
	
	
	var totalPax = 0;
	var numAdult = 0;
	var numChild = 0;
	var numBaby = 0;
	var numRoom = 0;
	for(var it=0, len = roomDistribution.length; it < len; it++){
		numRoom++;
		for(var p=0, lenn = roomDistribution[it].paxList.length; p < lenn; p++){
			totalPax++;
			if(roomDistribution[it].paxList[p].typePax!=null){
				if(roomDistribution[it].paxList[p].typePax=="adult"){
					numAdult++;							
				}
				if(roomDistribution[it].paxList[p].typePax=="child"){
					numChild++;
				}
				if(roomDistribution[it].paxList[p].typePax=="baby"){
					numBaby++;
				}
			}
		}
	}
	
	var result = totalPax+" pasajeros: "+numRoom+" Hab. "+numAdult+" Adultos ";
	if(numChild>0){
		if(numChild>1){
			result+= numChild+" niños ";
		}
		else{
			result+= numChild+" niño ";	
		}		
	}
	
	if(numBaby>0){
		if(numBaby>1){
			result+= numBaby+" bebes ";
		}
		else{
			result+= numBaby+" bebe ";	
		}		
	}		
	
	return result;
}



    // Get meals from product
var _mealsIncluded = exports._mealsIncluded = function (itinerary) {
    var breakfastcount = 0;
    var lunchcount = 0;
    var dinnercount = 0;
    var html = '';
    if (itinerary && itinerary.length > 0) {
        for (var i = 0, len = itinerary.length; i < len; i++) {
            var it = itinerary[i];

            if (it.hotel.breakfast) {
                breakfastcount++;
            }
            if (it.hotel.lunch) {
                lunchcount++;
            }
            if (it.hotel.dinner) {
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


var _drinksincluded = exports._drinksincluded = function(itinerary) {
    var ok = false;
    if (itinerary && itinerary.length > 0) {
        for (var i = 0, len = itinerary.length; i < len; i++) {
            if (itinerary[i].lunchdrinks | itinerary[i].dinnerdrinks) {
                ok = true;
            };
        };
    };
    return ok;
};


// Get min price from product
var _dateConvert = exports._dateConvert = function (ddmmyyyy) {
    var m = ddmmyyyy.match(/(\d{1,2})([\.\-\|\/])(\d{1,2})([\.\-\|\/])(\d{4})/);
    if (m != null) {
        return new Date(m[5] + "/" + m[3] + "/" + m[1]);
    } else {
        return false
    }
}


var _indexOfYear = exports._indexOfYear = function(year, availability) {
    var index = -1;
    if (availability != null && availability.length > 0) {
        for (var i = 0; i < availability.length; i++) {
            if (availability[i].year == year) {
                index = i;
                break;
            }
        }
    }
    return index;
}

var _getMonthNameEnglish = exports._getMonthNameEnglish = function(monthindex) {
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
var _getMonthNameSpanish = exports._getMonthNameSpanish = function(monthindex) {
    if (monthindex == 0) { return 'Enero'; }
    if (monthindex == 1) { return 'Febrero'; }
    if (monthindex == 2) { return 'Marzo'; }
    if (monthindex == 3) { return 'Abril'; }
    if (monthindex == 4) { return 'Mayo'; }
    if (monthindex == 5) { return 'Junio'; }
    if (monthindex == 6) { return 'Julio'; }
    if (monthindex == 7) { return 'Agosto'; }
    if (monthindex == 8) { return 'Septiembre'; }
    if (monthindex == 9) { return 'Octubre'; }
    if (monthindex == 10) { return 'Noviembre'; }
    if (monthindex == 11) { return 'Diciembre'; }
}
var _getMonthNumberEnglish = exports._getMonthNumberEnglish = function(monthname) {
    if (monthname == 'January')   { return '01'; }
    if (monthname == 'February')  { return '02'; }
    if (monthname == 'March')     { return '03'; }
    if (monthname == 'April')     { return '04'; }
    if (monthname == 'May')       { return '05'; }
    if (monthname == 'June')      { return '06'; }
    if (monthname == 'July')      { return '07'; }
    if (monthname == 'August')    { return '08'; }
    if (monthname == 'September') { return '09'; }
    if (monthname == 'October')   { return '10'; }
    if (monthname == 'November')  { return '11'; }
    if (monthname == 'December')  { return '12'; }
}

var _calculatePriceMinimumDates = exports._calculatePriceMinimumDates = function(from, to, availability) {
    var pricemin = {
        value: 0,
        currency: {}
    }

    if (availability == null || availability.length == 0) {
        return pricemin;
    }

    var monthstart = from.getMonth();
    var monthend = to.getMonth();
    var iterate = new Date(from.getFullYear(), from.getMonth(), 1);

    while (iterate <= to) {

        var indexyear = _indexOfYear(iterate.getFullYear(), availability);

        if (indexyear > -1) {
            var month = _getMonthNameEnglish(iterate.getMonth());
            if (availability[indexyear] != null) {
                var avails = availability[indexyear][month].availability;
                if (avails != null && avails.length > 0) {
                    for (var jj = 0, len = avails.length; jj < len; jj++) {

                        if (avails[jj].rooms.double.price > 0) {
                            if (pricemin.value == 0) {
                                pricemin.value = avails[jj].rooms.double.price;
                                pricemin.currency = avails[jj].rooms.currency;
                            }
                            else {
                                if (avails[jj].rooms.double.price < pricemin) {
                                    pricemin.value = avails[jj].rooms.double.price;
                                    pricemin.currency = avails[jj].rooms.currency;
                                }
                            }
                        }
                    }
                }
            }
        }
        iterate.setMonth(iterate.getMonth() + 1);
    }
    return pricemin;
}


    // Get price per day 
var _calculateDayPrice = exports._calculateDayPrice = function (priceValue, priceCurrency, itinerary) {
    var dayPrice = {
        value: 0,
        currency: ""
    };

    dayPrice.value = Math.round(priceValue / itinerary.length);
    dayPrice.currency = priceCurrency;
    return dayPrice
};

    // Splitter
var _listdivider = exports._listdivider = function (source, splitnum) {
    // source must be an array
    var splitResponse = {
        first: [],
        rest: []
    }
    for (i = 0, len = source.length; i < len ; i++) {
        if (i < splitnum) {
            splitResponse.first.push(source[i]);
        } else {
            splitResponse.rest.push(source[i]);
        };
    };
    return splitResponse;
};

//generates months
var _printfromcurrentdate = exports._printfromcurrentdate = function () {
    var months = new Array("January", "February", "March",
    "April", "May", "June", "July", "August", "September",
    "October", "November", "December");

    var current = new Date();
    var end = new Date(current.getFullYear() + 1, current.getMonth() +6, 1);
    var iterator = new Date(current.getFullYear(), current.getMonth(), 1);
    var filterMonths = [];
    while (iterator <= end) {
        var thedate = (_getMonthNameSpanish[iterator.getMonth()] + ' ' + iterator.getFullYear());
        filterMonths.push(thedate);
        iterator.setMonth(iterator.getMonth() + 1);
    }
    return filterMonths;
};

// filter months generic (all months)
var _monthsfromcurrentdate = exports._monthsfromcurrentdate = function () {
    var months = new Array("January", "February", "March",
    "April", "May", "June", "July", "August", "September",
    "October", "November", "December");

    var current = new Date();
    var end = new Date(current.getFullYear() + 1, current.getMonth() +6, 1);
    var iterator = new Date(current.getFullYear(), current.getMonth(), 1);
    var filterMonths = [];
    while (iterator <= end) {
        var dateFilter = new Date(iterator);
        var dd = dateFilter.getDate();
        var mm = dateFilter.getMonth()+1; //January is 0!
        var yyyy = dateFilter.getFullYear();
        if(dd<10){
            dd='0'+dd
        } 
        if(mm<10){
            mm='0'+mm
        } 
        var dateFilter = dd+'-'+mm+'-'+yyyy;
        //
        var dummy = {
            label_en : (_getMonthNameEnglish(iterator.getMonth()) + ' ' + iterator.getFullYear()),
            label_es : (_getMonthNameSpanish(iterator.getMonth()) + ' ' + iterator.getFullYear()),
            value : dateFilter
            };
        filterMonths.push(dummy);
        iterator.setMonth(iterator.getMonth() + 1);
    }
    return filterMonths;
};



function _parse_uri(str) {
    var parseUri = { options: {} };
    parseUri.options = {
        strictMode: false,
        key: ["source", "protocol", "authority", "userInfo", "user",
            "password", "host", "port", "relative", "path", "directory",
            "file", "query", "anchor"],
        q: {
            name: "queryKey",
            parser: /(?:^|&)([^&=]*)=?([^&]*)/g
        },
        parser: {
            strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
            loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
        }
    };

    var o = parseUri.options,
        m = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
        uri = {},
        i = 14;

    while (i--) uri[o.key[i]] = m[i] || "";

    uri[o.q.name] = {};
    uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
        if ($1) uri[o.q.name][$1] = $2;
    });

    return uri;
};


var _substring = exports._substring = function (string, first, last) {
    var newcut="";
    if (typeof string === 'string') {var stringok = true;}
    if (typeof first === 'number') {var firstok = true;}
    if (typeof last === 'number') {var lastok = true;}
    if (stringok && firstok && lastok) {
        newcut = string.substring(first, last);
    }
    return newcut;
}


//add dots to numbers
var _addNumSeps = exports._addNumSeps = function(nStr) {
    var sep = '.';
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + sep + '$2');
    }
    return x1 + x2;
};

//latinize characters
var _accentsTidy = exports._accentsTidy = function (s) {
    var r = s.toLowerCase();
    r = r.replace(new RegExp("[àáâãäå]", 'g'), "a");
    r = r.replace(new RegExp("æ", 'g'), "ae");
    r = r.replace(new RegExp("ç", 'g'), "c");
    r = r.replace(new RegExp("[èéêë]", 'g'), "e");
    r = r.replace(new RegExp("[ìíîï]", 'g'), "i");
    r = r.replace(new RegExp("ñ", 'g'), "n");
    r = r.replace(new RegExp("[òóôõö]", 'g'), "o");
    r = r.replace(new RegExp("œ", 'g'), "oe");
    r = r.replace(new RegExp("[ùúûü]", 'g'), "u");
    r = r.replace(new RegExp("[ýÿ]", 'g'), "y");
    return r;
};

//breadcrumb
var _bcInit = exports._bcInit = function (req,  callbackinit) {

        var bc = [
            { url: "/", label: "openmarket.travel" },
            { url: "/viajes", label: "Viajes" }
        ] 

        //we define empty object to check if everything was loaded
        var breadcheck = {
            country: {
                finished: false,
                data: null
            },
            tag: {
                finished: false,
                data: null
            },
            city: {
                finished: false,
                data: null
            }
        }

            // we define and set from query country slug
            var countrycodestr="";
            if(req.param('country') != undefined) {
                var arrcountry = req.param('country').split(",");
                countrycodestr = arrcountry[0];
            }
            // we define and set from query tag slug
            var tagsstr=""
            if (req.param('tags') != undefined) {
                    var arrtags = req.param('tags').split(",");
                    tagsstr = arrtags[0];
            }
            // we define and set from query firstcity
            var citystr=""
            if (req.param('cities')) {
                //var arrcities = req.param('cities').split(",");
                //citystr = arrcities[0];    
                citystr= req.param('cities');
            };

            // COUNTRY get from cms
            var getpushCountry = function(callback){
                // http://test.openmarket.travel:3000/cms/getCountryByCountryCode?countrycode=AR

                if (req.param('country') != undefined) {
                    var url = api + '/cms/getCountryByCountryCode';
                    var data = { countrycode: countrycodestr.toLowerCase()};
                    var countrycrumb = null;

                    http.Get(url, data, headers, function (results) {
                        if (results == null) {
                            console.log("No country found");
                        } else {
                            if (results != null && results.responseBody != null) {
                                results = JSON.parse(results.responseBody);
                                var cclbl = results.title_es;
                                countrycrumb = { url: "/viajes?country="+countrycodestr, label: cclbl };
                            }
                        }
                        callback(countrycrumb);
                    });
                } else {
                    callback(null);
                }  
            }


            // TAG get from cmstriptagscache
            var getpushTag = function(callback){
                if (req.param('tags') != undefined) {
                    //we define wholefirsttag
                    var wholefirsttag = {};
                        // we find specific tag
                        req.omtcache.methods.recover('CMSTripTagsCACHE', function(results){
                            var tagcrumb = null;
                             if(results == null){
                                     console.log("ERROR we must to regenerate CMSTripTagsCACHE");
                                } else{
                                    if(results != null && results.Item != null){
                                       wholefirsttag = results.Item.items[tagsstr];

                                        if (req.param('country') != undefined && wholefirsttag != undefined) {
                                            if (wholefirsttag.title_es.length > 0) {
                                                tagcrumb = {url: "/viajes?country="+countrycodestr+"&tags="+arrtags, label:wholefirsttag.title_es};
                                            };
                                        } else {
                                            console.log("so... country was not defined, but tag was")
                                            if (wholefirsttag != undefined) {
                                                if (wholefirsttag.title_es.length > 0) {
                                                    tagcrumb = {url: "/viajes?tags="+arrtags, label:wholefirsttag.title_es};
                                                };
                                            };
                                            
                                        }
                                        
                                    }
                                }
                            callback(tagcrumb);
                        });
                } else {
                    callback(null);
                }
            }  

            // CITY get from query
            var getpushCity = function(callback){
                //if there are any cities
                if (req.param('cities') != undefined) {

                    var url = api + '/cms/getCityByLabel_en';
                    var data = { cities: req.param('cities')};
                    var citycrumb = null;
                    http.Get(url, data, headers, function (results) {
                        if (results != null && results.responseBody != null && results.responseBody != '') {
                            citycms = JSON.parse(results.responseBody);

                            var citiesStr = '';
                            var citiesArr = [];
                            for (var i = 0; i < citycms.length; i++) {
                                if (citycms[i].label_es != null && citycms[i].label_es != ''){
                                    citiesArr.push(citycms[i].label_es);
                                } else{
                                   citiesArr.push(citycms[i].label_en);
                                }
                            };
                            citiesStr = citiesArr.join(', ');
                            
                            if (req.param('tags') != undefined) {
                                citycrumb = {url: "/viajes?country="+countrycodestr+"&tags="+arrtags+"&cities="+citystr, label: "Viajes en "+citiesStr};
                            } else {
                                console.log("if you see this, country and city were, but tag was not defined")
                                citycrumb = {url: "/viajes?country="+countrycodestr+"&cities="+citystr, label: "Viajes en "+citiesStr}
                            }
                             if (callback){
                                callback(citycrumb);
                            }

                        } else{
                            console.log("No city found on CMS");
                            if (callback) { 
                                callback(null);
                            }
                        }
                    });
                    
                } else {
                    //always after, we push title
                    if (callback){
                        callback(null);
                    }
                }                  
            };

            //check if we got everything
            function checkBreadFinish() {
                 console.log(breadcheck)
                return(breadcheck.country.finished && breadcheck.tag.finished && breadcheck.city.finished);
            }

            //push in order and init page data
            function buildBreadcrumb() {
                if (breadcheck.country.data != null) {
                    bc.push(breadcheck.country.data)    
                }
                if (breadcheck.tag.data != null) {
                    bc.push(breadcheck.tag.data)
                }
                if (breadcheck.city.data != null) {
                    bc.push(breadcheck.city.data)    
                }
                callbackinit(bc);                
            } 

            getpushCountry(
                function(countrycrumb) {
                    breadcheck.country.finished = true;
                    breadcheck.country.data = countrycrumb;
                    if (checkBreadFinish()) {
                        buildBreadcrumb();
                    };
                }
            );
            getpushTag(
                function(tagcrumb) {
                    breadcheck.tag.finished = true;
                    breadcheck.tag.data = tagcrumb;
                    if (checkBreadFinish()) {
                        buildBreadcrumb();
                    };  
                }
            );
            getpushCity(
                function(citycrumb) {
                    breadcheck.city.finished = true;
                    breadcheck.city.data = citycrumb;
                    if (checkBreadFinish()) {
                        buildBreadcrumb();
                    };
                }
            );
};


    // ========== END GENERAL USE ===========


    //******** START: Cloudinary Tools
var _cloudinary_urls = exports._cloudinary_urls = function(str, imagename) {
    if (str != null && str != '') {
        var uri = _parse_uri(str);
        var orgcloudname = 'open-market-travel';
        var altcloudname = 'openmarket-travel';

        var cloudname = '';

        if (str.indexOf(orgcloudname) > -1) {
            cloudname = orgcloudname;
        }
        if (str.indexOf(altcloudname) > -1) {
            cloudname = altcloudname;
        }
        if (str.indexOf('img-empty') > -1) {
            if (imagename.indexOf('avatar') > -1){
                str = 'http://res.cloudinary.com/open-market-travel/image/upload/v1426853495/assets/avatar.jpg';
            } else{
                str = 'http://res.cloudinary.com/open-market-travel/image/upload/v1426854292/assets/omtempty.png';
            }
            uri = _parse_uri(str);
            cloudname = orgcloudname;
        }


        if (str.indexOf('cloudinary.com') > -1) {
            return {
                logosocial: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_100,w_100,q_70,f_auto/' + uri.file,
                mainproductimage: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_370,w_870,q_70,f_auto/' + uri.file,
                mainproductimageretina: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_900,w_1700,q_30,f_auto/' + uri.file,
                mainproductimagemail: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_148,w_264,q_70,f_auto/' + uri.file,
                mainproductimageretinamail: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_296,w_528,q_30,f_auto/' + uri.file,
                mainproductimagefacebook: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_315,w_600,q_70,f_auto/' + uri.file,
                mainproductimageretinafacebook: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_630,w_1200,q_30,f_auto/' + uri.file,
                mainproductimageprint: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_370,w_870,q_70,f_auto/' + uri.file,
                mainproductimageprintresume: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_450,w_1200,q_80,f_auto/' + uri.file,
                itinerarydaythumb: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_120,w_120,q_70,f_auto/' + uri.file,
                itinerarydaythumbretina: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_240,w_240,q_50,f_auto/' + uri.file,
                resultimage: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_214,w_380,q_70,f_auto/' + uri.file,
                resultimageretina: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_428,w_760,q_30,f_auto/' + uri.file,
                avatarb36: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/w_36,h_36,c_fill,g_face,q_90,f_auto/' + uri.file,
                avatarb36retina: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/w_72,h_72,c_fill,g_face,q_50,f_auto/' + uri.file,
                avatarm42: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/w_42,h_42,c_fill,g_face,q_90,f_auto/' + uri.file,
                avatarm42retina: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/w_84,h_84,c_fill,g_face,q_50,f_auto/' + uri.file,
                avatarl70: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/w_70,h_70,c_fill,g_face,q_90,f_auto/' + uri.file,
                avatarl70retina: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/w_140,h_140,c_fill,g_face,q_50,f_auto/' + uri.file,
                avatar100: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/w_100,h_100,c_fill,g_face,q_90,f_auto/' + uri.file,
                avatar100retina: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/w_200,h_200,c_fill,g_face,q_30,f_auto/' + uri.file,
                avatar125: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/w_125,h_125,c_fill,g_face,q_90,f_auto/' + uri.file,
                avatar125retina: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/w_250,h_250,c_fill,g_face,q_30,f_auto/' + uri.file,
                searchresult: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_215,w_360,q_70,f_auto/' + uri.file,
                searchresultretina: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_430,w_720,q_50,f_auto/' + uri.file,
                inspirationresult: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_270,w_270,q_70,f_auto/cms/' + uri.file,
                inspirationresultretina: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_540,w_540,q_40,f_auto/cms/' + uri.file,
                association: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/w_210,h_150,q_80,c_pad,f_auto/' + uri.file,
                associationretina: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/w_420,h_300,q_30,c_pad,f_auto/' + uri.file,
                corporatephoto: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/g_face,c_fill,h_245,w_437,g_faces,q_70,f_auto/' + uri.file,
                corporatephotoretina: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/g_face,c_fill,h_490,w_874,g_faces,q_30,f_auto/' + uri.file,
                corporateselfie: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_140,w_250,g_faces,q_70,f_auto/' + uri.file,
                corporateselfieretina: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_280,w_500,g_faces,q_30,f_auto/' + uri.file,
                mainlanding: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_380,w_1400,q_71,f_auto/cms/' + uri.file,
                countryzonelanding: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_400,w_400,q_71,f_auto/cms/' + uri.file,
                countrytaglanding: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_400,w_700,q_71,f_auto/cms/' + uri.file,
                cmspress150: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/w_200,h_200,c_fill,g_face,q_90,f_auto/cms/' + uri.file,
                cmspress150retina: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/w_400,h_400,c_fill,g_face,q_30,f_auto/cms/' + uri.file,
                herobg: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,g_center,w_1425,h_300,f_auto/cms/' + uri.file,
                cmspressone710: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/w_710,h_400,c_fill,g_face,q_90,f_auto/cms/' + uri.file,
                cmspressone710retina: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/w_1420,h_800,c_fill,g_face,q_30,f_auto/cms/' + uri.file,
            };
        }
        else {
            return {
                url: str
            }
        }

    }
    else {
        return 'http://res.cloudinary.com/open-market-travel/image/upload/v1426854292/assets/omtempty.png';
    }

}

var _cloudinary_url = exports._cloudinary_url = function(str, imagename) {
    var urls = _cloudinary_urls(str, imagename);
    if (urls[imagename]) {
        return urls[imagename];
    }
    else {
        return str;
    }
}

//******** END:   Cloudinary Tools

// calcular el valor de precio unitario estimado  y de cantidad de pasajeros

var _getPaxNumber = exports._getPaxNumber = function(booking) {                                                       
    var paxNumber = 0;

    for (var i = 0; i < booking.roomDistribution.length; i++){
        var item = booking.roomDistribution[i];
        paxNumber = paxNumber+item.paxList.length;
    }
    return paxNumber;
}

var _getUnitPriceAverage = exports._getUnitPriceAverage = function(booking) {
    var paxNumber = 0;
    for (var i = 0; i < booking.roomDistribution.length; i++){
        var item = booking.roomDistribution[i];
        paxNumber = paxNumber+item.paxList.length;
    }                                                   
    var unitPrice = booking.amount.exchange.value/paxNumber;
    return unitPrice;
}

// obtener la url absoluta de el req

var _getAbsUrl = exports._getAbsUrl = function(req){
    var absurl = req.protocol + '://' + req.hostname;
    return absurl
}
// get url brand from path
var _getUrlBrand = exports._getUrlBrand = function(path){
    if (/:/i.test(path)){
        return path.substring(0,path.indexOf(":"));
    } else {
        return path;
    }
}

//launch a subprocess
var events = require('events');
var subprocess = exports.subprocess = function (scriptfile, request, callback, errorcallback) {
    
    var id = 'carrier.' + new Date();
    var workerHub = require('child_process');
    var worker = null;

    var eventcarrier = function (id, worker) {
        this.name = 'Helper to send events...';
        this.created = new Date();
        this.id = id || 'carrier.' + this.created.toISOString();
        this.worker = worker;
        this.end = function () {
            this.worker.kill('SIGINT');
        }
        return this;
    };
    eventcarrier.super_ = events.EventEmitter;
    eventcarrier.prototype = Object.create(events.EventEmitter.prototype, {
        constructor: {
            value: eventcarrier,
            enumerable: false
        }
    });
    worker = workerHub.fork(scriptfile);
    
    worker.on('message', function (message) {
        if (message != null && message.hasOwnProperty('$interprocess')) {
            switch (message.$interprocess) {
                case 'SUBPROCESS.READY':
                    worker.send(request);
                    break;
                case 'SUBPROCESS.RESPONSE':
                    if (callback) {
                        callback(message.result);
                    }
                    carrier.emit('subprocess.response', message.result);
                    break;
                case 'SUBPROCESS.ERROR':
                    if (errorcallback) {
                        errorcallback(message.error);
                    }
                    carrier.emit('subprocess.error', message.error);
                    break;
            }
        }
    });

    var carrier = new eventcarrier(id, worker);

    return carrier;

}


/**
 * devuelve los iatas disponibles
 */
var _getIatas = exports._getIatas = function(booking) {

    var url = api + '/iata/getAll';  
    
    
    http.Get(url, null, headers, function (results) {
        if (results == null) {
            console.log("No iata found");
        } else {
            if (results != null && results.data != null) {
            	callback(results.data);
            }
        }
        callback(null);
    });    
}

// obtener precios PVP a partir de session de affiiado

var _buildAffiliateMinPrice = exports._buildAffiliateMinPrice = function(minPriceParams){
    var minPrice = minPriceParams.minPrice;
    var currency = minPriceParams.currency;
    var fees = minPriceParams.fees;
    console.log("*** _buildAffiliateMinPrice: ",minPriceParams);

    var ret = {
        net : null,
        pvp : null,
        currency : null
    };
//    console.log ('minPriceParams : ',minPriceParams);
//    console.log ('currency.value : ',currency.value);
//    console.log ('minPrice : ',minPrice);
    
    
    if (minPrice.currency.value == currency.value){
        ret.net = minPrice.value;
        ret.currency = minPrice.currency;
    } else if (minPrice.exchange.currency.value == currency.value){
        ret.net = minPrice.exchange.value;
        ret.currency = minPrice.exchange.currency; 
    } else {
        ret = null
        return ret;
    }
    if (fees.unique !== null && fees.unique !== undefined){
        //var price = ret.net + ret.net*(fees.unique / 100);
        ret.pvp = Math.round(_buildAffiliatePVPPrice(ret.net, fees, "unique"));
    } else {
        ret.pvp = ret.net;
    }
    
   // console.log ('calculated minPrice : ',ret);
    return ret;
};



/**
 * funcion que devuelve el pvp de la agencia, pasando el neto agencia y la comision
 * netAffiliatePrice es el neto de la agencia (vendra en la divisa del ususario)
 * en pvp final se calcula sumando al netoAgencia la comision (unique) contenida en fees
 * fees son las comisiones del afiliado
 * typeProduct (tipo de producto unique (booking), groups, tailormade,flights
 */
var _buildAffiliatePVPPrice = exports._buildAffiliatePVPPrice = function(netAffiliatePrice, fees,typeProduct){
    
    // si tiene importe neto
    if(netAffiliatePrice != null && netAffiliatePrice > 0){
        
        // si tiene comision, devuelvo el pvp
        if(fees != null){
            
            if(typeProduct!=null){
                if(typeProduct == "unique"){
                    if(fees.unique != null && fees.unique > 0){
                        //return Math.round(netAffiliatePrice + (netAffiliatePrice * (fees.unique / 100)));
                        return Math.round(netAffiliatePrice / (1 - (fees.unique / 100)));
                    }
                    else{
                        return netAffiliatePrice;
                    }
                }
                else if(typeProduct == "groups"){
                    if(fees.groups != null && fees.groups > 0){
                        //return Math.round(netAffiliatePrice + (netAffiliatePrice * (fees.groups / 100)));
                        return Math.round(netAffiliatePrice / (1 - (fees.groups / 100)));
                    }
                    else{
                        return netAffiliatePrice;
                    }
                }
                else if(typeProduct == "tailormade"){
                    if(fees.tailormade != null && fees.tailormade > 0){
                        //return Math.round(netAffiliatePrice + (netAffiliatePrice * (fees.tailormade / 100)));
                        return Math.round(netAffiliatePrice / (1 - (fees.tailormade / 100)));
                    }
                    else{
                        return netAffiliatePrice;
                    }
                }
                else if(typeProduct == "flights"){
                    if(fees.flights != null && fees.flights > 0){
                        //return Math.round(netAffiliatePrice + (netAffiliatePrice * (fees.flights / 100)));
                        return Math.round(netAffiliatePrice / (1 - (fees.flights / 100)));
                    }
                    else{
                        return netAffiliatePrice;
                    }
                }
                else{
                    if(fees.unique != null && fees.unique > 0){
                        //return Math.round(netAffiliatePrice + (netAffiliatePrice * (fees.unique / 100)));
                        return Math.round(netAffiliatePrice / (1 - (fees.unique / 100)));
                    }
                    else{
                        return netAffiliatePrice;
                    }
                }               
            }
            //si no se especifica el producto, devuelvo el fee.unique
            else{
                if(fees.unique != null && fees.unique > 0){
                    //return Math.round(netAffiliatePrice + (netAffiliatePrice * (fees.unique / 100)));
                    return Math.round(netAffiliatePrice / (1 - (fees.unique / 100)));
                }
                else{
                    return netAffiliatePrice;
                }
            }
        }
        // si no tiene comsion devuelvo en neto
        else{
            return netAffiliatePrice;
        }
    }
    //si no tiene importe devuelvo 0
    else{
        return 0;
    }
};


/**
 * @name  _getCitiesAndHotelCats
 * @description
 *
 * find in itinerary cities and hotels categories
 * associated to that city
 * 
 * @param  {Object} itinerary product itinerary
 * @return {Object}          Array with {city: <string>, cats : <hotel cats strings array>}
 */
var _getCitiesAndHotelCats = exports._getCitiesAndHotelCats = function(itinerary, lang){
    var lang = lang || 'es';
    var citysAndHotelCats = [];

    var day = "";
    if (itinerary) {
        for (day in itinerary) {
            if (itinerary[day].sleepcity != null &&
                itinerary[day].hotel != null &&
                itinerary[day].hotel.category != '') {
                var c = {
                    city : itinerary[day].sleepcity,
                    cat : itinerary[day].hotel.category
                };
                if (c.cat == 'unclassified *' && lang == 'es'){
                    c.cat = 'otros alojamientos';
                    // console.log("c.cats", c.cat);
                }
                citysAndHotelCats.push(c);
            }
        }        
    }

    var citysAndHotelCatsRet = [];
    _.map(citysAndHotelCats, 
        function(item){

        var cityname = item.city.city_es || item.city.city;

        var finded = _.filter (citysAndHotelCatsRet, function(res){
            return res.city == cityname;
        });
        var newItem = null;
        if (finded !== null && finded.length > 0){
            if(finded[0].cats.indexOf(item.cat)<0){
                finded[0].cats.push(item.cat);
                newItem = finded[0];
            }
        } else{
            newItem = {city : cityname, cats : [item.cat]};
            citysAndHotelCatsRet.push(newItem);
        }

        return newItem;

    });
    return citysAndHotelCatsRet;
};

/**
     * [_getContent description]
     * Get content from api v.2
     * @param  {Object}   req      request
     * @param  {Object}   query    search query
     * @param  {String}   collection    mongo collection name
     * @param  {Object}   auth    auth data
     * @param  {Function} callback returns results in an array
     */
var _getContent = exports._getContent = function (req, query, collection, auth, callback){
        var query = query || null;
        var collection = collection || 'Page';
        console.log ('_getContent query:',query);
        console.log ('_getContent collection:',collection);
        var request = {
            collectionname : collection,
            query : query
        }; 
        switch(collection) {
            case 'Page':
                request.populate = [
                {path: 'categories'},
                {path: 'profile'},
                {path: 'author'}
                ]
                break;
            default:
                console.log ('no hay populado para esta colección ',collection);
        };
        console.log ('--->request:',request);
        var command = 'find';
        request.oncompleteeventkey = command + '.done';
        request.onerroreventkey = command + '.error';
        
        var rqCMD = {
            command: command,
            request: request,
            service: 'core',
        };
        
        // obtener la session
        if (auth != null) {
            rqCMD.auth = auth;
        }
        
        var rq = req.ytoconnector.send(rqCMD);

        //request success
        rq.on(request.oncompleteeventkey, function (results) {            
            if (results != null){
                callback(results);
            } else {
                console.log("_getContent Error: An unknown error has ocurred in responseBody. Result:",result);
                callback(null);
            }               
        });
        //request is not success
        rq.on(request.onerroreventkey, function (err) {
            console.log(err);
            //res.status(500).send(err);
            callback(null);
        });
        
        //request error access to api...
        rq.on('api.error', function (err) {
            console.log(err);
            //res.status(500).send(err);
            callback(null);
        });
        
        //request timeout api not responding...
        rq.on('api.timeout', function (tout) {
            console.log(tout);
            //res.status(503).send("Server too busy right now, sorry.");
            callback(null);
        });
    }
