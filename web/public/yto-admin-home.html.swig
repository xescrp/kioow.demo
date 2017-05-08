{% extends 'admin-layout.html.swig' %}
{% block bodyclass %} user-front wellcome-affiliate admin-dmc omt-list{% endblock %}

{% block body %}
	{% set homepath = 'partials/admin/yto-admin-home.html.swig' %}
	{% include homepath %}
      
{% endblock %}

{% block javascript %}
	{% parent %}
	<!-- Controllers -->
	<script src="/js/angular/admin/adminHomeCtrl.js?v={? brand.appversion ?}"></script>
	<script src="/js/angular/components/ts-filterboxes/script/shortcut-programs.js?v={? brand.appversion ?}"></script>
	<script src="/js/angular/directives/select-dmc-program.js??v={? brand.appversion ?}"></script>
{% endblock %}
