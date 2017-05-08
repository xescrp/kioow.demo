
{# DESTINOS #}
<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
	<tbody class="mcnTextBlockOuter">
		<tr>
			<td valign="top" class="mcnTextBlockInner">				
				<table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
					<tbody>
						<tr>
							<td valign="top" class="mcnTextContent" style="padding: 9px 18px; font-family: 'Lucida Sans Unicode', 'Lucida Grande', sans-serif; font-weight: normal;"><br>

<h2>
	<img height="18" src="http://res.cloudinary.com/open-market-travel/image/upload/e_grayscale/v1423064611/mail/fa-globe.png" style="height: 18px; width: 18px;" width="18">
	{% for destination in request.destinations %}
		{% if destination.city != '' %}
			{{destination.city}}
			({{destination.country}})
		{% else %}
			{{destination.fulladdress}}
		{% endif %}
		{% if !loop.last %} - {% endif %}
	{% endfor %}
</h2>

								<br>
							</td>
						</tr>
					</tbody>
				</table>
			</td>
		</tr>
	</tbody>
</table>
{# FIN DESTINOS #}


{# ACTIVIDADES #}
{% if request.whattodo.length >0 %}
<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
	<tbody class="mcnTextBlockOuter">
		<tr>
			<td valign="top" class="mcnTextBlockInner">
				<table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
					<tbody>
						<tr>
							<td valign="top" class="mcnTextContent" style="padding: 9px 18px; line-height: 140%;">

<div>
	<img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-tags.png" style="height: 14px; width: 14px;" width="14">&nbsp;
	<strong>
		<span>
			{% for tag in request.whattodo %}
				{{tag.label}}{% if !loop.last %}, {% endif %}
			{% endfor %}
		</span>
	</strong>
</div>

								<br>
							</td>
						</tr>
					</tbody>
				</table>
			</td>
		</tr>
	</tbody>
</table>
{% endif %}
{# FIN ACTIVIDADES #}


{# CALENDARIO #}
<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
	<tbody class="mcnTextBlockOuter">
		<tr>
			<td valign="top" class="mcnTextBlockInner">
				<table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
					<tbody>
						<tr>
							<td valign="top" class="mcnTextContent" style="padding: 9px 18px; line-height: 140%;">

<div>
	<img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-calendar.png" style="height: 14px; width: 14px;" width="14">
	&nbsp;
	<span>
		{% if request.dates.knowingdates %}
			<strong>Llegada el {{request.dates.arrival.day}}-{{request.dates.arrival.month+1}}-{{request.dates.arrival.year}}</strong>
		{% else %}
			<strong>Sin fecha exacta - solicitud para {{request.dates.month.monthname}} {{request.dates.month.monthyear}} 
			{% if request.dates.week != 0 %}
				(semana {{request.dates.week}})
			{% endif %}
			</strong>
		{% endif %}
		<br />
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Duración: {{request.dates.duration}} días</strong>
		<br />
		{% if request.dates.alreadygotflights %}
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Vuelo reservado:</strong>
			<br>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Datos vuelo ida: {{request.dates.dataflightsIn}}
			<br>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Datos vuelo vuelta: {{request.dates.dataflightsOut}}
			<br>
		{% else %}
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Vuelo no reservado</strong><br>
			{% if request.dates.flexibility.number != 0 %}
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{request.dates.flexibility.number}} día/s de flexibilidad
			{% elseif request.dates.knowingdates %}
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sin flexibilidad
			{% endif %}
		{% endif %}
	</span>
</div>

								<br>
							</td>
						</tr>
					</tbody>
				</table>
			</td>
		</tr>
	</tbody>
</table>
{# FIN CALENDARIO #}


{# ALOJAMIENTO #}
<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
	<tbody class="mcnTextBlockOuter">
		<tr>
			<td valign="top" class="mcnTextBlockInner">
				<table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
					<tbody>
						<tr>
							<td valign="top" class="mcnTextContent" style="padding: 9px 18px; line-height: 140%;">

<div>
	<img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-bed.png" style="height: 14px; width: 14px;" width="14">
	&nbsp;
	{% if request.affiliate %}
	<span>
		<strong>
			Hoteles
			{% set hashotel = false %}
			{% if request.hosting.lowcosthotels %}
				Económico (1*, 2*)
				{% set hashotel = true %}
			{% endif %}
			{% if request.hosting.standarhotels %}
				{% if hashotel %}, {% endif %}Standard
				{% set hashotel = true %}
			{% endif %}
			{% if request.hosting.superiorhotels %}
				{% if hashotel %}, {% endif %}Confort (3*,3*SUP, 4*)
				{% set hashotel = true %}
			{% endif %}
			{% if request.hosting.charmhotels %}
				{% if hashotel %}, {% endif %}con Encanto
				{% set hashotel = true %}
			{% endif %}
			{% if request.hosting.luxuryhotels %}
				{% if hashotel %}, {% endif %}Lujo (4*SUP, 5*, 5*SUP)
			{% endif %}
		</strong>
		<br>
		{% if request.hosting.hostingKindNotes != ''%}
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			Comentarios:&nbsp;
			<em>{{request.hosting.hostingKindNotes}}</em>
		{% endif %}
	</span>
	{% else %}
	<span>
		<strong>
			Hoteles
			{% set hashotel = false %}
			{% if request.hosting.lowcosthotels %}
				Low Cost
				{% set hashotel = true %}
			{% endif %}
			{% if request.hosting.standarhotels %}
				{% if hashotel %}, {% endif %}Standard
				{% set hashotel = true %}
			{% endif %}
			{% if request.hosting.superiorhotels %}
				{% if hashotel %}, {% endif %}Superiores
				{% set hashotel = true %}
			{% endif %}
			{% if request.hosting.charmhotels %}
				{% if hashotel %}, {% endif %}con Encanto
				{% set hashotel = true %}
			{% endif %}
			{% if request.hosting.luxuryhotels %}
				{% if hashotel %}, {% endif %}de Lujo
			{% endif %}
		</strong>
		<br>
		{% if request.hosting.hostingKindNotes != ''%}
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			Comentarios:&nbsp;
			<em>{{request.hosting.hostingKindNotes}}</em>
		{% endif %}
	</span>
	{% endif %}
</div>

								<br>
							</td>
						</tr>
					</tbody>
				</table>
			</td>
		</tr>
	</tbody>
</table>
{# FIN ALOJAMIENTO #}


{# PASAJEROS #}
<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
	<tbody class="mcnTextBlockOuter">
		<tr>
			<td valign="top" class="mcnTextBlockInner">
				<table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
					<tbody>
						<tr>
							<td valign="top" class="mcnTextContent" style="padding: 9px 18px; line-height: 140%;">

{% set totalpax = 0 %}
{% for room in request.roomDistribution %}
	{% set totalpax += room.paxList.length %}
{% endfor %}
<div>

	<!-- ****total pax ****************** -->
	{% set totalPax = 0 %}
	{% for distribution in request.roomDistribution %}
		{% set totalPax = totalPax + distribution.paxList.length %}
	{% endfor %}		
	<!-- ******************************** -->
	<img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-male.png" style="height: 14px; width: 14px;" width="14">&nbsp;
	{% if request.group == null %}
		<strong>
			{{totalPax}} pasajero{% if totalPax > 1%}s{% endif %}:
		</strong>
		&nbsp;{{request.roomDistribution.length}}
		{% if request.roomDistribution.length > 1 %} 
			Habitaciones 
		{% else %}
			Habitación
		{% endif %}
		<br>
		{% for room in request.roomDistribution %}
			<br>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			<em>Habitación {{loop.index}}: 
			{% if room.roomType.roomCode == 'double' %} 
				(doble)
			{% endif %}
			{% if room.roomType.roomCode == 'single' %} 
				(individual)
			{% endif %}
			{% if room.roomType.roomCode == 'triple' %}
				(triple)
			{% endif %}
			</em>
			{% for pax in room.paxList %}
				<br>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				Edad pasajero {{loop.index}}: {{pax.age}} años
			{% endfor %}
			<br>
		{% endfor %}

	{% elseif request.group != null %}

		<strong>
			Grupo:
			{% if request.group.typeGroup == 'company' %}
				Empresa
			{% endif %}
			{% if request.group.typeGroup == 'club' %}
				Club
			{% endif %}
			{% if request.group.typeGroup == 'students' %}
				Estudiantes
			{% endif %}
			{% if request.group.typeGroup == 'otro' %}
				Otro
			{% endif %}
			{{totalPax}} pasajero{% if totalPax > 1%}s{% endif %}
		</strong>
		<br>
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		Habitaciones: 
		{% if request.group.rooms.single %}
			{{request.group.rooms.single}} individual{% if request.group.rooms.single > 1%}es{% endif %}
		{% endif %}
		{% if request.group.rooms.double %}
			{{request.group.rooms.double}} doble{% if request.group.rooms.double > 1%}s{% endif %}
		{% endif %}
		{% if request.group.rooms.triple %}
			{{request.group.rooms.triple}} triple{% if request.group.rooms.triple > 1%}s{% endif %}
		{% endif %}
		<br>
		{% if request.group.comments != ''%}
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Comentarios: <em>{{request.group.comments}}</em>
		{% endif %}
		
	{% endif %}

	<span>
	
								<br>
							</td>
						</tr>
					</tbody>
				</table>
			</td>
		</tr>
	</tbody>
</table>
{# FIN PASAJEROS #}


{# INFORMACION ADICIONAL #}
<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
	<tbody class="mcnTextBlockOuter">
		<tr>
			<td valign="top" class="mcnTextBlockInner">
				<table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
					<tbody>
						<tr>
							<td valign="top" class="mcnTextContent" style="padding: 9px 18px; line-height: 140%;">

<div>
	<img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-list.png" style="height: 14px; width: 14px;" width="14">
	&nbsp;
	<span><strong>Información adicional:</strong>
	<br>
	{% if request.additionalinfo.trip == 'grouptrip' && request.group == null %}
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Preferencia:&nbsp;
		<strong>Viaje en grupo</strong>
		<br>
	{% endif %}
		{% if request.additionalinfo.trip == 'privatetrip'%}
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Preferencia: <strong>Viaje privado</strong> | 
			{% if request.additionalinfo.needs == 'onlyhotel'%}
				No quiero transporte<br>
			{% endif %}
			{% if request.additionalinfo.needs == 'rentacar'%}
				Coche de alquiler<br>
			{% endif %}
			{% if request.additionalinfo.needs == 'caranddriver'%}
				Coche y conductor<br>
			{% endif %}
			{% if request.additionalinfo.guide.included %}
				{% set hasguide = false %}
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Quiere guías en:&nbsp;
				{% if request.additionalinfo.guide.language.spanish %}
					Español
					{% set hasguide = true %}
				{% endif %}
				{% if request.additionalinfo.guide.language.english %}
					{% if hasguide %}, {% endif %}Inglés
					{% set hasguide = true %}
				{% endif %}
				{% if request.additionalinfo.guide.language.french %}
					{% if hasguide %}, {% endif %}Francés
					{% set hasguide = true %}
				{% endif %}
				{% if request.additionalinfo.guide.language.german %}
					{% if hasguide %}, {% endif %}Alemán
					{% set hasguide = true %}
				{% endif %}
				{% if request.additionalinfo.guide.language.italian %}
					{% if hasguide %}, {% endif %}Italiano
					{% set hasguide = true %}
				{% endif %}
				{% if request.additionalinfo.guide.language.portuguese %}
					{% if hasguide %}, {% endif %}Portugués
				{% endif %}
			{% endif %}
			<br>
		{% endif %}
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		Régimen:&nbsp;
		<strong>
			{% if request.additionalinfo.regimen == 'ol'%}
				Solo Alojamiento
			{% endif %}
			{% if request.additionalinfo.regimen == 'bb'%}
				Alojamiento y desayuno
			{% endif %}
			{% if request.additionalinfo.regimen == 'hb'%}
				Media Pensión
			{% endif %}
			{% if request.additionalinfo.regimen == 'fb'%}
				Pensión Completa
			{% endif %}
			{% if request.additionalinfo.regimen == 'ai'%}
				Todo incluido
			{% endif %}
		</strong>
	</span>
</div>

								<br>
							</td>
						</tr>
					</tbody>
				</table>
			</td>
		</tr>
	</tbody>
</table>
{# FIN INFORMACION ADICIONAL #}


{# PRESUPUESTO #}
<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
	<tbody class="mcnTextBlockOuter">
		<tr>
			<td valign="top" class="mcnTextBlockInner">
				<table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
					<tbody>
						<tr>
							<td valign="top" class="mcnTextContent" style="padding: 9px 18px; line-height: 140%;">

<div>
	<img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-money.png" style="height: 14px; width: 14px;" width="14">
	&nbsp;&nbsp;
	<span style="line-height:20.7999992370605px">Presupuesto por persona:&nbsp;
		<strong>
			{{request.budget.cost | numberFractions}} {{request.budget.currency.symbol}}
		</strong>
	</span>
</div>

								<br>
							</td>
						</tr>
					</tbody>
				</table>
			</td>
		</tr>
	</tbody>
</table>
{# FIN PRESUPUESTO #}



