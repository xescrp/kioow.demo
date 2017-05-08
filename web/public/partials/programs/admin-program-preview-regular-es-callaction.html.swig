<section class="product-resume max-center-sm info-block hidden-sm hidden-xs">
  <section class="price-total padded-b text-center" ng-hide="booking.idBooking.length > 0">
    <h4>
      <a class="text-alternate ">{{dmcproduct.title_es}}</a>
    </h4>
    <div class="the-price">
      <p class="mb-zero">
        <em>desde</em>
      </p>
      <p class="mb-l">
        <strong class="h1 bold">{{calculatePriceMinimum()}}{{dmcproduct.dmc.currency.symbol}}</strong>
      </p>
    </div>
    <p class="mb-b">
      <em>p/persona base doble</em>
    </p>
    <p class="mb-b">{{ formatnumber(calculatePriceMinimum()/dmcproduct.itinerary.length) }} {{dmcproduct.dmc.currency.symbol}}  / día</p>
    <p class="mb-xl">
      2 adultos, <strong>TOTAL: {{calculatePriceMinimum() * 2 }} {{dmcproduct.dmc.currency.symbol}} </strong>
    </p>
    <button type="button" class="btn btn-lg btn-default disabled">Reservar</button>
  </section>
  <hr class="mb-zero mt-xl" ng-hide="booking.idBooking.length > 0" />
  <footer class="dmc-profile">
    <p>
      <em>Viaje de: </em>
    </p>
    <img ng-src="{{getimage(dmcproduct.dmc.images.photo.url, 'corporateselfie')}}"
         data-src2x="{{getimage(dmcproduct.dmc.images.photo.url, 'corporateselfieretina')}}"
         class="img-responsive mb-xl" alt="{{ dmcproduct.dmc.company.name }} selfie" title="{{ dmcproduct.dmc.company.name }} selfie" />
    <div class="dmc-profile-widget">
      <img class="img-dmc-big" ng-src="{{ getimage(dmcproduct.dmc.images.logo.url, 'avatarb36') }}"
           data-src2x="{{ getimage(dmcproduct.dmc.images.logo.url, 'avatarb36retina') }}" alt="{{ dmcproduct.dmc.company.name }} logo"
        title="{{ dmcproduct.dmc.company.name }} logo" />
      <p class="dmc-text pre-text">
        <a href="/receptivo/{{dmcproduct.dmc.code}}/{{dmcproduct.dmc.company.name}}"
             target="_blank">{{ dmcproduct.dmc.company.name }}</a>
      </p>
    </div>
  </footer>
</section>