app.directive("programcalendarworklet", [
    'tools_service', 'Notification',
    '$uibModal', 'yto_api',
    '$cookieStore', 'Lightbox', 'productpreviewhelpers',
    'destinations_service', '$anchorScroll', '$location', 'modals_service',
    '$http', '$httpParamSerializerJQLike', '$window',
    function (tools_service, Notification,
        $uibModal, yto_api,
        $cookieStore, Lightbox, productpreviewhelpers, destinations_service, $anchorScroll, $location, modals_service, $http, $httpParamSerializerJQLike, $window) {

        return {
            templateUrl: '/js/angular/directives/views/programcalendarwk.html?d=' + new Date(),
            scope: {
                dmcproduct: '=dmcproduct',
            },
            link: function ($scope, el, attrs) {
                //constants
                var listenonce = false;
                $scope.calendar = {
                    currentmonth: '',
                    currentmonthnumber: 0,
                    firstdaymonth: new Date(),
                    today: new Date(),
                    firstweek: {
                        monday: {
                            name: 'monday',
                            index: 1,
                            number: 1,
                            date: null,
                            available: false,
                            rooms: {
                                single: {
                                    price: 0
                                },
                                double: {
                                    price: 0
                                },
                                triple: {
                                    price: 0
                                },
                                other: {
                                    price: 0
                                },
                                currency: '€ euro'
                            }
                        },
                        tuesday: {
                            name: 'tuesday',
                            index: 2,
                            number: 2,
                            date: null,
                            available: false,
                            rooms: {
                                single: {
                                    price: 0
                                },
                                double: {
                                    price: 0
                                },
                                triple: {
                                    price: 0
                                },
                                other: {
                                    price: 0
                                },
                                currency: '€ euro'
                            }
                        },
                        wednesday: {
                            name: 'wednesday',
                            index: 3,
                            number: 3,
                            date: null,
                            available: false,
                            rooms: {
                                single: {
                                    price: 0
                                },
                                double: {
                                    price: 0
                                },
                                triple: {
                                    price: 0
                                },
                                other: {
                                    price: 0
                                },
                                currency: '€ euro'
                            }
                        },
                        thursday: {
                            name: 'thursday',
                            index: 4,
                            number: 4,
                            date: null,
                            available: false,
                            rooms: {
                                single: {
                                    price: 0
                                },
                                double: {
                                    price: 0
                                },
                                triple: {
                                    price: 0
                                },
                                other: {
                                    price: 0
                                },
                                currency: '€ euro'
                            }
                        },
                        friday: {
                            name: 'friday',
                            index: 5,
                            number: 5,
                            date: null,
                            available: false,
                            rooms: {
                                single: {
                                    price: 0
                                },
                                double: {
                                    price: 0
                                },
                                triple: {
                                    price: 0
                                },
                                other: {
                                    price: 0
                                },
                                currency: '€ euro'
                            }
                        },
                        saturday: {
                            name: 'saturday',
                            index: 6,
                            number: 6,
                            date: null,
                            available: false,
                            rooms: {
                                single: {
                                    price: 0
                                },
                                double: {
                                    price: 0
                                },
                                triple: {
                                    price: 0
                                },
                                other: {
                                    price: 0
                                },
                                currency: '€ euro'
                            }
                        },
                        sunday: {
                            name: 'sunday',
                            index: 7,
                            number: 7,
                            date: null,
                            available: false,
                            rooms: {
                                single: {
                                    price: 0
                                },
                                double: {
                                    price: 0
                                },
                                triple: {
                                    price: 0
                                },
                                other: {
                                    price: 0
                                },
                                currency: '€ euro'
                            }
                        }
                    },
                    secondweek: {
                        monday: {
                            name: 'monday',
                            index: 1,
                            number: 8,
                            date: null,
                            available: false,
                            rooms: {
                                single: {
                                    price: 0
                                },
                                double: {
                                    price: 0
                                },
                                triple: {
                                    price: 0
                                },
                                other: {
                                    price: 0
                                },
                                currency: '€ euro'
                            }
                        },
                        tuesday: {
                            name: 'tuesday',
                            index: 2,
                            number: 9,
                            date: null,
                            available: false,
                            rooms: {
                                single: {
                                    price: 0
                                },
                                double: {
                                    price: 0
                                },
                                triple: {
                                    price: 0
                                },
                                other: {
                                    price: 0
                                },
                                currency: '€ euro'
                            }
                        },
                        wednesday: {
                            name: 'wednesday',
                            index: 3,
                            number: 10,
                            date: null,
                            available: false,
                            rooms: {
                                single: {
                                    price: 0
                                },
                                double: {
                                    price: 0
                                },
                                triple: {
                                    price: 0
                                },
                                other: {
                                    price: 0
                                },
                                currency: '€ euro'
                            }
                        },
                        thursday: {
                            name: 'thursday',
                            index: 4,
                            number: 11,
                            date: null,
                            available: false,
                            rooms: {
                                single: {
                                    price: 0
                                },
                                double: {
                                    price: 0
                                },
                                triple: {
                                    price: 0
                                },
                                other: {
                                    price: 0
                                },
                                currency: '€ euro'
                            }
                        },
                        friday: {
                            name: 'friday',
                            index: 5,
                            number: 12,
                            date: null,
                            available: false,
                            rooms: {
                                single: {
                                    price: 0
                                },
                                double: {
                                    price: 0
                                },
                                triple: {
                                    price: 0
                                },
                                other: {
                                    price: 0
                                },
                                currency: '€ euro'
                            }
                        },
                        saturday: {
                            name: 'saturday',
                            index: 6,
                            number: 13,
                            date: null,
                            available: false,
                            rooms: {
                                single: {
                                    price: 0
                                },
                                double: {
                                    price: 0
                                },
                                triple: {
                                    price: 0
                                },
                                other: {
                                    price: 0
                                },
                                currency: '€ euro'
                            }
                        },
                        sunday: {
                            name: 'sunday',
                            index: 7,
                            number: 14,
                            date: null,
                            available: false,
                            rooms: {
                                single: {
                                    price: 0
                                },
                                double: {
                                    price: 0
                                },
                                triple: {
                                    price: 0
                                },
                                other: {
                                    price: 0
                                },
                                currency: '€ euro'
                            }
                        }
                    },
                    thirdweek: {
                        monday: {
                            name: 'monday',
                            index: 1,
                            number: 15,
                            date: null,
                            available: false,
                            rooms: {
                                single: {
                                    price: 0
                                },
                                double: {
                                    price: 0
                                },
                                triple: {
                                    price: 0
                                },
                                other: {
                                    price: 0
                                },
                                currency: '€ euro'
                            }
                        },
                        tuesday: {
                            name: 'tuesday',
                            index: 2,
                            number: 16,
                            date: null,
                            available: false,
                            rooms: {
                                single: {
                                    price: 0
                                },
                                double: {
                                    price: 0
                                },
                                triple: {
                                    price: 0
                                },
                                other: {
                                    price: 0
                                },
                                currency: '€ euro'
                            }
                        },
                        wednesday: {
                            name: 'wednesday',
                            index: 3,
                            number: 17,
                            date: null,
                            available: false,
                            rooms: {
                                single: {
                                    price: 0
                                },
                                double: {
                                    price: 0
                                },
                                triple: {
                                    price: 0
                                },
                                other: {
                                    price: 0
                                },
                                currency: '€ euro'
                            }
                        },
                        thursday: {
                            name: 'thursday',
                            index: 4,
                            number: 18,
                            date: null,
                            available: false,
                            rooms: {
                                single: {
                                    price: 0
                                },
                                double: {
                                    price: 0
                                },
                                triple: {
                                    price: 0
                                },
                                other: {
                                    price: 0
                                },
                                currency: '€ euro'
                            }
                        },
                        friday: {
                            name: 'friday',
                            index: 5,
                            number: 19,
                            date: null,
                            available: false,
                            rooms: {
                                single: {
                                    price: 0
                                },
                                double: {
                                    price: 0
                                },
                                triple: {
                                    price: 0
                                },
                                other: {
                                    price: 0
                                },
                                currency: '€ euro'
                            }
                        },
                        saturday: {
                            name: 'saturday',
                            index: 6,
                            number: 20,
                            date: null,
                            available: false,
                            rooms: {
                                single: {
                                    price: 0
                                },
                                double: {
                                    price: 0
                                },
                                triple: {
                                    price: 0
                                },
                                other: {
                                    price: 0
                                },
                                currency: '€ euro'
                            }
                        },
                        sunday: {
                            name: 'sunday',
                            index: 7,
                            number: 21,
                            date: null,
                            available: false,
                            rooms: {
                                single: {
                                    price: 0
                                },
                                double: {
                                    price: 0
                                },
                                triple: {
                                    price: 0
                                },
                                other: {
                                    price: 0
                                },
                                currency: '€ euro'
                            }
                        }
                    },
                    fourthweek: {
                        monday: {
                            name: 'monday',
                            index: 1,
                            number: 22,
                            date: null,
                            available: false,
                            rooms: {
                                single: {
                                    price: 0
                                },
                                double: {
                                    price: 0
                                },
                                triple: {
                                    price: 0
                                },
                                other: {
                                    price: 0
                                },
                                currency: '€ euro'
                            }
                        },
                        tuesday: {
                            name: 'tuesday',
                            index: 2,
                            number: 23,
                            date: null,
                            available: false,
                            rooms: {
                                single: {
                                    price: 0
                                },
                                double: {
                                    price: 0
                                },
                                triple: {
                                    price: 0
                                },
                                other: {
                                    price: 0
                                },
                                currency: '€ euro'
                            }
                        },
                        wednesday: {
                            name: 'wednesday',
                            index: 3,
                            number: 24,
                            date: null,
                            available: false,
                            rooms: {
                                single: {
                                    price: 0
                                },
                                double: {
                                    price: 0
                                },
                                triple: {
                                    price: 0
                                },
                                other: {
                                    price: 0
                                },
                                currency: '€ euro'
                            }
                        },
                        thursday: {
                            name: 'thursday',
                            index: 4,
                            number: 25,
                            date: null,
                            available: false,
                            rooms: {
                                single: {
                                    price: 0
                                },
                                double: {
                                    price: 0
                                },
                                triple: {
                                    price: 0
                                },
                                other: {
                                    price: 0
                                },
                                currency: '€ euro'
                            }
                        },
                        friday: {
                            name: 'friday',
                            index: 5,
                            number: 26,
                            date: null,
                            available: false,
                            rooms: {
                                single: {
                                    price: 0
                                },
                                double: {
                                    price: 0
                                },
                                triple: {
                                    price: 0
                                },
                                other: {
                                    price: 0
                                },
                                currency: '€ euro'
                            }
                        },
                        saturday: {
                            name: 'saturday',
                            index: 6,
                            number: 27,
                            date: null,
                            available: false,
                            rooms: {
                                single: {
                                    price: 0
                                },
                                double: {
                                    price: 0
                                },
                                triple: {
                                    price: 0
                                },
                                other: {
                                    price: 0
                                },
                                currency: '€ euro'
                            }
                        },
                        sunday: {
                            name: 'sunday',
                            index: 7,
                            number: 29,
                            date: null,
                            available: false,
                            rooms: {
                                single: {
                                    price: 0
                                },
                                double: {
                                    price: 0
                                },
                                triple: {
                                    price: 0
                                },
                                other: {
                                    price: 0
                                },
                                currency: '€ euro'
                            }
                        }
                    },
                    fifthweek: {
                        monday: {
                            name: 'monday',
                            index: 1,
                            number: 30,
                            date: null,
                            available: false,
                            rooms: {
                                single: {
                                    price: 0
                                },
                                double: {
                                    price: 0
                                },
                                triple: {
                                    price: 0
                                },
                                other: {
                                    price: 0
                                },
                                currency: '€ euro'
                            }
                        },
                        tuesday: {
                            name: 'tuesday',
                            index: 2,
                            number: 31,
                            date: null,
                            available: false,
                            rooms: {
                                single: {
                                    price: 0
                                },
                                double: {
                                    price: 0
                                },
                                triple: {
                                    price: 0
                                },
                                other: {
                                    price: 0
                                },
                                currency: '€ euro'
                            }
                        },
                        wednesday: {
                            name: 'wednesday',
                            index: 3,
                            number: 0,
                            date: null,
                            available: false,
                            rooms: {
                                single: {
                                    price: 0
                                },
                                double: {
                                    price: 0
                                },
                                triple: {
                                    price: 0
                                },
                                other: {
                                    price: 0
                                },
                                currency: '€ euro'
                            }
                        },
                        thursday: {
                            name: 'thursday',
                            index: 4,
                            number: 0,
                            date: null,
                            available: false,
                            rooms: {
                                single: {
                                    price: 0
                                },
                                double: {
                                    price: 0
                                },
                                triple: {
                                    price: 0
                                },
                                other: {
                                    price: 0
                                },
                                currency: '€ euro'
                            }
                        },
                        friday: {
                            name: 'friday',
                            index: 5,
                            number: 0,
                            date: null,
                            available: false,
                            rooms: {
                                single: {
                                    price: 0
                                },
                                double: {
                                    price: 0
                                },
                                triple: {
                                    price: 0
                                },
                                other: {
                                    price: 0
                                },
                                currency: '€ euro'
                            }
                        },
                        saturday: {
                            name: 'saturday',
                            index: 6,
                            number: 0,
                            date: null,
                            available: false,
                            rooms: {
                                single: {
                                    price: 0
                                },
                                double: {
                                    price: 0
                                },
                                triple: {
                                    price: 0
                                },
                                other: {
                                    price: 0
                                },
                                currency: '€ euro'
                            }
                        },
                        sunday: {
                            name: 'sunday',
                            index: 7,
                            number: 0,
                            date: null,
                            available: false,
                            rooms: {
                                single: {
                                    price: 0
                                },
                                double: {
                                    price: 0
                                },
                                triple: {
                                    price: 0
                                },
                                other: {
                                    price: 0
                                },
                                currency: '€ euro'
                            }
                        }
                    },
                    sixthweek: {
                        monday: {
                            name: 'monday',
                            index: 1,
                            number: 0,
                            date: null,
                            available: false,
                            rooms: {
                                single: {
                                    price: 0
                                },
                                double: {
                                    price: 0
                                },
                                triple: {
                                    price: 0
                                },
                                other: {
                                    price: 0
                                },
                                currency: '€ euro'
                            }
                        },
                        tuesday: {
                            name: 'tuesday',
                            index: 2,
                            number: 0,
                            date: null,
                            available: false,
                            rooms: {
                                single: {
                                    price: 0
                                },
                                double: {
                                    price: 0
                                },
                                triple: {
                                    price: 0
                                },
                                other: {
                                    price: 0
                                },
                                currency: '€ euro'
                            }
                        },
                        wednesday: {
                            name: 'wednesday',
                            index: 3,
                            number: 0,
                            date: null,
                            available: false,
                            rooms: {
                                single: {
                                    price: 0
                                },
                                double: {
                                    price: 0
                                },
                                triple: {
                                    price: 0
                                },
                                other: {
                                    price: 0
                                },
                                currency: '€ euro'
                            }
                        },
                        thursday: {
                            name: 'thursday',
                            index: 4,
                            number: 0,
                            date: null,
                            available: false,
                            rooms: {
                                single: {
                                    price: 0
                                },
                                double: {
                                    price: 0
                                },
                                triple: {
                                    price: 0
                                },
                                other: {
                                    price: 0
                                },
                                currency: '€ euro'
                            }
                        },
                        friday: {
                            name: 'friday',
                            index: 5,
                            number: 0,
                            date: null,
                            available: false,
                            rooms: {
                                single: {
                                    price: 0
                                },
                                double: {
                                    price: 0
                                },
                                triple: {
                                    price: 0
                                },
                                other: {
                                    price: 0
                                },
                                currency: '€ euro'
                            }
                        },
                        saturday: {
                            name: 'saturday',
                            index: 6,
                            number: 0,
                            date: null,
                            available: false,
                            rooms: {
                                single: {
                                    price: 0
                                },
                                double: {
                                    price: 0
                                },
                                triple: {
                                    price: 0
                                },
                                other: {
                                    price: 0
                                },
                                currency: '€ euro'
                            }
                        },
                        sunday: {
                            name: 'sunday',
                            index: 7,
                            number: 0,
                            date: null,
                            available: false,
                            rooms: {
                                single: {
                                    price: 0
                                },
                                double: {
                                    price: 0
                                },
                                triple: {
                                    price: 0
                                },
                                other: {
                                    price: 0
                                },
                                currency: '€ euro'
                            }
                        }
                    },
                    getMonthNameSpanish: _getMonthNameSpanish,
                    getMonthNameEnglish: _getMonthNameEnglish,
                    getDayOfWeek: _getDayOfWeek
                };
                $scope.selectedday = new Date();
                $scope.calendartemplate = '/js/angular/directives/views/programeditor-tabs/program-price-calendar.html?d=' + new Date();
                $scope.pricepoptemplate = '/js/angular/directives/views/programeditor-tabs/program-price-modal.html?d=' + new Date();
                //aux methods
                $scope.opencalendar = function (day) {
                    $scope.selectedday = day;

                    var modalInstance = $uibModal.open({
                        templateUrl: 'myModalContent.html',
                        controller: ModalInstanceCtrl,

                        size: '',
                        resolve: {
                            stuff: function () {
                                return { theday: $scope.selectedday, currencies: $scope.dmcproduct.dmc.currency, commission: $scope.dmcproduct.dmc.membership.b2bcommission }
                            }
                        }
                    });
                    modalInstance.opened.then(function () {

                    });
                    modalInstance.result.then(function (selectionrange) {

                        buildAvailabilityRange(selectionrange);
                        _reset_calendar();
                        buildAMonthCalendar($scope.selectnewmonth.year, $scope.selectnewmonth.monthindex);
                        setAvailabilityInCalendar($scope.selectnewmonth.year, $scope.selectnewmonth.monthindex);
                    },function () { });
                }


                var ModalInstanceCtrl = function ($scope, $uibModalInstance, stuff) {

                    $scope.isTranslateEs = function () {
                        var transActive = $cookies.googtrans;
                        console.log('transActive', transActive)
                        if (transActive != undefined && transActive != null) {
                            return true
                        } else {
                            return false
                        }
                    };
                    //console.log(stuff.currencies);
                    $scope.commission = stuff.commission;
                    var today = stuff.theday.date;
                    var fulldatefrom = new Date().getFullYear() + "-" + new Date().getMonth() + "-" + new Date().getDate();
                    var fulldateto = new Date().getFullYear() + "-" + new Date().getMonth() + "-" + (new Date().getDate() + 1);

                    var _max = new Date(today.getFullYear() + 2, 11, 31);
                    var maxstring = _max.getFullYear() + "-" + _max.getMonth() + "-" + _max.getDate();
                    var _min = new Date(today.getFullYear(), today.getMonth(), 1);
                    var minstring = _min.getFullYear() + "-" + _min.getMonth() + "-" + _min.getDate();

                    function MarkDayOfWeek(dayindex) {
                        if (dayindex == 0) {
                            $scope.modifier.sunday = true;
                            return 'sunday';
                        }
                        if (dayindex == 1) {
                            $scope.modifier.monday = true;
                            return 'monday';
                        }
                        if (dayindex == 2) {
                            $scope.modifier.tuesday = true;
                            return 'tuesday';
                        }
                        if (dayindex == 3) {
                            $scope.modifier.wednesday = true;
                            return 'wednesday';
                        }
                        if (dayindex == 4) {
                            $scope.modifier.thursday = true;
                            return 'thursday';
                        }
                        if (dayindex == 5) {
                            $scope.modifier.friday = true;
                            return 'friday';
                        }
                        if (dayindex == 6) {
                            $scope.modifier.saturday = true;
                            return 'saturday';
                        }

                    }
                    $scope.currencies = stuff.currencies;
                    $scope.openedfrom = false;
                    $scope.openedto = false;
                    $scope.openfrom = function ($event) {
                        $event.preventDefault();
                        $event.stopPropagation();

                        $scope.openedfrom = true;
                    };

                    $scope.opento = function ($event) {
                        $event.preventDefault();
                        $event.stopPropagation();

                        $scope.openedto = true;
                    };

                    $scope.formats = ['yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
                    $scope.format = $scope.formats[0];

                    $scope.dateOptions = {
                        formatYear: 'yyyy',
                        startingDay: 1
                    };

                    $scope.modifier = {
                        from: new Date(stuff.theday.date.getFullYear(), stuff.theday.date.getMonth(), stuff.theday.date.getDate()),
                        to: new Date(stuff.theday.date.getFullYear(), stuff.theday.date.getMonth(), stuff.theday.date.getDate()),
                        min: _min,
                        max: _max,
                        available: stuff.theday.available,
                        rooms: {
                            single: { price: stuff.theday.rooms.single.price },
                            double: { price: stuff.theday.rooms.double.price },
                            triple: { price: stuff.theday.rooms.triple.price },
                            currency: '€ euro'
                        },
                        monday: false,
                        tuesday: false,
                        wednesday: false,
                        thursday: false,
                        friday: false,
                        saturday: false,
                        sunday: false,
                        morerooms: false
                    };
                    $scope.showmorerooms = function () {
                        $scope.modifier.morerooms = true;
                    };
                    $scope.allchecked = {
                        checked: false
                    };

                    function checkall() {
                        return ($scope.modifier.monday &
                            $scope.modifier.tuesday &
                            $scope.modifier.wednesday &
                            $scope.modifier.thursday &
                            $scope.modifier.friday &
                            $scope.modifier.saturday &
                            $scope.modifier.sunday);
                    }

                    $scope.onechanged = function () {
                        if (checkall()) { $scope.allchecked.checked = true; }
                        else {
                            $scope.allchecked.checked = false;
                        }
                    };

                    $scope.allchanged = function () {
                        if ($scope.allchecked.checked) {
                            $scope.modifier.monday = true;
                            $scope.modifier.tuesday = true;
                            $scope.modifier.wednesday = true;
                            $scope.modifier.thursday = true;
                            $scope.modifier.friday = true;
                            $scope.modifier.saturday = true;
                            $scope.modifier.sunday = true;
                        }
                        else {
                            $scope.modifier.monday = false;
                            $scope.modifier.tuesday = false;
                            $scope.modifier.wednesday = false;
                            $scope.modifier.thursday = false;
                            $scope.modifier.friday = false;
                            $scope.modifier.saturday = false;
                            $scope.modifier.sunday = false;
                        }
                    }



                    $scope.btnavail = { active: false, disabled: true };
                    $scope.btnnotavail = { active: true, disabled: false };
                    $scope.priceclass = '';
                    //buttons available
                    $scope.setavailable = function () {
                        $scope.modifier.available = true;
                        //buttons
                        $scope.btnavail.active = true;
                        $scope.btnavail.disabled = false;

                        $scope.btnnotavail.active = false;
                        $scope.btnnotavail.disabled = true;

                    };

                    $scope.setnotavailable = function () {
                        $scope.modifier.available = false;

                        //buttons
                        $scope.btnavail.active = false;
                        $scope.btnavail.disabled = true;

                        $scope.btnnotavail.active = true;
                        $scope.btnnotavail.disabled = false;
                    };


                    $scope.modifyAvailability = function () {
                        var today = new Date();
                        if ($scope.modifier.from > $scope.calendar.modifier.to) {
                            throw 'The start date must be previous to the end date';
                        }

                        if ($scope.modifier.from < today) {
                            throw 'The start date cannot be previous to the current day';
                        }

                        var start = $scope.modifier.from;
                        var end = $scope.modifier.to;
                        var iterator = start;
                        while (iterator <= end) {

                        }
                    };

                    function isNumber(n) {
                        return !isNaN(parseFloat(n)) && isFinite(n);
                    }

                    $scope.ok = function () {
                        var info = $scope.modifier;
                        info.from = new Date($scope.modifier.from);
                        info.to = new Date($scope.modifier.to);

                        if ($scope.modifier.from > $scope.modifier.to) {
                            toaster.pop('error', 'Review your dates',
                                'The start date must be lower than the end date');
                            throw 'The start date must be lower than the end date';
                        }
                        if ($scope.modifier.available) {
                            if ($scope.modifier.rooms.double.price == '' ||
                                $scope.modifier.rooms.double.price == 0 ||
                                isNumber($scope.modifier.rooms.double.price) == false) {
                                toaster.pop('error', 'Review your prices',
                                    'You must set a price for your rooms, and it must be a number');

                                throw 'You must set a price for your rooms';
                            }
                            if ($scope.modifier.rooms.currency == null || $scope.modifier.rooms.currency == '') {
                                toaster.pop('error', 'Review your prices',
                                    'You must set a currency for the price');

                                throw 'You must set a currency for the price';
                            }
                        }

                        $uibModalInstance.close(info);
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };

                    MarkDayOfWeek(today.getDay());
                    $scope.btnavail.active = stuff.theday.available;
                    $scope.btnavail.disabled = !$scope.btnavail.active;
                    $scope.btnnotavail.active = !$scope.btnavail.active;
                    $scope.btnnotavail.disabled = !$scope.btnnotavail.active;

                };


                //// **************************** CALENDAR AND DATE METHODS ***************************** //
                //// **************************** this is a really headache ***************************** //
                //// **************************** do not touch if you're not sure what are you doing..*** //
                //THIS IS OK
                function buildAnEmptyCalendar() {

                    var today = new Date();

                    var monthname = _getMonthNameEnglish(today.getMonth());

                    $scope.calendar.currentmonthnumber = today.getMonth();
                    $scope.calendar.currentmonth = monthname;

                    var first = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0, 0);

                    var iterate = first;
                    var weekindex = 0;
                    var startflag = true;

                    for (var i = 1; i <= 31; i++) {

                        var theday = new Date(iterate.getFullYear(), iterate.getMonth(), iterate.getDate(), 0, 0, 0, 0);

                        var day = _getDayOfWeek(iterate.getDay());
                        var weekindex = getWeekOfMonth(iterate);
                        var week = _getWeekName(weekindex);

                        $scope.calendar[week][day].date = theday;
                        $scope.calendar[week][day].number = theday.getDate();
                        $scope.calendar[week][day].rooms = {
                            single: {
                                price: 0
                            },
                            double: {
                                price: 0
                            },
                            triple: {
                                price: 0
                            },
                            other: {
                                price: 0
                            },
                            currency: '€ euro'
                        }
                        //iterate the day
                        var inc = iterate.setDate(i);
                        iterate = new Date(inc);
                    }
                }
                function _reset_calendar() {
                    $scope.calendar.currentmonth = '';
                    $scope.calendar.currentmonthnumber = 0;
                    for (var i = 1; i < 7; i++) {
                        for (var d = 0; d < 7; d++) {
                            var day = _getDayOfWeek(d);
                            var week = _getWeekName(i);
                            $scope.calendar[week][day].date = null;
                            $scope.calendar[week][day].number = '';
                            $scope.calendar[week][day].available = false;
                            $scope.calendar[week][day].rooms = {
                                single: {
                                    price: 0
                                },
                                double: {
                                    price: 0
                                },
                                triple: {
                                    price: 0
                                },
                                other: {
                                    price: 0
                                },
                                currency: '€ euro'
                            }
                        }
                    }
                }

                //THIS IS OK
                function buildAMonthCalendar(year, month) {
                    var currentdate = new Date(year, month, 1, 0, 0, 0, 0);
                    var monthname = _getMonthNameEnglish(currentdate.getMonth());

                    $scope.calendar.currentmonthnumber = currentdate.getMonth();
                    $scope.calendar.currentmonth = monthname;
                    $scope.calendar.firstdaymonth = new Date(year, month, 1);

                    var iterate = new Date(year, month, 1);
                    var last = new Date(year, month, 1);
                    last.setMonth(month + 1);

                    weekindex = 0;
                    var startflag = true;

                    while (last > iterate) {
                        var day = _getDayOfWeek(iterate.getDay());
                        var weekindex = getWeekOfMonth(iterate);
                        var week = _getWeekName(weekindex);

                        $scope.calendar[week][day].date =
                            new Date(
                                iterate.getFullYear(),
                                iterate.getMonth(),
                                iterate.getDate()
                            );
                        $scope.calendar[week][day].number = iterate.getDate();
                        $scope.calendar[week][day].rooms = {
                            single: {
                                price: 0
                            },
                            double: {
                                price: 0
                            },
                            triple: {
                                price: 0
                            },
                            other: {
                                price: 0
                            },
                            currency: '€ euro'
                        }
                        iterate.setDate(iterate.getDate() + 1);

                    }

                }

                //*************************** New Availability Managing Methods...
                function buildAvailabilityRange(newrange) {
                    if (newrange) {
                        var start = new Date(newrange.from.getFullYear(), newrange.from.getMonth(), newrange.from.getDate());
                        var end = new Date(newrange.to.getFullYear(), newrange.to.getMonth(), newrange.to.getDate());
                        var iterate = new Date(newrange.from.getFullYear(), newrange.from.getMonth(), newrange.from.getDate());
                        //start the road...
                        while (iterate <= end) {
                            //which year:
                            var indexyear = _indexOfYear(iterate.getFullYear());
                            //check we've found the availability for thuis year...
                            if (indexyear == -1) {
                                //if not add one...
                                $scope.dmcproduct.availability.push(_getNewAvailForYear(iterate.getFullYear()));
                                //..and get the index
                                indexyear = _indexOfYear(iterate.getFullYear());
                            }
                            //which month: 
                            var monthname = _getMonthNameEnglish(iterate.getMonth());
                            //which dayofweek
                            var day = _getDayOfWeek(iterate.getDay());
                            //which week:
                            var weekindex = getWeekOfMonth(iterate);
                            var week = _getWeekName(weekindex);

                            //now... find the day in the availability matrix...
                            var indexday = _indexOfDay(iterate, $scope.dmcproduct.availability[indexyear]);
                            if (indexday > -1) {
                                //the day is finded in the matrix...
                                //lets update...
                                if (newrange[day] == true) {
                                    //is a day from week selected...
                                    //manipulate....
                                    if (newrange.available == true) {
                                        $scope.dmcproduct.availability[indexyear][monthname].availability[indexday].date = iterate.toString();
                                        $scope.dmcproduct.availability[indexyear][monthname].availability[indexday].day = iterate.getDate();
                                        $scope.dmcproduct.availability[indexyear][monthname].availability[indexday].available = true;
                                        $scope.dmcproduct.availability[indexyear][monthname].availability[indexday].rooms =
                                            newrange.rooms;
                                        //Updated!!
                                    }
                                    else {
                                        //we have to remove this day...
                                        $scope.dmcproduct.availability[indexyear][monthname].availability.splice(indexday, 1);
                                        //done!
                                    }
                                }
                            }
                            else {
                                //this day is not finded in the matrix...
                                //check if we have to add...
                                if (newrange[day] == true) {
                                    if (newrange.available == true) {
                                        var range = {
                                            date: iterate.toString(),
                                            day: iterate.getDate(),
                                            publishedDate: new Date(),
                                            available: true,
                                            rooms: newrange.rooms
                                        }
                                        //push the day in availability matrix...
                                        $scope.dmcproduct.availability[indexyear][monthname].availability.push(range);
                                        //done!
                                    }
                                }
                            }
                            //next day...
                            iterate.setDate(iterate.getDate() + 1);
                        }
                    }
                }

                /**
                 * funcion que contruye el calendario para el dia en funcion del producto seleccionado
                 */
                function setAvailabilityForDay(date) {
                    //find the day in availability...
                    if (date) {
                        //find year...
                        var indexyear = _indexOfYear(date.getFullYear());
                        //which month: 
                        var monthname = _getMonthNameEnglish(date.getMonth());
                        //find day...
                        var indexday = _indexOfDay(date, $scope.dmcproduct.availability[indexyear]);
                        if (indexday > -1) {
                            //we've found the day...
                            var av = $scope.dmcproduct.availability[indexyear][monthname].availability[indexday];
                            //update the calendar...
                            //get possitions..
                            var day = _getDayOfWeek(date.getDay());
                            var weekindex = getWeekOfMonth(date);
                            var week = _getWeekName(weekindex);
                            $scope.calendar[week][day].available = av.available;
                            $scope.calendar[week][day].rooms = av.rooms;
                        }
                        else {
                            //this day is not in availability...
                            //nothing to be done...
                        }
                    }
                }

                function setAvailabilityInCalendar(year, month) {

                    if ($scope.dmcproduct.availability != null && $scope.dmcproduct.availability.length > 0) {
                        var start = new Date(year, month, 1);
                        var end = new Date(year, month, 1);
                        end.setMonth(start.getMonth() + 1);

                        var iterate = new Date(year, month, 1);
                        var indexyear = _indexOfYear(year);
                        if (indexyear > -1) {
                            //lets iterate...
                            while (iterate < end) {
                                //which
                                setAvailabilityForDay(iterate);
                                iterate.setDate(iterate.getDate() + 1);
                            }
                        }


                    }

                }

                function _indexOfYear(year) {
                    var index = -1;
                    if ($scope.dmcproduct.availability != null && $scope.dmcproduct.availability.length > 0) {
                        for (var i = 0; i < $scope.dmcproduct.availability.length; i++) {
                            if ($scope.dmcproduct.availability[i].year == year) {
                                index = i;
                                break;
                            }
                        }
                    }
                    return index;
                }
                function _indexOfDay(date, availyear) {
                    var index = -1;
                    var monthname = _getMonthNameEnglish(date.getMonth());
                    var avails = availyear[monthname].availability;


                    if (avails != null && avails.length > 0) {
                        for (var i = 0; i < avails.length; i++) {

                            if (avails[i].day == date.getDate()) {
                                index = i;
                                break;
                            }
                            
                        }
                    }
                    return index;
                }
                function getDayEnabledClass(calendarday) {
                    if (calendarday.rooms.single.price > 0 |
                        calendarday.rooms.single.price > 0 |
                        calendarday.rooms.single.price > 0 |
                        calendarday.rooms.single.price > 0) {
                        return 'enabled';
                    }
                    else { return ''; }
                }
                function _getMonthNameSpanish(monthindex) {
                    if (monthindex == 0) { return 'Enero'; }
                    if (monthindex == 1) { return 'Febrero'; }
                    if (monthindex == 2) { return 'Marzo'; }
                    if (monthindex == 3) { return 'Abril'; }
                    if (monthindex == 4) { return 'Mayo'; }
                    if (monthindex == 5) { return 'Junio'; }
                    if (monthindex == 6) { return 'Julio'; }
                    if (monthindex == 7) { return 'Agosto'; }
                    if (monthindex == 8) { return 'Septiembre'; }
                    if (monthindex == 9) { return 'Octubre'; }
                    if (monthindex == 10) { return 'Noviembre'; }
                    if (monthindex == 11) { return 'Diciembre'; }
                }
                function _getMonthNameEnglish(monthindex) {
                    if (monthindex == 0) { return 'January'; }
                    if (monthindex == 1) { return 'February'; }
                    if (monthindex == 2) { return 'March'; }
                    if (monthindex == 3) { return 'April'; }
                    if (monthindex == 4) { return 'May'; }
                    if (monthindex == 5) { return 'June'; }
                    if (monthindex == 6) { return 'July'; }
                    if (monthindex == 7) { return 'August'; }
                    if (monthindex == 8) { return 'September'; }
                    if (monthindex == 9) { return 'October'; }
                    if (monthindex == 10) { return 'November'; }
                    if (monthindex == 11) { return 'December'; }
                }
                function _getWeekName(weekindex) {
                    if (weekindex == 1) { return 'firstweek'; }
                    if (weekindex == 2) { return 'secondweek'; }
                    if (weekindex == 3) { return 'thirdweek'; }
                    if (weekindex == 4) { return 'fourthweek'; }
                    if (weekindex == 5) { return 'fifthweek'; }
                    if (weekindex == 6) { return 'sixthweek'; }
                }
                function _getDayOfWeek(dayindex) {
                    if (dayindex == 0) return 'sunday';
                    if (dayindex == 1) return 'monday';
                    if (dayindex == 2) return 'tuesday';
                    if (dayindex == 3) return 'wednesday';
                    if (dayindex == 4) return 'thursday';
                    if (dayindex == 5) return 'friday';
                    if (dayindex == 6) return 'saturday';

                }
                function getWeekOfMonth(adate) {
                    var first = new Date(adate.getFullYear(), adate.getMonth(), 1, 0, 0, 0, 0);
                    var iterator = first;
                    var week = 1;
                    for (var i = 1; i <= adate.getDate(); i++) {
                        iterator.setDate(i);
                        if (adate.getDate() == iterator.getDate()) {
                            break;
                        }
                        if (iterator.getDay() == 0) {
                            //sunday..
                            week++;
                        }
                    }
                    return week;
                };

                $scope.availablemonths = [];
                $scope.selectnewmonth = { year: new Date().getFullYear(), monthindex: new Date().getMonth() };
                $scope.newmonthselected = function (select) {

                    _reset_calendar();
                    buildAMonthCalendar($scope.selectnewmonth.year, $scope.selectnewmonth.monthindex);
                    setAvailabilityInCalendar($scope.selectnewmonth.year, $scope.selectnewmonth.monthindex);
                }

                $scope.setnewmonth = function (year, month) {
                    var d = new Date(year, month, 1);
                    var m = _getAvailableMonth(d.getFullYear(), d.getMonth());
                    console.log(m);
                    if (m != null) {
                        $scope.selectnewmonth = m;
                    }

                    _reset_calendar();
                    buildAMonthCalendar($scope.selectnewmonth.year, $scope.selectnewmonth.monthindex);
                    setAvailabilityInCalendar($scope.selectnewmonth.year, $scope.selectnewmonth.monthindex);

                }

                $scope.addmonth = function () {
                    var d = new Date($scope.selectnewmonth.year, $scope.selectnewmonth.monthindex, 1);
                    d.setMonth(d.getMonth() + 1);
                    var m = _getAvailableMonth(d.getFullYear(), d.getMonth());

                    if (m != null) {
                        $scope.selectnewmonth = m;
                    }

                    _reset_calendar();
                    buildAMonthCalendar($scope.selectnewmonth.year, $scope.selectnewmonth.monthindex);
                    setAvailabilityInCalendar($scope.selectnewmonth.year, $scope.selectnewmonth.monthindex);
                    //_setAvailInCalendar($scope.selectnewmonth.year, $scope.selectnewmonth.monthindex);
                }

                $scope.removemonth = function () {
                    var d = new Date($scope.selectnewmonth.year, $scope.selectnewmonth.monthindex, 1);
                    d.setMonth(d.getMonth() - 1);
                    var m = _getAvailableMonth(d.getFullYear(), d.getMonth());

                    if (m != null) {
                        $scope.selectnewmonth = m;
                    }

                    _reset_calendar();
                    buildAMonthCalendar($scope.selectnewmonth.year, $scope.selectnewmonth.monthindex);
                    setAvailabilityInCalendar($scope.selectnewmonth.year, $scope.selectnewmonth.monthindex);
                    //_setAvailInCalendar($scope.selectnewmonth.year, $scope.selectnewmonth.monthindex);

                }

                function _buildAvailableMonths() {
                    var today = new Date();
                    var lastmonth = new Date(today.getFullYear() + 2, 11, 1, 0, 0, 0, 0);
                    var iterator = new Date(today.getFullYear(), 0, 1);
                    var tt = true;
                    while (lastmonth >= iterator) {
                        var availmonth = {
                            monthname: _getMonthNameEnglish(iterator.getMonth()),
                            monthindex: iterator.getMonth(),
                            year: iterator.getFullYear(),
                            selectiontext: _getMonthNameEnglish(iterator.getMonth()) + ' ' + iterator.getFullYear()
                        };

                        if (tt) { $scope.selectnewmonth = availmonth; tt = false; }

                        $scope.availablemonths.push(availmonth);
                        iterator.setMonth(iterator.getMonth() + 1);
                    }
                }

                function _getAvailableMonth(year, month) {
                    var avmonth = null;
                    if ($scope.availablemonths) {
                        for (var i = 0; i < $scope.availablemonths.length; i++) {
                            if ($scope.availablemonths[i].year == year &&
                                $scope.availablemonths[i].monthindex == month) {
                                avmonth = $scope.availablemonths[i];
                                break;
                            }
                        }
                    }
                    return avmonth;
                }

                //// **************************** CALENDAR AND DATE METHODS ***************************** //
                //// **************************** watch out what are you doing... *********************** //
                //// **************************** do not touch if you're not sure what are you doing..*** //
                //*************************** End New Availability Managing Methods...

                function _getNewAvailDay(date, available, pricesingle, pricedouble, pricetriple, priceother, currency) {
                    var day = {
                        date: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
                        available: available,
                        rooms: {
                            single: {
                                price: pricesingle
                            },
                            double: {
                                price: pricedouble
                            },
                            triple: {
                                price: pricetriple
                            },
                            other: {
                                price: priceother
                            },
                            currency: currency
                        }
                    }
                }

                function _getNewAvailForYear(year) {
                    var avail = {
                        name: year,
                        publishedDate: new Date(),
                        year: year,
                        January: {
                            availability: []
                        },
                        February: {
                            availability: []
                        },
                        March: {
                            availability: []
                        },
                        April: {
                            availability: []
                        },
                        May: {
                            availability: []
                        },
                        June: {
                            availability: []
                        },
                        July: {
                            availability: []
                        },
                        August: {
                            availability: []
                        },
                        September: {
                            availability: []
                        },
                        October: {
                            availability: []
                        },
                        November: {
                            availability: []
                        },
                        December: {
                            availability: []
                        }
                    }
                    return avail;

                }

                function tryuntilproduct(listened) {
                    console.log('try to load calendar...');
                    console.log($scope.dmcproduct);
                    listenonce = listened;
                    $scope.dmcproduct == null ? tryuntilproduct() : setTimeout(function () {
                        _buildAvailableMonths();
                        _reset_calendar();

                        buildAMonthCalendar(new Date().getFullYear(), new Date().getMonth());
                        setAvailabilityInCalendar(new Date().getFullYear(), new Date().getMonth());
                        $scope.setnewmonth(new Date().getFullYear(), new Date().getMonth());
                    }, 1000);
                }

                $scope.$on('program.loaded', function () {
                    console.log('A program reloaded (calendar listening)...');
                    tryuntilproduct(true);
                });

                //$scope.$watch($scope.dmcproduct, function () {
                //    listenonce == false ? tryuntilproduct(true) : console.log('detected the change of product on calendar...');
                //})
                
                tryuntilproduct(false);
                
            }
        };
        //end LINK: 

}]);
