{% extends 'yto-layout.html.swig' %}
{% block bodyclass %}user-front static faqs{% endblock %}

{% block body %}
<section ng-init="affiliate = {? session.affiliate | json ?}" class="container static-content">
    <ul class="breadcrumb">
      <li><a target="_self" href="/">
        {% if language == "es" %}
            Inicio
        {% else %}
            Home
        {% endif %}
       </a></li>
      <li class="active">{? page.title ?}</li>
    </ul>

    <article>
            <header>
                <h1 class="thin mt-l mb-xxl">{? page.title ?}</h1>
                {% if page.image != undefined %}
                    <br><img class="img-responsive" src="{? page.image.url ?}"><br>
                {% endif %}
                

                {% if page.content.brief %}
                    {? page.content.brief |safe ?}
                    </header>
                    <hr />
                    {? page.content.extended |safe ?}
                {% else %}
                    </header>                
                    {? page.content.extended |safe ?}
                {% endif %}

    </article>
</section>

{% endblock %}

{% block javascript %}
    {% parent %}
    <!-- Controllers -->

{% endblock %}