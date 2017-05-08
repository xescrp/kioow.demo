var common = require('yourttoo.common');

module.exports = function (options, callback, errorcallback) {
    var core = options.core;
    
    var mongo = core.mongo;
    var coreobj = core.corebase;
    
    var query = null;
    if (options.query != null) {
        query = options.query;
    }
    var filter = { query: query, collectionname: options.collectionname, populate: options.populate };
    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());
    var originaldata = null;
    var codecases = {
        Bookings: function (doc, code) { doc.idBooking = code; return doc; },
        WLCustomizations: function (doc, code) { doc.code = doc.code || code; return doc; },
        "default": function (doc, code) { doc.code = code; return doc; }
    };
    cev.on('saved.ok', function (hdata) {
        callback(hdata);
        var data = hdata;
        var collection = options.collectionname;
        
        var mmed = require('../../mediator/hermes.mediator');
        var mediator = new mmed.HermesMediator();

        var action = (originaldata != null) ? 'update' : 'new';
        originaldata = originaldata || data;
        
        var hresult = null;
        switch (action) {
            case 'update':
                hresult = { current: data, original: originaldata };
                break;
            case 'new':
                hresult = data;
                break;
        }
        var subject = mediator.getsubject(collection);
        console.log('notify hermes subject: ' + subject);
        var commandkey = 'notify.suscribers';
        var hrq = {
            subject: subject,
            action: action,
            data: hresult,
            oncompleteeventkey: 'notify.suscribers.done',
            onerroreventkey: 'notify.suscribers.error'
        };
        
        mediator.send(commandkey, hrq, function (result) {
            console.log('Hermes ' + subject + ' notified event: ' + hrq.action);
        });

    });
    
    cev.on('finded.ok', function (bbddobj) {
        console.log('save command ..  firts decoration');
        options.collectionname == 'UserQueries' ?
            setImmediate(function () {
                var tailorquotes = require('../../decorator/userquery/quote.autocomplete');
                tailorquotes({ core: core, document: options.data, member: options.auth, modelname: options.collectionname },
                    function (tdocument) {
                        options.data = tdocument;
                        cev.emit('finded.ok.next.md.1', bbddobj);
                    },
                    function (err) {
                        errorcallback(err);
                    });
            }) :
            setImmediate(function () {
                cev.emit('finded.ok.next.md.1', bbddobj);
            });
    });

    cev.on('finded.ok.next.md.1', function (bbddobj) {
        console.log('save command ..  second decoration');
        options.collectionname == 'Quotes' ?
            setImmediate(function () {
                var tailorquotes = require('../../decorator/quote/quote.userqueryupdater');
                tailorquotes({ core: core, document: options.data, member: options.auth, modelname: options.collectionname },
                    function (tdocument) {
                        options.data = tdocument;
                        cev.emit('finded.ok.next', bbddobj);
                    },
                    function (err) {
                        errorcallback(err);
                    });
            }) :
            setImmediate(function () {
                cev.emit('finded.ok.next', bbddobj);
            });
    });

    cev.on('finded.ok.next', function (bbddobj) {
        console.log('save command ..  last step');
        var source = options.data;
        if (bbddobj != null && source != null) {
            //the object exists in BBDD
            console.log('target: get! %s', bbddobj._id);
            console.log('source: its! %s', source._id);

            originaldata = (bbddobj != null) ? bbddobj.toObject() : null;
            bbddobj = common.utils.synchronyzeProperties(
                source,
                bbddobj,
                {
                    schema: coreobj.list(filter.collectionname).schema,
                    verbose: 'low'
                });
            console.log('after synchro...');
            cev.emit('model.ready', bbddobj);
        } else {
            //create new...
            console.log('a new model object to create...');
            require('../../factory/codesgenerator')(mongo, options.collectionname, function (cbcode) {
                //reformat the code 
                cbcode = require('../../factory/codesformatter')({
                    code: cbcode,
                    collectionname: options.collectionname,
                    document: source
                });
                //very special case....
                var codecaserunner = codecases[options.collectionname] || codecases.default;
                source = codecaserunner(source, cbcode);

                bbddobj = mongo.getmodel({ collectionname: options.collectionname, modelobject: source });
                options.populate == null ? setImmediate(function () {
                    cev.emit('model.ready', bbddobj);
                }) : setImmediate(function () {
                    coreobj.list(options.collectionname).model.populate(bbddobj, options.populate, function (err, populatedoc) {
                        bbddobj = populatedoc;
                        cev.emit('model.ready', bbddobj);
                    });
                });
            });
        }
    });

    cev.on('model.ready', function (document) {
        delete document['__v'];
        var loggeduser = options.auth;
        var email = (loggeduser != null && loggeduser.user != null) ? loggeduser.user.email : null;
        document.updatedOnUser = email;
        document.save(function (err, doc) {
            err != null ? setImmediate(function () {
                console.error('Command Save FAILED!!');
                console.error(err);
                errorcallback(err);
            }) :
                setImmediate(function () {
                    console.log('Command Save SUCCESSFUL!!');
                    options.populate == null ? cev.emit('saved.ok', doc.toObject()) :
                        coreobj.list(options.collectionname).model.populate(doc, options.populate, function (err, populatedoc) {
                            err != null ? errorcallback(err) : cev.emit('saved.ok', populatedoc.toObject());
                        });
                });
        });
    });

    cev.on('finded.error', function (rs) {
        console.log('error finding model...');
        errorcallback(rs);
    });
    
    //check if it's new
    if (filter.query == null) {
        cev.emit('finded.ok', null);
    } else {
        mongo.findone(filter, function (result) {
            if (result.ResultOK == true) {

                cev.emit('finded.ok', result.Data)

                //options.populate == null ? cev.emit('finded.ok', result.Data) : 
                //    coreobj.list(options.collectionname).model.populate(result.Data, options.populate, function (err, populatedoc) { 
                //        err != null ? cev.emit('finded.error', err) : cev.emit('finded.ok', populatedoc);
                //});
            }
            else {
                cev.emit('finded.error', result);
            }
        });
    }
}