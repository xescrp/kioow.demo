{% extends 'yto-layout.html.swig' %}
{% block bodyclass %}user-front static faqs {% if (loginsession != null && loginsession.user != null && loginsession.user.rolename == 'dmc') %}admin-dmc{% endif %}{% endblock %}

{% block body %}

<section class="container static-content">
    <ul class="breadcrumb">
      <li><a target="_self" href="/">Inicio </a></li>
      <li><a target="_self" href="/faqs">Preguntas Frecuentes </a></li>
      <li><a target="_self" href="/faqs/{? faq.categories[0].slug ?}">{? faq.categories[0].name ?} </a></li>
      <li class="active">{? faq.title ?}</li>
    </ul>

    <article>
            <header>
                <h1 class="thin mt-l mb-xxl">{? faq.title ?}</h1>
                {% if faq.images.length > 0 %}
                	{% for image in faq.images %}
                            <img class="img-thumbnail img-responsive" 
                            src='http://res.cloudinary.com/open-market-travel/image/upload/w_710,q_100,c_fill/{? image.public_id ?}' 
                            data-src2x='http://res.cloudinary.com/open-market-travel/image/upload/w_1420,q_50,c_fill/{? image.public_id ?}' title="{? faq.title ?} grafico" alt="{? faq.title ?} grafico">
    	           {% endfor %}
                {% endif %}

                <br />
                {? faq.content.extended |safe ?}

                <p></p>
            </header>
            <hr>
            <a class="btn" target="_self" href="/faqs"><i class="fa fa-arrow-left"></i>
            	<strong>VOLVER A PREGUNTAS FRECUENTES</strong>
            </a>
    </article>
</section>

{% endblock %}

{% block javascript %}
    {% parent %}
    <!-- Controllers -->

{% endblock %}