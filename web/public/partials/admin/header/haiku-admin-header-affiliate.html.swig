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
	              <span class="h4-sized hidden-xs hidden-sm bold nav-phone text-alternate iblock pointer">
	                &nbsp;<i class="fa fa-phone"></i>&nbsp; 943 100 995<br>
	                 <i class="fa fa-envelope"></i>&nbsp; reservas@haikutravel.es
	              </span>
	            </div>

				{# Nav phone LINK only visible on tablets and phones #}
				<div class="nav navbar-nav pull-right mr-zero visible-xs visible-sm pt-b">
					<div class="iblock h3-padded-nav"> 
						<a href="tel:+34 943 100 995">
							<i class="fa fa-phone"></i>
						</a>
					</div>
				</div>
			</div>
		</div>
		<a class="navbar-brand brand-logo" target="_self" href="{?path?}/inicio">
			<span>{? name ?}</span>
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
			</ul>
		</div>
	</div>
</div>