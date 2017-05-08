module.factory('parseGoogleResult', function(googleresult){
     
   var result = {
				fulladdress: '',
				pc: '',
				city: '',
				country: '',
				countrycode: '',
				stateorprovince: '',
				latitude: 0,
				longitude: 0,
				};

		    var arrAddress = googleresult.address_components;
		    result.latitude = googleresult.geometry.location.lat;
		    result.longitude = googleresult.geometry.location.lng;
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
		            result.pc = address_component.long_name;
		        }

		        if (address_component.types[0] == "administrative_area_level_1") {
		            //console.log("prov:" + address_component.long_name);
		            result.stateorprovince = address_component.long_name;
		        }

		        if (address_component.types[0] == "postal_code") {
		            //console.log("pc:" + address_component.long_name);
		            result.pc = address_component.long_name;
		        }
		        
		    });
		    //console.log("parse google result " + result);
		    return result;
 
});