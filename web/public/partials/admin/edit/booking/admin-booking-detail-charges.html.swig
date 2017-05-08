<h4>Cobros</h4>
<form id="detailbookingcharges" ng-hide="booking.status == 'cancelled'" class="" name="detailbookingcharges" novalidate>
  <div class="row">
    <div class="col-md-4">
      <div class="well pb-b">
        <h5 class="mt-zero bold">Añadir cobro</h5>
          <form class="form-inline">
            <div class="form-group row">
              <div class="col-xs-3">
                <label for="receiptNumber">Recibo:</label>
              </div>
              <div class="col-xs-9">
                <input class="bg-light input-sm form-control " ng-model="nextcharge.receiptnumber" name="" type="text" placeholder="0000AAA" />
              </div>
            </div>
            <div class="form-group row">
              <div class="col-xs-3">
                <label for="amount">Importe:</label>
              </div>
              <div class="col-xs-9">
                <input class="bg-light input-sm form-control" ng-model="nextcharge.amount" ng-value="booking.breakdown.charges.pending || nextcharge.amount" name="amount" type="text" placeholder="1300" />
              </div>
            </div>
            <div class="form-group row">
              <div class="col-xs-3">
                <label for="paymethod">Metodo pago:</label>
              </div>
              <div class="col-xs-9">
                <select class="bg-light form-control" name="paymethod" id="paymethod" ng-model="nextcharge.paymentmethod" required="">
                  <option value="transfer">transfer</option>
                  <option value="tpv">tpv</option>
                  <option value="other">otros</option>
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
                  ng-model="nextcharge.date"
                  max-date="dt"
                  datepicker-options="dateOptions"
                  date-disabled="disabled(date, mode)"
                  ng-required="true" close-text="Cerrar"
                  current-text="Hoy" clear-text="Limpiar" is-open="calendar['calendarforcharges']" />
                  <span class="input-group-btn">
                    <button type="button" class="btn btn-alt" ng-click="open($event, 'calendar', 'calendarforcharges')">
                      <i class="fa fa-calendar"></i>
                    </button>
                  </span>
                </span>
              </div>
            </div>
            <hr></hr>
            <div class="row">
              <div class="col-xs-12 text-right">
                <button class="btn btn-primary" ng-click="addcharge()">validar</button>
              </div> 
            </div>
          </form>
   
      </div>
    </div>
    <div class="col-md-8">
      {% include 'booking-detail-table-charges.html.swig' %}
      <p class="text-right">
        <button type="button" class="btn btn-link btn-xs" ng-click="switchvisiblestate('chargesedit')">
          <i class="fa fa-pencil"></i>
          Modificar Cobros
        </button>
      </p>
    </div>
  </div>
</form>