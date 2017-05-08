<header class="navbar navbar-default navbar-fixed-top" ng-controller="HeaderCtrl" ng-init="setopenpopup(true)">
{% if session %}
	{% if session.user %}
		{% if session.user.isAffiliate %}
		<!-- affiliate header start -->
			{% if session.affiliate.membership.registervalid %}
				{% include "haiku-header-affiliate.html.swig" %}
			{% else %}
				{% include "haiku-header-public.html.swig" %}
			{% endif %}
			<!-- affiliate header end -->
		{% else %}
			<!-- common header start -->
			{% include "haiku-header-public.html.swig" %}
			<!-- common header end --> 
		{% endif %}
	{% else %}
		<!-- common header start -->
		{% include "haiku-header-public.html.swig" %}
		<!-- common header end --> 
	{% endif %}
{% else %}
	<!-- common header start -->
  {% include "haiku-header-public.html.swig" %}
  <!-- common header end --> 
{% endif %}
</header>