module.exports = function (bookingmodel) {
    var bmodel = bookingmodel || 'bookingb2b';
    var dhash = {
        bookingb2c: require('./bookingb2c'), 
        bookingb2b: require('./bookingb2b'), 
        budget: require('./bookingb2b'),
        //taylormadeb2c: require('./taylormadeb2c'), 
        //taylormadeb2cgroups: require('./taylormadeb2cgroups'), 
        taylormadeb2b: require('./taylormadeb2b'), 
        //taylormadeb2bgroups: require('./taylormadeb2bgroups'), 
        whitelabel: require('./whitelabel')
    };
    return dhash[bmodel];
}