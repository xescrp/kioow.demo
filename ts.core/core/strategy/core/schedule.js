module.exports = function (options, callback, errorcallback) {
    console.log('lets schedule a task');
    var mmed = require('../../mediator/scheduler.mediator');
    var mediator = new mmed.SchedulerMediator();

    var command = 'schedule';
    var data = {
        interval: options.interval,
        eventKeys: options.schedulekeys
    };

    mediator.send(command, data, function (rs) {
        console.log('Scheduled received');
        console.log(rs);
    });

    setTimeout(function () {
        callback({ ResultOK: true, Message: 'tasks scheduled' });
    }, 3000);
}