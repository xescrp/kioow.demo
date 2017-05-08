{% extends 'yto-layout.html.swig' %}
{% block bodyclass %}user-front home{% endblock %}
{% set searchfocus = true %}

{% block body %}
  <section class="yto-landing-hero" ng-controller="homeCtrl">
      <div class="container"> 
        <div class="over-headline col-md-5 col-md-offset-7">
            <h1 class="main-title lh-b  mb-zero">La herramienta ONLINE especializada en Programas Multidays y Viajes a Medida demandada por las AGENCIAS</h1>
        </div>
        <div class="row">
          <div class="col-md-7 main-img max-center-sm">
          {# <img class="img-responsive" src="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,w_600/yourttoo.com/lanzamiento_low.png" data-src2x='http://res.cloudinary.com/open-market-travel/image/upload/yourttoo.com/lanzamiento_low.png' alt="Lanzamiento 15 de Febrero" title="Lanzamiento 15 de Febrero" /> #}
            <img class="img-responsive" src="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,w_600/v1438272593/yourttoo.com/puntosmundo.png" data-src2x='http://res.cloudinary.com/open-market-travel/image/upload/v1438272593/yourttoo.com/puntosmundo.png' alt="mundo" title="yourttoo.com | Gestiona tus viajes como un touroperador" />
            </div><!-- .col-md-7 ends -->
          <div class="col-md-5 landing-call-text max-center-sm mb-xxl">
            <div> <!-- separate box with its own padding -->
              <h4 class="text-light">Eres una agencia de viajes?</h4>
              <div class="row">
                <div class="col-sm-6 dmc-signup-action text-center pb-l">
                  <a href="/signup" target="_self" class="btn btn-primary btn-block">Regístrate</a>
                </div>
                <div class="col-sm-6 mt-b text-light text-left">
                  o <a href="#" class="link-softened" ng-click="openlogin('affiliate')" >accede</a> si estás registrado
                </div>
               </div>
            </div>
          </div> <!-- .col-md-6 ends -->
        </div> <!-- .row ends -->
      </div> <!-- .container ends -->
  </section> <!-- .home-hero ends -->

  {% include "partials/widgets/yto-advantages.html.swig" %}
{% endblock %}

{% block javascript %}
	{% parent %}

	<!-- Controllers -->

	<script src="/js/libs/1.4.9/i18n/angular-locale_es-es.js"></script>
	<script src="/js/angular/filters/filters.js?v={? brand.appversion ?}"></script>
    <script src="/js/angular/home/homeCtrl.js?v={? brand.appversion ?}"></script>


{% endblock %}
