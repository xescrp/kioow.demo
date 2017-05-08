
//utils
var utils = require('../../tools');
var hash = require('../../tools/hashtable');
var _ = require('underscore');
var _q = require('../../tools/queue');
var productQueue = new _q.Queue();

//mailer & filepath
var _mailer = require('../../mailing/server');
var filepaths = require('../../routes/filepaths').filepaths;

//bd mongo...
var _mongodb = require('../../core/dbfetch');
var dbfetch = new _mongodb.MongoFetch();



var bookingUpdater = function (callback) { 

    var start = new Date();
    console.log(' Scheduled task for booking model update...' + start);
    

    
    //testing query...
    //var dt = new Date();
    //dt.setDate(2);
    //dt.setMonth(9);
    //dt.setYear(2015);
    //dt.setHours(0);
    //dt.setMinutes(0);
    //dt.setSeconds(0);
    //dt.setMilliseconds(0);
    //var query = {
    //    startdate : { $gte: dt }
    //};
    var querystream = dbfetch.getCore().list('Bookings').model.find()
    .populate('traveler')        
    .stream();
    
    //recorrer la respuesta
    querystream.on('data', function (doc) {
        console.log(' * Processin booking id: ',doc.idBooking);
        doc.save();
    });
    
    querystream.on('error', function (err) {
        console.log(err);
    });
    
    
    // cerrar flujo de query
    querystream.on('close', function () {
    	
        callback({
            ResultOK: true,
            Message: 'Booking dates updated...'
        });
    	
    });

}


var start = exports.start = bookingUpdater;