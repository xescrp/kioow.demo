{% extends 'layout.html.swig' %}
{% block bodyclass %}user-front{% endblock %}

{% block body %}

<section class="container">
<br /> <br />
    
    <div class="hidden-xs"><br><br><br></div>
    <div class="row">
      <div class="col-md-10 col-md-offset-1">
        <div class="no-results padded-xxl row text-gray fadein-l">
          <div class="col-md-3 text-center no-results-icon">
            <i class="icon-alt-brokenbulb"></i>  
          </div>
          <div class="col-md-9 mt-xl mobile-centered">
            <h1 class="thin mt-b mb-xl">Esta p&aacute;gina no ha cargado correctamente.</h1>
            <h3 class="thin mt-l">Accede a trav&eacute;s de estas secciones. </h3>
            <div class="mt-xxl mobile-centered">
              <a href="/" target="_self" class="btn iblock btn-default mr-b mb-xl">P&aacute;gina de Inicio</a><br class="visible-xs">
              <a href="/viajes" target="_self" class="btn iblock btn-alt mr-b mb-xl">Busca un Nuevo viaje</a><br class="visible-xs">
              <a href="/peticion-de-viaje" target="_self" class="btn iblock btn-primary mb-xl">Pide un Viaje a medida</a><br class="visible-xs">
          </div>
          </div> 
        </div>
      </div>
    </div>

</section>


{% endblock %}

{% block javascript %}
  {% parent %}
{% endblock %}
