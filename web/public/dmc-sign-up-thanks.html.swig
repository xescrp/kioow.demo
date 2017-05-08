{% extends 'admin-layout.html.swig' %}

{% block bodyclass %}user-front confirmation-page {% endblock %}

{% block body %}

	{% if language === 'es' %}
		{% include "partials/shared/dmc-sign-up-thanks.es.html.swig" %}
	{% else %}
		{% include "partials/shared/dmc-sign-up-thanks.html.swig" %}
	{% endif %}

{% endblock %}

{% block javascript %}

{% parent %}

<script>
var lang = '{? language ?}';
</script>

{% endblock %}
