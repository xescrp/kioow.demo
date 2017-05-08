//taskpath: name of the file with the implementation
//interval: time to repeat execution, period in minutes...
//eventKey: an unique name string(slug) for the task
//name: descriptive name
//runinmediately: set it at true to run the process as soon as the scheduler is arranged

var scheduledConfigurations = [
    {
        TaskPath: 'landingtags.b2c.launcher',
        Interval: 600,
        EventKey: 'LANDINGTAGS.BC2',
        Name: 'LANDINGTAGS BC2 GENERATION',
        RunInmediately : false
    },
    {
        TaskPath: 'landingtags.wl.launcher',
        Interval: 600,
        EventKey: 'LANDINGTAGS.WL',
        Name: 'LANDINGTAGS WL GENERATION',
        RunInmediately : false
    },
    {
        TaskPath: 'landingzones.b2c.launcher',
        Interval: 600,
        EventKey: 'LANDINGZONES.BC2',
        Name: 'LANDINGZONES BC2 GENERATION',
        RunInmediately : false
    },
    {
        TaskPath: 'landingzones.wl.launcher',
        Interval: 600,
        EventKey: 'LANDINGZONES.WL',
        Name: 'LANDINGZONES WL GENERATION',
        RunInmediately : false
    },
    {
        TaskPath: 'product.update.launcher',
        Interval: 600,
        EventKey: 'PRODUCT.UPDATE.PROCESS',
        Name: 'PRODUCT UPDATE PROCESS (MINPRICES)',
        RunInmediately: false
    },
    {
        TaskPath: 'booking.transfer.launcher',
        Interval: 600,
        EventKey: 'BOOKING.TRANSFER.PROCESS',
        Name: 'BOOKING TRANSFER PROCESS (BOOK -> BOOK2)',
        RunInmediately: false
    },
    {
        TaskPath: 'bookingelements.transfer.launcher',
        Interval: 600,
        EventKey: 'BOOKING.TRANSFER.ELEMENTS.PROCESS',
        Name: 'BOOKING TRANSFER ELEMENTS PROCESS (QUOTES QUERIES CHATS <--> BOOK2)',
        RunInmediately: false
    },
    {
        TaskPath: 'dmc.batch.launcher',
        Interval: 600,
        EventKey: 'DMC.BATCH.PROCESS',
        Name: 'DMC BATCH PROCESS',
        RunInmediately: false
    },
    {
        TaskPath: 'affiliatecsv.batch.launcher',
        Interval: 600,
        EventKey: 'AFFILIATECSV.BATCH.PROCESS',
        Name: 'AFFILIATECSV BATCH PROCESS',
        RunInmediately: false
    },
    {
        TaskPath: 'booking.invoices.launcher',
        Interval: 600,
        EventKey: 'BOOKINGINVOICES.BATCH.PROCESS',
        Name: 'BOOKINGINVOICES BATCH PROCESS',
        RunInmediately: false
    },
    //{
    //    TaskPath: 'product.availabilitycheck', 
    //    Interval: 600, 
    //    EventKey: 'PRODUCT.AVAILABILITYCHECK.TASK', 
    //    Name: 'PRODUCT.AVAILABILITYCHECK.TASK',
    //    RunInmediately : true
    //},
    //{
    //    TaskPath: 'users.keys', 
    //    Interval: 0, 
    //    EventKey: 'USERS.APIKEYS', 
    //    Name: 'USER API KEYS GENERATION',
    //    RunInmediately : true
    //},
    //{
    //    TaskPath: 'destinationsrepository.cms', 
    //    Interval: 350, 
    //    EventKey: 'CMS.DESTINATIONS.UPDATE', 
    //    Name: 'CMS DESTINATION UPDATE PROCESS',
    //    RunInmediately : true
    //},
    //{
    //    TaskPath: 'destinationsproduct.filler', 
    //    Interval: 350, 
    //    EventKey: 'PRODUCT.DESTINATIONS.UPDATE', 
    //    Name: 'PRODUCT DESTINATION UPDATE PROCESS',
    //    RunInmediately : true
    //},
    {
        TaskPath: 'destinationfiles', 
        Interval: 0, 
        EventKey: 'DESTINATIONS.FILES', 
        Name: 'DESTINATION FILES GENERATION PROCESS',
        RunInmediately : true
    },
    //{
    //    TaskPath: 'destinationsrepository.cms.latlon.fixer', 
    //    Interval: 350, 
    //    EventKey: 'DESTINATIONS.REPEATED', 
    //    Name: 'DESTINATION REPEATED FIXER PROCESS',
    //    RunInmediately : true
    //},
    //{
    //    TaskPath: 'b2bchannel.activator', 
    //    Interval: 350, 
    //    EventKey: 'DMC.B2B.CHANNEL.ACTIVATION', 
    //    Name: 'DMC B2B CHANNEL ACTIVATION',
    //    RunInmediately : true
    //},
    //{
    //    TaskPath: 'destinationsrepeat.fixes', 
    //    Interval: 350, 
    //    EventKey: 'DESTINATIONS.REPEATED', 
    //    Name: 'DESTINATION REPEATED FIXER PROCESS',
    //    RunInmediately : true
    //},
    //{
    //    TaskPath: 'product.fitur.updater', 
    //    Interval: 350, 
    //    EventKey: 'DESTINATIONS.REPEATED', 
    //    Name: 'DESTINATION REPEATED FIXER PROCESS',
    //    RunInmediately : true
    //},
    //{
    //    TaskPath: 'cloudinary.check', 
    //    Interval: 15, 
    //    EventKey: 'CLOUDINARY.RESOURCES.CHECK', 
    //    Name: 'CLOUDINARY RESOURCES CHECK PROCESS',
    //    RunInmediately : false
    //},
    //{
    //    TaskPath: 'sitemap.generation', 
    //    Interval: 140, 
    //    EventKey: 'SITEMAP.UPDATE', 
    //    Name: 'SITEMAP UPDATE PROCESS',
    //    RunInmediately : false
    //},
    //{
    //    TaskPath: 'dmcproducts.landing', 
    //    Interval: 15, 
    //    EventKey: 'CACHE.BUILDING.LANDING', 
    //    Name: 'CACHE BUILDING FOR LANDING CONTENT',
    //    RunInmediately : false
    //},
    //{
    //    TaskPath: 'cache.dmcproducts', 
    //    Interval: 15, 
    //    EventKey: 'CACHE.BUILDING.PRODUCTS', 
    //    Name: 'CACHE BUILDING FOR PRODUCTS',
    //    RunInmediately : false
    //},
    //{
    //    TaskPath: 'cache.promotions', 
    //    Interval: 10, 
    //    EventKey: 'CACHE.BUILDING.PROMOTIONS', 
    //    Name: 'CACHE BUILDING FOR PROMOTIONS',
    //    RunInmediately : false
    //},
    //{
    //    TaskPath: 'cache.products.countries', 
    //    Interval: 5, 
    //    EventKey: 'CACHE.BUILDING.PRODUCTS.COUNTRIES', 
    //    Name: 'CACHE BUILDING FOR PRODUCT COUNTRIES AND LOCATIONS',
    //    RunInmediately : false
    //},
    //{
    //    TaskPath: 'cache.dmcs', 
    //    Interval: 10,
    //    EventKey: 'CACHE.BUILDING.DMC',
    //    Name: 'CACHE BUILDING FOR DMCs' ,
    //    RunInmediately : false
    //},
    //{
    //    TaskPath: 'cache.cms', 
    //    Interval: 10,
    //    EventKey: 'CACHE.BUILDING.CMS',
    //    Name: 'CACHE BUILDING FOR CMS Data' ,
    //    RunInmediately : false
    //},
    //{
    //    TaskPath: 'fullproduct.update', 
    //    Interval: 600,
    //    EventKey: 'SCHEDULED.PRODUCT.UPDATE',
    //    Name: 'PRODUCT UPDATING Data' ,
    //    RunInmediately : false
    //},
    //{
    //    TaskPath: 'remember60.booking', 
    //    Interval: 720, //Cada 12 horas
    //    EventKey: 'SCHEDULED.BOOKING.UPDATE',
    //    Name: 'BOOKING REMEMBER 60' ,
    //    RunInmediately : false
    //},
    //{
    //    TaskPath: 'finishedBookings.update', 
    //    Interval: 720, //Cada 12 horas
    //    EventKey: 'SCHEDULED.FINISHEDBOOKINGS.UPDATE',
    //    Name: 'BOOKING FINISHED UPDATING' ,
    //    RunInmediately : false
    //},
    //{
    //    TaskPath: 'cache.popupcontinents', 
    //    Interval: 720, //Cada 12 horas
    //    EventKey: 'SCHEDULED.POPUPCONTINENT.CONTENT',
    //    Name: 'POPUP CONTINENT CACHE' ,
    //    RunInmediately : false
    //},
    //{
    //    TaskPath: 'updater.booking', 
    //    Interval: 720, //Cada 12 horas
    //    EventKey: 'SCHEDULED.BOOKING.UPDATER',
    //    Name: 'BOOKING MODEL UPDATER' ,
    //    RunInmediately : true
    //}
];
var configuration = {
    port: 9000,
    scheduledConfigurations : scheduledConfigurations
}
module.exports.scheduledConfigurations = scheduledConfigurations;
module.exports.configuration = configuration;