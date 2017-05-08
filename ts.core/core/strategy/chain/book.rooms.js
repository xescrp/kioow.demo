module.exports = function (conf, callback) {
    console.log('booking - room distribution');
	var core = conf.core;
	var booking = conf.booking;
	var holderfinded = false;
	var _ = require('underscore');
	var common = require('yourttoo.common');
	function _get_age(born) {
		var now = new Date();
		var birthday = new Date(born.getFullYear(), born.getMonth(), born.getDate());
		var age = now.getFullYear() - born.getFullYear();
		return age;
	}
	_.each(conf.roomdistribution, function (room) {
		var e_room = {
			roomcode: room.roomcode,
			name: room.roomcode,
			paxlist: []
		};
		_.each(room.paxlist, function (pax) {
			var pax = {
				name: pax.name,
				slug: common.utils.slug([pax.name, common.utils.getToken()].join('-')),
				lastname: pax.lastname,
				birthdate: pax.birthdate,
				documentnumber: pax.documentnumber,
				documenttype: pax.documenttype,
                documentexpirationdate: pax.documentexpirationdate,
                documentexpeditioncountry: pax.documentexpeditioncountry,
				holder: pax.holder != null ? pax.holder : false,
				country : pax.country,
				price: 0
			};

            pax.country = conf.destinationcountries[pax.country.toLowerCase()];
            pax.documentexpeditioncountry = conf.destinationcountries[pax.documentexpeditioncountry.toLowerCase()];
			holderfinded = holderfinded || pax.holder;
			e_room.paxlist.push(pax.slug);
			booking.paxes.push(pax);
		});
		//set holder if not exists..
		!holderfinded ? booking.paxes[0].holder = true : null; //on the first room, first pax
		booking.rooms.push(e_room);
	});

	conf.booking = booking;
	setImmediate(function () {
		callback(null, conf);
	});
}