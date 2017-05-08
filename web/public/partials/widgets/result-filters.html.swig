{% spaceless %}
<aside class="col-md-3 col-sm-6 col-xs-6 sidebar-offcanvas" id="sidebar" role="navigation">
	{# <header class="mb-l hidden-sm hidden-xs"> #}
	{# <p class="thin iblock h2 mt-zero mb-b pb-xs" id="test"
	popover-placement="right" popover="Utiliza los filtros para afinar tu búsqueda" popover-trigger="show"
	>Filtrar por </p> #}
	{#
	<button class="ml-b padded-b middle mb-b btn btn-default btn-xs"><i class="fa fa-times text-gray"></i></button> 
	<a href="#" ng-click="resetFilter()" class="btn btn-link">Reset</a>
	#}
	{# </header> #}
	<p class="mt-zero bg-darkblue padded-l" ng-if="hasFilterActives">
	<span class="invert-text">
	Filtros activos
	</span>
	<a ng-click ="clearFilters()" class="link-softened pointer bold">Limpiar Filtros </a>
	</p>

	<div class="filters bg-light well">
		<div class="relative">
			<div class="filter-box">
				<h4 style="text-transform: none;" >Conoces el nombre del programa?</h4>
				<input tabindex="10" type="text" ng-focus="searchwarn = false" class="form-control bordered bg-light"
					 ng-model="likesearchinput" placeholder="Introduce el nombre del programa"  />
			</div>
			<a ng-href="" class="btn btn-block btn-primary mb-l mt-l" 
				ng-click="likesearch()" >buscar</a>
		</div>
	</div>

    <div class="filters bg-light well">
		<div class="relative">
			<div class="popover top absolute popover-filter ng-hide" ng-show="disabledFilter()">
			  <div class="arrow"></div>
			  <div class="popover-inner">
			      <div class="popover-content">Debes seleccionar al menos una actividad o país</div>
			  </div>
			</div>
			<a ng-href="" class="btn btn-block btn-primary mb-xl" 
			ng-click="sendFilters()" ng-class="{'disabled' : disabledFilter()}">filtrar</a>
		</div> 

		<div class="filter-box">
			<h4 class="mb-zero">
			  <a ng-init="pricecollapse = false" class="link-wrapper filter-toggle" ng-click="pricecollapse = !pricecollapse">
				<i class="fa fa-caret-right" ng-class="{'fa-caret-right' : pricecollapse, 'fa-caret-down' : !pricecollapse }"></i>
			  Precio</a>
			</h4>
			<div class="filter-collapse pt-l pl-b pr-b" id="pricetripform" ng-show="!pricecollapse" ng-form="pricetripform">
				<span>{{sliderMinPrice | number}}€</span> 
				<span class="pull-right">{{sliderMaxPrice | number}}€</span>
				<input id="priceSlider" type="text" value=""/>
			</div>
			<hr />
		</div>

		<!-- .filter box - duracion  -->
		<div class="filter-box">
		  <h4 class="mb-zero">
			<a ng-init="durationcollapse = false" class="link-wrapper filter-toggle" ng-click="durationcollapse = !durationcollapse">
				<i class="fa fa-caret-right" ng-class="{'fa-caret-right' : durationcollapse, 'fa-caret-down' : !durationcollapse }"></i>
				Duración
			</a>
		  </h4>
		  	<div class="filter-collapse pt-l pl-b pr-b" id="durartiontripform" ng-show="!durationcollapse" ng-form="durartiontripform">
			  	<span>{{sliderMinDay}} días</span> 
				<span class="pull-right">{{sliderMaxDay}} días</span>
				<input id="durationSlider" type="text" value=""/>
			</div>
			<hr />
		</div>
		<!-- .filter-box - duracion - ends -->

		<!-- filter box - kindtrip -->
		<div class="filter-box">
		    <h4>
				<a ng-init="kindtripcollapse = true" class="link-wrapper filter-toggle" ng-click="kindtripcollapse = !kindtripcollapse">
				<i class="fa fa-caret-right" ng-class="{'fa-caret-right' : kindtripcollapse, 'fa-caret-down' : !kindtripcollapse }"></i>
				Tipo de viaje
				</a>
		    </h4>
		    <div class="filter-collapse" id="kindtripform" ng-if="!kindtripcollapse" ng-form="kindtripform">
		      <div class="filter" ng-repeat="tag in filtersList.kindtrip">
                <input type="checkbox" name="{{ tag.label }}" id="{{ tag.label }}" checklist-model="filtersProduct.kindtrip"  checklist-value="tag.slug"/>
                <label title="{{ tag.label }}" for="{{ tag.label }}">
                  {{ tag.label }}
                  <i class="fa fa-check pull-right"></i>
                  <i class="fa hidden fa-times pull-right"></i>
                </label>
              </div>
		    </div> <!-- kindtripcollapse ends -->
			<hr>
		</div>
		<!-- .filter-box - kindtrip - ends -->

		<!-- .filter box - category  -->
        <div class="filter-box">
			<h4>
			<a ng-init="categorycollapse = true" class="link-wrapper filter-toggle" ng-click="categorycollapse = !categorycollapse">
			  <i class="fa fa-caret-right" ng-class="{'fa-caret-right' : categorycollapse, 'fa-caret-down' : !categorycollapse }"></i>
			  Categoría
			</a>
			</h4>
			<div ng-if="!categorycollapse">
				<div class="filter-collapse">
				  <div class="filter" ng-repeat="tag in filtersList.hotelcats">
				    <input type="checkbox" name="{{ tag.label }}" id="{{ tag.label }}" checklist-model="filtersProduct.hotelcats"  checklist-value="tag.slug"/>
				    <label title="{{ tag.label }}" for="{{ tag.label }}">
				      {{ tag.label }}
				      <i class="fa fa-check pull-right"></i>
				      <i class="fa hidden fa-times pull-right"></i>
				    </label>
				  </div>
				</div>
			</div><!-- categorycollapse ends -->
			<hr>
        </div>
        <!-- .filter-box - category - ends -->

		<!-- .filter-box - operationdayscollapse days -->
		<div class="filter-box">
			<h4>
			<a ng-init="operationdayscollapse = true" class="link-wrapper filter-toggle" ng-click="operationdayscollapse = !operationdayscollapse">
			  <i class="fa fa-caret-right" ng-class="{'fa-caret-right' : operationdayscollapse, 'fa-caret-down' : !operationdayscollapse }"></i>
			  Dias de operacion
			</a>
			</h4>
			<div ng-if="!operationdayscollapse">
				<div class="filter-collapse">
				  <div class="filter" ng-repeat="weekday in filtersList.weekdays">
				    <input type="checkbox" name="{{ weekday }}" id="{{ weekday }}" checklist-model="filtersProduct.operationdays"  checklist-value="weekday"/>
				    <label title="{{ weekday }}" for="{{ weekday }}">
				      {{ weekday }}
				      <i class="fa fa-check pull-right"></i>
				      <i class="fa hidden fa-times pull-right"></i>
				    </label>
				  </div>
				</div>
			</div><!-- operationdayscollapse ends -->
			<hr>
        </div>
		<!-- .filter-box - operation days ends! -->

		<!-- .filter box - regimen  -->
        <div class="filter-box">
			<h4>
			<a ng-init="regimencollapse = true" class="link-wrapper filter-toggle" ng-click="regimencollapse = !regimencollapse">
			  <i class="fa fa-caret-right" ng-class="{'fa-caret-right' : regimencollapse, 'fa-caret-down' : !regimencollapse }"></i>
			  Régimen Alimenticio
			</a>
			</h4>
			<div ng-if="!regimencollapse">
				<div class="filter-collapse">
				  <div class="filter" ng-repeat="tag in filtersList.regimen">
				    <input type="checkbox" name="{{ tag.label }}" id="{{ tag.label }}" checklist-model="filtersProduct.tags"  checklist-value="tag.slug"/>
				    <label title="{{ tag.label }}" for="{{ tag.label }}">
				      {{ tag.label }}
				      <i class="fa fa-check pull-right"></i>
				      <i class="fa hidden fa-times pull-right"></i>
				    </label>
				  </div>
				</div>
			</div><!-- regimencollapse ends -->
			<hr />
        </div>
        <!-- .filter-box - regimen - ends -->

		<!-- .filter box - language  -->
        <div class="filter-box">
			<h4>
			<a ng-init="languagecollapse = true" class="link-wrapper filter-toggle" ng-click="languagecollapse = !languagecollapse">
			  <i class="fa fa-caret-right" ng-class="{'fa-caret-right' : languagecollapse, 'fa-caret-down' : !languagecollapse }"></i>
			  Idiomas Guías
			</a>
			</h4>
			<div ng-if="!languagecollapse">
				<div class="filter-collapse">
				  <div class="filter" ng-repeat="tag in filtersList.guidelanguages">
				    <input type="checkbox" name="{{ tag.label }}" id="{{ tag.label }}" checklist-model="filtersProduct.tags"  checklist-value="tag.slug"/>
				    <label title="{{ tag.label }}" for="{{ tag.label }}">
				      {{ tag.label }}
				      <i class="fa fa-check pull-right"></i>
				      <i class="fa hidden fa-times pull-right"></i>
				    </label>
				  </div>
				</div>
			</div><!-- languagecollapse ends -->
			<hr />
        </div>
        <!-- .filter-box - language - ends -->

		<!-- .filter box - kindtraveler  -->
        <div class="filter-box">
			<h4>
			<a ng-init="kindtravelercollapse = true" class="link-wrapper filter-toggle" ng-click="kindtravelercollapse = !kindtravelercollapse">
			  <i class="fa fa-caret-right" ng-class="{'fa-caret-right' : kindtravelercollapse, 'fa-caret-down' : !kindtravelercollapse }"></i>
			  Tipo de Viajeros
			</a>
			</h4>
			<div ng-if="!kindtravelercollapse">
				<div class="filter-collapse">
				  <div class="filter" ng-repeat="tag in filtersList.kindtravelers">
				    <input type="checkbox" name="{{ tag.label }}" id="{{ tag.label }}" checklist-model="filtersProduct.kindtravelers"  checklist-value="tag.slug"/>
				    <label title="{{ tag.label }}" for="{{ tag.label }}">
				      {{ tag.label }}
				      <i class="fa fa-check pull-right"></i>
				      <i class="fa hidden fa-times pull-right"></i>
				    </label>
				  </div>
				</div>
			</div><!-- kindtravelercollapse ends -->
			<hr>
        </div>
        <!-- .filter-box - kindtraveler - ends -->


	  	<!-- .filter box - inspiration  -->
        <div class="filter-box">
			<h4>
			<a ng-init="tagscollapse = true" class="link-wrapper filter-toggle" ng-click="tagscollapse = !tagscollapse">
			  <i class="fa fa-caret-right" ng-class="{'fa-caret-right' : tagscollapse, 'fa-caret-down' : !tagscollapse }"></i>
			  Inspiración
			</a>
			</h4>
			<div ng-if="!tagscollapse">
				<div class="filter-collapse">
				  <div class="filter" ng-repeat="tag in filtersList.tags">
				    <input type="checkbox" name="{{ tag.label }}" id="{{ tag.label }}" checklist-model="filtersProduct.tags"  checklist-value="tag.slug"/>
				    <label title="{{ tag.label }}" for="{{ tag.label }}">
				      {{ tag.label }}
				      <i class="fa fa-check pull-right"></i>
				      <i class="fa hidden fa-times pull-right"></i>
				    </label>
				  </div>
				</div>
			</div><!-- tagscollapse ends -->
			<hr>
        </div>
        <!-- .filter-box - inspiration - ends -->

		
		<!-- .filter-box - categoria-hotel - ends -->

		<!--  .filter box - paises  -->
		<div class="filter-box" ng-show="filtersList.countries.length > 0">
		  	<h4>
		  		<a class="link-wrapper filter-toggle" 
		       ng-click="countriescollapse = !countriescollapse">
		       <i class="fa fa-caret-right" ng-class="{'fa-caret-right' : countriescollapse, 'fa-caret-down' : !countriescollapse }"></i> Paises</a>
			</h4>
		  	<div ng-if="!countriescollapse">
				<div class="" ng-class="{'filter-collapse' : countriescut}">
				  <div class="filter" ng-repeat="country in filtersList.countries">
				    <input type="checkbox" name="{{ country.slug }}" id="{{ country.slug }}" checklist-model="filtersProduct.countries" checklist-value="country.slug" value="{{ country }}"/>
				    <label title="{{ country.label_es }}" for="{{ country.slug }}">
				    <span>{{ country.label_es}}</span>
				      <i class="fa fa-check pull-right"></i>
				      <i class="fa hidden fa-times pull-right"></i>
				    </label>
				  </div>		 
				</div>
			</div><!-- countriescollapse ends -->
			<hr />
		</div>
		<!-- .filter-box - paises - ends -->

		<!-- .filter-box - ciudades  -->
		<div class="filter-box" ng-if="filtersList.cities.length > 0">
	      <h4><a class="link-wrapper filter-toggle" 
               ng-click="ciudadescollapse = !ciudadescollapse">
          		<i class="fa fa-caret-right" ng-class="{'fa-caret-right' : ciudadescollapse, 'fa-caret-down' : !ciudadescollapse }"></i> 
         	 	Ciudades</a>
         	 </h4>
	      	<div ng-if="!ciudadescollapse">
				<div class="">
				  <div class="filter" ng-repeat="city in filtersList.cities | orderBy:'label_es'">
				    <input type="checkbox" name="{{ city.label_en }}" id="{{ city.slug }}" checklist-model="filtersProduct.cities"  checklist-value="city.slug" value="{{ city }}"/>
				    <label title="{{ city.label_en }}" for="{{ city.slug }}"> 
				    	<span ng-if="city.label_es != ''">{{ city.label_es }}</span>
				    	<span ng-if="city.label_es == ''">{{ city.label_en }}</span>
				      <i class="fa fa-check pull-right"></i>
				      <i class="fa hidden fa-times pull-right"></i>
				    </label>
				  </div>		 
				</div> 
				
			</div><!-- ciudadescollapse ends -->
			<hr />
	  	</div> 
	  	<!-- .filter-box - ciudades - ends -->
	  	<!-- .filter-box - DMCs  -->
		<div class="filter-box" ng-if="!isWhiteLabel">
	      <h4><a class="link-wrapper filter-toggle" 
               ng-click="dmcscollapse = !dmcscollapse">
          		<i class="fa fa-caret-down">        
               </i> Proveedores</a></h4>
	      	<div ng-if="!dmcscollapse">
				<div class="">
				  <div class="filter" ng-repeat="dmc in filtersList.providers">
				    <input type="checkbox" name="{{ dmc.name }}" id="{{ dmc._id }}" checklist-model="filtersProduct.providers"  checklist-value="dmc._id" value="{{ dmc }}"/>
				    <label title="{{ dmc.name }}" for="{{ dmc._id }}">
              <span>{{ dmc.name }}</span>
				      <i class="fa fa-check pull-right"></i>
				      <i class="fa hidden fa-times pull-right"></i>
				    </label>
				  </div>
				</div> 
			</div><!-- dmcscollapse ends -->
			<hr />
	  	</div> 
	  	<!-- .filter-box - Dmcs - ends -->
		<div class="relative">
			<div class="popover top absolute popover-filter ng-hide" ng-show="disabledFilter()">
			  <div class="arrow"></div>
			  <div class="popover-inner">
			      <div class="popover-content">Debes seleccionar al menos una actividad o país</div>
			  </div>
			</div>
{#<p class="text-right" ng-if="hasFilterActives">
			  <a ng-click ="clearFilters()" class="btn btn-xs btn-default pointer">Limpiar Filtros </a>
			</p> #}
			  <a ng-href="" class="mt-xl btn btn-block btn-primary mt-xl" ng-click="sendFilters()" ng-class="{'disabled' : disabledFilter()}">filtrar</a>
		</div>
	</div>  <!-- .filters ends -->
	
  <!-- info-blocks start -->
  {% if !brand.domain %}
  	{% include "action-infoblocks-vertical.html.swig" ignore missing %}
  {% endif %}
  <!-- info-blocks end --> 
{# <pre>{{filtersProduct | json}}</pre> #}

</aside> <!-- .col ends -->
{% endspaceless %}