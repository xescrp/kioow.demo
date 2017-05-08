{% extends 'yto-layout.html.swig' %}
{% block bodyclass %}user-front account{% endblock %}
{% block body %}
		{% include "partials/tailormade/yto-requestquotemain.html.swig" %}
{% endblock %}

{% block javascript %}
  {% parent %}
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD-H5AvlatgN9nB8gXQvX64Gv7B0IaYyiE&amp;libraries=places&amp;language=es"></script>
<script type="text/javascript">
    var markers = {? markers | json | safe ?};
    //var minPrice = {? minPrice | json | safe ?};
    var quote = {? quote | json | safe ?};
    var product = {? product | json | safe ?};
</script>
<script src="/js/libs/markerwithlabel.js?v={? brand.appversion ?}"></script>
<script src="/js/mapstyles/yto.js?v={? brand.appversion ?}"></script>
<script src="/js/libs/itinerarymap.js?v={? brand.appversion ?}"></script> 
<script src="/js/libs/1.4.9/i18n/angular-locale_es-es.js"></script>
<!-- Controllers -->
<script src="/js/angular/services/breadcrumbBuilder.js?v={? brand.appversion ?}"></script>	
<script src="/js/angular/shared/messageCtrl.js?v={? brand.appversion ?}"></script>
<script src="/js/angular/programs/ProgramCtrl.js?v={? brand.appversion ?}"></script>
<script src="/js/angular/tailormade/RequestShowCtrl.js?v={? brand.appversion ?}"></script>
<script src="/js/angular/helpers/pricehelpers.js?v={? brand.appversion ?}"></script>
<script src="/js/angular/helpers/bookinghelpers.js?v={? brand.appversion ?}"></script>
<script src="/js/angular/directives/programpreview.js?v={? brand.appversion ?}"></script>
{% endblock %}
