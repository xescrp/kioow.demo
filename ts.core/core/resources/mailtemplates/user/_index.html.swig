{% extends '../user-layout.html.swig' %}

{% block body %}
<style>

h5{
	font-family: Helvetica;
	margin: 4px 0;
	font-size: 12px;
	color: #666;
	font-weight: 200;
}

.mutted{
	color: #CCC;
	font-family: Helvetica;
}

</style>
<tr>
	<td align="center" valign="top" style="padding:30px;">
		<h3>
			TRANSACTIONAL-EMAILS
			<button id="openAll">Abrir TODOS los emails en pestañas</button>
		</h3>
		<h1>Traveler</h1>
		<h4>General templates</h4>
		<ul id="templatesList">
			<li>
			<h5>Subject: <em>%subject%</em></h5>
			<a href="/te/user/es-user-gu-ca" target="_blank">es-user-gu-ca</a></li>
			<li>
			<h5>Subject: <em>%subject%</em></h5>
			<a href="/te/user/es-user-gu-noca" target="_blank">es-user-gu-noca</a></li>
			<li>
			<h5>Subject: <em>Thanks for your message</em></h5>
			<a href="/te/user/en-user-26-message" target="_blank">en-user-26-message</a></li>
			<li>
			<h5>Subject: <em>Gracias por tu mensaje</em></h5>
			<a href="/te/user/es-user-26-message" target="_blank">es-user-26-message</a></li>
		</ul>
		<h4>Account</h4>
		<ul id="templatesList">
			<li>
			<h5>Subject: <em>Recuperar contraseña</em></h5>
			<a href="/te/user/user-000-forgot" target="_blank">user-000-forgot</a></li>
			<li>
			<h5>Subject: <em></em></h5>
			<a class="mutted" href="/te/user/user-01-welcome" target="_blank">user-01-welcome</a></li>
			<li>
			<h5>Subject: <em></em></h5>
			<a class="mutted" href="/te/user/user-02-email-confirmed" target="_blank">user-02-email-confirmed</a></li>
		</ul>
		<h4>Bookings</h4>
		<ul id="templatesList">
			<li>
			<h5>Subject: <em></em></h5>
			<a class="mutted" href="/te/user/user-11-rq-answer" target="_blank">user-11-rq-answer</a></li>
			<li>
				<h5>Subject: 
				<ul>
				<li><em>[OMT] Nueva reserva por transferencia: %idBooking%</em></li>
				<li><em>[OMT] Pago confirmado %percent%%. Tu prereserva: %idBooking%</em></li>
				</ul></h5>
			<a href="/te/user/user-19-prebooking" target="_blank">user-19-prebooking</a></li>
			<li>
			<h5>Subject: <em>[OMT] Recuerda que te quedan %days% pagar el resto de la reserva: %idbooking%</em></h5>
			<a href="/te/user/user-20-booking-remember-60" target="_blank">user-20-booking-remember-60</a></li>
			<li>
			<h5>Subject: <em>[OMT] Pago confirmado 100%. Tu reserva: %idbooking%</em></h5>
			<a href="/te/user/user-21-booking-100" target="_blank">user-21-booking-100</a></li>
			<li>
			<h5>Subject: <em></em></h5>
			<a href="/te/user/user-23-booking-confirmation-vouchers" target="_blank">user-23-booking-confirmation-vouchers</a></li>
			<li>
			<h5>Subject: <em>[OMT] Nueva prereserva por transferencia: %idBooking%</em></h5>
			<a href="/te/user/user-24-booking-transfer" target="_blank">user-24-booking-transfer</a></li>
			<li>
			<h5>Subject: <em></em></h5>
			<a href="/te/user/user-29-booking-cancelled" target="_blank">user-29-booking-cancelled</a></li>
			<li>
			<h5>Subject: <em></em></h5>
			<a class="mutted" href="/te/user/user-22-request-booking-triple-single" target="_blank">user-22-request-booking-triple-single</a></li>
			<li>
			<h5>Subject: <em></em></h5>
			<a class="mutted" href="/te/user/user-22.1-request-triple-single-cancelled" target="_blank">user-22.1-request-triple-single-cancelled</a></li>
			<li>
			<h5>Subject: <em></em></h5>
			<a class="mutted" href="/te/user/user-22.2-request-triple-single-confirmed" target="_blank">user-22.2-request-triple-single-confirmed</a></li>
			<li>
			<h5>Subject: <em>[OMT] Recuerda descargar los bonos de tu viaje %productnamees%</em></h5>
			<a href="/te/user/es-user-30-remember-voucher" target="_blank">es-user-30-remember-voucher</a></li>
		</ul>
		<h4>Tailormade</h4>
		<ul id="templatesList">
			<li>
			<h5>Subject: <em>[OMT] Tu petición a medida</em></h5>
			<a href="/te/user/user-09-quote-sent" target="_blank">user-09-quote-sent</a></li>
			<li>
			<h5>Subject: <em>[OMT] - Nueva respuesta para tu viaje a medida %querycode%</em></h5>
			<a href="/te/user/user-12-new-quote" target="_blank">user-12-new-quote</a></li>
			<li>
			<h5>Subject: <em>[OMT] Nuevo mensaje de %dmccompanyname% para tu viaje a medida %querycode%</em></h5>
			<a href="/te/user/user-17-new-chat-msg" target="_blank">user-17-new-chat-msg</a></li>
		</ul>
	</td>
</tr>


{% include "../partials/index-utils.html.swig" %}

{% endblock %}
