{% extends 'yto-layout-empty.html.swig' %}

{% block bodyclass %}print{% endblock %}

{% block body %}
{% set roomnameshash = { double: 'Doble', single: 'Individual', triple: 'triple', quad: 'Cuadruple' } %}
<div class="container" style="page-break-after: always;"> 
  <div class="row">   
          
              <h4 class="text-center cellempty">
                CONTRATO DE VIAJE COMBINADO
              </h4> 
              <br>
                  
              <div class="col-xs-12 col-md-12">
                <p>Según lo dispuesto en la Ley General para la Defensa de los Consumidores y Usuarios y otras leyes complementarias, aprobada por Real Decreto Legislativo 1/2007, de 16 de Noviembre, la Ley 7/1998, de 13 de Abril, sobre Condiciones Generales de la Contratación y demás disposiciones vigentes se formaliza, por triplicado, el presente contrato entre:
              </p>
              <p><strong>yourttoo.com</strong>, marca comercial de Traveler Sense S.L. con Domicilio Social en Parc BIT. Isaac Newton s/n , bloque 17, planta 2ª, puerta 09-C. 07121 Palma de Mallorca. CIF B57860017 Título-licencia nº AVBAL/657, en calidad de <strong>ORGANIZADOR</strong>
              </p>
              <p class="text-center cellempty">Y</p>
              <p>
                <strong>{? booking.affiliate.company.name ?}</strong>, marca comercial de {? booking.affiliate.company.legalname ?}, con Domicilio Social en {? booking.affiliate.company.location.fulladdress ?} {? booking.affiliate.company.locatioin.city ?}. CIF {? booking.affiliate.company.locatioin.taxid ?} Título-licencia nº {? booking.affiliate.company.agencylic ?}, en calidad de <strong>DETALLISTA</strong>
              </p>
              <p class="text-center cellempty">Y</p>
              <p>
                En calidad de <strong>CONTRATANTE PRINCIPAL</strong>, D./Dña. <strong>{? booking.paxes[0].name ?} {? booking.paxes[0].lastname ?}</strong>. {? booking.paxes[0].documenttype ?} {? booking.paxes[0].documentnumber ?} y representante de:
              </p>

                {% for pax in booking.paxes %}
                <p>{? pax.name ?} {? pax.lastname ?} (<strong>{? pax.age ?} años</strong>) </p>
                {% endfor %}

            </div>

            <br/>
            <h4 class="text-center cellempty">
              CONDICIONES PARTICULARES
            </h4> 

            <div class="col-xs-12 col-md-12">
              <p>
                <strong>DETALLES DEL VIAJE</strong><br/>
                Nombre del programa: {? dmcproduct.title_es ?}<br/>
                Nº días: {? dmcproduct.itinerary.length ?}<br/>
                Disribución de habitaciones:
                <strong>
                {% set totalSingle = 0 %}
                {% set totalDouble = 0 %}
                {% set totalTriple = 0 %}
                {% set totalCuadruple = 0 %}

                {% for room in booking.rooms %}
                  {% if room.roomcode == 'double'%}    
                     {% set totalDouble = totalDouble + 1 %}
                  {% endif %}
                  {% if room.roomcode == 'single'%}    
                     {% set totalSingle = totalSingle + 1 %}
                  {% endif %}
                  {% if room.roomcode == 'triple'%}    
                     {% set totalTriple = totalTriple + 1 %}
                  {% endif %}
                  {% if room.roomcode =='other' %}
                    {% set totalCuadruple = totalCuadruple + 1 %}
                  {% endif %}
                {% endfor %}

                {% if totalSingle > 0 %}
                  {% if totalSingle > 1 %}
                    {? totalSingle ?} Habitaciones Individuales
                  {% else %}
                    {? totalSingle ?} Habitacion Individual
                  {% endif %}
                {% endif %}

                {% if totalDouble > 0 %}
                  {% if totalDouble > 1 %}
                    {? totalDouble ?} Habitaciones Dobles
                  {% else %}
                    {? totalDouble ?} Habitacion Doble
                  {% endif %}
                {% endif %}

                {% if totalTriple > 0 %}
                  {% if totalTriple > 1 %}
                    {? totalTriple ?} Habitaciones Triples
                  {% else %}
                    {? totalTriple ?} Habitacion Triple
                  {% endif %}
                {% endif %} 

                 {% if totalCuadruple > 0 %}
                  {% if totalCuadruple > 1 %}
                    {? totalCuadruple ?} Habitaciones Cuádruples
                  {% else %}
                    {? totalCuadruple ?} Habitacion Cuádruple
                  {% endif %}
                {% endif %}
                </strong>
                <br/>

                PVP por persona:   
                {% set totalSingle = 0 %}
                {% set totalDouble = 0 %}
                {% set totalTriple = 0 %}
                {% set totalOther = 0 %}
                {% set pvpSingle = 0 %}
                {% set pvpDouble = 0 %}
                {% set pvpTriple = 0 %}
                {% set pvpOther = 0 %}
                {% for room in booking.roomDistribution %}
                    {% if room.roomCode == 'double'%}    
                      {% set pvpDouble = room.pvpAffiliatePerPax.exchange.value %}
                      {% set totalDouble = totalDouble + 1 %}
                    {% endif %}
                    {% if room.roomCode == 'single'%}    
                      {% set pvpSingle = room.pvpAffiliatePerPax.exchange.value %}
                      {% set totalSingle = totalSingle + 1 %}
                    {% endif %}
                    {% if room.roomCode == 'triple'%}    
                      {% set pvpTriple = room.pvpAffiliatePerPax.exchange.value %}
                      {% set totalTriple = totalTriple + 1 %}
                    {% endif %}
                    {% if room.roomCode == 'other'%}    
                      {% set pvpOther = room.pvpAffiliatePerPax.exchange.value %}
                      {% set totalOther = totalOther + 1 %}
                    {% endif %}
                  {% endfor %}
                </p>
              <table class="table table-nolined"  style="width:50%">
			  {% for key in booking.breakdown.roomsbyprice.agency.keys %}
				<tr>
					<td><strong> {? booking.breakdown.roomsbyprice.agency[key].paxes ?} x </strong></td>
					<td>  Pasajeros en </td>
					<td> {? roomnameshash[booking.breakdown.roomsbyprice.agency[key].room] ?}</td>
					<td> {? booking.breakdown.roomsbyprice.agency[key].price | removeDecimal ?} {? booking.pricing.currency.symbol ?}</td>
				</tr>
			  {% endfor %}

              </table>
              <p>
                Total PVP: <strong>{? booking.pricing.amount | removeDecimal ?} {? booking.pricing.currency.symbol ?}</strong>
                <br/>
                <br/>
                Política cancelación, determinada por el proveedor en función de la antelación con la que se produzca: <strong>{? booking.cancelpolicy._es ?}</strong><br/>
                Datos del Representante Local: Según documentación que se entregará antes de la salida y a quien debe acudir, en primera instancia, para cualquier aspecto relacionado con la buena realización del viaje.<br/>
                Itinerario:  Según resumen con la información del viaje, disponible en la reserva.  <br/>
                Incluido/no incluido:  Según resumen con la información completa de los servicios del viaje, disponible en la reserva.<br/>
              </p>
            </div>
    <div class="col-xs-12 col-md-12">
      <br/>
      <p>
        El Contratante Principal ha sido informado en materia de pasaporte, visados y formalidades sanitarias en el momento de efectuar la reserva. 
      </p><br/>
      <p>
      El Contratante Principal ha sido informado sobre la subscripción facultativa de un contrato de seguro de asistencia y/o cancelación, no incluido en el precio.
      </p><br/>
      <p>
      El Contratante Principal, abajo firmante, manifiesta su capacidad para firmar en nombre de los restantes beneficiarios del viaje, y reconoce haber leído y aceptado las Condiciones Generales que se adjuntan.
      </p><br/>
      <p>
      
      

      En prueba de su conformidad, las partes firman el presente contrato en {? booking.affiliate.company.location.city ?} ,a {? local.now | date('d-m-Y') ?}
      </p><br/>
    </div>
    <div>
      <div class="col-xs-4 col-md-4 text-center" >
        <strong>ORGANIZADOR</strong>
        <p class="mt-b">Por TRAVELER SENSE S.L.<br> <img src="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_30/v1448016027/yourttoo.com/yourttoo.com_brand_x2.png" alt="yourttoo.com"><br> <img src="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,w_200/assets/jesussign.png" alt="firma Traveler Sense S.L.">
        </p>
      </div>
      <div class="col-xs-4 col-md-4 text-center">
        <strong>DETALLISTA</strong>
      </div>
      <div class="col-xs-4 col-md-4 text-center">
        <strong>CONTRATANTE PRINCIPAL</strong>
      </div>            
    </div>
  </div>
