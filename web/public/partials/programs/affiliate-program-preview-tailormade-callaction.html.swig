<!-- partial yto-quote-callaction.html.swig -->
<section class="product-resume max-center-sm hidden-sm hidden-xs bg-light" itemprop="offerDetails">
	<section class="price-total padded-zero text-center request-offer">
		<div class="request-offer-title">
	    <h4 class="text-alternate text-center mt-b mb-b pl-l pr-l">{{ dmcproduct.title_es || dmcproduct.title }}</h4>
		<p class="text-center text-gray mb-b">
			<i class="fa fa-calendar"></i>
      {{ quote.operationStart.day }}-{{ quote.operationStart.month + 1 }}-{{ quote.operationStart.year }}
      &nbsp;&nbsp;
			<i class="fa fa-clock-o"></i>
      {{ dmcproduct.itinerary.length }} dias
    </p>      
	</div>

		<div class="request-offer-price-detail text-center">
		<p class="mb-b"><em>{{ quoteGetPaxes() }} pasajeros</em></p>


      <div ng-include="callactiontmdistributionurl"></div>

		<br/>
	    <strong>PVP TOTAL: {{quote.pvpAffiliate.value}} </strong> <span class="bold">{{ quote.pvpAffiliate.currency.symbol }}</span>
		<h2 class="mt-zero mb-b"><strong class="text-red ng-binding"></strong></h2>

      <div class="relative mt-b"  ng-init="showBreakdown = false" >
        <a ng-href="#desglose" ng-click="showBreakdown = !showBreakdown">Desglose AAVV</a>
        <div ng-show="showBreakdown"  style="top: 20px;left: 50%; margin-left: -110px;" class="bottom popover">
          <div class="arrow" ></div>
          <div class="popover-inner padded-b">
            <div ng-include="'/partials/programs/yto-price-edit-detail.html.swig?v={{appversion}}'"></div>
          </div>
        </div>
      </div>
      <br />

		  <a ng-show="quote.status != 'win'" 
         href="/booking/{{ dmcproduct.slug_es }}?datein={{ quote.operationStart.day }}-{{ quote.operationStart.month + 1 }}-{{ quote.operationStart.year }}&quote={{ quote.code }}" target="_self" class="btn btn-danger btn-lg mb-b">RESERVAR</a>
        <br />

			<a ng-show="quote.status == 'win'" href="#" class="btn btn-lg btn-success disabled">Reservada</a><br />

		<em class="text-red text-xs">Válido hasta 
			{{ quote.quoteValidUntil.day }} 
			{{ quote.quoteValidUntil.monthname_es }} 
			{{ quote.quoteValidUntil.year }}
		</em>
		<p class="text-center mt-xxl">
	        <a class="mt-xl block link-download-pdf" id="generateProductPdf" href=""  ng-click="printQuote()" >
	        <img class="iblock" src="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_30/v1448532039/assets/pdf-download.png"
	        data-src2x="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_60/v1448532039/assets/pdf-download.png" height="30" /> 
	        <span lass="iblock relative">Itinerario para cliente</span></a>
	    </p>
		</div>
	</section>
</section>