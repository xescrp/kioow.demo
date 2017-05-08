module.exports = function (options, callback, errorcallback) {
    var backbone = options.backbone;
    console.log('Exec strategy test: ');
    
    callback({ 
        test: 'Is possible this..?'
    });
}