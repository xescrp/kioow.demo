{% extends 'yto-layout-empty.html.swig' %}
{% block bodyclass %}print{% endblock %}

{% block body %}

<style>
* {
  overflow: visible !important;
}
body{
	padding: 0;
	margin: .7cm 1cm;
	font-size: 12pt!important;
}
.break{
	display: block;
	clear: both;
	page-break-after: always;
	border :1px solid red
}
.page-breaker {
	display: block;
	page-break-after: always;
}
#productFullPDF{}

#productFullPDF #productMainBox .priceBox{
	position: absolute;
	margin: 0;
	top:20px;
	right: 35px;
	background: rgba(255,255,255,0.9);
	width: 320px;
	padding: 25px;
	font-size: 140%;
}

#productFullPDF #productMainBox h4{
	font-size: 26px;
}

#productFullPDF #productMainBox .h1{
	font-size: 80px!important;
}

#productFullPDF #productMainBox .h1 .h3{
	font-size: 60px!important;
}

#productFullPDF #titleBox h1 strong{
	font-size: 22pt!important;
}

#productFullPDF .itinerary{
	padding: 0!important;
}

</style>

<div id="productFullPDF">
	<div class="container">
		<div class="row">
			<div class="summary col-md-12">
				{% if product.tags.length > 0 %}
		            <ul class="list-inline">
					<li>
		                <i class="fa fa-tags pull-left mr-four pt-xs"></i>
		                <span>
			                {% for tag in product.tags %}
			                	{% if tag.state == 'published'%}
			                	<span itemprop="category">{? tag.label ?}</span>{% if not loop.last %}, {% endif %}
			                	{% endif %}
			                {% endfor %}
			    		</span>
		            </li>
		            </ul>
				{% endif %}

				<ul class="list-inline">
					<li>
						<i class="fa fa-cutlery pull-left mr-four pt-xs"></i>
						{% if meals.breakfast == 1 %}
							{? meals.breakfast ?} desayuno<span class="comma">,</span>
						{% elseif meals.breakfast > 1 %}
							{? meals.breakfast ?} desayunos<span class="comma">,</span>
						{% endif %}

						{% if meals.lunch == 1 %}
							{? meals.lunch ?} comida<span class="comma">,</span>
						{% elseif meals.lunch > 1 %}
							{? meals.lunch ?} comidas<span class="comma">,</span>
						{% endif %}

						{% if meals.dinner == 1 %}
							{? meals.dinner ?} cena<span class="comma">,</span>
						{% elseif meals.dinner > 1 %}
							{? meals.dinner ?} cenas<span class="comma">,</span>
						{% endif %}
					</li>
				</ul>
				<ul class="list-inline">
					<li>
					 <span class="iblock">
				    	   <i class="fa fa-bed pull-left mr-four pt-xs"></i>
				       		{? hotels ?}
				      </span>
				  </li>
				</ul>
			</div>
		</div>
	</div>
	
	<div class="container">
		<div class="row">
			<div class="col-md-12" id="productMainBox">
				<div class="text-center mt-b mb-xl padded-xl iblock center-block priceBox">
					<div class="the-price" itemscope itemtype="http://schema.org/Offer">
						<h4 class="mt-zero">{% if product.itinerary.length == 1 %}
								1 día
							{% else %}
								{?  product.itinerary.length ?} días
							{% endif %}</h4>
						<p class="mb-zero"><em>desde</em></p>
						<p class="mb-b"><strong class="h1 bold">
						{# BRING RIGHT CURRENCY FROM JSON #}
						<span itemprop="price">{? addNumSeps(product.pvp.b2b) ?}</span><span class="h3 bold">{? product.pvp.currency.symbol ?}</span></strong></p>
						<meta itemprop="priceCurrency" content="{? product.pvp.currency.value ?}" />
					</div>
					<p class="mb-b"><em>por persona en base doble</em></p>
					<p class="mb-b"><strong>{? Math.round(product.pvp.b2b/product.itinerary.length) ?}{? product.pvp.currency.symbol ?} / día</strong></p>
				</div>
				<img src='{? getUrlCloudinary(product.productimage.url, "mainproductimageprintresume") ?}' class="img-responsive" alt="{? product.title_es ?}" title="{? product.title_es ?}" itemprop="image" />
			</div>
		</div>

		<section class="row">
		    <h2 class="thin col-xs-12">Descripción del viaje</h2>	<p class="col-xs-12 mt-xl pre-text" itemprop="description">{? product.description_es ?}</p>
		</section>

		<section class="row">
		    <h2 class="thin col-xs-12">Incluido / No incluido</h2>
		    <div class="pdf-incl-or-not">
		    	{% include "partials/programs/included.html.swig" %}
		    	{% include "partials/programs/notincluded.html.swig" %}
			</div>
		</section>
		<div class="page-breaker"></div>
		<section class="itinerary">
			<h1 class="thin">Itinerario</h1>
			{% include "partials/pdf/itinerary.html.swig" %}
		</section>
		<section class="row">
		<!-- notas importantes -->
		{% include "partials/programs/important-notes.html.swig" %}
		{% include "partials/programs/domestic-flights.html.swig" %}
		</section>
	</div>
</div>

{% endblock %}