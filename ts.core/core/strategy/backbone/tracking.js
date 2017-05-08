module.exports = function (options, callback, errorcallback) {
    var backbone = options.backbone;
    var clear = options.clear || false;
    callback(backbone.tracking);

    clear ? setTimeout(function () { backbone.tracking = { date: new Date() } }, 3000) : null;
}