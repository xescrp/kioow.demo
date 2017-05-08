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
	    <strong>PVP TOTAL: {{quote.amount.value}} </strong> <span class="bold">{{ quote.amount.currency.symbol }}</span>
		<h2 class="mt-zero mb-b"><strong class="text-red ng-binding"></strong></h2>

		  <!--desglose si no tiene el pvp calculado--> 
         <!--{% if quote.pvpAffiliate != null && quote.pvpAffiliate.exchange != null && quote.pvpAffiliate.exchange.value != null %}

       		 {% if quote.pvpAffiliate.exchange.currency.value == 'EUR' %}
			<a  ng-init="priceDetail = { fee :  {? quote.fees.tailormade ?}, feeunit: '%', price: { net: {? quote.amount.exchange.value ?}, pvp: {? quote.pvpAffiliate.exchange.value ?}, currency: { symbol: '€'}}}" ng-href="#desglose" popover-placement="bottom" class="block mb-xl" popover-template="'/partials/yto/widgets/yto-price-detail.html.swig'" popover-trigger="focus">Desglose AAVV</a>
			{% else %}
			<a ng-init="priceDetail = { fee :  {? quote.fees.tailormade ?}, feeunit: '%', price: { net: {? quote.amount.exchange.value ?}, pvp: {? quote.pvpAffiliate.exchange.value ?}, currency: { symbol: 'USD'}}}" ng-href="#desglose" popover-placement="bottom" class="block mb-xl" popover-template="'/partials/yto/widgets/yto-price-detail.html.swig'" popover-trigger="focus">Desglose AAVV</a>
			{% endif %}

		{% else %}									
	        <a ng-init="priceDetail = getMinPrice({net : quote.amount.exchange.value, currency:  quote.amount.exchange.currency })" class="block mb-xl" ng-href="#desglose" popover-placement="bottom" uib-popover-template="'/partials/yto/widgets/yto-price-detail.html.swig'" popover-trigger="focus">Desglose AAVV</a>        
	    {% endif %}-->


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
	        <a class="mt-xl block link-download-pdf" id="generateProductPdf"  href="#" target="_self" ng-click="printTravel('{{ dmcproduct.slug }}')">
	        <img class="iblock" src="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_30/v1448532039/assets/pdf-download.png"
	        data-src2x="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_60/v1448532039/assets/pdf-download.png" height="30" /> 
	        <span lass="iblock relative">Itinerario para cliente</span></a>
	    </p>
		</div>
	</section>
</section>