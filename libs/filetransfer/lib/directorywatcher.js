// ===========================================================================﻿
/*  YOURTTTOO . FOLDER WATCHER - (why we made this? nodejs fs.watch is not working properly...)
   ===========================================================================
   fileAdded        : When a file is added to a monitored directory
   fileChanged      : When a file is changed
   fileRemoved      : When a file is removed
   folderAdded      : When a folder is added (recursive mode only)
   folderRemoved    : When a folder is removed (recursive mode only)
   scannedDirectory : When a directory has been scanned
   ===========================================================================
*/

var fs = require("fs"),
    path = require("path"),
    util = require("util"),
    events = require("events");

// A File Detail Object to store details about a file
// directory = parent directory of the file
// fullPath = the entire path including directory of the file.
// fileName = just the name of the file without the path
// size = the size in bytes of the file
// extension = the extension of the file (.js, .txt, etc)
// accessed = the last accessed date of the file
// modified = the last modified date of the file
// created = the last created date of the file
var FileDetail = function (directory, fullPath, fileName, size, extension, accessed, modified, created) {
    this.directory = directory;
    this.fullPath = fullPath;
    this.fileName = fileName;
    this.extension = extension;
    this.size = size;
    this.accessed = accessed;
    this.modified = modified;
    this.created = created;
};


var FileDetailComparisonResults = function () {
    this.different = false;
    this.differences = {};
};

// fd = FileDetail object to compare to
FileDetail.prototype.compareTo = function (fd) {
    var self = this,
        base,  
        compare,          
        results = new FileDetailComparisonResults();

    for (var key in self) {

        if (self[key] instanceof Date) {
            base = self[key].toISOString();
            compare = fd[key].toISOString();
        } else {

            base = self[key];
            compare = fd[key];
        }

        if (base != compare) {

            if (!results.differences[key]) {
                results.differences[key] = {};
            }

            results.differences[key].baseValue = self[key];
            results.differences[key].comparedValue = fd[key];
            results.different = true;
        }
    }
    return results;
};


