app.directive("tsFilterPanes", ['tools_service', '$uibModal', 'yto_api', '$cookieStore',
    function (tools_service, $uibModal, yto_api, $cookieStore) {
        return {
            templateUrl: '/js/angular/components/ts-filterboxes/templates/filter-set.html',
            scope: {
                filterbox: '=filterbox',
                filtershortcuts: '=filtershortcuts',
                auxmethods: '=auxmethods',
                onitemclick: '=onitemclick',
                queryservice: '=queryservice'
                //bindAttr: '='
            },
            link: function ($scope, el, attrs) {
                console.log($scope.filterbox);
                console.log($scope.filtershortcuts);
            }
        }
}]);