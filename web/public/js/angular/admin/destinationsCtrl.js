

app.controller(
    'EDITDestinationsCtrl', ['$scope', 'tools_service', 'Notification', 
        '$uibModal', 'yto_api', '$timeout', 'toaster',
        '$cookieStore', 'Lightbox', 'destinations_service', '$anchorScroll', '$location', 'pricehelpers',
        function ($scope, tools_service, Notification, 
            $uibModal, yto_api, $timeout, toaster,
            $cookieStore, Lightbox, destinations_service, $anchorScroll, $location, pricehelpers) {
            //MAP STUFF
            var myLatLng = { lat: -25.363, lng: 131.044 };

            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 3,
                center: myLatLng
            });

           
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    
                    map.setCenter(pos);
                }, function () {
                    handleLocationError(true, infoWindow, map.getCenter());
                });
            } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter());
            }
        
            var geocoder = new google.maps.Geocoder();
            var markers = [];
            $scope.destinationspopupurl = '/modal-contryselect-empty';
            $scope.rebuilddestinationsjson = function () {
                var url = '/scheduledestinationsfiles';
                tools_service.showPreloader($scope, "show");
                var rqCB = yto_api.get(url, null);

                rqCB.on(rqCB.oncompleteeventkey, function (jsonrsp) {
                    console.log('Destinations JSON rebuilded');
                    Notification.success({
                        message: 'The destinations cache has been updated. Destinations will be updated in few minutes',
                        title: 'destinations updated'
                    });
                    tools_service.showPreloader($scope, "hide");
                });

                rqCB.on(rqCB.onerroreventkey, function (err) {
                    console.log(err);
                    Notification.error({ message: err, title: 'Error updating destinations' });
                    tools_service.showPreloader($scope, "hide");
                });

            }
            $scope.updatepopup = function () {
                $scope.destinationspopupurl = '/modal-contryselect?d=' + new Date();
                $scope.rebuilddestinationsjson();
            }

            function findAndPush(item, collection) {
                var hs = {
                    'DestinationCities': function (city) { },
                    'DestinationCountries': function (country) { },
                    'DestinationCountriesZones': function (zone) { }
                }
            }

            function addMarker(location) {
                var marker = new google.maps.Marker({
                    position: location,
                    map: map
                });
                markers.push(marker);
            }

            function deleteMarkers() {
                clearMarkers();
                markers = [];
            }

            function setMapOnAll(map) {
                for (var i = 0; i < markers.length; i++) {
                    markers[i].setMap(map);
                }
            }

            // Removes the markers from the map, but keeps them in the array.
            function clearMarkers() {
                setMapOnAll(null);
            }

            function geocodeAddress(address, resultsMap, addmarker, zoom, callback) {
                console.log(addmarker);
                deleteMarkers();
                //var address = document.getElementById('address').value;
                var zoom = zoom || 3;
                if (addmarker != null) {
                    resultsMap.setCenter(addmarker);
                    addMarker(addmarker);
                    map.setZoom(zoom);
                }
                else {
                    geocoder.geocode({ 'address': address }, function (results, status) {
                        if (status === google.maps.GeocoderStatus.OK) {
                            resultsMap.setCenter(results[0].geometry.location);
                            addMarker(results[0].geometry.location);
                            map.setZoom(zoom);
                            callback != null ? callback(results[0].geometry.location) : null;
                        } else {
                            Notification.error({ message: 'Geocode was not successful for the following reason: ' + status, title: 'Error googlemaps' })();
                        }
                    });
                }
            }

            $scope.fromgooglemaps = function (location, model) {
                geocodeAddress(location, map, null, 4, function (newlocation) {
                    console.log(newlocation);
                    model.location.latitude = newlocation.lat();
                    model.location.longitude = newlocation.lng();
                });
            }

            $scope.pointonmap = function (location, type, zoom, pos) {
                var mark = pos != null ? {
                    lat: pos.latitude,
                    lng: pos.longitude
                } : null;
                geocodeAddress(location, map, mark, zoom);
            }
            //END MAP STUFF
            $scope.loadcity = function (city) {
                $scope.selectedcity = city;
            }
            $scope.loadcountry = function (country) {
                $scope.selectedcountry = country;
                $scope.selectedcity = {
                    label_es: '',
                    label_en: '',
                    countrycode: country.slug.toUpperCase(),
                    description_es: '',
                    slug: '',
                    description_en: '',
                    country: country,
                    location: {
                        latitude: country.location.latitude,
                        longitude: country.location.longitude
                    }
                };
            }
            $scope.loadzone = function (zone) {
                $scope.selectedzone = zone;
                $scope.selectedcountry = {
                    label_es: '',
                    label_en: '',
                    slug: '',
                    title_es: '',
                    title_en: '',
                    zone: zone,
                    description_es: '',
                    description_en: '',
                    location: {
                        latitude: 40.39676431,
                        longitude: -3.76831055
                    }
                };
            }

            $scope.destinations = null;
            $scope.selectedzone = null;
            $scope.zonecountries = null;
            $scope.selectedcountry = null;
            $scope.countrycities = null;
            $scope.selectedcity = null;

            $scope.$watch($scope.destinations, function () {
                $scope.destinations.cities = _.sortBy($scope.destinations.cities, 'label_es');
                $scope.destinations.countries = _.sortBy($scope.destinations.countries, 'label_es');
            });

            $scope.destinations = editiondata;

            $scope.getcountries = function (zone) {
                $scope.zonecountries = _.filter($scope.destinations.countries, function (ct) {
                    return ct.zone._id == zone._id;
                });
            }

            $scope.getcities = function (country) {
                $scope.countrycities = _.filter($scope.destinations.cities, function (ct) {
                    var find = ct != null && ct.country != null ? ct.country._id == country._id : false;
                    return find;
                });
            }

            $scope.loadcountriesbyzone = function () {

            }

            function _checkzone(isnew) {
                var messages = [];
                $scope.selectedzone.label_es == '' ? messages.push('Debes indicar el nombre de la zona (ES)') : null;
                $scope.selectedzone.label_en == '' ? messages.push('Debes indicar el nombre de la zona (EN)') : null;
                $scope.selectedzone.title_es == '' ? messages.push('Debes indicar el titulo (ES)') : null;
                $scope.selectedzone.title_en == '' ? messages.push('Debes indicar el titulo (EN)') : null;
                $scope.selectedzone.sortOrder == '' ? messages.push('Debes indicar el orden de aparicion en la web') : null;

                var find = null;
                find = _.filter($scope.zones, function (ct) { return (ct.label_es == $scope.selectedzone.label_es && ct.label_en == $scope.selectedzone.label_es); });
                find != null && isnew ? messages.push('Existe una zona con este mismo nombre') : null;

                return messages;
            }

            function _checkcountry(isnew) {
                var messages = [];
                $scope.selectedcountry.label_es == '' ? messages.push('Debes indicar el nombre del pais (ES)') : null;
                $scope.selectedcountry.label_en == '' ? messages.push('Debes indicar el nombre del pais (EN)') : null;
                $scope.selectedcountry.slug == '' ? messages.push('Debes indicar el codigo del pais (en minusculas)') : null;
                $scope.selectedcountry.label_es == '' ? messages.push('Debes indicar el nombre del pais (ES)') : null;
                $scope.selectedcountry.location.longitude == 0 ? messages.push('Coordenadas no validas (longitud)') : null;
                $scope.selectedcountry.location.latitude == 0 ? messages.push('Coordenadas no validas (latitud)') : null;

                var find = null;
                find = _.filter($scope.countries, function (ct) { return (ct.label_es == $scope.selectedcountry.label_es && ct.zone._id == $scope.selectedcountry.zone._id); });
                find != null && isnew ? messages.push('Existe un pais con este mismo nombre en esta zona') : null;

                return messages;
            }


            function _checkcity(isnew) {
                var messages = [];
                $scope.selectedcity.label_es == '' ? messages.push('Debes indicar el nombre de la ciudad (ES)') : null;
                $scope.selectedcity.label_en == '' ? messages.push('Debes indicar el nombre de la ciudad (EN)') : null;
                $scope.selectedcity.location.longitude == 0 ? messages.push('Coordenadas no validas (longitud)') : null;
                $scope.selectedcity.location.latitude == 0 ? messages.push('Coordenadas no validas (latitud)') : null;

                var find = null;
                find = _.filter($scope.cities, function (ct) { return (ct.label_es == $scope.selectedcity.label_es && ct.country._id == $scope.selectedcity.country._id); });
                find != null && isnew ? messages.push('Existe una ciudad con este mismo nombre en este pais') : null;

                return messages;
            }

            $scope._repeatedlabel_es = function (label, id) {
                var find = _.filter($scope.destinations.cities, function (ct) {
                    return ct != null && ct.country != null ? (ct.label_es == label && ct.country._id == $scope.selectedcity.country._id && ct._id != id) : false;
                });
                return find != null && find.length > 0;
            }

            $scope._repeatedlabel_en = function(label, id) {
                var find = _.filter($scope.destinations.cities, function (ct) {
                    return ct != null && ct.country != null ? (ct.label_en == label && ct.country._id == $scope.selectedcity.country._id && ct._id != id) : false;
                });
                return find != null && find.length > 0;
            }

            function copyopbject(obj) { return JSON.parse(JSON.stringify(obj)); }

            $scope.addnewzone = function () {
                //var messages = _checkcountry();
                //var copy = copyopbject($scope.selectedzone);
                //delete copy['_id'];
                //messages.length == 0 ? $scope.save(copy, 'DestinationCountriesZones', function (saved) {
                //    copy = saved;
                //    $scope.selectedzone = saved;
                //    $scope.zones.push($scope.selectedzone);
                //}) : Notification.error({ message: messages.join('\r\n'), title: 'Error al guardar' });
                $scope.selectedcountry.label_es == '';
                $scope.selectedzone.label_en == '';
                $scope.selectedzone.title_es == '';
                $scope.selectedzone.title_en == '';
                $scope.selectedzone.sortOrder == '';
            }

            $scope.savezone = function () {
                var messages = _checkzone();
                messages.length == 0 ? $scope.save($scope.selectedzone, 'DestinationCountriesZones', function (saved) {
                    $scope.selectedzone  = saved;
                }) : Notification.error({ message: messages.join('\r\n'), title: 'Error al guardar' });
            }
            //programs related stuff
            $scope.recoveredprograms = [];
            
            $scope.getproductbycity = function () {
                $scope.selectedcity != null ? (
                    $scope.getprograms($scope.selectedcity._id, 'city') 
                    ) : null;
            }
            $scope.getproductbycountry = function () {
                $scope.selectedcity != null ? (
                    $scope.getprograms($scope.selectedcountry._id, 'country')
                ) : null;
            }
            $scope.imageproductstretch70 = function (url) {
                if ("undefined" != typeof url) {
                    var cl_transform = "cs_no_cmyk/w_170,h_170,c_fill,g_face,q_70/",
                        urlparts = url.split("/");
                    return urlparts[urlparts.length - 2] = cl_transform + urlparts[urlparts.length - 2], urlparts.join("/")
                }
                return url;
            }

            $scope.imageproductstretchreal70 = function (url) {
                if ("undefined" != typeof url) {
                    var cl_transform = "cs_no_cmyk/w_70,h_70,c_fill,g_face,q_70/",
                        urlparts = url.split("/");
                    return urlparts[urlparts.length - 2] = cl_transform + urlparts[urlparts.length - 2], urlparts.join("/")
                }
                return url;
            }

            $scope.printCities = function (program) {
                var htmlstr = '';
                //  console.log();
                var t = program != null && program.buildeditinerary != null ? program.buildeditinerary.sleepcities.slice(0, 8) : [];
                var s = [];
                s = _.map(t, function (city) {
                    var c = city.city_es || city.city;
                    return c;
                });


                htmlstr = s.join(', ');
                var rst = 0;
                if (program != null && program.buildeditinerary != null && program.buildeditinerary.sleepcities.length > 8) {
                    rst = program.buildeditinerary.sleepcities.length - 8;
                }
                if (rst > 0) {
                    htmlstr += ', ver más..'
                }
                return htmlstr;

            }

            $scope.printStops = function (program) {
                var htmlstr = '';
                var t = program != null && program.buildeditinerary != null ? program.buildeditinerary.stopcities : [];
                var s = []
                s = _.map(t, function (city) {
                    var c = city.city_es || city.city;
                    return c;
                });


                htmlstr = s.join(', ');
                if (htmlstr.length > 100) {
                    htmlstr = htmlstr.substring(0, 100) + "...";
                }
                return htmlstr;
            }

            $scope.selectedrelatedprogramsby = '';
            $scope.editprogram = function (program) {
                window.open('/edit/program?code=' + program.code);
            }


            function _removeitem(itemtype, item, callback) {
                var itemhash = {
                    city: 'DestinationCities',
                    country: 'DestinationCountries'
                };

                var query = {
                    _id: item._id,
                };
                var req = {
                    query: query,
                    collection: itemhash[itemtype],
                    enabled: true
                };
                tools_service.showPreloader($scope, "show");

                var rq = {
                    command: 'erase',
                    service: 'api',
                    request: req
                };

                var rqCB = yto_api.send(rq);

                rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                    if (rsp != null && rsp.ResultOK) {
                        $scope.destinations.cities = _.filter($scope.destinations.cities, function (ct) { return (item._id != ct._id); });
                        $scope.countrycities = _.filter($scope.countrycities, function (ct) { return (item._id != ct._id); });
                    }
                    tools_service.showPreloader($scope, "hide");
                    Notification.success({
                        message: 'Se ha eliminado correctamente ' + item.label_es, title: 'Exito al eliminar'
                    })
                    callback != null ? callback(null, rsp) : null;
                });
                //on response noOk
                rqCB.on(rqCB.onerroreventkey, function (err) {
                    tools_service.showPreloader($scope, "hide");
                    console.error(err);
                    Notification.error({
                        message: err, title: 'Error al eliminar'
                    });
                    callback != null ? callback(err, null) : null;

                });

                return rqCB;
            }

            $scope.removeitem = function (itemtype, item) {
                if (itemtype != null && itemtype != '' && item != null) {

                    $scope.getprograms(item._id, itemtype, function (err, items) {
                        err != null ? Notification.error({ message: err, title: 'Error al comprobar programas' }) : (
                            items != null && items.length > 0 ? Notification.error({
                                message: 'No se puede eliminar este elemento, hay ' + items.length + ' programas asociados a este destino', title: 'Error al eliminar'
                            }) : (_removeitem(itemtype, item, function (err, result) {

                                }))
                            );
                    });
                }
            }

            $scope.getprograms = function (id, destinationtype, callback) {
                $scope.selectedrelatedprogramsby = destinationtype;
                var types = {
                    country: {
                        $or: [
                            { sleepcountry: { $in: [id] } },
                            { stopcountry: { $in: [id] } }
                        ]
                    },
                    city: {
                        $or: [
                            { sleepcity: { $in: [id] } },
                            { stopcities: { $in: [id] } }
                        ]
                    }
                };


                tools_service.showPreloader($scope, 'show');
                var rq = {
                    command: 'find',
                    service: 'api',
                    request: {
                        query: { $and: [{ origin: { $ne: 'tailormade' } }, types[destinationtype], { 'categoryname.categorybehaviour': { $ne: 'child' } }] },
                        sortcondition: { 'title': 1, title_es: 1 },
                        populate: [{ path: 'dmc', select: '_id code name company.name membership.pvp membership.b2bcommission currency' }],
                        fields: '_id buildeditinerary code name title title_es name productimages publishState updatedOn slug slug_es itinerarylength pvp productimage dmc categoryname',
                        collectionname: 'DMCProducts'
                    }
                };
                var rqCB = yto_api.send(rq);
                rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                    $scope.recoveredprograms = rsp;
                    tools_service.showPreloader($scope, 'hide');
                    callback != null ? callback(null, rsp) : null;
                });
                rqCB.on(rqCB.onerroreventkey, function (err) {
                    console.log(err);
                    tools_service.showPreloader($scope, 'hide');
                    callback != null ? callback(err, null) : null;
                });


            }

            $scope.addnewcountry = function () {
                //var messages = _checkcountry();
                //var copy = copyopbject($scope.selectedcountry);
                //delete copy['_id'];
                //messages.length == 0 ? $scope.save(copy, 'DestinationCountries', function (saved) {
                //    copy = saved;
                //    $scope.selectedcountry = saved;
                //    $scope.countries.push($scope.selectedcountry);
                //}) : Notification.error({ message: messages.join('\r\n'), title: 'Error al guardar' });
                $scope.selectedzone == null ? Notification.error({ message: 'Debes seleccionar una zona previamente', title: 'Error en datos' }) : 
                    $scope.selectedcountry = {
                        label_es: '',
                        label_en: '',
                        slug: '',
                        title_es: '',
                        title_en: '',
                        zone: $scope.selectedzone,
                        description_es: '',
                        description_en: '',
                        location: {
                            latitude: 40.39676431,
                            longitude: -3.76831055
                        }
                    };
            }

            $scope.savecountry = function () {
                var messages = _checkcountry();
                messages.length == 0 ? $scope.save($scope.selectedcountry, 'DestinationCountries', function (saved) {
                    $scope.selectedcountry = saved;

                    $scope.destinations.cities = _.sortBy($scope.destinations.cities, 'label_es');
                    $scope.destinations.countries = _.sortBy($scope.destinations.countries, 'label_es');

                }) : Notification.error({ message: messages.join('\r\n'), title: 'Error al guardar' });
            }

            $scope.addnewcity = function () {
                //var messages = _checkcity();
                //var copy = copyopbject($scope.selectedcity);
                //delete copy['_id'];
                //messages.length == 0 ? $scope.save(copy, 'DestinationCities', function (saved) {
                //    copy = saved;
                //    $scope.selectedcity = saved;
                //    $scope.cities.push($scope.selectedcity);
                //}) : Notification.error({ message: messages.join('\r\n'), title: 'Error al guardar' });
                $scope.selectedcountry == null ? Notification.error({ message: 'Debes seleccionar un pais previamente', title: 'Error en datos' }) : 
                    $scope.selectedcity = {
                        label_es: '',
                        label_en: '',
                        countrycode: $scope.selectedcountry.slug.toUpperCase(),
                        description_es: '',
                        slug: '',
                        description_en: '',
                        country: $scope.selectedcountry,
                        location: {
                            latitude: country.location.latitude,
                            longitude: country.location.longitude
                        }
                    };
            }

            $scope.savecity = function () {
                var messages = _checkcountry();
                messages.length == 0 ? $scope.save($scope.selectedcity, 'DestinationCities', function (saved) {
                    $scope.selectedcity = saved;
                    $scope.destinations.cities = _.sortBy($scope.destinations.cities, 'label_es');
                    $scope.destinations.countries = _.sortBy($scope.destinations.countries, 'label_es');

                }) : Notification.error({ message: messages.join('\r\n'), title: 'Error al guardar' });
            }

            $scope.pusher = {
                DestinationCities: function (item) {
                    var finded = _.filter($scope.destinations.cities, function (ct) { return (item._id == ct._id); });
                    finded.length != null && finded.length > 0 ? null : $scope.destinations.cities.push(item);
                },
                DestinationCountries: function (item) {
                    var finded = _.filter($scope.destinations.countries, function (ct) { return (item._id == ct._id); });
                    finded.length != null && finded.length > 0 ? null : $scope.destinations.countries.push(item);
                },
                DestinationCountriesZones: function (item) {
                    var finded = _.filter($scope.destinations.zones, function (ct) { return (item._id == ct._id); });
                    finded.length != null && finded.length > 0 ? null : $scope.destinations.zones.push(item);
                }
            }

            $scope.save = function (data, collection, callback, errorcallback) {
                tools_service.showPreloader($scope, "show");

                var req = {
                    query: data._id != null ? { _id: data._id } : null,
                    collectionname: collection,
                    populate: [
                        { path: 'zone' },
                        { path: 'country' }],
                    data: data
                };

                var rq = {
                    command: 'save',
                    service: 'api',
                    request: req
                };

                var rqCB = yto_api.send(rq);

                rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                    tools_service.showPreloader($scope, "hide");
                    Notification.success({ message: "Se han guardado los cambios correctamente", title: 'Cambias guardados' });
                    $scope.pusher[collection](rsp);
                    //toaster.pop('success', "Cambios Guardados", "Se han guardado los cambios correctamente");
                    if (callback != null && typeof (callback) === 'function') { callback(rsp); }

                });
                //on response noOk
                rqCB.on(rqCB.onerroreventkey, function (err) {
                    tools_service.showPreloader($scope, "hide");
                    console.log(err);
                    Notification.error({ message: err, title: 'Error al guardar' });
                    //toaster.pop('error', 'Save data', err);
                    if (errorcallback != null && typeof (errorcallback) === 'function') { errorcallback(err); }
                });
                return rqCB;
            }

        }]);
