/**
 * @ngdoc service
 * @name service.bookinghelpers
 * @requires $http
 * @requires $location
 * @requires $log
 * @requires $window
 * @requires tools_service
 * @requires toaster
 * @requires destinations_service  
 * @description
 * Auxiliars functions to build or show userquerys/tailormade requests
 */
app.service('bookinghelpers', function (
    $http,
    $location,
    $log,
    $window,
    tools_service,
    toaster,
    destinations_service,
    $httpParamSerializerJQLike) {
    'use strict';
    return {
        downloadAffiliateProforma : _downloadAffiliateProforma,
        downloadAffiliateContract : _downloadAffiliateContract, 
        downloadSummaryBooking  :   _downloadSummaryBooking,
        downloadAffiliateBudget :   _downloadAffiliateBudget,
        findcounty :                _findcounty,
        get_age :                   _get_age,
        getTotalPaid :              _getTotalPaid,
        getTotalAmountPaid :        _getTotalAmountPaid,        
        getRestForPaid :            _getRestForPaid,
        getActualProfit :           _getActualProfit,
        getAmountFromNet:			_getAmountFromNet,
        getTotal :                  _getTotal,        
        getHolderName :             _getHolderName,
        getDistributionRoom :       _getDistributionRoom,
        getTotalPax :               _getTotalPax,
        getTotalPaxfromRoomDist :   _getTotalPaxfromRoomDist,
        getTotalPaxInRoomroomDistribution : _getTotalPaxInRoomroomDistribution,
        distributeImportIntoDistribution: _distributeImportIntoDistribution,
        getPricePerson :            _getPricePerson,
        getPaxNumber :              _getPaxNumber,
        getPvpAffilitaFromRoomType : _getPvpAffilitaFromRoomType,
        getAllPvpAffilitaFromRoomType :_getAllPvpAffilitaFromRoomType,
        getAllAmountFromRoomType:   _getAllAmountFromRoomType,
        getAmountFromRoomType :     _getAmountFromRoomType,
        getNationalities :          _getNationalities,
        getNetAffilitaFromRoomType : _getNetAffilitaFromRoomType,
        getPaxInRoom :              _getPaxInRoom,
        getPvpPerson :              _getPvpPerson,
        getPvpTotal :               _getPvpTotal,
        getAmountTotalDmc :         _getAmountTotalDmc,
        getAmountTotalUser:         _getAmountTotalUser,       
        getPricePersonDay :         _getPricePersonDay,
        getTotalPaidAffiliate :     _getTotalPaidAffiliate,
        hasTransport :              _hasTransport,
        isOldBooking :              _isOldBooking,
        isRoomInDistribution :      _isRoomInDistribution,
        productNeedFlights :        _productNeedFlights,
        showRoomNameSpanish :       _showRoomNameSpanish,
        showHotelCats :             _showHotelCats,
        showTagsArray :             _showTagsArray,
        updateRoomDistributionPrice : _updateRoomDistributionPrice,
        updateRoomDistributionAmount:_updateRoomDistributionAmount,
        verifiedPay :               _verifiedPay,
        getIatas :                  _getIatas
    };

    
    //devuleve la edad del pasajero en años 
    //requiere fecha de nac y fecha actual
     function _get_age(born, now) {
        if (now === undefined){
            now = new Date();
        }
        if(born=== undefined){
        	return 0;
        }
        var born = new Date(born);
        var birthday = new Date(now.getFullYear(), born.getMonth(), born.getDate());
        if (now >= birthday) 
            return now.getFullYear() - born.getFullYear();
        else
            return now.getFullYear() - born.getFullYear() - 1;
    }

     function _findcounty(countrycode, nationalities) {
         if (nationalities != null && nationalities.length > 0) {
           return _.find(nationalities, function (nat) {
               return (countrycode.toLowerCase() == nat.countrycode.toLowerCase()) || (countrycode.toLowerCase() == nat.slug.toLowerCase());
           });
        
        //   for (var i = nationalities.length - 1; i >= 0; i--) {
	       //     if (nationalities[i].countrycode == countrycode){                
	       //         return nationalities[i];
        //        }
	       //}
	   }
    }

    /**
     * @ngdoc method
     * @name showTagsArray
     * @methodOf service.bookinghelpers
     * @description
     *
     * funcion que devuelve los tags validos partiendo de un array de tags
     * @param  {object} tags array of tags
     * @return {object}       the valid tags
     */
   function _showTagsArray(tags) {
	   var finaltags = [];    
		for( var i=0, len = tags.length; i < len; i++){
			if(tags[i]!=null){
				finaltags.push(tags[i].label);
			}
		}	
		return finaltags;
   }
   
  

    // trae las nacionalidades 
    function _getNationalities( callback){
        var nationalitiesUrl = $location.protocol() + '://' + location.host + '/data/nationalities.json';
        
        $http.get(nationalitiesUrl)
        .then(function(response) {
            if (response.data !== null){
                $log.log('nationalities', response.data);                   
                if (angular.isFunction(callback)){
                        callback(response.data);
                    }
            } else {
                $log.error("error getting nationalities");
                throw 'error getting nationalities';
            }

        }, function(response) {
            $log.error("error getting nationalities");
            throw 'error getting nationalities';
        });
    }
    
    
    // trae los iatas 
    function _getIatas( callback){
    	
    	var iataUrl = $location.protocol()+'://'+location.host+'/iata/getAll';//new data continent
    	
		$http.get(iataUrl)
		.then(function(response) {
			if (response.data != null){
				
				$log.log('iatas', response.data);
				callback(response.data);
				
			} else {    				
				$log.error("error getting iatas");
				throw 'error getting iatas';	
			}

	    }, function(response) {	    	
			$log.error("error getting iatas");
			throw 'error getting iatas';
		});		
    }

    // devuelve true si tiene todos los pagos
    // verificados (tpv o transferencia verficada)
    // 
    function _verifiedPay(booking) {
        if (booking != null) {
            if (booking.status != 'transfer1-2'
                    && booking.status != 'transferok2-2') {
                return true;
            } else if (booking.payStatus != null
                    && booking.payStatus.length == 1) {
                if (booking.payStatus[0].receiptNumber != null) {
                    return true;
                }
            } else if (booking.payStatus != null
                    && booking.payStatus.length == 2) {
                if (booking.payStatus[1].receiptNumber != null) {
                    return true;
                }
            }
        }
        return false;
    }

    // devuelve true si el producto tiene vuelos internos
    function _productNeedFlights(itinerary){
        if (itinerary != undefined &&
            itinerary != null){
            for (var i = 0; i < itinerary.length; i++) {
              if (itinerary[i].needflights){
                return true;
              }
            }
            return false;
        } else {
            return false;
        }
    }

    /**
     * funcion que devuelve el porcentaje pagado
     */
    function _getTotalPaid(booking) {
        if(booking != null && 
            booking.payStatus !=null &&
            booking.payStatus.length>0){
            var total = 0;
            for(var i=0; i < booking.payStatus.length; i++ ){ 
            	if(booking.payStatus[i].receiptNumber != null){
            		total+=booking.payStatus[i].payment;           
            	}
            }
            return total;
        }           
    }

    
    /**
     * funcion que el precio pvpaffiliado de la habitacion del tipo indicado
     */
    function _getPvpAffilitaFromRoomType(roomDistribution, roomCode) {
    	
        for (var it = 0; it < roomDistribution.length; it++) {
            if (roomDistribution[it].roomCode == roomCode) {
                return roomDistribution[it].pvpAffiliatePerPax.exchange.value;
            }            
        }    
        return 0;
    }
    
    /**
     * de vuelve la estructura pvpAffiliatePerPax de la distribucion si cincide el tipo de habitacion
     */
    function _getAllPvpAffilitaFromRoomType(roomDistribution, roomCode) {
    	
        for (var it = 0; it < roomDistribution.length; it++) {
            if (roomDistribution[it].roomCode == roomCode) {
                return roomDistribution[it].pvpAffiliatePerPax;
            }            
        }    
        return null;
    }
    
    
    /**
     *  de vuelve la estructura pricePerPax de la distribucion si cincide el tipo de habitacion
     */
    function _getAllAmountFromRoomType(roomDistribution, roomCode) {
        for (var it = 0; it < roomDistribution.length; it++) {
            if (roomDistribution[it].roomCode == roomCode && roomDistribution[it].pricePerPax.exchange.value!= null && roomDistribution[it].pricePerPax.exchange.value>0) {
                return roomDistribution[it].pricePerPax;
            }            
        }    
        return null;
    }
    
    /**
     * funcion que el precio neto agencia / pvp (campo priceperpax / amount)
     */
    function _getAmountFromRoomType(roomDistribution, roomCode) {
    	if(roomDistribution!=null ){
	        for (var it = 0; it < roomDistribution.length; it++) {
	            if (roomDistribution[it].roomCode == roomCode && roomDistribution[it].pricePerPax.exchange.value!= null && roomDistribution[it].pricePerPax.exchange.value>0) {
	                return roomDistribution[it].pricePerPax.exchange.value;
	            }            
	        }    
    	}
        return 0;
    }
    
    
    /**
     * funcion que el precio neto agencia de la habitacion del tipo indicado
     */
    function _getNetAffilitaFromRoomType(roomDistribution, roomCode) {
    	
        for (var it = 0; it < roomDistribution.length; it++) {
            if (roomDistribution[it].roomCode == roomCode) {
                return roomDistribution[it].pricePerPax.exchange.value;
            }            
        }    
        return 0;
    }
    

    
    
    /**
     * funcion que actualiza el tipo de habitacion deseada con el nuevo pvp de afiliado
     * @ param pvp, nuevo pvp de afiliado en moneda del ususrio
     */
    function _updateRoomDistributionPrice(roomDistribution, roomCode, pvp) {
    	for (var it = 0; it < roomDistribution.length; it++) {
            if (roomDistribution[it].roomCode == roomCode) {            	
                
            	var newPvp = Number(pvp);            	
            	var oldPvpDollar = Number(roomDistribution[it].pvpAffiliatePerPax.value);
            	var oldPVPEur = Number(roomDistribution[it].pvpAffiliatePerPax.exchange.value);
            	            	            	
                //actualizar el valor en la moneda del dmc
            	roomDistribution[it].pvpAffiliatePerPax.value = newPvp * oldPvpDollar / oldPVPEur;
            	
            	// actualizar el valor en la moneda del user (euros)
            	roomDistribution[it].pvpAffiliatePerPax.exchange.value = newPvp;            	
            }            
        }        
    }
    
    
    
    /**
     * funcion que actualiza el tipo de habitacion deseada con el nuevo amount,    
     */
    function _updateRoomDistributionAmount(roomDistribution, roomCode, amount,totalAmount) {
    	for (var it = 0; it < roomDistribution.length; it++) {
            if (roomDistribution[it].roomCode == roomCode) {            	
                
            	var newAmount = Number(amount);            	
            	var oldAmountDollar = Number(roomDistribution[it].pricePerPax.value);
            	var oldAmountEur = Number(roomDistribution[it].pricePerPax.exchange.value);
            	 
            	//****************************************************************
            	// actualizar el nuevo importe en la divisa de dmc y en la de user
            	//****************************************************************
            	// si no tenia valor antes, recurro a la regla de tres para el cambio usando el importe total original
            	if(oldAmountDollar == 0){
                	roomDistribution[it].pricePerPax.value = newAmount * totalAmount.value / totalAmount.exchange.value;
            	}
            	else{
            		//actualizar el valor en la moneda del dmc
                	roomDistribution[it].pricePerPax.value = newAmount * oldAmountDollar / oldAmountEur;	
            	}                
            	
            	// actualizar el valor en la moneda del user (euros)
            	roomDistribution[it].pricePerPax.exchange.value = newAmount;            	
            }            
        }        
    }
    
    /**
     * funcion que actualiza el tipo de habitacion deseada con el nuevo pvp de afiliado
     * @ param pvp, nuevo pvp de afiliado en moneda del ususrio
     */
    function _updateRoomDistributionPrice(roomDistribution, roomCode, pvp) {
    	for (var it = 0; it < roomDistribution.length; it++) {
            if (roomDistribution[it].roomCode == roomCode) {            	
                
            	var newPvp = Number(pvp);            	
            	var oldPvpDollar = Number(roomDistribution[it].pvpAffiliatePerPax.value);
            	var oldPVPEur = Number(roomDistribution[it].pvpAffiliatePerPax.exchange.value);
            	            	            	
                //actualizar el valor en la moneda del dmc
            	roomDistribution[it].pvpAffiliatePerPax.value = newPvp * oldPvpDollar / oldPVPEur;
            	
            	// actualizar el valor en la moneda del user (euros)
            	roomDistribution[it].pvpAffiliatePerPax.exchange.value = newPvp;            	
            }            
        }        
    }
    
    
    
    /**
     * funcion que devuelve el total pagado y validado por OMT
     */
    function _getTotalAmountPaid(booking) {
        if(booking != null && booking.payStatus !=null && booking.payStatus.length>0){
            var total = 0;
            for(var i=0; i < booking.payStatus.length; i++ ){
            	if( booking.payStatus[i].receiptNumber != null){
            		total+=booking.payStatus[i].amount.exchange.value;
            	}
            }
            return total.toFixed(2);
        }           
    }
    
    // devuelve el monto neto pagado
    function _getTotalPaidAffiliate(booking){
        var netTotal = 0;
        if(booking != null && booking.payStatus !=null && booking.payStatus.length>0){
            for(var i=0; i < booking.payStatus.length; i++ ){
                netTotal+=booking.payStatus[i].payment;
            }
        }
        return netTotal;
    }

    /**
     * funcion que devuelve el resto que queda por pagar o 
     * que no esta validado por omt
     * tiene en cuenta los vuelos
     */
    function _getRestForPaid(booking) {
        if(booking != null && booking.payStatus !=null && booking.payStatus.length>0){
            var total = 0;
            for(var i=0; i < booking.payStatus.length; i++ ){
            	if(booking.payStatus[i].receiptNumber != null){
            		total+=booking.payStatus[i].amount.exchange.value;
            	}
            }
            total= total.toFixed(2);
            
            // si tiene vuelos
            if(booking.flights && booking.amountflights){
            	return (booking.amount.exchange.value + booking.amountflights.exchange.value -total).toFixed(2);
            }
            // si no tiene vuelos
            else{
            	return (booking.amount.exchange.value-total).toFixed(2);
            }
        }
        else if (booking != null && booking.amount != null && booking.amount.exchange != null ){
        	// si tiene vuelos
            if(booking.flights && booking.amountflights){
            	return (booking.amount.exchange.value + booking.amountflights.exchange.value -total).toFixed(2);
            }
            else{
            	return booking.amount.exchange.value;	
            }
        	
        }
        return 0;
    }
    /**
     * funcion que devolvera si una reserva esta ya disfrutada
     */
    function _isOldBooking(booking){
        //par acomprobar que tiene el formato correcto de fecha de fin
        if(booking!=null && booking.end!=null && booking.end.year!=null){
            var actualDate = new Date();            
            var fechaFin = new Date(booking.end.year,booking.end.month,booking.end.day);
            if (fechaFin.valueOf() < actualDate.valueOf()){                 
                return true;
            }
        }
        return false;
    }
    /**
     * funcion que suma el total de los pagos recibidos y VALIDADOS
     */
    function _getTotal (payStatus){           
        var total = 0;
        if(payStatus!=null){
            for(var i = 0; i < payStatus.length; i++){
            	if(payStatus[i].receiptNumber != null){
            		total += payStatus[i].payment;
            	}
            }
        }
        return total;
    }

    /**
    * funcion que devovlera la composicion de una habitaicon indicada
    * devolvera el numero de adultos y la edad de cada uno en una cadena de texto
    * 
    * @return "2 adults  30 years, 30 years"
    * @return "2 adultos  30 años, 30 años"
    */
    //si quiero que muestre la edad de los pax age tiene que ser true
    function _getDistributionRoom(room, age){
        var result="";
        if(room.paxList!=null && room.paxList.length>1){
            result+=room.paxList.length+" adultos ";
        }
        else{               
            result+=room.paxList.length+" adulto ";
        }

        if(age===true){
            for(var pax=0; pax < room.paxList.length; pax++){               
                
                var date = new Date(room.paxList[pax].birdthDate);              
                var newDate = new Date();       
                
                var years = _get_age(date, new Date());
                            
                result+= "("+years+" años)";
                if(pax < room.paxList.length-1){
                    result+= ", ";
                }
                else{
                    result+= " ";
                }
                    
            }
        }
        
        return result;
    }


    /**
     * returns number of pax of roomDistribution
     * @param  {object} roomDistribution [description]
     * @return {number}                  [description]
     */
    function _getTotalPaxInRoomroomDistribution(roomDistribution){
        var numberPax = 0;
        for (var it = 0; it < roomDistribution.length; it++) {
            if (roomDistribution[it].paxList != null) {
                for (var p = 0; p < roomDistribution[it].paxList.length; p++) {
                    numberPax++;
                }
            }
            
        }
        return numberPax;
    }

    /**
     * Devuelve true si la distribucion contiene una habitacion de ese tipo
     * @param  {object} roomDistribution [description]
     * @return {string}     roomType             [tipo de habitaicon]
     */
    function _isRoomInDistribution(roomDistribution,roomType){
        var numberPax = 0;
        for (var it = 0; it < roomDistribution.length; it++) {
            if (roomDistribution[it].roomCode == roomType) {
                return true;
            }            
        }
        return false;
    }
    /**
     * funcion que devuelve el total de pax de la reserva con el formato:
     * they are 2 pax: 2 adults o son 2 pax: 2 adultos
     */
    function _getTotalPax(booking, onlyInfo, lang){
        var result = '';
        if (booking != null && booking.roomDistribution != null && booking.roomDistribution.length > 0) {           
            result = _getTotalPaxfromRoomDist(booking.roomDistribution, onlyInfo, lang);
        }
        return result;
    };


    function _getTotalPaxfromRoomDist(roomDistribution, onlyInfo, lang){

        var lang = lang || 'es';
        lang = lang.toLowerCase();
        var result = "";
        
        var totalPax = 0;
        var numAdult = 0;
        var numChild = 0;
        var numBaby = 0;

        for (var it = 0; it < roomDistribution.length; it++) {
            if (roomDistribution[it].paxList != null) {
                for (var p = 0; p < roomDistribution[it].paxList.length; p++) {
                    totalPax++;
                    if (roomDistribution[it].paxList[p].typePax != null) {
                        if (roomDistribution[it].paxList[p].typePax == "adult") {
                            numAdult++;
                        }
                        if (roomDistribution[it].paxList[p].typePax == "child") {
                            numChild++;
                        }
                        if (roomDistribution[it].paxList[p].typePax == "baby") {
                            numBaby++;
                        }
                    }
                }
            }
            
        }
        
        result += totalPax;
        var prefix = (lang == "es")?"Son " : "they are ";
        var straduls = (lang == "es")?" adultos" : " adults";
        var stradul = (lang == "es")?" adulto" :" adult";
        var strkids = (lang == "es")?" niños":" childs";
        var strkid = (lang == "es")?" niño":" child";
        var strbbs = (lang == "es")?" bebes" : " babys";
        var strbb = (lang == "es")?" bebé" : " baby";
        //recorrer el tipo de pax si se ha introducido en bd
        if (numAdult > 0 || numChild > 0 || numBaby > 0) {
            if (numAdult > 0) {
                if (numAdult > 1) {
                    result += " pax: " + numAdult + straduls;
                }
                else {
                    result += " pax: " + numAdult + stradul;
                }
            }
            if (numChild > 0) {
                if (numChild > 1) {
                    result += ", " + numChild + strkids;
                }
                else {
                    result += ", " + numChild + strkid;
                }
            }
            if (numBaby > 0) {
                if (numBaby > 1) {
                    result += ", " + numBaby + strbbs;
                }
                else {
                    result += ", " + numBaby + strbbs;
                }
            }
        }
        //si no se introdujo el tipo de pax en bd, ponemos todos adultos
        else {
            if (totalPax > 1)
                result += " pax: " + totalPax + straduls;
            else
                result += " pax: " + totalPax + stradul;
        }

        if (onlyInfo != null && onlyInfo == true) {
            result = prefix+result;
        }
        return result;
    }
    

    /**
     * obtiene el precio por persona
     */
    function _getPricePerson(booking){
        var totalPax = 0;
        if(booking!=null && booking.roomDistribution!=null){
            for(var it=0; it < booking.roomDistribution.length; it++){
                totalPax+=booking.roomDistribution[it].paxList.length;
            }
            var total = booking.amount.exchange.value/totalPax;
            return total.toFixed(2);             
        }
        return 0;
    }

    /**
     * obtiene la cantidad total de pax
     */
    function _getPaxNumber(booking){        
        var totalPax = 0;
        if(booking!=null && booking.roomDistribution!=null){
            totalPax = _getTotalPaxInRoomroomDistribution(booking.roomDistribution);
        }
        return totalPax;
    }
    
    /**
     * obtiene la cantidad total de pax en una habitación
     */
    function _getPaxInRoom(roomtype, booking){
        var totalPax = 0;
        if(booking!=null && booking.roomDistribution!=null){
            for(var it=0; it < booking.roomDistribution.length; it++){
                if (booking.roomDistribution[it].roomCode == roomtype){
                    totalPax+=booking.roomDistribution[it].paxList.length;
                }
            }           
            return totalPax;             
        }
        return totalPax;
    };


    /**
     * obtiene el pvp final por persona
     */
    function _getPvpPerson(booking){
        var pvpPax = 0;
        var totalPax = 0;
        if(booking!=null && booking.roomDistribution!=null){
            for(var it=0; it < booking.roomDistribution.length; it++){
                totalPax+=booking.roomDistribution[it].paxList.length;
            }
            var total = booking.pvpAffiliatePerPax.exchange.value/totalPax;
            
            return total.toFixed(2);             
        }
        return 0;
    }

    /**
     * obtiene el precio por persona (de la divisa del usuario exchange)
     */
    function _getPvpTotal(roomDistribution){
        var total = 0;
        if(roomDistribution!=null){
            for(var it=0; it < roomDistribution.length; it++){
                total+=(roomDistribution[it].paxList.length * roomDistribution[it].pvpAffiliatePerPax.exchange.value);
            }           
            return Math.round(total);            
        }
        return 0;
    }

    
    /**
     * obtiene el amount (neto agencia /pvp) total en la divisa del dmc
     */
    function _getAmountTotalDmc(roomDistribution){
        var total = 0;
        if(roomDistribution!=null){
            for(var it=0; it < roomDistribution.length; it++){
                total+=(roomDistribution[it].paxList.length * roomDistribution[it].pricePerPax.value);
            }           
            return Math.round(total);            
        }
        return 0;
    }
    
    /**
     * obtiene el amount (neto agencia /pvp) total en la divisa del usuario
     */
    function _getAmountTotalUser(roomDistribution){
        var total = 0;
        if(roomDistribution!=null){
            for(var it=0; it < roomDistribution.length; it++){
            	 total+=(roomDistribution[it].paxList.length * roomDistribution[it].pricePerPax.exchange.value);
            }           
            return Math.round(total);            
        }
        return 0;
    }
    
    /**
     * obtiene el precio por persona y por dia
     */
    function _getPricePersonDay(dmcproduct, booking){
        var totalPax = _getPricePerson(booking);
        if(dmcproduct!==null && dmcproduct.itinerary!==null){
            return (totalPax/dmcproduct.itinerary.length).toFixed(2);    
        }
        return 0;
    }
    
    

    /***
     * funcion que el importe total, partiendo de un neto mas una comision 
     * la forumal correcta es pvp = neto / (1 -fee)
     */

    function _getAmountFromNet(netPrice, commission){
        var net = netPrice || 0;
        var comm = commission || 0;
        return Math.round(net / (1 - (comm / 100)));
    	//if(netPrice!= null && commission!=null){    		
    	//	return  Math.round(netPrice / (1 - (commission/100)));
    	//}
     //   return 0;
    }

    
    /**
     * funcion que dado un importe nuevo (neto o pvp) distribuye equitatimvamente en la distribución el incremento o decremento de este
     * 
     */
    function _distributeImportIntoDistribution(newImport, oldImport,roomDistribution,isPvp){
    	
    	console.log("-new value: ",newImport);
    	console.log("-old value: ",oldImport);
    	var auxDistribution = [];
    	angular.copy(roomDistribution, auxDistribution);
    	    	
		// obtener la variacion del importe
		var diff = newImport - oldImport;					
		
		// obtener el total de pax de la reserva
		var paxNumber = _getTotalPaxInRoomroomDistribution(auxDistribution);
		console.log("-Total pax: ",paxNumber);
		
		// obtener la diferencia a anadir a cada pax
		var diffPerPax = diff/paxNumber;	
		
		diffPerPax = Math.round(diffPerPax);
		console.log("-diferencia para cada pax redondeada: ",diffPerPax);
		
		// aplicar la diferencia a cada habitacion (roomdistribution)
		for(var itR = 0; itR < auxDistribution.length; itR++){

			// si es pvp afiliado
			if(isPvp){
				var pvpPerPax = Number(auxDistribution[itR].pvpAffiliatePerPax.exchange.value);
				auxDistribution[itR].pvpAffiliatePerPax.exchange.value =   pvpPerPax + Number(diffPerPax);
			}
			//si es neto agencia / pvp
			else{
				// actualizo el amount en la divisa del usuario
				var amountExchangePerPax = Number(auxDistribution[itR].pricePerPax.exchange.value);				 
				auxDistribution[itR].pricePerPax.exchange.value =   amountExchangePerPax + Number(diffPerPax);
				
				//actualizo el amount en la divisa del dmc
				auxDistribution[itR].pricePerPax.value =   Math.round((auxDistribution[itR].pricePerPax.value * auxDistribution[itR].pricePerPax.exchange.value)/amountExchangePerPax);			
			}			
		}
		return auxDistribution;
    }
	
    
    
    /***
     * funcion que obtiene el fee actual (no rescatado de affiliate.fees, si no del valor obtenido del pvp y netoagencia de la booking)
     * para ser 100 exacto
     * la formula es (100*pvp/neto) - 100 INCORRECTA -->ANTIGUA
     * la forumal correcta es pvp = neto / (1 -fee)
     * de la que se obtiene que fee = (1- (neto/pvp))*100
     */

    function _getActualProfit(pvpAffiliate,netoAffiliate){
    	if(pvpAffiliate!= null && netoAffiliate!=null){
//    		console.log("BH pvp: ",pvpAffiliate);
//    		console.log("BH net: ",netoAffiliate);
    		return  Math.round((1 - (netoAffiliate/pvpAffiliate)) * 100);
    	}
        return 0;
    }

    /**
     * devuelve el nombre en espanol de las habiticiones
     */
    function _showRoomNameSpanish(code) {
        switch(code) {
            case 'single':
                return 'individual';
            case 'double':
                return 'doble';
            case 'triple':
                return 'triple';
            case 'quad':
                return 'cuadruple';
            case 'other':
                return 'cuadruple';
            default:
                return null;
        }
     }

    /**
    * funcion que devovlera el nombre del primer pasajero
    * @return "Gómez Juan"
    */
    function _getHolderName(room) {
        var pax = '';
        var item = room[0].paxList[0];
        pax = item.lastName+" "+item.name;
        return pax;
    }


    // Get unique hotel categories from itinerary
    function _showHotelCats(itinerary, lang) {
        var cats = [];
        var day = "";
        if (itinerary) {
            for (day in itinerary) {
                if (itinerary[day].hotel !== null && itinerary[day].hotel.category !== '') {
                    var c = itinerary[day].hotel.category;                          
                    cats.push(c);
                }
            }
            cats =  _.uniq(cats);
        }
        if (lang == '_es'){

            for (var i = cats.length - 1; i >= 0; i--) {
                if (cats[i] == 'unclassified *'){
                    cats[i] = 'otros alojamientos';
                }
            }
        }
        return cats;
    }

    
   
    /**
     * funcion que obtiene el html a partir de un swig del presupuesto
     * @param local    (variables con el importe)
     * @param dmcproduct (producto de la reserva)
     * @param booking (reserva a tratar)
     * @param callback
     */
    function _getBudgetPrint(dmcproduct,booking,affiliate,local, callback) {
    
    	var fetch_url = '/affiliate-budget-to-print';
    	var postdata = {
            dmcproduct : dmcproduct,
            booking : booking,
            local : local
        };   	
    	return $http({
    		    method: 'POST',
    	        url: fetch_url,
    	        data: postdata,
    	        headers: {}
    	     }).success(function(data){   
    	    	callback(data);
    	    }).error(function(){
    	        alert("error");
    	    });		
     }
    /**
	 * funcion que obtiene un pdf del presupuesto
	 * @param brandPath (ruta en la que estamos afiliado)
	 * @param booking  (reserva a tratar)
	 * @param yto_api  (api de yto para convertir a pdf un html)
	 */
    function _downloadAffiliateBudget(yto_api, booking, product, affiliate, local, callback) {
    	    	
    	_getBudgetPrint(product,booking,affiliate,local, function(result){
    	 
    			var dataFooter ={
					name : affiliate.company.name,
					logo : affiliate.images.logo.url
				};
				var dataHeader ={
					name : affiliate.company.name,
					logo : affiliate.images.logo.url,
					phone : affiliate.company.phone,
					web : affiliate.company.website,
					address : affiliate.company.location.fulladdress,
					cp : affiliate.company.location.cp,
					city : affiliate.company.location.city
				};

				if (typeof product !== 'undefined') {
					dataHeader.tit = product.title_es;
					if(product.categoryname !== null && product.categoryname !== undefined ){
						dataHeader.cat = product.categoryname.label_es;
					}
				}
				var urlLocal = 'http://www.yourttoo.com/';

				var footerurl = '\"'+urlLocal+'pdfPartial?part=footer&'+$httpParamSerializerJQLike(dataFooter)+'\"';
				var headerurl = '\"'+urlLocal+'pdfPartial?part=header&'+$httpParamSerializerJQLike(dataHeader)+'\"';
				var pageSettings = '-B 20mm -L 0mm -R 0mm -T 42mm --footer-html '+footerurl+' --header-html '+headerurl;
				var namefile = "budget-"+product.slug_es+'-'+booking.idBooking;
				
//				$log.info ('footerurl :',footerurl);
//				$log.info ('headerurl :',headerurl);

				$log.info ('pageSettings :',pageSettings);
	    		// 2) llamo al core para convertirlo en pdf
	    		var rqCB = yto_api.post('/download/getpdffromhtml', {
	    		    html: result,
	    		    pageSettings: pageSettings,
	    		    type: 'budgetaffiliate',
	    		    namefile: namefile
	    		});
	    		//response OK
	    		rqCB.on(rqCB.oncompleteeventkey, function (budgetPdf) {
	    		        		    
	    			if(budgetPdf!=null && budgetPdf.url != null ){  
		    			$window.open(budgetPdf.url, '_blank');
		    			callback(budgetPdf.url);
	    			}
	    			//error al generar pdf 
	    			else{    				
	    				console.log("ERROR, getting pdf from html for productPdf: "+product.slug_es);	    				
	    				toaster.pop('error',"Error", "Error al generar PDF del producto, "+product.slug_es, 10000);
	    				callback(null);
	    			}	
	    			//tools_service.showPreloader($scope, "hide");	    		    
	    		});
	    		//response noOk
	    		rqCB.on(rqCB.onerroreventkey, function (err) {
	    		    console.log(err);
	    		    toaster.pop('error',"Error", "Error al generar PDF del producto, "+product.slug, 10000);    			
	    		});
    	
    	});
    }
    
    
    
    	
	 /**
     * funcion que obtiene el html a partir de un swig
     * @param local    (variables con el importe)
     * @param dmcproduct (producto de la reserva)
     * @param booking (reserva a tratar)
     * @param callback
     */
    function _getInvoicePrint(brandPath,local,dmcproduct,booking, callback) {
    
    	var fetch_url = brandPath+'/affiliate-proforma-to-print';
    	var postdata = { local: local, dmcproduct : dmcproduct, booking : booking};
    	
    	return $http({
    	        //method: 'GET',
    		    method: 'POST',
    	        url: fetch_url,
    	        data: postdata,
    	        headers: {}
    	     }).success(function(data){   
    	    	 callback(data);
    	    }).error(function(){
    	        alert("error");
    	    });		
     }

        
    
    /**
	 * funcion que obtiene un pdf de un html
	 * @param brandPath (ruta en la que estamos afiliado)
	 * @param booking  (reserva a tratar)
	 * @param yto_api  (api de yto para convertir a pdf un html)
	 */
    function _downloadAffiliateProforma(brandPath, yto_api, booking, callback) {

        var dmcproduct = booking.products[0];        
        
        // parametros para la factura	    	
        var local = {
            pax: 0,
            topay: 0,
            invocenumber: '',
        };
       	
        // 1.1) setear el total de pax
       	local.pax = booking.paxes.length;      	
       	    	
              // 1.4) recaluclar los importes
              local.topay = booking.breakdown.agency.net;	
    		
		 
		var resp = destinations_service.findcountries({ search: dmcproduct.itinerary[0].sleepcity.countryid, fieldname: '_id'});
     
		
		// obtengo el destino de la booking, conviertiendo el country a espanol
	    if(resp!= null && resp.length > 0){
	    	booking.destination = resp[0].label_es;	    	 
	    }
	    else{
	    	booking.destination = dmcproduct.itinerary[0].sleepcity.country;
	    }
		 
	    		 
		
    	// 2) generar factura en html
    	_getInvoicePrint(brandPath, local, dmcproduct, booking, function(result){	    		
    		
    		
    		// 3) llamo al core para convertirlo en pdf
    		var namefile = booking.idBooking + '-proforma';	    		
    	
    		var rqCB = yto_api.post('/download/getpdffromhtml', {
    		    html: result,
    		    type: 'proformaaffiliate',
    		    namefile: namefile
    		});
    		    		
    		//response OK
    		rqCB.on(rqCB.oncompleteeventkey, function (proformaPdf) {
    		        		    
    			if(proformaPdf!=null && proformaPdf.url != null ){
        			// 4) forzar descarga del pdf
	    			//$scope.invoiceProviderUrl = invoicePdf.url;
	    			
	    			// guardo la ruta en la booking
	    			//booking.invoiceAffiliateFile = proformaPdf.url;
	    				    			
	    			$window.open(proformaPdf.url, '_blank');	
	    			callback(proformaPdf.url);

	    			// 5) guardar en base de datos en mongo, api nueva
	    			//_updateBooking();

    			}
    			//error al generar factura 
    			else{    				
    				console.log("ERROR, getting pdf from html in proforma invoice for booking: "+booking.idBooking);	    				
    				toaster.pop('error',"Error",
							"Generando factura para reserva: "+booking.idBooking+". Por favor intente más tarde.", 10000);
    			}
    		    
    		});            
    		//response noOk
    		rqCB.on(rqCB.onerroreventkey, function (err) {
    		    console.log(err);
    		});    		
    		
    	});	 
    }    
    
    
    
	/**
	 * funcion que obtiene un pdf del contrato de booking de afiliado
	 * @param brandPath (ruta en la que estamos afiliado)
	 * @param booking  (reserva a tratar)
	 * @param yto_api  (api de yto para convertir a pdf un html)
	 */
    function _downloadAffiliateContract(brandPath, yto_api, booking, callback) {
                   
        var dmcproduct = booking.products[0];        
        
        // parametros para la factura	    	
    	var local = {			
 				//priceperson : 0,
 				pax: 0,
 				subtotalpax: 0,
 				topay: 0,	 				
 				//amountProvider: null,
 				invocenumber: '',
 			}
       	
    	// 1.1) setear el total de pax
       	local.pax =  booking.paxes.length;
    	local.now = new Date();
       	    	
		// 1.4) recaluclar los importes
		local.topay = booking.breakdown.agency.net;	
        local.subtotalpax = booking.breakdown.agency.net /local.pax;	
		
		var resp = destinations_service.findcountries({ search: dmcproduct.itinerary[0].sleepcity.countryid, fieldname: '_id'});
     
		
		// 1.5) obtengo el destino de la booking, conviertiendo el country a espanol
	    if(resp!= null && resp.length > 0){
	    	booking.destination = resp[0].label_es;	    	 
	    }
	    else{
	    	booking.destination = dmcproduct.itinerary[0].sleepcity.country;
	    }
		 
	    
	    
	    // 1.6) setear las edades de cada pax para poder mostrarlas directamente
        var actualDate = new Date();
        _.each(booking.paxes, function (pax) {
            var birdDate =pax.birthdate != null ? new Date(pax.birthdate) : new Date(1985, 0, 1);
            var msYear = 60 * 60 * 24 * 1000 * 365; //ms in a year
            var age = Math.floor((actualDate - birdDate) / msYear);	    
            pax.age = age;		
        });
	   
	
    	// 2) generar contrato en html
	    _getContractPrint('', local, dmcproduct,booking, function(result){	    		
	    	// 1) setear la cabecera
			var dataHeader ={
				bookingId : booking.idBooking				
			};

			var urlLocal = 'http://' + location.host; //only for test local
		
			var headerurl = '\"' + urlLocal + '/pdfPartialContract?part=header&' + $httpParamSerializerJQLike(dataHeader)+'\"';
			var footerurl = '\"' + urlLocal + '/pdfPartialContract?part=footer\"';
			var pageSettings = '-B 10mm -L 10mm -R 10mm -T 20mm --footer-html '+ footerurl + ' --header-html '+headerurl;
			
			console.log('pageSettings :',pageSettings);
	    	    	
	    	    		
    		// 2) llamo al core para convertirlo en pdf
    		var namefile = ['Contrato', booking.idBooking].join('-');	    		
    	
    		var rqCB = yto_api.post('/download/getpdffromhtml', {
    		    html: result,
    		    type: 'proformaaffiliate',
    		    namefile: namefile,
    		    pageSettings: pageSettings
    		});
    		    		
    		//response OK
    		rqCB.on(rqCB.oncompleteeventkey, function (proformaPdf) {
    		        		    
    			if(proformaPdf!=null && proformaPdf.url != null ){
        			// 4) forzar descarga del pdf
	    			//$scope.invoiceProviderUrl = invoicePdf.url;
	    			
	    			// guardo la ruta en la booking
	    			//booking.invoiceAffiliateFile = proformaPdf.url;
	    				    			
	    			$window.open(proformaPdf.url, '_blank');	
	    			callback(proformaPdf.url);

	    			// 5) guardar en base de datos en mongo, api nueva
	    			//_updateBooking();

    			}
    			//error al generar factura 
    			else{    				
    				console.log("ERROR, getting pdf from html in proforma invoice for booking: "+booking.idBooking);	    				
    				toaster.pop('error',"Error",
							"Generando factura para reserva: "+booking.idBooking+". Por favor intente más tarde.", 10000);
    			}
    		    
    		});            
    		//response noOk
    		rqCB.on(rqCB.onerroreventkey, function (err) {
    		    console.log(err);
    		});    		
    		
    	});	 
    } 
    
    

    /**
     * funcion que obtiene el html a partir de un swig
     * @param local    (variables con el importe)
     * @param dmcproduct (producto de la reserva)
     * @param booking (reserva a tratar)
     * @param callback
     */
    function _getContractPrint(brandPath,local,dmcproduct,booking, callback) {
    
    	var fetch_url = brandPath+'/affiliate-contract-to-print';
    	var postdata = { local: local, dmcproduct : dmcproduct, booking : booking};
    	
    	return $http({
    	        //method: 'GET',
    		    method: 'POST',
    	        url: fetch_url,
    	        data: postdata,
    	        headers: {}
    	     }).success(function(data){   
    	    	 callback(data);
    	    }).error(function(){
    	        alert("error");
    	    });		
     }
    
    
    
    /**
	 * funcion que descarga un resumen de la reserva en pdf
	 * @param branPath  
	 * @param yto_api 
	 * @param booking
	 * 
	 */
	function _downloadSummaryBooking (brandPath, yto_api, booking, callback) {
				 
		var product = booking.products[0];
			
		
		// 1) generar el bono en html
		_getSummaryToPrint(brandPath, product, booking , function(result){	    		
    			
						
    		// 2) llamo al core para convertirlo en pdf
    		var namefile = 'Resumen-Reserva-'+booking.idBooking;
    		var pageSettings = '--page-size A4 --margin-left 0 --margin-right 0 --margin-top 10mm';
    		
    		var rqCB = yto_api.post('/download/getpdffromhtml', {
    		    html: result,
    		    type: 'bookingaffiliate',
    		    namefile: namefile,
    		    pageSettings: pageSettings
    		});
    		    		
    		//response OK
    		rqCB.on(rqCB.oncompleteeventkey, function (summaryPdf) {
    		        		    
    			if(summaryPdf!=null && summaryPdf.url != null ){
    				
    				$window.open(summaryPdf.url, '_blank');
    				callback(summaryPdf.url);
    			}
    			
    			//error al generar factura 
    			else{
    				toaster.pop('error', "Error de conexión", "No se ha podido generar el resumen de la reserva. Por favor intenta más tarde.", 10000);
	        		$log.error("Error al generar el resumen de reserva de la reserva: "+booking.idBooking);
    			}
    		    
    		});            
    		//response noOk
    		rqCB.on(rqCB.onerroreventkey, function (err) {
    		    console.log(err);
    		});
    	});	 			
	}
    /**
     * @ngdoc method
     * @name hasTransport
     * @methodOf service.bookinghelpers
     * @description
     *
     * returns boolean if booking has Train, Flights or boats/ferries
     * @param {object} product full product object
     * @return {Boolean}       true if have T/F/B
     */
	function _hasTransport(product){
        if(product!=null){
            return product.included.transportbetweencities.domesticflight || 
            product.included.transportbetweencities.train || 
            product.included.transportbetweencities.boat;
             
        }
    }
	
	// llamar al api para obtener el html del resumen de la booking	
    function _getSummaryToPrint(brandPath,product, booking, callback) {    	

        var fetch_url = brandPath+'/booking-summary-to-print';        	    
        var postdata = {
        		product : product,
        		booking : booking
        }	    	

        return $http({
	        //method: 'GET',
		    method: 'POST',
	        url: fetch_url,
	        data: postdata,
	        headers: {}
	     }).success(function(data){   
	    	 callback(data);
	    }).error(function(){
	        alert("error");
	    });	
 
    };
});


