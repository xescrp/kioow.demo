<table class="table table-bordered availability-calendar">
    <thead>
        <tr>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
            <th>Sunday</th>
        </tr>
    </thead>
    <tbody class="notranslate">

        <tr>
            <td ng-click="opencalendar(calendar.firstweek.monday)" ng-class="{ 'enabled' : calendar.firstweek.monday.available }">
                <span>{{ calendar.currentmonth }}</span>
                <strong>{{ calendar.firstweek.monday.number }}</strong>
                <em class="regime" ng-show="calendar.firstweek.monday.rooms.double.price > 0">p/p double  <br />
                <strong>{{calendar.firstweek.monday.rooms.double.price}} <span class="currency">{{dmcproduct.dmc.currency.symbol}}</span></strong></em>
            </td>
            <td ng-click="opencalendar(calendar.firstweek.tuesday)" ng-class="{ 'enabled' : calendar.firstweek.tuesday.available }">
                <strong>{{ calendar.firstweek.tuesday.number }}</strong>
                <em class="regime" ng-show="calendar.firstweek.tuesday.rooms.double.price > 0">p/p double  <br />
                <strong>{{calendar.firstweek.tuesday.rooms.double.price}} <span class="currency">{{dmcproduct.dmc.currency.symbol}}</span></strong></em>
            </td>
            <td ng-click="opencalendar(calendar.firstweek.wednesday)" ng-class="{ 'enabled' : calendar.firstweek.wednesday.available }">
                <strong>{{ calendar.firstweek.wednesday.number }}</strong>
                <em class="regime" ng-show="calendar.firstweek.wednesday.rooms.double.price > 0">p/p double <br />
                <strong>{{calendar.firstweek.wednesday.rooms.double.price}} <span class="currency">{{dmcproduct.dmc.currency.symbol}}</span></strong></em>
            </td>
            <td ng-click="opencalendar(calendar.firstweek.thursday)" ng-class="{ 'enabled' : calendar.firstweek.thursday.available }">
                <strong>{{ calendar.firstweek.thursday.number }}</strong>
                <em class="regime" ng-show="calendar.firstweek.thursday.rooms.double.price > 0">p/p double <br />
                <strong>{{calendar.firstweek.thursday.rooms.double.price}} <span class="currency">{{dmcproduct.dmc.currency.symbol}}</span>
              </strong>
            </em>
            </td>
            <td ng-click="opencalendar(calendar.firstweek.friday)" ng-class="{ 'enabled' : calendar.firstweek.friday.available }">
                <strong>{{ calendar.firstweek.friday.number }}</strong>
                <em class="regime" ng-show="calendar.firstweek.friday.rooms.double.price > 0">p/p double <br />
                  <strong>{{calendar.firstweek.friday.rooms.double.price}} <span class="currency">{{dmcproduct.dmc.currency.symbol}}</span>
                </strong>
              </em>
            </td>
            <td ng-click="opencalendar(calendar.firstweek.saturday)" ng-class="{ 'enabled' : calendar.firstweek.saturday.available }">
                <strong>{{ calendar.firstweek.saturday.number }}</strong>
                <em class="regime" ng-show="calendar.firstweek.saturday.rooms.double.price > 0">p/p double <br />
                  <strong>{{calendar.firstweek.saturday.rooms.double.price}} <span class="currency">{{dmcproduct.dmc.currency.symbol}}</span>
                </strong>
              </em>
            </td>
            <td ng-click="opencalendar(calendar.firstweek.sunday)" ng-class="{ 'enabled' : calendar.firstweek.sunday.available }">
                <strong>{{ calendar.firstweek.sunday.number }}</strong>
                <em class="regime" ng-show="calendar.firstweek.sunday.rooms.double.price > 0">p/p double <br />
                  <strong>{{calendar.firstweek.sunday.rooms.double.price}} <span class="currency">{{dmcproduct.dmc.currency.symbol}}</span>
                </strong>
              </em>
            </td>
        </tr>
        <tr>
            <td ng-click="opencalendar(calendar.secondweek.monday)" ng-class="{ 'enabled' : calendar.secondweek.monday.available }">
                <strong>{{ calendar.secondweek.monday.number }}</strong>
                <em class="regime" ng-show="calendar.secondweek.monday.rooms.double.price > 0">p/p double <br />
                  <strong>{{calendar.secondweek.monday.rooms.double.price}} <span class="currency">{{dmcproduct.dmc.currency.symbol}}</span>
                </strong>
              </em>
            </td>
            <td ng-click="opencalendar(calendar.secondweek.tuesday)" ng-class="{ 'enabled' : calendar.secondweek.tuesday.available }">
                <strong>{{ calendar.secondweek.tuesday.number }}</strong>
                <em class="regime" ng-show="calendar.secondweek.tuesday.rooms.double.price > 0">p/p double <br />
                  <strong>{{calendar.secondweek.tuesday.rooms.double.price}} <span class="currency">{{dmcproduct.dmc.currency.symbol}}</span>
                </strong>
              </em>
            </td>
            <td ng-click="opencalendar(calendar.secondweek.wednesday)" ng-class="{ 'enabled' : calendar.secondweek.wednesday.available }">
                <strong>{{ calendar.secondweek.wednesday.number }}</strong>
                <em class="regime" ng-show="calendar.secondweek.wednesday.rooms.double.price > 0">p/p double <br />
                  <strong>{{calendar.secondweek.wednesday.rooms.double.price}} <span class="currency">{{dmcproduct.dmc.currency.symbol}}</span>
                </strong>
              </em>
            </td>
            <td ng-click="opencalendar(calendar.secondweek.thursday)" ng-class="{ 'enabled' : calendar.secondweek.thursday.available }">
                <strong>{{ calendar.secondweek.thursday.number }}</strong>
                <em class="regime" ng-show="calendar.secondweek.thursday.rooms.double.price > 0">p/p double <br />
                  <strong>{{calendar.secondweek.thursday.rooms.double.price}} <span class="currency">{{dmcproduct.dmc.currency.symbol}}</span>
                </strong>
              </em>
            </td>
            <td ng-click="opencalendar(calendar.secondweek.friday)" ng-class="{ 'enabled' : calendar.secondweek.friday.available }">
                <strong>{{ calendar.secondweek.friday.number }}</strong>
                <em class="regime" ng-show="calendar.secondweek.friday.rooms.double.price > 0">p/p double <br />
                  <strong>{{calendar.secondweek.friday.rooms.double.price}} <span class="currency">{{dmcproduct.dmc.currency.symbol}}</span>
                </strong>
              </em>
            </td>
            <td ng-click="opencalendar(calendar.secondweek.saturday)" ng-class="{ 'enabled' : calendar.secondweek.saturday.available }">
                <strong>{{ calendar.secondweek.saturday.number }}</strong>
                <em class="regime" ng-show="calendar.secondweek.saturday.rooms.double.price > 0">p/p double <br />
                  <strong>{{calendar.secondweek.saturday.rooms.double.price}} <span class="currency">{{dmcproduct.dmc.currency.symbol}}</span>
                </strong>
              </em>
            </td>
            <td ng-click="opencalendar(calendar.secondweek.sunday)" ng-class="{ 'enabled' : calendar.secondweek.sunday.available }">
                <strong>{{ calendar.secondweek.sunday.number }}</strong>
                <em class="regime" ng-show="calendar.secondweek.sunday.rooms.double.price > 0">p/p double <br />
                  <strong>{{calendar.secondweek.sunday.rooms.double.price}} <span class="currency">{{dmcproduct.dmc.currency.symbol}}</span>
                </strong>
              </em>
            </td>
        </tr>
        <tr>
            <td ng-click="opencalendar(calendar.thirdweek.monday)" ng-class="{ 'enabled' : calendar.thirdweek.monday.available }">

                <strong>{{ calendar.thirdweek.monday.number }}</strong>
                <em class="regime" ng-show="calendar.thirdweek.monday.rooms.double.price > 0">p/p double <br />
                  <strong>{{calendar.thirdweek.monday.rooms.double.price}} <span class="currency">{{dmcproduct.dmc.currency.symbol}}</span>
                </strong>
              </em>
            </td>
            <td ng-click="opencalendar(calendar.thirdweek.tuesday)" ng-class="{ 'enabled' : calendar.thirdweek.tuesday.available }">
                <strong>{{ calendar.thirdweek.tuesday.number }}</strong>
                <em class="regime" ng-show="calendar.thirdweek.tuesday.rooms.double.price > 0">p/p double <br />
                  <strong>{{calendar.thirdweek.tuesday.rooms.double.price}} <span class="currency">{{dmcproduct.dmc.currency.symbol}}</span>
                </strong>
              </em>
            </td>
            <td ng-click="opencalendar(calendar.thirdweek.wednesday)" ng-class="{ 'enabled' : calendar.thirdweek.wednesday.available }">
                <strong>{{ calendar.thirdweek.wednesday.number }}</strong>
                <em class="regime" ng-show="calendar.thirdweek.wednesday.rooms.double.price > 0">p/p double <br />
                  <strong>{{calendar.thirdweek.wednesday.rooms.double.price}} <span class="currency">{{dmcproduct.dmc.currency.symbol}}</span></strong></em>
            </td>
            <td ng-click="opencalendar(calendar.thirdweek.thursday)" ng-class="{ 'enabled' : calendar.thirdweek.thursday.available }">
                <strong>{{ calendar.thirdweek.thursday.number }}</strong>
                <em class="regime" ng-show="calendar.thirdweek.thursday.rooms.double.price > 0">p/p double <br />
                  <strong>{{calendar.thirdweek.thursday.rooms.double.price}} <span class="currency">{{dmcproduct.dmc.currency.symbol}}</span>
                </strong>
              </em>
            </td>
            <td ng-click="opencalendar(calendar.thirdweek.friday)" ng-class="{ 'enabled' : calendar.thirdweek.friday.available }">
                <strong>{{ calendar.thirdweek.friday.number }}</strong>
                <em class="regime" ng-show="calendar.thirdweek.friday.rooms.double.price > 0">p/p double <br />
                  <strong>{{calendar.thirdweek.friday.rooms.double.price}} <span class="currency">{{dmcproduct.dmc.currency.symbol}}</span>
                </strong>
              </em>
            </td>
            <td ng-click="opencalendar(calendar.thirdweek.saturday)" ng-class="{ 'enabled' : calendar.thirdweek.saturday.available }">
                <strong>{{ calendar.thirdweek.saturday.number }}</strong>
                <em class="regime" ng-show="calendar.thirdweek.saturday.rooms.double.price > 0">p/p double <br />
                  <strong>{{calendar.thirdweek.saturday.rooms.double.price}} <span class="currency">{{dmcproduct.dmc.currency.symbol}}</span>
                </strong>
              </em>
            </td>
            <td ng-click="opencalendar(calendar.thirdweek.sunday)" ng-class="{ 'enabled' : calendar.thirdweek.sunday.available }">
                <strong>{{ calendar.thirdweek.sunday.number }}</strong>
                <em class="regime" ng-show="calendar.thirdweek.sunday.rooms.double.price > 0">p/p double <br />
                  <strong>{{calendar.thirdweek.sunday.rooms.double.price}} <span class="currency">{{dmcproduct.dmc.currency.symbol}}</span>
                </strong>
              </em>
            </td>
        </tr>
        <tr>
            <td ng-click="opencalendar(calendar.fourthweek.monday)" ng-class="{ 'enabled' : calendar.fourthweek.monday.available }">
                <strong>{{ calendar.fourthweek.monday.number }}</strong>
                <em class="regime" ng-show="calendar.fourthweek.monday.rooms.double.price > 0">p/p double <br />
                  <strong>{{calendar.fourthweek.monday.rooms.double.price}} <span class="currency">{{dmcproduct.dmc.currency.symbol}}</span>
                </strong>
              </em>
            </td>
            <td ng-click="opencalendar(calendar.fourthweek.tuesday)" ng-class="{ 'enabled' : calendar.fourthweek.tuesday.available }">
                <strong>{{ calendar.fourthweek.tuesday.number }}</strong>
                <em class="regime" ng-show="calendar.fourthweek.tuesday.rooms.double.price > 0">p/p double <br />
                  <strong>{{calendar.fourthweek.tuesday.rooms.double.price}} <span class="currency">{{dmcproduct.dmc.currency.symbol}}</span>
                </strong>
              </em>
            </td>
            <td ng-click="opencalendar(calendar.fourthweek.wednesday)" ng-class="{ 'enabled' : calendar.fourthweek.wednesday.available }">
                <strong>{{ calendar.fourthweek.wednesday.number }}</strong>
                <em class="regime" ng-show="calendar.fourthweek.wednesday.rooms.double.price > 0">p/p double <br />
                  <strong>{{calendar.fourthweek.wednesday.rooms.double.price}} <span class="currency">{{dmcproduct.dmc.currency.symbol}}</span>
                </strong>
              </em>
            </td>
            <td ng-click="opencalendar(calendar.fourthweek.thursday)" ng-class="{ 'enabled' : calendar.fourthweek.thursday.available }">
                <strong>{{ calendar.fourthweek.thursday.number }}</strong>
                <em class="regime" ng-show="calendar.fourthweek.thursday.rooms.double.price > 0">p/p double <br />
                  <strong>{{calendar.fourthweek.thursday.rooms.double.price}} <span class="currency">{{dmcproduct.dmc.currency.symbol}}</span>
                </strong>
              </em>
            </td>
            <td ng-click="opencalendar(calendar.fourthweek.friday)" ng-class="{ 'enabled' : calendar.fourthweek.friday.available }">
                <strong>{{ calendar.fourthweek.friday.number }}</strong>
                <em class="regime" ng-show="calendar.fourthweek.friday.rooms.double.price > 0">p/p double <br />
                  <strong>{{calendar.fourthweek.friday.rooms.double.price}} <span class="currency">{{dmcproduct.dmc.currency.symbol}}</span>
                </strong>
              </em>
            </td>
            <td ng-click="opencalendar(calendar.fourthweek.saturday)" ng-class="{ 'enabled' : calendar.fourthweek.saturday.available }">
                <strong>{{ calendar.fourthweek.saturday.number }}</strong>
                <em class="regime" ng-show="calendar.fourthweek.saturday.rooms.double.price > 0">p/p double <br />
                  <strong>{{calendar.fourthweek.saturday.rooms.double.price}} <span class="currency">{{dmcproduct.dmc.currency.symbol}}</span>
                </strong>
              </em>
            </td>
            <td ng-click="opencalendar(calendar.fourthweek.sunday)" ng-class="{ 'enabled' : calendar.fourthweek.sunday.available }">
                <strong>{{ calendar.fourthweek.sunday.number }}</strong>
                <em class="regime" ng-show="calendar.fourthweek.sunday.rooms.double.price > 0">p/p double <br />
                  <strong>{{calendar.fourthweek.sunday.rooms.double.price}} <span class="currency">{{dmcproduct.dmc.currency.symbol}}</span>
                </strong>
              </em>
            </td>
        </tr>
        <tr>
            <td ng-click="opencalendar(calendar.fifthweek.monday)" ng-class="{ 'enabled' : calendar.fifthweek.monday.available }">
                <strong>{{ calendar.fifthweek.monday.number }}</strong>
                <em class="regime" ng-show="calendar.fifthweek.monday.rooms.double.price > 0">p/p double <br />
                  <strong>{{calendar.fifthweek.monday.rooms.double.price}} <span class="currency">{{dmcproduct.dmc.currency.symbol}}</span>
                </strong>
              </em>
            </td>
            <td ng-click="opencalendar(calendar.fifthweek.tuesday)" ng-class="{ 'enabled' : calendar.fifthweek.tuesday.available }">
                <strong>{{ calendar.fifthweek.tuesday.number }}</strong>
                <em class="regime" ng-show="calendar.fifthweek.tuesday.rooms.double.price > 0">p/p double <br />
                  <strong>{{calendar.fifthweek.tuesday.rooms.double.price}} <span class="currency">{{dmcproduct.dmc.currency.symbol}}</span>
                </strong>
              </em>
            </td>
            <td ng-click="opencalendar(calendar.fifthweek.wednesday)" ng-class="{ 'enabled' : calendar.fifthweek.wednesday.available }">
                <strong>{{ calendar.fifthweek.wednesday.number }}</strong>
                <em class="regime" ng-show="calendar.fifthweek.wednesday.rooms.double.price > 0">p/p double <br />
                  <strong>{{calendar.fifthweek.wednesday.rooms.double.price}} <span class="currency">{{dmcproduct.dmc.currency.symbol}}</span>
                </strong>
              </em>
            </td>
            <td ng-click="opencalendar(calendar.fifthweek.thursday)" ng-class="{ 'enabled' : calendar.fifthweek.thursday.available }">
                <strong>{{ calendar.fifthweek.thursday.number }}</strong>
                <em class="regime" ng-show="calendar.fifthweek.thursday.rooms.double.price > 0">p/p double <br />
                  <strong>{{calendar.fifthweek.thursday.rooms.double.price}} <span class="currency">{{dmcproduct.dmc.currency.symbol}}</span>
                </strong>
              </em>
            </td>
            <td ng-click="opencalendar(calendar.fifthweek.friday)" ng-class="{ 'enabled' : calendar.fifthweek.friday.available }">
                <strong>{{ calendar.fifthweek.friday.number }}</strong>
                <em class="regime" ng-show="calendar.fifthweek.friday.rooms.double.price > 0">p/p double <br />
                <strong>{{calendar.fifthweek.friday.rooms.double.price}} <span class="currency">{{dmcproduct.dmc.currency.symbol}}</span>
                </strong>
              </em>
            </td>
            <td ng-click="opencalendar(calendar.fifthweek.saturday)" ng-class="{ 'enabled' : calendar.fifthweek.saturday.available }">
              <strong>{{ calendar.fifthweek.saturday.number }}</strong>
              <em class="regime" ng-show="calendar.fifthweek.saturday.rooms.double.price > 0">
                p/p double <br />
                <strong>
                  {{calendar.fifthweek.saturday.rooms.double.price}} <span class="currency">{{dmcproduct.dmc.currency.symbol}}</span>
                </strong>
              </em>
            </td>
            <td ng-click="opencalendar(calendar.fifthweek.sunday)" ng-class="{ 'enabled' : calendar.fifthweek.sunday.available }">
                <strong>{{ calendar.fifthweek.sunday.number }}</strong>
                <em class="regime" ng-show="calendar.fifthweek.sunday.rooms.double.price > 0">p/p double <br />
                  <strong>{{calendar.fifthweek.sunday.rooms.double.price}} <span class="currency">{{dmcproduct.dmc.currency.symbol}}</span>
                </strong>
              </em>
            </td>
        </tr>
        <tr>
            <td ng-click="opencalendar(calendar.sixthweek.monday)" ng-class="{ 'enabled' : calendar.sixthweek.monday.available }">
                <strong>{{ calendar.sixthweek.monday.number }}</strong>
                <em class="regime" ng-show="calendar.sixthweek.monday.rooms.double.price > 0">p/p double <br />
                  <strong>{{calendar.sixthweek.monday.rooms.double.price}} <span class="currency">{{dmcproduct.dmc.currency.symbol}}</span>
                </strong>
              </em>
            </td>
            <td ng-click="opencalendar(calendar.sixthweek.tuesday)" ng-class="{ 'enabled' : calendar.sixthweek.tuesday.available }">
                <strong>{{ calendar.sixthweek.tuesday.number }}</strong>
                <em class="regime" ng-show="calendar.sixthweek.tuesday.rooms.double.price > 0">p/p double <br />
                  <strong>{{calendar.sixthweek.tuesday.rooms.double.price}} <span class="currency">{{dmcproduct.dmc.currency.symbol}}</span>
                </strong>
              </em>
            </td>
            <td ng-click="opencalendar(calendar.sixthweek.wednesday)" ng-class="{ 'enabled' : calendar.sixthweek.wednesday.available }">
                <strong>{{ calendar.sixthweek.wednesday.number }}</strong>
                <em class="regime" ng-show="calendar.sixthweek.wednesday.rooms.double.price > 0">p/p double <br />
                  <strong>{{calendar.sixthweek.wednesday.rooms.double.price}} <span class="currency">{{dmcproduct.dmc.currency.symbol}}</span>
                </strong>
              </em>
            </td>
            <td ng-click="opencalendar(calendar.sixthweek.thursday)" ng-class="{ 'enabled' : calendar.sixthweek.thursday.available }">
                <strong>{{ calendar.sixthweek.thursday.number }}</strong>
                <em class="regime" ng-show="calendar.sixthweek.thursday.rooms.double.price > 0">p/p double <br />
                  <strong>{{calendar.sixthweek.thursday.rooms.double.price}} <span class="currency">{{dmcproduct.dmc.currency.symbol}}</span>
                </strong>
              </em>
            </td>
            <td ng-click="opencalendar(calendar.sixthweek.friday)" ng-class="{ 'enabled' : calendar.sixthweek.friday.available }">
                <strong>{{ calendar.sixthweek.friday.number }}</strong>
                <em class="regime" ng-show="calendar.sixthweek.friday.rooms.double.price > 0">p/p double <br />
                  <strong>{{calendar.sixthweek.friday.rooms.double.price}} <span class="currency">{{dmcproduct.dmc.currency.symbol}}</span>
                </strong>
              </em>
            </td>
            <td ng-click="opencalendar(calendar.sixthweek.saturday)" ng-class="{ 'enabled' : calendar.sixthweek.saturday.available }">
                <strong>{{ calendar.sixthweek.saturday.number }}</strong>
                <em class="regime" ng-show="calendar.sixthweek.saturday.rooms.double.price > 0">p/p double <br />
                  <strong>{{calendar.sixthweek.saturday.rooms.double.price}} <span class="currency">{{dmcproduct.dmc.currency.symbol}}</span>
                </strong>
              </em>
            </td>
            <td ng-click="opencalendar(calendar.sixthweek.sunday)" ng-class="{ 'enabled' : calendar.sixthweek.sunday.available }">
                <strong>{{ calendar.sixthweek.sunday.number }}</strong>
                <em class="regime" ng-show="calendar.sixthweek.sunday.rooms.double.price > 0">p/p double <br />
                  <strong>{{calendar.sixthweek.sunday.rooms.double.price}} <span class="currency">{{dmcproduct.dmc.currency.symbol}}</span>
                </strong>
              </em>
            </td>
        </tr>
    </tbody>
</table>