<div class="modal-header mb-xl text-right hidden-xs">
    <button class="btn btn-danger absolute btn-xs" style="top: 0; right: 0;" ng-click="exit()"><i class="fa fa-times"></i></button>
</div>
<div class="modal-body mt-b hidden-xs spaceholder-sm relative">
    
    <div class="preloader-blanket " ng-class="{'in' : !havemap}"><div class="preloader"><span></span><span></span><span></span></div></div>

    <section class="product-map hidden-xs" ng-if="havemap">
      <h2 class="thin padded-b mb-xl mt-b">Mapa de viaje: {{title_es}}</h2>
      <iframe class="full-width" style="height: 300px;" frameBorder="0" ng-if="havemap" ng-src="{{urliframe}}"></iframe>
      <p class="full-width bg-light text-gray-light-base padded-l">El mapa no indica la ubicación del alojamiento</p>
    </section>
</div>