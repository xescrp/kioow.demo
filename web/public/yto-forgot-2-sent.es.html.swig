{% extends 'yto-layout.html.swig' %}

{% block bodyclass %}user-front confirmation-page{% endblock %}

{% block body %}

  {% include "partials/shared/user/forgot-2-sent.es.html.swig" %}

{% endblock %}

{% block javascript %}
  {% parent %}
   
{% endblock %}