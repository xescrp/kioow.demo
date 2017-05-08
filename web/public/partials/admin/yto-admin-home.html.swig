<div class="">
  {% set includepath = 'home/' %}
  {% if brandprefix != '' %} {% set includepath = includepath + brandprefix + '-' %} {% endif %}
  {% set includepath += loginsession.user.rolename + '-home.html.swig' %}
  {% include includepath %}
</div>
