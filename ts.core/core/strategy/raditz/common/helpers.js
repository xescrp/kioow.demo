module.exports.addhistoric = function (options, callback, errorcallback) {
    var common = require('yourttoo.common');
    var flhandler = common.eventtrigger.eventcarrier(common.utils.getToken());
    
    var core = options.core;
    var booking = options.booking;
    var historic = options.historic;
    var taylormade = options.userquery;
    
    var complete = {
        booking : false, 
        taylormade: false, 
        errors: [], 
        done: function () { return this.booking && this.taylormade }
    };
    
    flhandler.on('historic.error', function (err) {
        flhandler.emit('addhistoric.error', err);
        if (errorcallback) { errorcallback(err); }
    });
    
    flhandler.on('historic.done', function (result) {
        flhandler.emit('addhistoric.done', result);
        if (callback) { callback(result); }
    });
    
    flhandler.on('taylormade.error', function (err) {
        complete.taylormade = true;
        complete.errors.push(err);
        complete.done() ? flhandler.emit('historic.error', err) : null;
    });
    
    flhandler.on('booking.error', function (err) {
        complete.booking = true;
        complete.errors.push(err);
        complete.done() ? flhandler.emit('historic.error', err) : null;
    });
    
    flhandler.on('taylormade.done', function (result) {
        complete.taylormade = true;
        complete.done() ? flhandler.emit('historic.done', result): null;
    });
    
    flhandler.on('booking.done', function (result) {
        complete.booking = true;
        complete.done() ? flhandler.emit('historic.done', result): null;
    });
    
    flhandler.on('booking.found', function (findedbooking) {
        if (findedbooking != null) {
            if (findedbooking.historic == null) {
                findedbooking.historic = [];
            }
            findedbooking.historic.push(historic);
            
            findedbooking.save(function (err, book) {
                err != null ? flhandler.emit('booking.error', err) : flhandler.emit('booking.done', book);
            });
        } else {
            flhandler.emit('booking.done', { Message: 'No errors, but not booking found' });
        }
    });
    
    flhandler.on('taylormade.found', function (findeduserquery) {
        if (findeduserquery != null) {
            if (findeduserquery.historic == null) {
                findeduserquery.historic = [];
            }
            findeduserquery.historic.push(historic);
            
            findeduserquery.save(function (err, taylor) {
                err != null ? flhandler.emit('taylormade.error', err) : flhandler.emit('taylormade.done', taylor);
            });
        } else {
            flhandler.emit('taylormade.done', { Message: 'No errors, but not booking found' });
        }
    });
    
    //for booking
    booking != null ? process.nextTick(function () {
        core.list('Bookings').model.find({ idBooking: booking.idBooking }).exec(function (err, doc) {
            err != null ? flhandler.emit('booking.error', err) : flhandler.emit('booking.found', doc[0]);
        });
    }) : process.nextTick(function () { 
        
    });
    //for taylormade
    taylormade != null ? process.nextTick(function () {
        core.list('UserQueries').model.find({ code: taylormade.code }).exec(function (err, doc) {
            err != null ? flhandler.emit('taylormade.error', err) : flhandler.emit('taylormade.found', doc[0]);
        });
    }) : process.nextTick(function () { 
        
    });
    
}

/**
 * actualiza los objetos, con el update que se le pase com parametro
 */
module.exports.update = function (options, callback, errorcallback) {
    
    console.log("++ actualizando: ", options.collectionname);
    var common = require('yourttoo.common');
    var flhandler = common.eventtrigger.eventcarrier(common.utils.getToken());
    
    var core = options.core;
    var collection = options.collectionname;
    var query = options.query;
    var update = options.update;
    
    var errors = [];
    
    core.list(collection).model.update(query, update, { multi: true }, function (err, raw) {
        err != null ? errors.push(err) : null;
        if (errors.length > 0) {
            if (errorcallback != null) {
                errorcallback(errors.join('/r/n'))
            }
        }
        else {
            if (callback != null) {
                callback(raw);
            }
        }
        //errors.length > 0 ? errorcallback(errors.join('/r/n')) : callback(raw);
    });
}



/**
 * actualiza query y quotes con estado
 */
