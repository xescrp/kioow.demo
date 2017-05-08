
var _ = require('underscore');
var common = require('yourttoo.common');

//identify
var accessToken = '$2a$10$.V3yY0evlenJSjf.lORVieOlQzIBxq/OZzv19GlI95UsY8AcXqVse'; //'$2a$10$trdZXF1I0D8cK9MaMPgz6.Aabn2JpXsIvQ.aYbtN9MWyw9HVhbdMi';
var userid = '56bcf0bc5021d900155e9bcc'; //'56d08a33adbfa126481d41e4';

//AAVV
//var user = require('./credentials/users/pablouser');
//var member = require('./credentials/members/aavv01939')(user);

//ADMIN
var user = require('./credentials/users/pablouser');
var member = require('./credentials/members/aavv01939')(user);

//core configuration and initialization
var core = require('../interface/core');
core.configuration.port = 7777;
var url = 'http://localhost:' + core.configuration.port;
//launch interface...
core.start(function (rs) {
    console.log('Core is Ready for this test...');
    console.log(rs);
});

var request = require('./requests/book.wl.intent')(url, member);

var ytoclient = require('yourttoo.connector').connector;

//warming time...
setTimeout(function () {
    //Test Request:
    console.time('testcore');
    var startedtime = new Date();
    var rq = ytoclient.send(request);
    rq.on(request.request.oncompleteeventkey, function (result) {
        console.log('TESTCORE () -> RESULTS: ###############################');
        console.log('finished...');
        console.log('started: ' + startedtime);
        console.log('ended: ' + new Date());


        // PRINT RESULTS
        
        console.log(result);
        //END PRINT RESULTS

        console.timeEnd('testcore');
        //tracking...
        var fs = require('fs');
        fs.writeFile('c:/temp/testcore.track.txt', JSON.stringify(result, null, '\n'));
        console.log('END TESTCORE ()         ###############################');

    });
    rq.on(request.request.onerroreventkey, function (err) {
        console.error('TESTCORE () -> ERROR: ###############################');
        console.error(err);
        console.error('END TESTCORE ERROR () ###############################');
    });
}, 4000);

