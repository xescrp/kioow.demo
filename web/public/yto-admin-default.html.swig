{% extends 'admin-layout.html.swig' %}
{% block bodyclass %}user-front admin-dmc omt-list{% endblock %}

{% block body %}

	{% include "partials/admin/yto-admin-default.html.swig" %}
      
{% endblock %}

{% block javascript %}
	{% parent %}
	<!-- Controllers -->
	<script src="/js/angular/admin/adminHomeCtrl.js" >
{% endblock %}
