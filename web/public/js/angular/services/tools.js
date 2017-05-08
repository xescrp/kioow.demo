/**
 * @ngdoc service
 * @name service.tools_service
 * @requires $rootScope
 * @requires $location
 * @requires destinations_service
 * @description
 * 
 * General Auxiliars functions
 */
app.service('tools_service', 
    function (
      $rootScope,
      $location,
      destinations_service) {
   
    return {
        accentsTidy : _accentsTidy,
        addHoursDate : _addHoursDate,
        buildAffiliatePVPPrice : _buildAffiliatePVPPrice,
        buildAffiliateDetailPrice : _buildAffiliateDetailPrice,
        cloudinaryUrls: _cloudinary_urls,
        cloudinaryUrl: _cloudinary_url,
        dateConvert : _dateConvert,
        formatNumber: _format_number,
        getCountrysByIds : _getCountrysByIds,
        getQuerystring : _getQuerystring,
        getMarkers : _getMarkers,
        getMonthNameEnglish : _getMonthNameEnglish,
        getMonthNameSpanish : _getMonthNameSpanish,
        getMealsProduct : _getMealsProduct,
        getHotelCatsProduct : _getHotelCatsProduct,
        parseUri: _parse_uri,
        showPreloader: _show_preloader,
        showPreloaderProcess: _show_preloader_process,
        showConectionError : _show_conection_error,
        showFullError : _show_full_error,
        showPreloaderFlights : _show_preloader_flights,
        showCountries : _showCountries,
        transformToDate: _transformToDate,
        browserMobile : _browser_mobile
    };
    function _browser_mobile() {
        
        var check = false;
        (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
        return check;

    }

    function _parse_uri(str) {
        var parser = document.createElement('a');
        parser.href = str;
        var pathnameparts = parser.pathname.split('/');
        var uri = {
            protocol: parser.protocol,
            host: parser.host,
            hostname: parser.hostname,
            port: parser.port,
            pathname: parser.pathname,
            hash: parser.hash,
            search: parser.search,
            file: pathnameparts[pathnameparts.length - 1]
        };
        return uri;
    }

    //******** START: Cloudinary Tools
    function _cloudinary_urls(str) {
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
                str = 'http://res.cloudinary.com/open-market-travel/image/upload/v1426854292/assets/omtempty.png';
                uri = _parse_uri(str);
                cloudname = orgcloudname;
            }


            if (str.indexOf('cloudinary.com') > -1) {
                return {
                    mainproductimage: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_450,w_850,q_70,f_auto/' + uri.file,
                    mainproductimageretina: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_900,w_1700,q_30,f_auto/' + uri.file,
                    mainproductimagemail: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_148,w_264,q_70,f_auto/' + uri.file,
                    mainproductimageretinamail: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_296,w_528,q_30,f_auto/' + uri.file,
                    itinerarydaythumb: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_120,w_120,q_70,f_auto/' + uri.file,
                    itinerarydaythumbretina: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_240,w_240,q_50,f_auto/' + uri.file,
                    resultimage: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_214,w_380,q_70,f_auto/' + uri.file,
                    resultimageretina: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_428,w_760,q_30,f_auto/' + uri.file,
                    avatarb36: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/w_36,h_36,c_fill,g_face,q_90,f_auto/' + uri.file,
                    avatarb36round: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/w_36,h_36,c_fill,g_face,q_90,r_18,f_auto/' + uri.file,
                    avatarb36retina: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/w_72,h_72,c_fill,g_face,q_50,f_auto/' + uri.file,
                    avatarm42: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/w_42,h_42,c_fill,g_face,q_90,f_auto/' + uri.file,
                    avatarm42retina: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/w_84,h_84,c_fill,g_face,q_50,f_auto/' + uri.file,
                    avatarl70: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/w_70,h_70,c_fill,g_face,q_90,f_auto/' + uri.file,
                    avatarl70retina: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/w_140,h_140,c_fill,g_face,q_50,f_auto/' + uri.file,
                    avatar100: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/w_100,h_100,c_fill,g_face,q_90,f_auto/' + uri.file,
                    avatar100retina: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/w_200,h_200,c_fill,g_face,q_30,f_auto/' + uri.file,
                    searchresult: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_215,w_360,q_70,f_auto/' + uri.file,
                    searchresultretina: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_430,w_720,q_50,f_auto/' + uri.file,
                    inspirationresult: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_270,w_270,q_70,f_auto/cms/' + uri.file,
                    inspirationresultretina: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_540,w_540,q_40,f_auto/cms/' + uri.file,
                    association: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/w_210,h_150,q_80,c_pad,f_auto/' + uri.file,
                    associationretina: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/w_420,h_300,q_30,c_pad,f_auto/' + uri.file,
                    corporatephoto: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_245,w_437,g_faces,q_70,f_auto/' + uri.file,
                    corporatephotoretina: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_490,w_874,g_faces,q_30,f_auto/' + uri.file,
                    corporateselfie: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_140,w_250,g_faces,q_70,f_auto/' + uri.file,
                    corporateselfieretina: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_280,w_500,g_faces,q_30,f_auto/' + uri.file,
                    corporateselfietailor: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_200,w_330,g_faces,q_70,f_auto/' + uri.file,
                    corporateselfieretinatailor: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_400,w_660,g_faces,q_30,f_auto/' + uri.file
                };
            }
            else {
                return {
                    url: str
                };
            }

        }
        else {
            return 'http://res.cloudinary.com/open-market-travel/image/upload/v1426854292/assets/omtempty.png'; 
        }
   
    }

    function _cloudinary_url(str, imagename) {
        var urls = _cloudinary_urls(str);
        if (urls[imagename]) {
            return urls[imagename];
        }
        else {
            return str;
        }
    }
    //******** END:   Cloudinary Tools

    function _format_number(num, decimals) {
        if (decimals == null || decimals == 0 || decimals == '') {
            decimals = 0;
        }
        return parseFloat(Math.round(num * 100) / 100).toFixed(decimals);
    }
    
    function _show_preloader($scope, action) {
        switch (action) {
            case 'show':
                $scope.bodyStyle = { 'overflow': 'hidden' };
                angular.element(document.querySelector('.preloader-blanket')).addClass('in');
                //$scope.showPageLoad = true;
                break;
            default:
                $scope.bodyStyle = {};
                angular.element(document.querySelector('.preloader-blanket')).removeClass('in');
                //$scope.showPageLoad = false;
        }
    }
    function _show_preloader_process($scope, action, lang) {
        var lang = lang || 'es';
        switch (action) {
            case 'show':
                $scope.bodyStyle = { 'overflow': 'hidden' };
                var message = lang == 'es' ? 'Procesando tu solicitud.<br> No recarges la página.' : 'Loading...';
                var error = '<div class="error-blanket"><div class="full-page-error text-center"><div class="preloader"><span></span><span></span><span></span></div><br><br>'+message+'</div></div>';
                angular.element(document.querySelector('#processholder')).append(error);
                angular.element(document.querySelector('.error-blanket')).addClass('in');
                //$scope.showPageLoad = true;
                break;
            default:
                $scope.bodyStyle = {};
                angular.element(document.querySelector('.error-blanket')).removeClass('in');
                //$scope.showPageLoad = false;
        }
    }

    function _show_preloader_flights($scope, action, lang) {
        var lang = lang || 'es';
        switch (action) {
            case 'show':
                $scope.bodyStyle = { 'overflow': 'hidden' };
                var image = '<div class="error-blanket"><div class="full-page-error text-center"><img src="http://res.cloudinary.com/open-market-travel/image/upload/assets/banner_vuelos_openmarket_300x250.gif" style="margin-top: -125px;"/></div></div>';
                angular.element(document.querySelector('#processholder')).append(image);
                angular.element(document.querySelector('.error-blanket')).addClass('in');
                //$scope.showPageLoad = true;
                break;
            default:
                $scope.bodyStyle = {};
                angular.element(document.querySelector('.error-blanket')).removeClass('in');
                //$scope.showPageLoad = false;
        }
    }
    
    function _show_conection_error($scope, action, lang) {
        var lang = lang || 'es';
        switch (action) {
            case 'show':
                $scope.bodyStyle = { 'overflow': 'hidden' };
                var message = lang == 'es' ? 'Problemas de conexión. <br>Intente recargar la página.' : 'Connexion Problems. <br>Try reload the page.';
                var error = '<div class="error-blanket"><div class="full-page-error text-center text-danger"><i class="fa fa-3x fa-exclamation-triangle"></i> <br>'+message+'</div></div>';
                angular.element(document.querySelector('#errorholder')).append(error);
                angular.element(document.querySelector('.error-blanket')).addClass('in');
                //$scope.showPageLoad = true;
                break;
            default:
                $scope.bodyStyle = {};
                angular.element(document.querySelector('.error-blanket')).removeClass('in');
                //$scope.showPageLoad = false;
        }
    }
    function _show_full_error($scope, action, type, text) {
        switch (action) {
            case 'show':
                $scope.bodyStyle = { 'overflow': 'hidden' };
                var print;
                switch(type) {
                    case 'success':
                        print = '<div class="error-blanket"><div class="full-page-error text-center text-success"><i class="fa fa-3x fa-check-circle"></i> <br>'+text+'</div></div>';
                        break;
                    case 'error':
                        print = '<div class="error-blanket"><div class="full-page-error text-center text-danger"><i class="fa fa-3x fa-exclamation-triangle"></i> <br>'+text+'</div></div>';
                        break;
                    default:
                        print = '<div class="error-blanket"><div class="full-page-error text-center text-danger"><i class="fa fa-3x fa-exclamation-triangle"></i> <br>Problemas desconocido. <br>'+text+'</div></div>';
                };
                
                angular.element(document.querySelector('#errorholder')).append(print);
                angular.element(document.querySelector('.error-blanket')).addClass('in');
                //$scope.showPageLoad = true;
                break;
            default:
                $scope.bodyStyle = {};
                angular.element(document.querySelector('.error-blanket')).removeClass('in');
        }
    }


    // get markers for google maps
    function _getMarkers (itinerary) {
        var markers = [];
        var cities = [];
        if (itinerary) {
          for (var day in itinerary) {
            // debo obtener la ciudad donde se duerme o en el ultimo dia la departure

              if (itinerary[day].sleepcity != null && itinerary[day].sleepcity.city != '') {
                     var c = itinerary[day].sleepcity.city;

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
                            var position = cities.indexOf(c);
                            markers[position].nights = markers[position].nights+1;
                        }
                     }
                 }
          }
        }
        return markers;
    }
    // convert Date string in date
    function _dateConvert (ddmmyyyy) {
        var m = ddmmyyyy.match(/(\d{1,2})([\.\-\|\/])(\d{1,2})([\.\-\|\/])(\d{4})/);
        if (m != null) {
            return new Date(m[5] + "/" + m[3] + "/" + m[1]);
        } else {
            return false;
        }
    }

    // Removes Duplicates
    function _arrayUnique (a) {
        return a.reduce(function (p, c) {
            if (p.indexOf(c) < 0) p.push(c);
            return p;
        }, []);
    }
    // get markers for google maps (return country codes from countries or country string)
    // paremeter want could be 'countrycodes' or 'countrylabels'
    function _showCountries (itinerary, want, lang) {
        var search = '';
        if (want == null || want == undefined){
            want = 'countrycodes';
        }

        switch(want) {
            case 'countrycodes':
                search = 'countrycode';
                break;
            case 'countrylabels':
                search = 'country';
                break;
            default:
                search = 'countrycode';
        };

        var countries = [];
        if (itinerary != null && itinerary.length > 0) {

            for (var day in itinerary) {

                if (itinerary[day].departurecity != null && itinerary[day].departurecity.country.length > 2) {
                    var c = itinerary[day].departurecity.location[search];
                    //console.log ('itinerary[day].departurecity.countryid ',itinerary[day].departurecity.countryid);

                    if (search == 'country' && itinerary[day].departurecity.countryid){
                        c = destinations_service.findcountries({search: [itinerary[day].departurecity.countryid], fieldname: '_id'});
                        if (c[0] !== undefined){
                            if (lang == 'es'){
                               c = c[0].label_es;
                            } else {
                               c = c[0].label_en;
                            }
                        }
                       
                    }
                    countries.push(c);
                }

                if (itinerary[day].stopcities != null && itinerary[day].stopcities.length > 0) {
                    for (var j = 0, len = itinerary[day].stopcities.length; j < len; j++) {
                        if (itinerary[day].stopcities[j].country.length > 2) {
                            var cou = itinerary[day].stopcities[j];
                            var c = cou.location[search];
                            if (search == 'country' && itinerary[day].stopcities[j].countryid){
                                c = destinations_service.findcountries({search: [itinerary[day].stopcities[j].countryid], fieldname: '_id'});
                                if (c[0] !== undefined){
                                    if (lang == 'es'){
                                       c = c[0].label_es;
                                    } else {
                                       c = c[0].label_en;
                                    }
                                }
                            }
                            if (countries.indexOf(c) == -1) {
                                countries.push(c);
                            }
                        }
                    }
                }

                if (itinerary[day].sleepcity != null && itinerary[day].sleepcity.country.length > 2) {
                    var c = itinerary[day].sleepcity.location[search];
                    if (search == 'country' && itinerary[day].sleepcity.countryid){
                        c = destinations_service.findcountries({search: [itinerary[day].sleepcity.countryid], fieldname: '_id'});
                        if (c[0] !== undefined){
                            if (lang == 'es'){
                               c = c[0].label_es;
                            } else {
                               c = c[0].label_en;
                            }
                        }
                    }
                    if (countries.indexOf(c) == -1) {
                        countries.push(c);
                    }
                }
            }

            return _arrayUnique(countries);
        }
    };
    
    


    /**
     * funcion que devuelve el pvp de la agencia, pasando el neto agencia y la comision
     * price es el importe devuelto por el api, si es afiliado sera el neto de la agencia (vendra en la divisa del ususario)
     * si es un traveler sera el pvp de venta
     * affiliate es el usuario de la session, si es afiliado tendra fees y calculara el precio
     * si no sera un usuario normal y su precio sera netAffilliatePrice
     * en pvp final se calcula sumando al netoAgencia la comision (unique) contenida en fees
     */
    function _buildAffiliatePVPPrice (netAffiliatePrice, affiliate, typeProduct){
    	
    	//si no hay afiliado, o no tiene fees el afiliado, devuelvo el importe
    	if(affiliate == null || affiliate.fees == null){
    		if(netAffiliatePrice == null){
    			return 0;
    		}
    		else{
    			return netAffiliatePrice;
    		}    		
    	}
    	
    	// si tiene usuario y fees y precio
    	else if(netAffiliatePrice != null && netAffiliatePrice > 0){
    		
    		// si tiene comision, devuelvo el pvp
    		if(affiliate.fees != null){
    			var fees = affiliate.fees;
    			if(typeProduct != null){
    				if(typeProduct == "unique"){
    					if(fees.unique != null && fees.unique > 0){
//    						return Math.round(netAffiliatePrice + (netAffiliatePrice * (fees.unique / 100)));
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
    				//por defecto si no es ningun tipo de producto, pongo el unique
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
     * funcion que construye la estructura con el desglose del precio para el affiliado
     * $scope.priceDetail = {
     *					'fee': ,
     *					'feeunit': '%',
     *					'price': {
     *						'net' : ,
     *				    	'pvp' : ,
     *				    	'currency' :currency
     *					}
     */
    function _buildAffiliateDetailPrice ( affiliate, feeunit, netPrice, currency, typeProduct){    	
    	
    	    	
    	//comprobar que estan todos los vaqlores introducidos
    	if(affiliate != null && affiliate.fees != null && netPrice !=null && feeunit != null && currency != null){
    		
    		var type ;
    		if(typeProduct != null && (typeProduct =="unique" || typeProduct =="groups" || typeProduct =="tailormade" || typeProduct =="flights")){
    			type = typeProduct;
    		}
    		else{
    			type = "unique";
    		}
    		
    		var priceDetail = {
				'fee': affiliate.fees[type],// affiliate.fees.unique,
				'feeunit': feeunit,
				'price': {
					'net' : netPrice,
			    	'pvp' : Math.round(_buildAffiliatePVPPrice(netPrice, affiliate, type)),
			    	'currency' : currency
				}
			};
    		return priceDetail;    		
    	}
    	
    	// si tiene afiliado y tiene fees pero estan vacias o a cero
    	else if( netPrice != null && feeunit != null && currency != null){
    		var priceDetail = {
				'fee': 0,
				'feeunit': feeunit,
				'price': {
					'net' : netPrice,
			    	'pvp' : netPrice,
			    	'currency' : currency
				}
			};
    		return priceDetail;    		
    	}
    	else{
    		console.log("ERROR in _buildAffiliateDetailPrice. Details: empty field.");
    	}
    	
    	return null;    	
    }   

    // devuelve el nombre del mes en ingles, dado un indice de mes 0-11
    function _getMonthNameEnglish (monthindex, type) {
        if (type === undefined || type == 'long'){
            switch(monthindex) {
                case 0:
                    return 'January';
                case 1:
                    return 'February';
                case 2:
                    return 'March';
                case 3:
                    return 'April';
                case 4:
                    return 'May';
                case 5:
                    return 'June';
                case 6:
                    return 'July';
                case 7:
                    return 'August';
                case 8:
                    return 'September';
                case 9:
                    return 'October';
                case 10:
                    return 'November';
                case 11:
                    return 'December';
                default:
                    return 'error';
                }
            } else {
                switch(monthindex) {
                case 0:
                    return 'Jan';
                case 1:
                    return 'Feb';
                case 2:
                    return 'Mar';
                case 3:
                    return 'Apr';
                case 4:
                    return 'May';
                case 5:
                    return 'Jun';
                case 6:
                    return 'Jul';
                case 7:
                    return 'Aug';
                case 8:
                    return 'Sep';
                case 9:
                    return 'Oct';
                case 10:
                    return 'Nov';
                case 11:
                    return 'Dec';
                default:
                    return 'error';
            }

        }
    }
    
    // devuelve el nombre del mes en espanol, dado un indice de mes 0-11
    // type puede ser 'short' or 'long' default long
    function _getMonthNameSpanish (monthindex, type) {
        if (type === undefined || type == 'long'){
            switch(monthindex) {
                case 0:
                    return 'Enero';
                case 1:
                    return 'Febrero';
                case 2:
                    return 'Marzo';
                case 3:
                    return 'Abril';
                case 4:
                    return 'Mayo';
                case 5:
                    return 'Junio';
                case 6:
                    return 'Julio';
                case 7:
                    return 'Agosto';
                case 8:
                    return 'Septiembre';
                case 9:
                    return 'Octubre';
                case 10:
                    return 'Noviembre';
                case 11:
                    return 'Diciembre';
                default:
                    return 'error';
                }
            } else {
                switch(monthindex) {
                case 0:
                    return 'Ene';
                case 1:
                    return 'Feb';
                case 2:
                    return 'Mar';
                case 3:
                    return 'Abr';
                case 4:
                    return 'May';
                case 5:
                    return 'Jun';
                case 6:
                    return 'Jul';
                case 7:
                    return 'Ago';
                case 8:
                    return 'Sep';
                case 9:
                    return 'Oct';
                case 10:
                    return 'Nov';
                case 11:
                    return 'Dic';
                default:
                    return 'error';
            }

        }
    }
        
    
    function _addHoursDate(initDate, hours){
        var newDate = new Date(initDate)
        //console.log ('initDate ',newDate);
        //console.log ('initDate ', typeof( newDate));
        newDate.setTime(newDate.getTime() + (hours*60*60*1000)); 
        return newDate;
    }
     /**
     * funcion que la fecha en formato date del objeto de mongo
     * @return "date javascript"
     */
    function _transformToDate(dateObj){
        //console.log ('dateObj _______',dateObj);
        var day = dateObj.day;
        var month = dateObj.month;
        var year = dateObj.year;
        var date = new Date(year, month, day, 0, 0, 0, 0);
        //console.log ('date return _______',date);
        return date;
    }

    // compare view helpers

    // get meals 
    // type can be 'obj', 'str' ---  lang can be 'en'
    function _getMealsProduct(product, type, lang){

        var mealstext = '';

        var meals = { breakfast : 0, lunch : 0, dinner : 0};

        for (var i = 0; i < product.itinerary.length; i++) {

            if (product.itinerary[i].hotel.breakfast){
                meals.breakfast++;
            }
            if (product.itinerary[i].hotel.lunch){
                meals.lunch++;
            }
            if (product.itinerary[i].hotel.dinner){
                meals.dinner++;
            }
        }

        var txtbreakfast = '';
        var txtlunch = '';
        var txtdinner = '';
        

        if (meals.breakfast > 0){
          if (meals.breakfast == 1){
            if (lang == 'en'){
                txtbreakfast = '1 breakfast';
            }else{
                txtbreakfast = '1 desayuno';
            }
            
          } else {
            if (lang == 'en'){
                txtbreakfast = meals.breakfast+' breakfasts';
             }else{
                txtbreakfast = meals.breakfast+' desayunos';
            }
          }
          mealstext = txtbreakfast;
        }
        ////
        if (type == 'obj'){
            return meals;
        }
        //////
        ///
        ///
        if (meals.lunch > 0){
          if (meals.lunch == 1){
            if (lang == 'en'){
                txtlunch = '1 lunch';
            } else {
                txtlunch = '1 comida';
            }
          } else {
            if (lang == 'en'){
                txtlunch = meals.lunch+' lunchs';
            } else {
                txtlunch = meals.lunch+' comidas';
            }
          }
          if(mealstext != ''){
              mealstext = mealstext+', '+txtlunch;
          }
          else{
              mealstext = mealstext+txtlunch;     
          }        
        }
        

        if (meals.dinner > 0){
          if (meals.dinner == 1){
            if (lang == 'en'){
                txtdinner = '1 dinner';
            }else{
                txtdinner = '1 cena';
            }
          } else {
            if (lang == 'en'){
                txtdinner = meals.dinner+' dinners';
            }else {
                txtdinner = meals.dinner+' cenas';
            }
          }
          if(mealstext != ''){
              mealstext = mealstext+', '+txtdinner;
          }
          else{
              mealstext = mealstext+txtdinner;    
          }  
        }
        return mealstext;
    }

    // get hotel categories 
    // type can be 'obj', 'str' ---  lang can be 'en'
    // 
    function _getHotelCatsProduct(product, lang){
        var hotels = [];
        for (var i = 0; i < product.itinerary.length; i++) {
            // 
            var toCheck = '';
            if (product.itinerary[i].hotel.category == 'unclassified *'){
              if (lang == 'en'){
                toCheck = 'unclassified *';
              } else {
                toCheck = 'otros alojamientos';
              }
            } else{
              toCheck = product.itinerary[i].hotel.category;
            }

            if (hotels.indexOf(toCheck) == -1) {
              if (product.itinerary[i].hotel.category == '' ||
                  product.itinerary[i].hotel.category == undefined ||
                  product.itinerary[i].hotel.category == null) {
                // nothing to do
              } else {
                hotels.push(toCheck);
              }
            }
        }
       return hotels.join(', ');
    }

    function _accentsTidy(s){
        // var r=s.toLowerCase();
        var r=s;
        r = r.replace(new RegExp("[àáâãäå]", 'g'),"a");
        r = r.replace(new RegExp("æ", 'g'),"ae");
        r = r.replace(new RegExp("ç", 'g'),"c");
        r = r.replace(new RegExp("[èéêë]", 'g'),"e");
        r = r.replace(new RegExp("[ìíîï]", 'g'),"i");
        r = r.replace(new RegExp("ñ", 'g'),"n");                            
        r = r.replace(new RegExp("[òóôõö]", 'g'),"o");
        r = r.replace(new RegExp("œ", 'g'),"oe");
        r = r.replace(new RegExp("[ùúûü]", 'g'),"u");
        r = r.replace(new RegExp("[ýÿ]", 'g'),"y");
        //console.log(r);
        return r;
    }

    function _getCountrysByIds(arrIds, lang){
        if (arrIds === undefined) {
            return null;
        }
        var countries = [];
        console.log ('arrIds ',arrIds);
        for (var i = arrIds.length - 1; i >= 0; i--) {
            var item = destinations_service.findcountries({search: arrIds[i], fieldname: '_id'});
            if (lang == 'es') {
                countries.push(item[0].label_es);
            }else{
                countries.push(item[0].label_en);
            }
            
        }
        return countries;
    }
    /**
     * @ngdoc method
     * @name _getQuerystring
     * @methodOf service.tools_service
     * @description 
     * 
     * get url and return query search part
     * @return {string} query search ex: &country=es&tags=kids
     */
    function _getQuerystring() {

        var querystring = '';
        var searchurl = $location.url();
        var searchpath = $location.path();
        var searchurl = searchurl.substring(searchpath.length, searchurl.length);
        if (searchurl.length > 0) {
            querystring = searchurl;
        }
        return querystring;
    }

});


