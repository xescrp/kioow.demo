{% extends 'admin-layout.html.swig' %}

{% block bodyclass %}user-front account{% endblock %}

{% block body %}
	{% set partialname = 'js/angular/components/ts-list-pages/templates/admin-list.html'  %}	
	{% include partialname %}
{% endblock %}

{% block javascript %}
<!-- parent -->  
{% parent %}
<!--  end parent -->
<script type="text/javascript">
	var typeList = {? typeList | json | safe ?};
	var admin_collectionname = 	'{? collection ?}';
	var list_name = '{? listname ?}';
	isWhiteLabel = false;
</script>
<!-- services -->
<script src="/js/angular/helpers/bookinghelpers.js?v={? brand.appversion ?}"></script>
<!-- Controllers -->
<script src="/js/libs/1.4.9/i18n/angular-locale_es-es.js?v={? brand.appversion ?}"></script> 
<script src="/js/angular/components/ts-list-pages/script/admin-listCtrl.js?v={? brand.appversion ?}"></script>
<script src="/js/angular/components/ts-tables/script/table.js?v={? brand.appversion ?}"></script>
<script src="/js/angular/components/ts-filterboxes/script/filter-dates-like-ctrl.js?v={? brand.appversion ?}"></script>
<script src="/js/angular/components/ts-filterboxes/script/filter-dates-like-dmc-affi.js?v={? brand.appversion ?}"></script>
<script src="/js/angular/components/ts-filterboxes/script/filter-dmcs.js?v={? brand.appversion ?}"></script>
<script src="/js/angular/components/ts-filterboxes/script/filter-products.js?v={? brand.appversion ?}"></script>
<script src="/js/angular/components/ts-filterboxes/script/filter-affiliates.js?v={? brand.appversion ?}"></script>
<script src="/js/angular/components/ts-filterboxes/script/filter-hevents.js??v={? brand.appversion ?}"></script>
<script src="/js/angular/components/ts-filterboxes/script/filter-toolbar.js??v={? brand.appversion ?}"></script>
<script src="/js/angular/components/ts-filterboxes/script/filter-list.js??v={? brand.appversion ?}"></script>
<script src="/js/angular/components/ts-filterboxes/script/shortcut-programs.js??v={? brand.appversion ?}"></script>
<script src="/js/angular/directives/select-dmc-program.js??v={? brand.appversion ?}"></script>
{% endblock %}
