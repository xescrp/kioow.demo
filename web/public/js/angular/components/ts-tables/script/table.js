app.directive("tsTable", ['tools_service', '$uibModal', 'yto_api', '$cookieStore',
    function (tools_service, $uibModal, yto_api, $cookieStore) {
        return {
            templateUrl: '/js/angular/components/ts-tables/templates/table.html',
            scope: {
                columns: '=columns',
                rolename: '=rolename',
                itemtemplate: '=itemtemplate',
                auxmethods: '=auxmethods',
                onitemclick: '=onitemclick',
                queryservice: '=queryservice'
                //bindAttr: '='
            },
            link: function ($scope, el, attrs) {
                console.log($scope.columns);
            }
        }
    }]);