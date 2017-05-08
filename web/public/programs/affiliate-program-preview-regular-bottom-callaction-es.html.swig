            <section class="price-total padded-b" ng-hide="booking.idBooking.length > 0">
                <div class="row">
                    <div class="col-md-6 text-center">
                        <div class="the-price">
                            <p class="mb-zero"><em>desde</em></p>
                            <p class="mb-l"><strong class="h1 bold">{{calculatePriceMinimum()}}{{dmcproduct.dmc.currency.symbol}}</strong></p>
                        </div>
                        <p class="mb-b"><em>p/persona en base doble</em></p>
                        <p class="mb-b">{{ formatnumber(calculatePriceMinimum()/dmcproduct.itinerary.length) }} {{dmcproduct.dmc.currency.symbol}}  / day</p>
                        <p class="mb-zero">2 adultos, <strong>TOTAL: {{calculatePriceMinimum() * 2 }} {{dmcproduct.dmc.currency.symbol}} </strong></p>
                    </div>
                    <div class="col-md-6 text-center">
                        <h3 class="h2 thin text-alternate mb-xxl">¿Listo para reservar?</h3>
                        <button type="button" class="btn btn-lg btn-default disabled">Reservar</button>
                    </div>
                </div>
            </section>
            <hr class="mb-b" />
            <footer class="dmc-profile">
                <div class="row">
                    <div class="col-md-8">
                        <div class="dmc-profile-widget">
                            <img class="img-dmc-big" 
                                 ng-src="{{ getimage(dmcproduct.dmc.images.logo.url, 'avatarb36') }}" 
                                 data-src2x="{{ getimage(dmcproduct.dmc.images.logo.url, 'avatarb36retina') }}" 
                                 title="{{ dmcproduct.dmc.company.name }} logo" alt="{{ dmcproduct.dmc.company.name }} logo" />
                            <p class="dmc-text">
                                por <a href="#dmc-profile">{{ dmcproduct.dmc.company.name }}</a><br />
                               <!--  <span class="dmc-rating"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i></span> -->
                            </p>
                        </div>
                        <p class="pre-text">{{ dmcproduct.dmc.additionalinfo.description.substring(0, 249) }}... <a href="/dmc-account" target="_blank">más info</a></p>
                    </div>
                    <div class="col-md-4">
                        <img ng-src="{{getimage(dmcproduct.dmc.images.photo.url, 'corporateselfie')}}" 
                             class="img-responsive" alt="{{ dmcproduct.dmc.company.name }} selfie" title="{{ dmcproduct.dmc.company.name }} selfie" />
                    </div>
                </div>
            </footer>