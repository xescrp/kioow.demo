<h4 ng-hide="booking.status == 'cancelled'" class="iblock mt-l">Documentación para el cliente</h4>
<form id="observationbooking" ng-hide="booking.status == 'cancelled'" name="observationbooking" novalidate="">
  <div class="row">
    <div class="col-md-12">
      <p class="text-center marged-xl">
        <a class="btn btn-success ml-l mr-l" ng-click="downloadSummaryBooking()">Resumen de reserva</a>

        <!-- reserva no pagada, no hay bono -->
        <a class="btn btn-default ml-l mr-l active opac-l"  
            uib-tooltip="Disponible con pago formalizado" 
            tooltip-trigger="mouseenter" 
            ng-if="booking.breakdown.charges.pending > 0" target="_blank" ng-href="#">Bono</a>


        <!-- producto con traslados y no introducida la informacion de traslados -->
        <a class="btn btn-success ml-l mr-l" 
            ng-if="(booking.breakdown.charges.pending <= 0) && ((booking.products[0].included.arrivaltransfer !=null &&  booking.products[0].included.arrivaltransfer) || (booking.products[0].included.departuretransfer !=null &&  booking.products[0].included.departuretransfer)) && booking.meetingdata == ''" 
            ng-click="erroBono()" href="#editTransfer">Bono</a>

        <!-- bono para cuando no hay traslados -->
        <a class="btn btn-success ml-l mr-l"
             ng-if="(booking.breakdown.charges.pending <= 0) && ((booking.products[0].included.arrivaltransfer ==null || !booking.products[0].included.arrivaltransfer) && (booking.products[0].included.departuretransfer ==null ||  !booking.products[0].included.departuretransfer))" 
             ng-click="downloadAffiliateVoucher()">Bono</a>

        <!-- bono para cuando hay traslados y esta introducida el meeting information-->
        <a class="btn btn-success ml-l mr-l" 
            ng-if="(booking.breakdown.charges.pending <= 0) && ((booking.products[0].included.arrivaltransfer !=null &&  booking.products[0].included.arrivaltransfer) || (booking.products[0].included.departuretransfer !=null &&  booking.products[0].included.departuretransfer)) &&  booking.meetingdata" 
            ng-click="downloadAffiliateVoucher()">Bono</a>

        <!-- boton desactivado para contrato -->
        <a class="btn btn-default ml-l mr-l active opac-l ng-scope" 
            uib-tooltip="Disponible con pago formalizado" 
            ng-if="booking.breakdown.charges.pending > 0">Contrato de viaje combinado</a>

        <!-- boton ok -->
        <a class="btn btn-success ml-l mr-l" 
            ng-if="booking.breakdown.charges.pending <= 0" 
            ng-click="downloadAffiliateContract()">Contrato de viaje combinado</a>

      </p>
    </div>
  </div>
</form>
