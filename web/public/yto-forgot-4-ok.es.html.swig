{% extends 'yto-layout.html.swig' %}

{% block bodyclass %}user-front confirmation-page{% endblock %}

{% block body %}
  <div ng-controller="HeaderCtrl" ng-init="userType ='affiliate'">
  {% include "partials/shared/user/forgot-4-ok.es.html.swig" %}
  </div>
{% endblock %}

{% block javascript %}
  {% parent %}
   
{% endblock %}