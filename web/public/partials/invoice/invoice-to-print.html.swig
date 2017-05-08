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
                <tbody>
                <tr>				  
               {% if source.images.photo.url%}
                <td class="cellempty">
                  <img class="id-user-img" src="{? getUrlCloudinary(source.images.logo.url, 'avatar100') ?}" data-src2x="{? getUrlCloudinary(source.images.logo.url, 'avatar100retina') ?}" />
                </td>
              {% endif %}
                <td class="cellempty">
                    <h2 class="thin middle mb-xl mt-b">{? source.company.legalname ?}</h2>
                    <p>Company TAX Id: <strong>{? source.company.taxid ?}</strong><br />
                    {? source.company.location.fulladdress ?},<br /> PC {? source.company.location.cp ?}, {? source.company.location.city ?}, ({? source.company.location.country ?})</p>
                </td>
                <td class="text-right cellempty">
    	            <div class="form-group">
                      <label class="control-label" for="invoicenumber"><i class="fa fa-exclamation-circle text-brand-danger"></i><strong> Invoice Number </strong></label><br />
                      {? invoice.invocenumber ?}
                  </div>
                  <div class="form-group">
                      <label for="invoice-date"><strong>Invoice Date</strong></label><br />
                      {? invoice.date ?}
                  </div>
                  </td>
                </tr>
              </tbody>
            </table>
           <hr class="mt-b mb-b">
           <table class="table table-nolined table-omt">
              <tbody>
                <tr>
                  <td class="text-gray">
                    <h4 class="mt-zero mb-b">Corporate Name: Traveler Sense S.L.</h4>
                    <p class="mt-zero">
                     Commercial brand:<strong>{? targetname ?}</strong><br>
                      CIF: <strong>B57860017</strong> <br />
                      Calle Isaac Newton 10, Edificio Disset, 2da planta<br />CP 07121 Palma de Mallorca, Islas Baleares (Spain)
                      </p>
                  </td>
                </tr>
              </tbody>
           </table>
           <table class="table table-hover table-invoice">
            <tbody>
              <tr class="active text-gray">
                <td>Description</td> 
                <td></td>
                <td></td>
                <td>Passengers</td>
              </tr>
              <tr>
                <td>
                  {? booking.dates.start.day ?} {? booking.dates.start.monthname_en ?} {? booking.dates.start.year ?}<br />
                  <p class="help-block">{? dmcproduct.name ?} {#{? dmcproduct.title ?} {? dmcproduct.categoryname.label_en ?}#} [{? dmcproduct.code ?}] </strong><br /></p>
                  <p class="help-block">Booking ID: <strong>{? booking.idBooking ?}</strong><br /></p>
                  <p>Passengers:</p>
      				  {% for room in booking.rooms %}
      					{% for paxit in room.paxes %}	
      						<div>
      							{? loop.index ?}.<strong>{? paxit.name ?} {? paxit.lastname ?}</strong>
      						</div>
      					{% endfor %}
      				  {% endfor %}
			          </td>                  
			          <td></td>				  
                <td></td>
                <td>{? local.pax ?}</td>
              </tr>
              <tr>
                <td class="cellempty"></td>
                <td class="cellempty"></td>
                <td class="active text-gray"><em>SUBTOTAL</em></td>
                <td>{? local.subtotal | toFixed ?} {? booking.amount.currency.symbol ?}</td>
              </tr>
              <tr>
                <td class="cellempty"></td>
                <td class="cellempty"></td>
                <td class="active text-gray">
                <div class="form-inline">
                  <em>TAXES</em> 
                  <div class="input-group has-error">{? local.dmcvat ?}%</div>
                </div>
                </td>
                <td>{? vat ?} {? booking.pricing.currency.symbol ?}</td>
              </tr>
              <tr>
                <td class="cellempty"></td>
                <td class="cellempty"></td>
                <td class="active">TOTAL</td>
                <td><strong>{? local.topay | toFixed ?} {? booking.pricing.currency.symbol ?}</strong></td>
              </tr>
            </tbody>
          </table>
          <hr>
          <p class="help-block">{? local.comments ?}</p>
          <br/>
          </div><!-- .modal-body ends -->
       </div> <!-- invoice-preview ends -->
      </div>  <!-- .modal-content ends -->      
    </div> <!-- .modal-dialog ends -->
  </div>
</div> 
{% endblock %}