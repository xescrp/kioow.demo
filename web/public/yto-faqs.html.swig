{% extends 'yto-layout.html.swig' %}
{% block bodyclass %}user-front static faqs {% if (loginsession != null && loginsession.user != null && loginsession.user.rolename == 'dmc') %}admin-dmc{% endif %}{% endblock %}

{% block body %}

 {% include "partials/faq/yto-faqhero-es.html.swig" %} 

{% if search == "" %}

	<section class="container static-content">
	   <ul class="breadcrumb">
	      <li><a target="_self" href="/">Inicio</a></li>
	      <li class="active">Preguntas Frecuentes</li>
	   </ul>

		<article>
		        <header>
		            <h1 class="thin mt-l mb-xxl">Preguntas Frecuentes</h1>
		        </header>
		        <hr>

		        <div class="blog">
		        	{% for faqwrap in faqs %}
		            <h2>{? faqwrap.cat.name ?} <small>|  {? faqwrap.faq.length ?} artículos</small></h2>
			            {% for faq in faqwrap.faq %}
			            <div class="faq">
			                <h3 class="faqlist"><a target="_self" href="/faq/{? faq.slug ?}">{? faq.title?}</a></h3>
			            </div>
			            {% endfor %}
			            <hr>
		            {% endfor %}
		        </div>
		    </article>
	</section>

{% else %}

	<section class="container static-content">
	<ul class="breadcrumb">
	    <li><a target="_self" href="/">Home </a></li>
	    <li><a target="_self" href="/preguntas-frecuentes">Preguntas Frecuentes </a></li>
	    <li>Búsqueda: <strong>{? search ?}</strong></li>
	  </ul>

	  <article>
	    <header>
	      <h3 class="thin mt-l mb-xxl">Resultados para
	      <strong>"{? search ?}"</strong></h3>
	    </header>
	    <hr>

	    <div>
	      {% if faqsearch.length > 0 %}
	        {% for result in faqsearch %}
	          <div class="faq">
	            <h3 class="faqlist"><a target="_self" href="/faq/{? result.slug ?}">{? result.title ?}</a></h3>
	            <p>{? result.content.brief | safe ?}</p>
	            <a href="/faq/{? result.slug ?}" target="_self">leer más...</a>
	          </div>
	          <hr>
	        {% endfor %}
	      {% else %}
	        <h3 class="text-muted">No hay resultados para tu búsqueda.</h3>
	      {% endif %}
	    </div>
	  </article>

	</section>

{% endif %}


{% endblock %}

{% block javascript %}
	{% parent %}

	<!-- Controllers -->
	<script src="/js/angular/faq/faqsearchCtrl.js?v={? brand.appversion ?}"></script>
{% endblock %}