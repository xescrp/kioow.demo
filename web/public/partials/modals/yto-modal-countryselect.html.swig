<!-- ======= Countryselect Modal ======== -->
{% spaceless %}
<div class="modal-content countryselect-modal" id="csgenerated">
  <div class="modal-body padded-zero" id="countries" ng-hide="allcountries">
          
          <div class="absolute closer">
             <button type="button" class="close" data-dismiss="modal" ng-click="cancel()">
              <span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
          </div>

      {# zones are true by default, show if zones is true #} 
      <ul ng-init="zones = true" class="mb-xl list-unstyled bg-light" ng-show="zones">
          {# iterate zone names #} 
          {% for zone in allZonesCountries %}
          <li class="col-md-12 bg-light bordered zone-link" ng-init="{? zone.slug |replace('-', '', 'g') ?} = false">
                {# when clicking on a zone: hide zones, show countries, 'trueize' the zone slug var #} 
                <a href="#" ng-click="{? zone.slug |replace('-', '', 'g') ?} = true; zones = false;">
                  <span class="h4 padded-b iblock mt-l">
                  {? zone.label_es ?}
                  </span>
                </a>
          </li>
          {% endfor %}
        
      </ul>

      {# countries are hidden by default, show if zones is false #} 
      <section class="mb-xl list-unstyled bg-light" ng-show="!zones">
        <ul class="list-unstyled">
          {# iterate zones #} 
          {% for zone in allZonesCountries %}
              {# show list if this zone slug var is true #} 
              <ul ng-show="{? zone.slug |replace('-', '', 'g') ?}" class="list-unstyled oh" class="row">
                <div class="marged-zero pl-b pr-b relative zone-link" class="col-md-12">
                  <a href="#" ng-click="{? zone.slug |replace('-', '', 'g') ?} = false; zones = true;">
                    <span class="h4 padded-b iblock mt-l">
                    <i class="fa fa-arrow-circle-left"></i>&nbsp;&nbsp;{? zone.label_es ?}</span>
                  </a>                  
                </div>
                <div class="bg-opacgray padded-xl oh">
                  {# iterate countries in every zone #} 
                  {% for country in zone.countries %}
                      <li class="padded-b col-md-6"><a class="link-invert" href="/viajes/?country={? country.slug ?}" ng-click="ok({name : '{? country.label_es ?}', query : '&amp;country='+'{? country.slug ?}'});">{? country.label_es ?}</a></li>
                  {% endfor %}
                </div>
              </ul>
                
          {% endfor %}
        </ul>
      </section>
      </div>
      <!-- .modal-body ends  -->
</div>  <!-- .modal-content ends -->
{% endspaceless %}
