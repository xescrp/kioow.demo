{% extends 'yto-layout-empty.html.swig' %}

{% block bodyclass %}print{% endblock %}

{% block body %}

<div class="container">
	<div class="invoice-modal" id="invoice-modal" role="dialog">
	  <div class="modal-dialog modal-lg">
		<div class="modal-content">
		  <div class="modal-header mb-xxl">              
			<button type="button" class="close" data-dismiss="modal" ng-click="cancel()"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
			<h3 class="h2 thin" id="loginLabel">Preview</h3>
		  </div>
		  <div class="modal-body">
			<div class="invoice-preview">
			  <table class="table table-dmc table-nolined">
				  <tr>
					<td class="cellempty">
						   <img class="id-user-img" src="{? getUrlCloudinary(booking.dmc.images.logo.url, 'avatar100') ?}" />
					</td>
					<td class="cellempty">
						<h2 class="thin middle mb-l mt-b">{? dmcproduct.dmc.company.legalname ?}</h2>
						<p>Company TAX Id: <strong>{? dmcproduct.dmc.company.taxid ?}</strong><br />
						{? dmcproduct.dmc.company.location.fulladdress?},<br /> PC {?dmcproduct.dmc.company.location.cp?}, {?dmcproduct.dmc.company.location.city?}, ({?dmcproduct.dmc.company.location.country?})</p>
					</td>
						  <td class="text-right cellempty">
				            
							<label class="control-label" for="invoicenumber">
							<strong> Invoice Number </strong><b>*</b></label><br />
							<p class="mt-zero mb-b"> INVOICE Nº:  {? invoicenumber ?} </p>
							<p>FECHA FACT.:   {? invoicedate | date('d/m/Y') ?} <br><br></p>
					</td>
				  </tr>
			  </table>
			  <hr class="mt-b mb-b" />
			  <table class="table table-nolined table-omt">
				<tr>
				  <td class="text-gray">
					<h4 class="mt-zero mb-b">CORPORATE NAME: TRAVELER SENSE S.L.</h4>
					  <p><small>Marca comercial de TRAVELER SENSE S.L. NIF: B57860017  Insc. en el Reg. Mercantil, Tomo 2575, Libro 0, Folio 170, Hoja PM-74129, AVBAL/657 </small></p>
				  </td>
				</tr>
			  </table>
			  <table class="table table-hover table-invoice">
				<tr class="active text-gray">
				  <td class="text-center" colspan="4">Description</td> 
				  <td class="text-center" style="width:35%">Amount</td>
				</tr>
				<tr>
					  {# columna resumen #}
					  <td colspan="4">
						{? dmcproduct.title_en || dmcproduct.title_en ?} {? dmcproduct.categoryname.label_es || dmcproduct.categoryname.label_en ?} ({? booking.dates.start.day ?} {? booking.dates.start.monthname_en ?} {? booking.dates.start.year ?})
					  </td>
					  <td class="cell-b-l">
					  </td>
					</tr>
				<tr>
						{% for pricekey in booking.breakdown.roomsbyprice.provider.keys %}
						{% set paxprice = booking.breakdown.roomsbyprice.provider[pricekey] %}
						{% set hashrooms = { double: 'Doble', triple: 'Triple', single: 'Individual', quad: 'Cuadruple' } %}
							<tr>
								<td class="nbt"></td>
								<td class="nbt"><p>{? paxprice.paxes ?} Pax en </p></td>
								<td class="nbt"><p>{? paxprice.room ?}</p></td>
								<td class="nbt text-right"><p>{? paxprice.dmc | removeDecimal ?} {? booking.dmc.currency.symbol ?}</p></td>
								<td class="nbt text-center cell-b-l">{? paxprice.dmc * paxprice.paxes | removeDecimal ?} {? booking.dmc.currency.symbol ?}</td>
							</tr>
						{% endfor %}
				</tr>
				<tr>
						<td class=""></td>
						<td class=""></td>
						<td class=""></td>   
						<td class="text-right">TOTAL</td>
						<td class="text-center">
						  <strong>{? invoiceamount | removeDecimal?} {? booking.dmc.currency.symbol ?}</strong>
						</td>
				</tr>
			  </table>
			</div><!-- .modal-body ends -->
		 </div> <!-- invoice-preview ends -->
		</div>  <!-- .modal-content ends -->      
	  </div> <!-- .modal-dialog ends -->
	</div>    
</div>

{% endblock %}