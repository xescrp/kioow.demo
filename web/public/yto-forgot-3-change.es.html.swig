{% extends 'yto-layout.html.swig' %}

{% block bodyclass %}user-front forgot-change{% endblock %}

{% block body %}
<div ng-controller="forgotpasswordCtrl" ng-init="whois='affiliate'">
  {% include "partials/shared/user/forgot-3-change.es.html.swig" %}
</div>
{% endblock %}

{% block javascript %}
  {% parent %}
   <script src="js/angular/auth/forgotpasswordCtrl.js?v={? brand.appversion ?}"></script>
{% endblock %}