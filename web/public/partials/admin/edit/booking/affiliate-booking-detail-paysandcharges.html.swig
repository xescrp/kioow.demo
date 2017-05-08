<form id="detailbookingpayment" ng-show="booking.status != 'cancelled' && booking.bookingmodel != 'whitelabel'" class="" name="detailbookingpayment" novalidate>
	<div class="row">
		<div class="col-md-8">
		<h4>Neto a abonar yourttoo.com</h4>
		<div class="bg-soft">
			<table class="table">
				<tr>
					<td class="middle">Total Pagado: </td>
					<td class="middle"><strong class="padded-b">{{booking.breakdown.charges.current | number:2}} {{booking.pricing.currency.symbol}}</strong></td>
					<td class="middle">Forma de pago: </td>
					<td class="middle" ng-show="booking.paymentmodel == 'transfer-split' || booking.paymentmodel == 'tpv-split'">
            <span class="label label-success" >Pago fraccionado</span></td>
          <td class="middle" ng-show="booking.paymentmodel == 'transfer-100' || booking.paymentmodel == 'tpv-100'">
            <span class="label label-success" >Pago 100%</span>
          </td>
				</tr>
        <!-- SPLIT PAYMENT -->
        <tr ng-show="booking.paymentmodel == 'transfer-split' || booking.paymentmodel == 'tpv-split'">
          <td class="middle">1º Pago: </td>
          <td class="middle">
            <strong class="padded-b" ng-class="{ 'label-danger' : (booking.breakdown.charges.current < (booking.breakdown.agency.net * 15 /100)) }">(15 %) {{ booking.breakdown.agency.net * 15 /100 | number:2}} {{booking.pricing.currency.symbol}}</strong>
          </td>
          <td class="middle">Fecha limite 1º pago: </td>
          <td class="middle" >
            <strong>{{ firstpaydate | date:'dd/MM/yyyy' }}</strong>
          </td>
        </tr>
        <tr ng-show="booking.paymentmodel == 'transfer-split' || booking.paymentmodel == 'tpv-split'">
          <td class="middle">2º Pago: </td>
          <td class="middle">
            <strong class="padded-b" ng-class="{ 'label-danger' : booking.breakdown.charges.pending > 0 }">(85 %) {{ booking.breakdown.agency.net * 85 /100 | number:2}} {{booking.pricing.currency.symbol}}</strong>
          </td>
          <td class="middle">Fecha limite 2º pago: </td>
          <td class="middle">
            <strong>{{ booking.breakdown.charges.second.date || booking.dates.finalcharge.date | date:'dd/MM/yyyy' }}</strong>
          </td>
        </tr>
        <!-- 100% PAYMENT -->
				<tr ng-show="booking.paymentmodel == 'transfer-100' || booking.paymentmodel == 'tpv-100'">
					<td class="middle">Pendiente: </td>
					<td class="middle"><strong class="padded-b" ng-class="{ 'label-danger' : booking.breakdown.charges.pending > 0 }"> {{booking.breakdown.charges.pending | number:2}} {{booking.pricing.currency.symbol}}</strong></td>
					<td class="middle">Fecha limite pago: </td>
					<td class="middle"><strong>{{ booking.dates.finalcharge.date | date:'dd/MM/yyyy' }}</strong></td>
				</tr>
			</table>
		</div>
		<table class="table booking-detail" ng-show="booking.breakdown.charges.current > 0">
			<thead>
				<tr>
					<td class="middle">
						Transferencia
					</td>
					<td class="middle">
						Pago
					</td>
					<td class="middle">
						%
					</td>
					<td class="middle">
					</td>
					<td class="middle">
					</td>
				</tr>
			</thead>
			<tbody>
				<tr ng-repeat="pay in booking.payments" ng-if="pay.paymenttarget=='travelersense'">
					<td class="middle">
						<span>{{pay.transferid || pay.receiptnumber }}</span>
					</td>
					<td class="middle">
						{{ pay.amount  | number:2 }}{{ pay.currency.symbol}}
					</td>
					<td class="middle">
						{{pay.payment | number:2 }}%
					</td>
					<td class="middle">
						<span ng-if="!pay.receiptnumber">Fecha límite de pago:</span>
						<span ng-if="pay.receiptnumber">Fecha recepción de pago:</span>
					</td>
					<td class="middle">
						<span class="text-danger" ng-if="!pay.receiptnumber && $index==0">{{ addHoursDate(pay.date, 72)| date:'dd/MM/yyyy'}}</span>
	
						<span class="text-danger" ng-if="!pay.receiptnumber && $index==1">{{ pay.nextpaymentdate | date:'dd/MM/yyyy'}}</span>

						<span ng-if="pay.receiptnumber">{{pay.validatedate | date:'dd/MM/yyyy'}}</span>
					</td>
				</tr>	
			</tbody>
		</table>
		<h4 class="iblock">Factura</h4>
		<p class="text-center">

			<!-- factura real creada -->
			<a class="btn btn-success" ng-show="booking.invoicestravelersense != null && booking.invoicestravelersense.length > 0" target="_blank" ng-href="{{ booking.invoicestravelersense[0].file.url }}">descargar factura</a>
			<!-- generar factura proforma creada -->
			<a class="btn btn-success" ng-hide="booking.invoicestravelersense != null && booking.invoicestravelersense.length > 0" ng-click="downloadAffiliateProforma()">descargar factura proforma</a>

			<a class="ml-l" target="_blank" href="/faq/41-el-pago">Información sobre facturas</a>
		</p>
		</div>
		<div class="col-md-4">
			<div class="well pb-b">
				<h5 class="mt-zero bold">Condiciones de cancelación</h5>
				<!-- cancell multidays -->
				<p ng-bind-html="dmcproduct.dmc.membership.cancelpolicy._es" ng-show="!booking.cancelpolicy || !booking.cancelpolicy._es" class="pre-text"></p>
				<!-- cancell taylormade -->
				<p ng-bind-html="booking.cancelpolicy._es" ng-show="booking.cancelpolicy && booking.cancelpolicy._es" class="pre-text"></p>
			</div>
			<div class="well pb-b">
				<h5 class="mt-zero bold">Datos para transferencia</h5>
				<p>Por favor indica el número de localizador de  yourttoo en <strong>"Concepto"</strong> para que podamos identificarla</p>
				<ul class="list-unstyled">
					{% include "yto-bank-info.html" %}
				</ul>
			</div>
		</div>
	</div>

