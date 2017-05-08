var _ = require('underscore');
var fs = require('fs');
var common = require('yourttoo.common');
var path = require('path');

var Watcher = function () {
    this.id = common.utils.getToken();
    this.monitors = [];
    this.directories = [];
    this.getmonitor = function (name) {
        return _.filter(this.monitors, function (w) { 
            return w.name == name;
        });
    }
}

var eventThis = common.eventtrigger;
eventThis.eventtrigger(Watcher);


//Events: 
//file.removed : a file has been removed from directory
//folder.removed: a folder has been removed from directory
//file.changed: a file has been changed from directory
//file.added: a file has been add to the directory
Watcher.prototype.watch = function (directorypath, options) {
    var self = this;
    self.directories.push(directorypath);

    var _watch = (function (directorypath, self) {
        return function (directorypath, self) {

            var wmonitor = { parent: self.id, id: common.utils.getToken() };
            eventThis.eventtrigger(wmonitor);

            var defaultconfig = {
                key: '',
                filter: null
            };
            var hMatch = {
                exclude: function (filedetail) {
                    var res = false;
                    var mres = null;
                    if (this.key(filedetail)) {
                        mres = _.map(config.filter.exclude, function (m) {
                            res = m.indexOf('*') == 0 ? 
                            (m.replace('*', '').toLowerCase() != (filedetail.extension.toLowerCase())) : 
                            (m.replace('*', '').toLowerCase() != filedetail.fileName.toLowerCase())
                            });
                            return res;
                    }
                    res = (mres != null && mres.length > 0) ? _.some(mres, function (val) { return val == true; }) : false;
                    return res;
                },
                match : function (filedetail) {
                    var res = false;
                    var mres = null;
                    if (this.key(filedetail)) {
                        mres = _.map(config.filter.match, function (m) {
                            res = m.indexOf('*') == 0 ? 
                            (m.replace('*', '').toLowerCase() == (filedetail.extension.toLowerCase())) : 
                            (m.replace('*', '').toLowerCase() == filedetail.fileName.toLowerCase())
                            return res;
                        });
                    }
                    console.log(mres);
                    res = (mres != null && mres.length > 0) ? _.some(mres, function (val) { return val == true; }) : false;
                    return res;
                },
                key: function (filedetail) {
                    var key = common.utils.replaceAll(filedetail.directory.toLowerCase(), '\\', '/');
                    return key.indexOf(config.key) == 0;
                }
            };
            
            var config = options || defaultconfig;
            config.key = directorypath.toLowerCase();

            var dirwatch = require("./directorywatcher.js");

            wmonitor = new dirwatch.DirectoryWatcher(directorypath, true);
            wmonitor.start(500);
            wmonitor.name = options.name;

            wmonitor.on("fileRemoved", function (fileDetail) {
                var ok = hMatch.key(fileDetail);
                ok = (config.filter != null && config.filter.match != null && config.filter.match.length > 0) ? 
                    hMatch.match(fileDetail): ok;
                ok = (config.filter != null && config.filter.exclude != null && config.filter.exclude.length > 0) ?
                    hMatch.exclude(fileDetail): ok;
                ok ? wmonitor.emit('file.removed', fileDetail) : null; 
            });
            
            wmonitor.on("folderRemoved", function (folderPath) {
                wmonitor.emit('folder.removed', folderPath);
            });
            
            wmonitor.on("fileChanged", function (fileDetail, changes) {
                //console.log(fileDetail);
                var ok = hMatch.key(fileDetail);
                ok = (config.filter != null && config.filter.match != null && config.filter.match.length > 0) ? 
                    hMatch.match(fileDetail): ok;
                ok =(config.filter != null && config.filter.exclude != null && config.filter.exclude.length > 0) ?
                    hMatch.exclude(fileDetail): ok;
                ok ? wmonitor.emit('file.changed', fileDetail, changes) : null;
            });
            
            wmonitor.on("fileAdded", function (fileDetail) {
                //console.log(fileDetail);
                var ok = hMatch.key(fileDetail);
                ok = (config.filter != null && config.filter.match != null && config.filter.match.length > 0) ? 
                    hMatch.match(fileDetail): ok;
                ok = (config.filter != null && config.filter.exclude != null && config.filter.exclude.length > 0) ?
                    hMatch.exclude(fileDetail): ok;
                ok ? wmonitor.emit('file.added', fileDetail) : null;
            });
            
            wmonitor.on("folderAdded", function (fileDetail) { 
                //console.log(fileDetail);
                wmonitor.emit('folder.added', fileDetail);
            })
            
            self.monitors.push(wmonitor);

            return wmonitor;
        }
    })(directorypath, self);
    
    return _watch(directorypath, self);

}

module.exports.Watcher = Watcher;