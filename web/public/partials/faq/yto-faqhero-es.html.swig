<section class="promo-head">
  <div class="container">
    <div class="row text-center">
      <h1 class="thin iblock padded-b mb-xxl hidden-xs">Consulta tus dudas </h1>
      <div class="col-md-6 col-xs-10 col-md-offset-3 col-xs-offset-1">
        
        <form name="s" id="s" metod="get" ng-submit="searchval()" ng-controller="faqsearchCtrl" novalidate>
          <div class="row" >
            <div class="input-group mb-xxl">
              <input type="text" placeholder="Búsqueda" ng-model="searchterm" name="searchterm" style="border: none;" class="form-control input-lg" value="{? searchterm ?}">
              <span class="input-group-btn">
                <button class="btn btn-info btn-lg btn-block" ng-click="searchval()" type="submit"> <i class="fa fa-search"></i></button>
              </span>
            </div>
          </div>
        </form>

      </div>
    </div>
  </div>
</section>