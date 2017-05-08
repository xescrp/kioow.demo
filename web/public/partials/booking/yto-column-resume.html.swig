<section class="well bg-light padded-zero">
  <h2 class="thin mt-b mb-zero padded-l">Resumen</h2>
  <hr class="mb-b mt-b" />
  <div class="details result-text text-gray padded-l pb-b">
  <h4 class="text-alternate mt-zero">{{ product.title_es }}</h4>
  <h5 ng-if="product.categoryname.label_es"> Categoría: {{product.categoryname.label_es}}</h5>
  <pre class="hidden">{{product.code}}</pre>
    <div class="text-detail" ng-show="product.buildeditinerary.countriesfull_es.length > 0">
        <i class="fa fa-globe pull-left mr-four mt-xs text-gray-light-base"></i>
        <p>
        <!--<strong ng-repeat="country in product.buildeditinerary.countriesfull_es">{{ country }}<span ng-show="!$last">,</span> </strong>-->
          <strong>{{product.buildeditinerary.countriesfull_es.join(',')}}</strong>
        </p>
    </div>
    <div class="text-detail" ng-show="content.tags.length > 0">
        <i class="fa fa-tags pull-left mr-four mt-xs text-gray-light-base"></i>
        <p>
        <span ng-repeat="tag in content.tags">{{ tag.label }}<span ng-show="!$last">,</span> </span>
        </p>
    </div>
    <div class="text-detail">
        <i class="fa fa-calendar pull-left mr-four mt-xs text-gray-light-base"></i>
        <p><span>{{dateSelected | date : 'd MMMM y'}} - {{ content.days }} días</span></p>
    </div>
    <div class="text-detail">
        <i class="fa fa-male pull-left mr-four mt-xs text-gray-light-base"></i>
        <p><span>{{roompaxescount.total}} adultos</span></p>                           
    </div>
  </div>
  <div class="price padded-l text-gray">
    <p>

      <span>PVP por Persona</span>
      <br />
      <!--<span ng-show="toConfirm && dateNoMatch">
        <span>PVP a confirmar</span>
      </span>-->
      <span ng-show="newbooking == null || newbooking.pricing == null || newbooking.pricing.amount == 0">
        <strong>Selecciona una fecha con disponibilidad</strong>
      </span>
      

      <!-- resumen para booking de producto cargado (afiliado)-->
      <span >
        <span ng-show="roomcodecount.single != null && roomcodecount.single > 0 && (quote == null || quote.code == '')">
          {{roompaxescount.single}} pax en Individual x
          <strong>{{newbooking.pricing.rooms.single | number : 0}} {{newbooking.pricing.currency.symbol}}</strong>
          <br />
          </span>
        <span ng-show="roomcodecount.double != null && roomcodecount.double > 0">
          {{roompaxescount.double}} pax en Doble x
          <strong>{{newbooking.pricing.rooms.double | number : 0}} {{newbooking.pricing.currency.symbol}}</strong>
          <br />
          </span>
        <span ng-show="roomcodecount.triple != null && roomcodecount.triple > 0">
          {{roompaxescount.triple}} pax en Triple x
          <strong>{{newbooking.pricing.rooms.triple | number : 0}} {{newbooking.pricing.currency.symbol}}</strong>
          <br />
          </span>
        <span ng-show="roomcodecount.quad != null && roomcodecount.quad > 0">
          {{roompaxescount.quad}} pax en Cuadruple x
          <strong>{{newbooking.pricing.rooms.quad | number : 0}} {{newbooking.pricing.currency.symbol}}</strong>
          <br />
        </span>
        {# ninios #}
        <span ng-show="quote.children && quote.children.length > 0" ng-repeat="child in quote.children">
          Menor ( {{child.age}} años) :  {{child.quantity}} x <strong>{{child.pvpAffiliatePerPax.exchange.value | number : 0}} {{child.pvpAffiliatePerPax.exchange.currency.symbol}}</strong><br/>
        </span>
      </span>
      
     

      <!-- resumen para booking de tailormade (afiliado)-->
       <span ng-hide="quote != null && quote.code != ''">

          {# individual con ninios #}
          <span ng-show="quote.rooms.single.quantity > 0 && quote.children && quote.children.length > 0">1 pax en Individual x <strong>{{quote.rooms.single.pvpAffiliatePerPax.exchange.value | number : 0}} {{quote.rooms.single.pvpAffiliatePerPax.exchange.currency.symbol}}</strong><br></span>
          {# individual sin ninios #}
          <span ng-show="quote.rooms.single.quantity > 0 && (!quote.children || quote.children.length == 0)">{{quote.rooms.single.quantity}} pax en Individual x <strong>{{quote.rooms.single.pvpAffiliatePerPax.exchange.value | number : 0}} {{quote.rooms.single.pvpAffiliatePerPax.exchange.currency.symbol}}</strong><br></span>
          {# doble con ninios #}
          <span ng-show="quote.rooms.double.quantity > 0 && quote.children && quote.children.length > 0">2 pax en Doble x <strong>{{quote.rooms.double.pvpAffiliatePerPax.exchange.value | number : 0}} {{quote.rooms.double.pvpAffiliatePerPax.exchange.currency.symbol}}</strong><br></span>
          {# doble sin ninios #}
          <span ng-show="quote.rooms.double.quantity > 0 && (!quote.children || quote.children.length == 0)">{{quote.rooms.double.quantity * 2}} pax en Doble x <strong>{{quote.rooms.double.pvpAffiliatePerPax.exchange.value | number : 0}} {{quote.rooms.double.pvpAffiliatePerPax.exchange.currency.symbol}}</strong><br></span>
          {# triple con ninios #}
          <span ng-show="quote.rooms.triple.quantity > 0 && quote.children && quote.children.length > 0">3 pax en Triple x <strong>{{quote.rooms.triple.pvpAffiliatePerPax.exchange.value | number : 0}} {{quote.rooms.triple.pvpAffiliatePerPax.exchange.currency.symbol}}</strong><br></span>
          {# triple sin ninios #}
          <span ng-show="quote.rooms.triple.quantity > 0 && (!quote.children || quote.children.length == 0)">{{quote.rooms.triple.quantity * 3}} pax en Triple x <strong>{{quote.rooms.triple.pvpAffiliatePerPax.exchange.value | number : 0}} {{quote.rooms.triple.pvpAffiliatePerPax.exchange.currency.symbol}}</strong><br></span>
          {# quad con ninios #}
          <span ng-show="quote.rooms.quad.quantity > 0  && quote.children && quote.children.length > 0">4 pax en Cuádruple x <strong>{{quote.rooms.quad.pvpAffiliatePerPax.exchange.value | number : 0}} {{quote.rooms.quad.pvpAffiliatePerPax.exchange.currency.symbol}}</strong><br></span>
          {# quad sin ninios #}
          <span ng-show="quote.rooms.quad.quantity > 0  && (!quote.children || quote.children.length == 0)">{{quote.rooms.quad.quantity * 4}} pax en Cuádruple x <strong>{{quote.rooms.quad.pvpAffiliatePerPax.exchange.value | number : 0}} {{quote.rooms.quad.pvpAffiliatePerPax.exchange.currency.symbol}}</strong><br></span>
          {# ninios #}
          <span ng-show="quote.children && quote.children.length > 0" ng-repeat="child in quote.children"> Menor ( {{child.age}} años) :  {{child.quantity}} x <strong>{{child.pvpAffiliatePerPax.exchange.value | number : 0}} {{child.pvpAffiliatePerPax.exchange.currency.symbol}}</strong><br/></span>
      </span>
    </p>
  </div>


  {# TOTAL OR PAY NOW #}
  <div class="price-total padded-l">
    <span>Total PVP
      
    </span>
    <br />
    {# Resumen para affiliados#}
    <span ng-show="newbooking != null && newbooking.pricing != null && newbooking.pricing.amount > 0">    
        <strong>{{ newbooking.pricing.amount | number : 0}} {{newbooking.pricing.currency.symbol}}</strong>
         <br />
         {# desglose SOLO para affiliados#}     
          <a ng-href="#desglose" ng-click="togglebreakdown()">Desglose AAVV</a>
    </span>
     <span ng-show="newbooking == null || newbooking.pricing == null || newbooking.pricing.amount == 0">
      <strong>Selecciona una fecha con disponibilidad</strong>
     </span>
  </div>
  <div class="relative"> 
    <div ng-show="showbreakdown" style="left:-40px;" class="bottom popover in">
      <div class="arrow"></div>
      <div class="popover-inner padded-b">
            <div ng-include="'/partials/programs/yto-price-product-edit-detail.html.swig?v={? dateseed ?}'"></div>
      </div>
    </div>
  </div>
</section>