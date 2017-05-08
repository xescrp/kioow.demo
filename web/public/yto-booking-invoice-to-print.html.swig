{% extends 'yto-layout-empty.html.swig' %}

{% block bodyclass %}print{% endblock %}

{% block body %}

<div class="container">
    <div class="invoice-modal" id="invoice-modal" role="dialog">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">        
          <div class="modal-body">
            <div class="invoice-preview">

              {# logo  emisor de la factura omt #}            
              <table class="table table-dmc table-nolined">
                <tbody>
                  <tr>                                 
                    <td class="text-center cellempty">
                      <img class="id-user-img" src="http://res.cloudinary.com/open-market-travel/image/upload/w_300,h_80,c_pad/v1448267234/yourttoo.com/yourttoo_logo_invoice.png">
                    </td>                       
                  </tr>
                </tbody>
              </table>

              {# informacion receptor de la factura omt #} 
              <table class="table table-dmc table-nolined">
                <tbody>
                  <tr>          
                    <td style="width:40%">
                      {# factura real #}
                      {% if booking.invoiceAffiliate != null %}                       
                        <p class="mt-zero mb-b"> FACTURA Nº:  {? booking.invoiceAffiliate ?} </p>
                        <p>FECHA FACT.:   {? booking.invoiceAffiliateDate | date('d/m/Y') ?} <br><br></p>

                      {# factura proforma #}
                      {% else %}
                        <p class="mt-zero mb-b"> FACTURA PROFORMA</p>
                        <p>FECHA FACT. PROFORMA: {? booking.createdOn | date('d/m/Y') ?}<br><br></p>
                      {% endif %}

                      <p class="mt-zero">LOCALIZADOR: {? booking.idBooking ?}</p>
                      {#<p class="mt-zero">CLIENTE: {? booking.paxes[0].name ?} {? booking.paxes[0].lastname ?}</p> #}                   
                      <p class="mt-zero">DESTINO: {? booking.destination ?}</p>                     
                    </td>

                    <td class="cellempty">
                        <p class="mt-zero mb-b"><strong>{? booking.affiliate.company.legalname ?}</strong></p>
                        <p>Dirección:   {? booking.affiliate.company.location.fulladdress ?}, CP: {? booking.affiliate.company.location.cp ?}, {? booking.affiliate.company.location.city ?}, ({? booking.affiliate.company.location.country ?})</p>
                        <p class="mt-zero">CIF: {? booking.affiliate.company.taxid ?}</p>
                        <p class="mt-zero">EXPEDIENTE AAVV: {? booking.idBookingExt ?}</p>
                        <p class="mt-zero">FECHA DE SALIDA: {? booking.dates.start.day ?} de {? booking.dates.start.monthname_es ?} {? booking.dates.start.year ?}</p>
                    </td>                      
                  </tr>                  
                </tbody>
              </table>    
              <br>
              <p><small>Marca comercial de TRAVELER SENSE S.L. NIF: B57860017  Insc. en el Reg. Mercantil, Tomo 2575, Libro 0, Folio 170, Hoja PM-74129, AVBAL/657 </small></p>
             <hr class="mt-b mb-b">
             {# descripcion del producto #}
             <table class="table table-hover table-invoice">
                <tbody>
                <tr class="active text-gray">
                  <td class="text-center" colspan="4">CONCEPTO</td> 
                  <td class="text-center" style="width:35%">IMPORTE</td>
                </tr>
                <tr>
                  {# columna resumen #}
                  <td colspan="4">
                    {? dmcproduct.title_es ?} {? dmcproduct.categoryname.label_es ?} ({? booking.dates.start.day ?} {? booking.dates.start.monthname_es ?} {? booking.dates.start.year ?})
                  </td>
                  <td class="cell-b-l">
                  </td>
                </tr>
				<tr>
					<td class="nbt cell-b-t"><p><strong>DESGLOSE:</strong></p></td><td colspan="3"></td><td class="cell-b-l"></td>
				</tr>
				<tr>
					{% for pricekey in booking.breakdown.roomsbyprice.travelersense.keys %}
					{% set paxprice = booking.breakdown.roomsbyprice.travelersense[pricekey] %}
					{% set hashrooms = { double: 'Doble', triple: 'Triple', single: 'Individual', quad: 'Cuadruple' } %}
						<tr>
							<td class="nbt"></td>
							<td class="nbt"><p>{? paxprice.paxes ?} Pax en </p></td>
							<td class="nbt"><p>{? hashrooms[paxprice.room] ?}</p></td>
							<td class="nbt text-right"><p>{? paxprice.price | removeDecimal ?} {? room.pricing.currency.symbol ?}</p></td>
							<td class="nbt text-center cell-b-l">{? paxprice.price * paxprice.paxes | removeDecimal ?} {? room.pricing.currency.symbol ?}</td>
						</tr>
					{% endfor %}
				</tr>
				<tr>
					<td class="nbt"></td>
					<td class="nbt"></td>
					<td class="nbt"></td>
					<td class="nbt"></td>
					<td class="nbt text-center cell-b-l">{? local.topay | removeDecimal?} {? booking.pricing.currency.symbol ?}<br /></td>
				</tr>
                

                  {% if booking.invoiceAffiliate == null %}
                  <tr>
                    <td class=""></td>
                    <td class=""></td>
                    <td class=""></td>   
                    <td class="text-right">TOTAL FACTURA</td>
                    <td class="text-center">
                      <strong>{?local.topay | removeDecimal?} {? booking.pricing.currency.symbol ?}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td class="cellempty"></td>
                    <td class="cellempty"></td>
                    <td class="cellempty"></td>  
                    <td class="text-right">VTO.</td>
                    <td class="text-center">
                      <strong>Consulta Panel de Administración</strong>
                    </td>
                  </tr> 
                  {% endif %}
                  {% if booking.invoiceAffiliate != null %}
                  <tr>
                    <td class=""></td>
                    <td class=""></td>
                    <td class=""></td>   
                    <td class="text-right">TOTAL FACTURA</td>
                    <td class="text-center">
                      <strong>{?local.topay | removeDecimal?} {? booking.pricing.currency.symbol ?}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td class="cellempty"></td>
                    <td class="cellempty"></td>
                    <td class="cellempty"></td>  
                    <td class="text-right">ESTADO</td>
                    <td class="text-center">
                      <strong>PAGADA</strong>
                    </td>
                  </tr>
                  {% endif %}
                </tbody>
              </table> 
              <hr class="mt-b mb-b">
              <p><small>Operación sujeta a Régimen especial de las Agencias de Viajes Art. 141 Ley de IVA</small></p>
              <p><small>Agencias de Viajes, Minoristas, Mayoristas, Clientes y Viajeros se someten con renuncia de su fuero propio, para cualquier interpretación y reclamación inherente a los servicios de los que se deriva esta factura, así como al pago de la misma, a los Tribunales de Palma de Mallorca</small></p>

              <p>DATOS BANCARIOS: <br>
              Banco: Bankinter - IBAN: ES78 0128 0580 8101 0006 1324 - SWIFT: BKBKESMMXXX<br>
              Banco: Banco Sabadell - IBAN: ES89 0081 0652 2300 0184 3992 - SWIFT: BSABESBB
              </p>
              <p><small>Edificio Disset, Parc BIT. Isaac Newton s/n, planta segunda, 07121 Palma de Mallorca - España.<br>
              e-mail administracion@yourttoo.com Teléfono: 971 902 473</small></p>
                            
            </div><!-- .modal-body ends -->
         </div> <!-- invoice-preview ends -->
        </div>  <!-- .modal-content ends -->      
      </div> <!-- .modal-dialog ends -->
    </div>
  </div>

{% endblock %}