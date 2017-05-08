<div class="not-include">
    <h4>No Incluido</h4>
    <ul class="fa-ul">
            <li><span><i class="fa-li fa fa-times-circle"></i>Vuelos internacionales</span></li>   
        {% if !product.included.arrivaltransfer %}
        	<li><span><i class="fa-li fa fa-times-circle"></i>
            Traslado de llegada</span></li>
        {% endif %}
               
        {% if !product.included.departuretransfer %}
        	<li><span><i class="fa-li fa fa-times-circle"></i>
            Traslado de salida</span></li>
        {% endif %}

        {% if !product.included.transportbetweencities.included %}
            <li><span><i class="fa-li fa fa-times-circle"></i>
            Transporte entre ciudades
            </span></li>
        {% endif %}              
        
        {% if !product.included.taxesinthecountry %}
            <li><span><i class="fa-li fa fa-times-circle"></i>
            Impuestos del país </span></li>
        {% endif %}
        
        {% if !product.included.airporttaxes %}
            {% if product.included.transportbetweencities.domesticflight %}
            <li><span><i class="fa-li fa fa-times-circle"></i>
            Tasas de aeropuerto </span></li>
            {% endif %}
        {% endif %}
       
        {% if !hasDrinks %}
            <li><span><i class="fa-li fa fa-times-circle"></i>
            Bebidas
            </span></li>
        {% endif %}

        {% if !product.included.tips %}
            <li><span><i class="fa-li fa fa-times-circle"></i>
            Propinas </span></li>
        {% endif %}
       
        {% if !product.included.baggagehandlingfees %}
            <li><span><i class="fa-li fa fa-times-circle"></i>
            Maleteros </span></li>
        {% endif %}
      <li><span><i class="fa-li fa fa-times-circle"></i>Seguros</span></li>
      <li><span><i class="fa-li fa fa-times-circle"></i>Visados, si fueran necesarios.</span></li>
      <li><span><i class="fa-li fa fa-times-circle"></i>Las entradas que no estén expresamente mencionadas en el itinerario dia a dia, no están incluidas.</span></li>
    </ul>
</div>