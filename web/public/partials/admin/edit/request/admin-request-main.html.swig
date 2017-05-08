<div class="container" ng-controller="RequestCtrl">
    <div class="row no-print">
        <div class="col-md-12">		
            <ul class="breadcrumb">
              <li>
                <a href="/home" target="_self">Home</a>
              </li>
              {% set accountname = '' %}
              {% set propertyname = loginsession.user.rolename %}
              {% if (propertyname == 'dmc') %} {% set accountname = loginsession.dmc.company.name  %}{% endif %}
              {% if (propertyname == 'affiliate') %} {% set accountname = loginsession.affiliate.company.name  %}{% endif %}
              {% if (propertyname != 'admin') %}
              <li>
                <a href="/edit/account?code={? loginsession.user.code ?}&usertype={? loginsession.user.rolename ?}" target="_self">{? accountname ?}</a>
              </li>
              {% endif %}
              <li><a href="/admin/queries" target="_self">Peticiones a medida</a></li>
              <li class="active">{{query.code}}</li>
            </ul>
        </div>
    </div>
  <div class="row no-print mb-xxl">
    <uib-tabset>
      <uib-tab heading="Detalles" active="tabs[0].active" ng-click="selectTab('tabdetails')">
        <div class="bg-light padded-l">
          {% include "admin-request-detail-general.html.swig" %}

          {% include "admin-request-detail.html.swig" %}
        </div>
      </uib-tab>
      <uib-tab heading="Seleccion DMCs" active="tabs[1].active" ng-click="selectTab('tabdmcsselection')">
        <div class="bg-light padded-l">
          {% include "admin-request-detail-general.html.swig" %}

          {% include "admin-request-dmcs-selection.html.swig" %}
        </div>
      </uib-tab>
      <uib-tab heading="Cotizaciones" active="tabs[2].active" ng-click="selectTab('tabquote')">
        <div class="bg-light padded-l">
          {% include "admin-request-detail-general.html.swig" %}

          {% include "admin-request-quotes.html.swig" %}
        </div>
      </uib-tab>
      <uib-tab heading="Comparativa" active="tabs[3].active" ng-click="selectTab('tabcompare')">
        <div class="bg-light padded-l">
          {% include "admin-request-detail-general.html.swig" %}

          {% include "admin-request-compare.html.swig" %}
        </div>
      </uib-tab>
      <uib-tab heading="Historico" active="tabs[4].active" ng-click="selectTab('tabhistoric')">
        <div class="bg-light padded-l">
          {% include "admin-request-detail-general.html.swig" %}

          {% include "admin-request-historic.html.swig" %}
        </div>
      </uib-tab>
    </uib-tabset>
  </div>
</div>


