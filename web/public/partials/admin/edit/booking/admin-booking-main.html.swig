<div class="container" ng-controller="BookingCtrl" ng-cloak>
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
          {% include "admin-booking-detail-general.html.swig" %}
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
        </div>
    	</uib-tab>

     <uib-tab heading="Pricing/Acomodacion" active="tabs[1].active" ng-click="selectTab('tabpricing')">
       <div class="bg-light padded-l">
         {% include "admin-booking-detail-general.html.swig" %}
         <!-- PVP  NET cost effectiveness -->
         {% include "booking-detail-price.html.swig" %}

         {% include "admin-booking-detail-accomodation.html.swig" %}
       </div>
     </uib-tab>

     <uib-tab heading="Cobros/Pagos" active="tabs[2].active" ng-click="selectTab('tabcobros')">
       <div class="bg-light padded-l">
         <!-- Main -->
         {% include "admin-booking-detail-general.html.swig" %}
         <!-- Payment details / factura -->
         {% include "admin-booking-detail-charges.html.swig" %}

         {% include "admin-booking-detail-edit-charges.html.swig" %}

         <hr />

         {% include "admin-booking-detail-payments.html.swig" %}

         {% include "admin-booking-detail-edit-payments.html.swig" %}
       </div>
     </uib-tab>

     <uib-tab heading="Program" active="tabs[3].active" ng-click="selectTab('tabprogram')">
       <div class="bg-light padded-l">
         {% include "admin-booking-detail-general.html.swig" %}
         <!-- Product Preview -->
         {% include "admin-booking-detail-product.html.swig" %}
       </div>
     </uib-tab>

     <uib-tab heading="Facturas" active="tabs[4].active" ng-click="selectTab('tabinvoice')">
       <div clasS="bg-light padded-l">
         <!-- Documents for traveler -->
         {% include "admin-booking-detail-general.html.swig" %}
         {% include "admin-booking-detail-invoice.html.swig" %}
       </div>
     </uib-tab>

     <uib-tab heading="Bono" active="tabs[5].active" ng-click="selectTab('tabbono')">
       <div clasS="bg-light padded-l">
         <!-- Documents for traveler -->
         {% include "admin-booking-detail-general.html.swig" %}
         {% include "admin-booking-detail-documents.html.swig" %}
       </div>
     </uib-tab>

     <uib-tab heading="Mensajería" active="tabs[6].active" ng-click="selectTab('tabmessage')">
       <div class="bg-light padded-l" ng-if="booking.status != 'cancelled'">
         {% include "admin-booking-detail-general.html.swig" %}

         <div class="row" >
           <!-- init messages chat -->
           <h4 ng-if="booking.affiliate != null" class="col-md-12">Mensajeria con {? editdata.affiliate.company.name ?} (Agencia)</h4>
           <div ng-cloak="" name="chataffi" class="col-md-12">
             <div ng-chat=""
             referenceobj=" booking._id"
             referencetype="'booking'"
             lang="'ES'"
             fromcode="'notificationsyto'"
             tocode="'{? editdata.affiliate.code ?}'" ng-cloak="">
             </div>
           </div>
           <!-- end messages chat -->
         </div>

         <hr></hr>

         <div class="row">
           <h4 ng-if="booking.dmc != null" class="col-md-12">Mensajeria con {? editdata.dmc.company.name ?} (Proveedor)</h4>
           <div ng-cloak="" name="chatdmc" class="col-md-12">
             <div ng-chat=""
             referenceobj=" booking._id"
             referencetype="'booking'"
             lang="'ES'"
             fromcode="'notificationsomt'"
             tocode="'{? editdata.dmc.code ?}'" ng-cloak="">
             </div>
           </div>
           <!-- end messages chat -->
         </div>
       </div>

     </uib-tab>

     <uib-tab heading="Histórico" active="tabs[7].active" ng-click="selectTab('tabhistory')">
       <div class="bg-light padded-l">
         <!-- Main -->
         {% include "admin-booking-detail-general.html.swig" %}
         <div class="row">
           <div class="col-md-12">
             <h4>Histórico de cambios</h4>
             <hr class="mt-b mb-b" />
             <div class="mt-b" ng-repeat="story in booking.stories | orderBy:'-createdOn'">
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
         <div class="row">
           <div class="col-md-12">
             <div class="input-group">
               <input type="text" ng-model="story.story.text"  class="form-control" placeholder="escribir aquí comentario..." />
               <span class="input-group-btn">
                 <button class="btn btn-primary" type="button" ng-click="addComment()">Guardar</button>
               </span>
             </div>
             <!-- /input-group -->
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