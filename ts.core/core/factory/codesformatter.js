module.exports = function (options, callback) {
    var common = require('yourttoo.common');
    
    var code = options.code;
    var document = options.document;
    var collection = options.collectionname;
    var booktypehash = {
        bookingb2c: 'RO',
        bookingb2b: 'RY',
        budget: 'PY',
        taylormadeb2c: 'ROTM',
        taylormadeb2cgroups: 'ROTMG',
        taylormadeb2b: 'RYTM',
        taylormadeb2bgroups: 'RYTMG',
        xmlapi: 'XRY',
        whitelabel: 'MB',
    };
    var prefix = '';
    var sufix = '';
    var joiner = '';

    var collHash = {
        UserQueries: function (ncode, doc) {
            //var trcode = (doc.traveler != null) ? doc.traveler.code : 'UNKTR';
            //prefix = 'QR' + trcode;
            sufix = 'MY';
        },
        Quotes: function (ncode, doc) {
            prefix = 'QUOTE-' + doc.dmccode;
            joiner = 'X';
        },
        DMCProducts: function (ncode, doc) {
            var dmccode = (doc.dmc != null) ? doc.dmc.code : 'UNKDMC';
            prefix = dmccode;
            joiner = '';
        },
        Bookings: function (ncode, doc) {
        	// si la booking es de un presupuesto        	
        	if(doc.budget){        		
        		sufix = 'PY';
                joiner = '';
        	}
        	else{        		
        		var udoc = doc.traveler || doc.affiliate;
                var loc =((udoc != null && udoc.location != null) ? udoc.location : null) || 
                         ((udoc != null && udoc.company != null) ? udoc.company.location : null);
                sufix = (loc != null && loc.countrycode != null) ? loc.countrycode : 'RY';
                joiner = '';	
        	}
            
        },
        Bookings2: function (ncode, doc) {
            sufix = booktypehash[doc.bookingmodel];
            joiner = '';
        },
        WLCustomizations: function (ncode, doc) {
            prefix = 'WLC';
            joiner = '-';
            sufix = '';
        }
    }
    
    var fn = collHash[collection];
    if (typeof (fn) == 'function') { 
        fn(code, document);
    }

    return [prefix, code, sufix].join(joiner);
}