<div class="invoice-modal" id="invoice-modal" role="dialog">
<div class="preloader-blanket" ng-class="{in : showLoadInvoice}" style=""><div class="preloader"><span></span><span></span><span></span></div></div>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header mb-xxl">              
        <button type="button" class="close" data-dismiss="modal" ng-click="cancel()"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h3 class="h2 thin" id="loginLabel">Sube tu propia factura</h3>
      </div>
      <div class="modal-body">
      <!--informacion del error -->
      <div ng-show="!_checkInvoice()" class="alert alert-danger alert-dismissible" role="alert" ng-hide="closeun">
        <strong> {{ feedbackErrorES() }} </strong>
      </div>   
       <form class="step-sf bg-light" name="uploadinvoicedmc" id="uploadinvoicedmcform">
        <div class="invoice-preview">
          <table class="table table-dmc table-nolined">
              <!-- invoice number-->
              <tr>                                      
      					<td class="text-left cellempty">
      						<div class="form-group" ng-class="{ 'has-error': uploadinvoicedmc.invoicenumber.$invalid}">
                      <label class="control-label" for="invoicenumber"><i class="fa fa-exclamation-circle text-brand-danger"></i><strong> Tu numero de factura </strong><b>*</b></label>
                      <input class="form-control celleditable pull-right text-right" 
                             name="invoicenumber" id="invoicenumber" 
                             type="text"
                             placeholder="ex: 0000001" 
                             ng-model="invoice.invoicenumber" required></input>
                  </div>
                </td>
              </tr>
              <!-- booking amount -->
              <tr>                                      
                <td class="text-left cellempty">
                  <div class="form-group" ng-class="{ 'has-error': uploadinvoicedmc.invoiceamount.$invalid}">
                      <label class="control-label" for="invoicenumber">
                        <i class="fa fa-exclamation-circle text-brand-danger"></i>
                        <strong> Importe total factura ({{ booking.pricing.currency.symbol}})</strong>
                        <b>*</b></label>
                      <input class="form-control celleditable pull-right text-right" 
                             name="invoiceamount" id="invoiceamount" type="number"  
                             placeholder="ex: 1200" ng-model="invoice.amount" required/>
                  </div>
                </td>
              </tr>
            <tr>
              <td>
                <div class="form.group">
                  <div id="load-business" class="documentwait" ng-show="false">
                    <div class="preloader solo in">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  <label class="control-label" for="invoicefile">
                    <i class="fa fa-exclamation-circle text-brand-danger"></i>
                    <strong> Archivo factura</strong>
                    <input type="file"
                         ng-waitingid="load-business"
                         ng-hideid="licenselink"
                         ng-file-select 
                         ng-file-type="document"
                         ng-additional-data="invoiceaffiliate"
                         accept=".jpg,.png,.pdf,.doc,.docx,.xls,.xlsx"
                         ng-model="invoice.file"
                         ng-callback ="fileuploaded" required/>
                  </label>
                  
                  <p class="help-block">valid extensions: jpg, png, pdf, doc, docx, xls, xlsx</p>
                </div>
              </td>
            </tr>
            </table>
          </div>
        </form>                
      </div><!-- .modal-body ends -->
      <div class="modal-footer">        
        <button type="button" class="btn btn-default" data-dismiss="modal" ng-click="cancel()">Cancel</button>
        <!-- botones de subida-->                                    
        <button type="button" ng-click="feedbackErrorES()" ng-show="!_checkInvoice()" class="btn btn-primary disabled opac-xxl"><i class="fa fa-cloud-download"></i> Subir y guardar</button>
        <label class="btn-upload btn-primary btn" ng-show="_checkInvoice()" ng-click="updateInvoiceComplete()">
          <i class="fa fa-cloud-download"></i> Subir y guardar
        </label>
      </div>
     </div> <!-- invoice-preview ends -->
    </div>  <!-- .modal-content ends -->      
  </div> <!-- .modal-dialog ends -->
