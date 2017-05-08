<form id="detailbookingpayment" class="" ng-show="booking.cancelDate!=null" name="detailbookingpayment" novalidate>
	<div class="row">
		<div class="col-md-8 opac-l">
			<h4>Cancelación</h4>
			<table class="table booking-detail">
				<thead>	
				<tr>
					<td class="middle">
						Total Reserva
					</td>
					<td class="middle">
						{{booking.amount.exchange.value}}{{booking.amount.exchange.currency.symbol}}
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
					<tr>
						<td class="middle">
							Total gastos de cancelación
						</td>
{# 						<td class="middle">
							{{pay.amount.exchange.value}}{{pay.amount.exchange.currency.symbol}}
						</td>
						<td class="middle">
							{{pay.payment }}%
						</td> #}
						<td class="middle">
							en breve te informamos si existen gastos
						</td>
						<td class="middle">
						</td>
						<td class="middle">
						</td>
						<td class="middle">
						</td>
					</tr>	
				</tbody>
			</table>
			<h4 class="iblock">Factura</h4>
			<p class="text-center">
				<a class="btn btn-success">descargar factura</a>
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