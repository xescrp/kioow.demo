module.exports = function (conf, callback) {

    console.log('getting programs');
    var common = require('yourttoo.common');
    var _ = require('underscore');

    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());

    var done = {
        count: false,
        last: false,
        noavail: false,
        underreview: false,
        draft: false
    };

    function isdoneandexit() {
        var isdone = _.every(done);
        isdone == true ? callback(null, conf) : null;
    }

    cev.on('program.count', function () {
        done.count = true;
        isdoneandexit();
    });

    cev.on('program.noavail', function () {
        done.noavail = true;
        isdoneandexit();
    });

    cev.on('program.last', function () {
        done.last = true;
        isdoneandexit();
    });

    cev.on('program.underreview', function () {
        done.underreview = true;
        isdoneandexit();
    });

    cev.on('program.draft', function () {
        done.draft = true;
        isdoneandexit();
    });

    var core = conf.core;

    core.list('DMCProducts').model.find().count(function (err, count) {
        conf.results.programs.total = count;
        cev.emit('program.count');
    });

    core.list('DMCProducts').model.find({ publishState: ['published'] }).count(function (err, count) {
        conf.results.programs.published = count;
        cev.emit('program.last');
    });

    core.list('DMCProducts').model.find({ publishState: ['published.noavail'] }).count(function (err, count) {
        conf.results.programs.publishednoavail = count;
        cev.emit('program.noavail');
    });

    core.list('DMCProducts').model.find({ publishState: ['under review'] }).count(function (err, count) {
        conf.results.programs.underreview = count;
        cev.emit('program.underreview');
    });

    core.list('DMCProducts').model.find({ publishState: ['draft'] }).count(function (err, count) {
        conf.results.programs.draft = count;
        cev.emit('program.draft');
    });
    
}