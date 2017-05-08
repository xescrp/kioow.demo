{% for day in product.itinerary %}
	{% if day.needflights %}
		{% set showfly = true %}
	{% endif %}
{% endfor %}

{% if showfly %}
<div class="col-md-12">
     <div class="alert alert-danger mt-l mb-zero">
        <h5 class="bold mt-zero"><i class="fa fa-times-circle"></i> Este circuito no incluye los siguientes vuelos internos:</h5>
        
			{% for day in product.itinerary %}
				{% set dayindex = loop.index %}
				{% if loop.first %}<ol class="list-unstyled">{% endif %}
				{% if day.needflights %}
					{% for fly in day.flights %}
					<li><strong>Día {? dayindex ?}:</strong> &nbsp;&nbsp;{? fly.departure.label ?}&nbsp;&nbsp; <i class="fa fa-arrow-circle-right"></i> &nbsp;&nbsp;{? fly.arrival.label ?}
					 {% if fly.recommendedflight %}
						 | <em>vuelo recomendado: {? fly.recommendedflight ?}</em>
						 </li>
					 {% endif %}
					{% endfor %}
				{% endif %}	
				{% if loop.last %}</ol>{% endif %}
            {% endfor %}
            <p><em>Recuerda que también debes reservar estos vuelos por tu cuenta</em></p>
    </div>
</div>
{% endif %}