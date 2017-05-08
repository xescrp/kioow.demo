<hr />
<section class="price-total padded-b" itemprop="offerDetails" itemscope itemtype="http://data-vocabulary.org/Offer">
	<div class="row">
	{% if disponible %}
	<div class="col-md-6 text-center">
		<div class="the-price">
		    <p class="mb-zero"><em>desde</em></p>
		    <p class="mb-l"><strong class="h1 bold">
		    {# BRING RIGHT CURRENCY FROM JSON #}
		    <span itemprop="price">{? addNumSeps(product.pvp.b2b) ?}</span><span class="h3 bold"> {? product.pvp.currency.symbol ?}</span>
          <meta itemprop="currency" content="{? minPrice.currency.value ?}" /></strong></p>
		</div>
		<p class="mb-b"><em>por persona en base doble</em></p>
		<p class="mb-b">{? Math.round(product.pvp.b2b/product.itinerary.length) ?} {? product.pvp.currency.symbol ?} / día</p>
		<p class="mb-zero">2 adultos, <strong>TOTAL: {? addNumSeps(product.pvp.b2b * 2) ?} {? product.pvp.currency.symbol ?}</strong></p>
    <a class="iblock pt-xl" ng-href="#desglose" popover-trigger="focus" popover-placement="bottom" uib-popover-template="'/partials/programs/yto-price-detail.html.swig'" >Desglose AAVV</a>
	</div>
	<div class="col-md-6 text-center">
	  <h3 class="h2 thin text-alternate mb-xxl">¿Listo para reservar tu viaje?</h3>
	  <a ng-href="/booking/{? product.slug_es ?}{% if date %}?datein={?date?}{% else %}?{% endif %}&amp;{? querystring ?}" target="_self" class="btn btn-lg btn-danger">Reservar Ahora</a>

    <!--botones pdf -->
    <p class="text-center mb-zero mt-xxl">
      <a class="mt-xl block link-download-pdf" id="generateProductPdf"  href="#" target="_self" ng-click="printTravel('{? product.slug_es ?}')">
        <img class="iblock" src="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_30/v1448532039/assets/pdf-download.png"
        data-src2x="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_60/v1448532039/assets/pdf-download.png" height="30" />
        <span lass="iblock relative" style="top:3px;">Itinerario para cliente</span>
      </a>
      <a class="mt-xl block link-download-pdf" id="generateProductPdfOnePage" href="#" target="_self" ng-click="printTravelOnePage('{? product.slug_es ?}')">
        <img class="iblock" src="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_30/v1448532039/assets/pdf-download.png"
          data-src2x="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_60/v1448532039/assets/pdf-download.png" height="30" />
        <span class="iblock relative" style="top:3px;">Cartelería para AAVV</span>
      </a>
    </p>
    
	</div>
	{% else %}
	<div class="mt-xl text-center">
        <h3 class="thin text-gray mb-xl">No hay disponibilidad de este producto para estas fechas.</h3>
        <a href="/viajes" target="_self" class="btn btn-danger mb-xl">Realiza <br class="hidden-lg" /> otra búsqueda</a>
	</div>
	{% endif %}
	</div>
</section>