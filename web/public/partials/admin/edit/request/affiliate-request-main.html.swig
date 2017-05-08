<div class="container" ng-controller="RequestCtrl">
    <div class="row no-print">
        <div class="col-md-12">		
            <ul class="breadcrumb">
              <li>
                <a href="/home" target="_self">Inicio</a>
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
              <li><a href="/admin/queries" target="_self">Solicitudes a medida</a></li>
              <li class="active">{{query.code}}</li>
            </ul>
          <div class="page-header">
            <h1>
              Solicitud de viaje a medida
              <small class="text-xs">ID: {{userquery.code}}</small>
            </h1>
          </div>
        </div>
    </div>
    <div class="row no-print mb-xxl">
      <uib-tabset>
        <uib-tab heading="Detalles" active="tabs[0].active" ng-click="selectTab('tabdetails')">
          <div class="bg-light padded-l">
            {% include "affiliate-request-detail-general.html.swig" %}

            {% include "admin-request-detail.html.swig" %}
          </div>
        </uib-tab>
      
        <uib-tab heading="Cotizaciones" active="tabs[1].active" ng-click="selectTab('tabcompare')">
          <div class="bg-light padded-l">
            {% include "affiliate-request-detail-general.html.swig" %}

            {% include "affiliate-request-responses.html.swig" %}
          </div>
        </uib-tab>
      </uib-tabset>
    </div>

   
</div>


