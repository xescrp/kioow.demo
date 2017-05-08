'use strict';
var app = angular.module('openMarketTravelApp');

app.directive("ngFileSelect", ['xhrFileUploader', function (xhrFileUploader) {

    return {
        require: '?ngModel',
        link: function ($scope, el, attrs, ngModel) {
            
            el.bind("change", function (e) {

                angular.element(document.querySelector('#' + attrs.ngWaitingid)).removeClass('ng-hide');
                angular.element(document.querySelector('#' + attrs.ngHideid)).addClass('disabledbox');
                var file = (e.srcElement || e.target).files[0];
                el.attr("disabled", "disabled");

                var filetype = 'image';
                var additionalData = '';

                if (attrs.ngFileType != null && attrs.ngFileType != '') {
                    filetype = attrs.ngFileType;
                }
                if (attrs.ngAdditionalData != null && attrs.ngAdditionalData != '') {
                    additionalData = attrs.ngAdditionalData;
                }

                if (filetype == 'image') {
                    xhrFileUploader.uploadFile(file, $scope).then(function (response) {
                        console.log(response);
                        ngModel.$setViewValue(response);
                        angular.element(document.querySelector('#' + attrs.ngWaitingid)).addClass('ng-hide');
                        angular.element(document.querySelector('#' + attrs.ngHideid)).removeClass('disabledbox');
                        el.removeAttr("disabled");

                        if ($scope.showToaster) {
                            $scope.showToaster('success', 'File uploaded OK',
                                              'Image added');
                        }
                        var callback = attrs.ngCallback;
                        console.log(callback);
                        if (angular.isFunction(callback)) {
                            callback();
                        }
                        $scope.$broadcast('fileuploaded', response);
                    });

                }
                else {
                    xhrFileUploader.uploadFileLocal(file, additionalData, $scope).then(function (response) {
                        console.log(response);
                        ngModel.$setViewValue(response);
                        angular.element(document.querySelector('#' + attrs.ngWaitingid)).addClass('ng-hide');
                        angular.element(document.querySelector('#' + attrs.ngHideid)).removeClass('disabledbox');
                        el.removeAttr("disabled");

                        if ($scope.showToaster) {
                            $scope.showToaster('success', 'File uploaded OK',
                                              'file added to dmc');
                        }
                        var callback = attrs.ngCallback;
                        console.log(callback);
                        if (angular.isFunction(callback)) {
                            callback();
                        }
                        $scope.$broadcast('fileuploaded', response);
                    });
                }
                

            });

            $scope.$on("HttpfileProgress", function (e, progress) {
                $scope.loadingprogress = 100 * (progress.loaded / progress.total);
                console.log($scope.loadingprogress);
            });

            $scope.$watch(attrs.ngWaitingid, function (value) {
                //$scope.modelbinding = value;
            });

        }
    }
}]);