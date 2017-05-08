{% extends '../../yto-layout.html.swig' %}
{% block bodyclass %}user-front static-affiliate{% endblock %}

{% block body %}
 <section class="static-affiliate-wrap header-default" style="background-image: url('{? getUrlCloudinary(page.image.url, "contentheader") ?}');">
    <div>
      <div class="container">
        <div class="row">
          <div class="col-md-offset-1 col-md-10">
            <h1>{? page.title ?}</h1>
          </div>
        </div>
      </div>
    </div>
   </section>
   <section class="container">
      <article class="static-content">
      <div class="row">
        <div class="col-xs-offset-1 col-xs-10 mt-l">
           {% if page.content.brief %}
              <header>
               {? page.content.brief |safe ?}
              </header>
              {% endif %}
              {? page.content.extended |safe ?}
        </div>
      </div>
      </article> <!-- .well ends -->
  </section>
{% endblock %}

{% block javascript %}
{% parent %}
{% endblock %}

    
