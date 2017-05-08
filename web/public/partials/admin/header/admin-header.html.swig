<header class="navbar navbar-default navbar-fixed-top" ng-controller="HeaderCtrl" ng-init="setopenpopup(true)">
  {% set headerpath = 'admin-header-public.html.swig' %}
  {% if loginsession && loginsession.user %}
    {% set headerpath = 'admin-header-' + loginsession.user.rolename + '.html.swig' %}
    {% if loginsession.user.isAffiliate && !loginsession.affiliate.membership.registervalid %}
      {% set headerpath = 'admin-header-public.html.swig'  %}
    {% endif %}
  {% endif %}
  {% if brandprefix != '' %} {% set headerpath = brandprefix + '-' + headerpath %} {% endif %}
  {% include headerpath %}
</header>