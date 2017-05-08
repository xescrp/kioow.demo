{% extends 'yto-layout.html.swig' %}

{%- block bodyclass -%}user-front results{%- endblock -%}

{% block body %}
<div role="main" ng-cloak ng-controller="resultsCtrl">
	<div class="relative">

		{% include "partials/widgets/buscador-modificar.html.swig" %}
		{% include "partials/widgets/buscadordestino.html.swig" %}

	</div>

	<section class="results-page-wrap container">
	<!-- angular breadcrumb -->
 	<div ng-controller="bredcrumbBuilder" ng-include="'/partials/shared/breadcrumb-template.html?v={? brand.appversion ?}'"></div>

	<div class="row">
		<div class="col-md-12">
			<h1 class="mb-xxl mt-b">
			{% if travelroot %}
				Todos los Viajes
			{% elseif seocontent.city %}
				Viajes por 
				{% for city in seocontent.city %}{% if city.label_es != ''%}{? city.label_es ?}{% else %}{? city.label_en ?}{% endif %}{% if !loop.last %}, {% endif %}{% endfor %}
				en {? seocontent.country.label_es ?}
				{% if triptags %}- {? seocontent.wholefirsttag.label ?}{% endif %}
			{% elseif seocontent.country %}
				Viajes en {? seocontent.country.label_es ?}
				{% if triptags %}- {? seocontent.wholefirsttag.label ?}{% endif %}
			{% elseif !seocontent.country && !seocontent.city && seocontent.wholefirsttag.title_es.length > 0 %}
				{? seocontent.wholefirsttag.title_es ?}
			{% else %}
				Viajes {{mainTitle}}
			{% endif %}
			<br class="visible-xs">
			<small class="h4-sized" ng-show="totalItems.length > 0">
			<span ng-show="partialresults">
			(Viendo del {?tit_initresultnumber?} al {?tit_endresultnumber?} de un total de {?tit_totalItems?}) <a target="_self" title="ver todos los resultados" ng-href="{{urlwolastcode}}">ver todos</a> 
			<!--(Viendo del {{initresultnumber}} al {{endresultnumber}} de un total de {{totalItems}}) 
			<a target="_self" title="ver todos los resultados" ng-href="{{urlwolastcode}}">ver todos</a>
			 --></span>
			<span ng-hide="partialresults">
			({{ pager.totalItems }} opciones encontradas)
			</span>
			</small></h1>
		</div>

	</div>
	<div class="row row-offcanvas row-offcanvas-right" ng-class="{'active' : offcanvas}" ng-init="offcanvas = false">
	  <!-- filter col partials/widgets/result-filters.html.swig  -->
	  {% include "partials/widgets/result-filters.html.swig" %}

	 <!-- results col -->
	  <section class="col-md-9 col-sm-12 col-xs-12">
	    <header class="mb-l clearfix">

		  <div class="views hidden-sm hidden-xs">
	      	<p class="thin iblock marged-zero">Ordena los viajes en listado o en bloque</p>
		    <div class="btn-group pb-b ml-b">
		        <label class="btn btn-default" ng-click="viewblocks = true"  ng-class="{'active' : viewblocks}" ><i class="fa fa-th-large"></i></label>
		        <label class="btn btn-default" ng-click="viewblocks = false;" ng-class="{'active' : !viewblocks}"><i class="fa fa-list"></i></label>
		    </div>
		    <div class="hidden-sm pull-right hidden-xs">
	      	<p class="thin iblock marged-zero pr-b">Compara Programas </p>
		        <button class="btn btn-default" popover-trigger="mouseenter" popover-placement="left" uib-popover="Compara hasta 4 programas en la misma pantalla">
		        <i class="fa fa-square-o"></i>
		        </button>
		  </div>
		  </div>	      
	    </header>

	{# init Angular page  #}
	<ol class="results-wrap mt-b menu row list-unstyled" ng-class="viewblocks ? 'viewblocks' : 'viewlist'" ng-controller="affiliateCompareResultsCtrl">
	

		<li resultitem resultdata="item" ng-repeat="item in pager.items"
		 class="result-wrap" ng-show="hasparenthere(item)">
		</li>
	{# end Angular page #}

	</ol>

	<!-- NO RESULTS FOUND, TO SHOW, REMOVE CLASS "hidden" and ADD CLASS "in" -->
	<div class="no-results padded-xxl col-md-12" ng-if="pager == null || pager.items == null || pager.items.length == 0">
		<div ng-include="'/partials/widgets/buscador-not-found.html'"></div>
	</div>


	<div ng-show="showmore()" class="padded-xl text-center">
		{# <a href="#" ng-show="!loadingmorebtn" ng-click="getmoreresults()" class="btn btn-danger mb-xl mt-xl">Cargar más viajes</a> #}
		<a id="moreresultsbtn" href="#" ng-show="!loadingmorebtn" ng-click="getmoreresults()" class="btn btn-danger mb-xl mt-xl">Cargar más viajes</a>
        <div ng-show="loadingmorebtn" class="preloader solo in" style="height: 33px;">
            <span></span>
            <span></span>
            <span></span>
        </div>
	</div>
	
  </section> <!-- .col ends -->
</div>  <!-- main row ends -->

</section>
	
</div><!-- end role main  div-->
{% endblock %}

{% block javascript %}
	{% parent %}

	<script type="text/javascript">
		var brand = {? brand | json | safe ?};
	</script>
	
	<!-- dependences -->
	<script src="/js/libs/1.4.9/i18n/angular-locale_es-es.js"></script>
	<!-- libs -->
	<script src="/js/angular/filters/filters.js?v={? brand.appversion ?}"></script>
	<!-- Controllers -->
	<script src="/js/angular/search/resultsCtrl.js?v={? brand.appversion ?}"></script>
	<script src="/js/angular/helpers/productpreviewhelpers.js?v={? brand.appversion ?}"></script>
	<script src="/js/angular/search/CompareResultsCtrl.js?v={? brand.appversion ?}"></script>
	<script src="/js/angular/services/breadcrumbBuilder.js?v={? brand.appversion ?}"></script>

{% endblock %}
