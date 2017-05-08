<div class="well padded-b">
  <h4>Proveedor ({{ booking.dmc.company.name || booking.dmc.name }}) - Facturas emitidas por el proveedor</h4>
  <section class="panel panel-default invoices padded-xxl" >
    <div class="row" ng-repeat="invoice in booking.invoicesprovider">
      <div class="col-md-1 text-center">
        <span class="fa-stack fa-2x">
          <i class="fa fa-file-o fa-stack-2x"></i>
          <i class="fa fa-check fa-stack-1x"></i>
        </span>
      </div>
      <div class="col-md-4">
        <h3>
          <a target="_blank" ng-href="{{ invoice.file.url }}">Invoice: {{invoice.invoicenumber}}</a>
        </h3>
        
      </div>
      <div class="col-md-3 padded-xxl">
        <a class="btn btn-danger btn-xs" ng-click="deleteinvoice('provider', invoice)">
          <i class="fa fa-trash"></i> Eliminar
        </a>
      </div>
    </div>
    <div class="row">
      <div class="col-md-5"></div>
      <div class="col-md-7 text-right">
        <p class="help-block text-right mb-zero">
          Please upload/replace invoice file, or create a document automatically
        </p>
        <button type="button" ng-click="uploadInvoiceProvider('')"  class="btn iblock mt-l btn-primary left-mar-btn" >
          <i class="fa fa-file-text-o"></i> <b>subir</b> archivo
        </button>
        <button type="button" ng-click="openGenerateInvoice('dmc')"  class="btn iblock mt-l btn-primary left-mar-btn" >
          <i class="fa fa-file-text-o"></i> factura automatica
        </button>
      </div>
    </div>
  </section>
<hr class="mt-zero mb-b" />
  <h4 ng-if="booking.bookingmodel=='whitelabel'">Agencia ({{ booking.affiliate.company.name || booking.affiliate.name }}) - Facturas emitidas por la agencia (whitelabel comission)</h4>
  <section ng-if="booking.bookingmodel=='whitelabel'" class="panel panel-default invoices padded-xxl" >
    <div class="row" ng-repeat="invoice in booking.invoicesagency" ng-if="booking.bookingmodel=='whitelabel'">
      <div class="col-md-1 text-center">
        <span class="fa-stack fa-2x">
          <i class="fa fa-file-o fa-stack-2x"></i>
          <i class="fa fa-check fa-stack-1x"></i>
        </span>
      </div>
      <div class="col-md-4">
        <h3>
          <a target="_blank" ng-href="{{ invoice.file.url }}">Invoice: {{invoice.invoicenumber}}</a>
        </h3>
      </div>
      <div class="col-md-3 padded-xxl">
        <a class="btn btn-danger btn-xs" ng-click="deleteinvoice('agency', invoice)">
          <i class="fa fa-trash"></i> Eliminar
        </a>
      </div>
    </div>
    <div class="row" >
      <div class="col-md-5"></div>
      <div class="col-md-7 text-right">
        <p class="help-block text-right mb-zero">
          Please upload/replace invoice file, or create a document automatically
        </p>
        <button type="button" ng-click="uploadInvoiceAgency('')"  class="btn iblock mt-l btn-primary left-mar-btn" >
          <i class="fa fa-file-text-o"></i> <b>subir</b> archivo
        </button>
        <button type="button" ng-click="openGenerateInvoice('')"  class="btn iblock mt-l btn-primary left-mar-btn" >
          <i class="fa fa-file-text-o"></i> factura automatica
        </button>
      </div>
    </div>
  </section>
  <hr class="mt-b mb-b" />
  <h4>Traveler Sense - Facturas emitidas por traveler sense</h4>
  <section class="panel panel-default invoices padded-xxl" >
    <div class="row" ng-repeat="invoice in booking.invoicestravelersense">
      <div class="col-md-1 text-center">
        <span class="fa-stack fa-2x">
          <i class="fa fa-file-o fa-stack-2x"></i>
          <i class="fa fa-check fa-stack-1x"></i>
        </span>
      </div>
      <div class="col-md-4">
        <h3>
          <a target="_blank" ng-href="{{ invoice.file.url }}">Invoice: {{invoice.invoicenumber}}</a>
        </h3>
      </div>
      <div class="col-md-3 padded-xxl">
        <a class="btn btn-danger btn-xs" ng-click="deleteinvoice('travelersense', invoice)">
          <i class="fa fa-trash"></i> Eliminar
        </a>
      </div>
    </div>
    <div class="row">
      <div class="col-md-5"></div>
      <div class="col-md-7 text-right">
        <p class="help-block text-right mb-zero">
          Please upload/replace invoice file, or create a document automatically
        </p>
        <button type="button" ng-click="uploadInvoiceTS('')"  class="btn iblock mt-l btn-primary left-mar-btn" >
          <i class="fa fa-file-text-o"></i> <b>subir</b> archivo
        </button>
        <button type="button" ng-click="openGenerateInvoice('')"  class="btn iblock mt-l btn-primary left-mar-btn" >
          <i class="fa fa-file-text-o"></i> factura automatica
        </button>
      </div>
    </div>
  </section>
</div>