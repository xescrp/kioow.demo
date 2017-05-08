var common = require('yourttoo.common');

var Join = function (configuration) {
    this.links = new common.hashtable.HashTable();
    this.lastlinkname = null;
    this.result = null;
    this.errors = [];
    this.pendinglinks = 0;
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
                //new link for join
                var link = new Link(p);
                this.addlink(link);
            }
        } else {
            var _links = configuration;
            for (var i = 0, len = _links.length; i < len; i++) {
                var p = _links[i];
                if (typeof p === 'string') {
                    var conf = _conf.split('#');
                    p = {
                        service: conf[0],
                        method: conf[1]
                    };
                }
                var link = new Link(p);
                this.addlink(link);
            }
        }
        
    }
    this.configuration = configuration;
    
}
common.eventtrigger.eventtrigger(Join); 

Join.prototype.run = function (request) {
    this.result = request;
    if (this.links != null && this.links.length > 0) {
        _.each(this.links, function (link) { 
            link.exec(request);
        });
    } else {
        this.emit('join.done', request);
    }
}

Join.prototype.addlink = function (link) {
    this.links.set(link.name, link);
    this.pendinglinks++;
    var self = this;
    
    link.on('link.done', function (link, result) {
        //last link done...
        _.extend(self.result, result);
        //self.result = common.utils.synchronyzeProperties(result, self.result);
        self.pendinglinks--;
        if (self.pendinglinks == 0) {
            self.emit('join.done', self.result);
        }
    });
    
    link.on('link.error', function (link, err) {
        //join failed
        console.log('one link is broken...');
        console.log(err);
        
        this.errors.push(err);
        self.pendinglinks--;
        if (self.pendinglinks == 0) {
            self.emit('join.error', self.errors);
        }
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
        strategyservice: request.service || 'join',
        strategymethod: request.method,
        completion: request.completion
    };
    var self = this;
    var rq = null;
    if (request.forkprocess) {
        rq = self.strategy.forkstrategy(stargs, callback, errorcallback);
    }
    else {
        rq = self.strategy.execstrategy(stargs, callback, errorcallback);
    }
    return rq;
}

Link.prototype.exec = function (conf) {
    var self = this;
    
    var idts = common.utils.getToken();
    var eventkey = idts + '.done';
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
        self.emit('link.done', self, result);
    });
    rt.on(erroreventkey, function (err) {
        self.emit('link.error', self, err);
    });    
}

Link.prototype.setnextlink = function (link) {
    this.successor = link;
}

module.exports.Join = Join;
module.exports.Link = Link;