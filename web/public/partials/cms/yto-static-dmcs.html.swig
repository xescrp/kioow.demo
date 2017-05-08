{% extends '../../yto-layout.html.swig' %}
{% block bodyclass %}user-front static-affiliate{% endblock %}

{% block body %}
 <section class="static-affiliate-wrap well mb-zero header-warning">
      <div class="text-center container">
      <h1 class="thin"><i class="icon icon-alt-handshake fa-2x mr-xxl"></i> <span class="title-w-icon">{? page.title ?}</span></h1>
      </div>
   </section>
   <section class="container">
      <article class="static-content">
      <div class="row">
        <aside class="mt-xxl">
        {% include "../widgets/yto-content-menu.html.swig" ignore missing %}
        </aside>
        <div class="col-xs-9 mt-l">
          {% if page.image != undefined %}
              <img class="img-responsive" src="{? page.image.url ?}">
          {% endif %}
           {% if page.content.brief %}
              <header class="mb-zero">
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
<script src="/js/angular/helpers/ContentMenuCtrl.js"></script>
{% endblock %}

    
