/**
 * @ngdoc service
 * @name service.productpreviewhelpers
 * @requires $rootScope
 * @requires $log
 * @requires destinations_service
 * @description
 * 
 * Auxiliars functions to build or show products/tailormades requests
 */
app.service('productpreviewhelpers', function (
    $log,
    $rootScope,
    destinations_service) {
    'use strict';
    return {
        calculatePriceMinimum: _calculatePriceMinimum,
        getItineraryDay: _getItineraryDay,
        showAllCities : _showAllCities,
        showCities : _showCities,
        showItinerariesMealsIncluded : _showItinerariesMealsIncluded,
        showItinerariesHotelIncluded : _showItinerariesHotelIncluded,
        showItineraryDrinksIncluded : _showItineraryDrinksIncluded,
        showTransportsIncluded : _showTransportsIncluded,
        showLanguages : _showLanguages,
        arelanguages : _arelanguages,
        showActivityResume : _showActivityResume,
        therearemeals : _therearemeals,
        hasDrinks: _hasDrinks,
        getMarkers: _getMarkers,
        printMeals: _printMeals 
    };
    /**
     * @ngdoc method
     * @name calculatePriceMinimum
     * @methodOf service.productpreviewhelpers
     * @description
     * 
     * Public: calculate min price in a product
     * @param  {Object} dmcproduct product
     * @return {Object}       The Min Price
     */
    function  _calculatePriceMinimum(dmcproduct) {
         var pricemin = 0;
         var today = new Date();
         var monthstart = 0;

         var indexyear = _indexOfYear(today.getFullYear());

         if (dmcproduct!=null && dmcproduct.availability != null &&         
             dmcproduct.availability.length > 0) {
             //console.log('get the min price...');
             for (var j = 0 ; j < dmcproduct.availability.length; j++) {
                 for (var i = monthstart; i <= 11; i++) {
                     var month = _getMonthNameEnglish(i);

                     if (dmcproduct.availability[j] != null) {
                         
                         if (dmcproduct.availability[j][month]) {
                             if (dmcproduct.availability[j][month].availability) {
                                 //for every avail...
                                 var avails = dmcproduct.availability[j][month].availability;

                                 if (avails != null && avails.length > 0) {
                                     for (var jj = 0; jj < avails.length; jj++) {

                                         if (avails[jj].rooms.double.price > 0) {
                                             if (pricemin == 0) {
                                                 pricemin = avails[jj].rooms.double.price;
                                             }
                                             else {
                                                 if (avails[jj].rooms.double.price < pricemin) {
                                                     pricemin = avails[jj].rooms.double.price;
                                                 }
                                             }
                                         }
                                     }
                                 }

                             }
                         }
                     }

                 }

             }

         }
         return pricemin;
     }


     /**
     * funcion que dado un dia del intinerario del producto, devuelve la estructura del dia
     * ciudad de salida - [ciudades de parada] - ciudad de llegada
     */
    /**
     * @ngdoc method
     * @name getItineraryDay
     * @methodOf service.productpreviewhelpers
     * @description
     * 
     * Public: Formated the cities (sleep, departure and stops) and 
     * retuned to show it in spanish.
     * @param  {Object} Itinerary day
     * @return {String}       the cities of a day perated by '-'
     */
    function _getItineraryDay(day) {
        //$log.log(day);
        var resultText = '';
        var cityArray = [];
        // flags to know if cityid exist default true asum that have valid cityid
        var haveIdsleep = true;
        var haveIddeparture = true;
        var haveIdstop = true;

        
        // 1) departure cities
        if(day.departurecity != null && day.departurecity.cityid != null && day.departurecity.cityid != ''){
            var cityDeparture = destinations_service.findcities({ search : [day.departurecity.cityid], fieldname: '_id'});
            
            //$log.log('finded dep');
            //$log.log(cityDeparture);
            
            if(cityDeparture != null && cityDeparture.length > 0 && cityDeparture[0] != null){
               var c = cityDeparture[0].label_es || cityDeparture[0].label_en;
                cityArray.push(c);
            } else{
                // si no encuentra nada en json ciudades
                haveIddeparture = false;
            }
        } else{
            haveIddeparture = false;
        }
        // hago push de la estructura vieja
        if (!haveIddeparture && day.departurecity != null && day.departurecity.city != null && day.departurecity.city != ''){
            var cOld = day.departurecity.city_es || day.departurecity.city;
            cityArray.push(cOld);
        }

        // 2) stop cities
        if(day.stopcities.length > 0){
            for( var itC = 0; itC < day.stopcities.length; itC++){
    
                if (day.stopcities[itC].cityid != null && day.stopcities[itC].cityid != ''){
                    var cityStop = destinations_service.findcities({ search : [day.stopcities[itC].cityid], fieldname: '_id'});
                    if (cityStop != null  && cityStop.length > 0 && cityStop[0] != null){
                        cityArray.push(cityStop[0].label_es);
                    } else {
                         haveIdstop = false;
                    }
                }
                if (!haveIdstop && day.stopcities[itC].city != null){
                    var csOld = day.stopcities[itC].city_es ||day.stopcities[itC].city;
                    cityArray.push(csOld);  
                }
                haveIdstop = true;
            }
        }
        
        // 3) sleep cities        
        // si no es el ultimo dia
        if (!day.lastday){           

            if(day.sleepcity.city != null && day.sleepcity.cityid != ''){
                var citySleep = destinations_service.findcities({ search : [day.sleepcity.cityid], fieldname: '_id'});
                if (citySleep != null && citySleep.length > 0 && citySleep[0] !== undefined){
                    var c = citySleep[0].label_es || citySleep[0].label_en;
                    cityArray.push(c);
                } else {
                    haveIdsleep = false;
                }
            } else{
                haveIdsleep = false;
            }
            if (!haveIdsleep && day.sleepcity.city != null){
                var cslOld = day.sleepcity.city_es ||day.sleepcity.city;
                cityArray.push(cslOld);
            }            
        }
        cityArray = _.uniq(cityArray);
        //$log.log(cityArray);
        
        resultText = cityArray.join(' - ');
        return resultText;
    };

    /**
     * @ngdoc method
     * @name _showAllCities
     * @methodOf service.productpreviewhelpers
     * @description
     * 
     * Public: get unique cities to show in product
     * @param  {Object} itinerary product
     * @return {String} the cities comma separated
     */

    function _showAllCities(itinerary) {
        var cities = [];
        if (itinerary != null && itinerary.length > 0) {
            _.each(itinerary, function (day) {
                var dep = day.departurecity != null ? day.departurecity.city_es || day.departurecity.city : null;
                var slp = day.sleepcity != null ? day.sleepcity.city_es || day.sleepcity.city : null;
                dep != null && dep != '' ? cities.push(dep) : null;
                slp != null && slp != '' ? cities.push(slp) : null;
                if (day.stopcities != null && day.stopcities.length > 0) {
                    _.each(day.stopcities, function (stop) {
                        var stp = stop != null ? stop.city_es || stop.city : null;
                        stp != null && stp != '' ? cities.push(stp) : null;
                    });
                }
            });
        }
        cities = _.uniq(cities);
        var html = cities.join(', ');
        return html;
    }
    

    /**
     * @ngdoc method
     * @name _showCities
     * @methodOf service.productpreviewhelpers
     * @description
     * 
     * Public: build cities to show in a day like _getItineraryDay but in english
     * @param  {Object} itineraryday day of the product
     * @return {String} the cities '-' separated
     */
    function _showCities(itineraryday) {
        
         var html = '';
         var cities = [];
         var arestops = false;
         if (itineraryday!=null) {
             if (itineraryday.departurecity != null && itineraryday.departurecity.city != '') {

                 var c = itineraryday.departurecity.city;

                 cities.push(c);
             }
             if (itineraryday.stopcities != null && itineraryday.stopcities.length > 0) {
                 arestops = true;
                 for (var j = 0; j < itineraryday.stopcities.length; j++) {
                     var cit = itineraryday.stopcities[j];
                     var c = cit.city;
                     //if (c.indexOf(',') == -1) {
                     //    if (cit.location) {
                     //        c += ' (' + cit.location.country + ')';
                     //    }
                     //}

                     if (cities.indexOf(c) == -1) {
                         cities.push(c);
                     }
                 }
             }
             if (itineraryday.sleepcity != null && itineraryday.sleepcity.city != '') {
                 var c = itineraryday.sleepcity.city;

                 if (arestops) {
                     cities.push(c);
                 }
                 else {
                     if (cities.indexOf(c) == -1) {
                         cities.push(c);
                     }
                 }
             }


         }
         html = cities.join(' - ');
         return html;
    }

    function _printMeals(program) {
        var htmlstr = 'Solo alojamiento';
        var ht = [];
        var bitm = program != null && program.buildeditinerary != null ? program.buildeditinerary.meals : null;
        if (bitm == null) {
            return htmlstr;
        }
        if (program.categoryname != null && program.categoryname.related != null && program.categoryname.related.length > 1) {
            return 'Varias opciones';
        }
        if (bitm != null && bitm.breakfast != null &&
            bitm.breakfast == 0 &&
            bitm.lunch != null &&
            bitm.lunch == 0 &&
            bitm.dinner != null &&
            bitm.dinner == 0) {
            return htmlstr;
        } else {
            htmlstr = '';
            if (bitm != null && bitm.breakfast > 0) {
                var htmlstb = bitm.breakfast;
                (bitm.breakfast > 1) ? htmlstb += ' desayunos' : htmlstb += ' desayuno';
                ht.push(htmlstb);
            }
            if (bitm != null && bitm.lunch > 0) {
                var htmlstl = bitm.lunch;
                (bitm.lunch > 1) ? htmlstl += ' comidas' : htmlstl += ' comida';
                ht.push(htmlstl);
            }
            if (bitm != null && bitm.dinner > 0) {
                var htmlstd = bitm.dinner;
                (bitm.dinner > 1) ? htmlstd += ' cenas' : htmlstd += ' cenas';
                ht.push(htmlstd);
            }
            htmlstr = ht.join(', ');
            return htmlstr;
        }

    }

    /**
     * @ngdoc method
     * @name _showItinerariesMealsIncluded
     * @methodOf service.productpreviewhelpers
     * @description
     * 
     * Public: show and count all meals in the product
     * @param  {Object} itinerary  full itinerary of the product
     * @return {String} the meals '-' separated
     */
     function _showItinerariesMealsIncluded(itinerary){
         var breakfastcount = 0;
         var lunchcount = 0;
         var dinnercount = 0;
         var html = '';
         if (itinerary!=null && itinerary.length > 0) {
             for (var i = 0; i < itinerary.length; i++) {
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
         var items = [];
         if (breakfastcount > 0) {
            var strb = breakfastcount>1?' Desayunos': ' Desayuno';
            items.push(breakfastcount + strb);
         }
         if (lunchcount > 0) {
            var stra = lunchcount>1?' Comidas': ' Comida';
             items.push(lunchcount + stra);
         }
         if (dinnercount > 0) {
            var strc = dinnercount>1?' Cenas': ' Cena';
            items.push(dinnercount + strc);
         }
         html = items.join(' - ');
         return html;
    }



    /**
     * @ngdoc method
     * @name _showItinerariesHotelIncluded
     * @methodOf service.productpreviewhelpers
     * @description
     * 
     * Public: show category hotels in the product
     * @param  {Object} itinerary  full itinerary of the product
     * @return {String} the hotels categories 'comma' separated
     */
     function _showItinerariesHotelIncluded(itinerary, lang){
            var cats = [];
            var lang = lang || 'es';
            var day = "";
            if (itinerary) {
                for (day in itinerary) {
                    if (itinerary[day].hotel != null && itinerary[day].hotel.category != '') {
                        var c = itinerary[day].hotel.category;
                        cats.push(c);
                    }
                }
                cats =  _.uniq(cats);
            }
            if (lang == 'es'){

                for (var i = cats.length - 1; i >= 0; i--) {
                    if (cats[i] == 'unclassified *'){
                        cats[i] = 'otros alojamientos';
                        //console.log("cats[i]", cats[i]);
                    }
                }
            }
            cats = cats.join(', ');
            return cats;
     }

    /**
     * @ngdoc method
     * @name _showItineraryDrinksIncluded
     * @methodOf service.productpreviewhelpers
     * @description
     * 
     * Public: a string that says if have drinks or not
     * @param  {Object} itinerary  full itinerary of the product
     * @return {String} a string to show
     */
    function _showItineraryDrinksIncluded(itinerary) {

         var htmlyes = '(Bebidas por itinerario)';
         var htmlno = '(Sin bebidas)';
         var rt = htmlno;
         if(itinerary && itinerary.length > 0) {         
             for (var i = 0; i < itinerary.length; i++) {
                 var it = itinerary[i];
                 if (it.hotel.lunchdrinks | it.hotel.dinnerdrinks) {
                     rt = htmlyes;
                 }
             }
         }
         return rt;
    }

    /**
     * @ngdoc method
     * @name _showTransportsIncluded
     * @methodOf service.productpreviewhelpers
     * @description
     * 
     * Public: a string that says which transports are included in the product 
     * @param  {Object} itinerary  full itinerary of the product
     * @return {String} a string to show
     */
    function _showTransportsIncluded(product, lang) {
        var lang = lang || 'es';
        var tr = [];
        var html = '';
        if (product!=null && 
            product.included!=null && 
            product.included.transportbetweencities.included) {

                if (product.included.transportbetweencities.bus) {
                    var strbus = (lang == 'es')? 'autobús' : 'Bus';
                    tr.push(strbus);
                }
                if (product.included.transportbetweencities.boat) {
                    var strBoat = (lang == 'es')? 'barco' : 'Boat/Ferry';
                    tr.push(strBoat);
                }
                if (product.included.transportbetweencities.van) {
                    var strvan = (lang == 'es')? 'minivan' : 'Van/Minivan';
                    tr.push(strvan);
                }
                if (product.included.transportbetweencities.truck) {
                    var strtruck = (lang == 'es')? 'camión' : 'Truck';
                    tr.push(strtruck);
                }
                if (product.included.transportbetweencities.train) {
                    var strtrain = (lang == 'es')? 'tren' : 'Train';
                    tr.push(strtrain);
                }
                if (product.included.transportbetweencities.domesticflight) {
                    var strflight = (lang == 'es')? 'vuelo doméstico' : 'Domestic flight';
                    tr.push(strflight);
                }
                if (product.included.transportbetweencities.fourxfour) {
                    tr.push('4x4');
                }
                if (product.included.transportbetweencities.privatecarwithdriver) {
                    var strprivatecarwd = (lang == 'es')? 'coche privado con conductor' : 'Private car with driver';
                    tr.push(strprivatecarwd);
                }
                if (product.included.transportbetweencities.privatecarwithdriverandguide) {
                    var strprivatecarwdg = (lang == 'es')? 'coche privado con conductor y guía' : 'Private car with driver and guide';
                    tr.push(strprivatecarwdg);
                }
                if (product.included.transportbetweencities.other) {
                    var strother =  (lang == 'es')? 'otro' : 'Other';
                    tr.push(strother);
                }
                html = tr.join(', ');
        }
        return html;

    };
    /**
     * @ngdoc method
     * @name _showLanguages
     * @methodOf service.productpreviewhelpers
     * @description
     * 
     * Public: return a string with name of the language 
     * selected in includes of the product and activities
     * If contain spanish return spanish only, 
     * else returns all other languages
     * @param  {Object} language object in activity 
     * @return {String} a string to show
     */
    function _showLanguages(language,lang) {
        var lang = lang || 'es';
        var langArr = [];
        var html = '';
        if (language) {
            if (language.spanish) {
                var esstr = (lang == 'es')?'español':'spanish';
                langArr.push(esstr);
            }
            else{
                if (language.english) {
                    var enstr = (lang == 'es')?'inglés':'english';
                    langArr.push(enstr);
                }
                if (language.french) {
                    var frstr = (lang == 'es')?'francés':'french';
                    langArr.push(frstr);
                }
                if (language.german) {
                    var gestr = (lang == 'es')?'alemán':'german';
                    langArr.push(gestr);
                }
                if (language.italian) {
                    var itstr = (lang == 'es')?'italiano':'italian';
                    langArr.push(itstr);
                }
                if (language.portuguese) {
                    var ptstr = (lang == 'es')?'portugués':'portuguese';
                    langArr.push(ptstr);
                }
            }
        }

        html = langArr.join(', ');
        return html;

     }
     
     function _arelanguages(language){
         var ok = false;
         if (language) {
             if (language.spanish) {
                 ok = true;
             }
             if (language.english) {
                 ok = true;
             }
             if (language.french) {
                 ok = true;
             }
             if (language.german) {
                 ok = true;
             }
             if (language.italian) {
                 ok = true;
             }
             if (language.portuguese) {
                 ok = true;
             }
         }
         return ok;
     }

    /**
     * @ngdoc method
     * @name _showActivityResume
     * @methodOf service.productpreviewhelpers
     * @requires _showLanguages
     * @description
     * 
     * Public: return a string with the description of the activitie
     * @param  {Object} activity  the activity of the day
     * @return {String} a string to show
     */
    function _showActivityResume (activity, lang) {
        var lang = lang || 'es';
        var html = '';
        var items = [];
        if (activity) {   
            if (activity.ticketsincluded) {
                var tstr = (lang=='es')?'tickets incluidos':'tickets included';
                items.push(tstr);
            }
            if (activity.group) {
                var gstr = (lang=='es')?'en grupo':'in a group';
                items.push(gstr);
            }
            if (activity.individual) {
                var pstr = (lang=='es')?'privada':'private';
                items.push(pstr);
            }
            if (activity.localguide) {
                var lgstr = (lang=='es')?'Guía local en ' + _showLanguages(activity.language):'Local guide in ' +_showLanguages(activity.language, 'en') ;
                items.push(lgstr);
            }
            if(items!=null && items.length >0){
                html = items.join(' - ');
            }
        }
        return html;
     }

    /**
     * @ngdoc method
     * @name _therearemeals
     * @methodOf service.productpreviewhelpers
     * @description
     * 
     * Public: check if the day have meals
     * @param  {Object} itineraryday  a day in the itineray of the product
     * @return {Boolean} true if have meals
     */
     function _therearemeals (itineraryday){
        var ok = false;
         if (itineraryday!=null) {
             ok = itineraryday.hotel.breakfast | itineraryday.hotel.lunch | itineraryday.hotel.dinner;
         }
         return ok;
     }
    /**
     * @ngdoc method
     * @name _hasDrinks
     * @methodOf service.productpreviewhelpers
     * @description
     * 
     * Public: check if the product include drinks
     * @param  {Object} itinerary  full itinerary of the product
     * @return {Boolean} true if include drinks
     */
    function _hasDrinks (itinerary) {
         var ok = false;

         if (itinerary != null && itinerary.length > 0) {
             for (var i = 0; i < itinerary.length; i++) {
                 var it = itinerary[i];
                 if (it.hotel.lunchdrinks | it.hotel.dinnerdrinks) {
                     ok = true;
                 }
             }
         }
         return ok;
    };
    /**
    * @ngdoc method
    * @name _getMarkers
    * @methodOf service.productpreviewhelpers
    * 
    * @description 
    * helper get markers for google maps
    * @param {Object} [itinerary] full itineray product
    * @return {Object} Array of markers
    */
    function _getMarkers(itinerary) {
      var markers = [];
      var cities = [];
      if (itinerary) {
        for (var day in itinerary) {
          // debo obtener la ciudad donde se duerme o en el ultimo dia la departure

            if (itinerary[day].sleepcity != null && itinerary[day].sleepcity.city != '') {
                   var c = itinerary[day].sleepcity.city;

                   if (cities.indexOf(c) == -1) {
                      
                      if (itinerary[day].sleepcity.location.latitude){
                        cities.push(c);
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
                          var indexArray = cities.indexOf(c)
                          markers[indexArray].nights = markers[indexArray].nights+1;
                      }
                   }
               }
        }
      };
      return markers
    }


});


