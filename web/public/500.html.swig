{% extends 'layout.html.swig' %}
{% block bodyclass %}user-front{% endblock %}

{% block body %}

<section class="container">
<br /> <br />
  <div class="no-results padded-xxl fadein-l col-md-12 text-gray">
    <h1 class="thin text-center mb-b">Ups. Error. </h1>
    <h3 class="thin text-center mt-l">We will try to fix it ASAP.<br/> </h3>
    <div class="text-center no-results-icon">
      <i class="icon-alt-brokengear fa-2x"></i>  
    </div>
  </div>
</section>


{% endblock %}

{% block javascript %}
  {% parent %}
{% endblock %}
