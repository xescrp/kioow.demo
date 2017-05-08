
function http() { 
    var http = require('../lib/httpclient');

    var t = new http.HTTPClient()
    console.log(t);

    t.get('http://google.es', null, null, function (rs) { 
        //console.log(rs);
    })

    var http = require('../lib/httpconnector');
    var t = new http.HTTPConnector();

    var rq = t.get({
        url: 'http://google.es'
    });

    rq.on('request.done', function (rs) { 
        console.log('rs - OK');
        //console.log(rs);
    });

    rq.on('request.error', function (err) {
        console.log('rs - KO');
        //console.log(err);
    });
}

function compression() {
    var _ = require('underscore');
    var bytesize = {
        STRING: 2,
        BOOLEAN: 4,
        NUMBER: 8
    };
    
    
    var ECMA_SIZES = bytesize;
    
     /**
     * Main module's entry point
     * Calculates Bytes for the provided parameter
     * @param object - handles object/string/boolean/buffer
     * @returns {*}
     */
    function sizeof(object) {
            if (_.isObject(object)) {
                if (Buffer.isBuffer(object)) {
                    return object.length;
                }
                else {
                    var bytes = 0;
                    _.mapObject(object, function (value, key) {
                        bytes += sizeof(key) + sizeof(value);
                    });
                    return bytes;
                }
            } else if (_.isString(object)) {
                return object.length * ECMA_SIZES.STRING;
            } else if (_.isBoolean(object)) {
                return ECMA_SIZES.BOOLEAN;
            } else if (_.isNumber(object)) {
                return ECMA_SIZES.NUMBER;
            } else {
                return 0;
            }
        }
    
    function roughSizeOfObject(object) {
        
        var objectList = [];
        var stack = [object];
        var bytes = 0;
        
        while (stack.length) {
            var value = stack.pop();
            
            if (typeof value === 'boolean') {
                bytes += 4;
            }
            else if (typeof value === 'string') {
                bytes += value.length * 2;
            }
            else if (typeof value === 'number') {
                bytes += 8;
            }
            else if 
        (
            typeof value === 'object' 
            && objectList.indexOf(value) === -1
        ) {
                objectList.push(value);
                
                for (var i in value) {
                    stack.push(value[ i ]);
                }
            }
        }
        return bytes;
    }
    
    var LZW = require('../lib/lzw');
    var tocompress = "TOBEORNOTTOBEORTOBEORNOT";
    //var objtocompress = require('../../../core/yourttoo.core/testing/bookingdummy4');
    var objtocompress = {
        command: 'distinct',
        service: 'core',
        request: {
            fields: ['voucherFile'],
            oncompleteeventkey: 'distinct.done',
            onerroreventkey: 'distinct.error',
            collectionname: 'Bookings'
        },
        compression: { enabled: true }
    };
    //console.log(objtocompress);
    var comp = LZW.compress(JSON.stringify(objtocompress));
    var decomp = LZW.decompress(comp);
    
    console.log(comp);
    console.log(decomp);
    
    console.log('compression size: ' + (sizeof(comp) / 1024) + ' Kbytes');
    console.log('original size   : ' + (sizeof(decomp) / 1024) + ' Kbytes');
    
    var percentsize = (sizeof(comp) * 100) / sizeof(decomp);
    console.log('compressed object is a ' + percentsize + '% of the original size');
    console.log('compression saves a ' + (100 - percentsize) + '% of the original size');
    console.log('lest parse object...');
    var newobject = JSON.parse(decomp);
    console.log('object parsed successfully');
}

function createapiconnector() {
    var _cnx = require('../index');
    console.log(_cnx);
    var config = {
        url: 'https://localhost:6033',
        endpointinterface: 'socket'
    };
    var api = _cnx.createAPIConnector(config);
    console.log(api);
    api.send();
}

var testhub = {
    createapiconnector : createapiconnector,
    compression: compression,
    http: http
};

var testswitcher = {
    createapiconnector : false,
    compression: false,
    http: true
};

for (var propswitch in testswitcher) {
    if (testswitcher[propswitch]) {
        testhub[propswitch]();
    }
 }