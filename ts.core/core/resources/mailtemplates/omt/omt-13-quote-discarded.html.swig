{% extends '../admin-layout.html.swig' %}
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
												<td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
													<h1 class="null">
														<br>
														Descartada una respuesta petición a medida
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
					<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
						<tbody class="mcnTextBlockOuter">
							<tr>
								<td valign="top" class="mcnTextBlockInner">
									<table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextContentContainer">
										<tbody>
											<tr>
												<td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-left: 18px;">
													<p>DMC: <strong>{{dmc.company.name}} // {{quote.dmc.name}}</strong></p>
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
					

					<!-- BEGIN message -->
					<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
						<tbody class="mcnTextBlockOuter">
							<tr>
								<td valign="top" class="mcnTextBlockInner">
									<table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextContentContainer">
										<tbody>
											<tr>
												<td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-left: 18px;">
													<h3> Motivo:</h3>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>



					<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnBoxedTextBlock">
					    <tbody class="mcnBoxedTextBlockOuter">
					        <tr>
					            <td valign="top" class="mcnBoxedTextBlockInner">
					                
					                <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnBoxedTextContentContainer">
					                    <tbody><tr>
					                        
					                        <td style="padding-top:9px; padding-left:18px; padding-bottom:9px; padding-right:18px;">
					                        
					                            <table border="0" cellpadding="5" cellspacing="0" class="mcnTextContentContainer" width="100%" style="background-color: #FCF8E3;">
					                                <tbody>
					                                <tr>
					                                    <td valign="top" class="mcnTextContent" style="text-align: left;">

					                                        <table border="0" cellpadding="5" cellspacing="0"  class="mcnTextContentContainer">
					                                            <tbody>
					                                                <tr>
					                                                    <td width="50" valign="top" align="center">
					                                                        &nbsp;
					                                                        {% if request.affiliate %}
					                                                        <img height="36" src="{{request.affiliate.images.photo.url}}" style="height: 36px; width: 36px;" width="36">
					                                                        {% else %}
					                                                        <img height="36" src="{{request.traveler.user.photo.url}}" style="height: 36px; width: 36px;" width="36">
																			{% endif %}
					                                                    </td>
					                                                    <td><strong style="line-height: 120%">
					                                                    {% if request.affiliate %}
					                                                    	{{ request.affiliate.company.name }}:
					                                                    {% else %}
					                                                    	{{ request.traveler.firstname }} {{ request.traveler.lastname }}:
					                                                    {% endif %}
					                                                    </strong><br>
					                                                        <em style="color:#999999">"{{ textReason }}"</em>

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
					                </tbody></table>
					                
					            </td>
					        </tr>
					    </tbody>
					</table>
					<!-- END message -->


					<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
						<tbody class="mcnTextBlockOuter">
							<tr>
								<td valign="top" class="mcnTextBlockInner">
									<table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextContentContainer">
										<tbody>
											<tr>
												<td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-left: 18px;">
												<br>
												<h3>Solicitud original:</h3>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<!-- TAILOR MADE DETAILS // -->
					{% include "../partials/tailor-made-details.es.html.swig" %}
										

					<!-- BEGIN Call to action
					 -->
					{% set ca = {txt : 'IR AL PRESUPUESTO', url : url} %}
					{% include "../partials/call-to-action.html.swig" %}
					<!-- END Call to action -->


				</td>
			</tr>
		</table>
		<!-- // END BODY -->
	</td>
</tr>
{% endblock %}


