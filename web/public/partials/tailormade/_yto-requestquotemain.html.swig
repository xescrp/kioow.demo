<!-- // is part of /quote/[quotecode]/ -->
<div class="container" ng-controller="affiliateProductCtrl">
    <div class="row">
        <div class="col-md-12">		
            <ol class="breadcrumb mt-xl" vocab="http://schema.org/" typeof="BreadcrumbList">
				 {% for bread in bc %}
				  {% if bread.url != "" %}
					  <li property="itemListElement" typeof="ListItem"><a target="_self" property="item" typeof="WebPage" href="{? bread.url ?}">
              <span property="name">{? bread.label ?}</span></a>
              <meta property="position" content="{? loop.index ?}" ></meta>
					  </li>
				  {% else %}
				  <li class="active" property="itemListElement" typeof="ListItem">
				  	<a property="item" typeof="WebPage" href="{? canonicalurl ?}">
				  		<span property="name">{? bread.label ?}</span>
				  	</a>
            <meta property="position" content="{? loop.index ?}"></meta>
				  </li>	
				  {% endif %}
				{% endfor %}
		 	</ol>
{# 		<div class="page-header text-gray">
			<h1 class="mt-zero">{? product.title_es ?}</h1>
		</div> #}
        </div>
    </div>

        <div class="row">
            <section class="request">
                <nav class="subnav">
                    <div class="main mb-l">					
						<a href="{? back.url?}" target="_self" class="btn btn-link">
							<i class="fa fa-arrow-left"></i> {? back.label?}
						</a>
                    </div>
                </nav>
				
			<!-- product main content -->
			<div class="row wrap-program-product">
				{# PRODUCT CONTENT #}
				<div class="col-md-9 mb-xxl">
					<div class="product-detail">
						<section class="product-head">
							<header>
								<span class="hidden" content="{? product.code ?}">{? product.code ?}</span>
							    <div class="summary">
							        <h1 class="mt-l">{? product.title_es ?}</h1>
							        <p>Esta información es sólo una propuesta. No existen servicios reservados. Ten en cuenta también que el precio neto se basa en el número de personas especificado en la petición. Si los pasajeros variaran, la cotización podría no ser la misma.</p>
							        <h3>	
							        	<p class="h4-sized">
							            	<span class="regular">Destinos: </span>
								            <i class="fa fa-globe pull-left mr-four"></i>
								            <strong>
								            {% for city in cities %}
								            	{? city.label_es ?}{% if not loop.last %}, {% endif %}
								            {% endfor %}
								            </strong>
							            </p>
							        </h3>

							        <ul class="list-inline">
							            <li>
							            	<span class="iblock">
							            		<i class="fa fa-calendar "></i>
							            	</span>
											{? quote.operationStart.day ?} 
											{? quote.operationStart.monthname_es ?} 
											{? quote.operationStart.year ?}
							            </li>
							            <li>
							            	<span class="iblock">
							            		<i class="fa fa-clock-o "></i>
							            	</span>
							                {% if product.itinerary.length == 1 %}
							                	1 día
							                {% else %}
							                	{?  product.itinerary.length ?} días
							                {% endif %}
							            </li>
							            <li>
							            	<span class="iblock">
							            		<i class="fa fa-bed"></i>
							            	</span>
							                {% for hotel in hotelcats %}
							                	{? hotel ?}<span class="comma">, </span>
							                {% endfor %}
							            </li>
	            
 										{% if  product.tags  &&  product.tags.length >0 %}
								            <li>
								                <i class="fa fa-tags pull-left mr-four  pt-xs"></i>
								                <span>
									                {% for tag in product.tags %}
									                <span>{? tag.label ?}</span>{% if not loop.last %}, {% endif %}
									                {% endfor %}
									    		</span>
								            </li>
							            {% endif %}

							            {% if  meals && (meals.breakfast > 0 || meals.lunch >0 || meals.dinner>0) %}
								            <li>
								                <i class="fa fa-cutlery pull-left mr-four  pt-xs"></i>
								                {% if meals.breakfast == 1 %}
								                	{? meals.breakfast ?} desayuno<span class="comma">,</span>
										   		{% elseif meals.breakfast > 1 %}
										    	{? meals.breakfast ?} desayunos<span class="comma">,</span>
								                {% else %}
								                {% endif %}

								                {% if meals.lunch == 1 %}
								                	{? meals.lunch ?} comida<span class="comma">,</span>
								                {% elseif meals.lunch > 1 %}
								                	{? meals.lunch ?} comidas<span class="comma">,</span>
								                {% else %}
								                {% endif %}

								                {% if meals.dinner == 1 %}
								                	{? meals.dinner ?} cena<span class="comma">,</span>
								                {% elseif meals.dinner > 1 %}
								                	{? meals.dinner ?} cenas<span class="comma">,</span>
								                {% else %}
								                {% endif %}
								            </li>
							            {% endif %}
							        </ul>

							    </div>
							</header>
							{% if product.productimage.url != 'http://res.cloudinary.com/open-market-travel/image/upload/v1426854292/assets/omtempty.png'%}
								<img src='{? getUrlCloudinary(product.productimage.url, "mainproductimage") ?}' data-src2x='{? getUrlCloudinary(product.productimage.url, "mainproductimageretina") ?}' class="img-responsive" alt="{? product.title_es ?}" title="{? product.title_es ?}" itemprop="image">
							{% endif %}
							</section>
							{% if product.description_es.length > 0%}
							<section class="main-description row">
							    <h2 class="thin col-md-8 hidden-xs hidden-sm">Descripción</h2>    
							    <div class="addthis_sharing_toolbox col-md-4 mt-xxl text-right"></div>
							    <h2 class="visible-xs col-md-8 thin">Descripción</h2>
							    <p class="col-md-12 mt-xl pre-text" itemprop="description">
							    	{?- product.description_es -?}
							    </p>
							</section>
							{% endif %}

						<section>

							<div class="product-map" ng-show="havemap">
								<h2 class="thin padded-b mb-xl">Recorrido</h2>
							      <div class="hidden-sm hidden-xs" id="map"></div> 
							</div>
						</section>

						<section class="itinerary">
						    <h2 class="thin">Itinerario</h2>
						    {% for day in product.itinerary %}

							{% if loop.first %}
								<hr/>
							{% endif %}
						    <div class="row day-item">
	    
						        <div class="day-thumb">
						        	<!-- https://github.com/jdpedrie/angularjs-ordinal-filter -->
						            <span class="label label-day"><i class="fa fa-calendar-o"></i> DÍA {? day.daynumber ?}</span>
						            {% if day.image.url != 'http://res.cloudinary.com/open-market-travel/image/upload/v1426854292/assets/omtempty.png' %}
						            <img class="img-responsive" src='{? getUrlCloudinary(day.image.url, "itinerarydaythumb") ?}' data-src2x='{? getUrlCloudinary(day.image.url, "itinerarydaythumbretina") ?}' alt="DÍA {? day.daynumber ?}" title="DÍA {? day.daynumber ?}">
									{% endif %}
						        </div>
						        <div class="day-desc">
						            <h3 class="day-tit">
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
						{% if day.sleepcity.city.length > 0 %} - {% else %}{% if !loop.last %} - {% endif %} {% endif %} 
						
					{% endfor %}
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
						             </h3>

						            {% if day.description_es.length > 0 %}
						            <h4>Descripción</h4>
						            <p class="pre-text">{? day.description_es ?}</p>
						            {% endif %}

						            {% if day.lastday %}

						            {% else %}
						            <h4>Hotel en 
						            {% if day.sleepcity.city %}
						            {? day.sleepcity.city ?}
						            {% endif %}
						            </h4>
						            <p><strong>{?  day.hotel.name  ?} {% if day.hotel.category == "unclassified *" %}{% else %}{? day.hotel.category ?}{% endif %} </strong> 
						            {% if day.hotel.incity %}<em>(en la ciudad)</em>{% endif %}
						            {% if day.hotel.insurroundings %}<em>(alrededores)</em>{% endif %}
						            </p>
						            {% endif %}
						            {% if day.hotel.breakfast || day.hotel.lunch || day.hotel.dinner %}
						            <h4>Régimen Alimenticio</h4>
					{# {% if day.hotel.meals %} #}
									<p>
						            	{% if day.hotel.breakfast %}
						            		<span>Desayuno{% if day.hotel.lunch or day.hotel.dinner %} - {% endif %}</span>
						            	{% endif %}
						            	
						            	{% if day.hotel.lunch %}
						            		<span>Comida{% if day.hotel.lunchdrinks %}<em> (bebidas incluídas)</em>{% endif %} {% if day.hotel.dinner %} - {% endif %}</span>
						            	{% endif %}
						            	
						            	{% if day.hotel.dinner %}
						            		<span>Cena{% if day.hotel.dinnerdrinks %}<em> (bebidas incluídas)</em>{% endif %}</span>
						            	{% endif %}
						            </p>
						            {% endif %}
					{# {% endif %} #}
					{# {% if day.hotel.meals == false %}<p><span class="help-block">No se incluyen comidas</span></p>{% endif %} #}						
										
										{% if day.activities.length > 0 %}
						            <h4>Actividades</h4>
						            <ul class="list-activities">
						                {% for activity in day.activities %}
						                <li><strong>{? activity.title_es ?}</strong>
							                 {% if activity.ticketsincluded %}
							                 	<span> - tickets incluidos</span>
							                 {% endif %}

							                 {% if activity.group %}
							                 	<span> - en grupo</span>
							                 {% endif %}
							                 
							                 {% if activity.localguide %}
							                 	<span>- Guía Local </span>
											{% if activity.language.spanish %}
											en español
											{% else %}
												{% if activity.language.english %}
												en inglés
												{% else %}
													{% if activity.language.french %}
														en francés
													{% else %}
														{% if activity.language.german %}
															en alemán
														{% else %}
															{% if activity.language.italian %}
																en italiano
															{% else %}
																{% if activity.language.portuguese %}
																	en portugués
																{% endif %}
															{% endif %}
														{% endif %}
													{% endif %}
												{% endif %}
											{% endif %}
										{% endif %}		                
						                 </li>
						                 {% endfor %}
						            </ul>
						            {% endif %}
						        </div>
						    </div>
						    <hr/>
						    {% endfor %}
							<section class="incl-or-not">
							    <h2 class="thin">Incluido / No incluido</h2>
							    <div class="row">
                    {% include "../programs/included.html.swig" %}
                    {% include "../programs/notincluded.html.swig" %}
                    {% include "../programs/domestic-flights.html.swig" %}
                    {% include "../programs/important-notes.html.swig" %}
                  </div>
							</section>
							<hr />
							<section class="price-total padded-b">
							  <div class="row">
								<div class="col-md-5 text-center">

								    {# resumen de la oferta #}
									<p class="mb-b"><em>{? paxs ?} pasajeros</em></p>

                  {#distribucion#}
                  {% include "../programs/admin-program-preview-tailormade-callaction-distribution-detail.html.swig" %}


                  {# total #}
                  <br/>
			                        <strong>PVP TOTAL: {? quote.pvpAffiliate.value | removeDecimal ?}</strong> <span class="bold">{? quote.pvpAffiliate.currency.symbol ?}</span>


			                         <!-- desglose si no tiene el pvp calculado -->
			                         {% if quote.pvpAffiliate != null && quote.pvpAffiliate != null && quote.pvpAffiliate.value > 0 %}
			                       		 {% if quote.pvpAffiliate.currency.value == 'EUR' %}
										<a  ng-init="priceDetail = { fee :  {? quote.fees.tailormade ?}, feeunit: '%', price: { net: {? quote.amount.exchange.value ?}, pvp: {? quote.pvpAffiliate.exchange.value ?}, currency: { symbol: '€'}}}" ng-href="#desglose" popover-placement="bottom" class="block" popover-template="'/partials/yto/widgets/yto-price-detail.html.swig'" popover-trigger="focus">Desglose AAVV</a>
										{% else %}
										<a  ng-init="priceDetail = { fee :  {? quote.fees.tailormade ?}, feeunit: '%', price: { net: {? quote.amount.exchange.value ?}, pvp: {? quote.pvpAffiliate.exchange.value ?}, currency: { symbol: 'USD'}}}" ng-href="#desglose" popover-placement="bottom" class="block" popover-template="'/partials/yto/widgets/yto-price-detail.html.swig'" popover-trigger="focus">Desglose AAVV</a>
										{% endif %}
		
									{% else %}									
								        <a ng-init="priceDetail = getMinPrice({net : quote.amount.exchange.value, currency:  quote.amount.exchange.currency })" class="block" ng-href="#desglose"  popover-placement="bottom" uib-popover-template="'/partials/yto/widgets/yto-price-detail.html.swig'" popover-trigger="focus">Desglose AAVV</a>        
								    {% endif %}
        	                       

									<h2 class="mt-zero mb-b"><strong class="text-red ng-binding"></strong></h2>



									<em class="text-red text-xs">Válido hasta 
										{? quote.quoteValidUntil.day ?} 
										{? quote.quoteValidUntil.monthname_es ?} 
										{? quote.quoteValidUntil.year ?}
									</em>
								</div>
								<div class="col-md-7 text-center">
								{% if quote.status != 'win'%}
								  <a href="{? brand.path ?}/booking/{? product.slug_es ?}/?datein={? quote.operationStart.day ?}-{% if quote.operationStart.month + 1 < 10 %}0{? quote.operationStart.month + 1 ?}{% else %}{? quote.operationStart.month+1 ?}{% endif %}-{? quote.operationStart.year ?}&quote={? quote.code ?}" target="_self" class="btn btn-lg btn-danger mt-xxl">Reservar</a>
								{% else %}
									<a href="#" class="btn btn-lg btn-success disabled mt-xxl">Reservada</a>
								{% endif %}
								<p class="text-center mb-zero mt-xxl">
							        <a class="mt-xl block link-download-pdf" id="generateProductPdf"  href="#" target="_self" ng-click="printTravel('{? product.slug ?}')">
							        <img class="iblock" src="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_30/v1448532039/assets/pdf-download.png"
							        data-src2x="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_60/v1448532039/assets/pdf-download.png" height="30" /> 
							        <span lass="iblock relative" style="top:3px;">Itinerario para cliente</span></a>
							    </p>
{# 							    <p class="text-center mb-zero mt-xxl">
							        <a class="mt-xl block link-download-pdf" id="generateProductPdf"  href="#" target="_self" uib-tooltip="Próximamente">
							        <img class="iblock" src="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_30/v1448532039/assets/pdf-download.png"
							        data-src2x="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_60/v1448532039/assets/pdf-download.png" height="30" /> 
							        <span lass="iblock relative" style="top:3px;">Itinerario para cliente</span></a>
							    </p> #}
								</div>
							  </div>
							</section>
							<hr class="mb-b" />
							<footer class="dmc-profile">
							{% include "../../shared/product/seller.es.html.swig" ignore missing %}
							</footer>
						</section>
					</div>
 				</div>
				
 				{# //CALLACTION #}
				<div class="col-md-3">
				{% include "yto-quote-callaction.html.swig" %}
 				</div>
	        	</div>                 
			</section>
        </div>
        {# quote.status == 'win' || #}        
        <div class="row" ng-if="{? quote.status == 'published' || quote.status == 'draft' || quote.status == 'new' || quote.status == 'under review'  || quote.status == 'win'?}">
            <!-- init messages chat -->
            <div ng-cloak name="chat" class="col-md-9">
                <div ng-chat
                referenceobj="'{? quote._id ?}'"
                referencetype="'quote'"
                lang="'ES'"
				        fromcode="'{? session.user.code ?}'"
                tocode="'{? product.dmc.code ?}'">
                </div> 
            </div>
            <!-- end messages chat -->
        </div>
</div>
