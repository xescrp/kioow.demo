app.controller("affiliateCompareResultsCtrl",
    ['$scope',
    '$log',
    '$http',
    '$window',
    '$location',
    '$route',
    '$filter',
    '$uibModal',
    'tools_service',
    '$cookies',
    'yto_api',
    'yto_session_service',
    function(
        $scope,
        $log,
        $http,
        $window,
        $location,
        $route,
        $filter,
        $uibModal,
        tools_service,
        $cookies,
        yto_api,
        yto_session_service
        ){
        'use strict';

        var now = new Date();

        $scope.session = {};

        var brandpath = '';
        if (typeof brandPath !== 'undefined') {
            $scope.brandpath = brandPath;
        }

        $scope.isWhiteLabel = false;
        if (typeof isWhiteLabel !== 'undefined') {
            $scope.isWhiteLabel = isWhiteLabel;
        }

        var debug = $location.search().debug;
        $scope.debug = debug;

          if(debug)
              $log.log('in debug mode');


        $scope.comlist = [];

        $scope.$on('addtocompare', function(event, arg) {

            //if array is under 4, the max amount of compare items
            if ($scope.comlist.length <= 3) {

                // if code is not in the array
                if ($scope.comlist.indexOf(arg) == -1) {
                    $scope.comlist.push(arg);

                    if ($scope.comlist.length == 4) {
                        $scope.opencomparemodal('lg', $scope.comlist, yto_api, tools_service);
                    } else {
                        $scope.openinfocomparemodal('sm', $scope.comlist, false);
                    }
                }
                // if code IS already in the array
                else {
                    $scope.comlist.splice($scope.comlist.indexOf(arg), 1)
                    console.log("we removed" + arg + "from" + $scope.comlist)
                }
                console.log($scope.comlist);

            } else {
                console.log("ya has seleccionado cuatro viajes")
                $scope.openinfocomparemodal('sm', $scope.comlist, true);
            }

        });

        $scope.openinfocomparemodal = function (size, list, over) {
            var modalInstance = $uibModal.open({
              animation: $scope.animationsEnabled,
              templateUrl: '/partials/widgets/modal-info-compare.html.swig?v='+now,
              size: size,
              windowClass: "infocompare",
              controller: "compareinfomodalCtrl",
              resolve: {
                data : function() {
                    var data = {
                     "comlist" : list,
                     "over": over
                    }
                    return data;
                }
              }
            });

            modalInstance.result.then(function () {
                $scope.opencomparemodal('lg', $scope.comlist, yto_api, tools_service);
            }, function () {
              $log.info('Modal dismissed at: ' + new Date());
            });

        };

        $scope.opencomparemodal = function (size, list, yto_api, tools_service) {
          var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: '/partials/widgets/modal-compare.html.swig?v='+now,
            size: size,
            controller: "comparemodalCtrl",
            windowClass: 'container',
            windowTopClass: 'comparemodalclass',
            resolve: {
              data : function() {
                  var data = {
                   "comlist" : list
                  };
                  return data;
              },
              session  : function() {
                  var session = $scope.session;
                  return session;
              }
            }
          });

          modalInstance.result.then(function () {
              $scope.clearcheck();
          }, function () {
            $log.info('Modal dismissed at: ' + new Date());
          });
      };

      $scope.clearcheck = function() {
          for (var i = 0; i < $scope.pager.items.length; i++) {
              $scope.pager.items[i].itemcheckboo = false;
          }
          $scope.comlist = [];
      };



    var _recoverSession = function(){
        yto_session_service.currentSession(function (session) {
            console.log('get session...',session);
            $scope.session = session;
        });
    };

    // init whit session
    //

    _recoverSession();

}]);


