<div class="price padded-l text-gray">
    <p>
      <span>PVP por Persona</span>
      <br />
      <span>
        {% if quote.rooms.single.quantity > 0 %}
        <span >
          {? quote.rooms.single.quantity ?} pax en Individual x
          <strong>{? quote.rooms.single.pvpAffiliatePerPax.value ?} {? quote.rooms.single.pvpAffiliatePerPax.currency.symbol ?}</strong><br />
        </span>
        {% endif %}
        {% if quote.rooms.double.quantity > 0 %}
        <span >
          {? quote.rooms.double.quantity * 2 ?} pax en Doble x
          <strong>{? quote.rooms.double.pvpAffiliatePerPax.value  ?} {? quote.rooms.double.pvpAffiliatePerPax.currency.symbol ?}</strong><br />
        </span>
        {% endif %}
        {% if quote.rooms.triple.quantity > 0 %}
        <span>
          {? quote.rooms.triple.quantity * 3 ?} pax en Triple x
          <strong>{? quote.rooms.triple.pvpAffiliatePerPax.value  ?} {? quote.rooms.triple.pvpAffiliatePerPax.currency.symbol ?}</strong><br />
        </span>
        {% endif %}
        {% if quote.rooms.quad.quantity > 0 %}
        <span>
          {? quote.rooms.quad.quantity * 4 ?} pax en Cuadruple x
          <strong>{? quote.rooms.quad.pvpAffiliatePerPax.value  ?} {? quote.rooms.quad.pvpAffiliatePerPax.currency.symbol ?}</strong><br />
        </span>
        {% endif %}
        {% if quote.children != null && quote.children.length > 0 %}
        <span ng-if="" ng-repeat="child in quote.children">
          Menor ( {? child.age ?} años) :  {? child.quantity ?} x <strong>{? child.pvpAffiliatePerPax.value ?} {? child.pvpAffiliatePerPax.currency.symbol ?}</strong><br />
        </span>
        {% endif %}
      </span>

      <!-- resumen para booking de tailormade (afiliado)-->
      <!--<span>
          {# individual con ninios #}
          {% if quote.rooms.single.quantity > 0 && quote.children && quote.children.length > 0 %}
            <span>{? quote.rooms.single.quantity ?} pax en Individual x <strong>{? quote.rooms.single.pvpAffiliatePerPax.exchange.value | removeDecimal ?} {? quote.rooms.single.pvpAffiliatePerPax.exchange.currency.symbol ?}</strong><br>
            </span>

          {# individual sin ninios #}
          {% elseif quote.rooms.single.quantity > 0 %}
            <span>{? quote.rooms.single.quantity ?} pax en Individual x <strong>{? quote.rooms.single.pvpAffiliatePerPax.exchange.value | removeDecimal ?} {? quote.rooms.single.pvpAffiliatePerPax.exchange.currency.symbol ?}</strong><br>
            </span>
          {% endif %} 

          {# doble con ninios #}
          {% if quote.rooms.double.quantity > 0 && quote.children && quote.children.length > 0 %}
            <span>{? quote.rooms.double.quantity * 2 ?} pax en Doble x <strong>{? quote.rooms.double.pvpAffiliatePerPax.exchange.value | removeDecimal ?} {? quote.rooms.double.pvpAffiliatePerPax.exchange.currency.symbol ?}</strong><br>
            </span>

          {# doble sin ninios #}
          {% elseif quote.rooms.double.quantity > 0 %}
            <span>{? quote.rooms.double.quantity * 2 ?} pax en Doble x <strong>{? quote.rooms.double.pvpAffiliatePerPax.exchange.value | removeDecimal ?} {? quote.rooms.double.pvpAffiliatePerPax.exchange.currency.symbol ?}</strong><br>
            </span>
          {% endif %} 
         
          {# triple con ninios #}
          {% if quote.rooms.triple.quantity > 0 && quote.children && quote.children.length > 0 %}
            <span>3 pax en Triple x <strong>{? quote.rooms.triple.pvpAffiliatePerPax.exchange.value | removeDecimal ?} {? quote.rooms.triple.pvpAffiliatePerPax.exchange.currency.symbol ?}</strong><br></span>

          {# triple sin ninios #}
          {% elseif quote.rooms.triple.quantity > 0 %}
            <span>{? quote.rooms.triple.quantity * 3 ?} pax en Triple x <strong>{? quote.rooms.triple.pvpAffiliatePerPax.exchange.value | removeDecimal ?} {? quote.rooms.triple.pvpAffiliatePerPax.exchange.currency.symbol ?}</strong><br></span>            
          {% endif %} 

          {# quad con ninios #}
          {% if quote.rooms.quad.quantity > 0  && quote.children && quote.children.length > 0 %}
            <span>4 pax en Cuádruple x <strong>{? quote.rooms.quad.pvpAffiliatePerPax.exchange.value | removeDecimal ?} {? quote.rooms.quad.pvpAffiliatePerPax.exchange.currency.symbol ?}</strong><br></span>

          {# quad sin ninios #}
          {% elseif  quote.rooms.quad.quantity > 0%}
            <span>{? quote.rooms.quad.quantity * 4 ?} pax en Cuádruple x <strong>{? quote.rooms.quad.pvpAffiliatePerPax.exchange.value | removeDecimal ?} {? quote.rooms.quad.pvpAffiliatePerPax.exchange.currency.symbol ?}</strong><br></span>
          {% endif %} 
         
          
          {# ninios #}
          {% if quote.children && quote.children.length > 0 %}
            {% for child in quote.children %}
              <span> Menor ( {? child.age ?} años) :  {? child.quantity ?} x <strong>{? child.pvpAffiliatePerPax.exchange.value | removeDecimal ?} {? child.pvpAffiliatePerPax.exchange.currency.symbol ?}</strong><br/></span>
            {% endfor %}          
          {% endif %} 


      </span>-->
    </p>    
  </div>