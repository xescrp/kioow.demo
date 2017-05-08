{%- extends 'admin-layout.html.swig' -%}

{%- block bodyclass -%}user-front account{%- endblock -%}

{%- block body -%}	
	{%- set partialpath = 'partials/admin/edit/'  + editioname + '.html.swig' -%}
	{%- include partialpath -%}
{%- endblock -%}

{% block javascript %}
  {% parent %}
<!-- maps -->
{% include "partials/jscalls/apigmaps.html.swig" %}

<script type="text/javascript">
	var markers = {? markers | json | safe ?};	 
    var editiondata = {? editdata | json |safe ?};
	var dmcdata = {? dmcdata | json | safe ?};
	var adminaccess = {? adminrevision.toString() ?};
	var blankdata = {? blankdata | json | safe ?};
</script>
<script src="/js/libs/markerwithlabel.js?v={? brand.appversion ?}"></script>
<script src="/js/mapstyles/yto.js?v={? brand.appversion ?}"></script>
<script src="/js/libs/itinerarymap.js?v={? brand.appversion ?}"></script>
<script src="/js/libs/jseditor/jsoneditor.js?v={? brand.appversion ?}"></script> 
<!-- script src="/js/libs/uxloadprod.js?v={?appversion?}"></script -->

<!-- Controllers -->	
<script src="/js/libs/1.4.9/i18n/angular-locale_es-es.js"></script>
<script src="/js/angular/admin/ProgramCtrl.js?v={?appversion?}"></script>
<script src="/js/angular/shared/messageCtrl.js?v={? brand.appversion ?}"></script>
<script src="/js/angular/admin/accountCtrl.js?v={? brand.appversion ?}"></script>
<script src="/js/angular/admin/bookingCtrl.js?v={? brand.appversion ?}"></script>
<script src="/js/angular/admin/requestCtrl.js?v={? brand.appversion ?}"></script>
<script src="/js/angular/admin/quoteDir.js?v={? brand.appversion ?}"></script>
<script src="/js/angular/admin/destinationsCtrl.js?v={? brand.appversion ?}"></script>
<script src="/js/angular/invoice/invoiceCtrl.js?v={? brand.appversion ?}"></script>
<script src="/js/angular/tailormade/RequestShowCtrl.js?v={?appversion?}"></script>
<script src="/js/angular/helpers/affiliatehelpers.js?v={? brand.appversion ?}"></script>
<script src="/js/angular/helpers/queryhelpers.js?v={? brand.appversion ?}"></script>
<script src="/js/angular/helpers/quotehelpers.js?v={? brand.appversion ?}"></script>
<script src="/js/angular/helpers/bookinghelpers.js?v={? brand.appversion ?}"></script>
<script src="/js/angular/helpers/affiliatehelpers.js?v={? brand.appversion ?}"></script>
<script src="/js/angular/helpers/productpreviewhelpers.js?v={? brand.appversion ?}"></script>
<script src="/js/angular/helpers/pricehelpers.js?v={? brand.appversion ?}"></script>
<script src="/js/angular/directives/programpreview.js?v={? brand.appversion ?}"></script>
<script src="/js/angular/directives/programeditor.js?v={? brand.appversion ?}"></script>
<script src="/js/angular/services/WLhelper.js?v={? brand.appversion ?}"></script>
<script src="/js/angular/services/affiliateService.js?v={? appversion ?}"></script>
<script src="/js/angular/directives/select-dmc-program.js??v={? brand.appversion ?}"></script>
{% endblock %}
