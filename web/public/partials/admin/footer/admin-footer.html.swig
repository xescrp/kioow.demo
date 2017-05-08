{#{%- if session && session.user -%}
		{%- if session.user.isAffiliate -%}
			{%- include "admin-footer-affiliate.html.swig" -%}
		{%- endif -%}
		{%- if session.user.isAdmin -%}
			{%- include "admin-footer-affiliate.html.swig" -%}
		{%- endif -%}
		{%- if session.user.isDMC -%}
			{%- include "admin-footer-dmc.html.swig" -%}
		{%- endif -%}
{%- else -%}
	{%- include "admin-footer-public.html.swig" -%}
{%- endif -%}#}


  {% set footerpath = 'admin-footer-public.html.swig' %}
  {% if loginsession && loginsession.user %}
    {% set footerpath = 'admin-footer-' + loginsession.user.rolename + '.html.swig' %}
    {% if loginsession.user.isAffiliate || loginsession.user.isAdmin %}
      {% set footerpath = 'admin-footer-affiliate.html.swig'  %}
    {% endif %}
  {% endif %}
  {% if brandprefix != '' %} {% set footerpath = brandprefix + '-' + footerpath %} {% endif %}
  {% if footerprefix != '' %} {% set footerpath = footerprefix + '-' + footerpath %} {% endif %}
  {% include footerpath %}
