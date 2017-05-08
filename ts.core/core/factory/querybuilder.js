var builder = {
    dmcproducts : function (filter) {
        var query = { $and: [{ code: { $ne: null }, origin: { $ne : 'tailormade' }  }] };
        if (filter != null) {
            if (filter.states != null && filter.states != '') {
                filter.states = filter.states.split(',');
                query = {
                    $and: [{ publishState : { $in: filter.states } }]
                };
            }
            //filter for tags...
            if (filter.tags != null && filter.tags != '') {
                var q = { 'tags.slug'  : { $in: filter.tags.split(',') } };
                query.$and.push(q);
            }
            if (filter.dmcs != null && filter.dmcs != '') {
                var q = { 'dmccode' : { $in: filter.dmcs.split(',') } };
                query.$and.push(q);
            }
            //filter for codes
            if (filter.codes != null && filter.codes != '') {
                var codes = filter.codes.split(',');
                var cd = { code: { $in: codes } };
                query.$and.push(cd);
            }
            //prepare countries...
            if (filter.country != null && filter.country != '') {
                filter.country = filter.country.toUpperCase();
                filter.country = filter.country.split(',');
                
                //do the filter...
                if (filter.country != null && filter.country.length > 0) {
                    //filter for cities..
                    var lc = null;
                    if (filter.cities != null && filter.cities != '') {
                        filter.cities = filter.cities.split(',');
                        lc = {
                            $or : [
                                {
                                    'itinerary.departurecity.city' : { $in : filter.cities }, 
                                    'itinerary.departurecity.location.countrycode' : { $in : filter.country }
                                },
                                {
                                    'itinerary.sleepcity.city' : { $in : filter.cities }, 
                                    'itinerary.sleepcity.location.countrycode' : { $in : filter.country }
                                },
                                {
                                    'itinerary.stopcities.city' : { $in: filter.cities },
                                    'itinerary.stopcities.location.countrycode' : { $in: filter.country }
                                }
                            ]
                        };
                    }
                    else {
                        lc = {
                            $or : [
                                { 'itinerary.departurecity.location.countrycode' : { $in : filter.country } },
                                { 'itinerary.sleepcity.location.countrycode' : { $in : filter.country } },
                                { 'itinerary.stopcities.location.countrycode' : { $in: filter.country } }
                            ]
                        };
                    }
                    //push the filter..
                    if (lc != null) {
                        query.$and.push(lc);
                    //console.log(lc);
                    }
                }
            }
            //departure..
            if (filter.departuredate != null) {
                var from = { 'availability.year' : st_year, };
                from['availability.' + en_monthname + '.availability.0'] = { $exists: true };
                var to = { 'availability.year' : st_year };
                to['availability.' + en_monthname + '.availability.0'] = { $exists: true };
                var dt = {
                    $or : [from, to]
                };
                query.$and.push(dt);
            }
            //kind of trip
            if (filter.kindtrip != null && filter.kindtrip != '') {
                var kdt = {
                    'included.trip.grouptrip' : false,
                    'included.trip.privatetrip': false
                };
                if (filter.kindtrip == 'private') {
                    kdt['included.trip.grouptrip'] = true;
                }
                if (filter.kindtrip == 'group') {
                    kdt['included.trip.privatetrip'] = true;
                }
                query.$and.push(kdt);
            }
            //days lenght
            if (filter.days != null && filter.days != '') {
                var ds = filter.days.split(',');
                var dayscond = {
                    $or: []
                };
                if (ds != null && ds.length > 0) {
                    for (var ii = 0, len = ds.length; ii < len; ii++) {
                        var dtf = ds[ii];
                        
                        if (dtf == 'd1-7') {
                            var dstart = {
                                'itinerary.0' : { $exists: true },
                            };
                            var dend = {
                                'itinerary.7' : { $exists: false }
                            };
                            
                            fdt = {
                                $and: [dstart, dend]
                            }
                        }
                        if (dtf == 'd7-14') {
                            days = 7;
                            var dstart = {
                                'itinerary.7' : { $exists: true },
                            };
                            var dend = {
                                'itinerary.15' : { $exists: false }
                            };
                            
                            fdt = {
                                $and: [dstart, dend]
                            }
                        }
                        if (dtf == 'd14up') {
                            days = 14;
                            var dstart = {
                                'itinerary.15' : { $exists: true },
                            };
                            
                            fdt = dstart;
                        }
                        dayscond.$or.push(fdt);
                    
                    }
                    if (dayscond != null && dayscond.$or != null && dayscond.$or.length > 0) {
                        query.$and.push(dayscond);
                    }
                }
            }
            //category
            if (filter.categories != null && filter.categories != '') {
                var ht = {
                    'itinerary.hotel.category' : { $in : filter.categories.split(',') }
                };
                query.$and.push(ht);
            }
        }
        return query;
    },
    bookings: function (filter) {
        var query = { $and: [{ idBooking: { $ne: null } }] };
        // filters for status
        if (filter != null) {
            if (filter.status != null && filter.status != '') {
                filter.status = filter.status.split(',');
                for (var i = filter.status.length - 1; i >= 0; i--) {
                    if (filter.status[i] == 'error') {
                        filter.status[i] = '';
                    }
                }                ;
                query = {
                    $and: [{ status : { $in: filter.status } }]
                };
            }
            //filter for booking date...
            if (filter.bookinstart != null && filter.bookinstart != '') {
                var bookinstart = filter.bookinstart.split("-");
                var criteria = bookinstart[2] + pad((bookinstart[1] - 1), 2) + bookinstart[0] + '0000.0000000000';
                var q = { createdonindexing: { $gte: criteria } };
                query.$and.push(q);
            }
            
            if (filter.bookingend != null && filter.bookingend != '') {
                var bookingend = filter.bookingend.split("-");
                var criteria = bookingend[2] + pad((bookingend[1] - 1), 2) + bookingend[0] + '.ZZZZZZZZZZ';
                var q = { createdonindexing: { $lte: criteria } };
                query.$and.push(q);
            }
            //filter for tour date...
            if (filter.tourstart != null && filter.tourstart != '') {
                var tourstart = filter.tourstart.split("-");
                var criteria = '00' + tourstart[2] + pad((tourstart[1] - 1), 2) + tourstart[0] + '.0000000000';
                var q = { startdateindexing: { $gte: criteria } };
                query.$and.push(q);
            }
            
            if (filter.tourend != null && filter.tourend != '') {
                var tourend = filter.tourend.split("-");
                var criteria = '00' + tourend[2] + pad((tourend[1] - 1), 2) + tourend[0] + '.ZZZZZZZZZZ';
                var q = { startdateindexing: { $lte: criteria } };
                query.$and.push(q);
            }
            //filter for traveler...
            if (filter.travelers != null && filter.travelers != '') {
                var q = { 'traveler'  : { $in: filter.travelers.split(',') } };
                query.$and.push(q);
            }
            //filter for dmcs...
            if (filter.dmcs != null && filter.dmcs != '') {
                var q = { 'dmc' : { $in: filter.dmcs.split(',') } };
                query.$and.push(q);
            }
            //filter for products...
            if (filter.products != null && filter.products != '') {
                var q = { 'productDmc' : { $in: filter.products.split(',') } };
                query.$and.push(q);
            }
        }
        return query
    },
    userqueries: function (filter) {
        var query = { $and: [{ code: { $ne: null } }] };
        if (filter != null) {
            if (filter.states != null && filter.states != '') {
                filter.states = filter.states.split(',');
                query = {
                    $and: [{ state : { $in: filter.states } }]
                };
            }
            //filter group
            if (filter.groups != null && filter.groups != '' && filter.groups != undefined) {
                if (filter.groups == 'true') {
                    query = {
                        $and: [{ group : { $ne: null } }]
                    };
                }
            }
            if (filter.notgroups != null && filter.notgroups != '' && filter.notgroups != undefined) {
                if (filter.notgroups == 'true') {
                    query = {
                        $and: [{ group : null }]
                    };
                }
            
            }
            //filter for tags...
            if (filter.tags != null && filter.tags != '') {
                var q = { 'whattodo.slug' : { $in: filter.tags.split(',') } };
                query.$and.push(q);
            }
            //filter for country...
            if (filter.country != null && filter.country != '') {
                var q = { 'destinations.countrycode'  : { $in: filter.country.split(',') } };
                query.$and.push(q);
            }
            //filter for traveler...
            if (filter.travelers != null && filter.travelers != '') {
                var q = { 'traveler'  : { $in: filter.travelers.split(',') } };
                query.$and.push(q);
            }
            //filter for dmc...
            if (filter.dmcs != null && filter.dmcs != '') {
                var q = { 'dmcs' : { $in: filter.dmcs.split(',') } };
                // var q = { 'dmcs' :  filter.dmcs };         
                query.$and.push(q);
            }
            //filter for querycode...
            if (filter.codes != null && filter.codes != '') {
                var q = { 'code' : { $in: filter.codes.split(',') } };
                query.$and.push(q);
            }
            //filter for quoteid - this only happens if DMCCODE in filter has been passed
            if (filter.quoteids != null) {
                var q = { quotes : { $in: filter.quoteids } };
                query.$and.push(q);
            }
            //filter for booking date...
            if (filter.createdfrom != null && filter.createdfrom != '') {
                var querystart = filter.createdfrom.split("-");
                var criteria = querystart[2] + pad((querystart[1] - 1), 2) + querystart[0] + '0000.0000000000';
                var q = { createdonindexing: { $gte: criteria } };
                query.$and.push(q);
            }
            
            if (filter.createdto != null && filter.createdto != '') {
                var queryend = filter.createdto.split("-");
                var criteria = queryend[2] + pad((queryend[1] - 1), 2) + queryend[0] + '.ZZZZZZZZZZ';
                var q = { createdonindexing: { $lte: criteria } };
                query.$and.push(q);
            }
       
        }
        return query;
    },
    dmcqueries: function (filter) {
        var query = {
            $and: [{ code: { $ne: null } }]
        }
        if (filter.dmccode != null && filter.dmccode != null) {
            //filter for querycode...
            if (filter.querycodes != null && filter.querycodes.length > 0) {
                var q = { userqueryCode : { $in: filter.querycodes } };
                query.$and.push(q);
            }
            
            if (filter.states != null && filter.states != '') {
                var quotestatus = filter.states.split(',');
                query = {
                    $and: [{ status : { $in: quotestatus } }]
                };
                filter.states = null;
            }
            //filter for dmc...
            if (filter.dmccode != null && filter.dmccode != '') {
                var q = { dmccode : filter.dmccode };
                query.$and.push(q);
            }
        }
        return query
    }
}

var querylistbuilding = module.exports.querylistbuilding = function (listname, filter) {
    var cc = listname.toLowerCase();
    return builder[cc](filter);
}