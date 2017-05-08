<div class="price padded-l text-gray">
    <p>
      <span>PVP por Persona</span>
      <br />    
      <!-- resumen para booking de tailormade (afiliado)-->
      <span>
            <span ng-if="quote.rooms.single.quantity > 0">{{ quote.rooms.single.quantity }} pax en Individual x 
              <strong>{{ quote.rooms.single.pvpAffiliatePerPax.value }} {{ quote.rooms.single.pvpAffiliatePerPax.currency.symbol }}</strong><br />
            </span>
          <span ng-if="quote.rooms.double.quantity > 0">
            {{ quote.rooms.double.quantity * 2 }} pax en Doble x
            <strong>{{ quote.rooms.double.pvpAffiliatePerPax.value  }} {{ quote.rooms.double.pvpAffiliatePerPax.currency.symbol }}</strong><br />
          </span>
          <span ng-if="quote.rooms.triple.quantity > 0">
            {{ quote.rooms.triple.quantity * 3 }} pax en Triple x
            <strong>{{ quote.rooms.triple.pvpAffiliatePerPax.value  }} {{ quote.rooms.triple.pvpAffiliatePerPax.currency.symbol }}</strong><br />
          </span>
          <span ng-if="quote.rooms.quad.quantity > 0">
            {{ quote.rooms.quad.quantity * 4 }} pax en Cuadruple x
            <strong>{{ quote.rooms.quad.pvpAffiliatePerPax.value  }} {{ quote.rooms.quad.pvpAffiliatePerPax.currency.symbol }}</strong><br />
          </span>
        <span ng-if="quote.children != null && quote.children.length > 0" ng-repeat="child in quote.children">
          Menor ( {{ child.age }} años) :  {{ child.quantity }} x <strong>{{ child.pvpAffiliatePerPax.value }} {{ child.pvpAffiliatePerPax.currency.symbol }}</strong><br />
        </span>
      </span>
    </p>    
  </div>