</div>


<div class="container" class="row" style="page-break-after: always;"> 
   

              <h4 class="text-center cellempty">
                CONDICIONES GENERALES
              </h4> 
              <div class="col-xs-12 col-md-12">
                <p>
                Las presentes <strong>Condiciones Generales</strong> están sujetas a lo dispuesto en el Libro Cuarto del Real Decreto Legislativo 1/2007, de 16 de noviembre, por el que se aprueba el texto refundido de la Ley General para la Defensa de los Consumidores y Usuarios y otras leyes complementarias. 
  Las presentes Condiciones Generales se incorporarán a todos los programas y obligan a las partes, junto con las condiciones particulares que se pacten en el contrato o que consten en la documentación del viaje facilitada. </p>
                <p><strong>1. Organización.</strong><br/>
                La organización de estos viajes combinados ha sido realizada, a partir de los programas de los propios Operadores Locales, por <strong>yourttoo.com</strong>, marca comercial de Traveler Sense,  CIF B57860017, con domicilio en Edificio Disset, Isaac Newton s/n  07121 Palma de Mallorca, en adelante ORGANIZADOR.
                </p>


                <p>
                 <p><strong>2. Precio.</strong><br/>
                 El precio del viaje combinado ha sido calculado en base a los tipos de cambio y coste de los programas y tasas e impuestos aplicables a 01 de Enero de 2016. 
