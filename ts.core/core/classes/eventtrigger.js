
var events = require('events');

var eventtrigger = function (eventedObject) {
    events.EventEmitter.call(eventedObject);

    eventedObject.prototype = new events.EventEmitter;
}

module.exports.eventtrigger = eventtrigger;