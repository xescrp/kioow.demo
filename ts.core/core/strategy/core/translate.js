module.exports = function (options, callback, errorcallback) {
 
    var translator = new require('../interface/translator').Translator();
    translator.translate(options, callback);
}