<section class="product-resume max-center-sm info-block hidden-sm hidden-xs">
            <section class="price-total padded-b text-center" ng-hide="booking.idBooking.length > 0">
                <h4><a class="text-alternate" >{{dmcproduct.title}}</a></h4>
                <div class="the-price">
                    <p class="mb-zero"><em>from</em></p>
                    <p class="mb-l"><strong class="h1 bold">{{calculatePriceMinimum()}}</strong><span class="h3 bold"> {{dmcproduct.dmc.currency.symbol}}</span></p>
                </div>
                <p class="mb-b"><em>p/person double based</em></p>
                <p class="mb-b">{{ formatnumber(calculatePriceMinimum()/dmcproduct.itinerary.length) }} {{dmcproduct.dmc.currency.symbol}} / day</p>
                <p class="mb-xl">2 adults, <strong>TOTAL: {{calculatePriceMinimum() * 2 }} {{dmcproduct.dmc.currency.symbol}} </strong></p>
                <button type="button" class="btn btn-lg btn-default disabled">Book now</button>
            </section>
            <hr class="mb-zero mt-xl" ng-hide="booking.idBooking.length > 0" />
            <footer class="dmc-profile">
                <p><em>Tour made by: </em></p>
                <img ng-src="{{getimage(dmcproduct.dmc.images.photo.url, 'corporateselfie')}}" 
                     data-src2x="{{getimage(dmcproduct.dmc.images.photo.url, 'corporateselfieretina')}}" 
                     class="img-responsive" alt="{{ dmcproduct.dmc.company.name }} selfie" title="{{ dmcproduct.dmc.company.name }} selfie" />
                <div class="dmc-profile-widget mt-xl">
                    <img class="img-dmc-big" ng-src="{{ getimage(dmcproduct.dmc.images.logo.url, 'avatarb36') }}" 
                         data-src2x="{{ getimage(dmcproduct.dmc.images.logo.url, 'avatarb36retina') }}" 
                         title="{{ dmcproduct.dmc.company.name }} logo" alt="{{ dmcproduct.dmc.company.name }} logo" />
                    <p class="dmc-text">
                        <a href="/dmc-account" target="_blank">{{ dmcproduct.dmc.company.name }}</a>
                        <br />
                       <!--  <span class="dmc-rating"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i></span> -->
                    </p>
                </div>
                <p class="mt-b pre-text">{{ dmcproduct.dmc.additionalinfo.description.substring(0, 249) }}... <a href="/dmc-account" target="_blank">more info</a></p>
            </footer>
        </section>