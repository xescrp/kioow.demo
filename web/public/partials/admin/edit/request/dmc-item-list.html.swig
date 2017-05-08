<img class="img-circle img-responsive id-user-img avatarb36" 
     ng-src="{{getimage(dmc.images.logo.url, 'avatarb36')}}" data-src2x="{{getimage(dmc.images.logo.url,   'avatarb36retina')}}"  alt="{{dmc.name}}" title="{{ dmc.name}}" />
<div class="item-body item-body pr-xl">
  <h3 class="list-group-item-heading"><strong>{{ dmc.name }}</strong> <em class="text-gray">| {{ dmc.company.legalname }}</em> [{{ dmc.code }}]</h3>
  <!-- paises que opera -->
    <div class="dmc-text text-gray">                   
      <i class="fa fa-globe pull-left pt-xs"></i>
      <p class="destinations text-help">
      <small ng-repeat="operates in dmc.company.operatein">
       
        <span>{{ operates.operateLocation.country }} ({{ operates.operateLocation.countrycode}})</span> 
      </small>                     
      </p>
    </div>
    <div>
        <p class="text-xs">
          {{dmc.user.email}} | {{dmc.contact.firstname}} {{dmc.contact.lastname}}
        </p>
    </div>

    <ul class="status">
        <li>
          <span class="label-item" ng-if="dmc.membership && !dmc.membership.registervalid" ><i class="fa fa-clock-o"></i> Waiting
          </span>
          <span class="label-item" ng-if="dmc.membership.registervalid && dmc.membership.publicprofilecomplete && dmc.membership.companyimagescomplete && dmc.membership.companycomplete && dmc.membership.paymentcomplete && dmc.membership.companytaxid && dmc.membership.emergencycomplete">
          <i class="fa fa-check"></i> Valid
          </span>
          <span class="label-item" ng-if="dmc.membership.registervalid && (!dmc.membership.publicprofilecomplete || !dmc.membership.companyimagescomplete || !dmc.membership.companycomplete || !dmc.membership.paymentcomplete || !dmc.membership.companytaxid || !dmc.membership.emergencycomplete)">
          <i class="fa fa-check"></i> Valid
          </span>
        </li>
    </ul>
</div>
<i class="fa fa-arrow-right hidden pull-right text-gray mt-xl mr-xl"></i>
