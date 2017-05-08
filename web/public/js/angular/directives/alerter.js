app.directive("alerter", ['tools_service',
    '$uibModal', 'yto_api',
    '$cookieStore', 'Lightbox', '$anchorScroll', '$location', 'alertengine',
    function (tools_service,
        $uibModal, yto_api,
        $cookieStore, Lightbox, $anchorScroll, $location, alertengine) {


        return {
            templateUrl: '/js/angular/directives/views/alerter.html?d=' + new Date(),
            scope: {

            },
            link: function ($scope, el, attrs) {
                el.bind('click', function (e) {
                    e.stopPropagation();
                });
                
                
                alertengine.on('new.hevents', function (alerter) {
                    console.log('recibido en alerter...');
                    $scope.notifications.count = alerter.notreaded;
                });
                $scope.notifications = {
                    count: alertengine.notreaded
                };
                $scope.prefs = function () {
                    alertengine.openconfig();
                }
                $scope.showlastone = function () {
                    alertengine.showlastone();
                }
                $scope.markreaded = function (hev) {
                    console.log('from alerter... push readed ' + code);
                    alertengine.markreaded(hev);
                }

                $scope.alertengine = alertengine;
                
                $scope.savepreferences = function () {
                    alertengine.saveuserpreferences();
                    el.navOpen = !el.navOpen;
                    alertengine.showmessage('configuracion notificaciones', 'cambios en la configuracion guardados correctamente.');
                }

                alertengine.relatedscope = $scope;
            }
        };

    }]);