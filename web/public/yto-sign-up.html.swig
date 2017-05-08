{% extends 'yto-layout.html.swig' %}
{% block bodyclass %}user-front singup-affiliate{% endblock %}

{% block body %}
	{% include "partials/membership/yto-signup.html.swig" %}
{% endblock %}

{% block javascript %}
  {% parent %}
	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD-H5AvlatgN9nB8gXQvX64Gv7B0IaYyiE&amp;libraries=places&amp;language=es"></script>
	<!-- Dependencies -->
	<script src="/js/angular/helpers/affiliatehelpers.js?v={? brand.appversion ?}"></script>
	<!-- Directives -->
	<script src="/js/angular/directives/matchpass.js?v={? brand.appversion ?}"></script>
	<!-- Controllers -->
	<script src="/js/angular/membership/AffiliateSignUpCtrl.js?v={? brand.appversion ?}"></script>
{% endblock %}