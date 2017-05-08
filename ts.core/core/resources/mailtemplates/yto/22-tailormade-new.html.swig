{% extends '../yto-layout.html.swig' %}
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
<h1>Hemos recibido tu Petición a Medida</h1>
<h3>Procedemos a tramitarla.</h3>
<br>
<h3 class="null" style="line-height: 20.7999992370605px;">
	Localizador: <strong>{{ request.code }}</strong>
</h3>
<p>
	Cliente: <strong>{{request.title}}</strong>
</p>
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

					<!-- TAILOR MADE DETAILS // -->
					{% include "partials/yto-tailor-made-details.es.html.swig" %}

					<!-- BEGIN Call to action
					http://www.yourttoo.com/request/{{ request.code }}
					 -->
                    {% set ca = {txt : 'IR AL PRESUPUESTO', url : url} %}

                    {% include "partials/gu-call-to-action.html.swig" %}

                    <!-- END Call to action -->

                    <!-- TAILOR MADE DETAILS // -->
					{% include "partials/te-related.es.html.swig" %}

					{% include "../partials/thanks-message.es.html.swig" %}
					{% include "partials/email-no-reply.es.html.swig" %}
				</td>
			</tr>
		</table>
		<!-- // END BODY -->
	</td>
</tr>
{% endblock %}