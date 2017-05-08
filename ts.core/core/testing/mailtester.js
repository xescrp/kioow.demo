
//ADMIN
var user = require('./credentials/users/xiscouser');
var member = require('./credentials/members/omtadm01')(user);

//core configuration and initialization
var core = require('../interface/core');
core.configuration.port = 7777;
var url = 'http://localhost:' + core.configuration.port;
//launch interface...
core.start(function (rs) {
    console.log('Core is Ready for this test...');
    console.log(rs);
});

//REQUEST READY PROCESS (MAIL PROCESS)
var query = { idBooking: '002013RY' };
var populate = [{ path: 'products'}];
var fields = null;

var findoptions = {
    query: query,
    populate: populate,
    fields: fields,
    collectionname: 'Bookings2'
};
//END REQUEST READY PROCESS

//MAIL CONFIG READY PROCESS
var mailoptions = {
    to: 'xisco@yourttoo.com',
    subject: 'Nueva Reserva - ',
    parameter: null,
    subjectappend: 'idBooking',
    templatename: 'yto_affiliate_new_booking'
};
//END MAIL CONFIG READY PROCESS

var request = require('./requests/findone.generic')(url, member, findoptions);

var ytoclient = require('yourttoo.connector').connector;

//warming time...
setTimeout(function () {
    //Test Request:
    console.time('testmailer');
    var startedtime = new Date();
    var rq = ytoclient.send(request);
    rq.on(request.request.oncompleteeventkey, function (result) {
        console.log('TESTMAILING () -> FETCH RESULTS: ###############################');
        console.log('finished...');
        console.log('started: ' + startedtime);
        console.log('ended: ' + new Date());

        mailoptions.parameter = { booking: result };
        // PUSH MAIL FOR SENDING
        core.corebase.plugins.mxp.rendertemplate(mailoptions, function (mail) {
            core.corebase.plugins.mxp.push(mail, null, function (err) {
                err != null ? console.error(err) : console.log('Mail pushed properly');
            });
        });
        // PRINT RESULTS
        console.log(result);
        //END PRINT RESULTS

        console.timeEnd('testmailer');
        //tracking...
        var fs = require('fs');
        fs.writeFile('c:/temp/testmailing.track.txt', JSON.stringify(result, null, '\n'));
        console.log('END TESTMAILING ()         ###############################');

    });
    rq.on(request.request.onerroreventkey, function (err) {
        console.error('TESTMAILING () -> ERROR: ###############################');
        console.error(err);
        console.error('END TESTMAILING ERROR () ###############################');
    });
}, 3000);

