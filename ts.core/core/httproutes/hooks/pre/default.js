module.exports = function (request, callback, errorcallback) {
    process.nextTick(function () { 
        callback(request.request);
    });
}