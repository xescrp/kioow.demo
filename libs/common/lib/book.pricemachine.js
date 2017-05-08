module.exports = function (booking, core) {
    var pricing = booking.pricing;
    pricing.fee = pricing.fee || 0;
    var _ = require('underscore');
    var room_amounts = [];
    var room_amounts_dmc = [];

    var pvp_aavv = 0;
    var pvp_dmc = 0;
    var amount_paxes_booking = 0;
    var amount_netpaxes_booking = 0;
    var amount_dmcpaxes_booking = 0;

    var istaylor = booking.bookingmodel.indexOf('taylor') >= 0;
    var paxesroomhash = {

    };
    var pricehash = {
        agency: {
            keys: []
        },
        travelersense: {
            keys: []
        },
        provider: {
            keys: []
        }
    };

    var roomsbreak = {
        quad: {
            total: 0,
            paxes: 0,
            price: {
                pvp: 0,
                net: 0,
                dmc: 0,
                pvpperpax: 0,
                netperpax: 0,
                dmcperpax: 0
            }
        },
        double: {
            total: 0,
            paxes: 0,
            price: {
                pvp: 0,
                net: 0,
                dmc: 0,
                pvpperpax: 0,
                netperpax: 0,
                dmcperpax: 0
            }
        },
        triple: {
            total: 0,
            paxes: 0,
            price: {
                pvp: 0,
                net: 0,
                dmc: 0,
                pvpperpax: 0,
                netperpax: 0,
                dmcperpax: 0
            }
        },
        single: {
            total: 0,
            paxes: 0,
            price: {
                pvp: 0,
                net: 0,
                dmc: 0,
                pvpperpax: 0,
                netperpax: 0,
                dmcperpax: 0
            }
        },
        childs: []
    };
    _.each(booking.rooms, function (room) {
        var roomprice = 0; //aavv (client) pvp
        var roompricedmc = 0; //dmc pvp
        var roomnetprice = 0; //to pay dmc (net dmc)
        var roomavnetprice = 0; //to pay travelersense (our net)

        // BY ROOM
        var paxnumber = room.paxlist.length;
        var roomamount = roomprice * paxnumber; // PVP AAVV
        var roomamountdmc = roompricedmc * paxnumber; //parityprice
        var roomamountnet = roomavnetprice * paxnumber; //NET AAVV 
        var roomamountnetdmc = roomnetprice * paxnumber; //DMC NET

        _.each(room.paxlist, function (slug) {
            paxesroomhash[slug] = room.roomcode;
            var roompax = _.find(booking.paxes, function (pax) { return pax.slug == slug; });
            roomamount += roompax.price;
            roomamountnetdmc += roompax.dmc;
            roomamountnet += roompax.net;
            roomamountdmc += roompax.dmc;
        });
        roomamountdmc = Math.round(roomamountdmc * 100 / (100 - booking.pricing.comission));

        roomprice = roomamount / room.paxlist.length;
        roompricedmc = roomamountdmc / room.paxlist.length;
        roomnetprice = roomamountnetdmc / room.paxlist.length;
        roomavnetprice = roomamountnet / room.paxlist.length;

        room.price = roomamount; //info
        room.priceperpax = roomprice; //info
        //NET AAVV
        room.net = roomamountnet;
        room.netperpax = roomavnetprice;
        //DMC NET
        room.dmc = roomamountnetdmc;
        room.dmcperpax = roomnetprice;

        room_amounts.push(roomamount); //total pvp
        room_amounts_dmc.push(roomamountdmc); //total pvp for dmc


        //room breakdown
        roomsbreak[room.roomcode.toLowerCase()].total++;
        roomsbreak[room.roomcode.toLowerCase()].paxes += paxnumber;
        roomsbreak[room.roomcode.toLowerCase()].price.pvp += roomamount;
        roomsbreak[room.roomcode.toLowerCase()].price.net += roomamountnet || roomamountnetdmc;
        roomsbreak[room.roomcode.toLowerCase()].price.dmc += roomamountnetdmc || roomamountnetdmc;

        roomsbreak[room.roomcode.toLowerCase()].price.pvpperpax = roomsbreak[room.roomcode.toLowerCase()].price.pvp / roomsbreak[room.roomcode.toLowerCase()].paxes;
        roomsbreak[room.roomcode.toLowerCase()].price.netperpax = roomsbreak[room.roomcode.toLowerCase()].price.net / roomsbreak[room.roomcode.toLowerCase()].paxes;
        roomsbreak[room.roomcode.toLowerCase()].price.dmcperpax = roomsbreak[room.roomcode.toLowerCase()].price.dmc / roomsbreak[room.roomcode.toLowerCase()].paxes;

    });


    //if (booking.pricing.edited != null && booking.pricing.edited.isedited == true) {
    //    //the price is in the pax..
    //    console.log('Price edited');
    //    _.each(booking.rooms, function (room) {
    //        var roompricedmc = booking.pricing.roomssnapshot[room.roomcode.toLowerCase()];
    //        var paxnumber = room.paxlist.length;
    //        var roomamountdmc = roompricedmc * paxnumber;
    //        room_amounts_dmc.push(roomamountdmc);
    //    });

    //}
    //else {
    //    _.each(booking.rooms, function (room) {
    //        console.log('Price original');
    //        var roomprice = booking.pricing.rooms[room.roomcode.toLowerCase()]; //aavv (client) pvp
    //        var roompricedmc = booking.pricing.roomssnapshot[room.roomcode.toLowerCase()]; //dmc pvp
    //        var roomnetprice = Math.round(roompricedmc - ((roompricedmc * pricing.comission) / 100)); //to pay dmc (net dmc)
    //        var roomavnetprice = istaylor ? roompricedmc : Math.round(roomnetprice / (1 - pricing.margin / 100)); //to pay travelersense (our net)
    //        // BY ROOM
    //        var paxnumber = room.paxlist.length;
    //        var roomamount = roomprice * paxnumber; // PVP AAVV
    //        var roomamountdmc = roompricedmc * paxnumber; //parityprice
    //        var roomamountnet = roomavnetprice * paxnumber; //NET AAVV 
    //        var roomamountnetdmc = roomnetprice * paxnumber; //DMC NET
    //        //AAVV - PVP
    //        room.price = roomamount; //info
    //        room.priceperpax = roomprice; //info
    //        //NET AAVV
    //        room.net = roomamountnet;
    //        room.netperpax = roomavnetprice;
    //        //DMC NET
    //        room.dmc = roomamountnetdmc;
    //        room.dmcperpax = roomnetprice;
    //        //add amounts

    //        room_amounts.push(roomamount);
    //        room_amounts_dmc.push(roomamountdmc);

    //        //room breakdown
    //        roomsbreak[room.roomcode.toLowerCase()].total++;
    //        roomsbreak[room.roomcode.toLowerCase()].paxes += paxnumber;
    //        roomsbreak[room.roomcode.toLowerCase()].price.pvp += roomamount;
    //        roomsbreak[room.roomcode.toLowerCase()].price.net += roomamountnet || roomamountnetdmc;
    //        roomsbreak[room.roomcode.toLowerCase()].price.dmc += roomamountnetdmc || roomamountnetdmc;
    //        roomsbreak[room.roomcode.toLowerCase()].price.pvpperpax = roomsbreak[room.roomcode.toLowerCase()].price.pvp / roomsbreak[room.roomcode.toLowerCase()].paxes;
    //        roomsbreak[room.roomcode.toLowerCase()].price.netperpax = roomsbreak[room.roomcode.toLowerCase()].price.net / roomsbreak[room.roomcode.toLowerCase()].paxes;
    //        roomsbreak[room.roomcode.toLowerCase()].price.dmcperpax = roomsbreak[room.roomcode.toLowerCase()].price.dmc / roomsbreak[room.roomcode.toLowerCase()].paxes;
    //    });

    //    booking.children != null && booking.children.length > 0 ? _.each(booking.children, function (child) {

    //        var price = child.price;
    //        var pricedmc = child.dmcnet;
    //        var pricenet = child.aavvnet;

    //        roomsbreak.childs.push({
    //            age: child.age,
    //            pvp: price,
    //            net: pricenet,
    //            tsnet: pricedmc
    //        });

    //    }) : null;

    //}
    //cross all the rooms from roomtype and amount.. ORIGINAL PRICE
    //_.each(booking.rooms, function (room) {
    //    var roomprice = booking.pricing.rooms[room.roomcode.toLowerCase()]; //aavv (client) pvp
    //    var roompricedmc = booking.pricing.roomssnapshot[room.roomcode.toLowerCase()]; //dmc pvp
    //    var roomnetprice = Math.round(roompricedmc - ((roompricedmc * pricing.comission) / 100)); //to pay dmc (net dmc)
    //    var roomavnetprice = istaylor ? roompricedmc : Math.round(roomnetprice / (1 - pricing.margin / 100)); //to pay travelersense (our net)
    //    // BY ROOM
    //    var paxnumber = room.paxlist.length;
    //    var roomamount = roomprice * paxnumber; // PVP AAVV
    //    var roomamountdmc = roompricedmc * paxnumber; //parityprice
    //    var roomamountnet = roomavnetprice * paxnumber; //NET AAVV 
    //    var roomamountnetdmc = roomnetprice * paxnumber; //DMC NET
    //    //AAVV - PVP
    //    room.price = roomamount; //info
    //    room.priceperpax = roomprice; //info
    //    //NET AAVV
    //    room.net = roomamountnet;
    //    room.netperpax = roomavnetprice;
    //    //DMC NET
    //    room.dmc = roomamountnetdmc;
    //    room.dmcperpax = roomnetprice;
    //    //add amounts

    //    room_amounts.push(roomamount);
    //    room_amounts_dmc.push(roomamountdmc);

    //    //room breakdown
    //    roomsbreak[room.roomcode.toLowerCase()].total++;
    //    roomsbreak[room.roomcode.toLowerCase()].paxes += paxnumber;
    //    roomsbreak[room.roomcode.toLowerCase()].price.pvp += roomamount;
    //    roomsbreak[room.roomcode.toLowerCase()].price.net += roomamountnet || roomamountnetdmc;
    //    roomsbreak[room.roomcode.toLowerCase()].price.dmc += roomamountnetdmc || roomamountnetdmc;
    //    roomsbreak[room.roomcode.toLowerCase()].price.pvpperpax = roomsbreak[room.roomcode.toLowerCase()].price.pvp / roomsbreak[room.roomcode.toLowerCase()].paxes;
    //    roomsbreak[room.roomcode.toLowerCase()].price.netperpax = roomsbreak[room.roomcode.toLowerCase()].price.net / roomsbreak[room.roomcode.toLowerCase()].paxes;
    //    roomsbreak[room.roomcode.toLowerCase()].price.dmcperpax = roomsbreak[room.roomcode.toLowerCase()].price.dmc / roomsbreak[room.roomcode.toLowerCase()].paxes;

    //    _.each(room.paxlist, function (slug) { paxesroomhash[slug] = room.roomcode; });
    //});

   

    _.each(booking.paxes, function (pax) {
        if (pax != null && pax.price != null) {
            var roomcode = paxesroomhash[pax.slug];
            var key = [pax.price, roomcode].join('-');
            //check correct prices and complete..
            console.log(pax);
            //pax.price = pax.price != null && pax.price > 0 ? pax.price : roomsbreak[roomcode].price.pvpperpax;
            //pax.net = pax.net != null && pax.net > 0 ? pax.net : roomsbreak[roomcode].price.netperpax;
            //pax.dmc = pax.dmc != null && pax.dmc > 0 ? pax.dmc : roomsbreak[roomcode].price.dmcperpax;

            //hashing...
            //AGENCY
            pricehash.agency.keys.push(key);
            pricehash.agency.keys = _.uniq(pricehash.agency.keys);
            pricehash.agency[key] != null ? (
                pricehash.agency[key].paxes += 1,
                pricehash.agency[key].slugs.push(pax.slug),
                pricehash.agency[key].price = pax.price,
                pricehash.agency[key].room = paxesroomhash[pax.slug]
            ) : pricehash.agency[key] = {
                paxes: 1,
                slugs: [pax.slug],
                price: pax.price,
                room: paxesroomhash[pax.slug]
            };
            //TRAVELERSENSE
            var trkey = [pax.net, roomcode].join('-');
            pricehash.travelersense.keys.push(trkey);
            pricehash.travelersense.keys = _.uniq(pricehash.travelersense.keys);
            pricehash.travelersense[trkey] != null ? (
                pricehash.travelersense[trkey].paxes += 1,
                pricehash.travelersense[trkey].slugs.push(pax.slug),
                pricehash.travelersense[trkey].price = pax.net,
                pricehash.travelersense[trkey].room = paxesroomhash[pax.slug]
            ) : pricehash.travelersense[trkey] = {
                paxes: 1,
                slugs: [pax.slug],
                price: pax.net,
                room: paxesroomhash[pax.slug]
            };
            //DMC
            var prkey = [pax.dmc, roomcode].join('-');
            pricehash.provider.keys.push(prkey);
            pricehash.provider.keys = _.uniq(pricehash.provider.keys);
            pricehash.provider[prkey] != null ? (
                pricehash.provider[prkey].paxes += 1,
                pricehash.provider[prkey].slugs.push(pax.slug),
                pricehash.provider[prkey].price = pax.dmc,
                pricehash.provider[prkey].room = paxesroomhash[pax.slug]
            ) : pricehash.provider[prkey] = {
                paxes: 1,
                slugs: [pax.slug],
                price: pax.dmc,
                room: paxesroomhash[pax.slug]
            };
            
            amount_paxes_booking += pax.price;
            amount_netpaxes_booking += pax.net;
            amount_dmcpaxes_booking += pax.dmc;
        }
    });
    ////got room amounts
    //_.each(room_amounts, function (ramount) {
    //    pvp_aavv += ramount;  //#### TOTAL AMOUNT
    //});

    pvp_aavv = amount_paxes_booking; //PVP FINAL (AAVV)

    _.each(room_amounts_dmc, function (ramount) {
        pvp_dmc += ramount;  //#### TOTAL AMOUNT
    });

    var provider = {
        net: amount_dmcpaxes_booking, //Math.round(pvp_dmc - ((pvp_dmc * pricing.comission) / 100)),
        pvp: pvp_dmc,
        comission: pricing.comission,
        currencycode: booking.dmc.currency.value
    };
    var agency = {
        fee: pricing.fee || 0,
        net: booking.bookingmodel == 'whitelabel' ? pvp_aavv - parseFloat((pvp_aavv * pricing.fee / 100).toFixed(2))  : amount_netpaxes_booking, //Math.round(provider.net / (1 - pricing.margin / 100)),
        pvp: pvp_aavv,
        payment: 0,
        wl: {
            iva: booking.pricing.iva,
            ivaamount: 0,
            total: 0
        },
        currencycode: 'EUR'
    };
    agency.payment = booking.bookingmodel == 'whitelabel' ? parseFloat((agency.pvp * pricing.fee / 100).toFixed(2)) : agency.pvp - agency.net;
    agency.wl.ivaamount = parseFloat(((agency.payment * booking.pricing.iva) / 100).toFixed(2));
    agency.wl.total = agency.payment + agency.wl.ivaamount;

    var dmcnetOnCurrency = (booking.dmc.currency.value != booking.pricing.currency.value) ? core.plugins.cux.convert(provider.net, booking.dmc.currency.value, booking.pricing.currency.value) : provider.net;
    var trsense = {
        charge: amount_netpaxes_booking,
        margin: pricing.margin,
        netmargin: agency.net - dmcnetOnCurrency,
        payment: booking.bookingmodel.indexOf('b2b') >= 0 ? agency.net : provider.pvp
    };

    booking.bookingmodel == 'whitelabel' ? trsense.margin = parseFloat(((trsense.netmargin / agency.net) * 100).toFixed(2)) : null;
    var charges = {
        total: 0,
        pending: 0,
        current: 0,
        first: {
            date: booking.dates.firstcharge.date,
            amount: 0
        }, 
        second: {
            date: booking.dates.finalcharge.date,
            amount: 0
        }
    };

    charges.total = booking.bookingmodel.indexOf('b2c') >= 0 ? booking.pricing.amount : agency.net;
    charges.total = booking.bookingmodel.indexOf('whitelabel') >= 0 ? pvp_aavv : charges.total;
    //first
    booking.bookingmodel.indexOf('b2b') >= 0 ? charges.first.amount = parseFloat((charges.total * 15 / 100).toFixed(2)) : charges.first.amount = parseFloat((charges.total * 40 / 100).toFixed(2));
    booking.chargefeatures != null && booking.chargefeatures.first != null && booking.chargefeatures.first.amount != null ?
        charges.first.amount = booking.chargefeatures.first.amount : booking.chargefeatures.first.amount = charges.first.amount;
    booking.chargefeatures != null && booking.chargefeatures.first != null && booking.chargefeatures.first.date != null ?
        charges.first.date = booking.chargefeatures.first.date : booking.chargefeatures.first.date = charges.first.date;
    //second
    charges.second.amount = charges.total - charges.first.amount;
    booking.chargefeatures != null && booking.chargefeatures.second != null && booking.chargefeatures.second.amount != null ?
        charges.second.amount = booking.chargefeatures.second.amount : booking.chargefeatures.second.amount = charges.second.amount;
    booking.chargefeatures != null && booking.chargefeatures.second != null && booking.chargefeatures.second.date != null ?
        charges.second.date = booking.chargefeatures.second.date : booking.chargefeatures.second.date = charges.second.date;


    charges.pending = charges.total;
    if (booking.payments != null && booking.payments.length > 0) {
        var pays = _.filter(booking.payments, function (pay) {
            return pay.paymenttarget == 'travelersense';
        });
        var totalpaid = (pays != null && pays.length > 0) ? _.reduce(pays, function (memo, current) { return memo + current.amount; }, 0) : 0;
        charges.current = totalpaid;
        charges.pending = Math.round(charges.total - charges.current);
    }
     
    var payments = {
        total: 0,
        pending: 0,
        current: 0,
        totalagency: 0,
        pendingagency: 0,
        currentagency: 0
    };

    payments.total = provider.net;
    payments.totalagency = booking.bookingmodel.indexOf('whitelabel') >= 0 ? agency.wl.total : 0;
    
    payments.pending = payments.total;
    payments.pendingagency = booking.bookingmodel.indexOf('whitelabel') >= 0 ? agency.wl.total : 0;

    if (booking.payments != null && booking.payments.length > 0) {
        var pays = _.filter(booking.payments, function (pay) {
            return (pay.paymenttarget == 'provider');
        });
        var totalpaid = pays != null && pays.length > 0 ? _.reduce(pays, function (memo, current) { return memo + current.amount; }, 0) : 0;
        payments.current = totalpaid;
        payments.pending = Math.round(payments.total - payments.current);

        var paysagency = _.filter(booking.payments, function (pay) {
            return (pay.paymenttarget == 'agency');
        });
        var totalpaidagency = paysagency != null && paysagency.length > 0 ?
            _.reduce(paysagency, function (memo, current) { return memo + current.amount; }, 0) : 0;
        payments.currentagency = totalpaidagency;
        payments.pendingagency = payments.totalagency - payments.currentagency;
    }

    var fullbreakdown = {
        provider: provider,
        agency: agency,
        travelersense: trsense,
        charges: charges,
        payments: payments,
        amount: amount_paxes_booking,
        rooms: roomsbreak,
        roomsbyprice: pricehash,
        date: new Date()
    };

    booking.breakdown = fullbreakdown;
        
    return fullbreakdown;
}