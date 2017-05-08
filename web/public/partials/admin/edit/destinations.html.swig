<div class="container" ng-controller="EDITDestinationsCtrl">
<div class="row">
        <div class="col-md-9">
            <ul class="breadcrumb">
                <li><a href="/" target="_self" class="notranslate">Home</a></li>
                <li class="active notranslate">Destinations</li>
            </ul>
        </div>
        <div class="col-md-3" ng-show="categoryEditingVisible">
        </div>
</div>

  <div class="row no-print mb-xxl">
    <div class="page-header">
      <h1>
        Mantenimiento de Destinos
        <small class="text-xs ng-binding">Zonas/Paises/Ciudades</small>
      </h1>
    </div>
    <div class="row mb-xxl">
      <div class="col-md-4 mt-xl">
        <button class="btn btn-danger" ng-click="updatepopup()"> Actualizar busqueda destinos</button>
      </div>
      <div class="col-md-8">
        <div ng-include="destinationspopupurl">
          
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12" >
        <div id="map" name="googlemap" style="height: 200px;"></div>
      </div>
    </div>
    <hr />
    <div class="row">
      <div class="col-md-4">
        <h4>Zonas ({{destinations.zones.length}})</h4> 
      </div>
      <div class="col-md-4">
        <h4>Paises ({{zonecountries.length}})</h4> 
      </div>
      <div class="col-md-4">
        <h4>Ciudades ({{countrycities.length}})</h4> 
      </div>
    </div>
    
    <div class="row">
          <div class="col-md-4">
            <table class="table table-striped table-hover table-results table-results-admin">
              <thead>
                <tr></tr>
              </thead>
              <tbody>
                <tr ng-repeat="zone in destinations.zones" ng-click="pointonmap(zone.label_es, 'zone'); loadzone(zone); getcountries(zone);">
                  <td>{{zone.label_es}}</td>
                  <td>{{zone.title_es}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-md-4" style="overflow-y: scroll; height: 308px;">
            <table class="table table-striped table-hover table-results table-results-admin" >
              <thead>
                <tr></tr>
              </thead>
              <tbody>
                <tr ng-repeat="country in zonecountries" ng-click="pointonmap(country.label_es, 'country', 5, country.location); loadcountry(country); getcities(country);">
                  <td>{{country.label_es}}</td>
                  <td>{{country.slug.toUpperCase()}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-md-4" style="overflow-y: scroll; height: 308px;">
            <table class="table table-striped table-hover table-results table-results-admin" style="overflow-y: scroll; height: 308px;">
              <thead>
                <tr></tr>
              </thead>
              <tbody>
                <tr ng-repeat="city in countrycities" ng-click="pointonmap(city.label_es, 'city', 8, city.location); loadcity(city);">
                  <td>{{city.label_es}}</td>
                  <td>{{city.country.label_es}}</td>
                </tr>
              </tbody>
            </table>
          </div>
    </div>

    <hr />
    <div class="row">
      <div class="col-md-4">
        <!-- Zona -->
        <form class="step-sf well bg-light">
          <div class="row">
            <div class="col-md-6">
              <h4>Zona</h4>
            </div>
            <div class="col-md-6 text-right mt-xs">
              <a href="" uib-tooltip="Usa este boton para despejar los campos e introducir los nuevos datos para la nueva zona" class="btn btn-xs" ng-click="addnewzone()">Añadir Nueva Zona</a>
            </div>
          </div>
          <div class="row">
            <div class="form-group col-md-12" >
              <label class="control-label" >
                <i class="fa fa-exclamation-circle text-brand-danger"></i> slug <b>*</b>
              </label>
              <input class="form-control" ng-model="selectedzone.slug" type="text" id="namesf" name="namesf" required="" />
            </div>
          </div>
          <div class="row">
            <div class="form-group col-md-12" >
              <label class="control-label" >
                <i class="fa fa-exclamation-circle text-brand-danger"></i> Nombre (ES) <b>*</b>
              </label>
              <input class="form-control" ng-model="selectedzone.label_es" type="text" id="namesf" name="namesf" required="" />
            </div>
          </div>
          <div class="row">
            <div class="form-group col-md-12" >
              <label class="control-label" >
                <i class="fa fa-exclamation-circle text-brand-danger"></i> Nombre (EN) <b>*</b>
              </label>
              <input class="form-control" ng-model="selectedzone.label_en" type="text" id="namesf" name="namesf" required="" />
            </div>
          </div>
          <div class="row">
            <div class="form-group col-md-12" >
              <label class="control-label" >
                <i class="fa fa-exclamation-circle text-brand-danger"></i> Titulo (ES) <b>*</b>
              </label>
              <input class="form-control" ng-model="selectedzone.title_es" type="text" id="namesf" name="namesf" required="" />
            </div>
          </div>
          <div class="row">
            <div class="form-group col-md-12" >
              <label class="control-label" >
                <i class="fa fa-exclamation-circle text-brand-danger"></i> Titulo (EN) <b>*</b>
              </label>
              <input class="form-control" ng-model="selectedzone.title_en" type="text" id="namesf" name="namesf" required="" />
            </div>
          </div>
          <div class="row">
            <div class="form-group col-md-12" >
              <label class="control-label" >
                <i class="fa fa-exclamation-circle text-brand-danger"></i> Orden <b>*</b>
              </label>
              <input class="form-control" ng-model="selectedzone.sortOrder" type="text" id="namesf" name="namesf" required="" />
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 text-right">
            </div>
            <div class="col-md-6 text-right">
              <a href="" class="btn btn-success btn-xs" ng-click="savezone()"> Guardar</a>
            </div>
          </div>
        </form>
      </div>
      <div class="col-md-4">
        <!-- Pais -->
        <form class="step-sf well bg-light">
          <div class="row">
            <div class="col-md-6">
              <h4>Pais</h4>
            </div>
            <div class="col-md-6 text-right mt-xs">
              <a href="" uib-tooltip="Usa este boton para despejar los campos e introducir los nuevos datos para el nuevo pais. Debes seleccionar una zona previamente" class="btn btn-xs" ng-click="addnewcountry()">Añadir Nuevo pais</a>
            </div>
          </div>
          <div class="row">
            <div class="form-group col-md-12" >
              <label class="control-label" >
                <i class="fa fa-exclamation-circle text-brand-danger"></i> Zona <b>*</b>
              </label>
              <input disabled="" class="form-control" style="text-transform: lowercase;" ng-model="selectedcountry.zone.label_es" type="text"  />
            </div>
          </div>
          <div class="row">
            <div class="form-group col-md-12" >
              <label class="control-label" >
                <i class="fa fa-exclamation-circle text-brand-danger"></i> Codigo pais <b>*</b>
              </label>
              <input class="form-control" style="text-transform: lowercase;" ng-model="selectedcountry.slug" type="text" required="" />
            </div>
          </div>
          <div class="row">
            <div class="form-group col-md-12" >
              <label class="control-label" >
                <i class="fa fa-exclamation-circle text-brand-danger"></i> Nombre (ES) <b>*</b>
              </label>
              <input class="form-control" ng-model="selectedcountry.label_es" type="text"  required="" />
            </div>
          </div>
          <div class="row">
            <div class="form-group col-md-12" >
              <label class="control-label" >
                <i class="fa fa-exclamation-circle text-brand-danger"></i> Nombre (EN) <b>*</b>
              </label>
              <input class="form-control" ng-model="selectedcountry.label_en" type="text" required="" />
            </div>
          </div>
          <div class="row">
            <div class="form-group col-md-12" >
              <label class="control-label" >
                <i class="fa fa-exclamation-circle text-brand-danger"></i> Titulo (ES) <b>*</b>
              </label>
              <input class="form-control" ng-model="selectedcountry.title_es" type="text"  required="" />
            </div>
          </div>
          <div class="row">
            <div class="form-group col-md-12" >
              <label class="control-label" >
                <i class="fa fa-exclamation-circle text-brand-danger"></i> Titulo (EN) <b>*</b>
              </label>
              <input class="form-control" ng-model="selectedcountry.title_en" type="text"  required="" />
            </div>
          </div>
          <div class="row">
            <div class="form-group col-md-6" >
              <label class="control-label" >
                <i class="fa fa-exclamation-circle text-brand-danger"></i> latitud <b>*</b>
              </label>
              <input class="form-control" ng-model="selectedcountry.location.latitude" type="number" id="namesf" name="namesf" required="" />
            </div>
          </div>
          <div class="row">
            <div class="form-group col-md-6" >
              <label class="control-label" >
                <i class="fa fa-exclamation-circle text-brand-danger"></i> latitud <b>*</b>
              </label>
              <input class="form-control" ng-model="selectedcountry.location.longitude" type="number"  required="" />
            </div>
            <div class="col-md-6">
              <a href="#googlemap" ng-click="fromgooglemaps(selectedcountry.label_en, selectedcountry)">coordenadas gmaps</a>
            </div>
          </div>
          <div class="row">
            <div class="form-group col-md-12" >
              <label class="control-label" >
                <i class="fa fa-exclamation-circle text-brand-danger"></i> Descripcion (ES) <b>*</b>
              </label>
              <textarea class="form-control" rows="13" ng-model="selectedcountry.description_es"  required="" ></textarea>
            </div>
          </div>
          <div class="row">
            <div class="form-group col-md-12" >
              <label class="control-label" >
                <i class="fa fa-exclamation-circle text-brand-danger"></i> Descripcion (EN) <b>*</b>
              </label>
              <textarea class="form-control" rows="13" ng-model="selectedcountry.description_en"  required="" ></textarea>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 text-right">
              <a href="" class="btn btn-success btn-xs" ng-click="getproductbycountry()"> Ver producto</a>
            </div>
            <div class="col-md-6 text-right">
              <a href="" class="btn btn-success btn-xs" ng-click="savecountry()"> Guardar</a>
            </div>
          </div>
        </form>
      </div>
      <div class="col-md-4">
        <!-- Ciudad -->
        <form class="step-sf well bg-light">
          <div class="row">
            <div class="col-md-6">
              <h4>Ciudad</h4>
            </div>
            <div class="col-md-6 text-right mt-xs">
              <a href="" uib-tooltip="Usa este boton para despejar los campos e introducir los nuevos datos para la nueva ciudad. Debes seleccionar un pais previamente" class="btn btn-xs" ng-click="addnewcity()">Añadir Nueva ciudad</a>
            </div>
            </div>
          <div class="row">
            <div class="form-group col-md-12" >
              <label class="control-label" >
                <i class="fa fa-exclamation-circle text-brand-danger"></i> Codigo pais <b>*</b>
              </label>
              <input disabled class="form-control" style="text-transform: lowercase;" ng-model="selectedcity.countrycode" type="text"  />
            </div>
          </div>
          <div class="row">
            <div class="form-group col-md-12" >
              <label class="control-label" >
                <i class="fa fa-exclamation-circle text-brand-danger"></i> Nombre (ES) <b>*</b> 
                <i class="fa fa-info-circle text-danger" uib-tooltip="En este pais ya hay otra ciudad con este mismo nombre(ES)" ng-show="_repeatedlabel_es(selectedcity.label_es, selectedcity._id)"></i>
              </label>
              <input class="form-control" ng-model="selectedcity.label_es" type="text"  required="" />
            </div>
          </div>
          <div class="row">
            <div class="form-group col-md-12" >
              <label class="control-label" >
                <i class="fa fa-exclamation-circle text-brand-danger"></i> Nombre (EN) <b>*</b> 
                <i class="fa fa-info-circle text-danger" uib-tooltip="En este pais ya hay otra ciudad con este mismo nombre(EN)" ng-show="_repeatedlabel_en(selectedcity.label_en, selectedcity._id)"></i>
              </label>
              <input class="form-control" ng-model="selectedcity.label_en" type="text" required="" />
            </div>
          </div>
          <div class="row">
            <div class="form-group col-md-6" >
              <label class="control-label" >
                <i class="fa fa-exclamation-circle text-brand-danger"></i> latitud <b>*</b>
              </label>
              <input class="form-control" ng-model="selectedcity.location.latitude" type="number" id="namesf" name="namesf" required="" />
            </div>
            <div class="col-md-6">
              <a href="#googlemap" ng-click="fromgooglemaps(selectedcity.label_en, selectedcity)"> coordenadas gmaps</a>
            </div>
          </div>
          <div class="row">
            <div class="form-group col-md-6" >
              <label class="control-label" >
                <i class="fa fa-exclamation-circle text-brand-danger"></i> latitud <b>*</b>
              </label>
              <input class="form-control" ng-model="selectedcity.location.longitude" type="number"  required="" />
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 text-right">
              <a href="" class="btn btn-success btn-xs" ng-click="getproductbycity()"> Ver producto</a>
            </div>
            <div class="col-md-4 text-right">
              <a href="" class="btn btn-success btn-xs" ng-click="removeitem('city', selectedcity)"> Eliminar</a>
            </div>
            <div class="col-md-4 text-right">
              <a href="" class="btn btn-success btn-xs" ng-click="savecity()"> Guardar</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="row no-print mb-xxl">
    <h2>Programs Related to this {{selectedrelatedprogramsby}} </h2>
    <h4 ng-hide="recoveredprograms.length > 0">No hay programas cargados en este destino, o refresque esta busqueda.</h4>
    <table class="table table-striped table-hover table-results table-results-admin" ng-show="recoveredprograms.length > 0" >
      <thead>
        <tr style="font-weight: bold;">
          <td></td>
          <td>save as</td>
          <td>titulo (ES)</td>
          <td>titulo (EN)</td>
          <td>codigo</td>
          <td>status</td>
          <td>noches en</td>
          <td>visitando</td>
        </tr>
      </thead>
      <tbody class="bg-light">
        <tr class="pointer"
            ng-repeat="program in recoveredprograms"
            ng-click="editprogram(program)">
          <td>
            <img class="mb-xs" ng-src="{{imageproductstretchreal70(program.productimage.url)}}" />
          </td>
          <td>
            {{ program.name }}
          </td>
          <td>
            {{ program.title }}
            <span class="text-light" ng-if="program.categoryname != null">{{ program.categoryname.label_en }}</span>
          </td>
          <td>
            {{ program.title_es }}
            <span class="text-light" ng-if="program.categoryname != null">{{program.categoryname.label_es }}</span>
          </td>
          <td>
            {{ program.code }}
          </td>
          <td>
            {{ program.publishState }}
          </td>
          <td>
            {{ printCities(program) }}
          </td>
          <td>
            {{ printStops(program) }}
          </td>
        </tr>
      </tbody>
    </table>
   </div>
  
</div>