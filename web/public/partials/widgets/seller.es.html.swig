<div class="row">
    <div class="col-md-8">
        <div class="dmc-profile-widget">
        <a href="/receptivo/{? product.dmc.code ?}/{? product.dmc.name ?}" target="_blank">
    <img class="img-circle avatarm42" src='{? getUrlCloudinary(product.dmc.images.logo.url, "avatarm42") ?}' 
         data-src2x='{? getUrlCloudinary(product.dmc.images.logo.url, "avatarm42retina") ?}' 
         alt="{?  product.dmc.company.name ?} logo" title="{? product.dmc.company.name ?} logo" />
      </a>
            <p class="dmc-text">
                por <a href="/receptivo/{? product.dmc.code ?}/{? product.dmc.name ?}" target="_blank">{?  product.dmc.company.name ?}</a><br />
                {# <span class="dmc-rating"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i></span> #}
            </p>
        </div>

        {% if product.dmc.additionalinfo.description_es.length > 0 %}
        <p class="pre-text">
          {?- substring(product.dmc.additionalinfo.description_es, 0, 200) -?}{% if product.dmc.additionalinfo.description.length > 200 %}...{% endif %}
          <a href="/receptivo/{? product.dmc.code ?}/{? product.dmc.name ?}" target="_blank"> más información</a>
        </p>
        {% endif %}

        
            <h4 class="thin mt-xl">Política de cancelación </h4>
            {% if product.origin == 'tailormade' %}
            <p class="pre-text">{? quote.responseDetails.cancelpolicy._es?}</p>
            {% else %}
            <p class="pre-text">{? product.dmc.membership.cancelpolicy._es?}</p>
            {% endif %}
       
    </div>
    <div class="col-md-4">
  <a href="{? brand.path ?}/receptivo/{? product.dmc.code ?}/{? product.dmc.name ?}" target="_blank">
          <img src='{? getUrlCloudinary(product.dmc.images.photo.url, "corporateselfie") ?}' 
               data-src2x='{? getUrlCloudinary(product.dmc.images.photo.url, "corporateselfieretina") ?}' 
               class="img-responsive" alt="{?  product.dmc.company.name ?} photo" title="{?  product.dmc.company.name ?} photo" /> 
        </a>
    </div>
</div>