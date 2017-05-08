module.exports = function (conf, callback) { 

    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());
    
    cev.on('scheduler.trigger', function (result) {
        var mmed = require('../../../../mediator/scheduler.mediator');
        var mediator = new mmed.SchedulerMediator();
        
        var command = 'schedule';
        var data = {
            interval: 500,
            eventKeys: conf.scheduletasks
        };
        
        mediator.send(command, data, function (rs) {
            console.log('Scheduled received');
            console.log(rs);
        });
        
        console.log('destinations files work scheduled after cms update at ' + new Date());
        callback(null, conf);
    });

    conf.scheduletasks != null && conf.scheduletasks.length > 0 ? cev.emit('scheduler.trigger') : callback(null, conf);
}