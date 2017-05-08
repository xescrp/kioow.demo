var common = require('yourttoo.common');

var getExchangeCurrency = module.exports.getExchangeCurrency = function (core, callback) {
    var rq = {
        collectionname: 'Exchange',
        query: { state: 'published' }
    };
    core.mongo.find(rq, function (rs) {
        if (rs.ResultOK == true) {
            callback(rs.Data);
        } else {
            console.log(rs.Message);
            callback(null);
        }
    });
}

var getDMCsListFilter = module.exports.getDMCsListFilter = function (core, filter, callback) {
    var dmccase = 'all';
    if ((filter.b2bchannel != null && filter.b2bchannel == true) &&
            (filter.b2cchannel == null || filter.b2cchannel == false)) {
        dmccase = 'onlyb2b';
    }
    if ((filter.b2cchannel != null && filter.b2cchannel == true) &&
            (filter.b2bchannel == null || filter.b2bchannel == false)) {
        dmccase = 'onlyb2c';
    }
    switch (dmccase) {
        case 'all':
            condition = null;
            break;
        case 'onlyb2b':
            condition = 
						{ 'membership.b2bchannel': true }
            break;
        case 'onlyb2c':
            condition =
    					{ 'membership.b2cchannel': true }
            break;
    }
    if (condition != null) {
        var rq = {
            collectionname: 'DMCs',
            query: condition,
            fields: 'id code'
        };
        if (filter.dmclistselectfield != null && filter.dmclistselectfield != '') { 
            filter.dmclistselectfield = 'code';
        }
        core.mongo.find(rq, function (rs) {
            var ids = null;
            if (rs.ResultOK == true) {
                if (rs.Data != null && rs.Data.length > 0) {
                    ids = [];
                    for (var i = 0, len = rs.Data.length; i < len; i++) {
                        ids.push(rs.Data[i][filter.dmclistselectfield]);
                    }
                }
                callback(ids);
            } else {
                console.log(rs.Message);
                callback(null);
            }
        });
    }
}

var mementofetch = module.exports.mementofetch = function (keys, callback) { 
    var cnx = require('yourttoo.connector');
    var connection = cnx.createAPIConnector({
        url: 'http://localhost:4000',   //url to the endpoint (could be any url...)
        endpointinterface: 'socket'       //endpointinterface: 'http' or 'socket'
    });

    var rq = connection.sendRequest({
        command: 'pull',
        request: {
            Keys: keys,
            oncompleteeventkey: 'pull.done'
        },
        service: 'memento'
    });

    rq.on('pull.done', function (rs) { 
        callback(rs);
    });
}

//names: months_en, months_es, timezones, currencys, bankcountries, assistancelanguages, paymentoptions, hermessuscriptions
var hashdata = module.exports.hashdata= {
    'static' : function (name) { 
        return common.staticdata[name];
    }
}
