{% extends '../yto-layout.html.swig' %}

{% block body %}
<style>

.mutted{
	color: #CCC;
	font-family: Helvetica;
}
h5{
	font-family: Helvetica;
	margin: 4px 0;
	font-size: 12px;
	color: #666;
	font-weight: 200;
}
</style>

<tr>
	<td align="center" valign="top" style="padding:30px;" id="templatesList">
		<h3>
			TRANSACTIONAL-EMAILS
			<button id="openAll">Abrir TODOS los emails en pestañas</button>
		</h3>
		<h1>White Label</h1>
		<h4>Booking</h4>
		<ul >
			<li>
			<h5>Subject: <em>Reserva - %idbooking%</em></h5>
			<a href="/te/wl/wl-affiliate-new-booking?market=wl" target="_blank">Booking Mail Para Agencia (nueva reserva)</a>
			</li>
			<li>
			<h5>Subject: <em>Nueva reserva Marca Blanca </em></h5>
			<a href="/te/wl/wl-new-booking?market=wl" target="_blank">Booking Mail Para Traveler Sense (nueva reserva)</a>
			</li>
			<li>
			<h5>Subject: <em></em></h5>
			<a href="/te/wl/wl-dmc-new-booking?market=wl" target="_blank">Booking Mail Para DMC (nueva reserva)</a>
			</li>
			<li>
			<h5>Subject: <em></em></h5>
			<a href="/te/wl/wl-user-prebooking?market=wl" target="_blank">Booking Mail Para Traveler (nueva reserva)</a>
			</li>
			<li>
			<h5>Subject: <em></em></h5>
			<a href="/te/wl/wl-user-booking-remember?market=wl" target="_blank">Booking Mail Para Traveler (Recordatorio pago)</a>
			</li>
			<li>
			<h5>Subject: <em></em></h5>
			<a href="/te/wl/wl-user-booking?market=wl" target="_blank">Booking Mail Para Traveler (segundo pago)</a>
			</li>
			<li>
			<h5>Subject: <em></em></h5>
			<a href="/te/wl/wl-user-remember-voucher?market=b2b" target="_blank">Booking Mail Para Traveler (Recordatorio Bono)</a>
			</li>
		</ul>
		
	</td>
</tr>

{% include "../partials/index-utils.html.swig" %}

{% endblock %}