(function () {
    'use strict';

    angular
        .module('openMarketTravelApp')
        .service('AffiliateService', AffiliateService);

    AffiliateService.$inject = ["yto_api"];

    /* @ngInject */
    function AffiliateService(yto_api) {
        this.searchSlug = searchSlug;

        ////////////////

        function searchSlug(slug, success, failure) {
            var rq = {
                command: 'findone',
                service: 'api',
                request: {
                    query: { slug: slug},
                    populate: [{ path: 'user', select: 'email code _id name facebook google' }, { path: 'wlcustom' }],
                    collectionname: 'Affiliate'
                }
            };

            var rqCB = yto_api.send(rq);

            rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                success(rsp);
            });

            rqCB.on(rqCB.onerroreventkey, function (err) {
                failure(err);
            });
        }
    }

})();
