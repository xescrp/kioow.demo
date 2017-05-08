<h4 class="text-alternate iblock">Campos de control</h4>
  <fieldset>
  <div class="form-inline">
        <label class="checkbox-inline">
          <input ng-model="local.membership.registervalid" type="checkbox" id="registervalid"> Usuario Válido
        </label>
        <div class="form-group ml-l">
          <label class="control-label" for="omtmargin">Margen: </label>
            <div class="input-group ml-b">
              <input class="form-control in" ng-model="local.membership.omtmargin" name="omtmargin" id="omtmargin" placeholder="0" type="text" required="" style="">
              <span class="input-group-addon" style="border-left: 1px solid">%</span>
            </div>
        </div>
<!-- old grupos de gestion <div class="form-group ml-l">
            <label class="control-label mr-b" for="gestionGroup">Grupo de gestión: </label>
            <div class="input-group">
              <select class="form-control" name="gestionGroup" ng-model="groupSelect">             
                <option ng-repeat="gestionGroup in mGroups | orderBy: 'label'">{{gestionGroup.name}}</option>
              </select>   
            </div>
        </div> -->
         <label class="control-label ml-b">Fecha de registro : {{affiliate.createdOn |date:'dd-MM-yyyy'}}</label>
        
   </div>
   <label class="control-label" for="comments">Comentarios</label>
   <textarea class="form-control" name="comments" id="comments" ng-model="local.omtcomment"></textarea>
        <button class="btn btn-primary mt-l ml-xl pull-right" ng-click="updateStatusAffiliate()">guardar</button>
        <a class="btn btn-success mt-l ml-xl pull-right" target="_self" href="{{brandpath}}/billing?affiliatecode={{affiliate._id}}">Estatus Facturación</a>
  </fieldset>

