<!-- ======= Acomodation modal ======== -->
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" ng-click="cancel()"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h3 class="pasajeros-title mb-xl" id="acomodationLabel">Acomodación</h3>
      </div>
      <div class="modal-body">
          <div id="regular">
            <!-- acomodation -->
                <div class="room alert" ng-repeat="room in roomDistribution">
                  <div class="row" ng-init="roomFirst = $first">   
                      <div class="iblock form-inline col-md-12 mb-b">
                          <label class="control-label bold" for="typeRoom">Tipo Habitación {{$index+1}} </label>
                          <select class="select-room" ng-model="room.typeRoom" name="typeRoom" ng-options="room.label for room in local.rooms" ng-change="updateTravelersRoom(room)"></select>
                          <button class="btn btn-danger btn-xs ml-b pull-right" ng-hide="roomFirst && $first" ng-click="deleteRoom($index)"><i class="fa fa-trash-o fa-lg"></i> borrar</button>
                      </div>
                      <!-- pasajero start-->
                      <div class="pasajero col-md-6" ng-repeat="pax in room.paxList track by $index">
                        <ng-form name="paxForm" class="paxForm">
                           <div class="form-group mb-zero">
                                <label class="control-label text-light" for="agepax"> Edad Pasajero {{1+(1*$index)}}<b>*</b></label>
                                <input class="form-control age" ng-model="pax.age" type="number" id="agepax" name="agepax" required />
                            </div>
                        </ng-form>    
                      </div>
                      <!-- pasajero ends-->
                  </div>

              </div><!-- room end-->
              <div class="text-center">
                <a href="#" ng-click="addRoom()"><i class="fa fa-plus"></i> <strong>agregar habitación</strong></a>
              </div>
            </div>
          <!-- acomodation end -->


      </div>
      <div class="modal-footer">
            <p><strong>2 Pasajeros:</strong>1 Habitación, 2 Adultos</p>
            <button type="button" class="btn btn-block btn-danger" data-dismiss="modal">Aceptar</button>
            <pre>{{roomDistribution | json}}</pre>
      </div>
    </div>
  </div>
