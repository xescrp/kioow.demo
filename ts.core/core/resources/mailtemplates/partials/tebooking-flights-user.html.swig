<table border="0" cellpading="0" cellspacing="0" width="100%" class="mcnBoxedTextBlock">
    <tbody class="mcnBoxedTextBlockOuter">
        <tr>
            <td valign="top" class="mcnBoxedTextBlockInner">
                <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnBoxedTextContentContainer">
                    <tbody><tr>
                        <td style="padding-top:9px; padding-left:18px; padding-bottom:9px; padding-right:18px;">
                        
                            <table border="0" cellpadding="18" cellspacing="0" class="mcnTextContentContainer" width="100%" style="border: 1px solid #D1D1D1;">
                                <tbody>
                                    <tr>
                                      <td valign="top" class="mcnTextContent">
                                        <h2 class="null" style="line-height: 20.7999992370605px;">Resumen de vuelos</h2>
                                        &nbsp;
                                        <h3 class="null" style="line-height: 20.7999992370605px;">Referencia 
                                        {{booking.flights.reference}}</h3>
                                        {% set cont = 1 %}
                                        {% for objFlight in booking.flights.itinerary.itinerariesId %}
                                          <hr>
                                          <table border="0" cellpadding="5" cellspacing="0" class="mcnTextContentContainer" width="100%" >          
                                            <thead>
                                            <tr>                                              

                                              {% if booking.flights.flight.flightList[cont][objFlight].marketingCarrier !=  booking.flights.flight.flightList[cont][objFlight].operationCarrier %}
                                                <th class="mcnTextContent">
                                                  <img src="http://res.cloudinary.com/open-market-travel/image/upload/assets/airlines/{{booking.flights.flight.flightList[cont][objFlight].marketingCarrier}}.png" alt="{{booking.flights.flight.flightList[cont][objFlight].marketingCarrier}}" /> <br/> Operado por:
                                                  <br/>
                                                   <img src="http://res.cloudinary.com/open-market-travel/image/upload/assets/airlines/{{booking.flights.flight.flightList[cont][objFlight].operationCarrier}}.png" alt="{{booking.flights.flight.flightList[cont][objFlight].operationCarrier}}"/>
                                                </th>
                                              {% else %}
                                                <th class="mcnTextContent">
                                                  <img src="http://res.cloudinary.com/open-market-travel/image/upload/assets/airlines/{{booking.flights.flight.flightList[cont][objFlight].marketingCarrier}}.png" alt="{{booking.flights.flight.flightList[cont][objFlight].marketingCarrier}}"/>
                                                </th>
                                              {% endif %}
                                              <th width="50%">
                                              <h4>
                                                  <span>Vuelo <strong>{{booking.flights.flight.flightList[cont][objFlight].flightNumber}}</strong>                                               
                                                  </span>
                                              </h4>  
                                              </th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                              <tr>
                                                <td class="mcnTextContent"><h5>SALIDA:</h5></td>
                                                <td class="mcnTextContent"><h5>LLEGADA:</h5></td>
                                              </tr>
                                              <tr>
                                                <td class="mcnTextContent"><h5><strong>{{booking.flights.flight.flightList[cont][objFlight].departureTime }}hs</strong></h5></td>
                                                <td class="mcnTextContent"><h5><strong>{{booking.flights.flight.flightList[cont][objFlight].arriveTime }}hs</strong></h5></td>
                                              </tr>
                                              <tr>
                                                <td class="mcnTextContent"><h5><strong>{{ iatas[booking.flights.flight.flightList[cont][objFlight].departure].name}}</strong></h5></td>
                                                <td class="mcnTextContent"><h5><strong>{{ iatas[booking.flights.flight.flightList[cont][objFlight].arrive].name}}</strong></h5></td>
                                              </tr>
                                              <tr>
                                                <td colspan="2" class="mcnTextContent"><h5>Cant. de maletas: {{booking.flights.flight.flightList[cont][objFlight].numBagage }} / Clase : {{booking.flights.flight.flightList[cont][objFlight].cabinType}}</h5>
                                                </td>
                                              </tr>    
                                            </tbody>      
                                          </table>
                                          {% set cont += 1 %}
                                        {% endfor %}
                                    </td>                 
                                </tr>
                            </tbody></table>
                        </td>
                    </tr>
                </tbody></table>
                
            </td>
        </tr>
    </tbody>
</table>
