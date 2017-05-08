{% extends 'yto-layout.html.swig' %}
{% block bodyclass %}user-front product{% endblock %}

{% block body %}

	{% if !isquote %}
		{% include "partials/widgets/buscadordestino.html.swig" %}
	{% endif %}
	
	<section class="product-wrap container" ng-cloak ng-controller="affiliateProductCtrl">


 	<div ng-controller="bredcrumbBuilder" ng-include="'/partials/shared/breadcrumb-template.html'"></div>

		<!-- product back button  -->
		{% if isquote %}
		<a class="product-back" href="{? brand.path ?}{? back.url ?}" target="_self">
		  <h4 class="mb-xxl"><i class="fa fa-arrow-circle-left"></i> {? back.label?}</h4>
		</a>
		{% else %}
		<a class="product-back" href="{? brand.path ?}/viajes?{? querystring ?}" target="_self">
		  <h4 class="mb-xxl iblock"><i class="fa fa-arrow-circle-left"></i> Volver a la Búsqueda</h4>
		</a>
		{% endif %}

		<!-- product main content -->
		<div class="row wrap-program-product">
			<div class="col-md-9 mb-xxl">
				{% include "partials/programs/productbody.html.swig" %}
			</div>
			<div class="col-md-3">
				{% include "partials/programs/yto-callaction.html.swig" %}
			</div>
        	</div> 
    </section>

{% endblock %}

{% block javascript %}
	{% parent %}
	<!--Embedding The Markers Object-->
	<script type="text/javascript">
		var markers = {? markers | json | safe ?};
		var session = {? session | json | safe ?};
		var minPrice = {? minPrice | json | safe ?};
		var product = {? product | json | safe ?};
		var quote = {? quote | json | safe ?};
	</script>
	
	<!-- maps -->
	{% include "partials/jscalls/apigmaps.html.swig" %}
	<script src="/js/libs/markerwithlabel.js?v={? brand.appversion ?}"></script>
	<script src="/js/mapstyles/yto.js?v={? brand.appversion ?}"></script>
	<script src="/js/libs/itinerarymap.js?v={? brand.appversion ?}"></script> 
	<!-- dependencies -->
	<script src="/js/libs/1.4.9/i18n/angular-locale_es-es.js"></script>

	<!-- Controllers -->
	<script src="/js/angular/services/breadcrumbBuilder.js?v={? brand.appversion ?}"></script>
	<script src="/js/angular/programs/ProgramCtrl.js?v={? brand.appversion ?}"></script>

{% endblock %}

