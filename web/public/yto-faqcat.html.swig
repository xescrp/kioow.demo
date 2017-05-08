{% extends 'yto-layout.html.swig' %}
{% block bodyclass %}user-front static faqs {% if (loginsession != null && loginsession.user != null && loginsession.user.rolename == 'dmc') %}admin-dmc{% endif %}{% endblock %}

{% block body %}

<section class="container static-content">
   <ul class="breadcrumb">
      <li><a target="_self" href="/">Home </a></li>
      <li><a target="_self" href="/faqs">FAQ </a></li>
      <li class="active">{? faqcat.cat.name ?}</li>
   </ul>

        <article>
            <header>
                <h1 class="thin mt-l mb-xxl">{? faqcat.cat.name ?}</h1>
            </header>
            <hr>

            <div class="blog">
            	{% for faq in faqcat.faq %}
	                <div class="faq">
	                    <h3 class="faqlist"><a target="_self" href="/faq/{? faq.slug ?}">{? faq.title ?}</a></h3>
	                </div>
	            {% endfor %}
                <hr>
            </div>
        </article>
    </section>

{% endblock %}

{% block javascript %}
	{% parent %}

	<!-- Controllers -->
{% endblock %}