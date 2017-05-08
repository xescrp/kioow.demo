{% extends 'yto-layout.html.swig' %}
{% block bodyclass %}user-front request-flow{% endblock %}
{# TODO Control de session y login #}

{%- block body -%}
	{% include "partials/tailormade/yto-request-form.html.swig" %}
 {%- endblock -%}

{# TODO Control de session y login #}
{% block javascript %}
	{% parent %}
	<script src="http://maps.googleapis.com/maps/api/js?key=AIzaSyD-H5AvlatgN9nB8gXQvX64Gv7B0IaYyiE&libraries=places&language=es"></script>
	<!-- Directives -->
	<!-- Tools -->
	<script src="/js/libs/markerwithlabel.js?v={? brand.appversion ?}"></script>
	<script src="/js/mapstyles/yto.js?v={? brand.appversion ?}"></script>
	<script src="/js/libs/gmap-custom.js?v={? brand.appversion ?}"></script>
	<!-- Controllers -->
	<script src="/js/libs/1.4.9/i18n/angular-locale_es-es.js"></script>
	<script src="/js/angular/tailormade/RequestFormCtrl.js?v={? brand.appversion ?}"></script>
	<script src="/js/angular/tailormade/getRelatedProductCtrl.js?v={? brand.appversion ?}"></script>
{% endblock %} 