{% extends '../telayout.html.swig' %}

{% block body %}
<style>

h4{
	margin-top: 20px;
	margin-bottom: 10px;
}
h5{
	font-family: Helvetica;
	margin: 4px 0;
	font-size: 12px;
	color: #666;
	font-weight: 200;
}

a{
	color:#FF6059;
	text-decoration: none;
	font-family: Helvetica;
}

ul{
	padding-left:0px;
	margin:0;
}
ul li{
	margin:0px 10px 15px 0;
	list-style:none;
	text-align: left;
}

ul li a{
	margin-left:15px;
}

.mutted{
	color: #CCC;
	font-family: Helvetica;
}

pre{
	text-align: left;
    background-color: #FEFEFE;
    padding: 30px;
    border: thin solid #AAA;
}

</style>
<tr>
	<td align="center" valign="top" style="padding:30px;">
		<h3>
			TRANSACTIONAL-EMAILS
			<button id="openAll">Abrir TODOS los emails en pestañas</button>
		</h3>
		<h1>DMCs / Receptivos</h1>
		<h4>Account</h4>
		<ul id="templatesList">
			<li>
			<h5>Subject: <em>Welcome to openmarket.travel</em></h5>
			<a href="/te/dmc/en-dmc-01-thanks" target="_blank">en-dmc-01-thanks</a>
			</li>
			<li>
			<h5>Subject: <em>[OMT] - %dmccompanyname% Account activated</em></h5>
			<a class="mutted" href="/te/dmc/en-dmc-02-welcome" target="_blank">en-dmc-02-welcome</a>
			</li>
			<li>
			<h5>Subject: <em>Welcome to OpenMarket.travel</em></h5>
			<a href="/te/dmc/en-dmc-03-email-confirmed" target="_blank">en-dmc-03-email-confirmed</a>
			</li>
			<li>
			<h5>Subject: <em>Password Recovery Request</em></h5>
			<a href="/te/dmc/en-dmc-000-forgot" target="_blank">en-dmc-000-forgot</a>
			</li>
		</ul>
		<h4>Product</h4>
		<ul id="templatesList">
			<li>
			<h5>Subject: <em>[OMT] - %dmccompanyname% can automatically publish programs</em></h5>
			<a href="/te/dmc/en-dmc-03.1-you-can-publish" target="_blank">en-dmc-03.1-you-can-publish</a></li>
			<li>
			<h5>Subject: <em></em></h5>
			<a href="/te/dmc/en-dmc-04-product-publish" target="_blank">en-dmc-04-product-publish</a></li>
		</ul>
		<h4>Booking</h4>
		<ul id="templatesList">
			<li>
			<h5>Subject: <em></em></h5>
			<a class="mutted" href="/te/dmc/en-dmc-11-new-booking-triple-single-room" target="_blank">en-dmc-11-new-booking-triple-single-room</a></li>
			<li>
				<h5>Subject:
				<ul>
				<li><em>[OMT] New Booking: %idbooking%</em></li>
				<li><em>[OMT] New Booking: %idbooking% From Tailormade Request: %querycode%</em></li>
				</ul>
				</h5>
			<a href="/te/dmc/en-dmc-12-new-booking" target="_blank">en-dmc-12-new-booking</a>
			<a href="/te/dmc/en-dmc-12-new-booking?market=b2b" target="_blank">b2b</a>
			</li>
			<li>
			<h5>Subject: <em>[OMT] Booking %idbooking% has been CANCELLED</em></h5>
			<a href="/te/dmc/en-dmc-18-booking-cancell" target="_blank">en-dmc-18-booking-cancell</a>
			<a href="/te/dmc/en-dmc-18-booking-cancell?market=b2b" target="_blank">b2b</a>
			</li>
			<li>
			<h5>Subject: <em>[OMT] Booking %idbooking% has been MODIFIED</em></h5>
			<a href="/te/dmc/en-dmc-19-booking-change" target="_blank">en-dmc-19-booking-change</a>
			<a href="/te/dmc/en-dmc-19-booking-change?market=b2b" target="_blank">b2b</a>
			</li>
		</ul>
		<h4>Tailormade</h4>
		<ul id="templatesList">
			<li>
			<h5>Subject: <em>[OMT] New Tailor Made request %querycode% from %firstname% %lastname%</em></h5>
			<a class="mutted" href="/te/dmc/dmc-07-new-request" target="_blank">dmc-07-new-request</a></li>
			<li><h5>Subject: <em>[OMT] New Tailor Made request %querycode% from %firstname% %lastname%</em></h5>
			<a href="/te/dmc/en-dmc-07-new-request" target="_blank">en-dmc-07-new-request</a>
			<a href="/te/dmc/en-dmc-07-new-request?market=b2b" target="_blank">b2b</a>
			</li>
			<li>
			<h5>Subject: <em></em></h5>
			<a href="/te/dmc/en-dmc-13-query-closed" target="_blank">en-dmc-13-query-closed</a>
			<a href="/te/dmc/en-dmc-13-query-closed?market=b2b" target="_blank">b2b</a>
			</li>
			<li>
			<h5>Subject: <em></em></h5>
			<a class="mutted" href="/te/dmc/en-dmc-14-quote-lost" target="_blank">en-dmc-14-quote-lost</a>
			</li>
			<li>
			<h5>Subject: <em></em></h5>
			<a class="mutted" href="/te/dmc/en-dmc-15-quote-won" target="_blank">en-dmc-15-quote-won</a></li>
			<li>
			<h5>Subject: <em>[OMT] Your quote over the query %querycode% has been discarded.</em></h5>
			<a class="mutted" href="/te/dmc/en-dmc-16-quote-discarded" target="_blank">en-dmc-16-quote-discarded</a>
			<a class="mutted" href="/te/dmc/en-dmc-16-quote-discarded?market=b2b" target="_blank">b2b</a>
			</li>
			<li>
			<h5>Subject: <em></em></h5>
			<a href="/te/dmc/en-dmc-17-query-canceled" target="_blank">en-dmc-17-query-canceled</a>
			<a href="/te/dmc/en-dmc-17-query-canceled?market=b2b" target="_blank">b2b</a>
			</li>
			<li>
			<h5>Subject: <em></em></h5>
			<a href="/te/dmc/en-dmc-20-query-updated" target="_blank">en-dmc-20-query-updated</a>
			<a href="/te/dmc/en-dmc-20-query-updated?market=b2b" target="_blank">b2b</a>
			</li>
			<li>
			<h5>Subject: <em>[OMT] New message from %firstname% %lastname% for tailor made %querycode%</em></h5>
			<a href="/te/dmc/en-dmc-08-new-message" target="_blank">en-dmc-08-new-message</a>
			<a href="/te/dmc/en-dmc-08-new-message?market=b2b" target="_blank">b2b</a>
			</li>
			
		</ul>
	</td>
</tr>

{% include "../partials/index-utils.html.swig" %}

{% endblock %}
