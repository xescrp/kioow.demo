module.exports.expressconnector = function (url, endopointinterface) { 

    var connection = null;

    var _expressconnector = function (req, res, next) {
        var _cnx = require('yourttoo.connector');

        connection = (connection != null) ? connection : _cnx.createAPIConnector({
            url: url,   //url to the endpoint (could be any url...)
            endpointinterface: endopointinterface      //endpointinterface: 'http' or 'socket'
        });
        req.ytoconnector = connection;
        req.app.set('ytoconnector', connection);
        
        next();
    }

    return _expressconnector;
}
