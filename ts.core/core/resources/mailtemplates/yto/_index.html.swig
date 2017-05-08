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
		<h1>yourttoo.com</h1>
		{# <pre>https://trello.com/c/0ZiT</pre> #}
		<h4>General Use</h4>
		<ul>
			<li>
			<h5>Subject: <em>%subject%</em></h5>
			<a href="/te/yto/00-gu-noca?market=b2b" target="_blank">00-gu-noca</a></li>
			<li>
			<h5>Subject: <em>%subject%</em></h5>
			<a href="/te/yto/00-gu-ca?market=b2b" target="_blank">00-gu-ca</a></li>
			<li>
			<h5>Subject: <em>Nuevo mensaje de %name%</em></h5>
			<a href="/te/yto/00-message?market=b2b" target="_blank">00-message</a></li>
		</ul>
		
		<h4>Account</h4>
		<ul>
			<li>
			<h5>Subject: <em>Gracias por registrarte</em></h5>
			<a href="/te/yto/01-account-welcome?market=b2b" target="_blank">01-account-welcome</a></li>
			<li>
			<h5>Subject: <em>Cuenta habilitada</em></h5>
			<a href="/te/yto/02-account-email-confirmed?market=b2b" target="_blank">02-account-email-confirmed</a></li>
			<li>
			<h5>Subject: <em>Recuperar contraseña</em></h5>
			<a href="/te/yto/03-account-password-forgotten?market=b2b" target="_blank">03-account-password-forgotten</a></li>
			<li>
			<h5>Subject: <em></em></h5>
			<a class="mutted" href="/te/yto/04-account-email-changed?market=b2b" target="_blank">04-account-email-changed</a></li>
			<li>
			<h5>Subject: <em></em></h5>
			<a class="mutted" href="/te/yto/05-account-password-changed?market=b2b" target="_blank">05-account-password-changed</a></li>
			<li>
			<h5>Subject: <em></em></h5>
			<a class="mutted" href="/te/yto/09-account-to-delete?market=b2b" target="_blank">09-account-to-delete</a></li>
		</ul>
		
		<h4>Booking</h4>
		<ul >
			<li>
			<h5>Subject: <em>Reserva - %idbooking%</em></h5>
			<a href="/te/yto/11-booking-new?market=b2b" target="_blank">11-booking-new</a></li>
			<li>
			<h5>Subject: <em>Hemos recibido el pago de reserva %idbooking%</em></h5>
			<a href="/te/yto/12-booking-payment-ok?market=b2b" target="_blank">12-booking-payment-ok</a></li>
			<li>
			<h5>Subject: <em>Reserva %idbooking% cancelada</em></h5>
			<a href="/te/yto/13-booking-cancelled?market=b2b" target="_blank">13-booking-cancelled</a></li>
			<li>
			<h5>Subject: <em>Nuevo mensaje en la reserva %idbooking%</em></h5>
			<a href="/te/yto/14-booking-chat-msg?market=b2b" target="_blank">14-booking-chat-msg</a></li>
			<li>
			<h5>Subject: <em>Reserva %idbooking% actualizada</em></h5>
			<a href="/te/yto/15-booking-updated-by-affiliate?market=b2b" target="_blank">15-booking-updated-by-affiliate</a></li>
			<li>
			<h5>Subject: <em>Reserva %idbooking% actualizada</em></h5>
			<a href="/te/yto/16-booking-updated-by-admin?market=b2b" target="_blank">16-booking-updated-by-admin</a></li>
		</ul>

		<h4>Tailor Made</h4>
		<ul>
			<li>
			<h5>Subject: <em>Tu petición a medida ID: %querycode%</em></h5>
			<a href="/te/yto/22-tailormade-new?market=b2b" target="_blank">22-tailormade-new</a></li>
			<li>
			<h5>Subject: <em>Nueva cotizacion para tu viaje a medida ID: %querycode%</em></h5>
			<a href="/te/yto/23-tailormade-quote?market=b2b" target="_blank">23-tailormade-quote</a></li>
			<li>
			<h5>Subject: <em>Nuevo mensaje de %dmccompanyname%</em></h5>
			<a href="/te/yto/24-tailormade-chat-msg?market=b2b" target="_blank">24-tailormade-chat-msg</a></li>
			<li>
			<h5>Subject: <em>Presupuesto de %dmccompanyname% modificado</em></h5>
			<a href="/te/yto/25-tailormade-quote-modify?market=b2b" target="_blank">25-tailormade-quote-modify</a></li>
		</ul>

	</td>
</tr>

{% include "../partials/index-utils.html.swig" %}

{% endblock %}
