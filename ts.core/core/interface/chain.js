var common = require('yourttoo.common');

var Chain = function (configuration) {
    this.links = new common.hashtable.HashTable();
    this.order = [];
    this.lastlinkname = null;
    //configure links...
    if (configuration != null) {
        if (typeof configuration === 'string') {
            var _links = configuration.split(' ');
            for (var i = 0, len = _links.length; i < len; i++) {
                //raw config name
                var _conf = _links[i];
                //conf for link
                var conf = _conf.split('#');
                var p = {
                    service: conf[0],
                    method: conf[1]
                };
                //new link for chain
                var link = new Link(p);
                this.addlink(link);
            }
        } else {
            for (var i = 0, len = _links.length; i < len; i++) {
                var p = _links[i];
                if (typeof (p) === 'string') {
                    var conf = p.split('#');
                    p = {
                        service: conf[0],
                        method: conf[1]
                    };
                }
                var link = new Link(p);
                this.addlink(link);
            }
        }
        //set the execution order...
        for (var j = 0, len2 = this.order.length; j < len2; j++) {
            if (j > 0) {
                var current = this.order[j];
                var prev = this.order[j - 1];
                this.links.get(prev).setnextlink(this.links.get(current));
                this.lastlinkname = current;
            }
        }
        
    }
    this.configuration = configuration;
    
}
common.eventtrigger.eventtrigger(Chain);

Chain.prototype.run = function (request) {
    if (this.links != null && this.links.length > 0) {
        var first = this.order[0];
        var link = this.links.get(first);
        link.exec(request);
    } else { 
        this.emit('chain.done', request);
    }
}

Chain.prototype.addlink = function (link) { 
    this.links.set(link.name, link);
    this.order.push(link.name);
    var self = this;

    link.on('link.done', function (link, result) {
        if (link.successor == null) {
            //last link done...
            self.emit('chain.done', result);
        }
    });

    link.on('link.error', function (link, err) { 
        //chain is broken
        console.log('chain is broken...');
        console.log(err);

        self.emit('chain.error', err);

    });
}

var Link = function (options) {
    this.strategy = require('../strategy')();
    this.name = options.service + '#' + options.method;
    this.successor = null;
    this.configuration = {
        request: null,
        service: options.service,
        method: options.method
    };

}
common.eventtrigger.eventtrigger(Link);

Link.prototype.processrequest = function (request, callback, errorcallback) {
    var stargs = {
        args: request.request,
        strategyservice: request.service || 'chain',
        strategymethod: request.method,
        completion: request.completion
    };
    var rq = null;
    if (request.forkprocess) {
        rq = core.strategy.forkstrategy(stargs, callback, errorcallback);
    }
    else {
        rq = core.strategy.execstrategy(stargs, callback, errorcallback);
    }
    return rq;
}

Link.prototype.exec = function (conf) {
    var self = this;

    var idts = common.utils.getToken();
    var eventkey =  idts + '.done';
    var erroreventkey = idts + '.error';
    
    var rq = {
        request: conf,
        service: this.configuration.service,
        method: this.configuration.method,
        completion: {
            oncompleteeventkey: eventkey,
            onerroreventkey: erroreventkey
        }
    };

    var rt = core.processrequest(rq);

    rt.on(eventkey, function (result) {
        if (self.successor != null) {
            self.successor.exec(result);
            self.emit('link.done', self, result);
        }
    });
    rt.on(erroreventkey, function (err) { 
        self.emit('link.error', self, err);
    });    
}

Link.prototype.setnextlink = function (link) {
    this.successor = link;
}

module.exports.Chain = Chain;
module.exports.Link = Link;