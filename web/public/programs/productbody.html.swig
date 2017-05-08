<div class="product-detail" itemscope itemtype="http://data-vocabulary.org/Product">
	<section class="product-head">
		<header>
			<pre class="hidden" itemprop="identifier" content="{? product.code ?}">{? product.code ?}</pre>

		    <div class="summary">
		    <h1 class="pt-l" itemprop="name">
		    {? product.title_es ?}
		    {% if related %}
				<div class="btn-group visible-xs-inline-block" uib-dropdown is-open="single-button-xs.isopen">
					<button id="single-button-xs" type="button" class="btn btn-xs btn-link" uib-dropdown-toggle ng-disabled="disabled">
						{% for rel in related %}
						{% if rel.slug_es == product.slug_es %}
						Categoría {? rel.categoryname.label_es?}
						{% endif %}
						{% endfor %}
						<span class="caret"></span>
					</button>
						<ul class="dropdown-menu" uib-dropdown-menu role="menu" aria-labelledby="single-button-xs">
						{% for rel in related %}
							{% if rel.slug_es != product.slug_es %}
							<li role="menuitem">
							  <a target="_self" href="/viaje/{?rel.slug_es?}#category">Categoría {? rel.categoryname.label_es ?}</a>
							</li>
							{% endif %}
						{% endfor %}
					</ul>
				</div>
			{%- endif -%}
		    </h1>

				{% include "related-links-title.html.swig" %}

		        <h3>
					<i class="fa fa-globe pull-left mr-four pt-xs"></i>
					<strong class="lh-normal">
						{%- for city in cities -%}
						{? city ?}{%- if not loop.last -%}, {%- endif -%}
						{%- endfor -%}
					</strong>
		        </h3>
		        <ul class="list-inline">
		            <li>
		            	<span class="iblock">
		            		<i class="fa fa-clock-o "></i>
		            	</span>
		                {% if product.itinerary.length == 1 %}
		                	1 día
		                {% else %}
		                	{?  product.itinerary.length ?} días
		                {% endif %}
{#		                	&nbsp;
 		                	<span class="iblock">
		                		<i class="fa fa-flag "></i>
		                	</span>
					{% set tour = product.included.tourescort %}
				    {% set driver = product.included.driveguide %}
				     	   
				      {% if tour.included or driver.included %}
				      	{% if tour.included%}
						    {% if tour.language.spanish %}
						    	Guía en español
						    {% elseif tour.language.english %}
						     	Guía en inglés
						    {% elseif tour.language.french %}
						     	Guía en francés
						    {% elseif tour.language.german %}
						     	Guía en alemán
						    {% elseif tour.language.italian %}
						     	Guía en italiano
						    {% elseif tour.language.portuguese %}
						     	Guía en portugués
						    {% else %}
						     	Con guía
						    {% endif %}
						{% else %}
							{% if driver.language.spanish %}
						    	Conductor-guía en español
						    {% elseif driver.language.english %}
						     	Conductor-guía en inglés
						    {% elseif driver.language.french %}
						     	Conductor-guía en Francés
						    {% elseif driver.language.german %}
						     	Conductor-guía en alemán
						    {% elseif driver.language.italian %}
						     	Conductor-guía en italiano
						    {% elseif driver.language.portuguese %}
						     	Conductor-guía en portugués
						    {% else %}
						     	Con conductor-guía
						    {% endif %}
						{% endif %}
				      {% else %}
				      	Sin guía
				      {% endif %} #}


		            </li>
		            {% if product.tags.length > 0 %}
		            <li>
		                <i class="fa fa-tags pull-left mr-four  pt-xs"></i>
		                <span>
			                {% for tag in product.tags %}
			                	{% if tag.state == 'published'%}
			                	<span itemprop="category">{? tag.label ?}</span>{% if not loop.last %}, {% endif %}
			                	{% endif %}
			                {% endfor %}
			    		</span>
		            </li>
		            {% endif %}

		            {% if meals.breakfast > 0  || meals.lunch > 0 || meals.dinner > 0%}
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
		            <li>
		            <i class="fa fa-bed pull-left mr-four pt-xs"></i>
		            {? hotels ?}
		            </li>
		        </ul>

		    </div>
		</header>
		<img src='{? getUrlCloudinary(product.productimage.url, "mainproductimage") ?}' 
         data-src2x='{? getUrlCloudinary(product.productimage.url, "mainproductimageretina") ?}' 
         class="img-responsive" alt="{? product.title_es ?}" title="{? product.title_es ?}" itemprop="image" />
	</section>


	<section class="main-description row">
	    <h2 class="thin col-md-8 hidden-xs hidden-sm">Descripción del viaje</h2>
	    <div class="addthis_sharing_toolbox col-md-4 mt-xxl text-right"></div>
	    <h2 class="visible-xs col-md-8 thin">Descripción</h2>
	    <p class="col-md-12 mt-xl pre-text" itemprop="description">{? product.description_es ?}</p>
	</section>
	<section class="product-map hidden-xs" ng-show="havemap">
		<h2 class="thin padded-b mb-xl">Recorrido</h2>
		<div class="hidden-xs" id="map"></div>
		{% if markers %}
			<ul class="location list-unstyled" ng-show="locationshow">
				{% for marker in markers %}
				<li class="h-geo geo">
					<h6>{? marker.city ?}, {? marker.country ?} - {? marker.nights ?} noches</h6>
		  		Latitude: <span class="text-xs p-latitude latitude">{? marker.position.lat ?}</span>, longitude: <span class="text-xs p-longitude longitude">{? marker.position.lng ?}</span>
			</li>
			{% endfor %}
		</ul>
			<p class="full-width bg-light text-gray-light-base padded-l">El mapa no indica la ubicación del alojamiento</p>
		{% endif %}
	</section>

	<!-- SECTION MOBILE CTA -->

    {% include "movile-callaction.html.swig" %}


  <section class="itinerary">
		<h2 class="thin">Itinerario </h2>

	    {% for day in product.itinerary %}
	    <div class="row day-item">
			{% if loop.first %}
		    		<hr class="col-md-12" />
		    	{% endif %}
	        <div class="day-thumb">
	        	<!-- https://github.com/jdpedrie/angularjs-ordinal-filter -->
	            <span class="label label-day"><i class="fa fa-calendar-o"></i> DÍA {? day.daynumber ?}</span>
	            {% if day.image.url != 'http://res.cloudinary.com/open-market-travel/image/upload/v1426854292/assets/omtempty.png' %}
	            <img class="img-responsive" src='{? getUrlCloudinary(day.image.url, "itinerarydaythumb") ?}' 
                   data-src2x='{? getUrlCloudinary(day.image.url, "itinerarydaythumbretina") ?}' alt="DÍA {? day.daynumber ?}" title="DÍA {? day.daynumber ?}" />
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



	            {% if day.description_es.length > 0%}
	            <h4>Descripción</h4>
	            <p class="pre-text">{? day.description_es ?}</p>
	            {% endif %}

	            {% if day.lastday %}

	            {% else %}
				
	            {# title hotel en in case there's sleepcity #}
	            <h4>Hotel en 
		            {% if !product.itinerary.lastday %}
			            {% if day.sleepcity.city.length > 0 %}
			            	{% if day.sleepcity.city_es != null %}
			            		{? day.sleepcity.city_es ?} 
			            	{% else %}
								{? day.sleepcity.city ?}
			            	{% endif %}
			            {% endif %}
		            {% endif %}	            	
	            </h4>
	            <p><strong>{? day.hotel.name ?} {% if day.hotel.category == "unclassified *" %}{% else %}{? day.hotel.category ?}{% endif %} </strong> 
	            {% if day.hotel.incity %}<em>(en la ciudad)</em>{% endif %}
	            {% if day.hotel.insurroundings %}<em>(alrededores)</em>{% endif %}
	            </p>
	            {% endif %}

	            {% if day.hotel.breakfast || day.hotel.lunch || day.hotel.dinner %}
	            	<h4>Régimen Alimenticio</h4>
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
	        <hr class="col-md-12" />
	    </div>
	    {% endfor %}
		<section class="incl-or-not">
		    <h2 class="thin">Incluido / No incluido</h2>
		    <div class="row">

		    	{% include "included.html.swig" %}
		    	{% include "notincluded.html.swig" %}
				{% include "domestic-flights.html.swig" %}

				{% include "important-notes.html.swig" %}

		    </div>
		</section>
      {% include "bottom-callaction.html.swig" %}
    {% if !isWhiteLabel %}
    <hr class="mb-b" />
		<footer class="dmc-profile">
		    {% include "../widgets/seller.es.html.swig" ignore missing %}
		</footer>
		{% endif %}
	</section>
</div>