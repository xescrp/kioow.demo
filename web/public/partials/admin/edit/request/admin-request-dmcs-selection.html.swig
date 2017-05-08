<div>  
  <h2 class="thin">{{userquery.dmcs.length}} DMC<span ng-show="userquery.dmcs.length > 1">s</span> seleccionados</h2>
</div>

<div>       
  <div class="padded-xl mt-xxl bordered">

    <div class="text-right">
      <button ng-show="selectedDMCs && selectedDMCs.length >0" type="button" ng-click="sendToDMCs()" id="multidaysbutton" class="btn btn-success btn-lg inline-block">Guardar</button>

      <button ng-show="!selectedDMCs || selectedDMCs.length == 0" type="button" ng-click="noSendToDMCs()" id="multidaysbutton" class=" btn btn-danger btn-lg inline-block">Guardar</button>
    </div>
    <hr class="bordered-top"/>
    <div class="row">
      <!-- Candidates -->
      <div class="col-md-6 line-right">  

          <div class="text-center mt-zero bordered-bottom"><h4 class="iblock">Posibles</h4> <span class="h4-sized ml-xs iblock">({{validDMCs.length}})</span></div>
          <section>
            <div class="request-list">
            <a ng-repeat="dmc in validDMCs"
               ng-click="addDmcToList(dmc)"
               ng-show="dmc.membership"
               class="list-group-item item pointer" 
               ng-class="{'waiting' : !dmc.membership.registervalid,
                          'valid' : dmc.membership.registervalid && dmc.membership.publicprofilecomplete && dmc.membership.companyimagescomplete && dmc.membership.companycomplete && dmc.membership.paymentcomplete && dmc.membership.companytaxid && dmc.membership.emergencycomplete,
                          'confirmed' : dmc.membership.registervalid && (!dmc.membership.publicprofilecomplete || !dmc.membership.companyimagescomplete || !dmc.membership.companycomplete || !dmc.membership.paymentcomplete || !dmc.membership.companytaxid || !dmc.membership.emergencycomplete)}"
               ng-include="'/partials/admin/edit/request/dmc-item-list.html.swig'">
              </a>
           </div>
        </section>
      </div>
      <!-- Selection -->
      <div class="col-md-6">  
        <div class="text-center mt-zero bordered-bottom"><h4 class="iblock">Seleccionados </h4><span class="h4-sized ml-xs iblock"> ({{selectedDMCs.length}})</span></div>
        <section>
          <div class="request-list">

          <a ng-repeat="dmc in selectedDMCs"
               ng-click="removeDmcToList(dmc)"
               ng-show="dmc.membership"
               class="list-group-item item pointer" 
               ng-class="{'waiting' : !dmc.membership.registervalid,
                          'valid' : dmc.membership.registervalid && dmc.membership.publicprofilecomplete && dmc.membership.companyimagescomplete && dmc.membership.companycomplete && dmc.membership.paymentcomplete && dmc.membership.companytaxid && dmc.membership.emergencycomplete,
                          'confirmed' : dmc.membership.registervalid && (!dmc.membership.publicprofilecomplete || !dmc.membership.companyimagescomplete || !dmc.membership.companycomplete || !dmc.membership.paymentcomplete || !dmc.membership.companytaxid || !dmc.membership.emergencycomplete)}"
               ng-include="'/partials/admin/edit/request/dmc-item-list.html.swig'">
              </a>
            </div>
          </section>
      </div>
    </div>
    
  </div>
</div>