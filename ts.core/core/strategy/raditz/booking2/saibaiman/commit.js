module.exports = function (conf, callback) {
    console.log('Raditz Task finished...');

    setImmediate(function () {
        callback(null, conf);
    });
}