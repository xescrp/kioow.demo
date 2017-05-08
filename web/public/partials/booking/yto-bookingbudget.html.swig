<div class="modal-content">
  <div class="modal-header mb-xxl">              
    <button type="button" class="close" data-dismiss="modal" ng-click="cancel()"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
    <h3 class="h2 thin" >Guardar Presupuesto</h3>
  </div>
  <div class="modal-body">
     <!--informacion del error -->
    <div class="alert alert-danger alert-dismissible" role="alert" ng-show="errorServerSave" >
      <strong> {{error}} </strong>
    </div>   

    <form id="accomodationbudget" class="" name="accomodationbudget" novalidate>
    </form>

    <!-- titular -->
    <h4>Titular del presupuesto</h4>                        
    <div class="form-group row">
      <div class="form-group col-md-6" ng-class="{ 'has-error': paxForm.namesf.$invalid}">
        <label class="control-label" for="namesf"><i class="fa fa-exclamation-circle text-brand-danger"></i> Nombre/s <b>*</b></label>
        <input class="form-control" ng-model="items[0].$parent.booking.signin.name" type="text" id="namesf" name="namesf" required />
      </div>
      <div class="form-group col-md-6" ng-class="{ 'has-error': paxForm.lastsf.$invalid}">
        <label class="control-label" for="lastsf"><i class="fa fa-exclamation-circle text-brand-danger"></i> Apellido/s <b>*</b></label>
        <input class="form-control" ng-model="items[0].$parent.booking.signin.lastname" type="text" name="lastsf" id="lastsf" required />
      </div>
    </div>
    

  </div><!-- .modal-body ends -->
    
  <div class="modal-footer">
  <hr class="mt-xs mb-b" />
    <button type="button" class="btn btn-default" data-dismiss="modal" ng-click="cancel()">Cancelar</button>
    <button type="button" class="btn btn-primary" data-dismiss="modal" ng-click="printBudget()">Guardar e Imprimir</button>
    <!--button type="button" class="btn btn-primary" data-dismiss="modal" ng-click="saveBudget()">Guardar</button-->

    <p class="help-block">Para recuperarlos, ve a la pestaña Mis Presupuestos</p>
  </div>
 </div> <!-- invoice-preview ends -->


      