{% extends 'yto-layout.html.swig' %}

{% block bodyclass %}user-front user-dmc-profile{% endblock %}

{% block body %}
  <div itemscope itemtype="http://schema.org/Organization">
  <section class="dmc-profile-wrap well">
    <header class="container">
      <div class="row">
        <div class="profile-image">
          <img class="img-responsive mt-b center-block img-circle" 
            src="{? getUrlCloudinary(dmc.images.logo.url, "avatar100") ?}" 
            data-src2x="{? getUrlCloudinary(dmc.images.logo.url, "avatar100retina") ?}"  
            alt="{? dmc.name ?}" title="{? dmc.name ?}"> 
        </div>
        <div class="profile-name">
          <h1 class="thin mt-b mb-xl" itemprop="name">{? dmc.company.name|title ?}</h1>
          <div class="profile-countries">
            Opera en <br class="hidden-lg" />&nbsp;
             {% for operates in dmc.company.operatein %}
              <span>
                <a href="#" class="label label-light">{? operates.operateLocation.country ?} {% if operates.zone == "" %}{% else %} - {% endif %}{? substring(operates.zone, 0, 40) ?}{% if operates.zone.length > 40 %}...{% endif %}</a>&nbsp;
              </span>
            {% endfor %}
          </div>
        </div>
        <hr class="line-invert visible-sm visible-xs">
        <div class="profile-activities">
            {% for tags in dmc.tags %}
            <span class="label label-info"><i class="icon-{? tags.slug ?}"></i> {? tags.label  ?}</span>
            {% endfor %}
        </div>
    </div>
  </header>
 </section>

