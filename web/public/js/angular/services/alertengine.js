app.service('alertengine', function ($rootScope, $window, yto_api, Notification, $cookies) {

    var currentuser = loginsession;
    var showatfirstload = false;
    var datakey = ['alerter', currentuser.user.email].join('_');
    var stackkey = currentuser.user.email;
    var stackname = 'alerter';
    var currentpage = 0;
    var userpreferences = {
        shownotifications: true, 
        sound: true,
        selectedsubjects: ['booking',
            'booking2',
            'tailormade.queries',
            'tailormade.quotes',
            'product',
            'affiliate',
            'chat', 'whitelabel']
    }

    function saveuserpreferences(callback) {
        userpreferences = notifier.preferences;

        var rqCB = yto_api.post('/stack/push', {
            key: stackkey,
            stackname: stackname,
            item: userpreferences
        });

        rqCB.on(rqCB.oncompleteeventkey, function (savedpreferences) {
            console.log('your preferences has been saved', savedpreferences);
        });

        rqCB.on(rqCB.onerroreventkey, function (err) {
            console.log(err);
        });    	
    }

    function readuserpreferences(callback) {
        //var prefs = $window.localStorage[datakey];
        var rqCB = yto_api.get('/stack/pull', {
            key: stackkey,
            stackname: stackname
        });

        rqCB.on(rqCB.oncompleteeventkey, function (savedpreferences) {
            console.log('your preferences has been recovered', savedpreferences);
            if (savedpreferences != null && savedpreferences != '') {
                userpreferences = savedpreferences; //JSON.parse(prefs);
                notifier.preferences = userpreferences;
            }
        });

        rqCB.on(rqCB.onerroreventkey, function (err) {
            console.log(err);
        });    	

        
    }

    function markreaded(code) {
        
    }

    var iconshash = {
        'booking': 'fa-plane',
        'booking2': 'fa-plane',
        'tailormade.queries': 'fa-envelope',
        'tailormade.quotes': 'fa-reply',
        'chat': 'fa-comment',
        'payment': 'fa-credit-card',
        'affiliate': 'fa-user',
        'whitelabel': 'fa-cloud-upload',
        'product': 'fa-compass'
    };

    var urlshash = {
        'booking': '/edit/booking?code=',
        'booking2': '/edit/booking?code=',
        'tailormade.queries': '/edit/request?code=',
        'tailormade.quotes': '/edit/request?code=',
        'chat': function (data) {
            var url = data.booking2 != null ? '/edit/booking?code=' + data.booking2.idBooking : null;
            url = data.userquery != null ? '/edit/request?code=' + data.userquery.code : url;
            return url;
        },
        'payment': '',
        'affiliate': '/edit/account?usertype=affiliate&code=',
        'whitelabel': '/edit/account?usertype=affiliate&code=',
        'product': '/edit/program?code='
    };

    var subjectshash = {
        'booking': 'Reserva',
        'booking2': 'Reserva',
        'tailormade.queries': 'Peticion a medida',
        'tailormade.quotes': 'Cotizacion',
        'chat': 'Mensaje de chat',
        'payment': 'Pago',
        'affiliate': 'Afiliado',
        'whitelabel': 'Marca Blanca',
        'product' : 'Producto'
    };

    var contenthash = {
        'booking': function () { return ''; },
        'booking2': function () { var html = '<div class=\"row\">' },
        'tailormade.queries': 'Peticion a medida',
        'tailormade.quotes': 'Cotizacion',
        'chat': 'Mensaje de chat',
        'payment': 'Pago',
        'affiliate': 'Afiliado',
        'whitelabel': 'Marca Blanca',
        'product': 'Producto'
    }

    var actionshash = {
        'pricing': 'Cambio de precios',
        'pricechange': 'Cambio de precios',
        'new': 'Nuevo/a',
        'update': 'Actualizacion',
        'pay': 'Pago realizado',
        'cityupdate': 'Actualizacion destinos'
    };

    function _rendernotify(hev) {
        var data = hev.data[0] != null ? hev.data[0].current != null ? hev.data[0].current : hev.data[0] : null;
        var agency = data != null && data.affiliate != null ? data.affiliate.company.name : '';
        var url = urlshash[hev.subject] != null && typeof (urlshash[hev.subject]) === 'function' ? urlshash[hev.subject](data) : urlshash[hev.subject];
        url != '' && hev.subject != 'chat' ? url += data.code : null;
        var htmlbody = data != null ? 
            '<div class=\"row\">' +
            '   <div class=\"col-md-6\"><h4>' + actionshash[hev.action] + ' ' + subjectshash[hev.subject] + '</h4>' + '</div>' +
            '   <div class=\"col-md-6 text-right\"><i class="fa ' + iconshash[hev.subject] + '" style="font-size: 89px;"></i>' + '</div>' +
            '</div>' +
            '<div class=\"row\"><div class=\"col-md-12\" ><b> Codigo:</b> ' + data.code + '</div></div>' +
            '<div class=\"row\"><div class=\"col-md-12\" ><b> Agencia</b>: ' + agency + '</div></div>' +
            '<br />' +
            '<div class=\"row\"><div class=\"col-md-12\" ><a href=\"' + url + '\" target="_blank"> ver mas...</a></div></div>'
            :
            'No se pueden recuperar los datos de esta notificacion...';
        return htmlbody;
    }

    function showuserpanel() {
        Notification.success({
            message: 
            '<div class=\"row\">' + 
            '   <div class=\"col-md-6\"><h4>Nueva Reserva</h4>' + '</div>' +
            '   <div class=\"col-md-6 text-right\"><i class="fa fa-plane" style="font-size: 89px;"></i>' + '</div>' +
            '</div>' +
            '<div class=\"row\"><div class=\"col-md-12\" ><b> codigo:</b> 003985RY</div></div>' + 
            '<div class=\"row\"><div class=\"col-md-12\" ><b>Agencia</b>: Akdmkjdj  ijnjsd</div></div>' +
            '<br />' + 
            '<div class=\"row\"><div class=\"col-md-12\" ><a href=\"http://google.es\" target="_blank"> ver mas...</a></div></div>' + 
            '<div class=\"row mt-xl\">' +
            '   <div class=\"col-xs-6\"><img src="/img/brand/yourttoo.com-logo.png" style=\"width:138px;\"></div>' +
            '   <div class=\"col-xs-6\"><a class=\"mb-l btn btn-success btn-xs pull-right\" title="on prototype" >marcar leido</a></div>' + 
            '</div>',
            title: '<b>Action</b> -> <b>subject</b> || ' + new Date().toLocaleString(),
            delay: null
        });
    }

    var notifier = {
        pending: [],
        readed: [],
        last3: [],
        lastone: null,
        notreaded: 0,
        on: function (eventname, callback) {
            $rootScope.$on(eventname, function (event, data) {
                console.log(data);
                callback(data);
            })
        },
        markreaded: pushreaded,
        showlastone: showlastone,
        preferences: userpreferences,
        availablesubjects:
            ['booking',
            'booking2',
            'tailormade.queries',
            'tailormade.quotes',
            'product',
            'affiliate',
            'chat', 'whitelabel'],
        relatedscope: null,
        openconfig: showuserpanel,
        showmessage: function (title, message) { Notification.success({ message: message, title: title }); },
        showerror: function (title, message) { Notification.error({ message: message, title: title }); },
        saveuserpreferences: function () {
            saveuserpreferences();
        }
    };

    $rootScope.markreaded = function (code) {
        notifier.markreaded(code);
    }

    function getcurrentcodes() {
        return _.pluck(notifier.pending, 'code');
    }

    function pushreaded(code, callback) {
        console.log('push readed ' + code);
        if (notifier.lastone) {
            var hev = notifier.lastone;
            hev.readers != null && hev.readers.length > 0 ? hev.readers.push(currentuser.user.email) : [currentuser.user.email];
            var rq = {
                command: 'save',
                service: 'api',
                request: {
                    data: hev,
                    collectionname: 'Hevents',
                    query: { code: hev.code }
                }
            };

            var rqCB = yto_api.send(rq);

            rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                console.log('Marked readed...');
                Notification.success({ message: 'Marcada notificacion ' + hev.code + ' leida por ' + currentuser.user.email, title: 'Notificacion leida' });
                _count_notifications();
                callback != null ? callback(rsp) : null;
            });
            //on response noOk
            rqCB.on(rqCB.onerroreventkey, function (err) {
                console.error("error saving notification");
                console.error(err);
                Notification.error({ message: err, title: 'Notificacion leida - ERROR' });
                errorcallback != null ? errorcallback(err) : null;
            });
        }
    }

    function showlastone() {
        var sound = false;
        var audio = null;
        _recover_lastone(function () {
            notifier.lastone != null && !notifier.lastone.showed ?
                (Notification.success({
                    message: _rendernotify(notifier.lastone),
                    title: '<b>' + actionshash[notifier.lastone.action] + '</b> || ' + new Date(notifier.lastone.createdOn).toLocaleString(),
                    delay: 20000, templateUrl: 'not_custom_template.html'
                }),
                    notifier.lastone.showed = true,
                    sound = userpreferences.sound, 
                    sound ? (audio = new Audio('/sounds/generic.wav'), audio.play()) : null) : null;
        });
    }

    function shownotifications() {
        
        var sound = false;
        var audio = null;
        _.each(notifier.last3, function (hev) {
            !hev.showed ?
                (Notification.success({
                    message: _rendernotify(hev),
                    title: '<b>' + actionshash[hev.action] + '</b> || ' + new Date(hev.createdOn).toLocaleString(),
                    delay: 20000
                }), hev.showed = true, sound = userpreferences.sound) : null;
        });
        sound ? (audio = new Audio('/sounds/generic.wav'), audio.play()) : null;
        rest > 0 ? Notification.success({
            message: 'Pendiente: <br>' + 
            'y <b>' + rest + '</b> notificaciones mas...<br /> ON TESTING... (prototyping)</a><br>' +
            '<img src="/img/brand/yourttoo.com-logo.png">', title: 'Notificacion sistema YTO',
            delay: 20000
        }) : null;
    }

    function _recover_lastone(callback) {
        var rq = {
            command: 'findone',
            service: 'api',
            request: {
                query: {
                    $and: [
                        {
                            subject: {
                                $in: userpreferences.selectedsubjects
                            }
                        },
                        { readers: { $nin: [currentuser.user.email] } }
                    ]
                },
                collectionname: 'Hevents',
                sortcondition: { createdOn: -1 }
            }
        };
        var rqCB = yto_api.send(rq);

        rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
            var current = notifier.lastone != null ? notifier.lastone._id : null;
            notifier.lastone = rsp;
            notifier.lastone.showed = false;
            callback != null ? callback(rsp) : null;
        });

        rqCB.on(rqCB.onerroreventkey, function (err) {
            Notification.error(err);
            callback != null ? callback() : null;
        });
    }

    function _recover_notification(code, callback) {
        var rq = {
            command: 'findone',
            service: 'api',
            request: {
                query: {
                    $and: [
                        { code: code }
                    ]
                },
                collectionname: 'Hevents'
            }
        };
        var rqCB = yto_api.send(rq);

        rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
            beforecount = notifier.pending.length;
            callback != null ? callback(rsp) : null;
        });

        rqCB.on(rqCB.onerroreventkey, function (err) {
            Notification.error(err);
            callback != null ? callback() : null;
        });
    }

    function _count_notifications(callback) {
        var rq = {
            command: 'count',
            service: 'api',
            request: {
                query: {
                    $and:
                    [
                        {
                            subject: {
                                $in: userpreferences.selectedsubjects
                            }
                        },
                        { readers: { $nin: [currentuser.user.email] } }
                    ]
                },
                fields: '_id code createdOn subject action state readers data.code data.idBooking data.code data.pricing.amount data.affiliate.company.name data.dmc.company.name ' +
                'data.current.code data.current.idBooking data.current.code data.current.pricing.amount data.current.affiliate.company.name data.current.dmc.company.name',
                collectionname: 'Hevents',
                sortcondition: { createdOn: -1 }
            }
        };

        var rqCB = yto_api.send(rq);

        rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
            beforecount = notifier.notreaded;
            notifier.notreaded = rsp.count;
            //Notification.success('recovered ' + notifier.pending.length + ' notifications...');
            beforecount != notifier.notreaded ? $rootScope.$broadcast('new.hevents', notifier) : null;
            beforecount != notifier.notreaded && userpreferences.shownotifications ? showlastone() : null;
            showatfirstload = true;
            callback != null ? callback() : null;
        });

        rqCB.on(rqCB.onerroreventkey, function (err) {
            Notification.error(err);
            callback != null ? callback() : null;
        });

    }

    function _recover_notifications(callback) {

        var rq = {
            command: 'find',
            service: 'api',
            request: {
                query: {
                    $and:
                    [
                        {
                            subject: {
                                $in: userpreferences.selectedsubjects
                            }
                        },
                        { readers: { $nin: [currentuser.user.email] } }
                    ]
                },
                maxresults: 20,
                offset: currentpage,
                fields: '_id code createdOn subject action state readers data.code data.idBooking data.code data.pricing.amount data.affiliate.company.name data.dmc.company.name ' + 
                        'data.current.code data.current.idBooking data.current.code data.current.pricing.amount data.current.affiliate.company.name data.current.dmc.company.name', 
                collectionname: 'Hevents',
                sortcondition: { createdOn : -1 }
            }
        };

        notifier.pending != null && notifier.pending.length > 0 ?
            rq.request.query.$and.push({ code: { $nin: getcurrentcodes() } }) : null;

        var rqCB = yto_api.send(rq);

        rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
            beforecount = notifier.pending.length;
            notifier.pending.length == 0 && rsp != null ?
                notifier.pending = rsp : notifier.pending = _.union(rsp, notifier.pending);
            //Notification.success('recovered ' + notifier.pending.length + ' notifications...');
            $rootScope.$broadcast('new.hevents', notifier);
            beforecount < notifier.pending.length && showatfirstload && userpreferences.shownotifications ? shownotifications() : null;
            showatfirstload = true;
            callback != null ? callback() : null;
        });

        rqCB.on(rqCB.onerroreventkey, function (err) {
            Notification.error(err);
            callback != null ? callback() : null;
        });

    }

    readuserpreferences();
    currentuser != null && currentuser.user != null && currentuser.user.rolename == 'admin' ? _count_notifications() : null;

    currentuser != null && currentuser.user != null && currentuser.user.rolename == 'admin' ? setInterval(function () {
        _count_notifications();
    }, 30000) : null;

    $rootScope.$watch(notifier.relatedscope, function () {
        console.log(notifier.relatedscope);
    })

    return notifier;
});