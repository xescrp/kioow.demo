<h4>Pagos</h4>
<form id="detailbookingpayment" ng-hide="booking.status == 'cancelled'" class="" name="detailbookingpayment" novalidate>
  <div class="row">
    <div class="col-md-4">
      <div class="well pb-b">
        <h5 class="mt-zero bold">Añadir pago</h5>
          <form class="form-inline">
            <div class="form-group row">
              <div class="col-xs-3">
                <label for="receiptNumber">Transfer:</label>
              </div>
              <div class="col-xs-9">
                <input class="bg-light input-sm form-control " ng-model="nextpayment.transferid" name="transferId" type="text" placeholder="0000AAA" />
              </div>
            </div>
            <div class="form-group row">
              <div class="col-xs-3">
                <label for="amount">Importe:</label>
              </div>
              <div class="col-xs-9">
                <input class="bg-light input-sm form-control" ng-model="nextpayment.amount" ng-value="booking.breakdown.payments.pending || nextpayment.amount" name="amount" type="text" placeholder="1300" />
              </div>
            </div>
            <div class="form-group row">
              <div class="col-xs-3">
                <label for="paymethod">Metodo pago:</label>
              </div>
              <div class="col-xs-9">
                <select class="bg-light form-control" name="paymethod" id="paymethod" ng-model="nextpayment.paymentmethod" required="">
                  <option value="transfer">transfer</option>
                  <option value="tpv">tpv</option>
                  <option value="other">otros</option>
                </select>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-xs-3">
                <label for="paymethod">Receptor:</label>
              </div>
              <div class="col-xs-9">
                <select class="bg-light form-control" name="target" id="paymenttarget" ng-model="nextpayment.paymenttarget" required="">
                  <option value="provider">proveedor</option>
                  <option value="agency">agencia</option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-3">Fecha: </div>
              <div class="col-xs-9">
                <span class="input-group input-date">
                  <input type="text"
                  class="form-control"
                  uib-datepicker-popup="dd-MM-yyyy"
                  ng-model="nextpayment.date"
                  max-date="dt"
                  datepicker-options="dateOptions"
                  date-disabled="disabled(date, mode)"
                  ng-required="true" close-text="Cerrar"
                  current-text="Hoy" clear-text="Limpiar" is-open="calendar['calendarforpayments']" />
                  <span class="input-group-btn">
                    <button type="button" class="btn btn-alt" ng-click="open($event, 'calendar', 'calendarforpayments')">
                      <i class="fa fa-calendar"></i>
                    </button>
                  </span>
                </span>
              </div>
            </div>
            <hr></hr>
            <div class="row">
              <div class="col-xs-12 text-right">
                <button class="btn btn-primary" ng-click="addpayment()">validar</button>
              </div> 
            </div>
          </form>
   
      </div>
    </div>
    <div class="col-md-8">
      {% include 'booking-detail-table-payments.html.swig' %}
      <p class="text-right">
        <button type="button" class="btn btn-link btn-xs" ng-click="switchvisiblestate('paymentsedit')">
          <i class="fa fa-pencil"></i>
          Modificar Pagos
        </button>
      </p>
    </div>
  </div>
</form>