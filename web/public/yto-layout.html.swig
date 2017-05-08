<!DOCTYPE html>
<html lang="{? language ?}" xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<title>{?title?}</title>
	<!-- Canonical -->
	{# to use set var canonicalurl in obj to swig #}
	{% if canonicalurl != '' || canonicalurl != undefined %}
	<link rel="canonical" href="{? canonicalurl ?}" />
	{% endif %}
	<!-- General META -->
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />

	<!-- crawler bot to request links with _escaped_fragment_ https://developers.google.com/webmasters/ajax-crawling/docs/specification?csw=1 -->
	<meta name="fragment" content="!" />


	<!-- Semantic META -->
	<meta name="description" content="{? description ?}" />
	<meta name="robots" content="{% if robots %}{? robots ?}{% else %}index, follow{% endif %}" />
	<!-- google site verification -->
	<meta name="google-site-verification" content="WABGdUhjgUNcGOHeTzRBLHxm5I--QkSAgMWadUKIztg" />
	<!-- end google site verification -->
	{% if brandprefix == null %}
	<!-- Fav Icon -->
	<link rel="shortcut icon" href="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_48/{? brand.cloudinaryfolder ?}/favicon.ico" />
    <link rel="icon" href="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_32/{? brand.cloudinaryfolder ?}/favicon.png" sizes="32x32"/>
    <link rel="icon" href="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_48/{? brand.cloudinaryfolder ?}/favicon.png" sizes="48x48"/>
    <link rel="icon" href="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_64/{? brand.cloudinaryfolder ?}/favicon.png" sizes="64x64"/>
    <link rel="icon" href="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_128/{? brand.cloudinaryfolder ?}/favicon.png" sizes="128x128"/>
    <link rel="apple-touch-icon" href="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_180/{? brand.cloudinaryfolder ?}/favicon.png" />
    <link rel="apple-touch-icon" sizes="57x57" href="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_57/{? brand.cloudinaryfolder ?}/favicon.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_72/{? brand.cloudinaryfolder ?}/favicon.png" />
    <link rel="apple-touch-icon" sizes="76x76" href="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_76/{? brand.cloudinaryfolder ?}/favicon.png" />
    <link rel="apple-touch-icon" sizes="114x114" href="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_114/{? brand.cloudinaryfolder ?}/favicon.png" />
    <link rel="apple-touch-icon" sizes="120x120" href="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_120/{? brand.cloudinaryfolder ?}/favicon.png" />
    <link rel="apple-touch-icon" sizes="144x144" href="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_144/{? brand.cloudinaryfolder ?}/favicon.png" />
    <link rel="apple-touch-icon" sizes="152x152" href="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_152/{? brand.cloudinaryfolder ?}/favicon.png" />
	{% endif %}
	<style>
	.dmcmainmargin {
		margin-top: 42px;
	}
	</style>
		<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
		<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
		<!--[if lt IE 9]>
		  <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
		  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
		<![endif]-->
		<!--Application CSS Files-->
		{% set csspath = '/css/' %}
		
		<!-- delay this link to bottom page <link href='http://fonts.googleapis.com/css?family=Open+Sans:400italic,400,700,300%7CRaleway:600' rel='stylesheet' type='text/css'> -->
		
		<link href="{%- if css -%}{?css?}{%- else -%}/css/yto-main.css{%- endif -%}?v={? appversion ?}" rel="stylesheet"/>
		<!--<link href="/css/yto-main.css?v={? appversion ?}" rel="stylesheet"/>-->
		<!-- Bower CSS Dependencies -->
        <link rel="stylesheet" href="/components/angular-color-picker/dist/angularjs-color-picker.min.css" />
        <!-- only include if you use bootstrap -->
        <link rel="stylesheet" href="/components/angular-color-picker/dist/themes/angularjs-color-picker-bootstrap.min.css" />
		<link rel="stylesheet" href="/js/angular/vendor/pop-notify/angular-ui-notification.css" />
		{%- block css -%}{%- endblock -%}
		<script src="/js/vendor/modernizr-custom.2.8.3.js"></script>
		{% block pagination -%}{%- endblock -%}
</head>
{% set headerfile = 'partials/' + prefix + '/header/' + prefix + '-header.html.swig' %}

<body class="{%- block bodyclass -%}{%- endblock -%}
	{%- if loginsession != null && loginsession.user != null %} affiliate-session
	{%- else %} no-session{%- endif -%}"
	ng-app="openMarketTravelApp" ng-style="bodyStyle" ng-cloak class="ng-cloak">{%- include headerfile -%}
	
	<main class="">{%- block body -%}{%- endblock -%}</main>

{% set footerfile = 'partials/' + prefix + '/footer/' + prefix + '-footer.html.swig' %}

{%- include footerfile -%}
<!-- init message holders -->
<toaster-container toaster-options="{'time-out': 3000}"></toaster-container>
<div class="preloader-blanket">
  <div class="preloader"><span></span><span></span><span></span></div>
</div>
<div id="errorholder"></div>
<!-- end message holders -->
	<!-- cookie warn -->
	{% if !session %}
	<div ng-controller="cookiewarnCtrl">
		<div ng-if="accepted == ''" ng-include="'/partials/widgets/yto-cookie_warn.html.swig?v={? brand.appversion ?}'" ></div>
	</div>
	{% endif %}
	{% block javascript %}
	<script>
	// server omt data
	var navigationType = '{? navigationType ?}';
	var brandPath = '{? brand.path ?}';
	var brand = '{? brand | json | safe ?}';
	var appversion = '{? brand.appversion ?}';
	var appseed = '{? brand.appseed ?}';
	var BC = '{? bc | json | safe | escape ?}';
	var isWhiteLabel = false;
	var loginsession = {? loginsession | json | safe ?};
	var editiondata = {? editdata | json |safe ?};
	var dmcdata = {? dmcdata | json | safe ?};
	var adminaccess = {? adminrevision.toString() ?};
	var loadedcurrencies = {? currencies | json | safe ?};
	var currentcurrency = {? currentcurrency | json | safe ?};
	var loadedexchanges = {? exchanges | json | safe ?};
	var sessionswitch = {? sessionswitcher | json | safe ?};

	// common cookie read
    function getCookie(cname) {
	    var name = cname + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0; i<ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1);
	        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
	    }
	    return "";
	}
	var snapshoot=getCookie("snapshoot");

    if (snapshoot=="") {
		// loading the SDK asynchronously
  		// <!-- Browser advice-->
		var $buoop = {vs:{i:10,f:25,o:12.1,s:7},c:2};
		function $buo_f(){
		 var e = document.createElement("script");
		 e.src = "//browser-update.org/update.min.js";
		 document.body.appendChild(e);
		};
		try {document.addEventListener("DOMContentLoaded", $buo_f,false)}
		catch(e){window.attachEvent("onload", $buo_f)}
		// <!-- End Browser advice-->
	}
	</script>

	<script type="text/javascript" src="/js/vendor/underscore/underscore-min.js"></script>
	<script type="text/javascript" src="/js/vendor/async/async.js"></script>
	{% include 'partials/jscalls/angular.html.swig'%}
	<script src="/js/angular/vendor/ui-bootstrap/ui-bootstrap-tpls-0.14.3.min.js"></script>
	<script src="/js/angular/vendor/pop-notify/angular-ui-notification.js?v={? appversion ?}"></script>


	<!-- Main Module -->
	<script src="/js/angular/yto-app.js?v={? brand.appversion ?}"></script>
	<script src="/js/angular/a-providers/schema.rel.provider.js?v={? brand.appversion ?}"></script>
	<!-- Dependencies -->
	<script src="/js/angular/vendor/checklist/checklist-model.js?v={? brand.appversion ?}"></script>
	<script src="/js/angular/vendor/toaster/toaster.js?v={? brand.appversion ?}"></script>
	<script src="/js/angular/vendor/bootstrap-slider-master/dist/bootstrap-slider.min.js?v={? brand.appversion ?}"></script>
	<script src="/js/libs/angular-bootstrap-lb.js?v={? brand.appversion ?}"></script>
	<script src="/js/angular/vendor/angular-dragandrop/angular-drag-and-drop-lists.js??v={? brand.appversion ?}"></script>
	<!-- Directives -->
	<script src="/js/angular/directives/autocomplete.js?v={? brand.appversion ?}"></script>
	<script src="/js/angular/directives/fileselect.js?v={? brand.appversion ?}"></script>
	<script src="/js/angular/directives/whiteLabelPreview.js?v={? brand.appversion ?}"></script>

	<!-- Services  -->
	<script src="/js/angular/services/httpsvc.js?v={? brand.appversion ?}"></script>
	<script src="/js/angular/services/anchorsmooth.js?v={? brand.appversion ?}"></script>
	<script src="/js/angular/services/apiyttoo.js?v={? brand.appversion ?}"></script>
	<script src="/js/angular/services/googleGeocoding.js?v={? brand.appversion ?}"></script>
	<script src="/js/angular/services/ytosessionMgr.js?v={? brand.appversion ?}"></script>
	<script src="/js/angular/services/fileuploader.js?v={? brand.appversion ?}"></script>
	<script src="/js/angular/services/tools.js?v={? brand.appversion ?}"></script>
	<script src="/js/angular/services/modals.js?v={? brand.appversion ?}"></script>
	<script src="/js/angular/services/destinations.js?v={? brand.appversion ?}"></script>
	<script src="/js/angular/services/tsListBrowser.js?v={? brand.appversion ?}"></script>
	<script src="/js/angular/auth/authctrl.js?v={? brand.appversion ?}"></script>
	<script src="/js/angular/filters/trust.js?v={? appversion ?}"></script>
	<script src="/js/angular/helpers/productpreviewhelpers.js?v={? brand.appversion ?}"></script>
	

	<!-- Include all compiled plugins (below), or include individual files as needed -->
	<script src="/js/libs/retina.js"></script>
	<!-- Google Tag Manager -->
	<noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-KHCPR3"
	height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
	<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
	new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
	j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
	'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
	})(window,document,'script','dataLayer','GTM-KHCPR3');</script>
	<!-- End Google Tag Manager -->
	<!-- init structured data contact -->
	<script type="application/ld+json">
		{ "@context" : "http://schema.org",
		  "@type" : "Organization",
		  "url" : "http://www.yourtto.com",
		  "logo": "http://res.cloudinary.com/open-market-travel/image/upload/v1438156257/yourttoo.com/yourttoo.com_logo_x2.png",
		  "contactPoint" : [
		    { "@type" : "ContactPoint",
		      "telephone" : "+34-971-902-473",
		      "contactType" : "customer service",
		      "areaServed" : "ES",
		      "availableLanguage" : ["Spanish","English"]
		    } ] }
	</script>
	<!-- init structured data website -->
	<script type="application/ld+json">
	    {  "@context" : "http://schema.org",
	       "@type" : "WebSite",
	       "name" : "yourttoo.com",
	       "alternateName" : "yourttoo.es youttoo.com youto.com yourto.com",
	       "url" : "http://www.yourttoo.com"
	    }
    </script>
<!-- General Controllers -->
	<script src="/js/angular/admin/HeaderCtrl.js?v={? brand.appversion ?}"></script>
	<script src="/js/angular/shared/buscadorCtrl.js?v={? brand.appversion ?}"></script>
	<script src="/js/angular/shared/cookiewarnCtrl.js?v={? brand.appversion ?}"></script>
	{% endblock %}
	<!-- small css delayed -->
	<link href='http://fonts.googleapis.com/css?family=Roboto:400,300,700|Montserrat' rel='stylesheet' type='text/css'>

    <!-- Bower JS Dependencies -->
    <script src="/components/tinycolor/dist/tinycolor-min.js"></script>
    <script src="/components/angular-color-picker/dist/angularjs-color-picker.min.js"></script>
</body>

</html>



