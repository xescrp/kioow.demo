<!-- partial buscadordestino.html -->
<section id="buscador-destino-wrap" ng-show="!buscadorcollapsed" class="buscador-destino-wrap relative {% if needscountrylanding || needstaglanding || needscitylanding %}landingstyle{% endif %}" ng-controller="buscadorCtrl">
      
  <div class="container max-center-xs">
    <div class="buscador-destino text-center"> 
      <form class="form-inline relative" role="form">
        <div class="input-group input-city bg-light">
          <label class="sr-only" for="select-city">¿Dónde quieres viajar?</label>
          
          <input type="text" ng-focus="searchwarn = false" tabindex="9" 
                 ng-model="selecteditem.name" uib-typeahead="item as item.name for item in destinations() | filter:$viewValue | limitTo:8"  
                 typeahead-on-select='onSelect($item, $model, $label)' id="select-city"  
                 class="form-control input-city bg-light" placeholder="¿Dónde quieres viajar?" {% if searchfocus %}autofocus{% endif %} autocomplete="off" />

          
          <!-- <div ng-show="selcity">Selection from a modal: {{ selcity }}</div> -->
          {# ng-click="opencountryselect('lg')" #}
         
          <span class="input-group-btn">
            <button type="button" class="btn bg-light" ng-click="{% if brand %}opencsGenerated(''){% else %}opencsGenerated('lg'){% endif %}"><i class="fa fa-bars"></i></button>
          </span>
        </div>

        <div class="input-group input-date bg-light" id="monthdropdown"  uib-dropdown>
          <label class="sr-only" for="mes">Mes</label>
          
          <input tabindex="10" type="text" ng-focus="searchwarn = false" class="form-control bg-light"
                 ng-model="monthselector" placeholder="Mes" uib-typeahead="month as month.name for month in nextmonths | filter:$viewValue | limitTo:8" />

          <div class="dropdown input-group-btn" >
              <button type="button" class="btn dropdown-toggle bg-light" uib-dropdown-toggle><i class="fa fa-bars"></i></button>
          </div>
          <ul class="uib-dropdown-menu pull-rigth" role="menu"  aria-labelledby="monthdropdown">
            <li ng-repeat="month in nextmonths track by $index">
              <a href="#" ng-click="selectMonth(month)">{{month.name}}</a>
            </li>
          </ul>
        </div>


        <button type="submit" tabindex="11" ng-click="jumptosearch()" class="btn btn-danger buscador-destino-submit input-group input-date"><i class="fa fa-search"></i> Buscar</button>
        
        <a href="{? brand.path ?}/viaje-a-medida" class="link-softened bold link-taylormade" target="_self">o pide tu viaje a medida</a>

        <div ng-init="searchwarn = false" class="searchwarn padded-l text-left ng-hide" ng-show="searchwarn" style="max-width: 300px; position: absolute; width: 100%;" ng-cloak>
          <div class="relative">
            <a href="#" class="link-wrapper" ng-click="searchwarn = false"><span class="fa fa-times pull-right"></span></a>
            <p class="text-light mb-zero"><strong>Hey, busca un destino disponible!</strong></p>
          </div>
        </div>



      </form>
    </div>
  </div>

  <div class="preloader-partial-blanket in ng-hide" ng-show="searchbtnloading">
      <div class="preloader alt-color">
        <span></span><span></span><span></span>
      </div>
  </div>

  <script type="text/javascript">
  var searchdate = {? search.date | json | safe ?}
  </script>
          
</section>


