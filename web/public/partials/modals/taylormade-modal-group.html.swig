<!-- ======= Acomodation modal ======== -->
<div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" ng-click="cancel()"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h5 class="pasajeros-title mt-zero ml-zero" id="grupoLabel">Acomodación de Grupo</h5>
      </div>
      <hr class="mt-l mb-b">
      <div class="modal-body">
          <div class="row">
            <label class="control-label col-md-12 mb-l mt-l"><strong>¿Qué tipo de grupo?</strong></label>
          </div>
          <div class="row">
            <label class="control-label mb-l pasajeros-radio"><input type="radio" name="grupo" id="club" value="club" ng-model="group.typeGroup" ng-change="showErrorType = false">  Club </label>
            <label class="control-label mb-l pasajeros-radio"><input type="radio" name="grupo" id="empresas" value="company" ng-model="group.typeGroup" ng-change="showErrorType = false">  Empresa</label>
            <label class="control-label mb-l pasajeros-radio"><input type="radio" name="grupo" id="familias" value="family" ng-model="group.typeGroup" ng-change="showErrorType = false"> Familias</label>
            <label class="control-label mb-l pasajeros-radio"><input type="radio" name="grupo" id="otro" value="other" ng-model="group.typeGroup" ng-change="showErrorType = false"> Otro</label>
            
            <!-- <div class="pasajeros-select">
              <label class="control-label"><strong>Número de pasajeros</strong></label>
              <input class="form-control" type="number" ng-model="group.adults">
            </div>
            <div class="pasajeros-select">
              <label class="control-label"><strong>Adultos</strong> &gt; 12 años</label>
              <input class="form-control" type="number" ng-model="group.adults">
            </div>
            <div class="pasajeros-select">
              <label class="control-label"><strong>Niños</strong>  &lt; 12 años</label>
              <input class="form-control" type="number" ng-model="group.childs">
            </div>
            <div class="pasajeros-select">
              <label class="control-label"><strong>Bebés</strong> &lt; 3 años</label>
              <input class="form-control" type="number" ng-model="group.babys">
            </div> -->
            

            <h5 class="bold col-md-12 mt-l">Cantidad de habitaciones</h5>
            <div class="pasajeros-room-select">
              <label class="control-label">Individuales</label>
              <input class="form-control" type="number" ng-model="group.rooms.single">
            </div>
            <div class="pasajeros-room-select">
              <label class="control-label">Dobles</label>
              <input class="form-control" type="number" ng-model="group.rooms.double">
            </div>
            <div class="pasajeros-room-select">
              <label class="control-label">Triples</label>
              <input class="form-control" type="number" ng-model="group.rooms.triple">
            </div>
            <h5 class="bold col-md-12 mt-l">Observaciones sobre el grupo</h5>
            <div class="col-md-12"><textarea class="form-control" ng-model="group.comments" rows="3"></textarea></div>
        </div>

          
        <!-- mensaje de los pasajeros deben seleccionar tipo de grupo -->
        <div class="alert alert-dismissable alert-danger border-danger mt-xl" ng-show="showErrorType">
          <button type="button" class="close" ng-click="showErrorType = false" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>
              <strong>Por favor selecciona un tipo de grupo. 
              </strong>
        </div>
        <!-- mensaje de los pasajeros deben ser mas de 14 -->
        <div class="alert alert-dismissable alert-danger border-danger mt-xl" ng-show="showErrorCant">
          <button type="button" class="close" ng-click="showErrorCant = false" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>
              <strong>Para que sea considerado grupo, los pasajeros deben ser más de 14. 
              </strong>
        </div>
      </div>

      <div class="modal-footer">
            <p class="text-center">
            <strong>{{getStringTypeGroup()}}:</strong>
            {{accomodationStr()}}
            </p>
            <button type="button" ng-click="ok()" class="btn btn-block btn-danger" data-dismiss="modal">Aceptar</button>
      </div>
    </div>
  </div>
