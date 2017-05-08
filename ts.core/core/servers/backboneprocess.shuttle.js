
//**************** YOURTTOO SERVER STARTER ******************//
console.log('PROCESS SERVER LAUNCHER');
var _ = require('underscore');
var server = null;
//get params...
var _scriptcmd = _.filter(process.argv, function (cmdarg) { return (cmdarg.indexOf('-script') >= 0); });
var _portcmd = _.filter(process.argv, function (cmdarg) { return (cmdarg.indexOf('-port') >= 0); });
var _config = _.filter(process.argv, function (cmdarg) { return (cmdarg.indexOf('-config') >= 0); });
//get ready...
var scriptcmd = null;
var portcmd = null;
var configcmd = null;
//parse params..
if (_scriptcmd == null || _scriptcmd.length == 0) {
    throw 'ERROR: the script parameter is required. ex: -script=../interface/core';
} else { scriptcmd = _scriptcmd[0]; }
if (_portcmd == null || _portcmd.length == 0) {
    throw 'ERROR: the port parameter is required. ex: -port=8898';
} else { portcmd = _portcmd[0]; }
if (_config == null || _config.length == 0) {
    throw 'ERROR: the config parameter is required. ex: -config=../configurations/core.config';
} else { configcmd = _config[0]; }
var script = scriptcmd.replace('-script=', '');
var port = parseInt(portcmd.replace('-port=', ''));
var config = configcmd.replace('-config=', '');
//load config file..
var conf = require(config).configuration;
//check correct port...
if (port != NaN) {
    console.log('Port for this process: ' + port);
} else { 
    throw '-port parameter must be a number';
}
//do it
server = require(script);
server.configuration = conf;
server.configuration.port = port;

server.start();
