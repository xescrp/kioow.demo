{% extends 'yto-layout-empty.html.swig' %}

{% block bodyclass %}print{% endblock %}

{% block body %}


<div class="container">
	<div class="invoice-modal" id="invoice-modal" role="dialog">
	  <div class="modal-dialog modal-lg">
		<div class="modal-content">
		  <div class="modal-body">
			<div class="invoice-preview">
			  <table class="table table-dmc table-nolined">
				  <tr>
					<td class="cellempty">
						   <img class="id-user-img" src="{? getUrlCloudinary(booking.affiliate.images.logo.url, 'avatar100') ?}" />
					</td>
					<td class="cellempty">
						<h2 class="thin middle mb-l mt-b">{?booking.affiliate.company.legalname?}</h2>
						<p><br />
						  {?booking.affiliate.company.location.fulladdress?},<br /> 
						  {?booking.affiliate.company.location.cp?}, {?booking.affiliate.company.location.city?}, ({?booking.affiliate.company.location.country?})</p>
						  Identificador fiscal: 
					</td>
						  <td class="text-right cellempty">
						<!--div class="form-group">
							<label for="invoice-number"><strong>Invoice Number</strong></label><br />
							<input type="text" id="invoice-number" class="form-control celleditable pull-right text-right" ng-model="local.invocenumber" />
						</div-->
								<div class="form-group" ng-class="{ 'has-error': signupform.legalname.$invalid}">
							<label class="control-label" for="invoicenumber">
							<strong> Numero de factura </strong></label><br />
							{? invoicenumber ?}
						</div>
						<br />
						<div class="form-group">
							<label for="invoice-date"><strong>Fecha de factura</strong><b>*</b></label><br />
							{? invoicedate ?}
						</div>
					</td>
				  </tr>
			  </table>
			  <hr class="mt-b mb-b" />
			  <table class="table table-nolined table-omt">
				<tr>
				  <td class="text-gray">
					<h4 class="mt-zero mb-b">TRAVELER SENSE S.L.</h4>
					  <p class="mt-b">Marca comercial de yourttoo.com</strong><br />
					  CIF: <strong>B57860017</strong> <br />
					  Calle Isaac Newton 10, Edificio Disset, 2da planta<br />CP 07121 Palma de Mallorca, Islas Baleares (Spain)
					</p>
                  
				  </td>
				</tr>
			  </table>
			  <table class="table table-hover table-invoice">
				<tr class="active text-gray">
				  <td colspan="4">COMISION SOBRE RESERVA LOC: {? booking.idBooking ?}</td> 
				</tr>
				<tr>
				  <td>
					<p class="help-block">
					 Programa: <span >{? booking.products[0].title_es || booking.products[0].title ?}  ({? booking.products[0].categoryname.label_es || booking.products[0].categoryname.label_en ?})</span> <br /></p>
					 Fecha de salida: {? booking.dates.start.day?} {?booking.dates.start.monthname_es?} {?booking.dates.start.year?}<br />
					<p class="help-block">Booking ID: <strong>{? booking.idBooking ?}</strong> <br /></p>
					<p>Passengers:</p>
					{% set index = 1 %}
					{% for pax in booking.paxes %}
      					  <i class="help-block">
					  {? index  ?}. <strong>{? pax.name ?} {? pax.lastname ?}</strong>	
      					  </i>
					{% endfor %}
    					  </td> 
    			  <td></td>
				  <td></td>
				  <td></td>
				</tr>
				<tr>
					<td class="cellempty"></td>
					<td class="cellempty"></td>
					<td class="active text-gray"><em>Comision</em></td>
					<td>{? booking.breakdown.agency.payment ?} {? booking.pricing.currency.symbol ?}</td>
				</tr>
				<tr>
					<td class="cellempty"></td>
					<td class="cellempty"></td>
					<td class="active text-gray">
					<div class="form-inline">
						<em>Iva sobre comision (21%)</em> 
					</div>
					</td>
					<td>{? booking.breakdown.agency.wl.ivaamount ?} {?booking.pricing.currency.symbol?}</td>
				</tr>
				<tr>
					<td class="cellempty"></td>
					<td class="cellempty"></td>
					<td class="active">Total factura</td> 
					<td><strong>{? booking.breakdown.agency.wl.total ?} {? booking.pricing.currency.symbol ?}</strong></td>
				</tr>
			  </table>
			</div><!-- .modal-body ends -->
		
		 </div> <!-- invoice-preview ends -->
		</div>  <!-- .modal-content ends -->      
	  </div> <!-- .modal-dialog ends -->
	</div>
</div>




{% endblock %}