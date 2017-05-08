var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
    name: 'The Architect - OPEN MARTKET TRAVEL',
    description: 'Open Market Travel Processes Manager. Manages every process for OpenMarket.travel',
    script: 'C:/development/node/yourttoo/core/yourttoo.thearchitect/thearchitect.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install', function () {
    svc.start();
});

svc.install();