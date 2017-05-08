// default styles // markerIcon, mapStyle
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
  console.log('map brand brand styles loaded');
}

var centerMap;
var zoom;
var bound;
function initMap(markers, setzoom, cap) {

  //console.log ('markers ',markers);
  if (cap == undefined){
    cap = true;
  }
  var route=[];
  // bounds
  bound = new google.maps.LatLngBounds();
  for (var i = 0; i < markers.length; i++) {
    bound.extend( new google.maps.LatLng(markers[i].position.lat, markers[i].position.lng) );
    route.push(new google.maps.LatLng(markers[i].position.lat, markers[i].position.lng))
  };
  // get center map
  centerMap = bound.getCenter();
  //
  function getBoundsZoomLevel(bounds, mapDim) {
    var WORLD_DIM = { height: 220, width: 220 };
    var ZOOM_MAX = 21;

    function latRad(lat) {
        var sin = Math.sin(lat * Math.PI / 180);
        var radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
        return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
    }

    function zoom(mapPx, worldPx, fraction) {
        return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
    }

    var ne = bounds.getNorthEast();
    var sw = bounds.getSouthWest();

    var latFraction = (latRad(ne.lat()) - latRad(sw.lat())) / Math.PI;

    var lngDiff = ne.lng() - sw.lng();
    var lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;

    var latZoom = zoom(mapDim.height, WORLD_DIM.height, latFraction);
    var lngZoom = zoom(mapDim.width, WORLD_DIM.width, lngFraction);
    
    if (setzoom != null && setzoom > 0){
      return setzoom;
    } else if (markers.length > 1){
      toReturn =  Math.min(latZoom, lngZoom, ZOOM_MAX);
      
      //console.log("zoom map: "+toReturn)
      
      return toReturn;
    } else{
      return 6;
    }
  }
  //
  var mapDiv = document.getElementById('map');
  var mapDim = { height: 225, width: 450 };
  //
  zoom = getBoundsZoomLevel(bound, mapDim);

  //console.log('getBoundsZoomLevel zoom' ,zoom);

  // Google maps options
  var myOptions = {
      scrollwheel: false,
      navigationControl: false,
      mapTypeControl: false,
      scaleControl: false,
      draggable: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      center: centerMap,
      zoom: getBoundsZoomLevel(bound, mapDim),
      styles: mapStyle
    };
  //set map
  map = new google.maps.Map(document.getElementById('map'), myOptions);

  //custom icons
  //var icon = 'http://res.cloudinary.com/open-market-travel/image/upload/v1428573063/assets/marker-omt.png';
  //
  var icon = markerIconSmall;
  

  for (var l = 0; l<markers.length; l++){
    var position = new google.maps.LatLng(markers[l].position.lat, markers[l].position.lng);
    // prepare content to display
    //labelContent = "<div class='map-label-title'><span class='map-label-city'>"+markers[l].city+"</span><br /> <span class='map-label-country'>"+markers[i].country+"</span></div><div class='map-marker-days'>"+markers[i].nights+"<br /><span><i class='fa fa-moon-o'></i></span></div>";
    labelContent = "<span class='marker-label-city'>"+markers[l].city+"</span>";
    
    var marker = new MarkerWithLabel({
         position: position,
         map: map,
         icon: icon,
         labelContent: labelContent,
         labelAnchor: new google.maps.Point(150,36),
         labelClass: "map-mini-markers",
    });
  }
  //donut
  // ========= learning to draw circles =========
  function drawCircle(point, radius, dir) { 
    var d2r = Math.PI / 180;   // degrees to radians 
    var r2d = 180 / Math.PI;   // radians to degrees 
    var earthsradius = 3963; // 3963 is the radius of the earth in miles

    var points = 32; 

    // find the raidus in lat/lon 
    var rlat = (radius / earthsradius) * r2d; 
    var rlng = rlat / Math.cos(point.lat() * d2r); 


    var extp = new Array(); 
    if (dir==1)  {var start=0;var end=points+1} // one extra here makes sure we connect the
    else     {var start=points+1;var end=0}
    for (var i=start; (dir==1 ? i < end : i > end); i=i+dir){ 
      var theta = Math.PI * (i / (points/2)); 
      ey = point.lng() + (rlng * Math.cos(theta)); // center a + radius x * cos(theta) 
      ex = point.lat() + (rlat * Math.sin(theta)); // center b + radius y * sin(theta) 
      extp.push(new google.maps.LatLng(ex, ey)); 
      bound.extend(extp[extp.length-1]);
    } 
    // alert(extp.length);
    return extp;
  }
  var center = map.getCenter();
  function radiusinCircle(){
    
    var ne = bound.getNorthEast();
    // r = radius of the earth in statute miles
    var r = 3963.0;  

    // Convert lat or lng from decimal degrees into radians (divide by 57.2958)
    var lat1 = center.lat() / 57.2958; 
    var lon1 = center.lng() / 57.2958;
    var lat2 = ne.lat() / 57.2958;
    var lon2 = ne.lng() / 57.2958;

    // distance = circle radius from center to Northeast corner of bounds
    var dis = r * Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1));
    dis = dis*1.4;
    //console.log(dis)
    if (markers.length > 1){
      return dis;
    } else{
      return 150;
    }
  }
  var donuts = {};
  var donuts = new google.maps.Polygon({
      paths: [
        //local circle
        drawCircle(center, radiusinCircle(), -1),
        //world rectangle path
        drawCircle(center, 13000, 1)
      ],
      strokeColor: donutStrokeColor,
      fillColor: donutFillColor,
      fillOpacity: donutFillOpacity
    });
  if (cap){
    donuts.setMap(map);
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
  map.panBy(-100,-5);
};


//centering map when resizing

google.maps.event.addDomListener(window, "resize", function() {
  try {
    var center = map.getCenter();
     google.maps.event.trigger(map, "resize");
     map.setCenter(center); 
  }catch(err) {
    console.log("get center map fail", err.message);
  }
});

