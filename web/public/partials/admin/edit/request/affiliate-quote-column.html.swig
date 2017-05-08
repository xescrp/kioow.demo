<div class="well bg-light padded-zero" ng-class="{'request-discard' : quote.status == 'discard'}">
	<span class="request-offer-num">{{$index+1}}</span>
	<div class="request-offer-title">
		<h4 class="text-alternate text-center mt-b mb-b pl-l pr-l">
      {{ quote.products.title_es || quote.products.title || quote.title_es }}
    </h4>
		<p class="text-center text-gray mb-b">
			<i class="fa fa-calendar"></i>
      {{ transformToDate(quote.operationStart) | date : 'dd-MM-yyyy' }}
			&nbsp;
			<i class="fa fa-clock-o"></i>&nbsp;{{ quote.products.itinerary.length }} días
		</p>
     
	</div>
	<div class="request-offer-price-detail text-center">
	  <p class="mb-b"><em>{{quote.paxs}} pasajeros</em></p>
    <div class="price padded-l text-gray">
        <p>
          <span>PVP por Persona</span>
          <br /> 

          <!-- resumen para booking de tailormade (afiliado)-->
          <span>    
              <!-- individual con ninios -->
              <span ng-show="quote.rooms.single.quantity > 0 && quote.children && quote.children.length > 0">
                {{quote.rooms.single.quantity}} pax en Individual x <strong>
                  {{quote.rooms.single.pvpAffiliatePerPax.value | number : 0}} {{quote.rooms.single.pvpAffiliatePerPax.currency.symbol}}</strong>
                <br />
              </span>
              <!-- individual sin ninios -->
              <span ng-show="quote.rooms.single.quantity > 0 && (!quote.children || quote.children.length == 0)">
                {{quote.rooms.single.quantity }} pax en Individual x <strong>
                  {{quote.rooms.single.pvpAffiliatePerPax.value | number : 0}} {{quote.rooms.single.pvpAffiliatePerPax.currency.symbol}}</strong>
                <br />
              </span>
              <!-- doble con ninios -->
              <span ng-show="quote.rooms.double.quantity > 0 && quote.children && quote.children.length > 0">
                {{quote.rooms.double.quantity * 2}} pax en Doble x <strong>
                  {{quote.rooms.double.pvpAffiliatePerPax.value | number : 0}} {{quote.rooms.double.pvpAffiliatePerPax.currency.symbol}}</strong>
                <br />
              </span>
              <!-- doble sin ninios -->
              <span ng-show="quote.rooms.double.quantity > 0 && (!quote.children || quote.children.length == 0)">
                {{quote.rooms.double.quantity * 2}} pax en Doble x <strong>
                  {{quote.rooms.double.pvpAffiliatePerPax.value | number : 0}} {{quote.rooms.double.pvpAffiliatePerPax.currency.symbol}}</strong>
                <br/>
              </span>
              <!-- triple con ninios -->
              <span ng-show="quote.rooms.triple.quantity > 0 && quote.children && quote.children.length > 0">
                {{quote.rooms.triple.quantity * 3}} pax en Triple x <strong>
                  {{quote.rooms.triple.pvpAffiliatePerPax.value | number : 0}} {{quote.rooms.triple.pvpAffiliatePerPax.currency.symbol}}</strong>
                <br />
              </span>
              <!-- triple sin ninios -->
              <span ng-show="quote.rooms.triple.quantity > 0 && (!quote.children || quote.children.length == 0)">
                {{quote.rooms.triple.quantity * 3}} pax en Triple x <strong>
                  {{quote.rooms.triple.pvpAffiliatePerPax.value | number : 0}} {{quote.rooms.triple.pvpAffiliatePerPax.currency.symbol}}</strong>
                <br />
            </span>
              <!-- quad con ninios -->
            
              <span ng-show="quote.rooms.quad.quantity > 0  && quote.children && quote.children.length > 0">
                {{quote.rooms.quad.quantity * 4}} pax en Cuádruple x <strong>
                  {{quote.rooms.quad.pvpAffiliatePerPax.value | number : 0}} {{quote.rooms.quad.pvpAffiliatePerPax.currency.symbol}}</strong>
                <br />
              </span>
              <!-- quad sin ninios -->
              <span ng-show="quote.rooms.quad.quantity > 0  && (!quote.children || quote.children.length == 0)">
                {{quote.rooms.quad.quantity * 4}} pax en Cuádruple x <strong>
                  {{quote.rooms.quad.pvpAffiliatePerPax.value  | number : 0}} {{quote.rooms.quad.pvpAffiliatePerPax.currency.symbol}}</strong>
                <br />
              </span>
              <!-- ninios -->
              <span ng-show="quote.children && quote.children.length > 0" ng-repeat="child in quote.children"> 
                Menor ( {{child.age}} años) :  {{child.quantity}} x <strong>
                {{child.pvpAffiliatePerPax.value | number : 0}} {{child.pvpAffiliatePerPax.currency.symbol}}</strong>
                <br/>
              </span>
          </span>
        </p>    
      </div>


  	  <!--total-->
  	  <br/>
        <strong>
        	PVP TOTAL: {{quote.pvpAffiliate.value | number}}
        </strong>
        <span class="bold">
        	{{quote.pvpAffiliate.currency.symbol}}
        </span>
       
        
        <div class="relative mt-b"  ng-init="showBreakdown = false" > 
         <a ng-href="#desglose" ng-click="showBreakdown = !showBreakdown">Desglose AAVV</a>
          <div ng-show="showBreakdown"  style="top: 20px;left: 50%; margin-left: -110px;" class="bottom popover">
            <div class="arrow"></div>
            <div class="popover-inner padded-b">
                  <div ng-include="'/partials/programs/yto-price-edit-detail.html.swig?v={{appversion}}'"></div>
            </div>
          </div>
        </div>
      <br />
      
		<a ng-if="quote.status == 'published' || quote.status == 'win'" href="/quote/{{quote.code}}/?query={{userquery.code}}" target="_self" class="btn btn-lg mb-b" ng-class="{'btn-danger' : quote.status == 'published', 'btn-success' : quote.status == 'win'}">Ver Mas</a>
    <a ng-if="quote.status == 'published'" href="/booking/{{quote.products.slug_es}}?quote={{quote.code}}&query={{userquery.code}}" target="_self" class="btn btn-lg mb-b" ng-class="'btn-danger">Reservar</a>
		<a ng-if="quote.status == 'discard' || quote.status == 'lost'" href="#" target="_self" class="btn btn-lg btn-default disabled mb-b">Ver Mas</a>
		<br />
		<em ng-if="quote.status == 'published' || quote.status == 'win'" class="text-xs text-help">Válido hasta
		{{ quote.quoteValidUntil.day }}/{{ quote.quoteValidUntil.month+1 }}/{{ quote.quoteValidUntil.year }}
		</em>
		<span ng-if="quote.status == 'win'" class="h4 text-green text-xs"><br /><i class="fa fa-check-circle"></i> RESERVADA</span>
		<span ng-if="quote.status == 'discard' || quote.status == 'lost'" class="h4 text-red text-xs">DESCARTADA</span>
	</div>
	<div class="request-offer-itinerary text-left">
		<h4 class="mb-xs text-xs" ng-show="quote.hotels && quote.hotels.length > 0">Hoteles</h4>
			<div class="text-gray">{{ quote.hotels}}</div>
		<h4 class="mb-xs mt-xl text-xs" ng-show="quote.meals"> Régimen Alimenticio</h4>
		<div class="text-gray">
			<span class="nowrap">
			{{ quote.meals}}
			</span>
		</div>

			<!--resumen itinerario-->
			<h4 class="mt-xl text-xs" ng-shwo="quote.products.itinerary && quote.products.itinerary.length > 0">Itinerario</h4>
		
		<div ng-repeat="city in quote.products.itinerary" class="mb-b">
			<span class="text-danger"><strong>{{$index + 1}}.</strong></span>
			<strong>{{getItineraryDay(city)}}</strong>

			<!--excursiones-->
			<ul ng-repeat="act in city.activities" class="list-unstyled mb-zero" ng-show="city.activities && city.activities.length > 0">
				<li>
					<em>{{ act.title_es }}<span ng-show="act.ticketsincluded"> - tickets incl.</span></em>
				</li>
			</ul>
		</div>
	</div>

	<div class="request-offer-foot">	
		<a href="#" ng-if="quote.status == 'published'" ng-click="askWhyDiscard(quote)" class="pt-l block text-danger">
			<i class="fa fa-trash-o"></i>&nbsp;descartar
		</a>
		<span ng-if="quote.status == 'discard' || quote.status == 'lost'" class="h4 text-red">DESCARTADA</span>
		<span ng-if="quote.status == 'win'" class="h4 text-green"><i class="fa fa-check-circle"></i> RESERVADA</span>
	</div>
	<div class="request-offer-dmcprof">

    <footer class="dmc-profile">
      <a href="/receptivo/{{ quote.dmc.code }}/{{ quote.dmc.name }}" target="_blank">
        <img src='{{ getimage(quote.dmc.images.photo.url, "corporateselfietailor") }}' 
             data-src2x='{{ getimage(quote.dmc.images.photo.url, "corporateselfieretinatailor") }}' 
             class="img-responsive" alt="{{  quote.dmc.company.name }} photo" title="{{  quote.dmc.company.name }} photo" /> 
      </a>
      <div class="dmc-profile-widget mt-xl">
        <a href="/receptivo/{{ quote.dmc.code }}/{{ quote.dmc.name }}" target="_blank">
          <img class="img-circle avatarm42" src='{{ getimage(quote.dmc.images.logo.url, "avatarm42") }}' 
               data-src2x='{{ getimage(quote.dmc.images.logo.url, "avatarm42retina") }}' 
               title="{{  quote.dmc.company.name }} logo" alt="{{  quote.dmc.company.name  }}" />
        </a>
			<p class="dmc-text">
				  <a href="/receptivo/{{ quote.dmc.code }}/{{ quote.dmc.name }}" target="_blank">{{  quote.dmc.company.name  }}</a>
				  <br />
				  <br />
				 <!-- <span class="dmc-rating"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i></span>-->
			</p>
      </div>
      <div>
        	<p ng-if="quote.status == 'win' ||
        			  quote.status == 'published'"
        			  class="text-center mt-zero mb-zero">
          		<a class="btn btn-default btn-block" target="_self" href="/quote/{{quote.code}}/?query={{userquery.code}}#messageBox">
              <i class="fa fa-comments-o"></i>
              Enviar un mensaje</a>
      		</p>
      </div>
    </footer>
	</div>
</div>