<h2 class="thin mb-xxl mt-zero"><span>4.</span> Condiciones de Pago</h2>
<div class="row">
    <div class="col-md-12" ng-hide="dateNoMatch">
            <h3 class="text-danger"><i class="fa fa-exclamation-triangle text-brand-danger"></i> Selecciona una fecha con disponibilidad</h3>
    </div>
    <div class="col-md-12" ng-show="!toConfirm && dateNoMatch">
        <h3 class="mt-zero mb-xl"><strong>¿Qué cantidad quieres abonar ahora?</strong></h3>
        <div class="form-group">
            <label class="control-label mb-l" ng-show="newbooking.dates.finalcharge.date > newbooking.dates.firstcharge.date">
                <input type="radio" ng-model="selectedpaymentoption" name="aumontSelected" id="aumont40" value="transfer-split" ng-change="setAumont()" />
                &nbsp; Pago del 15 % del importe de la reserva 
                <strong> ({{((newbooking.breakdown.agency.net * 15)/100) | number : 0}} {{newbooking.pricing.currency.symbol}}).</strong>
                Resto del pago <strong>({{newbooking.breakdown.agency.net - ((newbooking.breakdown.agency.net * 15)/100) | number : 0}} {{newbooking.pricing.currency.symbol}})</strong> 
                antes del {{ buildadate(newbooking.dates.finalcharge) | date : 'dd-MM-yyyy'}} *.
            </label>

            <label class="control-label mb-l" >
                <input type="radio" ng-model="selectedpaymentoption" name="aumontSelected" id="aumont100" value="transfer-100" checked="checked" ng-change="setAumont()" />
                &nbsp; Pago del 100% del importe de la reserva
                <strong> ({{newbooking.breakdown.agency.net | number : 0}} {{newbooking.pricing.currency.symbol}}).</strong>
            </label> 
        </div>
        <p class="help-block">
        * Si necesitas ayuda consulta nuestras Preguntas Frecuentes: <a href="/faq/41-el-pago" target="_blank">Funcionamiento de pagos</a></p>
    </div>
</div>

