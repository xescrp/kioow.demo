<!DOCTYPE html>
<html lang="{? language ?}" xmlns="http://www.w3.org/1999/xhtml">

<head>
	<title>{?title?}</title>

	<!-- General META -->
	<meta charset="utf-8">
	<meta http-equiv="Content-type" content="text/html;charset=UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!-- Fav Icon -->
	<link rel="shortcut icon" href="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_48/v1441697527/{? brand.cloudinaryfolder ?}/favicon.ico" />
    <link rel="icon" href="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_32/v1441697527/{? brand.cloudinaryfolder ?}/favicon.png" sizes="32x32"/>
    <link rel="icon" href="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_48/v1441697527/{? brand.cloudinaryfolder ?}/favicon.png" sizes="48x48"/>
    <link rel="icon" href="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_64/v1441697527/{? brand.cloudinaryfolder ?}/favicon.png" sizes="64x64"/>
    <link rel="icon" href="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_128/v1441697527/{? brand.cloudinaryfolder ?}/favicon.png" sizes="128x128"/>
    <link rel="apple-touch-icon" href="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_180/v1441697527/{? brand.cloudinaryfolder ?}/favicon.png" />
    <link rel="apple-touch-icon" sizes="57x57" href="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_57/v1441697527/{? brand.cloudinaryfolder ?}/favicon.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_72/v1441697527/{? brand.cloudinaryfolder ?}/favicon.png" />
    <link rel="apple-touch-icon" sizes="76x76" href="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_76/v1441697527/{? brand.cloudinaryfolder ?}/favicon.png" />
    <link rel="apple-touch-icon" sizes="114x114" href="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_114/v1441697527/{? brand.cloudinaryfolder ?}/favicon.png" />
    <link rel="apple-touch-icon" sizes="120x120" href="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_120/v1441697527/{? brand.cloudinaryfolder ?}/favicon.png" />
    <link rel="apple-touch-icon" sizes="144x144" href="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_144/v1441697527/{? brand.cloudinaryfolder ?}/favicon.png" />
    <link rel="apple-touch-icon" sizes="152x152" href="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_152/v1441697527/{? brand.cloudinaryfolder ?}/favicon.png" />
		
	<!--Application CSS Files-->
	<link href='http://fonts.googleapis.com/css?family=Roboto:400,300,700|Montserrat' rel='stylesheet' type='text/css'>
	<link href="http://www.yourttoo.com/css/yto-main.css" rel="stylesheet">
	{% block css %}{% endblock %}
			
</head>

<body class="{% block bodyclass %}{% endblock %}">
	
	<main>{%- block body -%}
	{%- endblock -%}</main>
		
	{% block javascript %}
	{% include 'partials/jscalls/angular.html.swig'%}
	
	<!-- Main Module -->
	<script src="/js/angular/app.js?v={? brand.appversion ?}"></script>
	{% endblock %}
</body>
	
</html>



	