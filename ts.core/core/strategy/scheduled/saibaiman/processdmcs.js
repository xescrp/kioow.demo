module.exports = function (conf, callback) {
    var dmcids = conf.dmcids;
    var core = conf.core;
    var common = require('yourttoo.common');
    var _ = require('underscore');
    var statics = { total: 0, done: 0, witherrors: 0, success: 0 };
    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());
    var witherrors = [];

    cev.on('process.done', function () {
        conf.results = {
            code: 'DMC Batch finished',
            messages: conf.messages,
            statics: statics,
            witherrors: witherrors
        };
        callback(null, conf);
    });

    cev.on('process.dmc', function (dmc) {
        dmc != null ?
            setImmediate(function () {
                dmc.save(function (err, doc) {
                    err != null ? (witherrors.push({ code: dmc.code, error: err }), statics.witherrors++, console.log('DMC processed KO - ' + dmc.code), console.log(err)) : null;
                    doc != null ? (statics.success++, console.log('DMC processed OK - ' + dmc.code)) : null;
                    statics.done++;
                    cev.emit('next.dmc');
                });
            }) :
            setImmediate(function () {
                statics.done++;
                statics.witherrors++;
                cev.emit('next.dmc');
            });
    });

    cev.on('dmc.id', function (dmcid) {
        var query = {
            _id: dmcid
        };
        core.list('DMCs').model.find(query)
            .populate('user')
            .exec(function (err, docs) {
                err != null ?
                    cev.emit('report.dmcerror', { id: dmcid, error: err }) :
                    cev.emit('process.dmc', docs[0]);
            });

    });
    
    cev.on('next.dmc', function () {
        var dmcid = dmcids != null && dmcids.length > 0 ? dmcids.shift() : null;
        dmcid != null ? cev.emit('dmc.id', dmcid) : cev.emit('process.done');
    });

    dmcids != null && dmcids.length > 0 ?
        setImmediate(function () {
            statics.total = dmcids.length;
            cev.emit('next.dmc');
        })
        :
        setImmediate(function () {
            console.log('nothing to do');
            conf.results = {
                code: 'DMC Batch : ',
                messages: ['Process finished without any DMC processed']
            };
            cev.emit('process.done');
        });
}