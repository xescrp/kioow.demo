var _ = require('underscore');

//Aux functions
function _randomize(maxvalue) { 
    return Math.floor(Math.random() * maxvalue);
}
function _round_robin(token, services) {
    var max = services.length;
    var current = token;
    current++;
    if (current >= max) {
        current = 0;
    }
    return current;
}
function _random(max) {
    return _randomize(max - 1);
}

var Balancer = function (options) {
    console.log('new instance of balancer...');
    this.name = options.name;
    this.mode = options.mode;
    this.services = options.services;
    this.roundrobintoken = 0;
}

//inherits
var eventThis = require('yourttoo.common').eventtrigger;
eventThis.eventtrigger(Balancer);


Balancer.prototype.addservice = function (service) {
    if (this.services.indexOf(service) < 0) {
        this.services.push(service);
    }
}

Balancer.prototype.removeservice = function (service) {
    this.services = _.filter(this.services, function (scv) { return svc != service; });
}

Balancer.prototype.getservice = function () {
    var url = '';
    switch (this.mode) {
        case 'round-robin':
            this.roundrobintoken = _round_robin(this.roundrobintoken, this.services);
            url = this.services[this.roundrobintoken];
            break;
        case 'random': 
            var token = _random(this.services.length);
            url = this.services[token];
            break;
        default: break;
    }
    this.emit('balanced', url);
    return url;
}

module.exports.Balancer = Balancer;
