<div class="container" ng-controller="adminHomeCtrl">
	<div class="bg-light padded-l">
			  <h1>
				<i class="fa fa-smile-o"></i> Welcome to yourttoo.com<br/>
				  <small>
					Your registration has been successfully approved.<br />
					<strong class="text-danger">Your ID: {{dmc.code}}</strong>
				  </small>
				</h1>
	{% set isok = loginsession.dmc.membership.companyimagescomplete && loginsession.dmc.membership.emergencycomplete && loginsession.dmc.membership.companytaxid  && loginsession.dmc.membership.companytaxid  && loginsession.dmc.membership.emergencycomplete && loginsession.dmc.membership.paymentcomplete  && loginsession.dmc.membership.averagecomplete && loginsession.dmc.membership.companycomplete && loginsession.dmc.membership.confirmterms   %}
	{% if isok == false %}
			  <div class="" >
				<h2 class="lh15">
				  To complete the process you must fill in other fields, some of them are mandatory. 
				  <br/>Otherwise your ID will not be valid to operate.
				</h2>
				<div ng-show="!dmc.membership.companyimagescomplete || !dmc.membership.emergencycomplete || !dmc.membership.companytaxid">
				  <h3>Public Profile</h3>
				  <ul class="list-unstyled">
					<li ng-show="!dmc.membership.companyimagescomplete">
					  <i class="fa fa-exclamation-circle text-brand-danger"></i>
					  <a href="/edit/account" target="_self" class="alert-link" >Company logo, picture and description</a>
					  <p>
						Please upload your company logo and a picture that represents your company <strong>(an idea: take a selfie of you or you with your team)</strong>.  Please also add a detailed company description to complete your public profile.
					  </p>
					</li>
					<li ng-show="!dmc.membership.companytaxid">
					  <i class="fa fa-exclamation-circle text-brand-danger"></i>
					  <a href="/edit/account" target="_self" class="alert-link">Company tax id</a>
					  <p>Please set your company tax id to receive payments.</p>
					</li>
					<li ng-show="!dmc.membership.emergencycomplete">
					  <i class="fa fa-exclamation-circle text-brand-danger"></i>
					  <a href="/edit/account" target="_self" class="alert-link">Emergency Phone (24/365) </a>
					  <p>Please set your emergency phone number.</p>
					</li>
				  </ul>
			    </div>
				<div ng-show="!dmc.membership.paymentcomplete || !dmc.membership.averagecomplete || !dmc.membership.companycomplete || !dmc.membership.confirmterms">
				  <h3>Private Profile</h3>
				  <ul class="list-unstyled">
					<li ng-show="!dmc.membership.paymentcomplete">
					  <i class="fa fa-exclamation-circle text-brand-danger"></i>
					  <a href="/edit/account" target="_self" class="alert-link">Payment details and currency</a>
					  <p>Please set your payment details and currency to receive payments from openmarket.travel.</p>
					</li>
					{# <li ng-show="!dmc.membership.averagecomplete">
					  <i class="fa fa-exclamation-circle text-brand-danger"></i>
					  <a href="/edit/account" target="_self" class="alert-link">Average daily expenditure (optional)</a>
					  <p>Please set your payment details to receive payments from openmarket.travel.</p>
					</li> #}
					<li ng-show="!dmc.membership.companycomplete">
					  <i class="fa fa-exclamation-circle text-brand-danger"></i>
					  <a href="/edit/account" target="_self" class="alert-link">Insurance policy and company registration</a>
					  <p>Please upload your insurance policy and your company registration.</p>
					</li>
					<li ng-show="!dmc.membership.confirmterms">
					  <i class="fa fa-exclamation-circle text-brand-danger"></i>
					  <a href="/edit/account" target="_self"  class="alert-link">Collaboration Agreement</a>
					  <p>Please confirm cancelation policy, payment conditions and openmarket.travel comission.</p>
					</li>
				  </ul>
				</div>
			  </div>
	{% endif %}
	</div>
  <div class="row">
		<div class="col-md-12">
			<nav class="bg-light padded-l" >
			  <h2>Start adding a new program: </h2>
        <button type="button" ng-click="openwindow('/edit/programs')" id="multidaysbutton" class="btn btn-primary btn-lg notranslate">Open Program Loader</button>
      </nav>
		</div>
	</div>
</div>