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
    <div class="col-xs-12 mb-l">
		<table id="#headerpage" width="100%">
			<tr>
				<td><img class="iblock" src='{? getUrlCloudinary(logo, 'avatarl70') ?}' alt="{?  name ?} photo" title="{?  name ?} photo"/>
				<h3 class="bold iblock ml-b">{? name ?}</h3></td>
				<td><p id="agencyAddress" class="mt-b mb-zero">
					{? address ?} {? cp ?} {? city ?}<br/>
					tel: {? phone ?}<br/>
					web: {? web ?}<br/>
				</p></td>
			</tr>
		</table>
		<h1 id="title" class="pt-l mt-b text-center">{? title ?}</h1>
		
		<div class="text-center">
			{% if category %}
			<h4 id="category" class="colorbg">{? category ?}</h4>
			{% else %}
			<h4 id="category"></h4>
			{% endif %}
		</div>
	</div>
</div>
</body></html>