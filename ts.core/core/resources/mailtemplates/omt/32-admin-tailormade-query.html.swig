{% extends '../admin-layout.html.swig' %}
{% set acomodation = true %}

{% block body %}
<tr>
	<td align="center" valign="top">
		<!-- BEGIN HEADER // -->
		<table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateHeader">
			<tr>
				<td valign="top" class="headerContainer">
					<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
						<tbody class="mcnTextBlockOuter">
							<tr>
								<td valign="top" class="mcnTextBlockInner">
									<table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextContentContainer">
										<tbody>
											<tr>
												<td valign="top" class="mcnTextContent" style="padding: 9px 18px; font-family: 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">
													&nbsp;
													<h1>Nueva Petición a Medida
													{% if request.affiliate %}
													B2B
													{% else %}
													B2C
													{% endif %}
													</h1>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
		</table>
		<!-- // END HEADER -->
	</td>
</tr>
<tr>
	<td align="center" valign="top">
		<!-- BEGIN BODY // -->
		<table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateBody">
			<tr>
				<td valign="top" class="bodyContainer">
					<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
						<tbody class="mcnTextBlockOuter">
							<tr>
								<td valign="top" class="mcnTextBlockInner">
									<table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextContentContainer">
										<tbody>
											<tr>
												<td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-left: 18px;">

<h3 class="null" style="line-height: 20.7999992370605px;">
	Localizador: <strong>{{ request.code }}</strong>
</h3>
{% if request.affiliate %}
	<br>
	Agencia: <strong>{{request.affiliate.company.name}}</strong><br>
	Código: <strong><a href="http://www.yourttoo.com/affiliate/account?code={{request.affiliate.code}}">{{request.affiliate.code}}</a></strong><br>
	Persona Contacto: <strong>{{request.affiliate.contact.lastname}} {{request.affiliate.contact.firstname}}</strong><br>
	Email: <strong>{{request.affiliate.contact.email}}</strong><br>
{% else %}
	<br>
	<h3>Cliente:</h3>
	Nombre: <strong>{{request.traveler.firstname}}</strong><br>
	Apellido: <strong>{{request.traveler.lastname}}</strong><br>
	Email: <a href="mailto:{{request.traveler.email}}" target="_blank"><strong>{{request.traveler.email}}</strong></a><br>
	{% if request.traveler.phone %}
	Teléfono: <strong>{{request.traveler.phone}}</strong>
	{% endif %}
{% endif %}


												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
{% if request.affiliate %}
	{% include "../partials/te-applicant.es.html.swig" %}
{% endif %}
<!-- TAILOR MADE DETAILS // -->
{% include "../partials/tailor-made-details.es.html.swig" %}
					

<!-- BEGIN Call to action
 -->
{% set ca = {txt : 'VER LA PETICIÓN', url : url} %}
{% include "../partials/call-to-action.html.swig" %}
<!-- END Call to action -->


				</td>
			</tr>
		</table>
		<!-- // END BODY -->
	</td>
</tr>
{% endblock %}