// Emits six events:
//   fileAdded        : When a file is added to a monitored directory
//   fileChanged      : When a file is changed
//   fileRemoved      : When a file is removed
//   folderAdded      : When a folder is added (recursive mode only)
//   folderRemoved    : When a folder is removed (recursive mode only)
//   scannedDirectory : When a directory has been scanned
var DirectoryWatcher = function (root, recursive) {
    this.root = root;  // Root or base directory
    this.recursive = recursive || true;  // recursively monitor sub-folders
    this.directoryStructure = {};  // object holding representation of directory structure
    this.timer = null;  // timer handling scan passes
    this.suppressInitialEvents = true;  // should we supress initial events 
    

    var self = this;
    

    events.EventEmitter.call(this);
    

  var selectParentNode = function (dir, suppressEvents) {
        var hierarchy = dir.split(path.sep);
        newPath = "";
        hierarchy.pop();
        newPath = hierarchy.join(path.sep);
        return (selectCurrentNode(newPath, suppressEvents));
    };
    

    var selectCurrentNode = function (dir, suppressEvents) {
        var deepRoot = self.root.replace(path.basename(self.root), "");

        var hierarchy = dir.replace(self.root, path.basename(self.root)).split(path.sep);
        var currentNode = self.directoryStructure;
        var currentPath = deepRoot;
        for (var i = 0; i < hierarchy.length; i++) {
            currentPath += hierarchy[i] + path.sep;
            if (currentNode[hierarchy[i]] == null) {
                currentNode[hierarchy[i]] = {};
                if (!suppressEvents) {
                    self.emit("folderAdded", currentPath.substring(0, currentPath.length - 1));
                }
            }
            currentNode = currentNode[hierarchy[i]];
        }

        return currentNode;
    };
    
    var recordFile = function (p, suppressEvents, callback) {
        
        fs.stat(p, function (err, stats) {

            if (err) throw err;

            if (stats.isFile()) {
                
                var dir = path.dirname(p);
                fd = new FileDetail(
                    dir,              // the base directory
                  p,                // the full path
                  path.basename(p), // basename (name of file only)
                  stats.size,       // size in bytes
                  path.extname(p),  // extension
                  stats.atime,      // The last access date / time
                  stats.mtime,      // The last modified date / time
                  stats.ctime       // the created date / time
                );
                
                var currentNode = selectCurrentNode(dir, suppressEvents);
                
                if (currentNode[fd.fileName]) {
                    
                    var fileCompare = currentNode[fd.fileName].compareTo(fd);
                    if (fileCompare.different) {
                        
                        currentNode[fd.fileName] = fd;
                        if (!suppressEvents) {
                            self.emit("fileChanged", fd, fileCompare.differences);
                        }
                    }
                } else {
                    
                    currentNode[fd.fileName] = fd;

                    if (!suppressEvents) {
                        self.emit("fileAdded", fd);
                    }
                }
            } else if (stats.isDirectory()) {
                if (self.recursive) {
                    self.scanDirectory(p, suppressEvents);
                }
            } else { 
                console.log('unknown node...');
            }
            callback();
        });
    };
    

    var detectFolderDelete = function (dir, folderName, suppressEvents) {

        fs.exists(dir, function (exists) {
            if (!exists) {
                if (!suppressEvents) {
                    self.emit("folderRemoved", dir);
                }

                var currentNode = selectParentNode(dir, suppressEvents);
                delete currentNode[folderName];
            }
        });
    };


    var detectFileDelete = function (fd, suppressEvents) {

        fs.exists(fd.fullPath, function (exists) {
            if (!exists) {
                if (!suppressEvents) {
                    self.emit("fileRemoved", fd);
                }
                var currentNode = selectCurrentNode(fd.directory, suppressEvents);
                delete currentNode[fd.fileName];
            }
        });
    };
    

    var detectDeletes = function (dir, suppressEvents) {
        var currentNode = selectCurrentNode(dir, suppressEvents);

        for (var key in currentNode) {

            if (currentNode[key] instanceof FileDetail) {
                detectFileDelete(currentNode[key], suppressEvents);
            } else {

                detectFolderDelete(dir + path.sep + key, key, suppressEvents);
            }
        }
    };

  this.scanDirectory = function (dir, suppressEvents) {
        fs.readdir(dir, function (err, files) {

            if (err) throw err;
            var i = files.length;
            if (i === 0) {

                if (!suppressEvents) {
                    self.emit("scannedDirectory", dir);
                }
            } else {

                for (var f in files) {
                    recordFile(path.join(dir, files[f]), suppressEvents, function () {
                        i--;
                        if (i == 0) {

                            if (!suppressEvents) {
                                self.emit("scannedDirectory", dir);
                            }
                        }
                    });
                }
            }
            detectDeletes(dir, suppressEvents);
        });
    };
    
    // interval = Time (in milliseconds) between checks for
    //            update for the given monitored directory
    this.start = function (interval) {
        if (interval) {
            self.timer = setInterval(function () { self.scanDirectory(self.root, false) }, interval);
        } else {
            self.stop();
        }
        self.scanDirectory(self.root, self.suppressInitialEvents);
    };
    

    this.stop = function () {
        clearTimeout(self.timer);
    };

};


util.inherits(DirectoryWatcher, events.EventEmitter);

// Emits events:
//   fileAdded        : When a file is added to a monitored directory
//   fileChanged      : When a file is changed
//   fileRemoved      : When a file is removed
//   folderAdded      : When a folder is added (recursive mode only)
//   folderRemoved    : When a folder is removed (recursive mode only)
//   scannedDirectory : When a directory has been scanned
exports.DirectoryWatcher = function (root, recursive) {
    return new DirectoryWatcher(root, recursive);
};