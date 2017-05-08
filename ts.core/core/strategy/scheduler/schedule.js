module.exports = function (options, callback, errorcallback) {
    var _ = require('underscore');

    var scheduler = options.scheduler;
    var interval = options.interval || 5;
    var eventKeys = options.eventKeys;
    console.log('Scheduling a task ... in ' + interval);
    if (eventKeys != null) {
        var interval = interval;
        var tasks = _.filter(scheduler.scheduled, function (sch) {
            return eventKeys.indexOf(sch.configuration.key) >= 0;
        });
        if (tasks != null && tasks.length > 0) {
            _.each(tasks, function (task) {
                task.schedule(interval);
            });
        }
    }
}