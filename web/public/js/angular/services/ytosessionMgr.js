﻿var app = angular.module("openMarketTravelApp");

app.service('yto_session_service', function ($cookieStore, $cookies, http_service, yto_api) {
    'use strict';
    var currentsession;

    console.log('instance os session...');
    return {
        currentSession: _get_current_session,
        refreshSession: _refresh_session,
        logOut: _log_out,
        saveSession: _save_session,
        removeSession: _remove_session,
        cacheStore: _cache_store,
        cacheRecover: _cache_recover
    };

    function _get_current_session(callback) {
        currentsession = loginsession;
        callback != null ? callback(loginsession) : null;
        return loginsession;
    }
    //function _get_current_session(callback) {

    //    var rq = {
    //        command: 'recoversession',
    //        service: 'auth',
    //        request: null
    //    };
            
    //    var rqCB = yto_api.send(rq);
    //    //on response Ok
    //    rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
    //        _save_session(rsp);
    //        callback(rsp);
    //    });
    //    //on response noOk
    //    rqCB.on(rqCB.onerroreventkey, function (err) {
    //        callback(err);
    //    });
    //}
    function _refresh_session(callback) {

        var rq = {
            command: 'refreshsession',
            service: 'auth',
            request: null
        };
        
        var rqCB = yto_api.send(rq);

        //on response Ok
        rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
            _save_session(rsp);
            callback != null ? callback(rsp) : null;
        });
        //on response noOk
        rqCB.on(rqCB.onerroreventkey, function (err) {
            callback != null ? callback(err) : null;
        });
    }
    function roughSizeOfObject(object) {

        var objectList = [];

        var recurse = function (value) {
            var bytes = 0;

            if (typeof value === 'boolean') {
                bytes = 4;
            }
            else if (typeof value === 'string') {
                bytes = value.length * 2;
            }
            else if (typeof value === 'number') {
                bytes = 8;
            }
            else if 
        (
                typeof value === 'object'
                && objectList.indexOf(value) === -1
            ) {
                objectList[objectList.length] = value;

                for (var i in value) {
                    bytes += 8; // an assumed existence overhead
                    bytes += recurse(value[i]);
                }
            }

            return bytes;
        };

        return recurse(object);
    }
    function _save_session(session) {
       
        var key = session.key;

        var sessionobj = {
            key: key,
            admin: null,
            dmc: null,
            traveler: null,
            affiliate : null,
            user: null
        };
        if (session != null && session.user != null) {
            sessionobj.user = {
                _id: session.user._id,
                username: session.user.username,
                email: session.user.email,
                code: session.user.code,
                isDMC: session.user.isDMC,
                isTraveler: session.user.isTraveler,
                isAffiliate: session.user.isAffiliate,
                isLocal: session.user.isLocal,
                isAdmin: session.user.isAdmin,
                isFacebookLinked: session.user.isFacebookLinked,
                isTwitterLinked: session.user.isTwitterLinked,
                isGoogleLinked: session.user.isGoogleLinked,
                updatedOn: "2014-10-22T11:05:43.613Z",
                createdOn: "2014-10-22T11:05:42.921Z",
                photo: session.user.photo
            }
            
            if (session.admin != null && session.admin.code != null) {
                sessionobj.admin = {
                    id: session.admin._id,
                    code: session.admin.code,
                    name: session.admin.name,
                    images: session.admin.images
                }
            }
            
            if (session.dmc != null && session.dmc.code != null) {
                var desc = '';
                if (session.dmc.additionalinfo.description != null) {
                    desc = session.dmc.additionalinfo.description.substr(0, 30) + '...'
                } else {
                    if (session.dmc.additionalinfo.description_es != null) {
                        desc = session.dmc.additionalinfo.description_es.substr(0, 30) + '...'
                    }
                }
                sessionobj.dmc = {
                    id: session.dmc._id,
                    additionalinfo: {
                        description: desc
                    },
                    name: session.dmc.name,
                    code: session.dmc.code,
                    images: session.dmc.images,
                    membership: { registervalid: session.dmc.membership.registervalid }
                }
            }
            
            if (session.traveler != null && session.traveler.code != null) {
                sessionobj.traveler = {
                    id: session.traveler._id,
                    code: session.traveler.code,
                    name: session.traveler.name,
                    images: session.traveler.images
                };
            }
            
            if (session.affiliate != null && session.affiliate.code != null) {
                sessionobj.affiliate = {
                    id: session.affiliate._id,
                    code: session.affiliate.code,
                    name: session.affiliate.name,
                    images: session.affiliate.images,
                    fees: session.affiliate.fees
                }
            }
            
            console.log('size: ' + roughSizeOfObject(sessionobj) + ' bytes');
            console.log('size stringify: ' + JSON.stringify(sessionobj).length + ' bytes');
            
            _remove_session();
            console.log('sessionobj ', sessionobj);
            try {
                $cookieStore.put('omtsession', sessionobj);
                $cookieStore.put('omtsessionkey', session.key);
            }
        catch (err) {
                //cookie storage not working...
                localStoreSession(sessionobj);
            }
        }
        return sessionobj;
    }

    function _remove_session() {

        $cookieStore.put('omtsession', null);
        $cookieStore.put('omtsessionkey', null);

        $cookieStore.remove('dmc');
        $cookieStore.remove('omtsession');
        $cookieStore.remove('omtsessionkey');
        //ensure deleting
        delete_cookie('dmc');
        delete_cookie('omtsession');
        delete_cookie('omtsessionkey');
        localRemoveSession();
    }

    function delete_cookie(name) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }


    function localStoreSession(session) {
        var ss = JSON.stringify(session);
        localStorage.setItem('omtsession', ss);
        localStorage.setItem('omtsessionkey', session.key);
    }

    function localRecoverSession() {
        var ss = localStorage.getItem('omtsession');

        if (ss != null && ss != '') {
            var session = JSON.parse(ss);
            return session;
        }
        else {
            return null;
        }
        
        
    }
    function localRemoveSession() {
        localStorage.clear();
    }


    function _log_out(callback) {
        var rq = {
            command: 'logout',
            service: 'auth',
            request: null
        };
        
        var rqCB = yto_api.send(rq);
        console.log(rqCB);
        //on response Ok
        rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
            _remove_session();
            callback(rsp);
        });
        //on response noOk
        rqCB.on(rqCB.onerroreventkey, function (err) {
            callback(rsp);
        });
    }

    function _recover_session(callback) {
        openmarket_api_service.recoverSession(function (session) {
            if (session) {
                currentsession = session;
                callback(session);
            } else {
                callback(null);
            }
        });
    }

    function _recover_session_token(token, callback) {
        openmarket_api_service.recoverSessionToken(token, function (session) {
            if (session) {
                currentsession = session;
                callback(session);
            } else {
                callback(null);
            }
        });
    }

    function _cache_store(key, item, callback) {
        var fetch_url = '/cache';
        var postdata = { key: key, item: item };
        http_service.http_request(fetch_url, 'POST', null, postdata).then(
            function (response) {
                callback(response);
            },
            function (err) {
                throw 'An unknown error has ocurred!' + err;
            });
    }
    function _cache_recover(key, callback) {
        var fetch_url = '/cache';
        var postdata = { key: key };
        http_service.http_request(fetch_url, 'GET', postdata, null).then(
            function (item) {
                callback(item);
            },
            function (err) {
                throw 'An unknown error has ocurred!' + err;
            });
    }
});