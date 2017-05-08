var app = angular.module('openMarketTravelApp');

app.controller('forgotpasswordCtrl', [
    '$scope', 'toaster',
    '$location', '$timeout',
    '$cookieStore', '$cookies',
    '$log', 'yto_api',
    'yto_session_service',
    function (
        $scope, toaster,
        $location, $timeout,
        $cookieStore, $cookies,
        $log, yto_api,
        yto_session_service) {


        $scope.email = '';
        $scope.finished = false;
        $scope.password = '';
        $scope.repeatpassword = '';
        $scope.whois = '';

        $scope.requestrecovery = function () {
            if ($scope.email == null || $scope.email == '') {
                switch ($scope.whois) {
                    case 'traveler':
                        toaster.pop('error', 'Email requerido', 'Es necesario un correo para enviarte un enlace de recuperación.');
                        break;
                    case 'dmc':
                        toaster.pop('error', 'Email required', 'You must provide an email to send you the request');
                        break;
                    case 'affiliate':
                        toaster.pop('error', 'Email requerido', 'Es necesario un correo para enviarte un enlace de recuperación.');
                        break;
                    default:
                        toaster.pop('error', 'Email requerido', 'Es necesario un correo para enviarte un enlace de recuperación.');
                }
            } else {

                var rq = {
                    command: 'recoverpassword',
                    service: 'membership',
                    request: {
                        email: $scope.email,
                        oncompleteeventkey: 'auth.done',
                        onerroreventkey: 'auth.error',
                    }
                };
                var rqCB = yto_api.send(rq);

                rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                    switch ($scope.whois) {
                        case 'traveler':
                            window.location = '/enlace-contrasena-enviado';
                            break;
                        case 'dmc':
                            window.location = '/password-link-sent';
                            break;
                        case 'affiliate':
                            window.location = '/enlace-contrasena-enviado';
                            break;
                        default:
                            window.location = '/enlace-contrasena-enviado';
                    }
                });
                //on response noOk
                rqCB.on(rqCB.onerroreventkey, function (err) {
                    switch ($scope.whois) {
                        case 'traveler':
                            toaster.pop('error',
                                'No encontramos esa dirección de correo en nuestra base de datos.');
                            break;
                        case 'dmc':
                            toaster.pop('error',
                                'Error processing request',
                                'There was an error processing your request' +
                                err + '. Try again');
                            break;
                        case 'affiliate':
                            toaster.pop('error',
                                'No encontramos esa dirección de correo en nuestra base de datos.');
                            break;
                        default:
                            toaster.pop('error',
                                'No encontramos esa dirección de correo en nuestra base de datos.');
                    }
                });
            }
        };

        $scope.changepassword = function (callback) {

            if ($scope.password != null && $scope.repeatpassword != '') {
                if ($scope.password == $scope.repeatpassword) {

                    var rq = {
                        command: 'restorepassword',
                        service: 'membership',
                        request: {
                            email: $scope.email,
                            key: $scope.password,
                            oncompleteeventkey: 'auth.done',
                            onerroreventkey: 'auth.error',
                        }
                    };
                    var rqCB = yto_api.send(rq);

                    rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                        yto_session_service.logOut(function (rsp) {
                            switch ($scope.whois) {
                                case 'traveler':
                                    toaster.pop('success',
                                        'Contraseña cambiada',
                                        'Has cambiado tu contraseña. Es necesario identificarse de nuevo.');
                                    window.location = '/contrasena-confirmada';
                                    break;
                                case 'dmc':
                                    toaster.pop('success',
                                        'Password change',
                                        'Your password has been changed ok. You need to log in again.');
                                    window.location = '/password-confirmed';
                                    break;
                                case 'affiliate':
                                    toaster.pop('success',
                                        'Contraseña cambiada',
                                        'Has cambiado tu contraseña. Es necesario identificarse de nuevo.');
                                    window.location = '/contrasena-confirmada';
                                    break;
                                default:
                                    toaster.pop('success',
                                        'Contraseña cambiada',
                                        'Has cambiado tu contraseña. Es necesario identificarse de nuevo.');
                                    window.location = '/contrasena-confirmada';
                            }
                        });
                    });
                    //on response noOk
                    rqCB.on(rqCB.onerroreventkey, function (err) {
                        switch ($scope.whois) {
                            case 'traveler':
                                toaster.pop('error',
                                    'En el cambio de contraseña',
                                    err + '. Intenta de nuevo.');
                                break;
                            case 'dmc':
                                toaster.pop('error',
                                    'Password change error',
                                    'There was an error processing your request' +
                                    err + '. Try again');
                                break;
                            case 'affiliate':
                                toaster.pop('error',
                                    'En el cambio de contraseña',
                                    err + '. Intenta de nuevo.');
                                break;
                            default:
                                toaster.pop('error',
                                    'En el cambio de contraseña',
                                    err + '. Intenta de nuevo.');
                        }
                    });

                } else {
                    switch ($scope.whois) {
                        case 'traveler':
                            toaster.pop('error', 'Verificar Contraseña', 'El campo de verificar contraseña no coincide.');
                            break;
                        case 'dmc':
                            toaster.pop('error', 'Password required', 'The new repeat password is not equals to new password');
                            break;
                        case 'affiliate':
                            toaster.pop('error', 'Verificar Contraseña', 'El campo de verificar contraseña no coincide.');
                            break;
                        default:
                            toaster.pop('error', 'Verificar Contraseña', 'El campo de verificar contraseña no coincide.');
                    }
                }
            } else {
                switch ($scope.whois) {
                    case 'traveler':
                        toaster.pop('error', 'Contraseña Requerida', 'El campo contraseña no puede estar vacío.');
                        break;
                    case 'dmc':
                        toaster.pop('error', 'Password required', 'The new password can not be empty');
                        break;
                    case 'affiliate':
                        toaster.pop('error', 'Contraseña Requerida', 'El campo contraseña no puede estar vacío.');
                        break;
                    default:
                        toaster.pop('error', 'Contraseña Requerida', 'El campo contraseña no puede estar vacío.');
                }
            }
        };

    }]);