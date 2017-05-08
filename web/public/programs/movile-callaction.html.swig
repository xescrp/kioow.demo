<section class="price-total padded-b visible-xs">
  <div class="row">
    {% if disponible %}
	<div class="col-md-6 text-center">
	<div class="the-price" itemscope itemtype="http://schema.org/Offer">
	    <p class="mb-zero"><em>desde</em></p>
	    <p class="mb-l"><strong class="h1 bold">
	       <span itemprop="price">{? addNumSeps(product.pvp.b2b.value) ?}</span><span class="h3 bold"> {? product.pvp.currency.symbol ?}</span></strong></p>
		<meta itemprop="priceCurrency" content="{? product.pvp.currency.value ?}" />
	  </div>
	  <p class="mb-b"><em>por persona en base doble</em></p>
	  <p class="mb-b">{? Math.round(product.pvp.b2b/product.itinerary.length) ?} {? product.pvp.currency.symbol ?} / día</p>
	  <p class="mb-zero">2 adultos, <strong>TOTAL: {? addNumSeps(product.pvp.b2b * 2) ?} {? product.pvp.currency.symbol ?}</strong></p>
	</div>
	<div class="col-md-6 text-center">
		<h3 class="h2 thin text-alternate mb-xxl">¿Listo para reservar tu viaje?</h3>
		  <a ng-href="/booking/{? product.slug_es ?}{% if date %}?datein={?date?}{% else %}?{% endif %}&{? querystring ?}" target="_self" class="btn btn-lg btn-danger">Reservar Ahora</a>		
	</div>
      {% else %}
	<div class="mt-xl text-center">
	        <h3 class="thin text-gray mb-xl">No hay disponibilidad de este producto para estas fechas.</h3>
	        <a href="/viajes" target="_self" class="btn btn-danger mb-xl">Realiza <br class="hidden-lg" /> otra búsqueda</a>
        	</div>
      {% endif %}
  </div>
</section>