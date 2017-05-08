var createclient = null;
module.exports.createclient = createclient = function () {
    var _client = require('./lib/client');
    return new _client.Client();
}
var createserver = null;
module.exports.createserver = createserver = function () {
    var server = require('./lib/listener');
    return server;
}
var createwatcher = null;
module.exports.createwatcher = createwatcher = function () {
    var _builder = (function () {
        return function () {
            var _w = require('./lib/watcher');
            var watcher = new _w.Watcher();
            return watcher;
        }
    })();
    return _builder();
}
var startwatcherpool = null;
module.exports.startwatcherpool = startwatcherpool = function (conf) {
    var common = require('yourttoo.common');
    var _ = require('underscore');
    var fs = require('fs');
    var _builder = (function () {
        return function () {
            var pool = {
                id: common.utils.getToken(),
                watcher: null,
                client: createclient(),
                queue: []
            };
            var defconfig = require('./configuration');
            var configuration = conf || defconfig;

            var watcher = createwatcher();
            pool.watcher = watcher;

            _.each(configuration.folders, function (folder) {
                var wt = pool.watcher.watch(folder.sourcefolder, folder);

                wt.on('folder.added', function (addfolder) {
                    console.log('watcher detected an added folder...');
                    console.log(addfolder);
                });
                
                wt.on('file.added', function (fileinfo) {
                    console.log('watcher detected an added file...');
                    console.log(fileinfo.fullpath);
                    var targetfile = common.utils.replaceAll(fileinfo.fullPath.toLowerCase(),'\\', '/');
                    targetfile = targetfile.replace(folder.sourcefolder.toLowerCase(), folder.targetfolder);
                    var conf = {
                        url: folder.server,
                        source: fileinfo.fullPath,
                        filetarget: targetfile,
                    };
                    console.log('copy task enqueue for ' + fileinfo.fullPath);
                    console.log('it will be copied to ' + conf.filetarget + ' on server ' + folder.server);
                    pool.queue.push(conf);
                });

                wt.on('file.changed', function (fileinfo, changes) {
                    console.log('watcher detected an modified file...');
                    var targetfile = common.utils.replaceAll(fileinfo.fullPath.toLowerCase(), '\\', '/');
                    targetfile = targetfile.replace(folder.sourcefolder.toLowerCase(), folder.targetfolder);
                    var conf = {
                        url: folder.server,
                        source: fileinfo.fullPath,
                        filetarget: targetfile,
                    };
                    console.log('copy task enqueue for ' + fileinfo.fullPath);
                    console.log('it will be copied to ' + conf.filetarget + ' on server ' + folder.server);
                    pool.queue.push(conf);
                });
                console.log('watching changes on ' + folder.sourcefolder + ' -> monitor: ' + wt.name);
            });

            pool.queueinterval = setInterval(function () {
                var task = (pool.queue.length > 0) ? pool.queue.shift() : null;
                (task != null) ? process.nextTick(function () {
                    console.log('processing copy task');
                    console.log('sending file to ' + task.url);
                    var cptask = pool.client.send(task);
                    cptask.on('send.done', function (res) {
                        console.log('copy remote file...DONE!');
                        console.log(task);
                        //delete file...
                        //fs.unlink(fileinfo.fullPath, function (err) {
                        //    err != null ? 
                        //    console.log('Error deleting file ' + fileinfo.fullpath) : 
                        //    console.log('file deleted ' + fileinfo.fullpath);
                        //});
                    });
                    cptask.on('send.error', function (err) {
                        console.log('Error copying remote file...');
                        console.log(task);
                        console.log(err);
                    });
                }) : null;
            }, 5000);
            return pool;
        }
    })();
    return _builder();
}
