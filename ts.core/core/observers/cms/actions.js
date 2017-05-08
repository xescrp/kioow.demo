module.exports = function (raditzseed, socket) {
	var common = require('yourttoo.common');
	var _ = require('underscore');

	socket.on('update.city', function (city) {
        var conf = { core : raditzseed.core, data: city, results: [] };
		var eventkey = conf.oncompleteeventkey || 'update.city.done';
		var erroreventkey = conf.onerroreventkey || 'update.city.error';

		conf.oncompleteeventkey = eventkey;
		conf.onerroreventkey = erroreventkey;
		var rq = {
			request: conf,
			method: 'update.city',
		};
        var rt = raditzseed.processrequest(rq, function (rs) { console.log('finished callback'); });
        rt.on(eventkey, function (rs) { raditzseed.trigger.emit('dispatch.done', { action: 'update.city', data: data, result: rs }); });
        rt.on(erroreventkey, function (rs) { raditzseed.trigger.emit('dispatch.error', { action: 'update.city', data: data, result: rs }); });
	});

	socket.on('update.country', function (country) {
        var conf = { core : raditzseed.core, data: country, results: [] };
        var eventkey = conf.oncompleteeventkey || 'update.country.done';
        var erroreventkey = conf.onerroreventkey || 'update.country.error';
        
        conf.oncompleteeventkey = eventkey;
        conf.onerroreventkey = erroreventkey;
        var rq = {
            request: conf,
            method: 'update.country',
        };
        var rt = raditzseed.processrequest(rq, function (rs) { console.log('finished callback'); });
        rt.on(eventkey, function (rs) { raditzseed.trigger.emit('dispatch.done', { action: 'update.country', data: data, result: rs }); });
        rt.on(erroreventkey, function (rs) { raditzseed.trigger.emit('dispatch.error', { action: 'update.country', data: data, result: rs }); });
	});

	socket.on('update.zone', function (zone) {
        var conf = { core : raditzseed.core, data: zone, results: [] };
        var eventkey = conf.oncompleteeventkey || 'update.zone.done';
        var erroreventkey = conf.onerroreventkey || 'update.zone.error';
        
        conf.oncompleteeventkey = eventkey;
        conf.onerroreventkey = erroreventkey;
        var rq = {
            request: conf,
            method: 'update.zone',
        };
        var rt = raditzseed.processrequest(rq, function (rs) { console.log('finished callback'); });
        rt.on(eventkey, function (rs) { raditzseed.trigger.emit('dispatch.done', { action: 'update.zone', data: data, result: rs }); });
        rt.on(erroreventkey, function (rs) { raditzseed.trigger.emit('dispatch.error', { action: 'update.zone', data: data, result: rs }); });
	});

    socket.on('update.tag', function (tag) {
        var conf = { core : raditzseed.core, data: tag, results: [] };
        var eventkey = conf.oncompleteeventkey || 'update.tag.done';
        var erroreventkey = conf.onerroreventkey || 'update.tag.error';
        
        conf.oncompleteeventkey = eventkey;
        conf.onerroreventkey = erroreventkey;
        var rq = {
            request: conf,
            method: 'update.tag',
        };
        var rt = raditzseed.processrequest(rq, function (rs) { console.log('finished callback'); });
        rt.on(eventkey, function (rs) { raditzseed.trigger.emit('dispatch.done', { action: 'update.tag', data: data, result: rs }); });
        rt.on(erroreventkey, function (rs) { raditzseed.trigger.emit('dispatch.error', { action: 'update.tag', data: data, result: rs }); });
    });

    socket.on('error', function (err) {
        raditzseed.trigger.emit('dispatch.error', { action: 'error', data: data, result: err });
    });
}