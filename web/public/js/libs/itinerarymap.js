
if (typeof mapStyle === 'undefined') {
    // the variable is undefined
    markerIcon = 'http://res.cloudinary.com/open-market-travel/image/upload/v1428573063/assets/marker-omt.png';
    markerIconSmall = 'http://res.cloudinary.com/open-market-travel/image/upload/assets/marker-small.png';
    donutStrokeColor= "transparent";
    donutFillColor= "#CCCCCC";
    donutFillOpacity= 0.5;
    routeStrokeColor = "#CCCCCC";
    routeStrokeOpacity = 1.0;
    routeStrokeWeight = 2;
    mapStyle = [{"featureType":"water","elementType":"all","stylers":[{"hue":"#309FD3"},{"saturation":-20},{"lightness":0},{"visibility":"simplified"}]},{"featureType":"landscape","elementType":"all","stylers":[{"hue":"#FFF9DF"},{"saturation":100},{"lightness":80},{"visibility":"simplified"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#cccccc"},{"saturation":-93},{"lightness":80},{"visibility":"simplified"}]},{"featureType":"poi","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"hue":"#cccccc"},{"saturation":-90},{"lightness":100},{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"hue":"#cccccc"},{"saturation":10},{"lightness":69},{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"all","stylers":[{"hue":"#cccccc"},{"saturation":7},{"lightness":19},{"visibility":"on"}]},{"featureType":"road","elementType":"labels","stylers":[{"hue":"#cccccc"},{"saturation":50},{"lightness":100},{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"hue":"#cccccc"},{"saturation":-93},{"lightness":-2},{"visibility":"simplified"}]},{"featureType": "administrative.country","elementType": "labels.text.fill","stylers": [{ "visibility": "off" },{ "lightness": 49 }]},{"featureType": "administrative.country","elementType": "geometry.stroke","stylers": [{ "visibility": "on" },{ "lightness": 70 },{"hue":"#1B5E7D"}]}, {"featureType": "administrative.province","elementType": "geometry.stroke","stylers": [{ "visibility": "off" },{ "lightness": 70 },{"hue":"#1B5E7D"}]}, { "featureType": "administrative.locality", "elementType": "labels.text", "stylers": [ { "visibility": "off" } ] },{ "featureType": "administrative.province", "elementType": "labels.text", "stylers": [ { "visibility": "off" } ] } ];
} else {
  console.log('map brand styles loaded');
}

var centerMap;
var zoom;

function initMap(markers, id, center) {
  //console.log("initmap "+id);
  //console.log("the markers are "+markers.length);

  if (id == null || id == ""){
    id = "map";
  }
    var first = null;
    var route=[];
    // bounds
    var bound = new google.maps.LatLngBounds();
    for (i = 0; i < markers.length; i++) {
        i == 0 ? first = new google.maps.LatLng(markers[i].position.lat, markers[i].position.lng) : null;

        bound.extend(new google.maps.LatLng(markers[i].position.lat, markers[i].position.lng));
        route.push(new google.maps.LatLng(markers[i].position.lat, markers[i].position.lng));
    }
    
    // get center map
    centerMap = (markers != null && markers.length == 1) ? new google.maps.LatLng(markers[0].position.lat, markers[0].position.lng) : bound.getCenter();
    console.log(centerMap);
    // Google maps options
    var myOptions = {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: false,
        mapTypeControl : false,
        streetViewControl: true,
        zoomControl: true,
        scrollwheel: false,
        zoom: 9,
        center: centerMap,
        styles: mapStyle
      };
    //set map
    map = new google.maps.Map(document.getElementById(id), myOptions);
    console.log("map load ok");

    // fit map to markers
    (markers != null && markers.length == 1) ? map.setCenter(centerMap) : map.fitBounds(bound);

    // avoid zooming too much when there is only one marker
    //if (markers.length < 2) {
    //  var listener = google.maps.event.addListener(map, "idle", function() { 
    //    if (map.getZoom() > 8) map.setZoom(8); 
    //    google.maps.event.removeListener(listener); 
    //  });  
    //}
   
    // // avoid zooming too much when there is only one marker
    //if (markers.length >= 5) {
    //  var listener = google.maps.event.addListener(map, "idle", function() { 
    //    //console.log("zoom is "+map.getZoom())
    //    map.setZoom(map.getZoom()+1); 
    //    google.maps.event.removeListener(listener); 
    //  });  
    //}

    //custom icons
    var icon = markerIcon;

    for (var i = 0; i < markers.length; i++){
      var position = new google.maps.LatLng(markers[i].position.lat, markers[i].position.lng);
      // prepare content to display
      var labelContent = '<div class="map-label-title">' + 
                            '<span class="map-label-city ">' + markers[i].city + '</span><br /> ' + 
                            '<span class="map-label-country">' + markers[i].country + '</span>' + 
                           '</div>' + 
                           '<div class="map-marker-days">' + markers[i].nights + '<br />' + 
                            '<span><i class="fa fa-moon-o"></i></span>' + 
                           '</div>';

      var marker = new MarkerWithLabel({
           position: position,
           icon: icon,
           labelContent: labelContent,
           labelAnchor: new google.maps.Point(156,43),
           labelClass: "map-label",
        });
        marker.setMap(map);
    }

    //route
    var routeMap = new google.maps.Polyline({
        path: route,
        geodesic: true,
        strokeColor: routeStrokeColor,
        strokeOpacity: routeStrokeOpacity,
        strokeWeight: routeStrokeWeight
      });
    routeMap.setMap(map);

    console.log('adding resize listener for map...');

    google.maps.event.addDomListener(map, "resize", function () {
        setTimeout(function () {
            console.log('triggering resize action for map...');
            try {
                var center = (markers != null && markers.length == 1) ? new google.maps.LatLng(markers[0].position.lat, markers[0].position.lng) : map.getCenter();
                map.setCenter(center);
                map.setZoom(8); //You need to reset zoom
            } catch (err) {
                console.log("get center map fail", err.message);
            }
        }, 600);        
    });


    return map;
}

//centering map when resizing
google.maps.event.addDomListener(window, "resize", function () {
    console.log('adding resize listener for map...');
      try {
            var center = map.getCenter();
            map.setZoom(8); //You need to reset zoom
            map.setCenter(center);
      }catch(err) {
        console.log("get center map fail", err.message);
      }
});


//self executing function here
// (function() {
//  // google.maps.event.addDomListener(window, 'load', initMap);
//  initMap(markers);
// })();
