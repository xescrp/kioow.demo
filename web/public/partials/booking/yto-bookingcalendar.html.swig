<div class="calendar-sf " ng-controller="bookingCalendarCtrl" style="position: relative; ">
    
    <div id="roomTypesPop" class="popover bottom" ng-model="popoverRooms" ng-show="popoverRooms.show">
      <div class="arrow"></div>
      <h3 class="popover-title">Otras habitaciones</h3>
      <div class="popover-content">
        <p>       
        <span ng-show="popoverRooms.single.price > 0">
        PVP Individual: <strong>{{ popoverRooms.single.price | number : 0}} {{ popoverRooms.currency.symbol }}</strong>
        <br />
        </span>
        <span ng-show="popoverRooms.triple.price > 0">
        PVP Triple : <strong>{{popoverRooms.triple.price | number : 0}} {{ popoverRooms.currency.symbol }}
        </strong><br /></span>
        
        </p>
      </div>
    </div>
    <div class="alert alert-danger" ng-show="dateNoMatch">
        <p><strong>Lo sentimos, no tenemos disponibilidad para la fecha seleccionada.</strong></p>
    </div>

    <div class="nav-calendar mt-xl">
        <div class="left hidden-xs hidden-sm">
            <button ng-click="removemonth()" type="button" class="btn btn-default"><i class="fa fa-arrow-left"></i></button>
        </div>
        <div class="center mobile-full">
            <select ng-change="newmonthselected(month)" class="form-control mobile-full"
                    id="select" ng-options="month.selectiontext for month in availablemonths"
                    ng-model="selectnewmonth"></select>
        </div>
        <div class="right hidden-xs hidden-sm">
            <button ng-click="addmonth()" type="button" class="btn btn-default"><i class="fa fa-arrow-right"></i></button>
        </div>
    </div>
    
    <table class="table table-bordered availability-calendar">
        <thead>
            <tr>
                <th>Lunes</th>
                <th>Martes</th>
                <th>Miércoles</th>
                <th>Jueves</th>
                <th>Viernes</th>
                <th>Sábado</th>
                <th>Domingo</th>
            </tr>
        </thead>
        <tbody>



            <!-- calendario formateado -->
            <tr ng-repeat="week in calendarFormated" ng-init="indWeek = $index">
                <td ng-click="selectDay(day)" ng-class="{'selected' : isSelected(day), 'enabled' : day.available }" 
                    ng-mouseenter="openPopOver($event, day)" ng-mouseleave="closePopOver()" ng-repeat="day in week">                        
                    <!-- name of the month in first position -->
                    <span ng-show="indWeek == 0 && $index == 0">{{ calendar.currentmonth }}&nbsp;&nbsp;&nbsp;</span>
                    <p>{{ day.number }}</p>
                    <em class="regime" 
                        ng-show="day.rooms.double.price > 0">PVP p/persona<br /> 
                        en doble<br />  <strong>{{day.rooms.double.price | number : 0 }}
                        <span class="currency"> {{day.rooms.currency.symbol}}</span></strong></em>
                </td>                    
            </tr>
            
        </tbody>
    </table>
    

</div>