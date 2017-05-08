<div class="container">
	<div class="navbar-header">
		<button type="button" class="navbar-toggle" ng-click="navcollapse = !navcollapse"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button>
		<!-- duplicate user related -->
		<div class="navbar-dropdowns pull-right">
		
			<div class="nav navbar-nav mt-l mr-b padded-b bg-light user-related hidden-sm  hidden-xs">
              <span
              class="h4-sized hidden-xs hidden-sm bold nav-phone text-alternate iblock pointer"
              popover-animation="false"
              popover-placement="bottom"
              popover-trigger="mouseenter"
              uib-popover="Lunes a Viernes de 10:00 a 19:00 hrs y Sábados de 11:00 a 13:30 hrs.">
                <i class="fa fa-phone"></i>&nbsp; 971 902 473
              </span>
            </div>

			<a class="navbar-link reg-link pointer ml-xl" onclick="triggerPopup()">Acceder</a>
			<a onclick="triggerPopup()" data-toggle="modal" target="_self" class="btn btn-primary navbar-btn">Regístrate</a>
		</div>
		<a class="navbar-brand brand-logo" target="_self" href="/"><span>yourttoo.com</span></a>
	</div>
</div>
<div class="navbar-public-navigation">
	<div class="container">
		<div class="navbar-collapse collapse navbar-responsive-collapse" uib-collapse="!navcollapse">
			<ul class="nav navbar-nav">
				<li ng-class="{ active: isActive('/pagina/ventajas-agencia')}"><a target="_self" href="/pagina/ventajas-agencia" class="bold">Ventajas</a></li>
				<li ng-class="{ active: isActive('/pagina/programas-multidays')}"><a target="_self" href="/pagina/programas-multidays" class="bold">Multidays</a></li>
				<li ng-class="{ active: isActive('/pagina/viajes-a-medida')}"><a target="_self" href="/pagina/viajes-a-medida" class="bold">A Medida</a></li>
				<li ng-class="{ active: isActive('/pagina/receptivos')}"><a target="_self" href="/pagina/receptivos" class="bold">Receptivos</a></li>
				<li ng-if="isActive('/pagina/receptivos') ||  isActive('/pagina/viajes-a-medida') || isActive('/pagina/programas-multidays') || isActive('/pagina/ventajas-agencia') || isActive('/pagina/soluciones-de-distribucion')" ng-class="{ active: isActive('/pagina/soluciones-de-distribucion')}"><a target="_self" href="/pagina/soluciones-de-distribucion" class="bold">Soluciones de Distribución</a></li>
			</ul>
		</div>
	</div>
</div>

