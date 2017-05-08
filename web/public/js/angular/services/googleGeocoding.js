var app = angular.module("openMarketTravelApp");

app.service('openmarket_google_service', function (http_service) {
    return {
        geoCodingSearch: _geo_coding_search,
        parseGoogleResult: _parse_google_result
    }

    function _geo_coding_search(address, callback) {
        var geocoder = new google.maps.Geocoder();
        var resultsarray = [];
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results.length > 0) {

                    for (var it = 0; it < results.length; ++it) {
                        var rs = _parse_google_result(results[it]);
                        if (rs) {
                            resultsarray.push(rs);
                        }
                    }

                    //return the results...
                    callback(resultsarray);
                }
                else {
                    //no results...but callback
                    callback(resultsarray);
                }
            }
            else {
                //no results...but callback
                callback(resultsarray);
            }

        });

    }

    function _parse_google_result(googleresult) {
        var result = {
            fulladdress: '',
            cp: '',
            city: '',
            country: '',
            countrycode: '',
            stateorprovince: '',
            latitude: 0,
            longitude: 0,
        };
        console.log(googleresult);
        var arrAddress = googleresult.address_components;
        result.latitude = googleresult.geometry.location.lat();
        result.longitude = googleresult.geometry.location.lng();
        result.fulladdress = googleresult.formatted_address;

        angular.forEach(arrAddress, function (address_component, i) {

            console.log("add comp " + address_component);

            if (address_component.types[0] == "route") {
                //console.log(i + ": route:" + address_component.long_name);
                result.route = address_component.long_name;
            }

            if (address_component.types[0] == "locality") {
                //console.log("town:" + address_component.long_name);
                result.city = address_component.long_name;
            }

            if (address_component.types[0] == "country") {
                //console.log("country:" + address_component.long_name);
                result.country = address_component.long_name;
                result.countrycode = address_component.short_name;
            }

            if (address_component.types[0] == "postal_code_prefix") {
                //console.log("pc:" + address_component.long_name);
                result.cp = address_component.long_name;
            }

            if (address_component.types[0] == "administrative_area_level_1") {
                //console.log("prov:" + address_component.long_name);
                result.stateorprovince = address_component.long_name;
            }

            if (address_component.types[0] == "postal_code") {
                //console.log("pc:" + address_component.long_name);
                result.cp = address_component.long_name;
            }

        });
        //console.log(result);
        return result;
    }
});