</form>

<form id="detailbookingpayment" ng-show="booking.status != 'cancelled' && booking.bookingmodel == 'whitelabel'" class="" name="detailbookingpayment" novalidate>
  <div class="row">
		  <div class="col-md-8">
			  <h4>Pago directo del cliente a yourttoo.com </h4>
			  <div class="bg-soft">
				  <table class="table">
					  <tr>
						  <td class="middle">Total Pagado: </td>
						  <td class="middle"><strong class="padded-b">{{booking.breakdown.charges.current | number:2 }} {{booking.pricing.currency.symbol}}</strong></td>
						  <td class="middle"></td>
						  <td class="middle"></td>
					  </tr>
					  <tr>
						  <td class="middle">Pendiente: </td>
						  <td class="middle"><strong class="padded-b" ng-class="{ 'label-danger' : booking.breakdown.charges.pending > 0 }"> {{booking.breakdown.charges.pending | number:2}} {{booking.pricing.currency.symbol}}</strong></td>
						  <td class="middle">Fecha limite pago: </td>
						  <td class="middle"><strong>{{ booking.dates.finalcharge.date | date:'dd/MM/yyyy' }}</strong></td>
					  </tr>
				  </table>
			  </div>
			  
	  </div>
	  <div class="col-md-4">
			  <div class="well pb-b">
				  <h5 class="mt-zero bold">Condiciones de cancelación</h5>
				  <!-- cancell multidays -->
				  <p ng-bind-html="dmcproduct.dmc.membership.cancelpolicy._es" ng-show="!booking.cancelpolicy || !booking.cancelpolicy._es" class="pre-text"></p>
				  <!-- cancell taylormade -->
				  <p ng-bind-html="booking.cancelpolicy._es" ng-show="booking.cancelpolicy && booking.cancelpolicy._es" class="pre-text"></p>
			  </div>
		  </div>
  </div>
</form>