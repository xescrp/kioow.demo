
//URLS
var _geocoding_service_url = 'https://maps.googleapis.com/maps/api/geocode/json?';
var _distanceg_service_url = 'https://maps.googleapis.com/maps/api/distancematrix/json?';

//geocoding request definition
var GeocodingRequest = function () {
    this.address = '';
    this.latitudelongitude = '';
    this.bounds = '';
    this.region = '';
    this.language = 'ES';
    this.sensor = true;
    this.key = 'AIzaSyCeKgcPndbINBpWj3WsN0RwyZpX3xuzoKo';
}

GeocodingRequest.prototype.toUri = function () {
    var out = 
            'address=' + this.address + '&' +
            'key=AIzaSyDrMo8CvzQ3edI44sgDa7j53MxW1PP6zM8' + '&' + 
            'latlng=' + this.latitudelongitude + '&' +
            'bounds=' + this.bounds + '&' +
            'region=' + this.region + '&' +
            'language=' + this.language + '&' +
            'sensor=' + this.sensor;
    return out;
}
GeocodingRequest.prototype.toJson = function () {
    return {
        address: this.address,
        key: this.key,
        latlng: this.latitudelongitude,
        bounds: this.bounds,
        region: this.region,
        language: this.language,
        sensor: this.sensor
    };
}
//geocoding response definition
var AddressResponse = function () {
    this.fulladdress = '';
    this.city = '';
    this.stateorprovince = '';
    this.cp = '';
    this.country = '';
    this.countrycode = '';
    this.continent = '';
    this.latitude = 0.0;
    this.longitude = 0.0;
}

//distanceMatrix request definition
//google.maps.TravelMode.driving (predeterminado): proporciona rutas estándar para llegar en coche a través de la red de carreteras.
//google.maps.TravelMode.walking: solicita rutas a pie a través de aceras y rutas peatonales (según disponibilidad).
//google.maps.TravelMode.bicycling: solicita rutas para llegar en bicicleta a través de carriles bici y vías preferenciales para bicicletas (actualmente, solo disponible en EE.UU. y 
var DistanceRequest = function () {
    this.origins = '';
    this.destinations = [];
    this.mode = 'DRIVING'; //possible values: DRIVING, BICYCLING, WALKING, TRANSIT
    this.units = 'metric'; //possible values: metric, imperial
    this.language = 'es-ES';
    this.sensor = true;
}
DistanceRequest.prototype.toUri = function () {
    var out = 
        'origins=' + this.origins + '&' +
        'destinations=' + this.destinations.join('|') + '&' +
        'mode=' + this.mode + '&' +
        'units=' + this.units + '&' +
        'language=' + this.language + '&' +
        'sensor=' + this.sensor;
    return out;
}
DistanceRequest.prototype.toJson = function () {
    return {
        origins: this.origins,
        destinations: this.destinations,
        mode: this.lmode,
        units: this.units,
        language: this.language,
        sensor: this.sensor
    };
}
//distanceMatrix response definition
var DistanceResponse = function () {
    this.origin = '';
    this.destination = '';
    this.durationtext = '';
    this.distancetext = '';
    this.duration = 0;
    this.distance = 0;
}


//Service implementation
var GoogleMaps = function () {
    this.serviceName = 'Google Maps Connector';
}

GoogleMaps.prototype.FindAddresses = function (addresstext, onfinishhandler) { 
    var rq = new GeocodingRequest();
    rq.address = addresstext;
    rq.language = 'ES';
    rq.sensor = true;

    var finded = new Array();

    var http = require('yourttoo.connector').http;
    http.Get(url, rq.toJson(), null, function (results) {
        var rsp = new AddressResponse();

        var rsmatrix = JSON.parse(results.responseBody);

        if (rsmatrix.results) {
            for (var i = 0; i < rsmatrix.results.length; i++) {
                var gresult = rsmatrix.results[i];
                rsp.fulladdress = gresult.formatted_address;

                for (var j = 0; j < gresult.address_components.length; j++) {
                    var ad_cmp = gresult.address_components[j];

                    if (ad_cmp.types[0] == 'country') {
                        rsp.country = ad_cmp.long_name;
                        rsp.countrycode = ad_cmp.short_name;
                    }
                    if (ad_cmp.types[0] == 'locality') {
                        rsp.city = ad_cmp.long_name;
                    }
                    if (ad_cmp.types[0] == 'postal_code') {
                        rsp.cp = ad_cmp.long_name;
                    }
                    if (ad_cmp.types[0] == 'administrative_area_level_1') {
                        rsp.stateorprovince = ad_cmp.long_name;
                    }
                    if (rsp.city == null || rsp.city == '') {
                        if (ad_cmp.types[0] == 'natural_feature' || 
                                ad_cmp.types[0] == 'political' || 
                                ad_cmp.types[0] == 'colloquial_area' || 
                                ad_cmp.types[0] == 'administrative_area_level_2' || 
                                ad_cmp.types[0] == 'administrative_area_level_3') {
                            rsp.city = ad_cmp.long_name;
                        }
                    }
                }
                rsp.latitude = gresult.geometry.location.lat;
                rsp.longitude = gresult.geometry.location.lng;
                finded.push(rsp);
            }
        }

        onfinishhandler(finded);
    });
}

