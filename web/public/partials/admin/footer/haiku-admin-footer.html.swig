{# {%- if session -%}
	{%- if session.user -%}
		{%- if session.user.isAffiliate -%}
			{%- include "haiku-footer-affiliate.html.swig" -%}
		{%- else -%}
			{%- include "haiku-footer-public.html.swig" -%}
		{%- endif -%}
	{%- else -%}
		{%- include "haiku-footer-public.html.swig" -%}
	{%- endif -%}
{%- else -%}
	{%- include "haiku-footer-public.html.swig" -%}
{%- endif -%} #}
{%- include "haiku-footer-public.html.swig" -%}