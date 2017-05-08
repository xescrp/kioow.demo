{% extends 'admin-layout.html.swig' %}

{% block bodyclass %}user-front singup-dmc{% endblock %}

{% block body %}
	
	{% if language === 'es' %}
		{% include "partials/membership/dmc-sign-up.es.html.swig" %}
	{% else %}
		{% include "partials/membership/dmc-sign-up.html.swig" %}
	{% endif %}

{% endblock %}

{% block javascript %}

{% parent %}

<script>
var lang = '{? language ?}';
</script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD-H5AvlatgN9nB8gXQvX64Gv7B0IaYyiE&amp;libraries=places&amp;language={? language ?}"></script>
<!-- Directives -->
<script src="/js/angular/directives/match.js?v={? appversion ?}"></script>
<!-- Controllers -->
<script src="/js/angular/membership/DMCSignInCtrl.js?v={? appversion ?}"></script>

{% endblock %}
