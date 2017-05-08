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
em{

}

</style>

<tr>
	<td align="center" valign="top" style="padding:30px;" id="templatesList">
		<h3>TRANSACTIONAL-EMAILS
<button id="openAll">Abrir TODOS los emails en pestañas</button>
		</h3>
		<h1>Admin openmarket.travel</h1>
		<h4>DMCs / Receptivos</h4>
		<ul>
			<li>
			<h5>Subject: <em>New DMC Registered :)</em></h5>
			<a target="_blank" href="/te/omt/omt-01-new-dmc">omt-01-new-dmc</a></li>
			<li>
			<h5>Subject: 
				<ul>
					<li><em>[OMT] - %dmccompanyname%, id:%dmccode% ha borrado el destino de operación: %operateLocationcountry%</em></li>
					<li><em>[OMT] - %dmccompanyname%, id:%dmccode% ha agregado un destino de operación nuevo: %operateLocationcountry%</em></li>
					<li><em>[OMT] - %dmccompanyname%, id:%dmccode% ha borrado el tag: %taglabel%</em></li>
					<li><em>[OMT] - %dmccompanyname%, id:%dmccode% ha agregado tags</em></li>
				</ul>
			</h5>
			<a target="_blank" href="/te/omt/omt-02-dmc-changed-profile">omt-02-dmc-changed-profile</a></li>
		</ul>
		<h4>Generic Template</h4>
		<ul>
			<li>
				<h5>Subject:
				<ul>
					<li><em>[OMT] - %dmccompanyname%, id:%dmccode% sugiere  como nueva actividad/tag: %suggTag%</em></li>
					<li><em>%subject%</em></li>
				</ul>
				</h5>
			<a target="_blank" href="/te/omt/omt-03-gu-noca">omt-03-gu-noca</a></li>
			<li>
			<h5>Subject: <em>%subject%</em></h5>
			<a target="_blank" href="/te/omt/omt-03-gu-ca">omt-03-gu-ca</a></li>
			<li>
			<h5>Subject: <em>[OMT] %name% %messagetype%</em></h5>
			<a target="_blank" href="/te/omt/omt-10-message">omt-10-message</a></li>
		</ul>
		<h4>Bookings</h4>
		<ul>
			<li>
			<h5>Subject: <em>'[OMT] Nueva Reserva bajo petición triple/single: %idbooking%;</em></h5>
			<a class="mutted" target="_blank" href="/te/omt/omt-04-new-booking-triple-single-room">omt-04-new-booking-triple-single-room</a></li>
			<li>
			<h5>Subject: <em>[OMT] Nueva prereserva por transferencia: %idbooking% </em></h5>
			<h5>Subject: <em>[OMT] Nueva prereserva por transferencia: %idbooking% Para la peticion a medida: %querycode%</em></h5>
			<a target="_blank" href="/te/omt/omt-05-new-prebooking">omt-05-new-prebooking</a></li>
			<li>
			<h5>Subject: <em>[OMT] Nueva reserva por transferencia: %idbooking% </em></h5>
			<h5>Subject: <em>[OMT] Nueva reserva por transferencia: %idbooking% Para la peticion a medida: %querycode%</em></h5>
			<a target="_blank" href="/te/omt/omt-06-new-booking">omt-06-new-booking</a></li>
			<li>
			<h5>Subject: <em>[OMT] Reserva bajo petición rechazada por el dmc</em></h5>
			<a class="mutted" href="/te/omt/omt-11-triple-single-cancelled">omt-11-triple-single-cancelled</a></li>
			<li>
			<h5>Subject: <em>[OMT] Reserva bajo petición aceptada por el dmc</em></h5>
			<a class="mutted" href="/te/omt/omt-12-triple-single-confirmed">omt-12-triple-single-confirmed</a></li>
		</ul>
		<h4>Tailormade</h4>
		<ul>
			<li>
				<h5>Subject:<br><em>Nueva petición a medida de %firstname% %lastname% ID: %querycode%</em><br>
				<em>Nueva solicitud de %companyname% ID: %querycode%</em></h5>
				<a target="_blank" href="/te/omt/omt-07-new-request">omt-07-new-request</a> 
				<a target="_blank" href="/te/omt/omt-07-new-request?market=b2b">b2b</a>
			</li>
			<li>
				<h5>Subject: <em>Nueva cotización de %dmcname% para solicitud ID: %querycode%</em></h5>
				<a target="_blank" href="/te/omt/omt-15-new-quote">omt-15-new-quote</a>
				<a target="_blank" href="/te/omt/omt-15-new-quote?market=b2b">b2b</a>
			</li>
			<li>
				<h5>Subject: <em></em></h5>
				<a target="_blank" href="/te/omt/omt-13-quote-discarded">omt-13-quote-discarded</a>
				<a target="_blank" href="/te/omt/omt-13-quote-discarded?market=b2b">b2b</a>
			</li>
			<li>
				<h5>Subject: <em>La petición a medida %querycode% de %firstname% %lastname% ha sido cancelada</em></h5>
				<a target="_blank" href="/te/omt/omt-14-query-canceled">omt-14-query-canceled</a>
				<a target="_blank" href="/te/omt/omt-14-query-canceled?market=b2b">b2b</a>
			</li>
			<li>
				<h5>Subject: <em>Nuevo mensaje petición a medida ID: %querycode%</em></h5>
				<a target="_blank" href="/te/omt/omt-16-query-msg">omt-16-query-msg</a>
				<a target="_blank" href="/te/omt/omt-16-query-msg?market=b2b">b2b</a>
			</li>
		</ul>
		<hr>
		<br>
		<h1>Admin yourttoo.com</h1>
		<h4>Cuenta YTO</h4>
		<ul>
			<li>
			<h5>Subject: <em>Nuevo registro de afiliado - %companyname%</em></h5>
			<a href="/te/omt/31-admin-new-agency?market=b2b" target="_blank">31-admin-new-agency</a>
			</li>
			<li>
			<h5>Subject: <em>Nuevo mensaje de %name%</em></h5>
			<a href="/te/omt/38-admin-message?market=b2b" target="_blank">38-admin-message</a></li>
		</ul>
{# 		<h4>Tailor Made</h4>
		<ul>
		<li>
			<h5>[old] Subject: <em>Nueva solicitud de %companyname% ID: %querycode%</em></h5>
			<a class="mutted" href="/te/omt/32-admin-tailormade-query?market=b2b" target="_blank">32-admin-tailormade-query</a>
			</li> 
			<li>
			<h5>Subject: <em>Cancelación de solicitud - %querycode%</em></h5>
			<a href="/te/omt/33-admin-query-cancelled?market=b2b" target="_blank">33-admin-query-cancelled</a>
			</li>
		</ul>#}
		<h4>Booking</h4>
		<ul>
			<li>
			<h5>Subject: <em>Reserva %idbooking% cancelada</em></h5>
			<a href="/te/omt/34-admin-booking-cancelled?market=b2b" target="_blank">34-admin-booking-cancelled</a>
			</li>
			<li>
			<h5>Subject: <em>Reserva %idbooking% actualizada</em></h5>
			<a href="/te/omt/35-admin-booking-updated?market=b2b" target="_blank">35-admin-booking-updated</a>
			</li>
			<li>
			<h5>Subject: <em>Nueva Reserva Confirmada %idbooking%</em></h5>
			<a href="/te/omt/36-admin-new-booking?market=b2b" target="_blank">36-admin-new-booking</a>
			</li>
			<li>
			<h5>Subject: <em>Nueva Mensaje de Reserva %idbooking%</em></h5>
			<a href="/te/omt/37-admin-booking-chat-msg?market=b2b" target="_blank">37-admin-booking-chat-msg</a>
			</li>
		</ul>
	</td>
</tr>
{% include "../partials/index-utils.html.swig" %}
{% endblock %}
