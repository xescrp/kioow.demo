//TASKS CONFIGURATION...
var routes = require('../local.routes');
var yourTTOOProcesses = [
    //{
    //    cwd: routes.paths.core,
    //    interval: 0, 
    //    eventKey: 'HERMES.PROCESS.STARTED', 
    //    name: 'Hermes process instance',
    //    runInmediately : true,
    //    args: [ 
    //        routes.paths.core + 'servers/backboneprocess.shuttle', 
    //        '-script=' + routes.paths.core + 'interface/hermes.js', 
    //        '-port=7000',
    //        '-config=' + routes.paths.core + 'configurations/hermes.config'
    //    ],
    //    command: 'c:/nodejs/node.exe',
    //    outputFile: routes.paths.logs + 'trace/hermesserver.log',
    //    errorFile: routes.paths.logs + 'error/hermesserver.error.log',
    //    url: { host: 'http://localhost', port: 7000 },
    //    webgardenCount: {
    //        count: 1,
    //        memory: null
    //    },
    //    dependencies: []
    //},
    //{
    //    cwd: routes.paths.core,
    //    interval: 0, 
    //    eventKey: 'HIPERION.PROCESS.STARTED', 
    //    name: 'Hiperion process instance',
    //    runInmediately : true,
    //    args: [ 
    //        routes.paths.core + 'servers/backboneprocess.shuttle', 
    //        '-script=' + routes.paths.core + 'interface/hiperion.js', 
    //        '-port=2000',
    //        '-config=' + routes.paths.core + 'configurations/hiperion.config'
    //    ],
    //    command: 'c:/nodejs/node.exe',
    //    outputFile: routes.paths.logs + 'trace/hiperionserver.log',
    //    errorFile: routes.paths.logs + 'error/hiperionserver.error.log',
    //    url: { host: 'http://localhost', port: 2000 },
    //    webgardenCount: {
    //        count: 1,
    //        memory: null
    //    },
    //    dependencies: []
    //},
    //{
    //    cwd: routes.paths.core,
    //    interval: 0, 
    //    eventKey: 'BACKBONE.PROCESS.STARTED', 
    //    name: 'Backbone process instance',
    //    runInmediately : true,
    //    args: [ 
    //        routes.paths.core + 'servers/backboneprocess.shuttle', 
    //        '-script=' + routes.paths.core + 'interface/backbone.js', 
    //        '-port=6033',
    //        '-config=' + routes.paths.core + 'configurations/backbone.config'
    //    ],
    //    command: 'c:/nodejs/node.exe',
    //    outputFile: routes.paths.logs + 'trace/backbone.log',
    //    errorFile: routes.paths.logs + 'error/backbone.error.log',
    //    url: { host: 'http://localhost', port: 6033 },
    //    webgardenCount: {
    //        count: 1,
    //        memory: null
    //    },
    //    dependencies: []
    //},
    //{
    //   cwd: routes.paths.webyto,
    //   interval: 0, 
    //   eventKey: 'WEBSERVER.PROCESS.STARTED', 
    //   name: 'Webserver process instance',
    //   runInmediately : true,
    //   args: [ 
    //       routes.paths.webyto + 'ytowebserver.js'
    //   ],
    //   command: 'c:/nodejs/node.exe',
    //   outputFile: routes.paths.logs + 'trace/webserver.yttoo.log',
    //   errorFile: routes.paths.logs + 'error/webserver.yttoo.error.log',
    //   url: { host: 'http://localhost', port: 80 },
    //   webgardenCount: {
    //       count: 1,
    //       memory: null
    //   },
    //   dependencies: []
    //},
    //{
    //    cwd: routes.paths.core+'yourttoo.core',
    //    interval: 0, 
    //    eventKey: 'CORE.REST.OMT.PROCESS.STARTED', 
    //    name: 'CORE REST OMT process instance',
    //    runInmediately : true,
    //    args: [routes.paths.core+'yourttoo.core/servers/corerestfulserver.js'],
    //    command: 'node.exe',
    //    outputFile: routes.paths.logs+'corerestserver.yttoo.log',
    //    errorFile: routes.paths.logs+'corerestserver.yttoo.error.log',
    //    url: { host: 'http://localhost', port: 81 },
    //    webgardenCount: {
    //        count: 1,
    //        memory: null
    //    },
    //    dependencies: []
    //},
    //{
    //    cwd: 'C:/development/node/yourttoo.thearchitect',
    //    interval: 0, 
    //    eventKey: 'THEORACLE.PROCESS.STARTED', 
    //    name: 'THEORACLE process instance',
    //    runInmediately : true,
    //    args: [routes.paths.core+'yourttoo.thearchitect/alm/theoracle.js'],
    //    command: 'node.exe',
    //    outputFile: routes.paths.logs+'theoracle.log',
    //    errorFile: routes.paths.logs+'theoracle.error.log',
    //    webgardenCount: {
    //        count: 1,
    //        memory: null
    //    },
    //    dependencies: []
    //}
];

module.exports.processes = yourTTOOProcesses;