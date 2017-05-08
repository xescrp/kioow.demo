module.exports = function (conf, callback) {
    var wl = conf.wlcustomizationforsave;
    var common = require('yourttoo.common');
    var fs = require('fs');
    var rootpath = conf.whitelabelpath;
    var gruntok = true;
    var spawn = require('child_process').spawn;
    var grunterrors = [];
    var taskrunnerpath = conf.workingpath + 'tasks';
    
    workerProcess = spawn('grunt.cmd', ['--gruntfile', conf.gruntfile], {
        cwd: taskrunnerpath,
        //stdio: ['ignore', out, err],
        env: process.env
    });

    workerProcess.stdout.on('data', function (data) {
        console.log('grunt out: ' + data);
        conf.results.messages.push('grunt out: ' + data);
    });
    workerProcess.stderr.on('data', function (err) {
        console.error('grunt error: ' + err);
        conf.results.errors.push('grunt error: ' + err);
        grunterrors.push('grunt error: ' + err);
    });
    workerProcess.on('close', function (code, signal) {
        console.log('grunt proces, closing code: ' + code);
        conf.results.messages.push('grunt finished-code: ' + code);
        gruntok = (code == 0);
        fs.unlink(conf.gruntfile);
        gruntok ? setImmediate(function () {
            callback(null, conf);
        }) : setImmediate(function () { 
            callback(grunterrors.join('\n'), conf);
        });
    });
}