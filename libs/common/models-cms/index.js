module.exports = function (core, dbname) {
    require('./airports')(core, dbname);
    require('./city')(core, dbname);
    require('./clientfaq')(core, dbname);
    require('./clientfaqcategory')(core, dbname);
    require('./country')(core, dbname);
    require('./countryzones')(core, dbname);
    require('./dmcfaq')(core, dbname);
    require('./dmcfaqcategory')(core, dbname);
    require('./enquiry')(core, dbname);
    require('./exchange')(core, dbname);
    require('./exchangearchive')(core, dbname);
    require('./gallery')(core, dbname);
    require('./page')(core, dbname);
    require('./pagecategories')(core, dbname);
    require('./profiles')(core, dbname);
    require('./promotion')(core, dbname);
    require('./triptags')(core, dbname);
    require('./triptagscategory')(core, dbname);
    require('./affiliatefaq')(core, dbname);
    require('./affiliatefaqcategory')(core, dbname);
    require('./files')(core, dbname);
    require('./pressroom')(core, dbname);
    require('./pressroomcategory')(core, dbname);
    require('./managementgroup')(core, dbname);
}