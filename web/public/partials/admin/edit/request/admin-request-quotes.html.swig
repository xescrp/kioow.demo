<div class="row" ng-if="userquery.quotes == null || userquery.quotes.length == 0">
  <div class="col-md-4 col-sm-4 request-offer max-center-xs" >
    <h2>Sin cotizaciones</h2>
  </div>
</div>

<div class="row mt-xxl mb-xxl">
  <section class="load-product" ng-show="userquery.quotes != null && userquery.quotes.length > 0">
    <div class="mb-xxl">
                    <uib-tabset>                    
                        <uib-tab ng-repeat="dmcresponse in userquery.quotes" >
                            <tab-heading ng-show="dmcresponse.code">  
                              <strong>{{getdmcbyquote(dmcresponse).name}} </strong>
                            </tab-heading>
                          <quoteeditor quote="dmcresponse" rolename="rolename" provider="getdmcbyquote(dmcresponse)" userquery="userquery"></quoteeditor>                             
                        </uib-tab>                              
                    </uib-tabset>
                </div>
  </section>
</div>