	<div class="row" ng-if="userquery.quotes.length > 0">
		<div class="col-md-12 mt-l mb-l">
			<h2>
			Tienes 
				<strong> 
				{{userquery.quotes.length}}
					<span ng-show="userquery.quotes.length == 1">respuesta</span>
					<span ng-show="userquery.quotes.length > 1">respuestas</span>
				</strong>
		
			</h2>
		</div>
	</div>	
	<div class="row" ng-if="userquery.quotes.length > 0">
			<!-- INIT quote repeat -->  
			<div ng-repeat="quote in userquery.quotes" 
			  class="col-md-4 col-sm-4 request-offer max-center-xs" ng-include="'/partials/admin/edit/request/affiliate-quote-column.html.swig?v={?brand.appversion?}'">
			</div>
			<!-- END quote repeat -->  
	</div>

<div ng-if="userquery.quotes.length > 0">

  <!-- INIT quote repeat -->
  <div ng-repeat="quote in userquery.quotes" >
    <div ng-if="quote.status == 'win' || quote.status == 'published' || quote.status == 'draft' || quote.status == 'new' || quote.status == 'under review'">

      <!-- init messages chat -->
      <div ng-cloak="" name="chat">
        <div ng-chat=""
        referenceobj="quote._id"
        referencetype="'quote'"
        lang="'ES'"
				fromcode="'{? loginsession.user.code ?}'"
        tocode="quote.dmccode"
        showempty="'false'">
        </div>
      </div>
    </div>
  </div>
</div>

<!-- end messages chat -->
<div class="row" ng-if="userquery.quotes == null || userquery.quotes.length == 0">
  <div class="col-md-12" style="padding: 3em 7em 5em;">
    <div class="col-md-8 col-md-offset-2">
      <div class="text-center" style="font-size: 3em; color: #bbb;">
        <span class="fa-stack fa-lg">
          <i class="fa  fa-clock-o fa-stack-1x"></i>
        </span>
      </div>
      <h2 class="thin mt-zero text-center mb-b">Todavía no tienes cotizaciones</h2>
      <h5 class="thin text-center">
        Cuando los receptivos las generen, recibirás una notificación en tu correo.
        <br />
      </h5>
    </div>
  </div>
</div>
