<hr class="mt-b" />
  <section class="price-total padded-b" >
    <div class="row">
      <div class="col-md-6 text-center">
        <div>
          <p class="mb-b">{{quoteGetPaxes()}} pasajeros</p>
          <div ng-include="callactiontmdistributionurl"></div>

          <div class="relative mt-b"  ng-init="showBreakdown = false" >
            <a ng-href="#desglose" ng-click="showBreakdown = !showBreakdown">Desglose AAVV</a>
            <div ng-show="showBreakdown"  style="top: 20px;left: 50%; margin-left: -110px;" class="bottom popover">
              <div class="arrow"></div>
              <div class="popover-inner padded-b">
                <div ng-include="'/partials/programs/yto-price-edit-detail.html.swig?v={{appversion}}'"></div>
              </div>
            </div>
          </div>
          <br />
          
          <p class="mb-zero">
            <em>total</em>
          </p>
          <p class="mb-l">
            <strong class="h1 bold">{{quote.pvpAffiliate.value}}{{quote.pvpAffiliate.currency.symbol}}</strong>
          </p>
          <p class="small italic text-red mt-b">Cotización válida hasta {{quote.quoteValidDate | date : 'd/MM/y'}}</p>
        </div>
      </div>
      <div class="col-md-6 text-center">
        <h3 class="h2 thin text-alternate mt-b">¿Listo para reervar?</h3>
        <button type="button" class="btn btn-lg btn-default disabled">Reservar</button>
      </div>
    </div>
  </section>
  <hr class="mb-b" ng-show="dmcproduct.dmc && dmcproduct.dmc.company" />
    <footer class="dmc-profile" ng-show="dmcproduct.dmc && dmcproduct.dmc.company">
      <div class="row">
        <div class="col-md-8">
          <div class="dmc-profile-widget">
            <img class="img-dmc-big" ng-src="{{ getimage(dmcproduct.dmc.images.logo.url, 'avatarb36') }}" data-src2x="{{ getimage(dmcproduct.dmc.images.logo.url, 'avatarb36retina') }}" 
                 title="{{ dmcproduct.dmc.company.name }} logo" alt="{{ dmcproduct.dmc.company.name }} logo" />
              <p class="dmc-text">
                by <a href="#dmc-profile">{{ dmcproduct.dmc.company.name }}</a><br />
                </p>
            </div>
          <p>
            {{ dmcproduct.dmc.additionalinfo.description.substring(0, 249) }}... <a href="/receptivo/{{dmcproduct.dmc.code}}/{{dmcproduct.dmc.name}}" target="_blank">more info</a>
          </p>
        </div>
        <div class="col-md-4">
          <img ng-src="{{getimage(dmcproduct.dmc.images.photo.url, 'corporateselfie')}}"  
               class="img-responsive" alt="{{ dmcproduct.dmc.company.name }} selfie" title="{{ dmcproduct.dmc.company.name }} selfie" />
        </div>
      </div>
    </footer>