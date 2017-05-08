module.exports = function (conf, callback) {
    (conf.programcode == null && conf.programcode == '') && (conf.bookingcode == null && conf.bookingcode == '') ?
        callback({ error: '(programcode or bookingcode parameter missing) - You must specify the program code or the booking code of data you want to recover' }, conf) :
        setImmediate(function () {
            //allowed ?

            var collectionname = conf.programcode != null && conf.programcode != '' ? 'programs' : null;
            collectionname = conf.bookingcode != null && conf.bookingcode != '' ? 'booking' : collectionname; 

            collectionname != null && collectionname != '' && conf.constants.fetch.allowedcollections[collectionname] == null ? callback(
                { error: 'the type of data you want to recover is unknown or not allowed.\r\nData names: cities, countries, tags' }, conf) :
                setImmediate(function () {
                    //query only in cities: 
                    var rqquery = collectionname == 'programs' ? { code: conf.programcode.toUpperCase() } : { idBooking: conf.bookingcode.toUpperCase() };

                    var fnQ = {
                        core: conf.core,
                        query: rqquery,
                        fields: conf.constants.fetch.fields[collectionname],
                        populate: conf.constants.fetch.populate[collectionname],
                        collectionname: conf.constants.fetch.allowedcollections[collectionname],
                        auth: conf.auth,
                        environment: conf.environment || 'xmljsonapi',
                        currency: conf.currency,
                        currentcurrency: conf.currency
                    };
                    conf.findquery = fnQ;
                    conf.collectionname = fnQ.collectionname;
                    callback(null, conf);
                });
        });
}