app.controller('comparemodalCtrl', function ($scope, $uibModal, $uibModalInstance, data, session, yto_api, tools_service, $location, productpreviewhelpers) {

    $scope.isWhiteLabel = false;
    if (typeof isWhiteLabel !== 'undefined') {
        $scope.isWhiteLabel = isWhiteLabel;
    }

    var brandpath = '';
    if (typeof brandPath !== 'undefined') {
        $scope.brandpath = brandPath;
    }

    $scope.session = session;

    var debug = $location.search().debug;
    $scope.debug = debug;

      if(debug)
          $log.log('in debug mode');
    // show loaded?
    $scope.loaded = false;
    // list codes from results
    $scope.comlist = data.comlist;
    //
    // product to compare
    $scope.cproducts = [];
    // console.log("comparemodalctrl data!!", data);
    $scope.querystring = tools_service.getQuerystring();

    // helpers

    $scope.getimage = function (url, imagename) {
        return tools_service.cloudinaryUrl(url, imagename);
    };

    // buttons actions
    //
    //another one
    $scope.ok = function (item) {
        $uibModalInstance.close();
    };
    //out
    $scope.exit = function() {
        $scope.comlist = [];
        $uibModalInstance.close();
    };
    var iterator = $scope.comlist.length;

    //compare
    $scope.loadCompare = function (callback) {

        for (var e = 0; e < $scope.comlist.length; e++) {
            // getting comlist single product one by one
            //
            //
            var rqprod = {
                command: 'findone',
                service: 'api',
                request: {
                    query: { code: $scope.comlist[e] },
                    collectionname: 'DMCProducts',
                    populate : [{path: 'dmc', select : 'code name images company.name membership.b2bchanel membership.b2bcommission currency'}]
                }
            };

            var rqCBProd = yto_api.send(rqprod);

            // response OK
            rqCBProd.on(rqCBProd.oncompleteeventkey, function (results) {
              if (results!=null){
                if (debug)
                  $log.log(results.code , 'get DMCProduct By Code results ',results);

                var product = results;

                var place = $scope.cproducts.push(product);
                getFamily($scope.cproducts[place-1], callback);
              } // end if null
            });
        }

      function getFamily(itemArray, callback){

          var searchcode = itemArray.code; 
          searchcode = (itemArray.parent != null && itemArray.parent != '') ? itemArray.parent : itemArray.code;
          var rqprodfamily = {
            command: 'find',
            service: 'api',
            request: {
                query: { $or : [{code: searchcode}, { parent : searchcode}] },
                collectionname: 'DMCProducts',
                populate: [{ path: 'dmc', select: 'code name images company.name membership.b2bchanel membership.b2bcommission currency'}]
            }
          };

          var rqCBProdFamily = yto_api.send(rqprodfamily);

          rqCBProdFamily.on(rqCBProdFamily.oncompleteeventkey, function (resultsFamily) {


            iterator --;

            if (resultsFamily != null && resultsFamily.length > 1) {
                itemArray.allcats = {};
                itemArray.allrelateds = {};
                // run through all family members to get category list
                for (var m = 0; m < resultsFamily.length; m++) {
                    itemArray.allcats[resultsFamily[m].categoryname.label_es] = resultsFamily[m].code;
                    itemArray.allrelateds[resultsFamily[m].code] = resultsFamily[m];
                }
                //console.log("cproducts are : ",$scope.cproducts);
            }

            if (iterator == 0 && callback != undefined){
              callback();
            }

          });
      }
    };

    var OLDgetPrice = function (item){
        var ret = '';
        var symbol = '';
        if (item.minprice.currency.value == 'EUR'){
            ret = item.minprice.value;
            symbol = item.minprice.currency.symbol;
        } else{
            ret = item.minprice.exchange.value;
            symbol = item.minprice.exchange.currency.symbol;
        }
        console.log (item.title_es,'>>>> minprice  ',item.minprice );
        // return ret;
        return { value : tools_service.buildAffiliatePVPPrice(ret, $scope.session.affiliate, 'unique'), symbol : symbol};
    };

    var getPrice = function (item) {
        var ret = '';
        var symbol = '';

        return { value: item.pvp.b2b, symbol: item.pvp.currency.symbol };
    }

    $scope.getItineraryDay = function( day ){
        return productpreviewhelpers.getItineraryDay(day);
    };


    $scope.showCompare = function(){
      for (var a = 0; a < $scope.cproducts.length; a++) {
            $scope.cproducts[a].affiliateMinPrice = getPrice($scope.cproducts[a]);
            $scope.cproducts[a].hotels = tools_service.getHotelCatsProduct($scope.cproducts[a], 'es');
            $scope.cproducts[a].mealstext = tools_service.getMealsProduct($scope.cproducts[a],'str','es');
            $scope.loaded = true;
      }
    };


    $scope.updateCompare = function(code, allcats, allrels, pindex) {
        //copy allrelateds of current product
        //to selected product code all relateds
      $scope.cproducts[pindex].allrelateds[code].allrelateds = allrels;
      $scope.cproducts[pindex].allrelateds[code].allcats = allcats;
      $scope.cproducts[pindex] = $scope.cproducts[pindex].allrelateds[code];
      $scope.showCompare();
    };

    $scope.loadCompare(function(){
      $scope.showCompare();
    });

//funct ends
//
//

});


app.controller('compareinfomodalCtrl', function ($scope, $uibModal, $uibModalInstance, data) {

    $scope.comlist = data.comlist;
    $scope.over = data.over;

    //another one
    $scope.ok = function () {
        $uibModalInstance.dismiss();
    };

    //out
    $scope.exit = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.openthemodal = function() {
        $uibModalInstance.close();
    };

});

app.controller('supermapCtrl', function ($scope, $uibModal, $uibModalInstance, data) {

    $scope.havemap = true;
    $scope.title_es = data.title_es;
    $scope.urliframe = "/previewmap/" + data.code;

    //another one
    $scope.ok = function (item) {
        $uibModalInstance.close(item);
    };

    //out
    $scope.exit = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.openthemodal = function() {
        $uibModalInstance.close();
    };

});
