{% extends 'yto-layout-empty.html.swig' %}
{% block bodyclass %}print{% endblock %}

{% block body %}

<style>

html {
  position: relative;
  margin: 0;
  padding: 0;
}
body {
  margin: 0;
  padding: 0;
  font-size: 12pt!important;
}
p{
  font-size: 14pt!important;
}
ul li{
	font-size: 13.2pt!important;
	color: #555;
}
#productPDF{
	position: relative;
	height: 34.5cm;
	padding: .1cm!important;
  	padding-top: .4cm!important;
  	border-width: .2cm;
  	border-style: solid;
	margin-top: 0.5cm;
}

#productPDF #rowheader{
	/*position: relative;*/
}
#productPDF #agencyLogo{

}
#productPDF #agencyLogo span{
	background: white;
}
#productPDF #agencyLogo img{
	width: 3.93cm;
	margin-top: .04cm;
}

#productPDF #countryBox{
	/*height: 3.95cm;*/
}

#productPDF #countryBox h1{
	font-size: 36pt!important;
	height: 100%;
	margin: 0;
	padding: 0.6cm;
	text-transform: uppercase;
}

#productPDF #productMainBox{
}

#productPDF #priceBox{
	position: absolute;
	margin: 0;
	top: .7cm;
    right: 1.2cm;
	background: rgba(255,255,255,0.9);
	width: 10cm;
	padding: .8cm;
	font-size: 130%;
}

#productPDF #priceBox h4{
	font-size: 30pt;
}

#productPDF #priceBox .h1{
	font-size: 80pt!important;
}
#productPDF #priceBox #ppday{
	font-size: 20pt!important;
	margin-bottom: 0;
}

#productPDF #priceBox .h1 .currency{
	font-size: 39pt!important;
}

#productPDF #titleBox h1{
	margin: 0;
	padding: .6cm 0;
	font-size: 25pt!important;
}

#itineraryBox h4, #includeBox h4, #hotelCategories h4{
	font-size: 15pt;
	margin-top: .7cm;
	margin-bottom: .5cm;
	padding-left: .1cm;
}

.footer {
  position: absolute;
  top: 23.5cm;
  width: 100%;
  height: 11cm;
  padding-right: .15cm;
}
.footer h2{
	font-size: 18.3pt!important;
	margin: 0;
	margin-bottom: .5cm;
	padding: .4cm .62cm .4cm .62cm;
	height: 1.5cm;
	display: inline-block;
}
#agencyLogoFooter img{
	width: 8.2cm;
}
#agencyInfo{
	position: relative;
	top: 8cm;
}
#agencyInfo h3{
	font-size: 17pt!important;
	margin-top: .3cm;
}
#agencyInfo h5{
	font-size: 14pt!important;
	line-height: 150%;
}

/*Color Vars*/
#productPDF #agencyLogo span{
	background-color: {% if brand-primary %}{? brand-primary ?}{% else %}#ff4940{% endif %};
}
#productPDF #countryBox h1, #productPDF #titleBox h1, #productPDF .footer h2{
	color: white;
	background-color: {% if brand-primary %}{? brand-primary ?}{% else %}#ff4940{% endif %};
}
#itineraryBox h4, #includeBox h4, #hotelCategories h4 {
	color: {% if brand-primary %}{? brand-primary ?}{% else %}#ff4940{% endif %};
}
#productPDF{
	border-color:  {% if brand-primary %}{? brand-primary ?}{% else %}#ff4940{% endif %};
}
</style>