GoogleMaps.prototype.FindAddressesByLanguage = function (addresstext, language, onfinishhandler) { 
    var rq = new GeocodingRequest();
    rq.address = addresstext;
    rq.language = (language != null && language != '') ? language : 'EN';
    rq.sensor = true;
    
    var finded = new Array();
    
    var http = require('yourttoo.connector').http;
    http.Get(url, rq.toJson(), null, function (results) {
        var rsp = new AddressResponse();
        
        var rsmatrix = JSON.parse(results.responseBody);
        
        if (rsmatrix.results) {
            for (var i = 0; i < rsmatrix.results.length; i++) {
                var gresult = rsmatrix.results[i];
                rsp.fulladdress = gresult.formatted_address;
                
                for (var j = 0; j < gresult.address_components.length; j++) {
                    var ad_cmp = gresult.address_components[j];
                    
                    if (ad_cmp.types[0] == 'country') {
                        rsp.country = ad_cmp.long_name;
                        rsp.countrycode = ad_cmp.short_name;
                    }
                    if (ad_cmp.types[0] == 'locality') {
                        rsp.city = ad_cmp.long_name;
                    }
                    if (ad_cmp.types[0] == 'postal_code') {
                        rsp.cp = ad_cmp.long_name;
                    }
                    if (ad_cmp.types[0] == 'administrative_area_level_1') {
                        rsp.stateorprovince = ad_cmp.long_name;
                    }
                    if (rsp.city == null || rsp.city == '') {
                        if (ad_cmp.types[0] == 'natural_feature' || 
                                ad_cmp.types[0] == 'political' || 
                                ad_cmp.types[0] == 'colloquial_area' || 
                                ad_cmp.types[0] == 'administrative_area_level_2' || 
                                ad_cmp.types[0] == 'administrative_area_level_3') {
                            rsp.city = ad_cmp.long_name;
                        }
                    }
                }
                rsp.latitude = gresult.geometry.location.lat;
                rsp.longitude = gresult.geometry.location.lng;
                finded.push(rsp);
            }
        }
        
        onfinishhandler(finded);
    });
}

GoogleMaps.prototype.GetGeoCode = function (addresstext, onfinishhandler) {
    var rq = new GeocodingRequest();
    rq.address = addresstext;
    rq.language = 'ES';
    rq.sensor = true;
    
    var finded = new Array();
    
    var url = _geocoding_service_url;
    var http = require('yourttoo.connector').http;
    http.Get(url, rq.toJson(), null, function (results) {
        var rsp = new AddressResponse();

        var rsmatrix = JSON.parse(results.responseBody);

        console.log(rsmatrix);
        onfinishhandler(rsmatrix);
    });
}

GoogleMaps.prototype.GetDistances = function (originaddresses, destinationaddresses, onfinishhandler) {
    var rq = new DistanceRequest();
    rq.origins = originaddresses.join('|');
    rq.destinations = destinationaddresses.join('|');
    
    var finded = new Array();
    
    var url = _distanceg_service_url;
    var http = require('yourttoo.connector').http;
    http.Get(url, rq.toJson(), null, function (results) {
        var rsmatrix = JSON.parse(results.responseBody);
        
        if (rsmatrix.status == 'OK') {
            for (var i = 0; i < rsmatrix.origin_addresses.length; i++) {
                for (var j = 0; j < rsmatrix.destination_addresses.length; j++) {
                    var dm = new DistanceResponse();
                    dm.origin = rsmatrix.origin_addresses[i];
                    dm.destination = rsmatrix.destination_addresses[j];
                    
                    dm.distancetext = rsmatrix.rows[i].elements[j].distance.text;
                    dm.distance = rsmatrix.rows[i].elements[j].distance.value;
                    if (dm.distancetext.indexOf('km') > 0) { dm.distance = (dm.distance / 1000); }
                    
                    dm.durationtext = rsmatrix.rows[i].elements[j].duration.text;
                    dm.duration = rsmatrix.rows[i].elements[j].duration.value;
                    dm.duration = (dm.duration / 60);
                    
                    finded.push(dm);
                }
            }
        }
        onfinishhandler(finded);
    });
}

module.exports.GoogleMaps = GoogleMaps;