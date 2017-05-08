module.exports = function (conf, callback) {
    console.log('booking - set new pricing');
    var core = conf.core;
    var pricingsetup = conf.pricingrequest;
    var booking = conf.booking;

    //needed
    var today = new Date();
    var paxes = null;
    var rooms = null;
    var fee = conf.booking.pricing.fee || 0;
    var onlyfee = false;
    var changepvp = false;
    var user = conf.auth.user.email;

    //dependencies
    var common = require('yourttoo.common');
    var _ = require('underscore');

    var exec = {
        admin: function () {
            booking.paxes.splice(0, booking.paxes.length);
            booking.rooms.splice(0, booking.rooms.length);

            var oldaavvnet = booking.breakdown.agency.net;
            var olddmcamount = booking.breakdown.provider.net;

            var newaavvnet = 0;
            var newamount = 0;
            var newdmcamount = 0;

            _.each(paxes, function (pax) {
                pax.dmccurrency = pax.dmccurrency == null || pax.dmccurrency == '' ? booking.dmc.currency.value : pax.dmccurrency;
                pax.netcurrency = pax.netcurrency == null || pax.netcurrency == '' ? booking.pricing.currency.value : pax.netcurrency;
                pax.pricecurrency = pax.pricecurrency == null || pax.pricecurrency == '' ? booking.pricing.currency.value : pax.pricecurrency;

                //pax.net = Math.round(core.plugins.cux.convert(pax.dmc, pax.dmccurrency, pax.netcurrency) / (1 - (booking.pricing.margin / 100)));
                pax.price = changepvp ? Math.round(pax.net / (1 - (fee / 100))) : pax.price;

                newdmcamount += pax.dmc;
                newaavvnet += pax.net;
                newamount += pax.price;

                booking.paxes.push(pax); 
            });

            _.each(rooms, function (room) {
                room.net = 0;
                room.dmc = 0;
                room.price = 0;
                _.each(room.paxlist, function (paxslug) {
                    room.dmccurrency = room.dmccurrency == null || room.dmccurrency == '' ? booking.dmc.currency.value : room.dmccurrency;
                    room.netcurrency = room.netcurrency == null || room.netcurrency == '' ? booking.pricing.currency.value : room.netcurrency;
                    room.pricecurrency = room.pricecurrency == null || room.pricecurrency == '' ? booking.pricing.currency.value : room.pricecurrency;

                    room.dmcperpaxcurrency = room.dmccurrency;
                    room.netperpaxcurrency = room.netcurrency;
                    room.priceperpaxcurrency = room.pricecurrency;

                    var pax = _.find(booking.paxes, function (fpax) { return fpax.slug == paxslug; });
                    room.net += pax.net; //get the new room price by each pax
                    room.dmc += pax.dmc;
                    room.price += pax.price;
                    room.netperpax = room.net / room.paxlist.length;
                    room.dmcperpax = room.dmc / room.paxlist.length;
                    room.priceperpax = room.price / room.paxlist.length;
                });
                booking.rooms.push(room);
            });
            booking.pricing.amount = newamount;
            //there would be a new fee..
            var newfee = Math.round(100 - ((newaavvnet / booking.pricing.amount) * 100));
            var newmargin = Math.round(100 - ((newdmcamount / newaavvnet) * 100));
            booking.pricing.fee = newfee;
            booking.pricing.margin = newmargin;

            conf.story = {
                code: ['pricing', 'changed', booking.idBooking, today].join('-'),
                description: changepvp ?
                    'administrador yourttoo ha modificado el NETO de la reserva: neto anterior: ' + oldaavvnet + ' || neto actual: ' + newaavvnet :
                    'administrador yourttoo ha modificado el Coste del proveedor. dmc price anterior: ' + olddmcamount + ' || dmc price actual: ' + newdmcamount,
                previousstate: booking.status,
                currentstate: booking.status
            };

            conf.hermestriggers = [
                { collectionname: 'Bookings2', action: 'pricechange', data: booking }];
        },
        affiliate: function () {
            booking.paxes.splice(0, booking.paxes.length);
            booking.rooms.splice(0, booking.rooms.length);
            var oldamount = booking.pricing.amount;
            var oldfee = booking.pricing.fee;
            var newamount = 0;
            var aavvnet = 0;
            _.each(paxes, function (pax) {
                onlyfee ? pax.price = Math.round(pax.net / (1 - (fee / 100))) : pax.price = pax.price; //check the new pvp for the new fee .. or just push the new pvp price
                newamount += pax.price;
                aavvnet += pax.net;
                booking.paxes.push(pax);
            });

            _.each(rooms, function (room) {
                room.price = 0;
                _.each(room.paxlist, function (paxslug) {
                    var pax = _.find(booking.paxes, function (fpax) { return fpax.slug == paxslug; }); 
                    room.price += pax.price; //get the new room price by each pax
                    room.priceperpax = room.price / room.paxlist.length;
                });
                booking.rooms.push(room);
            });
            booking.pricing.amount = newamount;
            //there would be a new fee..
            var newfee = Math.round(100 - ((aavvnet / booking.pricing.amount) * 100));
            booking.pricing.fee = newfee;

            conf.story = {
                code: ['pricing', 'changed', booking.idBooking, today].join('-'),
                description: onlyfee ?
                    'agencia ha modificado la rentabilidad de la reserva: Fee anterior: ' + oldfee + ' PVP anterior: ' + oldamount + ' || Fee actual: ' + newfee + ' PVP actual: ' + newamount :
                    'agencia ha modificado el PVP de la reserva: PVP anterior: ' + oldamount + ' || PVP actual: ' + newamount,
                previousstate: booking.status,
                currentstate: booking.status
            };
            conf.hermestriggers = [
                { collectionname: 'Bookings2', action: 'pricechange', data: booking }];
        }
    }

    pricingsetup != null ? setImmediate(function () { 

        paxes = pricingsetup.paxes;
        rooms = pricingsetup.rooms;
        fee = pricingsetup.fee || fee;
        onlyfee = pricingsetup.onlyfee || false;
        changepvp = pricingsetup.pvpchange || false;
        user = conf.auth.user.email;
        

        var who = conf.auth.user.rolename;

        booking.pricing.edited != null ?
            (
                booking.pricing.edited.editedby = user,
                booking.pricing.edited.date = today,
                booking.pricing.edited.isedited = true
            ) :
            booking.pricing.edited = {
            editedby: user,
            date: today,
            isedited: true };

        exec[who]();
        conf.booking = booking;
        console.log(booking);
        callback(null, conf);

    }) : 
    setImmediate(function () { 
        callback('Bad request data', conf);
    });
    
   
}