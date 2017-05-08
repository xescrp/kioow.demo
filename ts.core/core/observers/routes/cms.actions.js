module.exports = function (subscriberworker, socket) {
	var common = require('yourttoo.common');
	var _ = require('underscore');

	socket.on('update.city', function (city) {
		var conf = {};
		conf.core = subscriberworker.core;
		conf.city = city;

		var eventkey = conf.oncompleteeventkey || 'update.city.done';
		var erroreventkey = conf.onerroreventkey || 'update.city.error';

		conf.oncompleteeventkey = eventkey;
		conf.onerroreventkey = erroreventkey;
		var rq = {
			request: conf,
			method: 'update.city',
			service: 'cms'
		};
		var rt = subscriberworker.processrequest(rq, function (rs) { console.log('finished callback'); });
		rt.on(eventkey, function (rs) {
			socket.emit(eventkey, rs);
			subscriberworker.setfinished({
				ResultOK: true,
				Message: 'Updated city triggered by cms',
				Result: rs
			});
		});
		rt.on(erroreventkey, function (rs) {
			socket.emit(erroreventkey, rs);
			subscriberworker.seterror(rs);
		});
	});

	socket.on('update.country', function (country) {
		var conf = {};
		conf.core = subscriberworker.core;
		conf.country = country;
		var eventkey = conf.oncompleteeventkey || 'update.country.done';
		var erroreventkey = conf.onerroreventkey || 'update.country.error';

		conf.oncompleteeventkey = eventkey;
		conf.onerroreventkey = erroreventkey;
		var rq = {
			request: conf,
			method: 'update.country',
			service: 'cms'
		};
		var rt = subscriberworker.processrequest(rq);
		rt.on(eventkey, function (rs) {
			socket.emit(eventkey, rs);
			subscriberworker.setfinished({
				ResultOK: true,
				Message: 'Updated country triggered by cms',
				Result: rs
			});
		});
		rt.on(erroreventkey, function (rs) {
			socket.emit(erroreventkey, rs);
			subscriberworker.seterror(rs);
		});
	});

	socket.on('update.zone', function (zone) {
	    var conf = {};
	    conf.core = subscriberworker.core;
	    conf.zone = zone;

	    var eventkey = conf.oncompleteeventkey || 'update.zone.done';
	    var erroreventkey = conf.onerroreventkey || 'update.zone.error';

	    conf.oncompleteeventkey = eventkey;
	    conf.onerroreventkey = erroreventkey;
	    var rq = {
	        request: conf,
	        method: 'update.zone',
	        service: 'cms'
	    };
	    var rt = subscriberworker.processrequest(rq);
	    rt.on(eventkey, function (rs) {
	        socket.emit(eventkey, rs);
	        subscriberworker.setfinished({
	            ResultOK: true,
	            Message: 'Updated zone triggered by cms',
	            Result: rs
	        });
	    });
	    rt.on(erroreventkey, function (rs) {
	        socket.emit(erroreventkey, rs);
	        subscriberworker.seterror(rs);
	    });
	});

	socket.on('update.tag', function (tag) {
		var conf = {};
		conf.core = subscriberworker.core;
		conf.tag = tag;

		var eventkey = conf.oncompleteeventkey || 'update.tag.done';
		var erroreventkey = conf.onerroreventkey || 'update.tag.error';

		conf.oncompleteeventkey = eventkey;
		conf.onerroreventkey = erroreventkey;
		var rq = {
			request: conf,
			method: 'update.tag',
			service: 'cms'
		};
		var rt = subscriberworker.processrequest(rq);
		rt.on(eventkey, function (rs) {
			socket.emit(eventkey, rs);
			subscriberworker.setfinished({
				ResultOK: true,
				Message: 'Updated tag triggered by cms',
				Result: rs
			});
		});
		rt.on(erroreventkey, function (rs) {
			socket.emit(erroreventkey, rs);
			subscriberworker.seterror(rs);
		});
	});
}