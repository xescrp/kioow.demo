module.exports = function (conf, callback) {
    var fs = require('fs');

    var wl = conf.wlcustomizationforsave;
    var wlpath = conf.whitelabelpath;
    var publicpath = conf.publicpath;

     
    setImmediate(function () {
        var SASSfilepath = [wlpath, 'wl-loader.scss'].join('/');
        var CSSfilepath = [wlpath, 'wl-main.css'].join('/');
        
        var scsscontent = '@import \"' + publicpath + 'sass/themes/wl/_wl-colours\";\n';
        var scsslastline = '@import \"' + publicpath + 'sass/wl-main\";';
        
        for (var prop in wl.css) {
            var csspropname = ['$', prop.replace('_', '-')].join('');
            var csspropvalue = wl.css[prop];
            
            var scssline = [csspropname, csspropvalue].join(':') + ';\n';
            scsscontent += scssline;
        }
        //last line
        scsscontent += scsslastline;
        
        fs.writeFile(SASSfilepath, scsscontent, function (err) {
            err != null ? 
        setImmediate(function () {
                conf.results.errors.push(err);
                callback(err, conf);
            }) : 
        setImmediate(function () {
                conf.results.messages.push('sass file created: ' + SASSfilepath);
                conf.SASSfile = SASSfilepath;
                conf.CSSfile = CSSfilepath;
                callback(null, conf);
            });
        });
    }); 
   
    
}