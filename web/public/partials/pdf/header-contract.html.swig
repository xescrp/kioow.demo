<!DOCTYPE html>
<html>
<head>
	<link href="/css/yto-main.css" rel="stylesheet"/>
</head>
<body class="print">

<style type="text/css">
	body{
		margin: 0 0 0 0;
		padding: 0;
		border: none;
	}
	#headerpage{
		margin: 0 0 .3cm 0;
	}
	#agencyAddress{
		text-align: right;
	}
	#title{
		font-size: 20pt!important;
		padding-top: .3cm!important;
		border-top: .05cm solid {% if brand-primary %}{? brand-primary ?}{% else %}#FF5F59{% endif %} !important;
	}
	#category{
		display: inline-block;
		color: white;
		margin: .1cm 0;
		padding: .19cm .2cm .2cm .2cm;
	}
	.colorbg{
		background-color: {% if brand-primary %}{? brand-primary ?}{% else %}#FF5F59{% endif %}
	}
</style>

<div class="container">

	  <div class="col-xs-6 col-md-6 text-left" >
        <img class="iblock" src='http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_25/v1438156257/yourttoo.com/yourttoo.com_logo_x2.png' alt="{?  name ?} photo" title="{?  name ?} photo"/>	
      </div>
      <div class="col-xs-6 col-md-6 text-right" >
        <strong>LOCALIZADOR: {? bookingId?}</strong>
      </div>


   
</div>
</body></html>