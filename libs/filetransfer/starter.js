//configure starter for a server: 
//beware of changing your config settings! -- file: ./configuration.js

//service activator flags
var servicesenabled = {
    watcherpool: true,
    server: true
};
var ytofl = require('./index');

//check flags and start..
servicesenabled.watcherpool ? process.nextTick(function () { 
    var watcherPool = ytofl.startwatcherpool();
    //watcherPool.watch();
}) : null;

servicesenabled.server ? process.nextTick(function () { 
    var fileServer = ytofl.createserver();
    fileServer.listen();
}) : null;