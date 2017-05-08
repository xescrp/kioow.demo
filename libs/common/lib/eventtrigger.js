
var events = require('events');

var eventtrigger = function (eventedObject) {
    events.EventEmitter.call(eventedObject);
    eventedObject.prototype = new events.EventEmitter;
}


var eventcarrier = function (id) {
    var _ev_carrier = function (carrierid) { 
        this.name = 'Helper to send events...';
        this.created = new Date();
        this.id = carrierid || 'carrier.' + this.created.toISOString();
    }
    eventtrigger(_ev_carrier);
    var cr = new _ev_carrier(id);
    return cr;
}


module.exports.eventtrigger = eventtrigger;
module.exports.eventcarrier = eventcarrier;