<div id="productPDF">
<div class="container">
	<div class="row" id="rowheader">
		<div class="col-xs-12 text-center" id="countryBox">
			<h1 class="bold">{% for country in countries %}
					{% if country.label_es %}{?- country.label_es -?}{% else %}{?- country.label_en -?}{%- endif -%}
					{%- if loop.index < countries.length -%}
						{%- if loop.index == countries.length-1 %}
							y 
						{%- else -%},
						{% endif %}
					{% endif %}
				{% endfor %}</h1>
		</div>

	</div>
	<div class="row">
		<div class="col-md-12" id="productMainBox">
			<div id="priceBox" class="text-center">
				<div class="the-price" itemscope itemtype="http://schema.org/Offer">
					<h4 class="mt-zero">{% if product.itinerary.length == 1 %}1 día {% else %} {?  product.itinerary.length ?} días {% endif %}</h4>
					<p class="mb-zero"><em>desde</em></p>
					<p class="mb-b">
					<strong class="h1 bold">
					{# BRING RIGHT CURRENCY FROM JSON #}
					<span itemprop="price">{? product.pvp.b2b | numberFractions ?}</span><span class="currency bold">{? product.pvp.currency.symbol ?}</span></strong></p>
					<meta itemprop="priceCurrency" content="{? product.pvp.currency.value ?}" />
				</div>
			</div>
			<img src='{? getUrlCloudinary(product.productimage.url, "mainproductimageprintresume") ?}' class="img-responsive" alt="{? product.title_es ?}" title="{? product.title_es ?}" itemprop="image">
		</div>
	</div>
	<div class="row" id="titleBox">
		<div class="col-md-12">
			<h1 class="mt-l text-center bold" itemprop="name">
			{? product.title_es ?}
			</h1>
		</div>
	</div>
	<div class="row">
		<!-- end itinerary col-->
		<div class="col-xs-12">
			<div id="itineraryBox">
				<h4>Visitando</h4>
				<ul class="fa-ul ml-b">
					<li><i class="fa-li fa fa-globe"></i> {? cities |join(', ')?}</li>
				</ul>
			</div>
		</div>
		<div class="col-xs-6">
			<div id="hotelCategories">
				<h4>Categoría Hoteles</h4>
				<ul class="fa-ul ml-b">
					<li class="mt-b">
						<i class="fa-li fa fa-bed"></i>
						{? hotels| join(', ') ?}
					</li>
				</ul>
			</div>
			<div id="includeBox">
				<h4>Incluye</h4>
				<ul class="fa-ul ml-b">
				{% if product.included.arrivaltransfer %}
					<li class="mt-b">
						<span><i class="fa-li fa fa-check"></i>Traslado de llegada 
						{% if product.included.arrivalassistance %}
							<span>con asistencia
							{% set arass = product.included.arrivallanguage %}
							{% if arass.spanish or arass.english or arass.french or arass.german or arass.italian or arass.portuguese  %}
								en: 
							{% endif %}
							{% for lang in product.included.arrivallanguage %}
								{% if lang %}
									{% if loop.key == "spanish" %}español<span class="comma">,</span>{% endif %}
									{% if loop.key == "english" %}inglés<span class="comma">,</span>{% endif %}
									{% if loop.key == "french" %}francés<span class="comma">,</span>{% endif %}
									{% if loop.key == "german" %}alemán<span class="comma">,</span>{% endif %}
									{% if loop.key == "italian" %}italiano<span class="comma">,</span>{% endif %}
									{% if loop.key == "portuguese" %}portugués<span class="comma">,</span>{% endif %}
								{% endif %}
							{% endfor %}
							</span>
						{% endif %}
						</span>
					</li>
				{% endif %}
				
				{% if product.included.departuretransfer %}
					<li class="mt-b"><span><i class="fa-li fa fa-check"></i>Traslado de salida 
					{% if product.included.departureassistance %}
						<span>
							con asistencia
							{% set deass = product.included.departurelanguage %}
							{% if deass.spanish or deass.english or deass.french or deass.german or deass.italian or deass.portuguese  %}
								en: 
							{% endif %}
							{% for lang in product.included.arrivallanguage %}
								{% if lang %}
									{% if loop.key == "spanish" %}español<span class="comma">,</span>{% endif %}
									{% if loop.key == "english" %}inglés<span class="comma">,</span>{% endif %}
									{% if loop.key == "french" %}francés<span class="comma">,</span>{% endif %}
									{% if loop.key == "german" %}alemán<span class="comma">,</span>{% endif %}
									{% if loop.key == "italian" %}italiano<span class="comma">,</span>{% endif %}
									{% if loop.key == "portuguese" %}portugués<span class="comma">,</span>{% endif %}
								{% endif %}
							{% endfor %}
						</span>
					{% endif %}
					</span></li>
				{% endif %}
			   
				{% if product.included.transportbetweencities.included %}
					<li class="mt-b">
						<span>
							<i class="fa-li fa fa-check"></i>Transporte entre ciudades:
							{% if product.included.transportbetweencities.bus %}autobús<span class="comma">,</span>{% endif %}
							{% if product.included.transportbetweencities.domesticflight %}vuelo doméstico<span class="comma">,</span>{% endif %}
							{% if product.included.transportbetweencities.train %}tren<span class="comma">,</span>{% endif %}
							{% if product.included.transportbetweencities.boat %}barco<span class="comma">,</span>{% endif %}
							{% if product.included.transportbetweencities.van %}minivan<span class="comma">,</span>{% endif %}
							{% if product.included.transportbetweencities.truck %}camión<span class="comma">,</span>{% endif %}
							{% if product.included.transportbetweencities.privatecarwithdriver %}coche privado con conductor<span class="comma">,</span>{% endif %}
							{% if product.included.transportbetweencities.privatecarwithdriverandguide %}coche privado con conductor y guía<span class="comma">,</span>{% endif %}
							{% if product.included.transportbetweencities.fourxfour %}4x4<span class="comma">,</span>{% endif %}
							{% if product.included.transportbetweencities.other %}{? product.included.transportbetweencities.otherdescription ?}<span class="comma">,</span>{% endif %}
						</span>
					</li>
				{% endif %}

				{% if product.included.tourescort.included %}
					<li class="mt-b">
						<span>
							<i class="fa-li fa fa-check"></i>
							{% set escortindex = product.included.tourescort.language %}
							{% if escortindex.spanish %}
								Guía Turístico en español
							{% else %}
								{% if escortindex.english %}
									Guía Turístico en inglés
								{% else %}
									{% if escortindex.french %}
										Guía Turístico en francés
										{% else %}
											{% if escortindex.german %}
												Guía Turístico en alemán
											{% else %}
												{% if escortindex.italian %}
													Guía Turístico en italiano
												{% else %}
													{% if escortindex.portuguese %}
														Guía Turístico en portugués
													{% endif %}	
												{% endif %}														
											{% endif %}												
									{% endif %}											
								{% endif %}
							{% endif %}
						</span>
					</li>
				{% endif %}


				{% if product.included.driveguide.included && !product.included.tourescort.included %}
					<li class="mt-b">
						<span>
							<i class="fa-li fa fa-check"></i>
							{% set driveindex = product.included.driveguide.language %}
							{% if driveindex.spanish %}
								Conductor-guía en español
							{% else %}
								{% if driveindex.english %}
								Conductor-guía en inglés
								{% else %}
									{% if driveindex.french %}
											Conductor-guía en francés
										{% else %}
											{% if driveindex.german %}
												Conductor-guía en alemán
											{% else %}
												{% if driveindex.italian %}
													Conductor-guía en italiano
												{% else %}
													{% if driveindex.portuguese %}
														Conductor-guía en portugués
													{% endif %}	
												{% endif %}
											{% endif %}
									{% endif %}
								{% endif %}
							{% endif %}
						</span>
					</li>
				{% endif %}

				<li class="mt-b">
					<span>
						<i class="fa-li fa fa-check"></i>
						{% if meals.breakfast == 1 %}
							{? meals.breakfast ?} desayuno<span class="comma"> - </span>
							{% elseif meals.breakfast > 1 %}
							{? meals.breakfast ?} desayunos<span class="comma"> - </span>
							{% else %}
						{% endif %}

						{% if meals.lunch == 1 %}
							{? meals.lunch ?} comida<span class="comma"> - </span>
							{% elseif meals.lunch > 1 %}
							{? meals.lunch ?} comidas<span class="comma"> - </span>
							{% else %}
						{% endif %}

						{% if meals.dinner == 1 %}
							{? meals.dinner ?} cena<span class="comma"> - </span>
							{% elseif meals.dinner > 1 %}
							{? meals.dinner ?} cenas<span class="comma"> - </span>
						{% else %}
						{% endif %}
					</span>
				</li>
				{% if product.included.airporttaxes %}
					<li class="mt-b">
						<span><i class="fa-li fa fa-check"></i>Tasas aeropuerto </span>
					</li>
				{% endif %}
				
				{% if product.included.tips %}
					<li class="mt-b">
						<span><i class="fa-li fa fa-check"></i>Propinas </span></li>
				{% endif %}

				{% if hasDrinks %}
					<li class="mt-b">
						<span><i class="fa-li fa fa-check"></i>Bebidas</span>
					</li>
				{% endif %}        
				
				{% if product.included.baggagehandlingfees %}
					<li class="mt-b">
						<span><i class="fa-li fa fa-check"></i>Maleteros </span>
					</li>
				{% endif %}

				<li class="mt-b">
					<span><i class="fa-li fa fa-check"></i>Hoteles, Regimen Alimenticio y visitas según se especifique o no, en el itinerario</span>
				</li>
			</ul>
			</div><!-- end includebox -->
		</div><!-- end rigth-colum -->
	</div><!-- end row -->
</div> <!-- end container -->
<div class="footer">
	<div class="container">
		<div class="row">
			<div class="col-xs-7">
				<div class="text-right" id="agencyInfo">
					<h3 class="bold">{? session.affiliate.company.name ?}</h3>
					<h5>Teléfono: {? session.affiliate.company.phone ?} | 
					{% if session.affiliate.company.website %} Web: {? session.affiliate.company.website ?} {% endif %} </h5>
				</div>
			</div>
			<div class="col-xs-5 text-right">
				<h2 class="bold">Pídenos Información en:</h2>
				
				<div id="agencyLogoFooter">
					<img src="{? session.affiliate.images.logo.url ?}" alt="affiliate avatar" title="affiliate avatar">
				</div>
			</div>
		</div>
	</div>
</div>
</div>
{% endblock %}