Cualquier variación del precio de los citados elementos podrá dar lugar a la revisión del
precio final del viaje, tanto al alza como a la baja, en los importes estrictos de las variaciones de precio aludidas. Estas modificaciones serán notificadas al consumidor, por escrito o por
cualquier medio que permita tener constancia de la comunicación efectuada, pudiendo, cuando la modificación efectuada sea significativa, desistir del viaje, sin penalización alguna, o aceptar
la modificación del contrato. En ningún caso, se revisará al alza en los veinte días anteriores a la fecha de salida del viaje, respecto de solicitudes ya realizadas.<br/> 2.1 El precio incluye.<br/> -El transporte de ida y regreso, cuando este servicio esté incluido en el programa/oferta contratado, en el tipo de transporte, características y categoría que conste en el contrato o en la documentación que se entrega al consumidor en el momento de suscribirlo.<br/>-El alojamiento, cuando este servicio esté incluido en el programa/oferta contratado, en el establecimiento y régimen alimenticio que figura en el contrato o en la documentación que se entrega al consumidor en el momento de suscribirlo, o en otros similares en caso de sustitución.<br/>-Las tasas o impuestos de los establecimientos hoteleros.<br/>-Los impuestos indirectos (I.V.A., I.G.I.C.) cuando éstos sean aplicables.<br/>-La asistencia técnica durante el viaje, cuando este servicio esté específicamente incluido en el programa/oferta contratado.<br/>-Todos los demás servicios y complementos que se especifiquen concretamente en el programa/oferta contratado.<br/>-Todo aquello que expresamente se haga constar en el programa.<br/>2.2 El precio del Viaje combinado no incluye.<br/>a. Tasas de entrada y salida, visados, certificados de vacunación, “extras” tales como cafés, vinos, licores, aguas minerales, regímenes alimenticios especiales – ni siquiera en los supuestos de la pensión completa o media pensión, salvo que expresamente se pacte en el contrato otra cosa-, lavado y planchado de ropa, servicios de hotel opcionales, propinas,  y en general, cualquier otro servicio que no figure expresamente en el apartado “El precio incluye” o no conste específicamente detallado en el programa/oferta, en el contrato o en la documentación que se entrega al consumidor al suscribirlo. <br/>b. Excursiones o visitas facultativas.  En el caso de excursiones o visitas facultativas que se contraten en destino, debe tenerse presente que no forman parte del contrato de viaje combinado.<br/>c. Los programas no incluyen ningún Seguro que cubra gastos de cancelación ni ningún Contrato de Asistencia que cubra los gastos de repatriación o traslado al lugar de origen. En cumplimiento con el Artículo 156 del RDL 1/2007 por el que se aprueba el texto refundido  de la ley para la Defensa de consumidores y usuarios y que indica en su punto D) que se debe facilitar Información, de acuerdo con la legislación vigente reguladora del seguro privado, sobre la suscripción facultativa de un contrato de seguro que cubra los gastos de cancelación por el consumidor y usuario o de un contrato de asistencia que cubra los gastos de repatriación o traslado al lugar de origen, en caso de accidente, enfermedad o fallecimiento; la página web ofrece el acceso y pone a disposición de los viajeros/usuarios para su contratación diversos Seguros de Viaje opcionales de la compañía Intermundial. Recomendamos la contratación de un seguro de asistencia en viaje y anulación.<br/>   
</p>
                  <p>


                  <p><strong>3. Forma de pago. Inscripciones y reembolsos.</strong><br/>
