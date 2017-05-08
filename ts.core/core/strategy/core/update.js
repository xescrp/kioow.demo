var common = require('yourttoo.common');

module.exports = function (options, callback, errorcallback) {
    var core = options.core;

    var mongo = core.mongo;
    var coreobj = core.corebase;

    var query = null;
    var updateset = null;

    if (options.query != null) {
        query = options.query;
    }
    if (options.update != null) {
        updateset = { $set: options.update };
    }
    var filter = { query: query, collectionname: options.collectionname };
    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());
    var originaldata = null;

    cev.on('saved.ok', function (hdata) {
        callback(hdata);
        var collection = options.collectionname;

        var mmed = require('../../mediator/hermes.mediator');
        var mediator = new mmed.HermesMediator();

        var action = 'update';
        originaldata = originaldata;

        var hresult = null;
        switch (action) {
            case 'update':
                hresult = { current: updateset, original: originaldata };
                break;
            case 'new':
                hresult = hdata;
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
        originaldata = bbddobj;
        bbddobj != null ?
            cev.emit('model.ready', bbddobj) :
            cev.emit('finded.error', 'no objects matching your query found');
    });

    cev.on('model.ready', function (documents) {
        updateset != null ?
        coreobj.list(options.collectionname).model.update(query, updateset, function (err, numAffected) {
            err != null ? setImmediate(function () {
                console.error('Command Update FAILED!!');
                console.error(err);
                errorcallback(err);
            }) :
                setImmediate(function () {
                    console.log('Command Update SUCCESSFUL!!');
                    originaldata = documents;
                    cev.emit('saved.ok', { updated: true, recordsupdate: numAffected });
                });
            }) : cev.emit('finded.error', 'no update conditions found your update command');;
    });

    cev.on('finded.error', function (rs) {
        console.log('error finding model...');
        errorcallback(rs);
    });

    //check if it's new
    if (filter.query == null) {
        cev.emit('finded.error', 'no query found on your update command');
    } else {
        mongo.find(filter, function (result) {
            if (result.ResultOK == true) {
                options.populate == null ? cev.emit('finded.ok', result.Data) :
                    coreobj.list(options.collectionname).model.populate(result.Data, options.populate,
                        function (err, populatedocs) {
                        if (err) {
                            cev.emit('finded.error', err);
                        } else {
                            cev.emit('finded.ok', populatedocs);
                        }
                    });
            }
            else {
                cev.emit('finded.error', result);
            }
        });
    }
}
