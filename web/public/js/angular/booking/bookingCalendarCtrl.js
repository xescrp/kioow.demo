var app = angular.module("openMarketTravelApp");

app.controller("bookingCalendarCtrl", 
	['$scope','$http','$log','tools_service', 'yto_session_service',
	function($scope, $http, $log, tools_service, yto_session_service){

	"use strict"; 
	$scope.calendar = {
		currentmonth: '',
		currentmonthnumber: 0,
		firstdaymonth: new Date(),
		today: new Date(),
		firstweek: {
		   monday: {
		       name: 'monday',
		       index: 1,
		       number: 1,
		       date: null,
		       available: false,
		       rooms: {
		           single: {
		               price: 0
		           },
		           double: {
		               price: 0
		           },
		           triple: {
		               price: 0
		           },
		           other: {
		               price: 0
		           },
		           currency: ''
		       }
		   },
		   tuesday: {
		       name: 'tuesday',
		       index: 2,
		       number: 2,
		       date: null,
		       available: false,
		       rooms: {
		           single: {
		               price: 0
		           },
		           double: {
		               price: 0
		           },
		           triple: {
		               price: 0
		           },
		           other: {
		               price: 0
		           },
		           currency: ''
		       }
		   },
		   wednesday: {
		       name: 'wednesday',
		       index: 3,
		       number: 3,
		       date: null,
		       available: false,
		       rooms: {
		           single: {
		               price: 0
		           },
		           double: {
		               price: 0
		           },
		           triple: {
		               price: 0
		           },
		           other: {
		               price: 0
		           },
		           currency: ''
		       }
		   },
		   thursday: {
		       name: 'thursday',
		       index: 4,
		       number: 4,
		       date: null,
		       available: false,
		       rooms: {
		           single: {
		               price: 0
		           },
		           double: {
		               price: 0
		           },
		           triple: {
		               price: 0
		           },
		           other: {
		               price: 0
		           },
		           currency: ''
		       }
		   },
		   friday: {
		       name: 'friday',
		       index: 5,
		       number: 5,
		       date: null,
		       available: false,
		       rooms: {
		           single: {
		               price: 0
		           },
		           double: {
		               price: 0
		           },
		           triple: {
		               price: 0
		           },
		           other: {
		               price: 0
		           },
		           currency: ''
		       }
		   },
		   saturday: {
		       name: 'saturday',
		       index: 6,
		       number: 6,
		       date: null,
		       available: false,
		       rooms: {
		           single: {
		               price: 0
		           },
		           double: {
		               price: 0
		           },
		           triple: {
		               price: 0
		           },
		           other: {
		               price: 0
		           },
		           currency: ''
		       }
		   },
		   sunday: {
		       name: 'sunday',
		       index: 7,
		       number: 7,
		       date: null,
		       available: false,
		       rooms: {
		           single: {
		               price: 0
		           },
		           double: {
		               price: 0
		           },
		           triple: {
		               price: 0
		           },
		           other: {
		               price: 0
		           },
		           currency: ''
		       }
		   }
		},
		secondweek: {
		   monday: {
		       name: 'monday',
		       index: 1,
		       number: 8,
		       date: null,
		       available: false,
		       rooms: {
		           single: {
		               price: 0
		           },
		           double: {
		               price: 0
		           },
		           triple: {
		               price: 0
		           },
		           other: {
		               price: 0
		           },
		           currency: ''
		       }
		   },
		   tuesday: {
		       name: 'tuesday',
		       index: 2,
		       number: 9,
		       date: null,
		       available: false,
		       rooms: {
		           single: {
		               price: 0
		           },
		           double: {
		               price: 0
		           },
		           triple: {
		               price: 0
		           },
		           other: {
		               price: 0
		           },
		           currency: ''
		       }
		   },
		   wednesday: {
		       name: 'wednesday',
		       index: 3,
		       number: 10,
		       date: null,
		       available: false,
		       rooms: {
		           single: {
		               price: 0
		           },
		           double: {
		               price: 0
		           },
		           triple: {
		               price: 0
		           },
		           other: {
		               price: 0
		           },
		           currency: ''
		       }
		   },
		   thursday: {
		       name: 'thursday',
		       index: 4,
		       number: 11,
		       date: null,
		       available: false,
		       rooms: {
		           single: {
		               price: 0
		           },
		           double: {
		               price: 0
		           },
		           triple: {
		               price: 0
		           },
		           other: {
		               price: 0
		           },
		           currency: ''
		       }
		   },
		   friday: {
		       name: 'friday',
		       index: 5,
		       number: 12,
		       date: null,
		       available: false,
		       rooms: {
		           single: {
		               price: 0
		           },
		           double: {
		               price: 0
		           },
		           triple: {
		               price: 0
		           },
		           other: {
		               price: 0
		           },
		           currency: ''
		       }
		   },
		   saturday: {
		       name: 'saturday',
		       index: 6,
		       number: 13,
		       date: null,
		       available: false,
		       rooms: {
		           single: {
		               price: 0
		           },
		           double: {
		               price: 0
		           },
		           triple: {
		               price: 0
		           },
		           other: {
		               price: 0
		           },
		           currency: ''
		       }
		   },
		   sunday: {
		       name: 'sunday',
		       index: 7,
		       number: 14,
		       date: null,
		       available: false,
		       rooms: {
		           single: {
		               price: 0
		           },
		           double: {
		               price: 0
		           },
		           triple: {
		               price: 0
		           },
		           other: {
		               price: 0
		           },
		           currency: ''
		       }
		   }
		},
		thirdweek: {
		   monday: {
		       name: 'monday',
		       index: 1,
		       number: 15,
		       date: null,
		       available: false,
		       rooms: {
		           single: {
		               price: 0
		           },
		           double: {
		               price: 0
		           },
		           triple: {
		               price: 0
		           },
		           other: {
		               price: 0
		           },
		           currency: ''
		       }
		   },
		   tuesday: {
		       name: 'tuesday',
		       index: 2,
		       number: 16,
		       date: null,
		       available: false,
		       rooms: {
		           single: {
		               price: 0
		           },
		           double: {
		               price: 0
		           },
		           triple: {
		               price: 0
		           },
		           other: {
		               price: 0
		           },
		           currency: ''
		       }
		   },
		   wednesday: {
		       name: 'wednesday',
		       index: 3,
		       number: 17,
		       date: null,
		       available: false,
		       rooms: {
		           single: {
		               price: 0
		           },
		           double: {
		               price: 0
		           },
		           triple: {
		               price: 0
		           },
		           other: {
		               price: 0
		           },
		           currency: ''
		       }
		   },
		   thursday: {
		       name: 'thursday',
		       index: 4,
		       number: 18,
		       date: null,
		       available: false,
		       rooms: {
		           single: {
		               price: 0
		           },
		           double: {
		               price: 0
		           },
		           triple: {
		               price: 0
		           },
		           other: {
		               price: 0
		           },
		           currency: ''
		       }
		   },
		   friday: {
		       name: 'friday',
		       index: 5,
		       number: 19,
		       date: null,
		       available: false,
		       rooms: {
		           single: {
		               price: 0
		           },
		           double: {
		               price: 0
		           },
		           triple: {
		               price: 0
		           },
		           other: {
		               price: 0
		           },
		           currency: ''
		       }
		   },
		   saturday: {
		       name: 'saturday',
		       index: 6,
		       number: 20,
		       date: null,
		       available: false,
		       rooms: {
		           single: {
		               price: 0
		           },
		           double: {
		               price: 0
		           },
		           triple: {
		               price: 0
		           },
		           other: {
		               price: 0
		           },
		           currency: ''
		       }
		   },
		   sunday: {
		       name: 'sunday',
		       index: 7,
		       number: 21,
		       date: null,
		       available: false,
		       rooms: {
		           single: {
		               price: 0
		           },
		           double: {
		               price: 0
		           },
		           triple: {
		               price: 0
		           },
		           other: {
		               price: 0
		           },
		           currency: ''
		       }
		   }
		},
		fourthweek: {
		   monday: {
		       name: 'monday',
		       index: 1,
		       number: 22,
		       date: null,
		       available: false,
		       rooms: {
		           single: {
		               price: 0
		           },
		           double: {
		               price: 0
		           },
		           triple: {
		               price: 0
		           },
		           other: {
		               price: 0
		           },
		           currency: ''
		       }
		   },
		   tuesday: {
		       name: 'tuesday',
		       index: 2,
		       number: 23,
		       date: null,
		       available: false,
		       rooms: {
		           single: {
		               price: 0
		           },
		           double: {
		               price: 0
		           },
		           triple: {
		               price: 0
		           },
		           other: {
		               price: 0
		           },
		           currency: ''
		       }
		   },
		   wednesday: {
		       name: 'wednesday',
		       index: 3,
		       number: 24,
		       date: null,
		       available: false,
		       rooms: {
		           single: {
		               price: 0
		           },
		           double: {
		               price: 0
		           },
		           triple: {
		               price: 0
		           },
		           other: {
		               price: 0
		           },
		           currency: ''
		       }
		   },
		   thursday: {
		       name: 'thursday',
		       index: 4,
		       number: 25,
		       date: null,
		       available: false,
		       rooms: {
		           single: {
		               price: 0
		           },
		           double: {
		               price: 0
		           },
		           triple: {
		               price: 0
		           },
		           other: {
		               price: 0
		           },
		           currency: ''
		       }
		   },
		   friday: {
		       name: 'friday',
		       index: 5,
		       number: 26,
		       date: null,
		       available: false,
		       rooms: {
		           single: {
		               price: 0
		           },
		           double: {
		               price: 0
		           },
		           triple: {
		               price: 0
		           },
		           other: {
		               price: 0
		           },
		           currency: ''
		       }
		   },
		   saturday: {
		       name: 'saturday',
		       index: 6,
		       number: 27,
		       date: null,
		       available: false,
		       rooms: {
		           single: {
		               price: 0
		           },
		           double: {
		               price: 0
		           },
		           triple: {
		               price: 0
		           },
		           other: {
		               price: 0
		           },
		           currency: ''
		       }
		   },
		   sunday: {
		       name: 'sunday',
		       index: 7,
		       number: 29,
		       date: null,
		       available: false,
		       rooms: {
		           single: {
		               price: 0
		           },
		           double: {
		               price: 0
		           },
		           triple: {
		               price: 0
		           },
		           other: {
		               price: 0
		           },
		           currency: ''
		       }
		   }
		},
		fifthweek: {
		   monday: {
		       name: 'monday',
		       index: 1,
		       number: 30,
		       date: null,
		       available: false,
		       rooms: {
		           single: {
		               price: 0
		           },
		           double: {
		               price: 0
		           },
		           triple: {
		               price: 0
		           },
		           other: {
		               price: 0
		           },
		           currency: ''
		       }
		   },
		   tuesday: {
		       name: 'tuesday',
		       index: 2,
		       number: 31,
		       date: null,
		       available: false,
		       rooms: {
		           single: {
		               price: 0
		           },
		           double: {
		               price: 0
		           },
		           triple: {
		               price: 0
		           },
		           other: {
		               price: 0
		           },
		           currency: ''
		       }
		   },
		   wednesday: {
		       name: 'wednesday',
		       index: 3,
		       number: 0,
		       date: null,
		       available: false,
		       rooms: {
		           single: {
		               price: 0
		           },
		           double: {
		               price: 0
		           },
		           triple: {
		               price: 0
		           },
		           other: {
		               price: 0
		           },
		           currency: ''
		       }
		   },
		   thursday: {
		       name: 'thursday',
		       index: 4,
		       number: 0,
		       date: null,
		       available: false,
		       rooms: {
		           single: {
		               price: 0
		           },
		           double: {
		               price: 0
		           },
		           triple: {
		               price: 0
		           },
		           other: {
		               price: 0
		           },
		           currency: ''
		       }
		   },
		   friday: {
		       name: 'friday',
		       index: 5,
		       number: 0,
		       date: null,
		       available: false,
		       rooms: {
		           single: {
		               price: 0
		           },
		           double: {
		               price: 0
		           },
		           triple: {
		               price: 0
		           },
		           other: {
		               price: 0
		           },
		           currency: ''
		       }
		   },
		   saturday: {
		       name: 'saturday',
		       index: 6,
		       number: 0,
		       date: null,
		       available: false,
		       rooms: {
		           single: {
		               price: 0
		           },
		           double: {
		               price: 0
		           },
		           triple: {
		               price: 0
		           },
		           other: {
		               price: 0
		           },
		           currency: ''
		       }
		   },
		   sunday: {
		       name: 'sunday',
		       index: 7,
		       number: 0,
		       date: null,
		       available: false,
		       rooms: {
		           single: {
		               price: 0
		           },
		           double: {
		               price: 0
		           },
		           triple: {
		               price: 0
		           },
		           other: {
		               price: 0
		           },
		           currency: ''
		       }
		   }
		},
		sixthweek: {
		   monday: {
		       name: 'monday',
		       index: 1,
		       number: 0,
		       date: null,
		       available: false,
		       rooms: {
		           single: {
		               price: 0
		           },
		           double: {
		               price: 0
		           },
		           triple: {
		               price: 0
		           },
		           other: {
		               price: 0
		           },
		           currency: ''
		       }
		   },
		   tuesday: {
		       name: 'tuesday',
		       index: 2,
		       number: 0,
		       date: null,
		       available: false,
		       rooms: {
		           single: {
		               price: 0
		           },
		           double: {
		               price: 0
		           },
		           triple: {
		               price: 0
		           },
		           other: {
		               price: 0
		           },
		           currency: ''
		       }
		   },
		   wednesday: {
		       name: 'wednesday',
		       index: 3,
		       number: 0,
		       date: null,
		       available: false,
		       rooms: {
		           single: {
		               price: 0
		           },
		           double: {
		               price: 0
		           },
		           triple: {
		               price: 0
		           },
		           other: {
		               price: 0
		           },
		           currency: ''
		       }
		   },
		   thursday: {
		       name: 'thursday',
		       index: 4,
		       number: 0,
		       date: null,
		       available: false,
		       rooms: {
		           single: {
		               price: 0
		           },
		           double: {
		               price: 0
		           },
		           triple: {
		               price: 0
		           },
		           other: {
		               price: 0
		           },
		           currency: ''
		       }
		   },
		   friday: {
		       name: 'friday',
		       index: 5,
		       number: 0,
		       date: null,
		       available: false,
		       rooms: {
		           single: {
		               price: 0
		           },
		           double: {
		               price: 0
		           },
		           triple: {
		               price: 0
		           },
		           other: {
		               price: 0
		           },
		           currency: ''
		       }
		   },
		   saturday: {
		       name: 'saturday',
		       index: 6,
		       number: 0,
		       date: null,
		       available: false,
		       rooms: {
		           single: {
		               price: 0
		           },
		           double: {
		               price: 0
		           },
		           triple: {
		               price: 0
		           },
		           other: {
		               price: 0
		           },
		           currency: ''
		       }
		   },
		   sunday: {
		       name: 'sunday',
		       index: 7,
		       number: 0,
		       date: null,
		       available: false,
		       rooms: {
		           single: {
		               price: 0
		           },
		           double: {
		               price: 0
		           },
		           triple: {
		               price: 0
		           },
		           other: {
		               price: 0
		           },
		           currency: ''
		       }
		   }
		},
		getMonthNameSpanish: _getMonthNameSpanish,
		getMonthNameEnglish: _getMonthNameEnglish,
		getDayOfWeek: _getDayOfWeek
	}
	//// **************************** CALENDAR AND DATE METHODS ***************************** //
	//// **************************** this is a really headache ***************************** //
	//// **************************** do not touch if you're not sure what are you doing..*** //
	
	
	 /**
	  * funcion que recupera la sesion
	  */
	 function recoverSession(callback) {
        //read the cookie
        try {
        	yto_session_service.currentSession(function (session) {
                //console.log('get session...',session);
                $scope.session = session;
                if (session != null && session.affiliate != null) {  
                    if (callback != null && angular.isFunction(callback)){
                        callback();
                    }
                } else {
                    if (callback != null && angular.isFunction(callback)){
                        callback();
                    }
                }
            });
        }
        catch (err) {
             if (callback != null && angular.isFunction(callback)){
                callback();
            }
            console.error(err);
        };
    };
    
    /**
     * funcion que obtiene el precio
     * si es un traveler, es el precio de la api
     * si es un affiliate, el precio de la api es el neto agencia, debemos sumarle la comision de la agencia para obtener el pvp agencia
     */
    $scope.getPrice = function(apiPrice) {
   		return tools_service.buildAffiliatePVPPrice(apiPrice, $scope.session.affiliate, "unique");
    }
	
	//THIS IS OK
	function buildAnEmptyCalendar() {

	   var today = new Date();

	   //var monthname = _getMonthNameEnglish(today.getMonth());
	   var monthname = _getMonthNameSpanish(today.getMonth());

	   $scope.calendar.currentmonthnumber = today.getMonth();
	   $scope.calendar.currentmonth = monthname;

	   var first = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0, 0);

	   var iterate = first;
	   var weekindex = 0;
	   var startflag = true;

	   for (var i = 1; i <= 31; i++) {

	       var theday = new Date(iterate.getFullYear(), iterate.getMonth(), iterate.getDate(), 0, 0, 0, 0);

	       var day = _getDayOfWeek(iterate.getDay());
	       var weekindex = getWeekOfMonth(iterate);
	       var week = _getWeekName(weekindex);

	       $scope.calendar[week][day].date = theday;
	       $scope.calendar[week][day].number = theday.getDate();
	       $scope.calendar[week][day].rooms = {
	           single: {
	               price: 0
	           },
	           double: {
	               price: 0
	           },
	           triple: {
	               price: 0
	           },
	           other: {
	               price: 0
	           },
	           currency: ''
	       }
	       //iterate the day
	       var inc = iterate.setDate(i);
	       iterate = new Date(inc);
	   }
	}
	function _reset_calendar() {
	   $scope.calendar.currentmonth = '';
	   $scope.calendar.currentmonthnumber = 0;
	   for (var i = 1; i < 7; i++) {
	       for (var d = 0; d < 7; d++) {
	           var day = _getDayOfWeek(d);
	           var week = _getWeekName(i);
	           $scope.calendar[week][day].date = null;
	           $scope.calendar[week][day].number = '';
	           $scope.calendar[week][day].available = false;
	           $scope.calendar[week][day].rooms = {
	               single: {
	                   price: 0
	               },
	               double: {
	                   price: 0
	               },
	               triple: {
	                   price: 0
	               },
	               other: {
	                   price: 0
	               },
	               currency: ''
	           }
	       }
	   }
	}

	//THIS IS OK
   	function buildAMonthCalendar(year, month) {

   		
   		
       var currentdate = new Date(year, month, 1, 0, 0, 0, 0);
      // var monthname = _getMonthNameEnglish(currentdate.getMonth());
       var monthname = _getMonthNameSpanish(currentdate.getMonth());

       $scope.calendar.currentmonthnumber = currentdate.getMonth();
       $scope.calendar.currentmonth = monthname;
       $scope.calendar.firstdaymonth = new Date(year, month, 1);

       var iterate = new Date(year, month, 1);
       var last = new Date(year, month, 1);
       last.setMonth(month + 1);

       weekindex = 0;
       var startflag = true;

       while (last > iterate) {
           var day = _getDayOfWeek(iterate.getDay());
           var weekindex = getWeekOfMonth(iterate);
           var week = _getWeekName(weekindex);

           $scope.calendar[week][day].date =
               new Date(
                   iterate.getFullYear(),
                   iterate.getMonth(),
                   iterate.getDate()
               );
           $scope.calendar[week][day].number = iterate.getDate();
           $scope.calendar[week][day].rooms = {
               single: {
                   price: 0
               },
               double: {
                   price: 0
               },
               triple: {
                   price: 0
               },
               other: {
                   price: 0
               },
               currency: ''
           }
           iterate.setDate(iterate.getDate() + 1);
           
       }
       
       //************************************************************************
       // Crear la estructura que almacenar al calendario para mostra en el front
       //************************************************************************       
   	   //console.log("property: ",$scope.calendar);
       $scope.calendarFormated = [];
   	    
   	    // for de semanas
  		for ( var property in $scope.calendar ) {
  			if(property == 'firstweek' || property == 'secondweek' || property == 'thirdweek' || property == 'fourthweek' || property == 'fifthweek' || property == 'sixthweek'){
  				//console.log("* week: ",property,' - ',$scope.calendar[property]);
  				
  				var auxVector = [];
  				var sixthWeekEmpty = false;
  				// for de dias
  				for ( var propertyDay in $scope.calendar[property] ) {
  					if(propertyDay == 'monday' || propertyDay == 'tuesday' || propertyDay == 'wednesday' || propertyDay == 'thursday' || propertyDay == 'friday' || propertyDay == 'saturday' || propertyDay == 'sunday'){
  						//console.log("* day: ",propertyDay,' - ',$scope.calendar[property][propertyDay]);
  						
  						// controlar que no pinte la 6 semana si esta no tiene ningun dia rellenado
  						if(!sixthWeekEmpty){
  							
	  						// comprobar que el primer dia de la sexta semana tenga valor
	  						if(property == 'sixthweek' && $scope.calendar[property][propertyDay].index==1 &&
	  								(!$scope.calendar[property][propertyDay].number || $scope.calendar[property][propertyDay].number == '')){
	  								
	  								//console.log("Vacio primera semana el primer dia");
	  								sixthWeekEmpty = true;	  								  							
	  						}
	  						else{
	  							auxVector.push($scope.calendar[property][propertyDay]);
	  						}
  						}  						
  					}
  				}
  				$scope.calendarFormated.push(auxVector);
  			}
  		}
  		//*********************************************************************************
  		//*********************************************************************************
       
	}

	function setAvailabilityForDay(date) {
	   //find the day in availability...
	   if (date) {
	       //find year...
	       var indexyear = _indexOfYear(date.getFullYear());
	       //which month: 
	       var monthname = _getMonthNameEnglish(date.getMonth());
	       //find day...
	       var indexday = _indexOfDay(date, $scope.product.availability[indexyear]);
	       if (indexday > -1) {
	           //we've found the day...
	           var av = $scope.product.availability[indexyear][monthname].availability[indexday];
	           //update the calendar...
	           //get possitions..
	           var day = _getDayOfWeek(date.getDay());
	           var weekindex = getWeekOfMonth(date);
	           var week = _getWeekName(weekindex);
	           $scope.calendar[week][day].available = av.available;
	           $scope.calendar[week][day].rooms = av.rooms;
	       }
	       else {
	           //this day is not in availability...
	           //nothing to be done...
	       }
	   }
	}

	function setAvailabilityInCalendar(year, month) {

	   if ($scope.product.availability != null && $scope.product.availability.length > 0) {
	       var start = new Date(year, month, 1);
	       var end = new Date(year, month, 1);
	       end.setMonth(start.getMonth() + 1);

	       var iterate = new Date(year, month, 1);
	       var indexyear = _indexOfYear(year);
	       if (indexyear > -1) {
	           //lets iterate...
	           while (iterate < end) {
	               //which
	               setAvailabilityForDay(iterate);
	               iterate.setDate(iterate.getDate() + 1);
	           }
	       }


	   }

	}

	function _indexOfYear(year) {
	   var index = -1;
	   if ($scope.product.availability != null && $scope.product.availability.length > 0) {
	       for (var i = 0; i < $scope.product.availability.length; i++) {
	           if ($scope.product.availability[i].year == year) {
	               index = i;
	               break;
	           }
	       }
	   }
	   return index;
	}
	function _indexOfDay(date, availyear) {
	   var index = -1;
	   var monthname = _getMonthNameEnglish(date.getMonth());
	   var avails = null;
	   if (availyear != null){
		   if (availyear[monthname] != null){
		   		avails = availyear[monthname].availability;
			}
		}

	   if (avails != null && avails.length > 0) {
	       for (var i = 0; i < avails.length; i++) {

	           if (avails[i].day == date.getDate()) {
	               index = i;
	               break;
	           }
	       }
	   }
	   return index;
	}
	function getDayEnabledClass(calendarday) {
	   if (calendarday.rooms.single.price > 0 |
	       calendarday.rooms.single.price > 0 |
	       calendarday.rooms.single.price > 0 |
	       calendarday.rooms.single.price > 0) {
	       return 'enabled';
	   }
	   else { return ''; }
	}
	function _getMonthNameSpanish(monthindex) {
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
	function _getMonthNameEnglish(monthindex) {
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
	function _getWeekName(weekindex) {
	   if (weekindex == 1) { return 'firstweek'; }
	   if (weekindex == 2) { return 'secondweek'; }
	   if (weekindex == 3) { return 'thirdweek'; }
	   if (weekindex == 4) { return 'fourthweek'; }
	   if (weekindex == 5) { return 'fifthweek'; }
	   if (weekindex == 6) { return 'sixthweek'; }
	}
	function _getDayOfWeek(dayindex) {
	   if (dayindex == 0) return 'sunday';
	   if (dayindex == 1) return 'monday';
	   if (dayindex == 2) return 'tuesday';
	   if (dayindex == 3) return 'wednesday';
	   if (dayindex == 4) return 'thursday';
	   if (dayindex == 5) return 'friday';
	   if (dayindex == 6) return 'saturday';

	}
	function getWeekOfMonth(adate) {
	   var first = new Date(adate.getFullYear(), adate.getMonth(), 1, 0, 0, 0, 0);
	   var iterator = first;
	   var week = 1;
	   for (var i = 1; i <= adate.getDate() ; i++) {
	       iterator.setDate(i);
	       if (adate.getDate() == iterator.getDate()) {
	           break;
	       }
	       if (iterator.getDay() == 0) {
	           //sunday..
	           week++;
	       }
	   }
	   return week;
	};

	//// **************************** CALENDAR AND DATE METHODS ***************************** //
	//// **************************** watch out what are you doing... *********************** //
	//// **************************** do not touch if you're not sure what are you doing..*** //
	//*************************** End New Availability Managing Methods...

	function _getNewAvailDay(date, available, pricesingle, pricedouble, pricetriple, priceother, currency) {
	   var day = {
	       date: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
	       available: available,
	       rooms: {
	           single: {
	               price: pricesingle
	           },
	           double: {
	               price: pricedouble
	           },
	           triple: {
	               price: pricetriple
	           },
	           other: {
	               price: priceother
	           },
	           currency: currency
	       }
	   }
	}

	function _getNewAvailForYear(year) {
	   var avail = {
	       name: year,
	       publishedDate: new Date(),
	       year: year,
	       January: {
	           availability: []
	       },
	       February: {
	           availability: []
	       },
	       March: {
	           availability: []
	       },
	       April: {
	           availability: []
	       },
	       May: {
	           availability: []
	       },
	       June: {
	           availability: []
	       },
	       July: {
	           availability: []
	       },
	       August: {
	           availability: []
	       },
	       September: {
	           availability: []
	       },
	       October: {
	           availability: []
	       },
	       November: {
	           availability: []
	       },
	       December: {
	           availability: []
	       }
	   }
	   return avail;

	}
	$scope.availablemonths = [];


	function _getAvailableMonth(year, month) {
	   var avmonth = null;
	   if ($scope.availablemonths) {
	       for (var i = 0; i < $scope.availablemonths.length; i++) {
	           if ($scope.availablemonths[i].year == year &&
	               $scope.availablemonths[i].monthindex == month) {
	               avmonth = $scope.availablemonths[i];
	               break;
	           }
	       }
	   }
	   return avmonth;
	}
	
	$scope.availablemonths = [];
	$scope.selectnewmonth = { year: new Date().getFullYear(), monthindex: new Date().getMonth() };
	$scope.newmonthselected = function (select) {
	   
	   _reset_calendar();
	   buildAMonthCalendar($scope.selectnewmonth.year, $scope.selectnewmonth.monthindex);
	   setAvailabilityInCalendar($scope.selectnewmonth.year, $scope.selectnewmonth.monthindex);
	}


   $scope.addmonth = function () {
       var d = new Date($scope.selectnewmonth.year, $scope.selectnewmonth.monthindex, 1);
       d.setMonth(d.getMonth() + 1);
       var m = _getAvailableMonth(d.getFullYear(), d.getMonth());
       
       if (m != null) {
           $scope.selectnewmonth = m;
       }

       _reset_calendar();
       buildAMonthCalendar($scope.selectnewmonth.year, $scope.selectnewmonth.monthindex);
       setAvailabilityInCalendar($scope.selectnewmonth.year, $scope.selectnewmonth.monthindex);
      // disableBeforeFirstAvailabilityCalendarDay($scope.bluidDateYear, $scope.bluidDateMonth, $scope.bluidDateDay);
   }


   $scope.setmonth = function (selectedDate) {
	selectedDate = new Date(selectedDate)
	   var m = _getAvailableMonth(selectedDate.getFullYear(), selectedDate.getMonth());
       if (m != null) {
           $scope.selectnewmonth = m;
       }

       _reset_calendar();
       buildAMonthCalendar($scope.selectnewmonth.year, $scope.selectnewmonth.monthindex);
       setAvailabilityInCalendar($scope.selectnewmonth.year, $scope.selectnewmonth.monthindex);
      // disableBeforeFirstAvailabilityCalendarDay($scope.bluidDateYear, $scope.bluidDateMonth, $scope.bluidDateDay);
   };


   $scope.removemonth = function () {
       var d = new Date($scope.selectnewmonth.year, $scope.selectnewmonth.monthindex, 1);
       d.setMonth(d.getMonth() - 1);
       var m = _getAvailableMonth(d.getFullYear(), d.getMonth());
       if (m != null) {
           $scope.selectnewmonth = m;
       }
       _reset_calendar();
       buildAMonthCalendar($scope.selectnewmonth.year, $scope.selectnewmonth.monthindex);
       setAvailabilityInCalendar($scope.selectnewmonth.year, $scope.selectnewmonth.monthindex);
       //disableBeforeFirstAvailabilityCalendarDay($scope.bluidDateYear, $scope.bluidDateMonth, $scope.bluidDateDay);
   }

   function _buildAvailableMonths(today) {
       //var today = new Date();
       var lastmonth = new Date(today.getFullYear() + 1, 11, 1, 0, 0, 0, 0);


       var iterator = new Date(today.getFullYear(), today.getMonth(), 1);
       var tt = true;
       while (lastmonth >= iterator) {
           var availmonth = {
               //monthname: _getMonthNameEnglish(iterator.getMonth()),
               monthname: _getMonthNameSpanish(iterator.getMonth()),
               monthindex: iterator.getMonth(),
               year: iterator.getFullYear(),
               //selectiontext: _getMonthNameEnglish(iterator.getMonth()) + ' ' + iterator.getFullYear()
               selectiontext: _getMonthNameSpanish(iterator.getMonth()) + ' ' + iterator.getFullYear()
           };

           if (tt) { $scope.selectnewmonth = availmonth; tt = false; }

           $scope.availablemonths.push(availmonth);
           iterator.setMonth(iterator.getMonth() + 1)
       }
   }

	$scope.selectedday = new Date();

	$scope.selectDay = function (day) {
		$scope.dateNoMatch = false;
		if (day.available){
			$scope.selectedday = day;
			$log.log("day",day);
			$scope.$emit('selectDay', day);
		} else {
			$log.log('day not available');
			$scope.$emit('dayNotAvailable');
		}
	};

	$scope.isSelected = function(day){
		if ($scope.selectedday === day && day.available){
			return true;
		} else{
			return false;
		}
	};

	$scope.bluidDate = new Date();
	$scope.bluidDateYear = new Date().getFullYear();
	$scope.bluidDateMonth = new Date().getMonth();
	$scope.bluidDateDay = new Date().getDate();
	$scope.dateNoMatch = false;
	
	
	/**
	 * inicializa el calendario con los precios por habitacion
	 */
	$scope.init = function(){
		$log.log('init calendar booking');
		// select date default
		var dateActual = new Date();
		var dateSelected = new Date();
		var minDate = new Date();
	    //
	    //
				
		if ($scope.dateSelectedServer == ""){
			$scope.dateSelectedServer = new Date();
	    } else{
	    	$scope.dateSelectedServer = new Date($scope.dateSelectedServer);
	    }
		// check if dateActualServer is date
		if (angular.isDate($scope.dateActualServer)){
			dateActual = $scope.dateActualServer;
		}
		// check if dateSelectedServer is date
		if (angular.isDate($scope.dateSelectedServer)){
			dateSelected = $scope.dateSelectedServer;
			//console.log ('dateSelected : ',dateSelected)
		} else if (angular.isDate($scope.dateActualServer)){
			dateSelected = $scope.dateActualServer;
			// apply release
			dateSelected.setDate(dateActual.getDate() + $scope.product.release);
		}
		
		// apply release
		minDate.setDate(dateActual.getDate() + $scope.product.release);
		
		var minYear = minDate.getFullYear();
		var minMonth = minDate.getMonth();
		var minDay = minDate.getDate();
		
		var dateSelectedYear = dateSelected.getFullYear();
		var dateSelectedMonth = dateSelected.getMonth();
		var dateSelectedDay = dateSelected.getDate();

		var _selectedDay = null;
				
		if ($scope.dateSelectedServer == 'Invalid Date'){
			_selectedDay = findFirstAvailabilityCalendarDay(minYear, minMonth, minDay);
		} else{ 
			_selectedDay = findFirstAvailabilityCalendarDay(dateSelectedYear, dateSelectedMonth, dateSelectedDay);
			//$log.log(">>_selectedDay :", _selectedDay);
		}
		var userDate = new Date();
		if (_selectedDay != null){
			 userDate = new Date(_selectedDay.availabilityitem.date);
		} else {
			$scope.setmonth(dateSelectedMonth);
		}
		// var userDate = new Date(_selectedDay.availabilityitem.date);
		var userDateYear = userDate.getFullYear();
		var userDateMonth = userDate.getMonth();
		var userDateDay = userDate.getDate();

		if ( userDateYear == dateSelectedYear && userDateMonth == dateSelectedMonth ){ //&& userDateDay == dateSelectedDay
			console.log('same date')
		} else if ($scope.dateSelectedServer == 'Invalid Date'){
			console.log('no search date')
		} else{
			$scope.dateNoMatch = true;
		}

		$scope.bluidDate = new Date(minYear,minMonth,minDay);

		$scope.bluidDateYear = $scope.bluidDate.getFullYear();
		$scope.bluidDateMonth = $scope.bluidDate.getMonth();
		$scope.bluidDateDay = $scope.bluidDate.getDate();


		_buildAvailableMonths($scope.bluidDate); // build del combo de meses
		$scope.setmonth(userDateMonth);

		_reset_calendar(); //reinicia el calendario
		// null dates start for relase date
		buildAMonthCalendar($scope.bluidDateYear, $scope.bluidDateMonth); //monta el calendario segun un mes/año
		setAvailabilityInCalendar($scope.bluidDateYear, $scope.bluidDateMonth);//montaje de la disponibilidad sobre el calendario. 
		// select date default

		disableBeforeFirstAvailabilityCalendarDay($scope.bluidDateYear, $scope.bluidDateMonth, $scope.bluidDateDay);

		// console.log ('dateSelected : ',dateSelected);

		if (_selectedDay != null){
			console.log ('dateSelected ',dateSelected);
			$scope.setmonth(dateSelected);
			// uncoment to select default date
			$scope.selectDay(_selectedDay.calendarday);
		} else{
			$scope.setmonth(dateSelected);
		}
	};

	function findFirstAvailabilityCalendarDay(year, month, day) {
	    //Return Object { calendarday , availability }
	    var result = null;
	    if ($scope.product.availability != null && $scope.product.availability.length > 0) {
	        var start = new Date(year, month, day);
	        var end = new Date(year, month, 1);
	        end.setMonth(start.getMonth() + 12);
   
	        var iterate = new Date(year, month, day);
	        var indexyear = _indexOfYear(year);
	        if (indexyear > -1) {
	            //lets iterate...
	            while (iterate < end) {
	                //which
	                var indexyear = _indexOfYear(iterate.getFullYear());
	                //which month: 
	                var monthname = _getMonthNameEnglish(iterate.getMonth());
	                //find day...
	                var indexday = _indexOfDay(iterate, $scope.product.availability[indexyear]);
	                if (indexday > -1) {
	                    var av = $scope.product.availability[indexyear][monthname].availability[indexday];
	                    
	                    var day = _getDayOfWeek(iterate.getDay());
	                    var weekindex = getWeekOfMonth(iterate);
	                    var week = _getWeekName(weekindex);
	                    
	                    var calendaritem = $scope.calendar[week][day];
                        
	                    result = {
	                        calendarday: calendaritem,
                            availabilityitem: av
	                    }
                        //Exit loop
	                    break;

	                }
                    //next
	                iterate.setDate(iterate.getDate() + 1);
	            }
	        }

	    }
	    return result;
	}
	function disableBeforeFirstAvailabilityCalendarDay(year, month, day) {

		if ($scope.product.availability != null && $scope.product.availability.length > 0) {

	        var start = new Date(year, month, 1);
	        var end = new Date(year, month, day);
	        var iterate = new Date(year, month, 1);
	        var indexyear = _indexOfYear(year);
 	        if (indexyear > -1) {
	            //lets iterate...
	            var i = 0;
	            while (iterate < end) {
	                //which
	                var indexyear = _indexOfYear(iterate.getFullYear());
	                //which month: 
	                var monthname = _getMonthNameEnglish(iterate.getMonth());
	                //find day...
	                var indexday = _indexOfDay(iterate, $scope.product.availability[indexyear]);
	                
	                    var av = $scope.product.availability[indexyear][monthname].availability[indexday];
	                    var day = _getDayOfWeek(iterate.getDay());
	                    var weekindex = getWeekOfMonth(iterate);
	                    var week = _getWeekName(weekindex);
	                    var calendaritem = $scope.calendar[week][day];
	                    if (av){
	                    	av.available = false;	
	                    }
	                    $scope.calendar[week][day].available = false;
	                    $scope.calendar[week][day].rooms.double.price = 0;

	                iterate.setDate(iterate.getDate() + 1);
	            }
	        }
	    }

	}
	//
	$scope.popoverRooms ={
		show : false,
		triple :{
			price : 0
		},
		single :{
			price : 0
		},
		currency : {}
	};
	//
	$scope.openPopOver = function($event, element){
		if (element.available){
			//$log.log($event)

			//var scope = angular.element($event.target).scope();
			//var ele = $event.target;

			
			if ($event.offsetX == undefined) {
				//FIREFOX FIX, offsetX does not work in ff
			    var target = $event.target || $event.srcElement,
        		rect = target.getBoundingClientRect(),
        		ffoffsetX = $event.clientX - rect.left,
        		ffoffsetY = $event.clientY - rect.top;

				var xpos = $event.layerX - ffoffsetX - 50 + 'px';
				var ypos = $event.layerY - ffoffsetY + 75 + 'px';	
				//console.log(ffoffsetX);
			} else {
				//most of other browsers
				var xpos = $event.layerX - $event.offsetX - 50 + 'px';
				var ypos = $event.layerY - $event.offsetY + 75 + 'px';	
				//console.log($event.offsetX);
			}
			
			//console.log("coords", xpos + ypos);

			angular.element(document.querySelector('#roomTypesPop')).css('position', 'absolute').css('top', ypos).css('left', xpos);
			//scope.css('position', 'absolute').css('top', $event.pageY-150+'px').css('left', $event.pageX-150+'px');
			
			if (element.rooms != null){
				$scope.popoverRooms.triple.price = element.rooms.triple.price;
				$scope.popoverRooms.single.price = element.rooms.single.price;
				$scope.popoverRooms.currency = element.rooms.currency;
				if ($scope.popoverRooms.triple.price > 0 || $scope.popoverRooms.single.price > 0){
					$scope.popoverRooms.show = true;
				} else{
					$scope.popoverRooms.show = false;
				}
			}
		}

	}
	$scope.closePopOver = function(){
			$scope.popoverRooms.show = false;
	}

	// exect
	//$scope.init();
	$scope.$on('loadDataComplete', function(){
		
		if($scope.debug)
			$log.log ('data load end booking calendar');
		if($scope.debug)
			$log.log('bookingCalendarCtrl : product ', $scope.product);
		
		// recuperar sesion e inicializar
	    recoverSession(function() { 
	    	console.log("session recuparada:",$scope.session);
		  $scope.init();
        });
		
	});
	
	/**
	 * inicializa el calendario
	 */
	$scope.$on('initCalendar', function(){
				
		// tengo un fee modificado para ese afiliado, lo sustituyo por el suyo
		if($scope.feeEdited !== null && $scope.feeEdited!= undefined && $scope.feeEdited != ''){
			console.log(' $scope.feeEdited (calendar): ',			 $scope.feeEdited);            
			$scope.session.affiliate.fees.unique = Number($scope.feeEdited);
			console.log("fee: ",$scope.session.affiliate.fees);
			console.log("$scope.newDateFee: ",$scope.newDateFee);
			
			//si hay fecha seleccionada la copio par ainicializar el calendario
			if($scope.newDateFee != null){
				$scope.dateSelectedServer = $scope.newDateFee; 
			}
			
			
		}
		
		$scope.init();
	});


	// calendario formateado
	$scope.calendarFormated = [];
	$scope.session = {};


}]);
