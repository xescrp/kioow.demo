<section class="product-resume max-center-sm info-block hidden-sm hidden-xs bg-light">
    <section class="price-total padded-b text-center">
        {% if disponible %}
        <pre class="hidden" >{? product.code ?}</pre>

        <h4 class="text-alternate">{? product.title_es ?}</h4>
          
           {% if related %}
             <div class="btn-group mb-b pt-zero mt-zero" uib-dropdown is-open="status.isopen">
              <button id="single-button" type="button" class="btn btn-xs btn-link" uib-dropdown-toggle ng-disabled="disabled">
                {% for rel in related %}
                  {% if rel.slug_es == product.slug_es %}
                    {? rel.categoryname.label_es?}
                  {% endif %}
                {% endfor %}
                <span class="caret"></span>
              </button>
              <ul class="dropdown-menu" uib-dropdown-menu role="menu" aria-labelledby="single-button">
              {% for rel in related %}
                    {% if rel.slug_es != product.slug_es %}
                    <li role="menuitem">
                      <a target="_self" href="/viaje/{?rel.slug_es?}#category">{? rel.categoryname.label_es?}</a>
                    </li>
                    {% endif %}
              {% endfor %}
              </ul>
            </div>
          {% endif %}

        <div class="the-price">
            <p class="mb-zero"><em>PVP desde</em></p>
            <p class="mb-l"><strong class="h1 bold">
      		    <span>{? addNumSeps(product.pvp.b2b) ?}</span><span class="h3 bold"> {? product.pvp.currency.symbol ?}</span>
    		    </strong>
            <br />
            <em>por persona en base doble</em>
            <br />
            <a ng-href="#desglose" popover-placement="bottom" popover-trigger="focus" uib-popover-template="'/partials/programs/yto-price-detail.html.swig'" >Desglose AAVV</a>
            </p> 

        </div>

        <p class="mb-b"><strong>{? Math.round(product.pvp.b2b/product.itinerary.length) ?}{? product.pvp.currency.symbol ?}</strong> / día</p>
        <p class="mb-xl">2 adultos, <strong>PVP TOTAL: {? addNumSeps(product.pvp.b2b * 2) ?} {? product.pvp.currency.symbol ?}</strong></p>
        <a href="{? brand.path ?}/booking/{? product.slug_es ?}{% if date %}?datein={?date?}{% else %}?{% endif %}&{? querystring ?}" target="_self" class="btn btn-lg btn-danger btn-block">Reservar</a>

        {% else %}
        <div class="mt-xl">
	        <h3 class="thin text-gray mb-xl">No hay disponibilidad de este producto para estas fechas.</h3>
	        <button class="btn btn-danger">Realiza <br class="hidden-lg" /> otra búsqueda</button>
        </div>
        {% endif %}
      <!--botones pdf -->   
      <p class="text-center mb-zero mt-xxl">
        <a class="mt-xl block link-download-pdf" id="generateProductPdf" href="#" target="_self" ng-click="printTravel('{? product.slug_es ?}')">
        <img class="iblock" src="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_30/v1448532039/assets/pdf-download.png"
        data-src2x="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_60/v1448532039/assets/pdf-download.png" height="30" />  
        <span class="iblock relative">Itinerario para cliente</span></a>
        
        {# <a class="mt-xl block link-download-pdf" id="generateProductPdfOnePage" href="#" target="_self" uib-tooltip="Próximamente" tooltip-placement="bottom">
        <img class="iblock" src="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_30/v1448532039/assets/pdf-download.png"
          data-src2x="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_60/v1448532039/assets/pdf-download.png" height="30" />
          <span class="iblock relative">Cartelería para AAVV</span></a> #}
        <a class="mt-xl block link-download-pdf" id="generateProductPdfOnePage" href="#" target="_self" ng-click="printTravelOnePage('{? product.slug_es ?}')">
        <img class="iblock" src="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_30/v1448532039/assets/pdf-download.png"
          data-src2x="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_60/v1448532039/assets/pdf-download.png" height="30" />
          <span class="iblock relative">Cartelería para AAVV</span></a>
      </p>

    </section>
    <hr class="mb-zero mt-xl" />
    <footer ng-if="!isWhiteLabel" class="dmc-profile">
      {% include "../widgets/seller-resume.es.html.swig" ignore missing %}
    </footer>
</section>
