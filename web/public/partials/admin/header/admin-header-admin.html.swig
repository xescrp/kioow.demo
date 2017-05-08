<div class="container">
	<div class="navbar-header">
		<div class="pull-right">
			<button type="button" class="navbar-toggle" ng-click="navcollapse = !navcollapse">
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>

			<div class="navbar-dropdowns pull-right" >
				<!-- dropdown user -->
				<div class="navbar-dropdown-user dropdown item-image pull-right" uib-dropdown>
					<a href="#" class="nav-dd user" uib-dropdown-toggle>
					<span class="ml-b mr-b hidden-xs">{?loginsession.admin.name?}</span>
						<img class="mr-four"
							ng-src="{{getimage(loginsession.admin.images.logo.url, 'avatarm42')}}" 
							data-src2x="{{getimage(loginsession.admin.images.logo.url, 'avatarm42retina')}}"
							alt="admin avatar"
							title="admin avatar" />
								<i class="fa fa-caret-down" ></i>
					</a>
					<ul class="dropdown-menu uib-dropdown-menu">
						<li>
						  <a href="/admin/affiliates" target="_self"> <i class="fa fa-user"></i> Afiliados</a>
						</li>
            <li>
              <a href="/admin/dmcs" target="_self">
                <i class="fa fa-user"></i> DMCs
              </a>
            </li>
            <li>
              <a href="/admin/travelers" target="_self">
                <i class="fa fa-user"></i> Travelers
              </a>
            </li>
						<li class="divider"></li>
            <li>
              <a href="/admin/bookings" target="_self">
                <i class="fa fa-list"></i> Bookings
              </a>
            </li>
            <li>
              <a href="/admin/programs" target="_self">
                <i class="fa fa-list"></i> Programs
              </a>
            </li>
            <li>
              <a href="/admin/queries" target="_self">
                <i class="fa fa-list"></i> Tailor Made (Requests)
              </a>
            </li>
            <li>
              <a href="/admin/billings" target="_self">
                <i class="fa fa-list"></i> Billing
              </a>
            </li>
            <li class="divider"></li>
            <li>
              <a href="/admin/hevents" target="_self">
                <i class="fa fa-list"></i> Eventos
              </a>
            </li>
            <li class="divider"></li>
						<li ng-click="logout()">
							<a href="#">
								<i class="fa fa-sign-out"></i>Salir
							</a>
						</li>
					</ul>
          <sessionswitcher></sessionswitcher>
          <exchanger></exchanger>
          <alerter></alerter>
				</div>
			</div>
		</div>
		<a class="navbar-brand brand-logo" target="_self" href="/">
			<span>{? brand ?}</span>
		</a>
	</div>
</div>

<div class="navbar-main-navigation">
  <div class="container">
    {# nav content, collapsible #}
    <div class="navbar-collapse collapse navbar-inverse-collapse" uib-collapse="!navcollapse">
      <ul class="nav navbar-nav">
        <li ng-class="{ active: isActive('/admin/affiliates')}">
          <a ng-href="/admin/affiliates" target="_self"> Affiliates</a>
        </li>
        <li ng-class="{ active: isActive('/admin/dmcs')}">
          <a ng-href="/admin/dmcs" target="_self"> DMCs</a>
        </li>
        <li ng-class="{ active: isActive('/admin/travelers')}">
          <a ng-href="/admin/travelers" target="_self"> Travelers</a>
        </li>
        <li ng-class="{ active: isActive('/admin/products')}">
          <a ng-href="/admin/programs" target="_self"> Programs</a>
        </li>
        <li class="link-admin" ng-class="{ active: isActive('/admin/bookings')}">
          <a href="/admin/bookings" target="_self"> Bookings</a>
        </li>
        <li class="link-admin" ng-class="{ active: isActive('/admin/queries')}">
          <a href="/admin/queries" target="_self"> Tailor Made</a>
        </li>
        <li class="link-admin" ng-class="{ active: isActive('/admin/billings')}">
          <a href="/admin/billings" target="_self"> Facturación</a>
        </li>
        <li class="link-admin" ng-class="{ active: isActive('/admin/hevents')}">
          <a href="/admin/hevents" target="_self"> Eventos</a>
        </li>
        <li class="link-admin" ng-class="{ active: isActive('/admin/hevents')}">
          <a href="/edit/locations" target="_self"> Destinos</a>
        </li>
        <li class="link-admin" ng-class="{ active: isActive('/admin/hevents')}" title="selecciona moneda">
          <select class="form-control small mt-l ml-l" style=" max-width: 200px;font-size: 12px;height: 29px;">
            <option ng-repeat="curr in loadedcurrencies" ng-value="curr.cc" value="{{curr.cc}}" ng-selected="{{ curr.cc == '{? currentcurrency ?}' }}">
              <span>{{curr.symbol}} - {{curr.cc}}</span> <span class="right">({{curr.name}})</span>
            </option>
          </select>
        </li>
      </ul>

      <ul class="nav navbar-nav pull-right">
        {# https://github.com/paularmstrong/swig/issues/390 #}
        {% set triptagmenu =  "../../menus/triptagmenu.generated.html.swig" %}
        {% include triptagmenu ignore missing %}
        <li ng-class="{ active: isActive('{? brand.path ?}/viaje-a-medida')}">
          <a target="_self" href="{? brand.path ?}/viaje-a-medida">A medida</a>
        </li>
        <li ng-class="{ active: isActive('{? brand.path ?}/viajes')}" ng-controller="buscadorCtrl">
          <a href="{? brand.path ?}/viajes" ng-href="#" ng-click="opencsGenerated(''); $event.stopPropagation();">Multidays</a>
          <div class="hidden" id="destinationsgenerated">
            {% include "../../modals/generated/yto-modal-countryselect-generated.html.swig" ignore missing %}
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>