var common = require('yourttoo.common');
var _ = require('underscore');

module.exports = function () {
    
    this.configuration = require('../configurations/strategy.mapping.config').configuration;
    this.cmutils = common.utils;
    
    //Generic method, get the strategy script path
    function getstrateypath(options) {
        var strategiespath = strategist.configuration.strategiespath;
        var strategiesfolder = null;
        
        var stmap = strategist.configuration[options.strategyservice];
        strategiesfolder = (stmap != null && stmap.strategiesfolder != '') ? stmap.strategiesfolder : options.strategyservice;
        if (options.args.visitor != null && options.args.visitor != '') {
            strategiespath = strategist.configuration.visitorspath;
            strategiespath = [strategiespath, options.strategymethod].join('/');
            strategiesfolder = '';
            options.strategymethod = options.args.visitor;
        }
        //full path to script
        var stpath = strategiespath + strategiesfolder;
        var method = (stmap != null) ? stmap[options.strategymethod] : options.strategymethod;
        method = (method != null && method != '') ? method : options.strategymethod; //last check for method...
        //console.log(stmap);
        stpath += '/' + method;
        return stpath;
    }
    
    this.getstrategymap = function(service) {
        var stmap = strategist.configuration[service];
        return stmap;
    }
    
    var _async_handler = function (strategist) {
        this.strategist = strategist;
        this.result = null;
        this.error = null;
        this.config = null;
    };
    
    common.eventtrigger.eventtrigger(_async_handler);
    
    _async_handler.prototype.setconfig = function (config) {
        this.config = config;
    }
    
    _async_handler.prototype.after = function (args) {
        var _aself = this;
        //configure completions, chains and joins...
        var aftercomplete = {
            chain: false,
            join: false,
            haserrors: false,
            error: null,
            result: args,
            isdone: function () {
                var s = this;
                return s.chain && s.join;
            }
        };
        var _st_carrier = function () {
            this.name = 'after_strategy_handler_' + new Date(),
            this.date = new Date()
        }
        common.eventtrigger.eventtrigger(_st_carrier);
        var st_carrier = new _st_carrier();
        
        //HANDLERS...
        //configure handlers..
        st_carrier.on('chain.done', function (result) {
            aftercomplete.chain = true;
            _.extend(aftercomplete.result, result);
            if (aftercomplete.isdone()) {
                st_carrier.emit('after.done', aftercomplete);
            }
        });
        st_carrier.on('chain.error', function (err) {
            aftercomplete.chain = true;
            aftercomplete.haserrors = true;
            aftercomplete.error = err;
            if (aftercomplete.isdone()) {
                st_carrier.emit('after.done', aftercomplete);
            }
        });
        st_carrier.on('join.done', function (result) {
            aftercomplete.join = true;
            _.extend(aftercomplete.result, result);
            if (aftercomplete.isdone()) {
                st_carrier.emit('after.done', aftercomplete);
            }
        });
        st_carrier.on('join.error', function (err) {
            aftercomplete.join = true;
            aftercomplete.haserrors = true;
            aftercomplete.error = err;
            if (aftercomplete.isdone()) {
                st_carrier.emit('after.done', aftercomplete);
            }
        });
        //last step handler...
        st_carrier.on('after.done', function (completeresults) {
            if (!completeresults.haserrors) {
                _.extend(args, completeresults.result);
                _aself.emit('after.done', args);
            } else {
                _aself.emit('after.error', completeresults.error);
            }
        });
        
        //RUNNERS
        //do after...
        if (_aself.config != null && _aself.config.after != null) {
            //do chains...
            var chain = new require('../interface/chains').Chain(_aself.config.after.chains);
            
            chain.on('chain.done', function (result) {
                st_carrier.emit('chain.done', result);
            });
            
            chain.on('chain.error', function (err) {
                console.log('Chain before broken on request...');
                console.log(err);
                st_carrier.emit('chain.error', err);
            });
            //run chain..
            chain.run(args);
            
            //do joins...
            var join = new require('../interface/join').Join(_aself.config.after.joins);
            
            join.on('join.done', function (result) {
                st_carrier.emit('join.done', result);
            });
            
            join.on('join.error', function (err) {
                console.log('Join before broken on request...');
                console.log(err);
                st_carrier.emit('join.error', result);
            });
            //run join..
            join.run(args);
        } else {
            //emit all complete...
            st_carrier.emit('chain.done', args);
            st_carrier.emit('join.done', args);
        }

    }
    
    _async_handler.prototype.before = function (args) {
        var _aself = this;
        //configure completions, chains and joins...
        var beforecomplete = {
            chain: false,
            join: false,
            haserrors: false,
            error: null,
            result: args,
            isdone: function () {
                var s = this;
                return s.chain && s.join;
            }
        };
        var _st_carrier = function () {
            this.name = 'before_strategy_handler_' + new Date(),
            this.date = new Date()
        }
        common.eventtrigger.eventtrigger(_st_carrier);
        var st_carrier = new _st_carrier();
        
        //HANDLERS...
        //configure handlers..
        st_carrier.on('chain.done', function (result) {
            beforecomplete.chain = true;
            _.extend(beforecomplete.result, result);
            if (beforecomplete.isdone()) {
                st_carrier.emit('before.done', beforecomplete);
            }
        });
        st_carrier.on('chain.error', function (err) {
            beforecomplete.chain = true;
            beforecomplete.haserrors = true;
            beforecomplete.error = err;
            if (beforecomplete.isdone()) {
                st_carrier.emit('before.done', beforecomplete);
            }
        });
        st_carrier.on('join.done', function (result) {
            beforecomplete.join = true;
            _.extend(beforecomplete.result, result);
            if (beforecomplete.isdone()) {
                st_carrier.emit('before.done', beforecomplete);
            }
        });
        st_carrier.on('join.error', function (err) {
            beforecomplete.join = true;
            beforecomplete.haserrors = true;
            beforecomplete.error = err;
            if (beforecomplete.isdone()) {
                st_carrier.emit('before.done', beforecomplete);
            }
        });
        //last step handler...
        st_carrier.on('before.done', function (completeresults) {
            if (!completeresults.haserrors) {
                _.extend(args, completeresults.result);
                _aself.emit('before.done', args);
            } else {
                _aself.emit('before.error', completeresults.error);
            }
        });
        
        //RUNNERS
        //do after...
        if (_aself.config != null && _aself.config.before != null) {
            //do chains...
            var chain = new require('../interface/chains').Chain(_aself.config.before.chains);
            
            chain.on('chain.done', function (result) {
                st_carrier.emit('chain.done', result);
            });
            
            chain.on('chain.error', function (err) {
                console.log('Chain before broken on request...');
                console.log(err);
                st_carrier.emit('chain.error', err);
            });
            //run chain..
            chain.run(args);
            
            //do joins...
            var join = new require('../interface/join').Join(_aself.config.before.joins);
            
            join.on('join.done', function (result) {
                st_carrier.emit('join.done', result);
            });
            
            join.on('join.error', function (err) {
                console.log('Join before broken on request...');
                console.log(err);
                st_carrier.emit('join.error', result);
            });
            //run join..
            join.run(args);
        } else {
            //emit all complete...
            st_carrier.emit('chain.done', args);
            st_carrier.emit('join.done', args);
        }
    }
    
    _async_handler.prototype.current = function (args) {
        var _aself = this;
        var options = this.config;
        var stpath = getstrateypath(options);
        var strategy = require(stpath);
        
        var _st_carrier = function () {
            this.name = 'current_strategy_handler_' + new Date(),
            this.date = new Date()
        }
        common.eventtrigger.eventtrigger(_st_carrier);
        var st_carrier = new _st_carrier();
        
        st_carrier.on('current.done', function (result) {
            _aself.emit('current.done', result);
        });
        st_carrier.on('current.error', function (err) {
            _aself.emit('current.error', err);
        });
        
        try {
            strategy(options.args, 
                function (result) {
                st_carrier.emit('current.done', result);
            }, function (err) {
                st_carrier.emit('current.done', err); //handled error...
            });
        }
            catch (err) {
            console.log(err); //Strategy rejected
            st_carrier.emit('current.done', err);
        }

    }

    

    //UNSTABLE: 1 - STRATEGY RUNNING IN THE SAME PROCESS (PRE AND POST HANDLING)
    this.execstrategies = function (options, callback, errorcallback) {
        //event management
        var completeevent = '';
        var errorevent = '';
        //completion event handlers...
        if (options.args.completion != null) {
            completeevent = options.args.completion.oncompleteeventkey;
            errorevent = options.args.completion.onerroreventkey;
        } else {
            completeevent = options.args.oncompleteeventkey;
            errorevent = options.args.onerroreventkey;
        }
        //get the request ready...
        var beforehandler = null;
        var afterhandler = null;
        var currenthandler = null;
        var beforeconfig = options.args.before;
        var afterconfig = options.args.after;
        delete options.args.before;
        delete options.args.after;
        var currentconfig = options;
        
        //response handler
        var _st_carrier = function (idcarrier) {
            this.idkey = idcarrier;
            this.name = 'strategy.' + options.method + '.' + new Date(),
            this.date = new Date()
        }
        common.eventtrigger.eventtrigger(_st_carrier);
        var _carrierid = common.utils.getToken();
        var st_carrier = new _st_carrier(_carrierid);

        //configure runner handlers...
        beforehandler = new _async_handler(this);
        afterhandler = new _async_handler(this);
        currenthandler = new _async_handler(this);

        beforehandler.setconfig(beforeconfig);
        afterhandler.setconfig(afterconfig);
        currenthandler.setconfig(currentconfig);
        
        //in - out
        var INPUT = options;
        var ARGS = options.args;
        var OUTPUT = null;
        
        //handlers...
        beforehandler.on('before.done', function (result) {
            _.extend(ARGS, result);
            currenthandler.current(ARGS);
        });

        beforehandler.on('before.error', function (err) {
            st_carrier.emit('strategy.error', err);
        });

        afterhandler.on('after.done', function (result) {
            _.extend(OUTPUT, result);
            st_carrier.emit('strategy.done', OUTPUT);
        });
        
        afterhandler.on('after.error', function (err) {
            st_carrier.emit('strategy.error', err);
        });

        currenthandler.on('current.done', function (result) {
            OUTPUT = result;
            afterhandler.after(OUTPUT);
        });
        
        currenthandler.on('current.error', function (err) {
            st_carrier.emit('strategy.error', err);
        });

        st_carrier.on('strategy.done', function (result) { 
            st_carrier.emit(completeevent, result); //handled result...
            if (callback) {
                callback(result);
            }
        });
        st_carrier.on('strategy.error', function (err) { 
            st_carrier.emit(errorevent, err); //handled error...
            if (errorcallback) {
                errorcallback(err);
            }
        });
        
        //run everything...
        beforehandler.before(options.args);

        return st_carrier;
    }

    //STABLE: 4 - STRATEGY WITHOUT BEFORE AND AFTER RUNNING IN THE SAME PROCESS (SELF INVOKE)
    this.execstrategy = function (options, callback, errorcallback) {
        
        var _exec_strategy = (function (options, callback, errorcallback) {
            return function (options, callback, errorcallback) { 
                var stpath = getstrateypath(options);
                
                var strategy = require(stpath);
                var completeevent = options.strategymethod + '.done';
                var errorevent = options.strategymethod + '.error';
                //completion event handlers...
                if (options.args.completion != null) {
                    completeevent = options.args.completion.oncompleteeventkey || completeevent;
                    errorevent = options.args.completion.onerroreventkey || errorevent;
                } else {
                    completeevent = options.args.oncompleteeventkey || completeevent;
                    errorevent = options.args.onerroreventkey || errorevent;
                }
                
                //do it
                //@@ ## start ready the event carrier and process flow....
                var _st_carrier = function (idcarrier, erroreventkey, errorcallback) {
                    this.idkey = idcarrier;
                    this.name = 'strategy.' + options.strategymethod;
                    this.date = new Date();
                    this.uncaughtexceptionhandler = function (err) {
                        console.log('Exception caught on strategy flow process...' + err);
                        var rterror = { error : err.message, stack: err.stack };
                        console.error(rterror);
                        st_carrier.emit(erroreventkey, rterror); //handled error...
                        if (errorcallback) {
                            errorcallback(rterror);
                        }
                        st_carrier.emit('strategy.error', st_carrier);
                    };
                    console.log('add exception handler....' + idcarrier);
                    process.on('uncaughtException', this.uncaughtexceptionhandler);
                };
                var _carrierid = common.utils.getToken();
                common.eventtrigger.eventtrigger(_st_carrier);
                var st_carrier = new _st_carrier(_carrierid, errorevent, errorcallback);
                st_carrier.on('strategy.end', function (carrier) {
                    setTimeout(function () {
                        console.log('remove exception handler[end]....' + carrier.idkey);
                        process.removeListener('uncaughtException', carrier.uncaughtexceptionhandler);
                    }, 2000);
                });
                st_carrier.on('strategy.error', function (carrier) {
                    setTimeout(function () {
                        console.log('remove exception handler[error]....' + carrier.idkey);
                        process.removeListener('uncaughtException', carrier.uncaughtexceptionhandler);
                    }, 2000);
                });
                //@@ ## end ready the event carrier and process flow....
                
                //execute...
                strategy(options.args, 
                   function (result) {
                    st_carrier.emit(completeevent, result);
                    if (callback) {
                        callback(result);
                    }
                    st_carrier.emit('strategy.end', st_carrier);
                }, function (err) {
                    st_carrier.emit(errorevent, err); //handled error...
                    if (errorcallback) {
                        errorcallback(err);
                    }
                    st_carrier.emit('strategy.end', st_carrier);
                });
                
                return st_carrier;
            }
        })(options, callback, errorcallback);

        return _exec_strategy(options, callback, errorcallback);
    }
    
    //UNSTABLE: 0 - STRATEGY RUNNING IN A NEW PROCESS (THREADING) --//TODO: full revision...
    this.forkstrategy = function (options, callback, errorcallback) { 
        var stpath = getstrateypath(options);
        var initializer = {
            taskid: strategist.cmutils.getToken(),
            taskname: options.strategyservice + ' - ' + options.strategymethod,
            taskpath: stpath,
            request: options.args
        };
        var th = require('yourttoo.common').threading;

        var asnc_rsp = th.forkprocess(initializer, null);

        asnc_rsp.on('TASK.FINISHED', function (results) { 
            callback(results);
        });
    }

    var strategist = this;
    return strategist;
}