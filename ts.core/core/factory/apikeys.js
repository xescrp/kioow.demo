
var getAPIkey = module.exports.getAPIkey = function (email, password) {
    var crypto = require('crypto');
    var hmac = crypto.createHmac('sha1', 'OPEN MARKET API KEYS GENERATOR SECRET');
    var fullstring = email + '/' + password;
    //insert the value for the apikey
    hmac.update(fullstring);
    //calculate apikey
    var hmacHash = hmac.digest('hex');
    return hmacHash;
}

var renewAPIkey = module.exports.getAPIkey = function (email, password) {
    var crypto = require('crypto');
    var hmac = crypto.createHmac('sha1', 'OPEN MARKET API KEYS GENERATOR SECRET');
    var dt = new Date();
    var fullstring = email + '/' + password + '#' + dt;
    //insert the value for the apikey
    hmac.update(fullstring);
    //calculate apikey
    var hmacHash = hmac.digest('hex');
    return hmacHash;
}

var getAccessToken = module.exports.getAccessToken = function (email, password, apikey) {
    var bcrypt = require('bcrypt-nodejs');
    var fullstring = email + '/' + password + '#' + apikey;
    //generate access token
    var salt = bcrypt.genSaltSync(10);
    var token = bcrypt.hashSync(fullstring, salt);
    
    return token;
}

var compareToken = module.exports.compareToken = function (email, password, apikey, accesstoken) {
    var bcrypt = require('bcrypt-nodejs');
    var fullstring = email + '/' + password + '#' + apikey;
    var equalstoken = bcrypt.compareSync(fullstring, accesstoken);
    return equalstoken;
}
