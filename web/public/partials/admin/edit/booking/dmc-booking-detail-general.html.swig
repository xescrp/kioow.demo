<div class="well padded-b">
	<h4 class="iblock">General</h4>
		<span class="pull-right iblock mt-l mr-xs"> 
			<span class="mr-b">Status: </span>
      <span ng-if="booking.status == 'cancelled' || booking.status == 'onbudget' || booking.status == 'error'">
        <span class="label label-default">
          <i class="fa fa-times-circle"></i> Cancelled
        </span>
      </span>
      <span ng-if="booking.status == 'end' || booking.status == 'ok.charges' || booking.status == 'commited' || booking.status == 'pending.charges' || booking.status == 'ondestiny'">
        <span class="label label-success">
          <i class="fa fa-check-circle"></i> Confirmed
        </span>
      </span>
		</span>
	<form id="mainbooking" class="" name="mainbooking" novalidate>
	<div class="row">
	<div class="col-md-12">
		<table class="table booking-detail mb-zero">
			<tr>
				<td class="middle">
				<label>Locator: </label>
				</td>
				<td class="middle">
				{{booking.idBooking}}
				</td>
				<td class="middle">
			    	
				</td>
				<td class="middle">
          
        </td>
			    <td class="middle">
            
          </td>
				<td class="middle">
					<label>Created On: </label>
				</td>
				<td class="middle">
				{{booking.createdOn | date: 'dd-MM-yyyy'}}
				</td>
			</tr>
			<tr>
				<td class="middle">
				<label>Program: </label>
				</td>
				<td colspan="3">
          <strong>{{dmcproduct.title}}</strong> <small>{{dmcproduct.categoryname.label_en || dmcproduct.categoryname.label_es }}</small>
				</td>
				<td class="middle">
					<label>Days: </label>
				</td>
				<td class="middle">
				 {{ dmcproduct.itinerary.length }} 
				</td>
				<td class="middle">
					<label>Departure on: </label>
				</td>
				<td class="middle">
          {{transformToDate(booking.dates.start) | date:'dd-MM-yyyy'}}
        </td>
			</tr>
			<tr>
				<td class="middle">
					<label>Pax number: </label>
				</td>
				<td class="middle" colspan="4">
					 {{booking.paxes.length}} 
				</td>
        <td class="middle text-right">
          
        </td>
				<td class="middle text-right" colspan="2" ng-show="booking.status != 'cancelled' && booking.status != 'invalid' && booking.status != 'onbudget'">
						<button class="btn btn-invert btn-xs" ng-click="cancellBookingModal()">Cancel Booking</button>
				</td>
				<td class="middle" ng-hide="booking.status != 'cancelled'">
				<label>Cancelled on: </label>
				</td>
				<td class="middle" ng-hide="booking.status != 'cancelled'">
          {{transformToDate(booking.dates.canceldate) | date:'dd-MM-yyyy'}}
        </td>
			</tr>
		</table>
		<hr class="mt-b mb-b" />
		</div>

		<div class="col-md-12">
			<p class="text-center"><span class="italic text-gray">Use the messenger <a class="bold" ng-click="selectTab('tabmessage')" href="#tabmessage">service </a> for <strong>changes</strong> on the booking.</span>
			<span class="pull-right mr-xs">
			</span>
			</p>
			
		</div>
	</div>
	</form>
</div>