{# toggle button, dropdowns and logo #}
<div class="container">
	<div class="navbar-header">
		<div class="pull-right">
			<button type="button" class="navbar-toggle" ng-click="navcollapse = !navcollapse">
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<div class="navbar-dropdowns pull-right">
				<!-- dropdown user -->
				{# Just nav phone number #}
				<div class="nav navbar-nav mt-xs mr-b padded-b bg-light user-related hidden-sm hidden-xs">
	              <span
	              class="h4-sized hidden-xs hidden-sm bold nav-phone text-alternate iblock pointer"
	              popover-animation="false"
	              popover-placement="bottom"
	              popover-trigger="mouseenter"
	              uib-popover="{?- brand.contactschedule -?}">
	                &nbsp;<i class="fa fa-phone"></i>&nbsp; {?- brand.contactphone -?}<br>
	                 <i class="fa fa-envelope"></i>&nbsp; {?- brand.contactemail -?}
	              </span>
	            </div>
				<div class="navbar-dropdown-user dropdown item-image pull-right"  uib-dropdown>
					<a href="#" class="nav-dd user navbar-link reg-link pointer" uib-dropdown-toggle>
					<span class="ml-b mr-b hidden-xs">{?loginsession.affiliate.company.name?}</span>
						<img class="mr-four"
						ng-src="{{getimage(loginsession.affiliate.images.logo.url, 'avatarm42')}}" 
						data-src2x="{{getimage(loginsession.affiliate.images.logo.url, 'avatarm42retina')}}"
						alt="affiliate avatar" title="affiliate avatar">
						<i class="fa fa-caret-down"></i>
					</a>
					<ul class="dropdown-menu uib-dropdown-menu">
						<li>
							<a href="/home" target="_self"> <i class="fa fa-home"></i> Inicio</a>
						</li>
						<li>
							<a href="/edit/account?code={? loginsession.affiliate.code ?}&usertype=affiliate" target="_self"> <i class="fa fa-user"></i> Cuenta</a>
						</li>
						<li class="divider"></li>
						<li>
							<a href="/admin/bookings" target="_self">Mis Reservas</a>
						</li>
						<li>
							<a href="/admin/queries" target="_self">Mis Presupuestos</a>
						</li>
						<li class="divider"></li>
						<li ng-click="logout()">
							<a href="#">
								<i class="fa fa-sign-out"></i>Salir
							</a>
						</li>
					</ul>
					<sessionswitcher></sessionswitcher>
				</div>

				{# Nav phone LINK only visible on tablets and phones #}
				<div class="nav navbar-nav pull-right mr-zero visible-xs visible-sm pt-b">
					<div class="iblock h3-padded-nav"> 
						<a href="tel:+34{?brand.contactphone?}">
							<i class="fa fa-phone"></i>
						</a>
					</div>
				</div>
			</div>
		</div>
		<a class="navbar-brand brand-logo" target="_self" href="/home">
			<span>{? brand.name ?}</span>
		</a>
	</div>
</div>
<div class="navbar-main-navigation">
	<div class="container">
		{# nav content, collapsible #}
		<div class="navbar-collapse collapse navbar-inverse-collapse" uib-collapse="!navcollapse">
			<ul class="nav navbar-nav">
				<li ng-class="{ active: isActive('/viajes')}" ng-controller="buscadorCtrl">
					<a href="/viajes" ng-href="#" ng-click="opencsGenerated(''); $event.stopPropagation();">Multidays</a>
					<div class="hidden" id="destinationsgenerated">
		            {% include "../../modals/generated/yto-modal-countryselect-generated.html.swig" ignore missing %}
		          </div>
				</li>
				{# https://github.com/paularmstrong/swig/issues/390 #}
		        {% set triptagmenu =  "../../menus/generated/triptagmenu.generated.html.swig" %}
		        {% include triptagmenu ignore missing %}
				<li ng-class="{ active: isActive('/viaje-a-medida')}">
					<a target="_self" href="/viaje-a-medida">A medida</a>
				</li>
		        <li class="link-admin" ng-class="{ active: isActive('/admin/bookings')}">
					<a href="/admin/bookings" target="_self"> Mis Reservas</a>
				</li>
				<li uib-dropdown on-toggle="toggled(open)" ng-class="{ active: isActive('/admin/queries') || isActive('/admin/budgets')}" 
					ng-mouseleave="hideSubMenu($event, 'menu-budgets')" class="link-admin">
					<a href="#" ng-mouseover="showSubMenu($event, 'menu-budgets')" id="menu-budgets-dropdown" uib-dropdown-toggle title="" target="_self">Mis Presupuestos<b class="caret"></b></a>
					<ul class="uib-dropdown-menu" aria-labelledby="menu-budgets-dropdown" id="menu-budgets">
						<li><a href="/admin/queries" target="_self"> A medida</a></li>
						<li><a href="/admin/budgets" target="_self"> Multidays</a></li>  	
					</ul>
				</li>
				<li class="link-admin" ng-class="{ active: isActive('/admin/billing')}">
					<a href="/admin/billings" target="_self"> Facturación</a>
				</li>
			</ul>
		</div>
	</div>
</div>