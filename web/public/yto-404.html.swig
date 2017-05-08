{% extends 'yto-layout.html.swig' %}
{% block bodyclass %}user-front{% endblock %}

{% block body %}

<section class="container">
<br /> <br />
    
    <div class="hidden-xs"><br><br><br></div>
    <div class="row">
      <div class="col-md-10 col-md-offset-1">
        <div class="no-results padded-xxl row text-gray fadein-l">
          <div class="col-md-3 text-center no-results-icon">
            <i class="fa fa-times"></i>  
          </div>
          <div class="col-md-9 mt-xl mobile-centered">
            <h1 class="thin mt-b mb-xl">Esta página no ha cargado correctamente.</h1>
            <h3 class="thin mt-l">Accede a través de estas secciones. </h3>
            <div class="mt-xxl mobile-centered">
              <a href="{?brand.path?}/inicio" target="_self" class="btn iblock btn-default mr-b mb-xl">Página de Inicio</a><br class="visible-xs">
              <a href="#" ng-controller="buscadorCtrl" ng-click="opencsGenerated(''); $event.stopPropagation();" target="_self" class="btn iblock btn-alt mr-b mb-xl">Busca un Nuevo viaje</a><br class="visible-xs">
              <a href="{?brand.path?}/viaje-a-medida" target="_self" class="btn iblock btn-primary mb-xl">Pide un Viaje a medida</a><br class="visible-xs">
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
