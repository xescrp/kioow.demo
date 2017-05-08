{% extends '../admin-layout.html.swig' %}

{% block body %}                            

<tr>
	<td align="center" valign="top">
		<!-- BEGIN HEADER // -->
		<table border="0" cellpadding="0" cellspacing="0" width="600" id="templateHeader">
			<tr>
				<td valign="top" class="headerContainer">
					<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
						<tbody class="mcnTextBlockOuter">
							<tr>
								<td valign="top" class="mcnTextBlockInner">
									<table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
										<tbody>
											<tr>
						
<td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
	<br>
	<h1>Nuevo Registro</h1>
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
									<table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
										<tbody>
											<tr>

<td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
	Una nueva agencia se ha registrado en el sistema.
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
		<table border="0" cellpadding="0" cellspacing="0" width="600" id="templateBody">
			<tr>
				<td valign="top" class="bodyContainer">
					<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
						<tbody class="mcnTextBlockOuter">
							<tr>
								<td valign="top" class="mcnTextBlockInner">
									<table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
										<tbody>
											<tr>
												<td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">

<strong>Nombre de Agencia</strong>
<br>
{{company.name}}
<br><br>

<strong>Nombre Legal Agencia</strong>
<br>
{{company.legalname}}
<br><br>

{# <strong>C.I.F. / Identificador Fiscal</strong>
<br>
{{company.taxid}}
<br><br>

<strong>Año de establecimiento</strong>
<br>
{{company.constitutionyear}}
<br><br> #}

{# <strong>Título-licencia de Agencia</strong>
<br>
{{company.agencylic}}
<br><br> #}

{# <strong>Grupo de Gestión</strong>
<br>
{{company.group}}
<br><br> #}

{# <strong>Sitio Web</strong>
<br>
{{company.website}}
<br><br> #}

<strong>Teléfono</strong>
<br>
{{company.phone}}
<br><br>

<strong>Dirección</strong>
<br>
{{company.location.fulladdress}}
<br>
{{company.location.stateorprovince}} {{company.location.pc}}
<br>
{{company.location.country}}
<br><br>


<strong>Administrador de Cuenta</strong><br>
{{contact.firstname}} {{contact.lastname}}<br>
{{contact.position}}<br>
{{contact.email}}<br>
{# skype: {{contact.skype}} #}
<br><br>

												</td>
											</tr>
										</tbody>
									</table>

<!-- BEGIN Call to action
http://yourttoo.com/affiliate/account/?code={{company.code}}
 -->
{% set ca = {txt : 'IR A REGISTRO', url : url} %}
{% include "../partials/call-to-action.html.swig" %}
<!-- END Call to action -->


								</td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
		</table>
		<!-- // END BODY -->
	</td>
</tr>
{% endblock %}

