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
  /* Margin bottom by footer height */
  margin: 0;
  /*margin-bottom: 3cm;*/
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
	height: 32cm;
	margin: 0;
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
	height: 3.95cm;
}

#productPDF #countryBox h1{
	font-size: 32pt!important;
	height: 100%;
	margin: 0;
	padding-top: 1.3cm;
}

#productPDF #productMainBox{
}

#productPDF #priceBox{
	position: absolute;
	margin: 0;
	top: .7cm;
    right: 1cm;
	background: rgba(255,255,255,0.9);
	width: 8cm;
	padding: .8cm;
	font-size: 130%;
}

#productPDF #priceBox h4{
	font-size: 23pt;
}

#productPDF #priceBox .h1{
	font-size: 43pt!important;
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
	padding-left: .3cm;
}

.footer {
  position: absolute;
  top: 32cm;
  width: 100%;
  height: 2.6cm;
}
.footer h2{
	font-size: 19pt!important;
	margin: 0;
	padding: .95cm .5cm 0 .5cm;
	height: 2.6cm;
}
#agencyLogoFooter img{
	width: 2.6cm;
}

#agencyInfo h3{
	font-size: 15pt!important;
	margin-top: .3cm;
}
#agencyInfo h5{
	font-size: 12.8pt!important;
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

</style>

<div id="productPDF">
<div class="container">
	<div class="row" id="rowheader">
		<div class="col-xs-2 text-center" id="agencyLogo">
		<span>
			<img src="{? session.affiliate.images.logo.url ?}" alt="affiliate avatar" title="affiliate avatar">
		</span>
		</div>
		<div class="col-xs-10 text-center" id="countryBox">
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
					<span itemprop="price">{? minPrice.pvp | numberFractions ?}</span><span class="currency bold">{? minPrice.currency.symbol ?}</span></strong></p>
					<meta itemprop="priceCurrency" content="{? minPrice.currency.value ?}" />
				</div>
				<p class="mb-b"><em>por persona en base doble</em></p>
				<p class="mb-b" id="ppday"><strong>{? Math.round(minPrice.pvp/product.itinerary.length) ?}{? minPrice.currency.symbol ?} / día</strong></p>
			</div>
			<img src='{? getUrlCloudinary(product.productimage.url, "mainproductimageprintresume") ?}' class="img-responsive" alt="{? product.title_es ?}" title="{? product.title_es ?}" itemprop="image">
		</div>
	</div>
	<div class="row" id="titleBox">
		<div class="col-md-12">
			<h1 class="mt-l text-center bold" itemprop="name">
			{? product.title_es ?}
				{#	{% for rel in related %}
                  {% if rel.slug_es == product.slug_es %}
                    {? rel.categoryname.label_es?}
                  {% endif %}
                {% endfor %} #}
			</h1>
		</div>
	</div>
{# 	<div class="container">
		<div class="row" id="summaryBox">
			<div class="col-md-12">
				<ul class="list-inline">
					<li>
						<span class="iblock">
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
						</span>
					</li>
					<li>
				      <span class="iblock">
				    	   <i class="fa fa-bed pull-left mr-four pt-xs"></i>
				       		Hoteles: {? hotels ?}
				      </span>
				    </li>		
					<li>
						<span class="iblock">
							<i class="fa fa-tags pull-left mr-four pt-xs"></i>
							{% for tag in product.tags %}
								<span itemprop="category">{? tag.label ?}</span>{% if not loop.last %}, {% endif %}
							{% endfor %}
						</span>
					</li>
				</ul>
			</div>
		</div>	
	</div> #}
	<div class="row">
		<div class="col-xs-6" id="itineraryBox">
			<h4>Itinerario</h4>
			<ul class="fa-ul">
				{% for day in product.itinerary %}
				<li class="mt-b"><i class="fa-li fa fa-calendar-o"></i> DÍA {? day.daynumber ?}: <strong>
					{% if day.departurecity.city.length > 0 %}
					{# check if city ES exists #}
						{% if day.departurecity.city_es != null %}
							{# make sure departure is not like sleepcity #}
							{% if day.sleepcity.city_es != day.departurecity.city_es %}
								{? day.departurecity.city_es ?} 
								{% if day.stopcities.length > 0 || day.sleepcity.city.length > 0 %} - {% endif %}
							{# else (so dep and sleep were the same) #}
							{% else %}
								{% if day.stopcities.length > 0 %}
									{? day.departurecity.city_es ?} -
								{% endif %}
							{% endif %}
						
						{# else show regular city #}
						{% else %}
							{# make sure departure is not like sleepcity #}
							{% if day.sleepcity.city != day.departurecity.city %}
								{? day.departurecity.city ?} 
								{% if day.stopcities.length > 0 || day.sleepcity.city.length > 0 %} - {% endif %}
							{# else (so dep and sleep were the same) #}
							{% else %}
								{% if day.stopcities.length > 0 %}
									{? day.departurecity.city ?} -
								{% endif %}
							{% endif %}
						{% endif %}
					{% endif %}
					{% if day.stopcities.length > 0 %}
						{% for city in day.stopcities %}
							{% if city.city_es != null %}
								{? city.city_es ?}
							{% else %}
								{? city.city ?}
							{% endif %}
							{% if !loop.last %} - {% endif %}
						{% endfor %}
						{% if day.sleepcity.city.length > 0 %}-{% endif %}
					{% endif %}
					{% if !product.itinerary.lastday %}
						{% if day.sleepcity.city.length > 0 %}
							{% if day.sleepcity.city_es != null %}
								{? day.sleepcity.city_es ?}
							{% else %}
								{? day.sleepcity.city ?}
							{% endif %}
						{% endif %}
					{% endif %}
					</strong>
				</li>
				{% endfor %}
			</ul>
		</div><!-- end itinerary col-->
		<div class="col-xs-6">
			<div id="includeBox">
				<h4>Incluye</h4>
				<ul class="fa-ul">
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

				{# ONLY SHOWING WHEN NOT INCLUDED #}
				{# {% if product.included.taxesinthecountry %}
					<li class="mt-b"><span><i class="fa-li fa fa-check"></i>
					Impuestos del país </span></li>
				{% endif %} #}
				

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
			<div id="hotelCategories">
				<h4>Categoría Hoteles</h4>
				<ul class="fa-ul">
					{% for city in citysAndHotelCats%}
					<li class="mt-b">
						<i class="fa-li fa fa-caret-right"></i> 
						{? city.city ?}: <strong>{? city.cats|join(', ') ?} </strong>
					</li>
					{% endfor %}
				</ul>
			</div>

		</div><!-- end rigth-colum -->
	</div><!-- end row -->
</div> <!-- end container -->
<div class="footer">
	<div class="container">
		<div class="row">
			<div class="col-xs-5">
				<h2 class="text-center bold">Pídenos Información en:</h2>
			</div>
			<div class="col-xs-5 text-right" id="agencyInfo">
				<h3 class="bold">{? session.affiliate.company.name ?}</h3>
				<h5>Teléfono: {? session.affiliate.company.phone ?}
				<br />{% if session.affiliate.company.website %} Web: {? session.affiliate.company.website ?} {% endif %} </h5>
			</div>
			<div class="col-xs-2 text-left" id="agencyLogoFooter">
				<img src="{? session.affiliate.images.logo.url ?}" alt="affiliate avatar" title="affiliate avatar">
			</div>
		</div>
	</div>
</div>
</div>
{% endblock %}