En el acto de reserva, se requerirá el<strong>_________%</strong> del importe total del viaje, expidiendo el correspondiente recibo en el que se especifique, además del importe anticipado por el consumidor, el viaje solicitado.  En reservas con menos de 7 días anteriores a la fecha de pago a los Operadores, se requerirá el 100%<br/>Una vez abonado el <strong>______________%</strong> restante, en el plazo determinado en el contrato, se producirá la entrega de los bonos o documentación del viaje, que deberá realizarse al menos siete días antes de la fecha de la salida. De no procederse al pago del precio total del viaje en las condiciones señaladas, se entenderá que el consumidor desiste del viaje solicitado, siéndole de aplicación las condiciones previstas en el apartado siguiente.<br/>En el caso de reservas de “viajes a medida”, las condiciones de pago se regirán por lo estipulado por cada Receptivo en cada negociación en particular.
En el supuesto de que antes de la celebración del contrato el Organizador se vea imposibilitado de prestar alguno de los servicios solicitados por el cliente (incluido el precio), deberá serle comunicado al consumidor, el cual podrá renunciar a la solicitud recuperando exclusivamente las cantidades anticipadas si las hubiere.<br/>Todos los reembolsos que sean procedentes por cualquier concepto se formalizarán siempre a través de Organizador, no efectuándose devolución alguna por servicios no utilizados voluntariamente por el consumidor o por los reembolsos que deban ser tramitados mediante empresas colaboradoras, como pueden ser las compañías aseguradoras. En los casos específicos de las compañías aseguradoras, el organizador deberá facilitar toda la información y documentos necesarios para que el consumidor pueda reclamar el reembolso a dichas entidades.<br/>  
                  </p>

                <p><strong>4. Desistimiento del consumidor y cesiones.</strong><br/>El consumidor tiene la facultad de desistir del viaje contratado en cualquier momento antes de la salida. No obstante, si este desistimiento se produce dentro de los 15 días anteriores a la salida del viaje, deberá abonar una penalización en función del tiempo que falte para la salida, que será de:<br/>a) El 5% del precio del viaje si se produce con una antelación de más de 10 y de menos de 15 días.<br/>b) El 15% del precio del viaje, si se produce con una antelación entre los 10 y 3 días.<br/>c) El 25% del precio del viaje, si se produce dentro de las 48 horas anteriores a la salida.<br/>d) El 100% del precio del viaje si el consumidor no se presenta a la hora prevista para la salida. <br/>El consumidor no tendrá que abonar porcentaje alguno en concepto de penalización si el desistimiento tiene lugar por causa de fuerza mayor. A estos efectos, se considerará causa de fuerza mayor la muerte, el accidente o enfermedad graves (que impliquen hospitalización o prohibición médica de viajar en la fecha que debe efectuarse el viaje) del consumidor o de su cónyuge. <br/>En todos los casos, el consumidor deberá abonar los gastos de anulación de los distintos proveedores, por ello aconsejamos que el consumidor disponga de un seguro con cobertura de gastos de cancelación.<br/>El desistimiento produce efectos desde el momento en que la voluntad de desistir del consumidor se comunica por escrito. <br/>Conocido el desistimiento, se devolverá al consumidor las cantidades que hubiese abonado y, en su caso, los gastos de anulación justificados y las penalizaciones.<br/>Si el viaje estuviera sujeto a condiciones económicas especiales de contratación, tales como contratación múltiple de plazas aéreas o plazas hoteleras, servicios especiales de traslado en autobús, flete de aviones, buques, tarifas especiales u otros análogos, los gastos de anulación y las penalizaciones serán los que indique de modo explícito en cada programa o los acordados de modo particular en el documento contractual. <br/>El consumidor del viaje podrá ceder su reserva a una tercera persona, comunicándolo por escrito con quince días de antelación a la fecha del inicio del viaje y abonando los gastos de penalización dispuestos para tal cambio, si los hubiere. Tal cesión no sería posible cuando concurra causa suficiente. <br/>El cesionario tendrá que reunir los mismos requisitos que tenía el cedente y ambos responderán solidariamente del pago del precio del viaje y de los gastos adicionales justificados de la cesión.<br/>Cualquier modificación en una reserva, estará sujeta a disponibilidad y/o a factores de operatividad. Asimismo, si dicho cambio en la reserva supusiera alguna penalización ésta le será trasladada al cliente.
                <br/>  
                  </p>


                   <p><strong>5. Alteraciones.</strong><br/>El Organizador se compromete a facilitar a los clientes  la totalidad de los servicios contratados contenidos en el programa/oferta que ha dado origen al contrato, con las condiciones y características estipuladas, todo ello de acuerdo a los siguientes extremos:<br/>5.1 En el supuesto de que, antes de la salida del viaje, el Operador se vea obligado a modificar de manera significativa algún elemento esencial del contrato deberá ponerlo inmediatamente en conocimiento del consumidor. <br/>5.2 En tal supuesto, y salvo que las partes convengan otra cosa, el consumidor podrá optar entre resolver el contrato sin penalización alguna o aceptar una modificación del contrato en el que se precisen las variaciones introducidas y su repercusión en el precio. El consumidor deberá comunicar la decisión que adopte al Organizador dentro de los tres días siguientes a ser notificado de la modificación.En el supuesto de que el consumidor no notifique su decisión en los términos indicados, se entenderá que opta por la resolución del contrato sin penalización alguna.<br/>5.3 En el supuesto de que el consumidor opte por resolver el contrato al amparo de lo previsto en el apartado 5.2, o de que el Operador cancele el viaje antes de la fecha de salida acordada, por cualquier motivo que no le sea imputable al consumidor, éste tendrá derecho, desde el momento en que se produzca la resolución del contrato, al reembolso de todas las cantidades pagadas, con arreglo al mismo, o bien a la realización de otro viaje de calidad equivalente o superior, siempre que el Operador  pueda proponérselo. En el supuesto de que el viaje ofrecido fuera de calidad inferior, el Organizador deberá rembolsar al consumidor, cuando proceda, en función de las cantidades ya desembolsadas, la diferencia de precio, con arreglo al contrato.<br/>5.4 En los anteriores supuestos, el Organizador será responsable del pago al consumidor de la indemnización que, en su caso, corresponda por incumplimiento del contrato, que será del 5 por cien del precio total del viaje contratado, si el citado incumplimiento se produce entre los dos meses y quince días inmediatamente anteriores a la fecha prevista de realización del viaje, el 10 por cien si se produce entre los quince días y tres días anteriores, y el 25 por cien en el supuesto de que el incumplimiento citado se produzca en las cuarenta y ocho horas anteriores.<br/>5.5 No existirá obligación de indemnizar en los siguientes supuestos: -Cuando la cancelación del viaje, salvo en los supuestos de exceso de reservas, se deba a motivos de fuerza mayor, entendiendo por tales  aquellas circunstancias ajenas a quien las invoca, anormales e imprevisibles, cuyas consecuencias no habrían podido evitarse, a pesar de  haber actuado con la diligencia debida. Cuando la cancelación se deba a que el número de personas inscritas para el viaje combinado sea inferior al exigido y así se comunique por escrito al consumidor antes de la fecha límite fijada por Ley.<br/> 5.6 En el caso de que, después de la salida del viaje, el Organizador no suministre o compruebe que no puede suministrar una parte importante de los servicios previstos en el contrato, adoptará las soluciones adecuadas para la continuación del viaje, sin suplemento alguno de precio para el consumidor, y, en su caso, abonará a éste último el importe de la diferencia entre las prestaciones previstas y las suministradas. Si el consumidor continúa el viaje con las soluciones dadas por el Organizador, se considerará que acepta tácitamente dichas propuestas.<br/>5.7 Si las soluciones adoptadas por el Organizador fueran inviables o el consumidor no las aceptase por motivos razonables, aquél deberá facilitar a éste, sin suplemento alguno de precio, un medio de transporte equivalente al utilizado en el viaje para regresar al lugar de salida o cualquier otro que ambos hayan convenido, sin perjuicio de la indemnización que en su caso proceda.<br/>5.8 En caso de reclamación, el Organizador deberá obrar con diligencia para hallar soluciones adecuadas.<br/>5.9 En ningún caso, todo aquello no incluido en el contrato (como, por ejemplo, billetes de transporte desde el lugar de origen del pasajero hasta el lugar de salida del viaje, o viceversa, o de comienzo del programa, reservas de hotel en días previos o posteriores al viaje, etc.) será responsabilidad del Organizador.<br/>Si los traslados/asistencia del hotel-aeropuerto o viceversa, u otros similares, incluidos en la oferta, no se cumpliesen, fundamentalmente por causas ajenas al transferista y no imputables al Organizador, éste reembolsará únicamente el importe del transporte alternativo utilizado por el cliente en el desplazamiento, previa presentación del recibo o factura correspondiente.<br/>5.10 Los vuelos chárter (cuando estén incluidos en el programa) están sujetos a una cobertura mínima de capacidad del vuelo para operar. En caso de no cubrirse con las plazas necesarias, el Organizador informará al consumidor y usuario del cambio de chárter a línea regular con una antelación mínima de 10 días antes de la salida prevista. 
                <br/>  
                  </p>

                <p><strong>6. Obligación del consumidor de comunicar todo incumplimiento de la ejecución del contrato.</strong><br/>El consumidor está obligado a comunicar todo incumplimiento en la ejecución del contrato preferentemente “in situ” al Representante Local del Organizador en destino según consta en la documentación del viaje o, en otro caso, a la mayor brevedad posible por escrito o en cualquier otra forma en que quede constancia.<br/>En el caso de que las soluciones arbitradas por el Representante Local del Organizador no sean satisfactorias por el consumidor, éste dispondrá del plazo de un mes para reclamar ante el Organizador.<br/>Para formular una reclamación el consumidor podrá dirigirse a Departamento de Calidad- yourttoo.com, con domicilio en Edificio Disset, Isaac Newton s/n. 07121 Palma de Mallorca.<br/>  
                </p>

                <p><strong>7. Prescripción de acciones.</strong><br/>No obstante lo dispuesto en el apartado precedente, el plazo de prescripción de las acciones derivadas de los derechos reconocidos en el Libro Cuarto del Real Decreto Legislativo 1/2007 será de dos años, según queda establecido en el Artículo 164 del citado libro.<br/>  
                </p>

                <p><strong>8. Responsabilidad</strong><br/>8.1 General<br/>  El Organizador responderá frente al consumidor, en función de las obligaciones que les correspondan por su ámbito respectivo de gestión del viaje, del correcto cumplimiento  de las obligaciones derivadas del contrato, con independencia de que éstas las deban ejecutar ellos mismos u otros prestadores de servicios, y sin perjuicio del derecho del Organizador a actuar contra dichos prestadores de servicios. El organizador manifiesta que asume las funciones de organización y ejecución del viaje.<br/>El organizador y los Representantes Locales responderán de los daños sufridos por el consumidor como consecuencia de la no ejecución o ejecución deficiente del contrato. Dicha responsabilidad cesará cuando concurra alguna de las siguientes circunstancias:<br/>a. Que los defectos observados en la ejecución del contrato sean imputables al consumidor.<br/>b. Que dichos defectos sean imputables a un tercero ajeno al suministro de las prestaciones previstas en el contrato y revistan un carácter imprevisible o insuperable.<br/>c. Que los defectos aludidos se deban a motivos de fuerza mayor, entendiendo por tales aquellas circunstancias ajenas a quien las invoca, anormales e imprevisibles cuyas consecuencias no habrían podido evitarse, a pesar de haber actuado con la diligencia debida.<br/>d. Que los defectos se deban a un acontecimiento que el organizador, a pesar de haber puesto toda la diligencia necesaria, no podía prever ni superar, así como por causa suficiente de acuerdo con lo previsto en los reglamentos de Agencias de Viajes.<br/>No obstante, en los supuestos de exclusión de responsabilidad por darse alguna de las circunstancias previstas en los apartados b, c y d, el Organizador estará obligado a prestar la necesaria asistencia al consumidor que se encuentre en dificultades.<br/>8.2 Límites del resarcimiento por daños.<br/>En cuanto al límite de resarcimiento por daños que resulten del incumplimiento o de la mala ejecución de las prestaciones incluidas en el programa, se estará a lo dispuesto en la normativa vigente que resulte de aplicación sobre la materia. Por lo que se refiere a los daños que no sean corporales, éstos deberán ser siempre acreditados por el consumidor. En ningún caso, el  Organizador se responsabiliza de los gastos de alojamiento, manutención, transportes extraordinarios fuera de programa que se originen por motivos de fuerza mayor.<br/>Cuando el viaje se efectúe en autocares “vans”, limusinas y similares contratados por Organizador directa o indirectamente, en caso de accidente, cualquiera que sea el país donde se produzca, el consumidor habrá de presentar la pertinente reclamación contra la entidad transportista a fin de salvaguardar en su caso la indemnización del seguro de ésta, siendo auxiliado y asesorado gratuitamente en sus gestiones por el organizador.<br/>  
                </p>

                <p><strong>9. Delimitación de los servicios del viaje combinado</strong><br/>9.1. Viajes en avión. Presentación en el aeropuerto.<br/>Cuando en el programa  se incluya el transporte en avión presentación en el aeropuerto se efectuará con un mínimo de antelación de 2 horas y media sobre el horario oficial de salida, y en todo caso se seguirán estrictamente las recomendaciones específicas que indique la documentación del viaje facilitada al suscribir el contrato.<br/>9.2 Hoteles<br/>9.2.1 General<br/>La calidad y el contenido de los servicios prestados por el hotel vendrán determinada por la categoría turística oficial, si la hubiere, asignada por el órgano competente de su país. En algunos casos se facilitará en la web información de la categoría de los hoteles de acuerdo a la información obtenida de los organismos de Turismo de los respectivos países y a la calificación de otras Agencias Mayoristas, siempre y cuando no exista una calificación oficial en el país en concreto. Dada la vigente legislación al respecto, que establece sólo la existencia de habitaciones individuales y dobles permitiendo que en alguna de éstas últimas pueda habilitarse una tercera cama, se estimará siempre que la utilización de la tercera cama se hace con el conocimiento y consentimiento de las personas que ocupan la habitación, y así figurará reflejada la habitación como triple en todos los impresos de reserva facilitados al consumidor al abonar el anticipo, en el contrato y los billetes y/o documentación del viaje que se entrega simultáneamente a la firma del mismo. Igualmente en los casos de habitaciones dobles para uso de hasta cuatro personas, con dos camas, cuando así se especifique en la oferta del programa/folleto.<br/>En algunos casos hay posibilidad de habilitar cunas, que deberán ser solicitadas por los clientes antes de perfeccionarse el contrato y que salvo expresa mención, no están incluidas en el precio.<br/>El horario habitual para la entrada y salida en los hoteles está en función del primer y último servicio que el usuario vaya a utilizar. Como norma general y salvo que expresamente se pacte otra cosa en el contrato, las habitaciones podrán ser utilizadas a partir de las 14 horas del día de llegada y deberán quedar libres antes de las 12 horas del día de salida.<br/>Cuando el servicio contratado no incluya el acompañamiento permanente de guía y en el supuesto de que el usuario prevea su llegada al hotel o apartamento reservado en fechas u horas distintas a las reseñadas, es necesario, para evitar problemas y malas interpretaciones, comunicar con la mayor anticipación posible tal circunstancia al Organizador, o al hotel o a los apartamentos directamente, según los casos.<br/>Igualmente, debe consultar al Organizador, en el momento de hacer la reserva, la posibilidad de llevar animales, pues generalmente no son admitidos en los hoteles y apartamentos. El servicio de alojamiento del hotel se entenderá prestado siempre que la habitación haya estado disponible para el cliente en la noche correspondiente, con independencia de que, por circunstancias propias del programa, el horario de entrada en el mismo se produzca más tarde de lo inicialmente previsto.<br/>9.2.2 Otros servicios.<br/>Cuando la llegada a destino se realice después de las 12.00 horas, el primer servicio del hotel, cuando esté incluido en la oferta del programa/folleto, será la cena. Igualmente, cuando la llegada al punto de destino se realice después de las 19.00 horas, el primer servicio del hotel será el alojamiento.<br/>Se entenderá siempre como trayecto aéreo directo (cuando esté incluido) aquel cuyo soporte documental sea un solo cupón de vuelo, con independencia de que el vuelo realice alguna parada técnica.<br/>En los programas con transporte por carretera el vehículo puede variar en sus características en función del número de participantes. Si en alguna salida no se llega al número suficiente de viajeros, es posible que se utilice un minibús o “van” que salvo indicación expresa en contraria, no tiene los asientos reclinables. En todos los casos anteriores el diseño, estructura, confort y seguridad del vehículo de transporte puede no adaptarse a las normas y estándares españoles, sino a los que son propios del país de destino del viaje.<br/>9.3 Programas<br/>El organizador pone en conocimiento de los clientes, que en los programas especificados en la web, el servicio de alojamiento se prestará en cualquiera de los establecimientos relacionados en el mismo o en algún otro de igual categoría y zona e igualmente que el itinerario podrá ser desarrollado según alguna de las opciones descritas en el programa- oferta. En los casos anteriores, si el consumidor acepta dicha información previamente a la celebración del contrato, esta indefinición no supondrá modificación del mismo.<br/>9.4 Condiciones económicas especiales para niños<br/>Dada la diversidad del tratamiento aplicado a los niños, dependiendo de su edad, del proveedor de servicios y de la fecha del viaje, se recomienda consultar siempre el alcance de las condiciones especiales que existan y que en cada momento será objeto de información concreta y detallada y se recogerá en el contrato o en la documentación del viaje que se entregue en el momento de su firma. En general en cuanto al alojamiento, serán aplicables siempre que el niño comparta la habitación con dos adultos.<br/>  
                </p>

                <p><strong>10. Pasaportes, visados y documentación</strong><br/>Todos los usuarios, sin excepción (niños incluidos), deberán llevar en regla su documentación personal y familiar correspondiente, sea el pasaporte o DNI, según las leyes del país o países que se visitan. Será por cuenta de los mismos cuando los viajes así lo requieran la obtención de pasaportes, certificados de vacunación, etc. Caso de ser rechazada por alguna Autoridad la concesión de visados, por causas particulares del usuario, o ser denegada su entrada en el país por carecer de los requisitos que se exigen, o por defecto en la documentación exigida, o por no ser portador de la misma, el Organizador declina toda responsabilidad por hechos de esta índole, siendo por cuenta del consumidor cualquier gasto que se origine, aplicándose en estas circunstancias las condiciones y normas establecidas para los supuestos de desistimiento voluntario de servicios. Se recuerda igualmente a todos los usuarios, y en especial a los que posean nacionalidad distinta a la española, que deben asegurarse, antes de iniciar el viaje, de tener cumplidas todas las normas y requisitos aplicables en materia de visados a fin de poder entrar sin problemas en todos los países que vayan a visitarse. Los menores de 18 años deben llevar un permiso escrito firmado por sus padres o tutores, en previsión de que el mismo pueda ser solicitado por cualquier autoridad. Informamos que la compañía aérea puede requerir en el aeropuerto documento acreditativo de la edad del niño.<br/>  
                </p>

                <p><strong>11. Equipajes</strong><br/>A todos los efectos y en cuanto al transporte terrestre se refiere, se entenderá que el equipaje y demás enseres personales del usuario los conserva consigo, cualquiera que sea la parte del vehículo en que vayan colocados, y que se transporta por cuenta y riesgo del usuario. Se recomienda a los usuarios que estén presentes en todas las manipulaciones de carga y descarga de los equipajes. En cuanto al transporte aéreo, ferroviario, marítimo o fluvial de equipaje, son de aplicación las condiciones de las compañías transportadoras, siendo el billete de pasaje el documento vinculante entre las citadas compañías y el pasajero. En el supuesto de sufrir algún daño o extravío el consumidor deberá presentar, en el acto, la oportuna reclamación a la Compañía de Transportes. El Organizador se compromete a prestar la oportuna asistencia a los clientes que puedan verse afectados por alguna de estas circunstancias.<br/>  
                </p>

                <p><strong>12. Cláusula arbitral</strong><br/>El Organizador manifiesta expresamente su renuncia a someterse a los Tribunales de Arbitraje del transporte por cualquier cuestión proveniente de la existencia de este contrato. <br/>  
                </p>

                <p><strong>13. Información que el Organizador debe facilitar al consumidor</strong><br/>Se informa al consumidor que en el momento de la celebración del contrato deberá recibir del Organizador la información pertinente sobre la documentación específica necesaria para el viaje elegido, así como asesoramiento sobre la suscripción facultativa de un seguro que le cubra los gastos de cancelación y/o de un seguro de asistencia que cubra los gastos de repatriación en caso de accidente, enfermedad o fallecimiento; e información de los riesgos probables implícitos al destino y viaje contratado, en cumplimiento del Real Decreto Legislativo 1/2007. A estos efectos se recomienda, no obstante, al consumidor que contacte con el Ministerio de Asuntos Exteriores cuya oficina de información proporciona recomendaciones específicas según destino a través de Internet (http: //www.mae.es) o por cualquier otro medio.<br/>  
                </p>

                <p><strong>14. Información adicional</strong><br/>1. Las fotografías y mapas que se reproducen en los distintos programas están destinados únicamente a ofrecer una mayor información a los pasajeros. En caso de que se produjera cualquier tipo de modificación en los establecimientos, ello no podrá ser considerado como publicidad engañosa por parte del Organizador.<br/> 2. El Organizador no se hace responsable de los cambios de Dirección/Management de los hoteles, así como de las repercusiones y/o consecuentes cambios que ello conlleve (nombre, servicios, categoría del establecimiento, cierre parcial de las instalaciones, etc...) que en cualquier caso, serán puntualmente comunicados al usuario.<br/>3. Las fotografías reproducidas en cada programa tienen únicamente carácter orientativo  sobre el país en general y pueden no referir a la ruta exacta del programa. Los mapas generados por la ruta, no tienen por que ser coincidentes con el punto exacto del alojamiento o lugar a visitar.<br/>  
                </p>
                

                
                <p><strong>15. Seguridad en el viaje</strong><br/>Cualquier actividad realizada durante el viaje, que no haya sido acordada y pagada al Representante Local quedará fuera de su ámbito de responsabilidad.<br/>Recomendamos la compra de un seguro que le cubra cualquier incidencia durante su viaje (Accidentes, equipaje, cancelación…). El Organizador pone a su disposición varios seguros de viaje para que el viajero decida cual cubre con más garantía sus necesidades.<br/>  
                </p>


                <p><strong>POLÍTICAS DE PRIVACIDAD Y PROTECCIÓN DE DATOS</strong><br/>El cliente autoriza, de forma expresa, al Organizador para tratar de forma automatizada o no, los datos personales necesarios, con la única y exclusiva finalidad de permitir la gestión y registro de las operaciones suscritas entre las partes que aseguren la prestación del servicio, con los distintos proveedores objeto del contrato.<br/>El titular de los datos dispone de la posibilidad de ejercer, en cualquier momento, el derecho de acceso, rectificación, cancelación u oposición respecto a cuantos datos suyos consten almacenados en el fichero del Organizador. Dichos derechos podrán ser ejercitados mediante correo postal a Parc BIT. Isaac Newton, bloque 17, planta 2ª, puerta local C-9. 07121 Palma de Mallorca, o por correo electrónico a <strong>agencias@yourttoo.com</strong><br/>  
                </p>
              </div>


  </div>
   
{% endblock %}