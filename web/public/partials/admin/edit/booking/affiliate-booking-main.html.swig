<div class="container" ng-controller="BookingCtrl">
    <div class="row no-print">
        <div class="col-md-12">		
            <ul class="breadcrumb">
              <li>
                <a href="/home">Home</a>
              </li>
              {% set accountname = '' %}
              {% set propertyname = loginsession.user.rolename %}
              {% if (propertyname == 'dmc') %} {% set accountname = loginsession.dmc.company.name  %}{% endif %}
              {% if (propertyname == 'affiliate') %} {% set accountname = loginsession.affiliate.company.name  %}{% endif %}
              {% if (propertyname != 'admin') %}
              <li>
                <a href="/edit/account?code={? loginsession.user.code ?}&usertype={? loginsession.user.rolename ?}" target="_self">{? accountname ?}</a>
              </li>
              {% endif %}
              <li><a href="/admin/bookings" target="_self">Reservas</a></li>
              <li class="active">{{booking.idBooking}}</li>
            </ul>
        </div>
    </div>
	<!-- Menu de botoens -->
    <div class="row no-print mb-xxl">
	<section>
	<!-- INIT CONTROL AFFILIATE -->
	<div>
	 <uib-tabset>
	 	{# resumen de la reserva #}
    	<uib-tab heading="Detalles" active="tabs[0].active" ng-click="selectTab('tabdetails')"> 

			<div class="bg-light padded-l">
			<!-- Main -->
        {% include "affiliate-booking-detail-general.html.swig" %}
        <!-- PVP -->
        {% include "booking-detail-price-resume.html.swig" %}
        <!-- ACCOMODATION -->
        {% include "booking-detail-accomodation.html.swig" %}
        <!-- Comments YTO -->
        {% include "booking-detail-comments.html.swig" %}
        <!-- Transfer booking -->
        {% include "booking-detail-transfer.html.swig" %}
        <!-- Cancelation details -->
        {% include "yto-booking-detail-cancellation.html.swig" %}
        <!-- Client documents -->
        {% include "booking-client-documents.html.swig" %}
      </div>

    	</uib-tab>

     <uib-tab heading="Administracion" active="tabs[1].active" ng-click="selectTab('tabadmin')">
       <div class="bg-light padded-l">
         {% include "affiliate-booking-detail-general.html.swig" %}
         <!-- PVP  NET cost effectiveness -->
         {% include "booking-detail-price.html.swig" %}

         {% include "affiliate-booking-detail-paysandcharges.html.swig" %}
       </div>
     </uib-tab>

     <uib-tab heading="Ficha viaje" active="tabs[2].active" ng-click="selectTab('tabprogram')">
       <div class="bg-light padded-l">
         {% include "affiliate-booking-detail-general.html.swig" %}
         <!-- Product Preview -->
         {% include "affiliate-booking-detail-product.html.swig" %}
       </div>
     </uib-tab>

     <uib-tab heading="Mensajería" active="tabs[3].active" ng-click="selectTab('tabmessage')">
       <div class="bg-light padded-l" >
         {% include "affiliate-booking-detail-general.html.swig" %}

         <div class="row" ng-if="booking.status != 'cancelled'">
           <!-- init messages chat -->
           <h4 ng-if="booking.affiliate != null" class="col-md-12">Mensajeria con yourttoo</h4>
           <div ng-cloak="" name="chataffi" class="col-md-12">
             <div ng-chat=""
             referenceobj=" booking._id"
             referencetype="'booking'"
             lang="'ES'"
             fromcode="'{? loginsession.user.code ?}'"
             tocode="'notificationsyto'">
             </div>
           </div>
           <!-- end messages chat -->
         </div>
       </div>
        
		</uib-tab>
     
		<uib-tab heading="Histórico" active="tabs[4].active" ng-click="selectTab('tabhistory')"> 
			<div class="bg-light padded-l">
			<!-- Main -->
        {% include "affiliate-booking-detail-general.html.swig" %}
        <div class="row">
        <div class="col-md-12">
          <h4>Histórico de cambios</h4>
          <hr class="mt-b mb-b" />
          <div class="mt-b" ng-repeat="story in booking.stories | orderBy:'-createdOn'" ng-if="currentsession.user.email == story.user">
            <div ng-if="story.story.text != null">
              <time class="text-xs text-gray">{{story.date | date:'medium'}}</time>
              | <span>{{story.story.text}}</span> <small class="italic text-gray">{{story.user}}</small>
              <hr class="mt-b mb-b" />
            </div>
            <div ng-if="story.story.description != null">
              <time class="text-xs text-gray">{{story.date | date:'medium'}}</time>
              | <span>{{story.story.description}}</span> <small class="italic text-gray">{{story.user}}</small>
              <hr class="mt-b mb-b" />
            </div>
          </div>
        </div>
      </div>
        <div class="row" ng-show="booking.status != 'cancelled' && booking.status != 'invalid' && booking.status != 'onbudget'">
				  <div class="col-md-12">
					  <div class="input-group">
						  <input type="text" ng-model="story.story.text"  class="form-control" placeholder="escribir aquí comentario..."  />
						  <span class="input-group-btn">
						  <button class="btn btn-primary" type="button" ng-click="addComment()">Guardar</button>
						  </span>
					  </div><!-- /input-group -->
				  </div>
        </div>
			</div>
		</uib-tab>
	  </uib-tabset>

	</div>
	<!-- END CONTROL AFFILIATE -->
	</section>
    </div>
</div>