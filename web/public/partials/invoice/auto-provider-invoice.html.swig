<div class="invoice-modal" id="invoice-modal" role="dialog">
<div class="preloader-blanket" ng-class="{in : showLoadInvoice}" style=""><div class="preloader"><span></span><span></span><span></span></div></div>
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
			           <img class="id-user-img" src="{{getimage(booking.dmc.images.logo.url, 'avatar100')}}" ng-show="booking.dmc.images.logo.url" />
                </td>
                <td class="cellempty">
                    <h2 class="thin middle mb-l mt-b">{{dmcproduct.dmc.company.legalname}}</h2>
                    <p>Company TAX Id: <strong>{{dmcproduct.dmc.company.taxid}}</strong><br />
                    {{dmcproduct.dmc.company.location.fulladdress}},<br /> PC {{dmcproduct.dmc.company.location.cp}}, {{dmcproduct.dmc.company.location.city}}, ({{dmcproduct.dmc.company.location.country}})</p>
                </td>
			          <td class="text-right cellempty">
				            <div class="form-group" ng-class="{ 'has-error': signupform.legalname.$invalid}">
                        <label class="control-label" for="invoicenumber">
                        <strong> Invoice Number </strong><b>*</b></label><br />
                        <input class="form-control celleditable pull-right text-right" name="invoicenumber" id="invoicenumber" type="text" value="" placeholder="ex: 0001" ng-model="invoice.invoicenumber" required />
                    </div>
                    <br />
                    <div class="form-group">
                        <label for="invoice-date"><strong>Invoice Date</strong><b>*</b></label><br />
                        <input type="date" id="invoice-date" class="form-control celleditable pull-right text-right" invoice.date"  value="{{ invoice.date | date : 'dd-MM-yyyy' }}"  placeholder="15-5-2018" required  />
                    </div>
                </td>
              </tr>
          </table>
          <hr class="mt-b mb-b" />
          <table class="table table-nolined table-omt">
            <tr>
              <td class="text-gray">
                <h4 class="mt-zero mb-b">CORPORATE NAME: TRAVELER SENSE S.L.</h4>
                  <p class="mt-b">Commercial brand: <strong ng-if="booking.affiliate">yourttoo.com</strong> <strong ng-if="booking.traveler">openmarket.travel</strong><br />
                  CIF: <strong>B57860017</strong> <br />
                  Calle Isaac Newton 10, Edificio Disset, 2da planta<br />CP 07121 Palma de Mallorca, Islas Baleares (Spain)
                </p>
                  
              </td>
            </tr>
          </table>
          <table class="table table-hover table-invoice">
            <tr class="active text-gray">
              <td>Description</td> 
              <td></td>
              <td></td>
              <td>Passengers</td>
            </tr>
            <tr>
              <td>
                {{booking.dates.start.day}} {{booking.dates.start.monthname_en}} {{booking.dates.start.year}}<br />
                <p class="help-block">
                  <strong>{{dmcproduct.name}} [{{dmcproduct.code}}] </strong><span class="hidden">{{dmcproduct.title}}  {{ dmcproduct.categoryname.label_en }}</span> <br /></p>
                <p class="help-block">Booking ID: <strong>{{booking.idBooking}}</strong> <br /></p>
                <p>Passengers:</p>
      				  <i class="help-block" >					   
      					<div  ng-repeat="paxit in booking.paxes">								
      						{{ $index+1 }}. <strong>{{paxit.name}} {{paxit.lastname}}</strong>
      					</div>						
      				  </i>
    				  </td> 
    				  <td></td>
              <td></td>
              <td>{{local.pax}}</td>
            </tr>
            <tr>
                <td class="cellempty"></td>
                <td class="cellempty"></td>
                <td class="active text-gray"><em>SUBTOTAL</em></td>
                <td>{{ booking.breakdown.provider.net | number:0}} {{booking.dmc.currency.symbol}}</td>
            </tr>
            <tr>
                <td class="cellempty"></td>
                <td class="cellempty"></td>
                <td class="active">TOTAL</td>
                <td><strong>{{ booking.breakdown.provider.net | number:0}} {{booking.dmc.currency.symbol}}</strong></td>
            </tr>
          </table>
          <br />
          <hr />
          <p class="help-block">{{local.comments}}</p>
          <br />
          <h4 class="text-gray">Comments <small>(400 Max.)</small></h4>
          <textarea class="form-control" rows="3" ng-model="local.comments"></textarea>
        </div><!-- .modal-body ends -->
        <div class="modal-footer">        
          <button type="button" class="btn btn-default mt-l" data-dismiss="modal" ng-click="cancel()">Cancel</button>
          <button id="generateInvoice" type="button" class="btn-primary btn mt-l" data-dismiss="modal" ng-click="generateInvoice()"><i class="fa fa-cloud-download"></i> Save and Download</button>
        </div>
        <!-- enlace de descarga de la factura -->
        <p class="hidden">
          <a id="invoicelink" class="action" target="_blank" ng-href="{{invoiceProviderUrl}}">Download invoice </a>
        </p>
     </div> <!-- invoice-preview ends -->
    </div>  <!-- .modal-content ends -->      
  </div> <!-- .modal-dialog ends -->
</div>