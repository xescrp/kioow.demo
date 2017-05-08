module.exports = function (app) {
    require('./auth')(app);
    require('./backbone')(app);
    require('./webstorage')(app);
    require('./server.init')(app);
    //load the url routers
    require('./home')(app);
    require('./admin')(app);
    require('./admin-details')(app);
    require('./membership')(app);
    require('./provider')(app);
    require('./search.affi')(app);
    require('./booking')(app);
    require('./tailormade')(app);
    require('./exchanges')(app);
    require('./upload')(app);
    require('./download')(app);
    require('./faqs')(app);
    require('./statics')(app);
    // Keep this on last position
    require('./errorhandling')(app);

}