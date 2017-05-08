var routes = require('../local.routes');
var configuration = {
    strategiespath: routes.paths.core + 'strategy/',
    visitorspath: routes.paths.core + 'visitors/',
    core: {
        strategiesfolder: 'core',
        find: 'find',
        read: 'read',
        search: 'search',
        inspiration: 'inspiration',
        cloudinaryupload: 'cloudinaryupload',
        upload: 'upload',
        findone: 'findone',
        list: 'list',
        translate: 'translate',
        product: 'product',
        subscribers: 'subscribers',
        hola: 'hola',
        erase: 'erase',
        budget: 'budget',
        pay: 'pay',
        list2: 'list2',
        search2: 'search2',
        adminstatistics: 'adminstatistics',
        quotation: 'quotation'
    },
    xmljsonapi: {
        strategiesfolder: 'xmljsonapi',
        search: 'search',
        find: 'find',
        book: 'book'
    },
    scheduled: {
        strategiesfolder: 'scheduled',
        sitemap: 'sitemap.generation',
        dummy: 'dummy'
    },
    scheduler: {
        strategiesfolder: 'scheduler',
        schedule: 'schedule',
        dummy: 'dummy'
    },
    cms: {
        strategiesfolder: 'cms'
    },
    membership: {
        strategiesfolder: 'membership',
        signup: 'signup',
        login: 'login'
    },
    memento: {
        strategiesfolder: 'memento',
        push: 'push',
        pull: 'pull'
    },
    backbone: {
        strategiesfolder: 'backbone',
        reboot: 'reboot',
        test: 'test'
    },
    hermes: {
        strategiesfolder: 'hermes'
    },
    raditz: {
        strategiesfolder: 'raditz'
    }
};

module.exports.configuration = configuration;
