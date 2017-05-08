    <hr class="mt-b">
    <section class="price-total padded-b" >
        <div class="row">
            <div class="col-md-6 text-center">
                <div>
                    <p class="mb-b">{{quoteGetPaxes()}} paxes</p>
					<div ng-include="callactiontmdistributionurl"></div>
                    <p class="mb-zero"><em>total</em></p>
                    <p class="mb-l">
                      <strong class="h1 bold">{{quote.pvpAffiliate.value}}</strong><span class="h3 bold"> {{quote.pvpAffiliate.currency.symbol}}</span></p>
                    <p class="small italic text-red mt-b">quote valid until {{quote.quoteValidDate | date : 'mediumDate'}}</p>
                </div>                                                
            </div>
            <div class="col-md-6 text-center">
                <h3 class="h2 thin text-alternate mt-b">Ready to book?</h3>
                <button type="button" class="btn btn-lg btn-default disabled">Book now</button>
            </div>
        </div>
    </section>

    <!-- footer con info del dmc -->
    <hr class="mb-b" ng-show="dmcproduct.dmc && dmcproduct.dmc.company">
    <footer class="dmc-profile" ng-show="dmcproduct.dmc && dmcproduct.dmc.company">
        <div class="row">
            <div class="col-md-8">
                <div class="dmc-profile-widget">
                    <img class="img-dmc-big" ng-src="{{ getimage(dmcproduct.dmc.images.logo.url, 'avatarb36') }}" data-src2x="{{ getimage(dmcproduct.dmc.images.logo.url, 'avatarb36retina') }}" alt="{{ dmcresponse.products.dmc.company.name }} logo" title="{{ dmcresponse.products.dmc.company.name }} logo">
                    <p class="dmc-text">
                        by <a href="#dmc-profile">{{ dmcresponse.products.dmc.company.name }}</a><br>
                    </p>
                </div>
                <p class="pre-text">{{ dmcproduct.dmc.additionalinfo.description.substring(0, 249) }}... <a >more info</a></p>
            </div>
            <div class="col-md-4">
                <img ng-src="{{getimage(dmcproduct.dmc.images.photo.url, 'corporateselfie')}}" data-src2x="{{getimage(dmcproduct.dmc.images.photo.url, 'corporateselfieretina')}}" 
				class="img-responsive" alt="{{ dmcproduct.dmc.company.name }} selfie" title="{{ dmcproduct.dmc.company.name }} selfie">
            </div>
        </div>
    </footer>