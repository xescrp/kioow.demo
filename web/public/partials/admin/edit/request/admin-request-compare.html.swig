  <div class="row" ng-if="userquery.quotes == null || userquery.quotes.length == 0">
    <div class="col-md-4 col-sm-4 request-offer max-center-xs" >
      <h2>Sin cotizaciones</h2>
    </div>
  </div>
	<div class="row" ng-if="userquery.quotes.length > 0">
			<!-- INIT quote repeat -->
      <div ng-show=""></div>
			<div ng-repeat="quote in userquery.quotes" 
			     class="col-md-4 col-sm-4 request-offer max-center-xs" 
           ng-include="'/partials/admin/edit/request/admin-quote-column.html.swig?v={?brand.appversion?}'">
			</div>
			<!-- END quote repeat -->  
	</div>