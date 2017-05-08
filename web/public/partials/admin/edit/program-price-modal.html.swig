<!-- PRICE MODAL -->
<div>
    <script type="text/ng-template" id="myModalContent.html">
        <div class="modal-header">
            <button type="button" ng-click="cancel()" class="close" data-dismiss="modal"><span aria-hidden="true">x</span><span class="sr-only">Close</span></button>
            <h3 class="modal-title">Availability</h3>
        </div>
        <div class="modal-body">
            <h4>Range</h4>
            <div class="row">
                <div class="col-xs-5 col-md-5">
                    <p class="input-group">
                        <input type="text" class="form-control" 
                               uib-datepicker-popup="{{format}}" ng-model="modifier.from" 
                               is-open="openedfrom" min-date="modifier.min" max-date="modifier.max" 
                               datepicker-options="dateOptions" date-disabled="disabled(date, mode)" 
                               ng-required="true" close-text="Close" />
                        <span class="input-group-btn">
                            <button type="button" class="btn btn-default" 
                                    ng-click="openfrom($event)"><i class="fa fa-calendar"></i></button>
                        </span>
                    </p>
                    <!--<input type="date" ng-model="modifier.from" class="form-control" placeholder="15/08/2014">-->
                </div>
                <div class="col-xs-2 col-md-2">
                    <p class="text-center">
                        to
                    </p>
                </div>
                <div class="col-xs-5 col-md-5">
                    <p class="input-group">
                        <input type="text" class="form-control" 
                               uib-datepicker-popup="{{format}}" 
                               ng-model="modifier.to" is-open="openedto" 
                               min-date="modifier.min" max-date="modifier.max" datepicker-options="dateOptions" 
                               date-disabled="disabled(date, mode)" ng-required="true" close-text="Close" />
                        <span class="input-group-btn">
                            <button type="button" class="btn btn-default" 
                                    ng-click="opento($event)"><i class="fa fa-calendar"></i></button>
                        </span>
                    </p>
                    <!--<input type="date"  class="form-control" placeholder="15/08/2014">-->
                </div>
            </div>
            <h4>Weekdays</h4>
            <div class="from-group weekcheck">
                <table class="table table-condensed text-center table-bordered">
                    <tbody>
                        <tr>
                            <td><abbr class="text-xs" title="Monday" for="weekcheckMon">Mon.</abbr></td>
                            <td><abbr class="text-xs" title="Tuesday" for="weekcheckTue">Tue.</abbr></td>
                            <td><abbr class="text-xs" title="Wednesday" for="weekcheckWed">Wed.</abbr></td>
                            <td><abbr class="text-xs" title="Thursday" for="weekcheckThu">Thu.</abbr></td>
                            <td><abbr class="text-xs" title="Friday" for="weekcheckFri">Fri.</abbr></td>
                            <td><abbr class="text-xs" title="Saturday" for="weekcheckSat">Sat.</abbr></td>
                            <td><abbr class="text-xs" title="Sunday" for="weekcheckSun">Sun.</abbr></td>
                            <td><label for="weekcheckAll"><strong>All</strong></label></td>
                        </tr>
                        <tr>
                            <td>
                                <input ng-change="onechanged()" ng-model="modifier.monday" type="checkbox" id="weekcheckMon" checked="" value="monday" />
                            </td>
                            <td>
                                <input ng-change="onechanged()" ng-model="modifier.tuesday" type="checkbox" id="weekcheckTue" checked="" value="tuesday" />
                            </td>

                            <td>
                                <input ng-change="onechanged()" ng-model="modifier.wednesday" type="checkbox" id="weekcheckWe" checked="" value="wednesday" />
                            </td>

                            <td>
                                <input ng-change="onechanged()" ng-model="modifier.thursday" type="checkbox" id="weekcheckThu" checked="" value="thursday" />
                            </td>

                            <td>
                                <input ng-change="onechanged()" ng-model="modifier.friday" type="checkbox" id="weekcheckFri" checked="" value="friday" />
                            </td>

                            <td>
                                <input ng-change="onechanged()" ng-model="modifier.saturday" type="checkbox" id="weekcheckSat" checked="" value="saturday" />
                            </td>

                            <td>
                                <input ng-change="onechanged()" ng-model="modifier.sunday" type="checkbox" id="weekcheckSun" checked="" value="sunday" />
                            </td>

                            <td>
                                <input ng-change="allchanged()" ng-model="allchecked.checked" type="checkbox" id="weekcheckAll" checked="" value="all" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <hr />
            <div class="row">
                <div class="btn-group col-md-12">
                            <button ng-show="btnavail.disabled" ng-click="setavailable()" type="button" class="btn btn-default half-width">Available</button>
                            <button ng-show="btnnotavail.active" ng-click="setnotavailable()" type="button" class="btn btn-danger active half-width">Not available</button>
                </div> 
            </div>
            <div class="row">
                <div class="btn-group col-md-12">
                            <button ng-show="btnavail.active" ng-click="setavailable()" type="button" class="btn btn-success active half-width">Available</button>
                            <button ng-show="btnnotavail.disabled" ng-click="setnotavailable()" type="button" class="btn btn-default half-width">Not available</button>

                </div> 
            </div>                                    

            <hr />
            <div ng-show="btnavail.active">
            
                <h3><span class="h4">Comissionable price per person</span><small class="h5 notranslate"> (2 pax basis)</small>
            <a ng-hide="isTranslateEs" class="pull-right uppercase btn btn-link pb-zero" target="_blank" href="http://openmarket.travel/faq/25-operation-dates-and-availability-calendar"><i class="fa fa-question-circle"></i> help</a>
            </h3>
                <div class="row">
                    <div class="col-xs-8 col-md-8">
                        <div class="form-group">
                            <label class="control-label" for="inputDefault">at double room <b>*</b></label>
                            <input ng-model="modifier.rooms.double.price" type="text" class="form-control" id="inputDefault" />
                        </div>
                    </div>
                    <div class="col-xs-4 col-md-4">
                        <div class="form-group">
                            <label class="control-label" for="inputDefault">Currency</label>
                            <p ng-init="modifier.rooms.currency = currencies" tooltip-animation="false" tooltip="Set currency default in Account/Payment details" class="bordered padded-b"><strong>{{currencies.label}} ({{currencies.symbol}})</strong></p>
                        </div>
                    </div>
                </div>
                <div class="row" ng-show="modifier.morerooms" ng-class="{disabledbox: btnnotavail.active}">
                    <div class="col-xs-8 col-md-8">
                        <div class="form-group">
                            <label class="control-label" for="inputDefault">at single room <b>*</b></label>
                            <input ng-model="modifier.rooms.single.price" type="text" class="form-control" id="inputDefault" />
                        </div>
                    </div>
                    <div class="col-xs-4 col-md-4">
                    </div>
                </div>
                <div class="row" ng-show="modifier.morerooms" ng-class="{disabledbox: btnnotavail.active}">
                    <div class="col-xs-8 col-md-8">
                        <div class="form-group">
                            <label class="control-label" for="inputDefault">at triple room <b>*</b></label>
                            <input ng-model="modifier.rooms.triple.price" type="text" class="form-control" id="inputDefault" />
                        </div>
                    </div>
                    <div class="col-xs-4 col-md-4">
                    </div>
                </div>
                <div class="row" ng-show="false" ng-class="{disabledbox: btnnotavail.active}">
                    <div class="col-xs-8 col-md-8">
                        <div class="form-group">
                            <label class="control-label" for="inputDefault">at other room <b>*</b></label>
                            <input ng-model="modifier.rooms.other.price" type="text" class="form-control" id="inputDefault" />
                        </div>
                    </div>
                    <div class="col-xs-4 col-md-4">
                    </div>
                </div>
                <a ng-hide="modifier.morerooms" ng-click="showmorerooms()">add different types of rooms</a>

                <p class="text-danger mt-b">Remember that prices must always include the agreed comission: <strong> {{commission}}%</strong></p>
            </div>
            

        </div>
        <div class="modal-footer">

            <button type="button" ng-click="cancel()" class="btn btn-default">Cancel</button>
            <button type="button" ng-click="ok()" class="btn btn-primary">Accept</button>
        </div>
    </script>
    <!-- /.modal-dialog -->
</div>
<!-- END MODAL PRICE -->