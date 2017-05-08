
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
        	if(findedbooking.historic ==null){
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
	
	console.log("++ actualizando: ",options.collectionname);
    var common = require('yourttoo.common');
    var flhandler = common.eventtrigger.eventcarrier(common.utils.getToken());
    
    var core = options.core;
    var collection = options.collectionname;
    var query = options.query;
    var update = options.update;
    
    var errors = [];

    core.list(collection).model.update(query, update, { multi: true }, function (err, raw) {
    	err != null ? errors.push(err) : null;
    	if(errors.length > 0){
    		if(errorcallback!=null){
    			errorcallback(errors.join('/r/n'))
    		}
    	}
    	else{
    		if(callback!=null){
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
    var _ = require('underscore');
    
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
            var quotestatustransition = {
                published: 'lost',
                'new': 'cancelled',
                draft: 'cancelled',
                'under review': 'cancelled'
            };
            var tmrquest = docs[0];
            var total = tmrquest.quotes.length;
            var mailSend = [];
            var winnerquote = '';
            flhandler.on('quote.saved', function (err, quote) {
                err != null ? console.error(err) : null;
                total--;
                console.log('quote saved ' + quote.code + ', left: ' + total);
                total == 0 ? 
                setImmediate(function () {
                    //end quotes..
                    mailSend.push({
                        "name": 'dmcquotewin_en',
                        "date": new Date
                    });
                    var dummyHistoric = {
                        "date": new Date(),
                        "state" : 'QUERY-CLOSE-' + winnerquote + '-WIN',
                        "user" : options.mail,
                        "mailSend" : mailSend
                    };
                    tmrquest.historic.push(dummyHistoric);
                    tmrquest.idBooking = idBooking;
                    tmrquest.state = 'close';
                    
                    tmrquest.save(function (err, doc) {
                        console.log("++ fin de todo el updatequote");
                        if (err != null) {
                            console.error("Error in save query. Details: ", err);
                            errors.push(err);
                            errorcallback(errors.join('/r/n'));
                        }
                        else {
                            callback(tmrquest);
                        }
                    });
                }) : 
                null;
            });
            
            _.each(tmrquest.quotes, function (quote) {
                quote.status = (quote.code == quotecode) ? 'win' : quotestatustransition[quote.status.toLowerCase()];
                quote.status = quote.status == null ? 'cancelled' : quote.status;
                quote.idBooking = (quote.status == 'win') ? idBooking : null;
                winnerquote = (quote.status == 'win') ? quote.code : winnerquote;
                quote.save(function (err, doc) {
                    err != null ? errors.push(err) : null;
                    err != null ? console.log("ERROR in get query. Details: ", err) : null;
                    flhandler.emit('quote.saved', err, quote);
                });
            });
    		
        }
    });
   
    
}
