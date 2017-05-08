	{% for day in product.itinerary %}
	<div class="row day-item">
		{% if loop.first %}
	    		<hr class="col-xs-12" />
	    	{% endif %}
	    <div class="pdf-day-thumb">
	        <span class="label label-day"><i class="fa fa-calendar-o"></i> DÍA {? day.daynumber ?}</span>
	        {% if day.image.url != 'http://res.cloudinary.com/open-market-travel/image/upload/v1426854292/assets/omtempty.png' %}
	        <img class="img-responsive" src='{? getUrlCloudinary(day.image.url, "itinerarydaythumb") ?}' data-src2x='{? getUrlCloudinary(day.image.url, "itinerarydaythumbretina") ?}' alt="DÍA {? day.daynumber ?}" title="DÍA {? day.daynumber ?}">
			{% endif %}
	    </div>
	    <div class="pdf-day-desc">
	        <h2 class="day-tit">
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
	         </h2>



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
	        <p><strong>{?  day.hotel.name  ?} {% if day.hotel.category == "unclassified *" %}{% else %}{? day.hotel.category ?}{% endif %} </strong> 
	        {% if day.hotel.incity %}<em>(en la ciudad)</em>{% endif %}
	        {% if day.hotel.insurroundings %}<em>(alrededores)</em>{% endif %}
	        </p>
	        {% endif %}

	        {% if day.hotel.breakfast or day.hotel.lunch or day.hotel.dinner %}
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
	    <hr class="col-xs-12" />
	</div>
	{% endfor %}