<!-- breadcrumb  -->
 <section class="container">
    <ul class="breadcrumb mt-zero mb-xl" itemscope itemtype="http://data-vocabulary.org/Breadcrumb">
      <li><a target="_self" itemprop="url" href="/"><span itemprop="title">{? brand.domain ?}</span></a></li>
      <li class="active"><span itemprop="title">{? dmc.company.name|title ?}</span></li> 
    </ul> 
 </section>

  
  <section class="container mt-xxl">
    <div class="row">
      <div class="col-md-10 col-md-offset-1">
        
        <!-- 1 DESCRIPCION -->
        <div class="profile-block information row max-center-sm">
          <div class="profile-title">
            <h2 class="thin mt-zero">Información</h2>
            <hr class="mt-b" />
          </div>
          <div class="col-md-6 mb-xl ">
            {% if dmc.additionalinfo.description_es %}
              <p>{? dmc.additionalinfo.description_es ?}</p>
            {% else %}
              <p>{? dmc.additionalinfo.description ?}</p>
            {% endif %}
            <hr>
            <h3 class="thin mt-zero">Política de cancelación</h3>
            <p class="pre-text">{?dmc.membership.cancelpolicy._es?}</p>

          </div>
          
          <div class="col-md-6">
            <img class="pull-left img-responsive pb-l" 
              src="{? getUrlCloudinary(dmc.images.photo.url, "corporatephoto") ?}" 
              data-src2x="{? getUrlCloudinary(dmc.images.photo.url, "corporatephotoretina") ?}" 
              title="{? dmc.company.name|title ?} photo" 
              alt="{? dmc.company.name|title ?} photo">
            <div class="profile-info pt-b">
              <h5>Llevan Operando Desde</h5> <span>{? dmc.company.constitutionyear ?}</span>
            </div>
            {% if dmc.company.website == "" || dmc.company.website == "http://"  %}
            {% else %}
              <div class="profile-info">
                <h5>Página Web</h5> <span><a target="_blank" title="{? dmc.company.name ?} website" href="{? dmc.company.website ?}?utm_source={? brand.domain ?}&amp;utm_medium=website&amp;utm_term={? brand.domain ?}&amp;utm_campaign={? brand.domain ?}" onclick="trackOutboundLink('{? dmc.company.website | lower ?}');" itemprop="url">{? dmc.company.website | lower ?}</a></span>
              </div>
              <a target="_blank" href="{? recomender.url ?}" title="{? recomender.name ?}" onclick="trackOutboundLink('{? recomender.url ?}');"><span>{? recomender.name ?}</span></a>
            {% endif %}
            
            {% if dmc.company.location.fulladdress == "" %}
            {% else %}
            <div class="profile-info" itemscope itemtype="http://schema.org/PostalAddress" >
              <h5>Ubicado en </h5> 
              <span itemprop="addressLocality">{? dmc.company.location.stateorprovince ?}, {? dmc.company.location.country ?}</span>
            </div>
            {% endif %}
            
            {% if dmc.additionalinfo.recomenders.length %}
              <div class="profile-info">
                <h5>Referencias</h5> 
                {% for recomender in dmc.additionalinfo.recomenders %} 
                  <span>
                    <a target="_blank" href="{? recomender.url ?}?utm_source={? brand.domain ?}&amp;utm_medium=website&amp;utm_term={? brand.domain ?}&amp;utm_campaign={? brand.domain ?}" title="{? recomender.name ?}" onclick="trackOutboundLink('{? recomender.url ?}');">{? recomender.name ?}</a>{% if not loop.last %}<span>, </span>{% endif %}
                  </span>
                {% endfor %}
              </div> 
            {% endif %}
          </div>
        </div>
        
        {% if dmc.tourEscorts.length == 0 or dmc.tourEscorts[0].fullname == "" %}
        {% else %}
          <!-- 2 SUS GUIAS -->
          <div class="profile-block tour-escorts row max-center-xs">
            <div class="profile-title">
              <h2 class="thin mt-zero">Sus guías</h2>
              <hr class="mt-b" />
            </div>
            <div class="reviewers-wrapreviewers-wrap row">
              {% for tourescort in dmc.tourEscorts %}
               <div class="col-md-4 col-sm-4 reviewer text-center mt-xxl">
                {% if tourescort.image.url %}
                <img class="img-responsive img-circle center-block"
                  src="{? getUrlCloudinary(tourescort.image.url, "avatar100") ?}" 
                  data-src2x="{? getUrlCloudinary(tourescort.image.url, "avatar100retina") ?}"  
                  alt="{? tourescort.fullname ?}" title="{? tourescort.fullname ?}">
                 {% else %}
                 <img class="img-responsive img-circle center-block"
                  src="{? getUrlCloudinary("http://res.cloudinary.com/open-market-travel/image/upload/v1426853495/assets/avatar.jpg", "avatar100") ?}" 
                  data-src2x="{? getUrlCloudinary(tourescort.image.url, "avatar100retina") ?}"  
                  alt="{? tourescort.fullname ?}" title="{? tourescort.fullname ?}">
                {% endif %}
                 <h4 class="mb-b">{? tourescort.fullname ?}</h4>
                 <p class="help-block">
                 {% for language in tourescort.languages %}
                 <span>{? language.label ?}</span><span class="comma">, </span>
                 {% endfor %}
                 </p>
                 <p>
                  {# if there is spanish bio #}
                  {% if tourescort.biography_es.length > 0 %}
                    {# if sp bio is too long cut it and show it#}
                    {% if tourescort.biography_es.length > 300 %}
                      {# show substringed spanish bio #}  
                      {? substring(tourescort.biography_es, 0, 300) ?}{% if tourescort.biography_es.length > 300 %}...{% endif %}
                    {% else %}
                      {# show spanish bio as it is #}  
                      {? tourescort.biography_es ?}
                    {% endif %}

                  {# else, so there was no spanish bio #}  
                  {% else %}
                    {# if english bio is too long cut it and show it #}
                    {% if tourescort.biography.length > 300 %}
                      {# show substringed english bio #}  
                      {? substring(tourescort.biography, 0, 300) ?}{% if tourescort.biography.length > 300 %}...{% endif %}
                    {% else %}
                      {# show english bio as it is #}  
                      {? tourescort.biography ?}
                    {% endif %}
                  {% endif %}
                  </p> 
               </div>
                {% if loop.index % 3== 0 %}
                  <div class="clearfix"></div>
                {% endif %}
               {% endfor %}
             </div>  
            </div>
          {% endif %}

        {% if dmc.additionalinfo.associations.length == 0 or dmc.additionalinfo.associations[0].name == "" %}
        {% else %}
        <!-- 3 ASOCIACIONES -->
        <div class="profile-block associations row max-center-sm">
          <div class="profile-title">
            <h2 class="thin mt-zero">Organizaciones a las que pertenece</h2>
            <hr class="mt-b" />
          </div>
          {% for association in dmc.additionalinfo.associations %}
          <div class="col-md-3 col-sm-3 col-xs-6">
          <h4 class="text-center">{? association.name  ?}</h4>
             {% if association.image.url %}
              <img class="pull-left img-responsive"
                  src="{? getUrlCloudinary(association.image.url, "association") ?}" 
                  data-src2x="{? getUrlCloudinary(association.image.url, "associationretina") ?}"  
                  alt="{? association.name  ?} logo" title="{? association.name  ?} logo">
              {% endif %}
         </div>

          {% if loop.index % 4== 0 %}
            <div class="clearfix hidden-xs"></div>
          {% endif %}
          {% if loop.index % 2== 0 %}
            <div class="clearfix visible-xs"></div>
          {% endif %}

          {% endfor %}
        </div>
        {% endif %}
        </div> <!-- main col ends -->
      </div><!-- row ends -->
   </section>
   </div>

</body>
{% endblock %}

{% block javascript %}
{% parent %}
  <script>
  /**
  * Function that tracks a click on an outbound link in Google Analytics.
  * This function takes a valid URL string as an argument, and uses that URL string
  * as the event label.
  */
  var trackOutboundLink = function(url) {
     ga('send', 'event', 'outbound', 'click', url, {'hitCallback':
       function () {
       document.location = url;
       }
     });
  }
  </script>
{% endblock %}
