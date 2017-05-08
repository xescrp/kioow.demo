var app = angular.module("openMarketTravelApp");

app.service('modals_service', function ($uibModal, tools_service, $log) {
    //'use strict';
    var caller = { description: 'container for calling methods' };

    caller.login_affiliate = function ($scope) {
        var date = new Date();
        var template = '/partials/modals/yto-modal-signin.html.swig?d=' + date;
        var controllername = 'login_instance_ctrl';

        var modalInstance = $uibModal.open({
            templateUrl: template,
            controller: 'login_instance_ctrl',
            size: '',
            scope: $scope,
            resolve: {
                tools: function () {
                    return tools_service;
                },
            }
        });
        return modalInstance;
    };
    caller.image_full = function ($scope) {
        var date = new Date();
        var template = '/partials/modals/modal-full-image.html.swig?d=' + date;
        var controllername = 'image_full_ctrl';

        var modalInstance = $uibModal.open({
            templateUrl: template,
            controller: 'image_full_ctrl',
            size: 'lg',
            scope: $scope,
            resolve: {
                image: function () {
                    return $scope.fullimagepopup;
                },
            }
        });
        return modalInstance;
    };

    caller.cancellbooking = function ($scope) {
        var date = new Date();

        var template = '/partials/modals/yto-modal-cancell-booking.html.swig?d=' + date;
        var controllername = 'cancell_booking_ctrl';

        var modalInstance = $uibModal.open({
            templateUrl: template,
            controller: 'cancell_booking_ctrl',
            size: '',
            scope: $scope,
            resolve: {
                cancelpolicy: function () {
                    return $scope.cancelpolicy;
                },
            }
        });
        modalInstance.result.then(function () {
            // disparo evento de cancelación de reserva
            $scope.$emit('cancellbookingaffiliate');
            }, function () {
              $log.info('Modal dismissed at: ' + new Date());
            });
        return modalInstance;
    };


    caller.cancellquery = function ($scope) {
        var date = new Date();

        var template = '/partials/modals/yto-modal-cancell-query.html.swig?d=' + date;
        var controllername = 'cancell_query_ctrl';

        var modalInstance = $uibModal.open({
            templateUrl: template,
            controller: 'cancell_query_ctrl',
            size: '',
            scope: $scope
        });
        modalInstance.result.then(function () {
            // disparo evento de cancelación de reserva
            $scope.$emit('cancellqueryaffiliate');
            }, function () {
              $log.info('Modal dismissed at: ' + new Date());
            });
        return modalInstance;
    };

    caller.selectdmcforprogram = function ($scope, options) {
        var date = new Date();

        var template = '/partials/modals/select-dmc-and-program.html.swig?d=' + date;
        var controllername = 'select_dmc_program_ctrl';

        $scope.onlydmc = !options.selectprogram;
        $scope.dmclist = options.dmcs;
        $scope.dmc = options.dmc;
        $scope.singlecopy = options.singlecopy || false;

        var modalInstance = $uibModal.open({
            templateUrl: template,
            controller: 'select_dmc_program_ctrl',
            size: 'lg',
            scope: $scope
        });
        modalInstance.result.then(function () {
            // disparo evento de cancelación de reserva
            $scope.$emit('selection-dmc');
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
        return modalInstance;
    }

    return {
        openmodal : function (type, $scope, options) {
            if (caller.hasOwnProperty(type.toLowerCase())) { 
                caller[type.toLowerCase()]($scope, options);
            }
        },
        showconfirmationmodal: function (options, $scope, callback) {
            var modalDefaults = {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                templateUrl: '/partials/modals/modalconfirm.html',
                controller : function ($scope, $modalInstance) {
                    $scope.modalOptions.ok = function (result) {
                        $modalInstance.close(result);
                        console.log(result);
                        callback != null ? callback(true) : null;
                    };
                    $scope.modalOptions.close = function (result) {
                        $modalInstance.dismiss('cancel');
                        console.log(result);
                        callback != null ? callback(false) : null;
                    };
                },
                scope: $scope
            };
            modalDefaults.scope.modalOptions = {
                closeButtonText: 'Cancelar',
                actionButtonText: 'OK',
                headerText: 'Confirma accion',
                bodyText: 'Seguro que quieres ejecutar esta accion?'
            };

            return $uibModal.open(modalDefaults).result;
        }
    };
});

app.controller('login_instance_ctrl', function ($scope, $uibModalInstance, tools) {
    $scope.$on('login.before', function (event, args) {
        tools.showPreloader($scope, 'show');
    });
    
    $scope.$on('login.done', function (event, args) {
        tools.showPreloader($scope, 'hide');
        $uibModalInstance.close();
    });
    
    $scope.$on('login.error', function (event, args) {
        tools.showPreloader($scope, 'hide');
    });

    $scope.cancel = function () { 
        $uibModalInstance.dismiss();
    };
});

app.controller('image_full_ctrl', function ($scope, $uibModalInstance) {
    $scope.cancel = function () { 
        $uibModalInstance.dismiss();
    };
});

app.controller('cancell_booking_ctrl', function ($scope, $uibModalInstance) {
    $scope.ok = function () {
    $uibModalInstance.close();
    };

    $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
    };

});

app.controller('cancell_query_ctrl', function ($scope, $uibModalInstance) {
    $scope.ok = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});

app.controller('select_dmc_program_ctrl', function ($scope, $uibModalInstance) {
    $scope.ok = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});