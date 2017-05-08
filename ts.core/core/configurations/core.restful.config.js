var routes = require('../local.routes');
var restconfig = {
    port: 3000,
    publicdirectory: routes.paths.public,
    resourcesdirectory: routes.paths.resources,
    routespaths: [
        routes.paths.core + 'httproutes/api.js',
        routes.paths.core + 'httproutes/api.test.js'
    ],
    ssl: {
        enabled: false,
        keyfile: routes.paths.resources + 'ssl/ytokey.pem',
        certfile: routes.paths.resources + 'ssl/ytocert.pem'
    },
    api: {
        url: 'https://localhost:6033',
        endpointinterface: 'socket'
    }
}

module.exports.configuration = restconfig;