module.exports.updateQuotes = function (options, callback, errorcallback) {
    
    console.log("++ actualizando query: ", options.collectionname);
    var common = require('yourttoo.common');
    var flhandler = common.eventtrigger.eventcarrier(common.utils.getToken());
    
    var core = options.core;
    var collection = options.collectionname;
    var query = options.query;
    var quotecode = options.quotecode;
    var idBooking = options.idBooking;
    
    var errors = [];
    
    
    
    // **************************************
    // 1) buscar las query con la quotes populada
    // **************************************
    core.list(collection).model.find(query).populate('quotes').populate('dmcs').exec(function (err, docs) {
        // 1.1) si hay error
        if (err != null) {
            console.log("ERROR in get query. Details: ", err);
            errors.push(err);
            errorcallback(errors.join('/r/n'))
    		
        }
    	
    	// 1.2) no hay error
        else {
            var query = docs[0];
            var total = query.quotes.length;
            var mailSend = [];
            
            
            
            // **********************
            // 2) recorrer las quotes
            // **********************
            for (var itq = 0; itq < query.quotes.length; itq++) {
                
                console.log("+++ quote: ", itq, ' - ', query.quotes[itq]);
                var quote = query.quotes[itq];
                
                
                
                //*************************
                //*************************
                //*************************
                
                // 2.1) si es la quote ganadora
                if (query.quotes[itq].code == quotecode) {
                    query.quotes[itq].status = 'win';
                    
                    // 2.1.1) guardo el id de booking de la reserva en la quote ganadora
                    query.quotes[itq].idBooking = idBooking;
                    
                    // 2.1.2) mail al user a los dmcs de las quotes con win o los
                    var dummyMail = {
                        "name": 'dmcquotewin_en',
                        "date": new Date
                    };
                    mailSend.push(dummyMail);
                }
    			// 2.2) si no es la quote ganadora
                else {
                    // 2.2.1) si estaba publicada, pasa  lost
                    if (query.quotes[itq].status == 'published') {
                        query.quotes[itq].status = 'lost';
                    }
      			  
      		  		// 2.2.2) si no estaba publicada pasa a cancelled (para que no se le visualicen al usuario)
                    else if (query.quotes[itq].status == 'new' || query.quotes[itq].status == 'draft' || query.quotes[itq].status == 'under review') {
                        query.quotes[itq].status = 'cancelled';
                    }
	      			        
      		  		// no se manda mail a los dmcs por cancelar o descartar quotes
//      		  		//si el estado es draft, el dmc no respondio a la quote, por tanto respondo con un query close
//      		  		if(queryBD.quotes[itQ].status!='draft' || queryBD.quotes[itQ].status!='new'){                    				  
//	      				 
//      		  			var dummyMail = {
//      		  					"name": 'dmcqueryclosed_en',
//								"date": new Date
//      		  			};
//      		  			mailSend.push(dummyMail);	                    			  
//      		  		}
//	      			// en caso de que el dmc hubiera respondido a la quote, mando el mail de quote perdodora
//	      			else{   
//						  var dummyMail = {
//								  "name": 'dmcquotelost_en',
//								  "date": new Date
//						  };
//						  mailSend.push(dummyMail);	                    			  
//	      			}
                }
                
                // guardar en mongo la quote
                console.log("++ guardadon la quote: ", query.quotes[itq].code, ' - status: ', query.quotes[itq].status);
                query.quotes[itq].save(function (err, book) {
                    if (err != null) {
                        console.log("ERROR in get query. Details: ", err);
                        errors.push(err);
                        errorcallback(errors.join('/r/n'))
                    }
		  			// comprobar si es el final del buccle
                    else {
                        
                        if (itq == total) {
                            console.log("++ quote guardada correctamente");
                            console.log("Fin del bucle de quotes");
                            
                            
                            // ***********************************************************
                            // guardar la query  (estado close, id de booking e historico)
                            // ***********************************************************	  
                            // historico de la query con mail enviados
                            var dummyHistoric = {
                                "date": new Date(),
                                "state" : 'QUERY-CLOSE-' + quotecode + '-WIN',
                                "user" : options.mail,
                                "mailSend" : mailSend
                            };
                            
                            
                            var upd = {
                                $set : {
                                    state: 'close',
                                    idBooking : idBooking,	                
                                    historic : dummyHistoric
                                }
                            };
                            
                            
                            core.list(collection).model.update(query, upd, { multi: true }, function (error, queryResult) {
                                if (error != null) {
                                    console.log("Error in save query. Details: ", error);
                                    errors.push(error);
                                    errorcallback(errors.join('/r/n'));
                                }
                                else {
                                    console.log("++ fin de todo el updatequote");
                                    query.historic = dummyHistoric;
                                    query.idBooking = idBooking;
                                    query.state = 'close';
                                    callback(query);
                                }
                            });
                        }
                    }
                });
      		  
    			
    		//***************************
      		//*************************
      		//*************************
    			
    			
            }
        }
    });
    
}