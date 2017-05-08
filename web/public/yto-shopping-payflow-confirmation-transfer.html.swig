{% extends 'yto-layout.html.swig' %}
{% block bodyclass %}user-front shopping-prebooking-page confirmation-page{% endblock %}

{% block body %}
<section ng-controller="bookingProformaDownloadCtrl"> 
<section>

<body class="user-front shopping-prebooking-page confirmation-page">   
    <section class="shopping-prebooking">
      <div class="container static-content">
        <article>
        <div class="row static-thumb light sm">
          <div class="st-img text-center">
          <h2 class="mt-zero"><i class="fa fa-check-circle mb-b fa-3x middle text-light fadein-xxl"></i>&nbsp; <br class="visible-xs" /></h2>
          </div>
          <div class="st-description">
            <h1 class="thin mt-zero">Tu reserva está confirmada</h1>
            <h2 class="thin mt-zero mb-xxl">Te enviaremos un correo  con los detalles</h2>
            <h3 class="mt-zero locata padded-xl text-gray uppercase bold">Localizador: {? idBooking ?}</h3>
          </div>
        </div>
        </article>
      </div>
    </section>
	{% set ctincluded = 'partials/booking/' %}
	{% if brandprefix != '' %} {% set ctincluded = ctincluded + brandprefix + '-' %} {% endif %}
    {% set ctafile = ctincluded + 'booking-thanks-cta.html.swig' %}
    <!-- cta and data banking -->
    {% include ctafile ignore missing %}
	{% set includepath = 'partials/widgets/' %}
	{% if brandprefix != '' %} {% set includepath = includepath + brandprefix + '-' %} {% endif %}
    {% set actionsconf = includepath + 'actions-confirmation.html.swig' %}
    <!-- insurance and visas -->
    {% include  actionsconf ignore missing %}

</section>  
{% endblock %}

{% block javascript %}
    {% parent %}

     <script type="text/javascript">
      var booking = {? booking | json | safe ?};
      var product = {? product | json | safe ?};
    </script>

    {% if booking.payStatus.length < 2 %}
    <!-- Google Code for Ecommerce Tracking -->
    <script type="text/javascript">

      var _gaq = _gaq || [];
      _gaq.push(['_setAccount', 'UA-66956626-1']);
      _gaq.push(['_trackPageview']);
      _gaq.push(['_addTrans',
        '{? idBooking ?}{?enviroment?}',            // transaction ID - required
        '{? brand.name ?}',                        // affiliation or store name
        '{? booking.amount.exchange.value ?}',       // total - required
        '',                           // tax
        '',                           // shipping
        '',                           // city
        '',                           // state or province
        'ES'                         // country
      ]);

       // add item might be called for every item in the shopping cart
       // where your ecommerce engine loops through each item in the cart and
       // prints out _addItem for each


      _gaq.push(['_addItem',
        '{? idBooking ?}{?enviroment?}',           // transaction ID - required
        '{? product.code ?}',        // SKU/code - required
        '{? product.title_es ?}',    // product name
        '',                          // category or variation
        '{? unitPrice ?}',           // unit price - required
        '{? paxNumber ?}'            // quantity - required
      ]);
      _gaq.push(['_trackTrans']); //submits transaction to the Analytics servers
      _gaq.push(['_set', 'currencyCode', 'EUR']);
      (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      })();

    </script>

    {% endif %}
    <!-- Controllers -->
     <script src="/js/angular/booking/bookingProformaDownloadCtrl.js?v={? brand.appversion ?}"></script>

<!-- service s-->
     <script src="/js/angular/helpers/bookinghelpers.js?v={? brand.appversion ?}"></script>

	{% if newlocation %}
	<script type="text/javascript">
	(function(){
		try{
			window.parent.location.href = '{? newlocation ?}';
		}
		catch(err){
			console.log(err);
		}
		
	})();
	</script>
	{% endif %}
{% endblock %}