<form id="detailbookingpayment" ng-hide="booking.status == 'cancelled'" class="" name="detailbookingpayment" novalidate>
	<div class="row">
		<div class="col-md-8">
		<h4 ng-hide="bookingIsWhiteLabel">Neto a abonar yourttoo.com</h4>
		<table class="table booking-detail" >
			<thead>
			<tr>
				<td class="middle">
					Total Pagado
				</td>
				<td class="middle">
					{{booking.breakdown.charges.current| number:2}} {{booking.pricing.currency.symbol}}
				</td>
				<td class="middle">
					100%
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
						<span ng-if="!pay.receiptNumber">Pendiente
							<span ng-if="$index==0">primer</span>
							<span ng-if="$index==1">segundo</span>
						pago</span>
						<span ng-if="pay.receiptnumber">Pagado</span>
					</td>
					<td class="middle">
						<!--{{pay.amount.exchange.value | number}}{{pay.amount.exchange.currency.symbol}}-->
						{{ pay.amount  | number:2 }}{{pay.pricing.currency.symbol}}
					</td>
					<td class="middle">
						{{pay.payment| number:2 }}%
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
			<a class="btn btn-success" ng-if="booking.invoiceAffiliate && booking.invoiceAffiliateFile" target="_blank" ng-href="{{ booking.invoiceAffiliateFile }}">descargar factura</a>
			<!-- generar factura proforma creada -->
			<a class="btn btn-success" ng-if="!booking.invoiceAffiliate && !booking.invoiceAffiliateFile" ng-click="downloadAffiliateProforma()">descargar factura proforma</a>
			<!-- factura proforma ya creada -->
			<a class="btn btn-success" ng-if="!booking.invoiceAffiliate && booking.invoiceAffiliateFile" target="_blank" ng-href="{{ booking.invoiceAffiliateFile }}">descargar factura proforma</a>
			
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
			<div class="well pb-b" ng-hide="bookingIsWhiteLabel">
				<h5 class="mt-zero bold">Datos para transferencia</h5>
				<p>Por favor indica el número de localizador de  yourttoo en <strong>"Concepto"</strong> para que podamos identificarla</p>
				<ul class="list-unstyled">
					{% include "yto-bank-info.html" %}
				</ul>
			</div>
		</div>
	</div>

</form>