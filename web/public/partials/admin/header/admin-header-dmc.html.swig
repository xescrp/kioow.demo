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
					<span class="ml-b mr-b hidden-xs">{?loginsession.dmc.company.name?}</span>
						<img class="mr-four"
						ng-src="{{getimage(loginsession.dmc.images.logo.url, 'avatarm42')}}" 
						data-src2x="{{getimage(loginsession.dmc.images.logo.url, 'avatarm42retina')}}"
						alt="dmc avatar" title="dmc avatar">
						<i class="fa fa-caret-down"></i>
					</a>
					<ul class="dropdown-menu uib-dropdown-menu">
						<li>
							<a href="/home" target="_self"> <i class="fa fa-home"></i> Inicio</a>
						</li>
						<li>
							<a href="/edit/account?code={? loginsession.dmc.code ?}&usertype=dmc" target="_self"> <i class="fa fa-user"></i> Cuenta</a>
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
		        <li class="link-admin" ng-class="{ active: isActive('/admin/programs')}">
					<a class="linkpatch" href="/admin/programs" target="_self"> My Programs</a>
				</li>
				<li class="link-admin" ng-class="{ active: isActive('/admin/bookings')}">
					<a class="linkpatch" href="/admin/bookings" target="_self"> My Bookings</a>
				</li>
				<li class="link-admin" ng-class="{ active: isActive('/admin/queries')}">
					<a class="linkpatch" href="/admin/queries" target="_self"> Tailor Made</a>
				</li>
			</ul>
		</div>
	</div>
</div>