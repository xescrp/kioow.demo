var routes = require('../local.routes');

var configuration = {
    port: 6033,
    ssl: {
        enabled: true,
        keyfile: routes.paths.resources + 'ssl/ytokey.pem',
        certfile: routes.paths.resources + 'ssl/ytocert.pem'
    },
    clusters: [
    //    {
    //        name: 'mailstack',
    //        balancestrategy: 'round-robin',
    //        comm: 'socket',
    //        processes: [
    //            {
    //                cwd: routes.paths.core,
    //                interval: 0, 
    //                eventKey: 'MAILSTACK.PROCESS.STARTED', 
    //                name: 'MAILSTACK process instance',
    //                runInmediately : true,
    //                args: [ 
    //                    routes.paths.core + 'servers/backboneprocess.shuttle', 
    //                    '-script=' + routes.paths.core + 'interface/mailstack.js', 
    //                    '-port=8000',
    //                    '-config=' + routes.paths.core + 'configurations/mailstack.config'
    //                ],
    //                command: 'c:/nodejs/node.exe',
    //                outputFile: routes.paths.logs + 'trace/mailstackserver.log',
    //                errorFile: routes.paths.logs + 'error/mailstackserver.error.log',
    //                url: { host: 'http://localhost', port: 8000 },
    //                webgardenCount: {
    //                    count: 1,
    //                    memory: null
    //                },
    //                dependencies: []
    //            }
    //        ]
    //    },
        {
            name: 'memento',
            balancestrategy: 'round-robin',
            comm: 'socket',
            processes: [
                {
                    cwd: routes.paths.core,
                    interval: 0, 
                    eventKey: 'MEMENTO.PROCESS.STARTED', 
                    name: 'MEMENTO process instance 1',
                    runInmediately : true,
                    args: [ 
                        routes.paths.core + 'servers/backboneprocess.shuttle', 
                        '-script=' + routes.paths.core + 'interface/memento.js', 
                        '-port=5000',
                        '-config=' + routes.paths.core + 'configurations/memento.config'
                    ],
                    command: 'c:/nodejs/node.exe',
                    outputFile: routes.paths.logs + 'trace/mementoserver.1.log',
                    errorFile: routes.paths.logs + 'error/mementoserver.1.error.log',
                    url: { host: 'http://localhost', port: 5000 },
                    webgardenCount: {
                        count: 1,
                        memory: null
                    },
                    dependencies: []
                }
            ]
        },
        {
            name: 'membership',
            balancestrategy: 'round-robin',
            comm: 'socket',
            processes: [
                {
                    cwd: routes.paths.core,
                    interval: 0, 
                    eventKey: 'MEMBERSHIP.PROCESS.STARTED', 
                    name: 'MEMBERSHIP process instance 1',
                    runInmediately : true,
                    args: [
                        routes.paths.core + 'servers/backboneprocess.shuttle',
                        '-script=' + routes.paths.core + 'interface/membership.js',
                        '-port=6000',
                        '-config=' + routes.paths.core + 'configurations/membership.config'
                    ],
                    command: 'c:/nodejs/node.exe',
                    outputFile: routes.paths.logs + 'trace/membershipserver.1.log',
                    errorFile: routes.paths.logs + 'error/membershipserver.1.error.log',
                    url: { host: 'http://localhost', port: 6000 },
                    webgardenCount: {
                        count: 1,
                        memory: null
                    },
                    dependencies: []
                }
            ]
        },
    //    {
    //       name: 'worker',
    //       balancestrategy: 'round-robin',
    //       comm: 'socket',
    //       processes: [
    //           {
    //               cwd: routes.paths.core,
    //               interval: 0, 
    //               eventKey: 'WORKER.PROCESS.STARTED', 
    //               name: 'WORKER process instance',
    //               runInmediately : true,
    //               args: [
    //                   routes.paths.core + 'servers/backboneprocess.shuttle',
    //                   '-script=' + routes.paths.core + 'interface/scheduler.js', 
    //                   '-port=9000',
    //                   '-config=' + routes.paths.core + 'configurations/scheduler.config'
    //               ],
    //               command: 'c:/nodejs/node.exe',
    //               outputFile: routes.paths.logs + 'trace/workerserver.log',
    //               errorFile: routes.paths.logs + 'error/workerserver.error.log',
    //               url: { host: 'http://localhost', port: 9000 },
    //               webgardenCount: {
    //                   count: 1,
    //                   memory: null
    //               },
    //               dependencies: []
    //           },
    //       ]
    //    },
        {
            name: 'core',
            balancestrategy: 'round-robin',
            comm: 'socket',
            processes: [
                {
                    cwd: routes.paths.core,
                    interval: 0, 
                    eventKey: 'CORE.1.OMT.PROCESS.STARTED', 
                    name: 'CORE 1 OMT process instance',
                    runInmediately : true,
                    args: [
                        routes.paths.core + 'servers/backboneprocess.shuttle',
                        '-script=' + routes.paths.core + 'interface/core.js', 
                        '-port=4000',
                        '-config=' + routes.paths.core + 'configurations/core.config'
                    ],
                    command: 'c:/nodejs/node.exe',
                    outputFile: routes.paths.logs + 'trace/coreserver.yto.1.log',
                    errorFile: routes.paths.logs + 'error/coreserver.yto.1.error.log',
                    url: { host: 'http://localhost', port: 4000 },
                    webgardenCount: {
                        count: 1,
                        memory: null
                    },
                    dependencies: []
                },
				//{
    //                cwd: routes.paths.core,
    //                interval: 0, 
    //                eventKey: 'CORE.2.OMT.PROCESS.STARTED', 
    //                name: 'CORE 2 OMT process instance',
    //                runInmediately : true,
    //                args: [
    //                    routes.paths.core + 'servers/backboneprocess.shuttle',
    //                    '-script=' + routes.paths.core + 'interface/core.js', 
    //                    '-port=4001',
    //                    '-config=' + routes.paths.core + 'configurations/core.config'
    //                ],
    //                command: 'c:/nodejs/node.exe',
    //                outputFile: routes.paths.logs + 'trace/coreserver.yto.2.log',
    //                errorFile: routes.paths.logs + 'error/coreserver.yto.2.error.log',
    //                url: { host: 'http://localhost', port: 4001 },
    //                webgardenCount: {
    //                    count: 1,
    //                    memory: null
    //                },
    //                dependencies: []
    //            }
            ]
        },
        {
            name: 'xmljsonapi',
            balancestrategy: 'round-robin',
            comm: 'socket',
            processes: [
                {
                    cwd: routes.paths.core,
                    interval: 0,
                    eventKey: 'XMLJSONAPI.PROCESS.STARTED',
                    name: 'XMLJSONAPI process instance 1',
                    runInmediately: true,
                    args: [
                        routes.paths.core + 'servers/backboneprocess.shuttle',
                        '-script=' + routes.paths.core + 'interface/xmljsonapi.js',
                        '-port=13000',
                        '-config=' + routes.paths.core + 'configurations/core.config'
                    ],
                    command: 'c:/nodejs/node.exe',
                    outputFile: routes.paths.logs + 'trace/xmljsonapi.1.log',
                    errorFile: routes.paths.logs + 'error/xmljsonapi.1.error.log',
                    url: { host: 'http://localhost', port: 13000 },
                    webgardenCount: {
                        count: 1,
                        memory: null
                    },
                    dependencies: []
                }
            ]
        },
    ]
}

module.exports.configuration = configuration;