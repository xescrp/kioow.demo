var routes = require('../local.routes');

var configuration = {
    omt: {
        dbname: 'mongodb',
        forkdblayer: false,
    },
    cms: {
        dbname: 'cmsdb',
        forkdblayer: false,
    },
    subjects: ['product', 'affiliate', 'user', 'chat', 'booking', 'tailormade.queries', 'tailormade.quotes', 'cms'],
    subscriberspath: routes.paths.core + 'observers/workers',
    urlhermes: 'http://localhost:7000',
    port: 2000
}

module.exports.configuration = configuration;