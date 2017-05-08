{% extends 'yto-layout.html.swig' %}

{% block bodyclass %}user-front account{% endblock %}

{% block body %}	
	{% include "partials/yto/booking/yto-bookingmain.html.swig" %}
{% endblock %}

{% block javascript %}
  {% parent %}
<!-- maps -->
{% include "partials/jscalls/apigmaps.html.swig" %}

<script type="text/javascript">
	var markers = {? markers | json | safe ?};	 
   // var idBooking = {? idBooking | json | safe ?};
</script>
<script src="/js/libs/markerwithlabel.js?v={? brand.appversion ?}"></script>
<script src="/js/mapstyles/yto.js?v={? brand.appversion ?}"></script>
<script src="/js/libs/itinerarymap.js?v={? brand.appversion ?}"></script> 

<!-- Services -->
<script src="/js/angular/services/productpreviewhelpers.js?v={? brand.appversion ?}"></script>
<script src="/js/angular/services/bookinghelpers.js?v={? brand.appversion ?}"></script>

<!-- Controllers -->	
<script src="/js/angular/1.4.9/i18n/angular-locale_es-es.js"></script>
<script src="/js/angular/affiliate/affiliateBookingCtrl.js?v={? brand.appversion ?}"></script>
<script src="/js/angular/shared/messageCtrl.js?v={? brand.appversion ?}"></script>

{% endblock %}
