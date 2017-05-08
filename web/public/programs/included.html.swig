<div class="include">
    <h4>Incluido</h4>
    <ul class="fa-ul">
        
        {% if product.included.arrivaltransfer %}
        	<li><span><i class="fa-li fa fa-check-circle"></i>
        	Traslado de llegada 
	        {% if product.included.arrivalassistance %}
	        	<span>con asistencia

		{% set arass = product.included.arrivallanguage %}
        		{% if arass.spanish or arass.english or arass.french or arass.german or arass.italian or arass.portuguese  %}
        		en: 
        		{% endif %}

        		{% for lang in product.included.arrivallanguage %}
			{% if lang %}
				
				{% if loop.key == "spanish" %}
				español<span class="comma">,</span>
				{% endif %}

				{% if loop.key == "english" %}
				inglés<span class="comma">,</span>
				{% endif %}


				{% if loop.key == "french" %}
				francés<span class="comma">,</span>
				{% endif %}


				{% if loop.key == "german" %}
				alemán<span class="comma">,</span>
				{% endif %}


				{% if loop.key == "italian" %}
				italiano<span class="comma">,</span>
				{% endif %}


				{% if loop.key == "portuguese" %}
				portugués<span class="comma">,</span>
				{% endif %}

			{% endif %}
        		{% endfor %}

	        	</span>
	        {% endif %}
        	</span></li>
        {% endif %}
        
        {% if product.included.departuretransfer %}
        	<li><span><i class="fa-li fa fa-check-circle"></i>
        	Traslado de salida 
	        {% if product.included.departureassistance %}
	        	<span>con asistencia

		{% set deass = product.included.departurelanguage %}
        		{% if deass.spanish or deass.english or deass.french or deass.german or deass.italian or deass.portuguese  %}
        		en: 
        		{% endif %}

        		{% for lang in product.included.arrivallanguage %}
			{% if lang %}
				{% if loop.key == "spanish" %}
				español<span class="comma">,</span>
				{% endif %}

				{% if loop.key == "english" %}
				inglés<span class="comma">,</span>
				{% endif %}


				{% if loop.key == "french" %}
				francés<span class="comma">,</span>
				{% endif %}


				{% if loop.key == "german" %}
				alemán<span class="comma">,</span>
				{% endif %}


				{% if loop.key == "italian" %}
				italiano<span class="comma">,</span>
				{% endif %}


				{% if loop.key == "portuguese" %}
				portugués<span class="comma">,</span>
				{% endif %}

			{% endif %}
        		{% endfor %}
        		
	        	</span>
	        {% endif %}
        	</span></li>
        {% endif %}
       
       
        {% if product.included.transportbetweencities.included %}
        	<li><span><i class="fa-li fa fa-check-circle"></i>
	Transporte entre ciudades:
	{% if product.included.transportbetweencities.bus %}
	autobús<span class="comma">,</span>
	{% endif %}

	{% if product.included.transportbetweencities.domesticflight %}
	vuelo doméstico<span class="comma">,</span>
	{% endif %}

	{% if product.included.transportbetweencities.train %}
	tren<span class="comma">,</span>
	{% endif %}

	{% if product.included.transportbetweencities.boat %}
	barco<span class="comma">,</span>
	{% endif %}

	{% if product.included.transportbetweencities.van %}
	minivan<span class="comma">,</span>
	{% endif %}

	{% if product.included.transportbetweencities.truck %}
	camión<span class="comma">,</span>
	{% endif %}

	{% if product.included.transportbetweencities.privatecarwithdriver %}
	coche privado con conductor<span class="comma">,</span>
	{% endif %}

	{% if product.included.transportbetweencities.privatecarwithdriverandguide %}
	coche privado con conductor y guía<span class="comma">,</span>
	{% endif %}

	{% if product.included.transportbetweencities.fourxfour %}
	4x4<span class="comma">,</span>
	{% endif %}

	{% if product.included.transportbetweencities.other %}
	{? product.included.transportbetweencities.otherdescription ?}<span class="comma">,</span>
	{% endif %}

	</span></li>
        {% endif %}

   	{% if product.included.tourescort.included %}
        	<li><span><i class="fa-li fa fa-check-circle"></i>
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
        </span></li>
        {% endif %}


        {% if product.included.driveguide.included && !product.included.tourescort.included %}
        	<li><span><i class="fa-li fa fa-check-circle"></i>
        	{% set driveindex = product.included.driveguide.language %}
				{% if driveindex.spanish %}
					Conductor-Guía en español
				{% else %}
					{% if driveindex.english %}
					Conductor-Guía en inglés
					{% else %}
						{% if driveindex.french %}
								Conductor-Guía en francés
							{% else %}
								{% if driveindex.german %}
									Conductor-Guía en alemán
								{% else %}
									{% if driveindex.italian %}
										Conductor-Guía en italiano
									{% else %}
										{% if driveindex.portuguese %}
											Conductor-Guía en portugués
										{% endif %}	
									{% endif %}
								{% endif %}
						{% endif %}
					{% endif %}
				{% endif %}
        </span></li>
        {% endif %}        

      <li><span><i class="fa-li fa fa-check-circle"></i>
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
	</span></li>

		{# ONLY SHOWING WHEN NOT INCLUDED #}
        

        {% if product.included.airporttaxes %}
        	<li><span><i class="fa-li fa fa-check-circle"></i>
        	Tasas aeropuerto </span></li>
        {% endif %}
        
        {% if product.included.tips %}
        	<li><span><i class="fa-li fa fa-check-circle"></i>
        	Propinas </span></li>
        {% endif %}

        {% if hasDrinks %}
            <li><span><i class="fa-li fa fa-check-circle"></i>
            Bebidas
            </span></li>
        {% endif %}        
        
        {% if product.included.baggagehandlingfees %}
        	<li><span><i class="fa-li fa fa-check-circle"></i>
        	Maleteros </span></li>
        {% endif %}

        <li><span>
        	<i class="fa-li fa fa-check-circle"></i>
        	Hoteles, Régimen Alimenticio, Visitas y guías según se especifique o no, en el itinerario
        </span></li>
    </ul>
    <p class="help-block mt-xl">
        {%- if product.included.trip.grouptrip -%}
        	Este es un Programa Regular
        {%- else -%}
        	Programa Independiente (Algunos servicios incluidos pueden ser compartidos)
        {%- endif -%}
    </p>
</div>